---
title: "LibreOffice 6.0 portable untuk Linux"
date: "2018-02-03"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "The Document Foundation baru saja merilis LibreOffice 6.0 beberapa hari lalu. Bagi pengguna openSUSE Tumbleweed, LibreOffice terbaru ini bahkan sudah ada sejak beberapa minggu lalu, ketika statusnya masih pre release. Untuk pengguna openSUSE Leap sepertinya tidak akan bisa menikmatinya jika hanya..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

**The Document Foundation** baru saja merilis **LibreOffice 6.0** beberapa hari lalu. Bagi pengguna **openSUSE Tumbleweed**, **LibreOffice** terbaru ini bahkan sudah ada sejak beberapa minggu lalu, ketika statusnya masih *pre release*. Untuk pengguna **openSUSE Leap** sepertinya tidak akan bisa menikmatinya jika hanya menggunakan repositori resmi hingga **openSUSE Leap 15.0** rilis.

Ada beberapa cara supaya pengguna **Leap** bisa segera menggunakan **LibreOffice 6.0**, yaitu dengan menambahkan repositori **LibreOffice** dari **OBS**, menggunakan versi **AppImage**, **Flatpak** atau **Snap** dari pemaket pihak ketiga. Atau yang paling mudah adalah dengan mengunduh langsung dari situsnya di [halaman ini](https://www.libreoffice.org/download/download/).

Jika mengunduh langsung dari situs **LibreOffice**, kita bisa memasangnya dengan dua cara, yaitu dengan memasang ke dalam sistem atau menggunakannya seperti aplikasi portable. Jika Anda ingin memasangnya ke dalam sistem, Anda bisa membaca artikel saya yang berjudul [Menginstall file rpm di openSUSE](http://kiki-syahadat.blogspot.com/2016/07/menginstall-file-rpm-di-opensuse.html). Tapi jika Anda akan memasangnya sebagai aplikasi portable, Anda bisa melanjutkan membaca tulisan ini.

Setelah mengunduh **LibreOffice** dari halaman [www.libreoffice.org/download/download/](https://www.libreoffice.org/download/download/) kita bisa langsung membongkarnya dengan cara klik kanan, lalu pilih `Extract` => `Extract archive here`. Hasil ekstraksi akan menghasilkan sebuah folder yang berisi folder **readmes**, **RPMS** dan sebuah berkas **install**. Berkas **install** inilah yang akan kita gunakan untuk memasang **LibreOffice** secara portable.

Untuk menjalankan berkas **install** ini kita bisa membuka terminal di mana berkas tersebut berada dengan cara klik kanan di area kosong, lalu pilih `Open Terminal Here`. Setelah itu kita bisa menjalankan perintah `./install RPMS ~/bin/LibreOffice`. Kode `./install` adalah untuk menjalankan berkas tersebut, `RPMS` adalah di mana semua berkas **rpm** berada dan `~/bin/LibreOffice` adalah tujuan di mana kita ingin menyimpan instalasi **LibreOffice**, Anda bisa menyesuaikannya, pastikan Anda memiliki hak baca tulis jika Anda memasang di tempat lain.

Setelah selesai dengan proses tersebut, kita bisa membuka direktori **bin** di direktori **HOME**. Buat sebuah berkas dengan nama `libreoffice6.0` dan isi berkas tersebut dengan:

```
#!/bin/bash
export PATH=~/bin/LibreOffice/opt/libreoffice6.0/program:$PATH
exec soffice "$@"
```

Buat berkas tersebut supaya bisa dieksekusi dengan cara klik kanan, lalu pilih `Properties`, pilih tab `Permissions`. Centang pilihan `Is executable`, lalu klik `OK`. Selesai, kita bisa menjalankannya dengan perintah `libreoffice6.0`.

Untuk bisa menjalankannya lewat menu, kita bisa menyalin atau memindahkan berkas-berkas **desktop** yang ada di `~/bin/LibreOffice/opt/libreoffice6.0/share/xdg` ke `~/.local/share/applications`. Sampai di sini **LibreOffice 6.0** sudah muncul di menu, tapi mungkin tidak ada gambar ikonnya. Untuk menampilkan ikon, kita bisa membuka berkas-berkas **desktop** tadi, lalu cari teks `Icon=libreoffice6.0` dan hilangkan angka `6.0` menjadi `Icon=libreoffice`.

Instalasi dengan cara ini benar-benar membuat **LibreOffice** portable. Bahkan berkas-berkas konfigurasi pun akan berada di dalam folder instalasi, bukan di direktori `~/.config` seperti biasanya.

Dan untuk melengkapi ke-*portable*-annya, kita juga bisa menambahkan **JRE** ke dalam folder instalasi **LibreOffice**. Caranya, unduh **JRE** dari [halaman ini](http://www.oracle.com/technetwork/java/javase/downloads/jre9-downloads-3848532.html). Klik `Accept License Agreement`, lalu unduh berkas **jre linux x64 rpm**. Setelah terunduh, ektrak berkas rpm tersebut dengan cara seperti di atas, lalu pindahkan folder **usr** ke `~/bin/LibreOffice`, bersebelahan dengan folder **opt**.

Setelah selesai memindahkan hasil ekstraksi **JRE**, buka **LibreOffice 6.0**, lalu buka menu `Tools` => `Options`. Pilih opsi `LibreOffice` => `Advanced`. Klik tombol `Add`, lalu arahkan ke direktori `~/bin/LibreOffice/usr/java/jre-9.0.4` (ini versi JRE9 yang tersedia saat artikel ini ditulis, Anda bisa menyesuaikan angkanya dengan yang Anda unduh). Lalu klik `OK`.

Setelah selesai, kita bisa menikmati **LibreOffice 6.0** di **openSUSE Leap**. Dan dengan cara ini, **LibreOffice** bisa dibawa ke dalam *Flash Disk* dan di jalankan di komputer lain dengan sistem operasi **Linux** dan bisa diperbarui tanpa harus mengunduh dan memasang ulang. Cukup dengan memilih menu `Help` => `Check for Updates...` dari **LibreOffice 6.0** dan pembaruan yang akan diunduh juga hanya [sebagian](https://mmohrhard.wordpress.com/2017/06/21/announcing-automatically-updating-libreoffice-builds/) saja, tidak seperti kita mengunduh berkas secara utuh.