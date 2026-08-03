---
title: "Memasang Katalon Studio Pada openSUSE Leap"
date: "2020-05-19"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Daftar di web Katalon. Jika sudah memiliki akun, silakan masuk. Unduh Katalon Studio for Linux. Nama berkas yang diunduh adalah Katalon_Studio_Linux_64-{version}.tar.gz. Ekstrak. Pasang OpenJDK (Gunakan OpenJDK 8) sudo zypper in java-1_8_0-openjdk Masuk ke direktori Katalon Studio cd Katalon_Stud..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/memasang-katalon-studio-pada-opensuse-leap/katalon-leap-1232x693.png"
---

![Katalon Leap](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/memasang-katalon-studio-pada-opensuse-leap/katalon-leap-1232x693.png)

* Daftar di web [Katalon](https://www.katalon.com/sign-up/). Jika sudah memiliki akun, silakan [masuk](https://www.katalon.com/sign-in/).
* Unduh [Katalon Studio for Linux](https://www.katalon.com/download/).
* Nama berkas yang diunduh adalah `Katalon_Studio_Linux_64-{version}.tar.gz`. Ekstrak.
* Pasang OpenJDK (Gunakan [OpenJDK 8](https://forum.katalon.com/t/how-to-launch-katalon-studio-in-opensuse-15-1/33108/2))
  ```
  sudo zypper in java-1_8_0-openjdk
  ```
* Masuk ke direktori Katalon Studio
  ```
  cd Katalon_Studio_Linux_64-{version}/
  ```
* Jalankan Katalon
  ```
  ./katalon
  ```
* Masuk dengan akun Anda
* Selamat, Anda telah berhaasil menjalankan Katalon Studio
* Pengaturan tambahan untuk *Mobile* dan *Web Services* silakan lihat panduan [Katalon Studio for Linux](https://docs.katalon.com/katalon-studio/docs/katalon-studio-gui-beta-for-linux.html).

