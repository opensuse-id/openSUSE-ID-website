---
title: "Memasang Zekr pada openSUSE Tumbleweed"
date: "2017-05-26"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Zekr merupakan salah satu aplikasi Al Quran yang bebas dan terbuka. Sampai dengan panduan ini ditulis, sudah mencapai versi 1.1.0. Pada laman http://zekr.org/quran/en/quran-for-linux, pilih Red Hat RPM Package. Lalu ekstrak, misalnya /home/userAnda/zekr Pasang paket eclipse-swt dan libwebkitgtk-1..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-zekr-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_25_05_2017_20_31_45.png"
---

[Zekr](http://zekr.org/quran/en/quran-for-linux) merupakan salah satu aplikasi Al Quran yang bebas dan terbuka. Sampai dengan panduan ini ditulis, sudah mencapai versi 1.1.0.

* Pada laman [http://zekr.org/quran/en/quran-for-linux](http://zekr.org/quran/en/quran-for-linux), pilih [Red Hat RPM Package](http://sourceforge.net/projects/zekr/files/Zekr/zekr-1.1.0/zekr-1.1.0-linux.tar.gz/download).
* Lalu ekstrak, misalnya */home/userAnda/zekr*
* Pasang paket *eclipse-swt* dan*libwebkitgtk-1\_0-0*, dengan menggunakan terminal, ketik

  ```
  sudo zypper in eclipse-swt libwebkitgtk-1_0-0
  ```
* Masuk ke direktori Zekr, misalnya */home/userAnda/zekr*
* Jalankan berkas *zekr.sh*, dengan menggunakan terminal, ketik

  ```
  ./zekr.sh
  ```

![VirtualBox_Tumbleweed_25_05_2017_20_17_13.png](https://opensuse.id/wp-content/uploads/2017/05/VirtualBox_Tumbleweed_25_05_2017_20_17_13.png)

* Untuk memasang translasi Bahasa Indonesia, unduh translasinya [disini](http://zekr.org/resources.html#translation). Untuk Bahasa Indonesia sendiri ada 3, yaitu:
  + [Departemen Agama](http://tanzil.ca/trans/id.indonesian.trans.zip)
  + [Quraish Shihab](http://tanzil.ca/trans/id.muntakhab.trans.zip)
  + [Tafsir Jalalayn](http://tanzil.ca/trans/id.jalalayn.trans.zip)
* Sebagai contoh, panduan ini menggunakan translasi Departemen Agama. Berkas unduhan akan bernama *id.indonesian.trans.zip*.
* Salin atau pindahkan berkas unduhan tersebut ke dalam direktori */home/userAnda/zekr/res/text/trans*.
* Jalankan Zekr, pilih menu **View,** lalu **Translation,** kemudianpilih **[in] unknown**.

![VirtualBox_Tumbleweed_25_05_2017_20_31_45.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-zekr-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_25_05_2017_20_31_45.png)

* Translasi akan berubah ke Bahasa Indonesia sekarang.

![VirtualBox_Tumbleweed_25_05_2017_20_31_55.png](https://opensuse.id/wp-content/uploads/2017/05/VirtualBox_Tumbleweed_25_05_2017_20_31_55.png)

Akhir kata, selamat menunaikan ibadah puasa.