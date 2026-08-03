---
title: "Kontrol Docker Image Secara Mudah dengan Portus! : Bagian 1"
date: "2017-07-28"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Pembuka Saat merencanakan untuk pesta rilis openSUSE 42.2 Desember tahun lalu, saya sendiri kebingungan untuk mencari materi yang cocok apa. Akhirnya daripada menghabiskan waktu saya disuruh membawakan materi untuk fitur terbaru yang ada di openSUSE 42.2. Namun karena saya sendiri lebih ke teknis..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/kontrol-docker-image-secara-mudah-dengan-portus-bagian-1/portus.jpg"
---

Saat merencanakan untuk pesta rilis openSUSE 42.2 Desember tahun lalu, saya sendiri kebingungan untuk mencari materi yang cocok apa. Akhirnya daripada menghabiskan waktu saya disuruh membawakan materi untuk fitur terbaru yang ada di openSUSE 42.2. Namun karena saya sendiri lebih ke teknis, saya gagap kalau disuruh bawain materi yang sifatnya teori. Kosa kata yang ada dipikiran saya sedikit :D.

Di obrolan grup Pak Edwin Zakaria, menyarankan menggunakan materi yang ada di [101.opensuse.org](http://101.opensuse.org/). Di website tersebut ternyata bisa temui project free software yang sedang dikembangkan oleh openSUSE. Seperti **OSEM** untuk manajemen event (events.opensuse.org), **Portus** untuk Manajemen Docker Registry (Docker Distribution). Di 101.opensuse.org anda diajak untuk berkontribusi bersama openSUSE untuk mengembangkan open source software yang ada dalam daftar. Dan software yang dikembangkan di 101 ini juga dimasukkan kedalam Google Summer of Code untuk dikembangkan oleh para pelajar dari seluruh dunia. Karena saya pemahaman programmingnya kurang dan belum kuliah lagi jadi saya tidak bisa ikut, karena salah satu syaratnya adalah pelajar :D.

Salah satunya [**Portus**](http://port.us.org/), yang akan dibahas pada tulisan ini. Poin utama yang akan dibahas adalah bagaimana kita memasang portus menggunakan openSUSE Leap dan akan dilanjutkan ditulisan berikutnya tentang manajemen dan ujicoba portus.

## Singkat Mengenai Portus

![portus.jpg](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/kontrol-docker-image-secara-mudah-dengan-portus-bagian-1/portus.jpg)
Sebelum mengenal portus ada baiknya memahami konsep docker terlebih dahulu, kemudian docker registry dll. Sebagai info saja di versi 2.0 Docker registry berganti nama menjadi Docker Distribution namun biasa disebut sebagai Docker Registry.

Singkatnya, Docker Registry adalah sebuah penyimpanan dan pendistribusian untuk docker image, docker registry ini merupakan engine yang ada dibalik [Docker Hub](https://hub.docker.com/). Di dunia docker pasti anda kenal docker hub bukan?. Docker registry dapat dibangun oleh siapa saja, artinya anda juga bisa membuat Docker Hub kecil-kecilan di server anda.

Sementara itu, Portus adalah perangkat lunak untuk otorisasi untuk docker registry yang saat ini sedang dikembangkan oleh openSUSE. Tujuan utama dari Portus adalah menyediakan UI yang handal untuk docker registri anda. Portus bisa menjadi solusi keren untuk melakukan manajemen terhadap Docker Registry on premise anda. Selain dari UI yang handal, portus juga dapat membedakan hak akses untuk user terhadap docker image anda. Apakah itu sebagai Owner, Kontributor atau hanya sekadar viewer.

## Tinjauan Sistem

Sebelum membaca tutorial ini, ada baiknya melihat tinjauan sistem nya terlebih dahulu supaya tidak bingung. Jadi rencananya, Docker registry dan portus akan dibangun dalam satu mesin yang sama secara bare metal. Artinya langsung menggunakan openSUSE Leap 42.2. Sebenarnya bisa saja dibuild menggunakan docker-compose atau dengan vagrant ala-ala DevOps. Namun saya lebih enak langsung secara bare metal diatas openSUSE karena secara proses langkah instalasi tidak terlalu sulit dan tidak jauh berbeda dengan cara DevOps.

192.168.2.130 – Docker Registry dan Portus  
192.168.2.131 – Klien yang terpasang docker (Ujicoba)

## Kebutuhan Sistem

Sistem operasi : openSUSE Leap 42.2  
Versi Docker : v17 (Menggunakan repo OBS Virtualization:container)  
Versi Docker Registry : v2  
Koneksi Internet

## Langkah-langkah

Berikut langkah-langkah tahapan instalasi portus dengan cepat dan mudah menggunakan perintah `portusctl`.

### Instalasi Paket

Pastikan anda sudah menginstal openSUSE Leap, dan pastikan sudah di update :

```
zypper ref
zypper up
```

Tambahkan repositori yang dibutuhkan seperti Virtualization Container untuk docker versi 12 keatas, dan repo Portus pastinya yang berada di Open Build Service.

```
zypper ar -f http://download.opensuse.org/repositories/Virtualization:/containers/openSUSE_Leap_42.2/Virtualization:containers.repo
zypper ar -f http://download.opensuse.org/repositories/Virtualization:/containers:/Portus:/2.2/openSUSE_Leap_42.2/Virtualization:containers:Portus:2.2.repo
```

Instal/Pasang paket-paket tersebut (docker, docker-distribution, portus)

```
zypper in -n docker docker-distribution-registry portus
```

Secara otomatis zypper akan memasang paket-paket yang dibutuhkan oleh portus. seperti MySQL, apache2 dll. Tunggu proses instalasi hingga selesai.

### Konfigurasi Portus

Sebelum memasang portus, hidupkan terlebih dahulu service dari mysql, apache2, docker dan docker registry.

```
systemctl start docker
systemctl start registry
systemctl start apache2
systemctl start mysql
```

Setup mysqlnya juga dengan perintah `mysql_secure_installation`

Jika sudah, pasang portus dengan perintah berikut:

```
portusctl setup --local-registry --ssl-gen-self-signed-certs
```

Jika ada pertanyaan Yes atau No pilih saja **Yes**, dan jika diperintahkan untuk memasukan sandi mysql, masukkan sandi mysql yang telah ditentukan saat setup mysql dan tunggu sampai proses selesai.

## Setup Portus WebUI

Instalasi portus sudah seleasi, buka alamat web https://iipaddress/users/sign\_up, untuk membuat user portus pertama kali.  
![portus-ui.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/kontrol-docker-image-secara-mudah-dengan-portus-bagian-1/portus-ui.png)

Tadaaaaa, Portus UI sudah selesai dipasang. Untuk manajemen dan ujicoba Portus UI silakan baca artikel selanjutnya di “**Kontrol Docker Image Secara Mudah dengan Portus! : Bagian 2**” (OTW)

Selamat bersenang-senang!