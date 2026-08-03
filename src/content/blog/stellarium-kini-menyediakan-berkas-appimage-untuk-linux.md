---
title: "Stellarium kini menyediakan berkas AppImage untuk Linux"
date: "2018-01-19"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Stellarium adalah software yang selalu terpasang di komputer saya. Software ini biasanya saya gunakan untuk melihat bulan baru untuk menentukan tanggal 1 bulan Hijriyyah. Ini sangat bermanfaat terutama ketika menghadapi bulan Ramadhan dan Syawal atau Dzulhijjah. Biasanya saya memasang Stellarium ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---


Stellarium adalah software yang selalu terpasang di komputer saya. Software ini biasanya saya gunakan untuk melihat bulan baru untuk menentukan tanggal 1 bulan Hijriyyah. Ini sangat bermanfaat terutama ketika menghadapi bulan Ramadhan dan Syawal atau Dzulhijjah.

Biasanya saya memasang Stellarium dari repositori yang disediakan oleh distribusi Linux yang saya gunakan, artinya di openSUSE saya selalu memasangnya dengan `sudo zypper install stellarium` karena di versi 0.16.1 dan sebelumnya pengembang Stellarium hanya menyediakan kode sumber saja untuk Linux.

Tapi mulai versi 0.17 untuk pengguna Linux, pengembang Stellarium menyediakan berkas binari berbentuk **AppImage** yang bisa diunduh dari [halaman ini](https://github.com/Stellarium/stellarium/releases).

Untuk menjalankannya Anda hanya perlu membuatnya bisa dieksekusi dengan cara klik kanan pada berkas AppImage Stellarium, lalu pilih menu **Properties**, lalu pada tab **Permissions** centang pilihan **Is executable**. Setelah itu Anda tinggal menjalankannya dengan cara klik ganda.

Dan saya mengerti kalau banyak pengguna Linux yang lebih nyaman dengan *CLI*. Untuk melakukannya dengan *CLI* Anda bisa membuka terminal di mana berkas AppImage Stellarium berada, lalu tekan **Shift** dan **F4** secara bersamaan untuk membuka terminal. Setelah terminal muncul, jalankan perintah `chmod +x nama-berkas.AppImage` untuk membuatnya bisa dieksekusi. Lalu perintah `./nama-berkas.AppImage` untuk menjalankannya.

Menjalankan AppImage dengan cara di atas membutuhkan paket **fuse** terpasang di sistem Anda. Jika Anda menginstall openSUSE dengan [cara minimal](https://kiki-syahadat.blogspot.com/2017/02/install-sangat-minimal-opensuse-dengan.html) seperti yang saya lakukan mungkin paket ini belum terpasang. Maka pilihannya ada dua; pertama Anda memasang paket **fuse** atau pilihan kedua adalah dengan membongkar berkas AppImage. Dan saya biasanya lebih memilih cara kedua.

Untuk membongkar berkas AppImage Anda perlu membuatnya bisa dieksekusi dengan cara di atas, lalu membuka terminal di mana berkas AppImage berada. Kemudian jalankan perintah `./nama-berkas.AppImage --appimage-extract`. Perintah tersebut akan menghasilkan sebuah folder dengan nama **squashfs-root** yang berisi folder **usr** dan berkas-berkas lain.

Pindahkan folder **usr** ke tempat di mana Anda akan menjalankannya, misalnya saya menyimpannya di folder **bin** yang berada di direktori home, lalu ubah nama folder **usr** tersebut menjadi **Stellarium** untuk membedakan dengan aplikasi lain jika Anda punya AppImage lain yang akan dijalankan dengan cara yang sama. Lalu pindahkan file **stellarium.desktop** ke **~/.local/share/applications** dan file **stellarium.png** ke **~/.local/share/icons**. Jika folder-folder tersebut tidak ada, Anda bisa membuatnya.

Langkah terakhir adalah membuat sebuah berkas teks dengan nama **stellarium** di folder **bin** di direktori home, satu tempat dengan folder **Stellarium** tadi. Isi berkas teks tersebut dengan:

```
#!/bin/bash
export PATH=~/bin/Stellarium/bin:$PATH
export LD_LIBRARY_PATH=/~bin/Stellarium/lib:$LD_LIBRARY_PATH
exec stellarium
```

Setelah selesai, buat berkas tersebut bisa dieksekusi seperti langkah di atas. Anda bisa langsung menjalankan Stellarium lewat menu atau dengan perintah `stellarium` di terminal, karena di openSUSE direktori **bin** yang berada di direktori home sudah masuk dalam *PATH environment*.
