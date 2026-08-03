---
title: "RANCID di OpenSUSE Leap 42.2 [part3: web-based] – SELESAI"
date: "2017-02-05"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Inilah sesi terakhir dari materi seputar RANCID. Tahap ketiga ini akan membahas bagaimana me-manusia-kan RANCID agar sedap dipandang dan dikelola secara efisien. Berhubung semua konfigurasi telah kita buat sebelumnya, maka yang akan dilakukan selanjutnya adalah mengakses RANCID menggunakan WebSVN..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part3-web-based/rancidsvn.png"
---

![svn-300x259.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part3-web-based/svn.png)

Inilah sesi terakhir dari materi seputar RANCID. Tahap ketiga ini akan membahas bagaimana me*-manusia-*kan RANCID agar sedap dipandang dan dikelola secara efisien. Berhubung semua konfigurasi telah kita [buat](https://opensuse.id/blog/rancid-di-opensuse-leap-42-2-part1-pemasangan/) [sebelumnya](https://opensuse.id/blog/rancid-di-opensuse-leap-42-2-part2-tambah-perangkat/), maka yang akan dilakukan selanjutnya adalah mengakses RANCID menggunakan [WebSVN](http://www.websvn.info/) sebagai repositori lewat peramban web (Diharapkan, Anda terlebih dahulu sudah membaca keterangan lengkap seputar SVN dan [WebSVN](http://www.websvn.info/) beserta cara kerjanya untuk lebih memahami proses kerja RANCID).

Setelah semua sudah dipersiapkan, ikuti langkah demi langkah berikut untuk proses pemasangannya :

* **Unduh dan ekstrak WebSVN**
  ```
  $ mkdir websvn && cd websvn  
  $ wget -c http://websvn.tigris.org/files/documents/1380/49056/websvn-2.3.3.tar.gz  
  $ tar xzvf websvn-2.3.3.tar.gz
  ```  

* **Tempel WebSVN ke Apache2 (silahkan install LAMP server jika belum ada)**  
  ```
  $ cp -R websvn-2.3.3 /srv/www/websvn  
  $ cd /srv/www  
  $ cp websvn/include/distconfig.php websvn/include/config.php  
  $ vi /etc/apache2/default-server.conf
  ```
  Karena saya akan menjadikan direktori web server di lab ini khusus untuk RANCID maka, ganti lokasi direktori default apache menjadi *“/srv/www/websvn”,* dan rubah ***“Options None”**,* menjadi ***“Options All”**,* kemudian restart service apache :
  ```
  DocumentRoot "/srv/www/websvn"

  #
  # Configure the DocumentRoot 
  #
  <Directory "/srv/www/websvn">
  ```

  ![apache-300x248.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part3-web-based/apache.png)  
  `$ service apache2 restart`

* **Tes Akses** Buka tampilan Web SVN melalui peramban kesayangan Anda dengan memanggil IP dari server RANCID atau bisa juga dengan mengetik *“localhost/websvn”* di alamat URL.  
  ![websvn1-1024x558.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part3-web-based/websvn1.png)

* **Atur WebSVN untuk memunculkan repositori RANCID**  
  Secara default ketika WebSVN pertama kali dipanggil, repositori SVN belum lah terpasang, oleh sebab itu, maka silahkan set repo yang kita buat sebelumnya agar dapat diakses melalui peramban web.`$ vi /srv/www/websvn/include/config.php`  
  *(tambahkan perintah berikut di bawah line 80 pada berkas config.php)*

  ```
  80 // Local repositories (without and with optional group):
  81 //
  82 $config->addRepository('MYLAB', 'file:///var/lib/rancid/SVN');
  ```

  ![addrepo.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part3-web-based/addrepo.png)

  Setelah itu silahkan pointing alamat server Anda atau ketikan *“localhost”* pada alamat URL di peramban kesayangan Anda, jika beruntung maka tampilan repositori sudah dapat terlihat berikut dengan hasil backup periodik yang telah di buat sebelumnya.

  <video controls>
    <source src="https://github.com/cho2/osid-img-restore/raw/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part3-web-based/rancidfinal.mp4" type="video/mp4">
  </video>

Akhir kata, **SELAMAT!** Tugas kita telah selesai dikerjakan. Semoga bermanfaat. Happy Salma! 😀