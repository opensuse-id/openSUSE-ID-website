---
title: "Memasang Google Fonts pada openSUSE Tumbleweed"
date: "2017-01-27"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Ingin memasang Google Fonts (https://fonts.google.com) pada komputer Anda? Caranya cukup mudah. Pastikan komputer Anda terhubung dengan internet untuk mengikuti panduan ini. Buat folder /usr/local/share/fonts/ dengan perintah sudo mkdir /usr/local/share/fonts/ Jalankan perintah curl https://raw.g..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-google-fonts-pada-opensuse-tumbleweed/splash.png"
---

Ingin memasang Google Fonts ([https://fonts.google.com](https://fonts.google.com/)) pada komputer Anda? Caranya cukup mudah. Pastikan komputer Anda terhubung dengan internet untuk mengikuti panduan ini.

* Buat folder `/usr/local/share/fonts/` dengan perintah

  ```
  sudo mkdir /usr/local/share/fonts/
  ```
* Jalankan perintah

  ```
  curl https://raw.githubusercontent.com/qrpike/Web-Font-Load/master/install_debian.sh | sh
  ```
* Proses instalasi akan berlangsung seperti berikut

![VirtualBox_Tumbleweed_27_01_2017_17_00_02](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-google-fonts-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_27_01_2017_17_00_02.png)

* Setelah instalasi selesai, sebagai contoh, silakan buka LibreOffice Writer. Silakan ketik dan coba berbagai macam fonta dari Google Fonts.

![VirtualBox_Tumbleweed_27_01_2017_17_16_42](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-google-fonts-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_27_01_2017_17_16_42.png)

PS: timbul pertanyaan kenapa menggunakan `install_debian.sh`? Penjelasan [disini](https://github.com/qrpike/Web-Font-Load) yaitu “*The Debian install script should work for most Linux distros*.” Oleh karena itu ada langkah pertama agar skrip ini tidak galat ketika dijalankan.
