---
title: "Tuning Konfigurasi PostgreSQL"
date: "2020-01-04"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Tuning konfigurasi dilakukan agar instalasi PostgreSQL kita dapat bekerja secara optimal. Sebagian besar kita mungkin menganggap bahwa yang penting adalah CPU dan RAM yang besar, kenyataannya tidak demikian. Seringkali ditemukan instalasi PostgreSQL di mesin-mesin yang memadai secara spesifikasi ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/pgAdmin4.png"
---

Tuning konfigurasi dilakukan agar instalasi PostgreSQL kita dapat bekerja secara optimal. Sebagian besar kita mungkin menganggap bahwa yang penting adalah CPU dan RAM yang besar, kenyataannya tidak demikian. Seringkali ditemukan instalasi PostgreSQL di mesin-mesin yang memadai secara spesifikasi tapi tidak berjalan sesuai yang diharapkan. Memang hal ini tidak hanya tergantung dari database saja, tapi juga bagaimana efisiensi aplikasi (baca *coding*), efisiensi *query* serta teknik mengolah datanya. Tulisan ini membahas cara untuk men-tuning konfigurasi PostgreSQL server. Walaupun tidak ada aturan baku bagaimana men-tuning PostgreSQL, tulisan ini mudah-mudahan dapat dijadikan acuan.

**1. Menggunakan [pgtune website](https://pgtune.leopard.in.ua/#/)**

Silakan masukan konfigurasi mesin dan data lain yang dibutuhkan pada website tersebut. Konfigurasi postgresql.conf akan dihasilkan dari masukan informasi yang diberikan.

![pgtune-1232x684.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/pgtune.png)

**2. Menggunakan [postgresqltuner](https://github.com/jfcoz/postgresqltuner)**

Download postgresqltuner script dari halaman github. Salin berkas *postgresqqltuner.pl* ke direktori /var/lib/pgsql/data dan jalankan dengan

```
perl postgresqltuner.pl --host=127.0.0.1 --database=nama_database --user=nama_user --password=password_user
```

Silakan ikuti saran yang dihasilkan oleh script tersebut.

**3.Penggunaan *shared buffer***

Halaman dokumentasi postgresql 12 menyebutkan:

*Shared_buffers* adalah jumlah memory yang digunakan sebagai *shared memory buffers*. Nilai defaultnya adalah 128 MB, tetapi bisa saja lebih kecil jika pengaturan kernel tidak mendukung. Ukuran minimum adalah 128 KB, biasanya diset agak lebih tinggi dari nilai minimumnya untuk mencapai unjuk kerja yang lebih baik. Pengubahan nilai membutuhkan *restart* database. Jika anda memiliki database server dengan 1 GB RAM atau lebih, mulailah dengan menset *shared_buffers* sebesar 25% dari total RAM. Kemungkinan akan ada beban kerja dimana dibutuhkan *shared_buffers* yang lebih besar,  tetapi karena ***PostgreSQL juga bergantung kepada cache sistem operasi*** maka alokasi yang lebih besar dari 40% untuk *shared_buffers* tidak meningkatkan unjuk kerja PostgreSQL. Biasanya pengalokasian yang besar untuk *shared_buffers* dibutuhkan ketika kita meningkatkan ukuran *max_wal_size*, untuk kebutuhan menjalankan beberapa proses tulis data yang besar dalam periode yang lama (sumber: https://www.postgresql.org/docs/12/runtime-config-resource.html).

Beberapa poin penting dari dokumentasi di atas:

* gunakan *shared_buffers* dengan ukuran 25% dari total RAM
* jika ukuran *max_wal_size* diperbesar (default=1GB) kemungkinan dibutuhkan memperbesar ukuran *shared_buffers*, tetapi perhatikan pula kebutuhan memori untuk sistem operasi
* PostgreSQL juga bergantung kepada *cache* sistem operasi, jadi peningkatan *shared_buffers* tidak dianjurkan karena bisa diganti dengan pemanfaatan *cache* sistem operasi

Sebelum kita melangkah lebih jauh, perhatikan kalimat dari dokumentasi PostgreSQL di atas “... ***PostgreSQL juga bergantung kepada cache sistem operasi*** ...” . Saatnya  kita ulang sedikit pengetahuan kita tentang konsep sistem operasi.

a. Aplikasi dan sistem operasi berjalan dalam virtual memory

Setiap proses memiliki impresi bahwa proses bekerja dengan bagian memori yang besar dan berurutan (*contigous*) (https://en.wikipedia.org/wiki/Virtual_memory).

![hugepage-7.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/hugepage-7.png)

b. Sistem operasi mengelola sebuah *page table* untuk memetakan *virtual memory* ke dalam memori fisik (lihat http://courses.teresco.org/cs432_f02/lectures/12-memory/12-memory.html)

![sgg-valid-invalid.gif](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/sgg-valid-invalid.gif)

c. *Address translation logic* diimplementasikan oleh *memory management unit* (MMU) (baca https://en.wikipedia.org/wiki/Memory_management_unit)

d. MMU menggunakan *cache pages* yang sering digunakan ulang dikenal sebagai *Translation Lookaside Buffer* (TLB) (baca https://en.wikipedia.org/wiki/Memory_management_unit)

![325px-MMU_principle_updated.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/325px-MMU_principle_updated.png)

e. Aplikasi akan memanfaatkan TLB, yang pertama dilakukan adalah mencari di TLB:

* jika alamat *address mapping* yang dicari ditemukan di TLB maka alamat fisik memori akan dikembalikan ke aplikasi untuk diakses. Ini dinamakan *TLB Hit* dan *cost*nya hanya 1 kali memory akses.
* jika alamat *address mapping* yang dicari tidak ditemukan di TLB maka proses akan mencari (men-*scan*)*page table* untuk mencari *address map* nya sampai ditemukan. Ini dinamakan *TLB miss* dan *cost*nya 2 kali memory akses.

![440px-Page_table_actions.svg_.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/440px-Page_table_actions.svg_.png)

(sumber https://en.wikipedia.org/wiki/Page_table)

Kesimpulan dari pengulangan singkat kuliah sistem operasi ini adalah PostgreSQL dapat ditingkatkan kinerjanya dengan meningkatkan efisiensi (menurunkan *TLB miss* atau dengan kata lain meningkatkan *TLB Hit*) dengan cara:

* memanfaatkan *huge pages* dan TLB, pendekatan ini mudah dilakukan
* memperbesar ukuran *huge pages* dan memanfaatkan TLB, ini juga bisa dilakukan
* memperbesar ukuran TLB, ini mahal karena harus ganti CPU

**4. Memanfaatkan *huge pages* dan *Translation Lookaside Buffer* (TLB)**

Dokumentasi PostgreSQL menyebutkan bahwa menggunakan *huge pages* akan mengurangi *overhead* ketika menggunakan memory yang besar dan berurutan, sebagaimana dilakukan oleh PostgreSQL, khususnya ketika menggunakan *shared_buffers* yang berukuran besar (https://www.postgresql.org/docs/12/kernel-resources.html#LINUX-HUGE-PAGES).

Secara desain PostgreSQL sudah dibuat untuk memanfaatkan *huge pages*, tinggal dimanfaatkan.

Untuk aplikasi yang tidak didesain untuk memanfaatkan *huge pages* maka sistem operasi mendukungnya dengan apa yang dinamakan *Transparent Huge Pages* (THP). Dalam hal ini secara singkat dapat dijelaskan:

* kernel bekerja di latar belakang (*khugepaged*) dengan mencari blok memori berurutan yang cukup dan tidak dipakai selanjutnya mengubahnya menjadi *huge pages*
* secara transparan mengalokasikannya ke proses yang dianggap sesuai oleh kernel.

Silakan baca https://www.kernel.org/doc/Documentation/vm/hugetlbpage.txt untuk lebih detail

Karena PostgreSQL sudah didesain dengan memanfaatkan *huge pages* kita malah dianjurkan untuk menon-aktifkan THP dan mengalokasikan memori secara khusus untuk *huge pages* yang akan digunakan untuk PostgreSQL, tentu saja **jika mesin kita memang dialokasikan khusus hanya untuk PostgreSQL**.

Jalankan di teminal

```
cat /proc/meminfo | grep Huge
```

Maka hasilnya akan terlihat seperti

![huge-1.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/huge-1.png)

Terlihat ada *Transparent Huge Pages* (THP) yaitu *AnonHugePages*  sebesar 6144 kB.

Kita akan memberikan alokasi *huge page* yang lebih besar ke postgresql sehingga TLB miss tidak perlu sampai ke disk cukup di RAM

Untuk memanfaatkan huge pages kita harus menghitung perkiraan kebutuhan memori dari postgresql dan mengalokasikan huge page sebesar kebutuhan tersebut.

```
head -1 /var/lib/pgsql/data/postmaster.pid
1395
pmap 1395 | awk '/rw-s/ &amp;&amp; /zero/ {print $2}'
1096672
grep ^Hugepagesize /proc/meminfo
Hugepagesize: 2048 kB
```

1096672 / 2048 = 535.48, maka dalam contoh ini dibutuhkan sekitar 536 *huge pages*. Secara default ukuran setiap huge pages adalah 2048 kB. Kemudian kita set huge page lebih besar, siapa tahu ada program lain yang juga membutuhkan, katakan menjadi 700, jadi total alokasi *huge pages* menjadi 1,4 GB.

```
sysctl -w vm.nr_hugepages=700
```

Agar persisten kita sesuaikan juga di file */etc/sysctl.conf* tambahkan *vm.nr_hugepages=700*

Jangan lupa kita harus memberikan privilege kepada group postgres untuk dapat memanfaatkan huge page ini di *userland*. Cari tahu nomer *entry* dari group postgres dan berikan akses sebagai pengguna Translation Lookaside Buffer (TLB)

```
getent group postgres
26
echo 26 &amp;gt; /proc/sys/vm/hugetlb_shm_group
```

Agar persisten jangan lupa untuk memasukkan parameter ***vm.hugetlb_shm_group=26*** di dalam file ***/etc/sysctl.conf***

Sekarang buka terminal dan jalankan lagi

```
cat /proc/meminfo | grep Huge
```

maka terlihat ada total huge pages sebesar 700 pages dan ada alokasi (*Reserved*) untuk PostgreSQL sebesar 510 pages atau sekitar 1GB

![huge-3.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/huge-3.png)

Jangan lupa menambahkan huge_pages di *postgresql.conf* dan* restart postgresql.service
*

```
huge_pages = on
```

Jika mesin anda hanya khusus untuk PostgreSQL anda dapat menon-aktifkan THP secara menyeluruh, caranya adalah  edit file */etc/default/grub* dan tambahkan *“transparent_hugepage=never” *pada *GRUB_CMDLINE_LINUX_DEFAULT= . *Jangan lupa setelah mengedit jalankan mkinitrd dan mereboot mesin anda.

```
grub2-mkconfig -o /boot/grub2/grub.cfg
mkinitrd
reboot
```
![huge-4.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/huge-4.png)

Setelah reboot cek kembali huge page, dan akan terlihat bahwa sudah tidak ada *Transparent Huge Page* (THP), ukurannya = 0 kB. Semua *huge page* hanya digunakan untuk aplikasi yang didesain memanfaatkan huge page, postgresql salah satunya,

![huge-5.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/huge-5.png)

**5. Memperbesar ukuran *huge pages* dan memanfaatkan *Translation Lookaside Buffer* (TLB)**

Secara default ukuran huge pages adalah 2048 kB. Ukuran ini dapat diperbesar selama hardware/CPU anda mendukungnya. Periksa dengan

```
cat /proc/meminfo | grep Huge
```
![hugepage-1.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/hugepage-1.png)

```
cat /proc/cpuinfo
```
![hugepage-2.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/hugepage-2.png)

Jika terdapat **pse** artinya CPU anda mendukung huge pages berukuran 2048 kB dan jika terdapat **pdpe1gb** artinya CPU anda mendukung huge pages berukuran 1 GB.

Kemudian edit file /etc/default/grub dan tambahkan “hugepagesz=1GB default_hugepagesz=1G” pada GRUB_CMDLINE_LINUX_DEFAULT=

```
vim /etc/default/grub
```
![hugepage-3-2-768x333.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/hugepage-3-2-768x333.png)
 
Kemudian update grub dan reboot mesin anda

```
grub2-mkconfig -o /boot/grub2/grub.cfg
mkinitrd
reboot
```

Periksa ulang besarnya total huge page, pastikan besarnya sudah 1GB.

```
cat /proc/meminfo | grep Huge
```

![hugepage-4-1.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/hugepage-4-1.png)

Selanjutnya kita akan menonaktifkan Transparent Huge Page (THP). Edit lagi file /etc/default/grub dan tambahkan “transparent_hugepage=never”

Sebenarnya anda bisa menyesuaikan ukuran huge page ini sesuai dengan jumlah ukuran RAM anda. Misalnya mesin anda mempunya RAM sebesar 64 GB. Anda bisa menset huge page ini menjadi katakan 32 GB. Caranya adalah dengan menambahkan jumlah pages di /etc/default/grub. Misalnya

```
GRUB_CMDLINE_LINUX_DEFAULT="(...) hugepagesz=1GB default_hugepagesz=1G hugepages=32 transparent_hugepage=never"
```
![hugepage-5.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/hugepage-5.png)

Kita harus memberikan privilege kepada group postgres untuk dapat memanfaatkan huge page ini di userland. Cari tahu nomer entry dari group postgres dan berikan akses sebagai pengguna Translation Lookaside Buffer (TLB)

```
getent group postgres
26
echo 26 &amp;gt; /proc/sys/vm/hugetlb_shm_group
```
![hugepage-6-1.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/hugepage-6-1.png)

Agar persisten jangan lupa untuk memasukkan parameter ***vm.hugetlb_shm_group=26*** di dalam file ***/etc/sysctl.conf***

**Komparasi**

Saya melakukan komparasi kecepatan antara huge_page=2048kB dan huge_page=1GB. Karena mesin yang dipakai hanya memiliki RAM 4GB maka perlu sedikit  modifikasi untuk postgresql.conf. Pada kondisi huge_page=2048kB parameter shared_buffers = 1GB, sedangkan ketika huge_page=1GB parameter shared_buffers = 512MB. Selain itu saya mengaktifkan shared library, shared_preload_libraries = ‘pg_stat_statements’ dan mengaktifkan extension pg_stat_statements di database. Database yang digunakan cukup besar sekitar 29,5 juta row berukuran sekitar 4 GB dengan ukuran tabel sekitar 3,3 GB dan index sekitar 650 MB

Ini adalah contoh postgresql.conf nya

```
listen_addresses = '*'
port = 5432
max_connections = 30
shared_buffers = 1GB
#shared_buffers = 512MB
huge_pages = on

effective_cache_size = 3GB
maintenance_work_mem = 256MB
checkpoint_completion_target = 0.9
dynamic_shared_memory_type = posix
wal_buffers = 16MB

default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 300
work_mem = 8738kB
min_wal_size = 1GB
max_wal_size = 2GB
max_worker_processes = 4
max_parallel_workers_per_gather = 2
max_parallel_workers = 4

shared_preload_libraries = 'pg_stat_statements'
track_activity_query_size = 2048
pg_stat_statements.track = all

log_destination = 'stderr'

logging_collector = on
log_line_prefix = '%m %d %u [%p]'
log_timezone = 'Asia/Jakarta'
datestyle = 'iso, mdy'
timezone = 'Asia/Jakarta'

lc_messages = 'en_US.UTF-8'
lc_monetary = 'en_US.UTF-8'
lc_numeric = 'en_US.UTF-8'
lc_time = 'en_US.UTF-8'
default_text_search_config = 'pg_catalog.english'
```

Selalu jalankan *postgresqltuner.pl* seperti dalam poin 2 di atas setiap melakukan perubahan terhadapa konfigurasi postgresql. Script tersebut sangat membantu sekali dalam memahami cara kerja postgresql.

Lama query SELECT COUNT (*) saat huge_pages=2048kb adalah 249 detik
![hugepage-6-1.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/huge-6-indo-pop-2mbhp.png)

Lama query SELECT COUNT (*) saat huge_pages=1GB adalah 228 detik
![huge-6-indo-pop-1ghp.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tuning-konfigurasi-postgresql/huge-6-indo-pop-1ghp.png)

Perbedaannya sekitar 21 detik. Silakan mencoba sendiri pada database anda.

Ada beberapa cara lain untuk membuat performance postgresql makin optimum, antara lain:

1. penggunaan message broker, RabbitMQ misalnya

2. penggunaan connection pooling, misalnya dengan pgpool

3. cluster load balancing.

Kalau ada kesempatan mudah-mudahan bisa saya tulis. Semoga bermanfaat.

Have fun

medwinz