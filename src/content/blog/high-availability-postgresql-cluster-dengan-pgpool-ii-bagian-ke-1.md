---
title: "High Availability Postgresql Cluster dengan Pgpool-II (Bagian ke-1)"
date: "2020-01-08"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "TL;DR: Karena cukup panjang tulisan akan dibagi dalam 3 bagian Bagian 1 : membahas instalasi dan konfigurasi master postgresql Bagian 2 : membahas instalasi dan konfigurasi slave postgresql Bagian 3 : membahas instalasi dan konfigurasi pgpool-II Tulisan ini adalah Bagian ke-1. Sebagai pengguna po..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-1/pgpool-II_logo_square_150x150.png"
---

*TL;DR: Karena cukup panjang tulisan akan dibagi dalam 3 bagian*

* Bagian 1 : membahas instalasi dan konfigurasi master postgresql
* [Bagian 2](https://opensuse.id/blog/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-2/) : membahas instalasi dan konfigurasi slave postgresql
* [Bagian 3](https://opensuse.id/blog/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-3/) : membahas instalasi dan konfigurasi pgpool-II

*Tulisan ini adalah Bagian ke-1.*

Sebagai pengguna postgresql kadang kita membutuhkan *cluster* *database* baik karena pertimbangan HA maupun karena pertimbangan pembagian beban (*load balancing*). Sayangnya postgresql hanya memiliki implementasi native untuk replikasi tetapi tidak untuk *cluster*. Sehingga untuk membangun *cluster* harus menggunakan aplikasi lain. Ada banyak solusi untuk membuat *cluster* di postgresql dan yang dijelaskan di sini adalah Pgpool-II.

Tulisan ini membahas konfigurasi postgresql *cluster* (*master-slave load balancing*). Penjelasan singkatnya:

* Postgresql dipasang di 3 mesin, 1 master dan 2 slave
* Pgpool dipasang di 1 mesin terpisah.
* Replikasi diserahkan kepada postgresql
* Pgpool akan mengatur *load balancing*, proses tulis/write (insert, update, delete, dll) akan dilakukan di master sedangkan proses baca/read (select, dll) akan dibagi 3, ke master dan ke-2 slave.

Desain logikal adalah sbb:

![pgpool-II-a](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-1/pgpool-II-a.png)

Dalam contoh ini dibutuhkan 4 mesin, walaupun bisa saja pgpool dipasang pada mesin master. Pgpool tidak membutuhkan resource yang besar dan tugasnya adalah mendistribusikan beban ke setiap mesin postgresql. Dengan cara demikian postgresql terasa jauh lebih ringan kerjanya dibanding jika kita memiliki 1 mesin postgresql dengan jumlah CPU dan RAM yang sama dengan gabungan 3 mesin postgresql yang bekerja secara load balance.

![pgpool-II-c](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-1/pgpool-II-c.png)

## **1. Instalasi openSUSE**

Siapkan mesin. Untuk implementasi server biasanya saya menggunakan openSUSE Jeos dari [http://download.opensuse.org/distribution/leap/15.1/jeos/](http://download.opensuse.org/distribution/leap/15.1/jeos/) atau openstack image dari [http://download.opensuse.org/repositories/Cloud:/Images:/Leap_15.1/images/](http://download.opensuse.org/repositories/Cloud:/Images:/Leap_15.1/images/)

Tentu saja anda tetap bisa menggunakan image DVD seperti biasa dan menginstall minimum server. Silakan dipilih yang sesuai dengan kondisi anda. Dalam implementasi tulisan ini digunakan 1 mesin untuk pgpool dan 3 mesin untuk postgresql.

Sebagai catatan postgresql bekerja mengandalkan CPU karena itu tuninglah instalasi kernel openSUSE dan konfigurasi postgresql anda. Postgresql.conf harus dituning sesuai dengan kondisi mesin dan implementasinya. Untuk implementasi standar seperti untuk blog, website sederhana atau aplikasi kecil yang transaksinya tidak besar, menggunakan konfigurasi bawaan postgresql.conf sudah memadai, tetapi untuk aplikasi yang membutuhkan kinerja database yang optimum, konfigurasi postgresql.conf harus disesuaikan. Bagaimana melakukan tuning postgresql dan kernel silakan dibaca di [sini](https://opensuse.id/2020/01/04/tuning-konfigurasi-postgresql/). Pgpool karena hanya bekerja sebagai proxy cukup hemat dalam penggunaan CPU dan RAM. Sebagai gambaran saya menggunakan postgresql yang saat ini besaran datanya sekitar 15 juta baris, dengan penambahan data sekitar 100 ribu baris perhari. Data kami di-*backup* per hari, dan setiap sebulan sekali data berumur di atas 6 bulan diarsip. Masing-masing VM postgresql memiliki 4 vCPU dan 4GB RAM. Kondisi beban 100% sekitar 50% dari waktu sisanya dibawah 70%.

## **2. Instalasi PostgreSQL master node**

Tambah repositori, install postgresql

```
sudo zypper ar -e -f https://download.opensuse.org/repositories/server:/database:/postgresql/openSUSE_Leap_15.1/ postgresql
sudo zypper in --no-recommends postgresql12-pgpool-II postgresql12 postgresql12-server postgresql12-contrib
```

Di contoh ini saya menggunakan postgresql12, sekiranya anda ingin menggunakan versi yang lain silakan diganti. Di repo postgresql tersedia versi 9.4, 9.5, 9.6, 10, 11 dan 12.

Selanjutnya jalankan service postgresql, secara otomotasi postgresql akan menginisiasi database dan membentuk direktori `/var/lib/pgsql/data`

```
sudo systemctl start postgresql.service
sudo systemctl enable postgresql.service
```

Silakan login ke postgresql, tambahkan user baru dan beri privilege sebagai *replicator*. Menggunakan user postgres tidak dianjurkan.

```
postgres=# CREATE USER nama_user WITH REPLICATION ENCRYPTED PASSWORD 'rahasia';
postgres=# \du
```

Kalau anda sudah punya instalasi postgresql dan sudah ada user, cukup tambahkan role saja

```
postgres=# ALTER ROLE nama_user Replication;
```

Jangan lupa user tersebut diberi pula *role/privilege* untuk mengakses database sesuai aplikasi anda (ya iyalah).

*Streaming replication* di postgresql bekerja melalui pengiriman log dari master ke slave. Setiap transaksi ditulis dalam log transaksi yang dinamakan WAL (*write-ahead log*). *Slave* menggunakan segmen WAL ini untuk secara kontinu mereplikasi setiap perubahan dari *master*.

Untuk menjalankan *streaming replication* postgresql melakukannya melalui 3 proses utama, *wal sender*, *wal receiver* dan *startup*.

Proses *wal sender* berjalan di *master* sedangkan *wal receiver* dan *startup* berjalan di *slave*. Ketika replikasi dimulai, proses *wal receiver* mengirimkan LSN (*Log Sequence Number*) menjelaskan status sampai WAL data mana telah di-reply oleh *slave* ke *master*. Kemudian proses *wal sender* akan mengirimkan WAL data ke *slave* sesuai dengan status terakhir LSN yang dikirimkan oleh *wal receiver*. *wal receiver* selanjutnya menulis data tersebut ke WAL segments di mesin *slave*. Proses *startup* di *slave* kemudian me-*reply* ke master bahwa data mulai ditulis ke WAL *segment* sebagai tanda dimulainya replikasi.

Berdasarkan pengalaman saya, di bawah ini beberapa parameter konfigurasi postgresql yang wajib dipahami untuk membuat replikasi database. YMMV, silakan baca-baca dokumentasi postgresql untuk pemahaman lebih lanjut.

* **archive_mode** : Kalau anda ingin untuk mengarsip WAL anda musti menset ke ON (saya tidak menggunakannya karena pertimbangan disk saja, karena sudah menggunakan 2 slave dan melakukan backup harian).
* **wal_level** : diset ke *replica* kalau versi postgresql di atas 9.5, versi 9.5 ke bawah set ke *hot_standby*.
* **max_wal_senders** : sebagai acuan untuk satu buah slave di set ke 3, setiap penambahan slave ditambah 2.
* **wal_keep_segments** : jumlah WAL yang dipertahankan di direktori `pg_wal` (postgresql 10 ke atas) atau `pg_xlog` (sampai PostgreSQL 9.x). Setiap WAL file/segmen berukuran 16 MB. Bisa dimulai dengan 100, artinya anda membutuhkan sekitar 1.6GB disk.
* **max_wal_size** dan **min_wal_size** : parameter ini akan menimpa konfigurasi max_wal_senders. Jadi kalau anda menset max_wal_senders = 100, tetapi max_wal_size = 2GB maka *wal segmen* akan terus diisi sampai ukuran direktori 2GB. Saya menggunakan ini dan menset max_wal_size = 2 GB dan min_wal_size = 1 GB
* **archive_command** : Jika anda ingin mengarsip/mengcopy WAL segment ke tempat lain maka anda bisa menjalankan shell/ command atau program lain dengan parameter ini. Saya juga tidak menggunakannya karena alasan yang sama dengan archive_mode di atas.
* **listen_addresses** : tetapkan IP address atau gunakan ‘*’.
* **hot_standby** : set ke ON pada *slave* (*standby/replica*), pada *master* tidak berefek apa-apa. Ini adalah parameter *koentji*, tanpa menset ke ON slave tidak dapat melakukan query READ (baca: SELECT).

Lakukan pengaturan untuk parameter-parameter di atas pada file **`/var/lib/pgsql/data/postgresql.conf`**. Sebagai contoh, konfigurasi yang digunakan adalah sebagai berikut:

```
listen_addresses = '*'
port = 5432
max_connections = 30
shared_buffers = 512MB
huge_pages = on

work_mem = 8738kB
maintenance_work_mem = 256MB
dynamic_shared_memory_type = posix
effective_io_concurrency = 300
max_worker_processes = 4
max_parallel_workers_per_gather = 2
max_parallel_workers = 4

wal_level = replica
wal_buffers = 16MB
min_wal_size = 1GB
max_wal_size = 2GB
checkpoint_completion_target = 0.9
max_wal_senders = 10
wal_keep_segments = 64
max_replication_slots = 4

enable_partitionwise_join = on
enable_partitionwise_aggregate = on
seq_page_cost = 1.0
random_page_cost = 4.0
effective_cache_size = 2048MB
default_statistics_target = 100

shared_preload_libraries = 'pg_stat_statements'
track_activity_query_size = 2048
pg_stat_statements.track = all

log_destination = 'stderr'
logging_collector = on
log_line_prefix = '%m %d %u [%p]'
log_timezone = 'UTC'
datestyle = 'iso, mdy'
timezone = 'UTC'

lc_messages = 'en_US.UTF-8'
lc_monetary = 'en_US.UTF-8'
lc_numeric = 'en_US.UTF-8'
lc_time = 'en_US.UTF-8'
default_text_search_config = 'pg_catalog.english'
```

Sebenarnya konfigurasi di atas sudah disesuaikan dengan implementasi aplikasi saya. Ada beberapa parameter seperti pengaturan memory/cache/buffer/huge pages yang harusnya diset khusus sesuai implementasi dan kondisi mesin. Silakan baca kembali tulisan sebelumnya mengenai cara mentuning konfigurasi postgresql di [sini](https://opensuse.id/2020/01/04/tuning-konfigurasi-postgresql/).

Langkah berikutnya adalah memberikan hak akses untuk mesin slave agar dapat melakukan replikasi ke master. Lakukan pengaturan pada file **`/var/lib/pgsql/data/pg_hba.conf`**. Tambahkan seperti di bawah dan sesuaikan ip mesin *slave* anda:

```
host    replication     replication      10.100.1.7/32            md5
host    replication     replication      10.100.1.8/32            md5
```

### **Replication Slots**

*Replication slots* merupakan catatan permanen dari kondisi sebuah replika yang disimpan di master server walaupun kondisi replika sedang offline atau terputus. `pg_replication_slots` *view* akan memberikan daftar *replication slots* yang ada pada kondisi tertentu di *database cluster* beserta statusnya.

Replication slots merupakan pendekatan baru: di mana mengizinkan server master mengetahui kondisi setiap slave dan status replikasinya, serta menjaga WAL selama dibutuhkan. Dengan cara ini server master pada dasarnya akan menahan WAL file selamanya, menunggu server slave/standby untuk mengambilnya. Secara teoritis kita dapat menyalakan server slave/standby setelah mati berminggu-minggu, dan secara otomatis akan mengcopy WAL dan membuat datanya menjadi sama tanpa perlu intervensi dari kita.

Cara membuat replication slot adalah dengan login ke master postgresql dan jalankan

```
SELECT * FROM pg_create_physical_replication_slot('nama_slot');
```

*nama_slot* bisa diisi dengan nama server slave anda, dan buatlah slot sebanyak jumlah slave anda. Jika sudah anda dapat memeriksanya, misalnya:

![Screenshot_20200107_115009](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-1/Screenshot_20200107_115009.png)

Periksa ulang postgresql.conf anda dan pastikan 3 baris di bawah sudah ada:

```
wal_level = replica
max_replication_slots = 4
max_wal_senders = 20
```

*wal_level* bisa diisi hot_standby jika memang anda menginginkan slave hanya standby dan akan mengambil-alih database jika master tidak berfungsi, atau replica dimana slave juga bekerja (dalam hal ini kita akan mengalihkan query READ ke slave)  
*max-replication* adalah jumlah maksimum slot replikasi (slave server)  
*max_wal_senders* adalah jumlah maksimum proses WAL sender yang berjalan bersamaan dari slave server, default = 10.

Lanjutkan dengan restart postgresql.service di master

```
sudo systemctl restart postgresql.service
```

**Catatan:**

Untuk anda yang menyimpan direktori data di NAS/SAN atau koneksi isci lain (remote disk) perlu memodifikasi script systemd untuk *postgresql.service*. Ada beberapa laporan bahwa *postgresql.service* tidak dapat jalan otomatis setelah reboot. Jika anda mengalami masalah ini, modifikasi *script /usr/lib/systemd/system/postgresql.service* menjadi:

```
[Unit]

Description=PostgreSQL database server
After=syslog.target
After=network.target remote-fs.target data\\xxxx.mount dev-hugepages.mount

[Service]
Type=forking
User=postgres
EnvironmentFile=-/etc/sysconfig/postgresql
LimitMEMLOCK=infinity
ExecStart=/usr/share/postgresql/postgresql-script start
ExecStop=/usr/share/postgresql/postgresql-script stop
ExecReload=/usr/share/postgresql/postgresql-script reload

# The server might be slow to stop, and that's fine. Don't kill it
SendSIGKILL=no

[Install]
WantedBy=multi-user.target
```

Perhatikan bagian ini

```
After=network.target remote-fs.target data\\xxxx.mount dev-hugepages.mount
```

Aslinya hanya **After=network.target**  
Kemudian karena pada implementasi seringkali `$PG_DATA` itu diletakkan di iscsi disk maka harus dipastikan bahwa iscsi disk sudah di-mount dan remote-fs sudah terbentuk sebelum postgresql dijalankan. Hal ini bisa dicek dengan perintah di bawah dan tambahkan dari hasilnya ke dalam start-up script yang menurut anda logis.

```
systemctl list-units --type=mount
systemctl list-units --type=target
```

*Bersambung ke Bagian ke-2*

Have fun,

*medwinz*