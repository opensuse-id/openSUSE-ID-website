---
title: "Memasang dan Menggunakan GNOME Builder pada openSUSE Tumbleweed"
date: "2017-04-16"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Sebenarnya panduan ini mengacu pada tulisan berikut: https://csorianognome.wordpress.com/2017/04/07/the-new-contribution-workflow-for-gnome/. Hal pertama yang perlu dilakukan tentu saja memasang GNOME Builder. O, iya, pastikan Anda menggunakan destop GNOME. Proses pemasangannya kurang lebih seper..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_14_47_11.png"
---

Sebenarnya panduan ini mengacu pada tulisan berikut: [https://csorianognome.wordpress.com/2017/04/07/the-new-contribution-workflow-for-gnome/](https://csorianognome.wordpress.com/2017/04/07/the-new-contribution-workflow-for-gnome/). Hal pertama yang perlu dilakukan tentu saja memasang GNOME Builder. O, iya, pastikan Anda menggunakan destop GNOME. Proses pemasangannya kurang lebih seperti pada gambar berikut. Cukup ketikkan `sudo zypper in gnome-builder` pada terminal kesayangan Anda.

![VirtualBox_Tumbleweed_16_04_2017_12_47_45.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_12_47_45.png)

![VirtualBox_Tumbleweed_16_04_2017_12_50_37.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_12_50_37.png)

Kemudian buka GNOME Builder.

![VirtualBox_Tumbleweed_16_04_2017_12_55_29.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_12_55_29.png)

Jendela GNOME Builder akan muncul seperti berikut.

![VirtualBox_Tumbleweed_16_04_2017_12_56_26.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_12_56_26.png)

GNOME memiliki repositori git sendiri yang beralamat di [https://git.gnome.org](https://git.gnome.org/). Kita akan mencoba untuk mengklon suatu repositori dan mencoba membangunnya. Tekan tombol “Klon…”.

![VirtualBox_Tumbleweed_16_04_2017_12_56_26-1.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_12_56_26-1.png)

Masukkan URL repositori yang akan diklon.

![VirtualBox_Tumbleweed_16_04_2017_13_00_24.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_13_00_24.png)

Sebagai contoh, repositori yang akan diklon adalah GNOME Maps (*https://git.gnome.org/browse/gnome-maps*) dengan alamat git *https://git.gnome.org/browse/maps*. Masukkan alamat URL tersebut seperti gambar dibawah ini, lalu tekan tombol “Klon” yang berwarna biru pada kanan atas.

![VirtualBox_Tumbleweed_16_04_2017_13_51_26.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_13_51_26.png)

Proses klon akan berlangsung. PS: Proses ini bisa jadi akan berlangsung lama (bergantung pada ukuran repositori yang diitarik ke lokal, seperti proses *git clone* pada git)

![VirtualBox_Tumbleweed_16_04_2017_13_51_34.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_13_51_34.png)

Setelah proses klon selesai, tampilan GNOME Builder akan seperti berikut.

![VirtualBox_Tumbleweed_16_04_2017_13_52_37.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_13_52_37.png)

Klik pada omnibar akan muncul seperti berikut.

![VirtualBox_Tumbleweed_16_04_2017_13_55_16.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_13_55_16.png)

Kita akan mencoba membangun GNOME Maps menggunakan GNOME Builder. Pada gambar diatas, klik tombol “Build”. Lalu proses membangun GNOME Maps akan berjalan seperti gambar dibawah ini. PS: Proses ini bisa jadi akan berlangsung lama (2).

![VirtualBox_Tumbleweed_16_04_2017_13_56_34.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_13_56_34.png)

Setelah proses bangun berhasil, tampilan akan seperti berikut.

![VirtualBox_Tumbleweed_16_04_2017_14_47_11.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_14_47_11.png)

Pada bagian kanan atas, terlihat keterangan bahwa proses bangun berhasil.

![VirtualBox_Tumbleweed_16_04_2017_14_44_23.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_14_44_23.png)

Untuk mencoba hasil bangun, tekan tombol dengan ikon *play*seperti pada gambar dibawah ini.

![Cuplikan-layar-dari-2017-04-16-14-49-40.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/Cuplikan-layar-dari-2017-04-16-14-49-40.png)

Proses instalasi akan berjalan (lihat Keluaran Build).

![VirtualBox_Tumbleweed_16_04_2017_14_51_53.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_14_51_53.png)

Kemudian, aplikasi GNOME Maps akan muncul.

![VirtualBox_Tumbleweed_16_04_2017_14_54_26.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-dan-menggunakan-gnome-builder-pada-opensuse-tumbleweed/VirtualBox_Tumbleweed_16_04_2017_14_54_26.png)

Selamat, Anda telah berhasil menggunakan GNOME Builder. Anda dapat juga mencoba untuk membangun aplikasi lainnya dari GNOME yang tersedia pada repositori GNOME ([https://git.gnome.org/browse/](https://git.gnome.org/browse/)).

Lebih lanjut mengenai GNOME Builder, Anda dapat membaca dokumentasinya di [https://builder.readthedocs.io/en/latest/index.html](https://builder.readthedocs.io/en/latest/index.html).