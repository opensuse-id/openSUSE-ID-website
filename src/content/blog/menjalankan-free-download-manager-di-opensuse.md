---
title: "Menjalankan Free Download Manager di openSUSE"
date: "2020-07-04"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Free Download Manager adalah salah satu aplikasi download manager populer di Windows sebagai alternatif dari Internet Download Manager (IDM) yang berbayar. Saya biasa menggunakan ini ketika masih menggunakan Windows XP dulu, tapi sayangnya dulu tidak ada versi Linux. Namun sejak versi 6 Free Down..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/menjalankan-free-download-manager-di-opensuse/fdm.png"
---

Free Download Manager adalah salah satu aplikasi download manager populer di Windows sebagai alternatif dari Internet Download Manager (IDM) yang berbayar. Saya biasa menggunakan ini ketika masih menggunakan Windows XP dulu, tapi sayangnya dulu tidak ada versi Linux.

Namun sejak versi 6 Free Download Manager menyediakan versi Linux walaupun berbentuk **.deb**. Tapi ini bisa kita gunakannya di openSUSE, walaupun openSUSE menggunakan **.rpm**. Free Download Manager untuk Linux bisa diunduh dari [halaman ini](https://www.freedownloadmanager.org/download-fdm-for-linux.htm).

Untuk dijalankan di openSUSE, setelah file **freedownloadmanager.deb** berhasil diunduh, ekstrak file tersebut dengan klik kanan > **extract** dari file manager. Di dalam folder hasil extrak ada beberapa file yang salah satunya bernama **data.tar.xz**. Extrak file tersebut dan ubah folder hasil extrak dari **data** menjadi **FDM** (dengan huruf besar) lalu pindahkan ke ~/bin di homedir.

Lalu buat sebuah file teks dengan nama **fdm** (dengan huruf kecil) dan isi file tersebut dengan:

```
#!/bin/bash

DIR=$(dirname "$0")
export QT_QPA_PLATFORM=xcb # Jika menggunakan sesi Wayland
exec $DIR/FDM/opt/freedownloadmanager/fdm "$@"
```

Opsi `export QT_QPA_PLATFORM=xcb` digunakan jika kita menggunakan sesi Wayland, karena sepertinya **Free Download Manager** belum memiliki dukungan untuk Wayland.

Buat file tersebut menjadi *executable* dengan perintah `chmod +x ~/bin/fdm` atau melalui file manager **Dolphin** dengan cara klik kanan > **Properties**, pada tab **Permissions** centang **Is executable**.

Pindahkan atau salin file **freedownloadmanager.desktop** dari **~/bin/FDM/usr/share/application** ke **~/.local/share/applications** (buat folder **applications** jika tidak ada). Juga pindahkan atau salin file **icon.png** dari **~/bin/FDM/opt/freedownloadmanager** ke **~/.local/share/icons** (buat folder **icons** jika tidak ada), lalu ubah namanya dari **icon.png** menjadi **fdm.png**.

Buka file **freedownloadmanager.desktop** yang berada di **~/.local/share/applications** menggunakan teks editor. Ubah bagian `Exec=/opt/freedownloadmanager/fdm` menjadi `Exec=fdm` saja. Ubah juga bagian `Icon=/opt/freedownloadmanager/icon.png` menjadi `Icon=fdm`.

Terakhir, periksa apakah paket **libgthread-2_0-0** sudah terpasang dengan perintah `zypper search --installed-only libgthread`. Jika Anda memasang openSUSE dengan cara minimal/custom install seperti saya bisa saja belum terpasang. Jika belum terpasang Anda bisa memasangnya dengan perintah `su -c "zypper install libgthread-2_0-0"` atau bisa juga hanya mengunduhnya saja dengan perintah `su -c "zypper install --download-only libgthread-2_0-0"` lalu cari file hasil unduh di **/var/cache/zypp/packages/repo-oss/x86_64** extrak file tersebut lalu pindahkan atau salin isinya ke **~/bin/FDM/opt/freedownloadmanager/lib**.

Langkah terakhir adalah mengintegrasikannya dengan web browser yang kita gunakan. Jika menggunakan **Falkon** kita bisa mengaturnya di **Preferences** > **Downloads**, centang bagian **Use external download manager** dan isi kolom **Executable:** dengan `fdm`. Untuk browser lain seperti **Firefox**, **Chrome/ium** bisa memasang **FDM extension** melalui web store masing-masing (saya belum mencobanya).

Setelah semua selesai kita bisa langsung menggunakannya untuk mengunduh openSUSE Leap terbaru.