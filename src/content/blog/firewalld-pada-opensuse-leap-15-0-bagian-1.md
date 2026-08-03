---
title: "Firewalld pada openSUSE Leap 15.0 – Bagian 1"
date: "2018-03-08"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "openSUSE Leap 15 rencananya akan dirilis pada bulan Mei 2018. Saat ini versi 15 telah memasuki fase beta dan rencananya akan memasuki fase RC pada bulan April 2018. Salah satu fitur yang dihilangkan pada openSUSE Leap 15 adalah SuSEfirewall, dan akan digantikan dengan Firewalld. Firewalld dikemba..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/firewalld-pada-opensuse-leap-15-0-bagian-1/firewalld-250x74.png"
---

openSUSE Leap 15 rencananya akan dirilis pada bulan Mei 2018. Saat ini versi 15 telah memasuki fase beta dan rencananya akan memasuki fase RC pada bulan April 2018. Salah satu fitur yang dihilangkan pada openSUSE Leap 15 adalah SuSEfirewall, dan akan digantikan dengan [Firewalld](http://www.firewalld.org/). Firewalld dikembangkan oleh Red Hat dan telah menjadi *default management tool firewall* untuk RHEL, Centos dan Fedora. openSUSE memutuskan untuk menggunakan firewalld menggantikan SuSEfirewall yang telah digunakan selama ini. Bagi pengguna Tumbleweed dan openSUSE Leap 15 beta mungkin telah mencoba menggunakannya.

Bagi pengguna yang menggunakan SuSEfirewall mungkin akan menemukan sedikit kesulitan jika tidak mengetahui tentang hal ini dan melakukan zypper dup dari openSUSE Leap 42.3 ke 15.

Bagi pengguna desktop tidak usah ragu-ragu menggunakan firewalld karena pengembangnya sudah menyertakan GUI yang cukup mudah untuk digunakan bernama firewall-config. Yast sendiri tidak menyertakan antarmuka firewall khusus untuk firewalld melainkan juga menggunakan firewall-config.

Saat pertama kali diinstall firewalld akan mengaktifkan (default) zone public. Ada banyak pilihan zone yaitu block,  dmz, drop, external, home, internal, public, trusted, work, dengan default pengaturan yang berbeda-beda. Supaya tidak bingung, saya langsung konfigurasi yang saya atur di laptop yang saya pasang openSUSE Leap 15.

Laptop ini terkoneksi ke akses point melalui wlan0, dan koneksi yang harus diizinkan adalah PPTP dan L2TP over IPsec. Maka yang harus dibuka untuk PPTP adalah port TCP 1723 dan protokol gre. Cara mengkonfigurasinya.

1. Buka aplikasi firewall-config, atau gunakan yast, pilih menu Security and Users, klik Firewall. Jika firewall-config belum terinstall yast akan memunculkan dialog untuk memasang paket firewall-config.
2. Setelah aplikasi firewall-config terpasang maka dengan mudah anda dapat melakukan konfigurasi.
3. Pastikan bahwa wlan0 sudah terhubung ke akses point, perhatikan bahwa wlan0 masuk ke default zone public. Kemudian pada **Configuration**, pilihlah **Permanent**. Lihat gambar 1
4. Selanjutnya pilihlah tab **Ports**, dan klik **Add**. Tambahkan port 1723, protocol tcp; port 500, protocol udp; port 1701 protocol udp. Lihat gambar 2 dan gambar 3.
5. Agar dapat melakukan koneksi PPTP firewall harus mengizinkan protocol GRE. Klik tab **Protocols**, klik **Add**. Pilihlah **Other Protocol** dan isi dengan **gre**. Lihat gambar 4
6. Selanjutnya restart firewall dengan perintah **systemctl restart firewalld.service**. Agar service firewalld berjalan saat di-boot pastikan dengan **systemctl enable firewalld.service**.
7. Untuk memeriksa apakah konfigurasi sudah berjalan di sistem anda, bukalah terminal dan jalankan perintah
   * **sudo firewall-cmd –list-all-zones** , pastikan bahwa zone public dalam kondisi active, port dan protocol yang diset pada langkah-langkah sebelumnya di atas terdaftar dengan benar lihat gambar 5
   * **sudo firewall-cmd –zone=public –list-protocol** , untuk melihat protocol yang aktif
   * **sudo firewall-cmd –zone=public –list-port** , untuk melihat port yang aktif
   * **sudo firewall-cmd –zone=public –list-service** , untuk melihat service yang aktif

![gambar 1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/firewalld-pada-opensuse-leap-15-0-bagian-1/firewalld2.png)
gambar 1

![gambar 2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/firewalld-pada-opensuse-leap-15-0-bagian-1/firewalld3.png)
gambar 2

![gambar 3](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/firewalld-pada-opensuse-leap-15-0-bagian-1/firewalld4.png)
gambar 3

![gambar 4](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/firewalld-pada-opensuse-leap-15-0-bagian-1/firewalld5.png)
gambar 4

![gambar 5](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/firewalld-pada-opensuse-leap-15-0-bagian-1/Screenshot_20180308_150314.png)

Bagaimana sekiranya konfigurasi harus dilakukan pada server yang tidak menggunakan *desktop environment*, hanya terminal? Hal ini tidak sulit, kita dapat menggunakan cli tools yang bernama **firewall-cmd** seperti yang sudah sedikit dibahas diatas. Entar aja deh di bagian 2 kita bahas. Ngejar setoran dulu 😀
