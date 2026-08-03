---
title: "High Availability PostgreSQL Cluster dengan Pgpool-II (Bagian ke-3)"
date: "2020-01-10"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "TL;DR: Karena cukup panjang tulisan akan dibagi dalam 3 tulisan Bagian 1 : membahas instalasi dan konfigurasi master postgresql Bagian 2 : membahas instalasi dan konfigurasi slave postgresql Bagian 3 : membahas instalasi dan konfigurasi pgpool-II Tulisan ini adalah Bagian ke-3. 4. Instalasi pgpoo..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-3/pgpool-II_logo_square_150x150.png"
---

*TL;DR: Karena cukup panjang tulisan akan dibagi dalam 3 tulisan*

- [*Bagian 1*](https://opensuse.id/blog/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-1/) : membahas instalasi dan konfigurasi master postgresql
- [*Bagian 2*](https://opensuse.id/blog/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-2/) : membahas instalasi dan konfigurasi slave postgresql
- *Bagian 3 : membahas instalasi dan konfigurasi pgpool-II*

Tulisan ini adalah Bagian ke-3.

## 4. Instalasi pgpool

Pgpool-II sudah terdapat di OBS repositori. Versinya sedikit terlambat dari versi rilis di web Pgpool. Saat tulisan ini dibuat versi Pgpool di [website Pgpool](https://www.pgpool.net/mediawiki/index.php/Main_Page) adalah 4.1. Sementara paket di OBS repositori masih versi 4.0.6.

Tambah repositori, install pgpool dan postgresql. Sebenarnya postgresql di mesin pgpool kita butuhkan hanya clientnya saja, untuk mengakses database (psql) dan backup (pg_dump) misalnya. Tapi untuk memudahkan kita install juga postgresql-server walaupun tidak perlu dijalankan

```
zypper ar -e -f https://download.opensuse.org/repositories/server:/database:/postgresql/openSUSE_Leap_15.1/ postgresql
zypper in --no-recommends pgpool-II postgresql12-pgpool-II postgresql12 postgresql12-server postgresql12-contrib
```

Selanjutnya edit file /etc/hosts, misalnya pgsql1 untuk master, pgsql2 untuk slave1, pgsql3 untuk slave2.

```
127.0.0.1       localhost
10.100.1.5      pgpool
10.100.1.6      pgsql1
10.100.1.7      pgsql2
10.100.1.8      pgsql3
```

Perhatikan bahwa kita menginstal pula paket **postgresql12-pgpool-II**, paket ini berisi *library* dan *extension* pgpool untuk PostgreSQL, ditandai dengan .sql dan .control. File-filenya tersimpan di direktori */usr/lib/postgresql12/lib64/, /usr/lib/postgresql12/lib64/bitcode/* dan */usr/share/postgresql12/extension/*.

Langkah berikutnya kita memasang *extension* pgpool tersebut pada database postgresql. Kita pasang *extension* pgpool tersebut pada ***template1***. Lakukan 1 kali saja di master karena nanti akan otomatis tereplikasi di *slave*.

```
sudo -i -u postgres
psql template1
CREATE EXTENSION pgpool_recovery;
CREATE EXTENSION pgpool_adm;
```

Periksa bahwa *extension* telah terpasang pada template1

```
\dx
```

Pada master akan seperti
![Screenshot Master](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-3/Screenshot_20200108_210033.png)

Pada slave
![Screenshot Slave 1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-3/Screenshot_20200108_210300.png)

![Screenshot Slave 2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-3/Screenshot_20200108_210323.png)

***Pada saatnya nanti kita gunakan template1 sebagai template database yang akan kita buat sehingga otomatis database yang terbentuk akan memiliki extension pgpool***. Misalnya gunakan pgadmin, buatlah sebuah database baru dengan dengan menggunakan template1 di master, maka database akan dibuat dengan extension* pgpool_adm* dan *pgpool_recovery.* Database dengan kondisi yang sama otomatis akan terbentuk di *slave*. *Kalau berhasil artinya sulapan kita bekerja 🙂*

![Screenshot PgAdmin 1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-3/Screenshot_20200108_210739-1.png)

![Screenshot PgAdmin 2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-3/Screenshot_20200108_210909.png)

Langkah berikutnya adalah mengkonfigurasi file **/etc/pgpool-II/pcp.conf.** File ini berisi user dan password pgpool untuk admnistrasi management pgpool. Password dihash md5 dan formatnya adalah

```
username:[md5 encrypted password]
```

Buat password dalam format md5 dengan

```
$ pg_md5 your_password
    1060b7b46a3bd36b3a0d66e0127d0517
```

Atau jika anda tidak ingin memperlihatkan password anda dengan cara:

```
$ pg_md5 -p
    password: your_password
```

Isi file pcp.conf dengan menggunakan hasil md5 tersebut misal

```
admin:97bf34d31a8710e6b1649fd33357f783
```

Walaupun tidak wajib kita bisa mengisikan username dan password yang sama dengan user PostgreSQL agar mempermudah dalam mengakses dan mengingatnya.

Jangan lupa lengkapi file*** /etc/pgpool-II/pool_hba.conf*** dengan ip address dari masing-masing server PostgreSQL (sesuaikan dengan ip mesin master dan slave), misalnya

```
# "local" is for Unix domain socket connections only
local   all         all                               trust
# IPv4 local connections:
host    all         all         127.0.0.1/32          trust
host    all         all         ::1/128               trust
host    all         all         10.100.1.6/32         md5
host    all         all         10.100.1.7/32         md5
host    all         all         10.100.1.8/32         md5
```

Selanjutnya kita harus mengkonfigurasi file ***/etc/pgpool-II/pgpool.conf***. Sesuai dengan dokumentasi pgpool maka running mode yang dianjurkan secara default adalah streaming replication mode. Dalam mode ini PostgreSQL bertanggung jawab terhadap sinkronisasi database. Load balancing dimungkinkan untuk dijalankan dalam mode ini. Contoh konfigurasinya diberikan ketika kita menginstall pgpool yaitu pada file ***/etc/pgpool-II/pgpool.conf.sample-stream***. Di bawah ini adalah contoh dari **/etc/pgpool-II/pgpool.conf**

Perhatikan pada bagian ***Backend Connection Setting*** pada file konfigurasi di atas kita set weight=1. Ini artinya kita berusaha agar perbandingan beban dari masing-masing backend adalah sama.

Selanjutnya ada 1 file lagi yang harus kita lengkapi yaitu /etc/pgpool-II/pool_passwd. Isilah file ini dengan username dan password yang sama dengan user postgresql. Entry dari file ini pool_passwd ini harus dibuat dengan menjalankan

```
pg_md5 -f /etc/pgpool-II/pgpool.conf -m -u postgres postgrespassword
```

Terakhir jalankan service pgpool

```
sudo systemctl start pgpool-II.service
sudo systemctl enable pgpool-II.service
```

Kita bisa mencoba bagaimana pgpool bekerja dengan mentest membuat database dan menghapusnya melalui pgadmin. Kita koneksikan pgadmin kita ke server pgpool (masukkan ip address dan port mesin pgpool, username dan password pgpool), buat database maka database akan terbentuk di master dan slave. Hapus database melalui pgpool maka database akan terhapus di master dan slave.

![Screenshot PgAdmin Test](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/high-availability-postgresql-cluster-dengan-pgpool-ii-bagian-ke-3/Screenshot_20200110_211642.png)

Koneksi ke database dari aplikasi kita tinggal diarahkan ke mesin pgpool (tidak lagi ke mesin postgresql). Dengan cara demikian, proses WRITE akan dilakukan oleh pgpool ke mesin master, sedangkan proses READ akan dibagi ke mesin master dan slave. Untuk membuktikannya anda dapat menjalankan htop di setiap mesin postgresql dan lihat distribusi bebannya. Bisa juga dengan membandingkan log dari pgpool untuk melihat proses INSERT, UPDATE, SELECT dilakukan ke mesin mana saja. Misalnya dengan menjalankan

```
sudo journalctl -u pgpool-II | grep "node id: 0" | grep INSERT
sudo journalctl -u pgpool-II | grep "node id: 1" | grep INSERT
sudo journalctl -u pgpool-II | grep "node id: 2" | grep INSERT
sudo journalctl -u pgpool-II | grep "node id: 0" | grep SELECT
sudo journalctl -u pgpool-II | grep "node id: 1" | grep SELECT
sudo journalctl -u pgpool-II | grep "node id: 2" | grep SELECT
```

Masih ada yang belum ditulis dalam artikel ini yaitu bagaimana membuat mesin pgpool menjadi HA juga. Mudah-mudahan kedepannya dapat saya tuliskan.

Selamat mencoba, have fun

medwinz