---
title: "Membuat Live USB openSUSE"
date: "2016-10-12"
author: "Tim openSUSE Indonesia"
category: kegiatan
excerpt: "Selama pelaksanaan openSUSE.Asia Summit 2016 sekitar 500 openSUSE Promo DVD dibagikan kepada setiap peserta. Selain itu bagi yang beruntung juga mendapatkan USB disk 8GB di booth openSUSE. Mohon maaf kami tidak bisa memberikan USB disk kepada setiap peserta karena jumlahnya terbatas hanya sekitar..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/IMG_20161011_195725505-1.jpg"
---

![img_20161011_195725505](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/IMG_20161011_195725505-1.jpg)

Selama pelaksanaan openSUSE.Asia Summit 2016 sekitar 500 openSUSE Promo DVD dibagikan kepada setiap peserta. Selain itu bagi yang beruntung juga mendapatkan USB disk 8GB di booth openSUSE. Mohon maaf kami tidak bisa memberikan USB disk kepada setiap peserta karena jumlahnya terbatas hanya sekitar 150-200 buah.

openSUSE Promo DVD bukanlah versi DVD openSUSE, tetapi merupakan racikan khusus dimana sudah dipilih paket-paket yang penting dan dibuat dalam bentuk live DVD. Jadi tanpa memasang/melakukan instalasi di laptop/pc anda sudah bisa merasakan pengalaman menggunakan openSUSE. Pilihan desktopnya juga cukup banyak ada KDE, GNOME, GNOME Classic, IceWM, dan TWM . Selain itu bagi anda yang cukup berani dapat melakukan instalasi dengan meng-klik ikon instalasi pada desktop.

Katakan anda yang berani itu, dan sudah melakukan instalasi DVD. Anda bisa membuat USB openSUSE menjadi live USB dengan menggunakan image dari openSUSE Promo DVD. Hanya butuh 2 GB untuk membuat live USB, sisanya dapat anda partisi untuk menyimpan data anda. Mari kita mulai;

**Instalasi openSUSE promo DVD di laptop anda (be brave)**

Proses instalasi dapat dimulai dengan meng-klik ikon instalasi pada desktop setelah anda mem-boot laptop anda dengan openSUSE Promo DVD. Sudah banyak panduan cara melakukan instalasi openSUSE silakan diikuti, karena tidak akan dijelaskan di dalam tulisan ini.

**Buat berkas ISO dari promo DVD**

Setelah openSUSE terpasang di laptop/pc anda silakan masukan DVD ke dalam pembaca DVD dan bukalah aplikasi k3b di desktop anda. 

![k3b-1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/k3b-1.png)

Pastikan anda memilih pembaca DVD yang berisi openSUSE Promo DVD. Selanjutnya pilihlah *Copy Medium*, dan pilihlah *Only create image* pada bagian *Settings*.

![k3b-2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/k3b-2.png)

Arahkan hasil file hasilnya ke direktori anda. Dan klik *Start*. Tunggu sampai file iso selesai dibuat.

![k3b-3](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/k3b-3.png)

Periksa file iso yang dibuat

![promo-dvd-iso](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/promo-dvd-iso.png)

**Mempartisi USB disk**

USB 8GB sangat cukup sebagai live-usb dan juga untuk menyimpan file anda. Kita akan membuat 3 buah partisi, 2 buah partisi FAT utk live USB dan Data. Data kita partisi dalam format FAT agar bisa juga dipakai pada mesin dengan OS lainnya. 1 partisi akan kita buat terenkripsi dengan file system ext4.

Klik *yast*, pilih *system* – *partitioner*

![yast-partitioner-1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/yast-partitioner-1.png)

Selanjutnya buatlah 3 buah partisi di USB disk anda. Dalam hal ini dibuat:

* partisi untuk live USB sebesar 2-2.5 GB format FAT
* partisi untuk DATA sebesar 4 GB format FAT
* partisi terenkripsi (luks) sebesar sisanya format ext4

USB disk akan ada pada device /dev/sdx, dengan x merupakan huruf tertinggi. Dalam kasus saya ada di /dev/sdh. Pilih /dev/sdh dan mulailah membuat partisi.

Partisi 1

![sdh2-1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh2-1.png)

![sdh1-1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh1-1.png)

![sdh1-2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh1-2.png)

  Pilih FAT untuk format file system

![sdh1-3](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh1-3.png)

Partisi 2

![sdh2-1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh2-1.png)

![sdh2-2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh2-2.png)

![sdh2-3](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh2-3.png)

Pilih FAT untuk format file system

![sdh2-4](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh2-4.png)

Partisi 3

![sdh3-1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh3-1.png)

![sdh3-2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh3-2.png)

![sdh3-3](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh3-3.png)

Untuk partisi 3 pilih ext4 untuk format file systemnya dan jangan lupa pilih *encrypt device*

![sdh3-4](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh3-4.png)

Jangan lupa mengisikan password sesuai keinginan anda

![sdh3-5](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh3-5.png)

Akan terlihat bahwa ada 3 partisi di dalam USB disk

![sdh4](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh4.png)

Selanjutnya tekan *next* dan *yast* akan mem-format USB disk

![sdh5](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh5.png)

![sdh6](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/sdh6.png)

Tunggu sampai proses format selesai.

**Instalasi paket live-usb-gui**

Untuk melanjutkan membuat live USB anda perlu mengunduh paket live-usb-gui. Paket live-usb-gui ini dapat membuat live USB dari sebuah berkas iso pada salah satu partisi yang terdapat di USB anda. Jadi tidak akan menghapus partisi lainnya. Melakukan instalasi paket ini cukup mudah karena terdapat pada repositori OSS jadi cukup dengan menjalankan perintah
```
# zypper in live-usb-gui
```
atau bisa menggunakan browser dengan menuju ke https://software.opensuse.org/search dan mengisikan live-usb-gui pada pencarian.

![live-usb-gui](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/live-usb-gui.png)

Lakukan instalasi dengan meng-klik tombol Direct Install (1-click install). Tunggu sampai instalasi selesai.

**Membuat live USB menggunakan live-usb-gui**

Periksa lokasi /dev dari USB disk anda. USB disk akan menempati /dev/sdx yang paling akhir. Dalam gambar di bawah ada di /dev/sdh. Kita akan memilih /dev/sdh1 sebagai lokasi instalasi file iso.

![ls-l](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/ls-l.png)

Kemudian panggilah live-usb-gui tersebut, pastikan USB disk anda terhubung dengan laptop/pc anda.

![kicker](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/kicker.png)

Selanjutnya pilihlah file iso yang telah kita buat pada bagian awal tulisan ini.

![live-usb-gui-1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/live-usb-gui-1-1.png)

Pilih USB device /dev/sdh1

![live-usb-gui-2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/live-usb-gui-2.png)

![live-usb-gui-3](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/live-usb-gui-3.png)

Tunggu sampai prosenya selesai

![live-1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/live-1.png)

![live-2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/live-2.png)

![live-usb-gui-4](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/membuat-live-usb-opensuse/live-usb-gui-4.png)

Jika dialog box di atas sudah muncul berarti live USB openSUSE Promo DVD sudah siap digunakan. Cobalah boot laptop/PC anda dengan live USB yang baru dibuat. Buat sebuah file dan simpan di partisi data. Coba baca file tersebut di PC lain. Juga coba akses partisi yang terenkripsi dan buat file di dalamnya.

Beberapa kegunaan live USB:

1. Kadang dibutuhkan untuk memperbaiki sistem linux yang korup, bisa karena masalah grub atau konfigurasi di /etc, bisa juga sekedar memeriksa kondisi disk misalnya untuk menjalankan fsck
2. Anda tetap bisa menggunakan linux di PC atau laptop orang lain tanpa perlu melakukan instalasi
3. Pamer desktop

Selamat mencoba!

Catatan:

Mungkin ada pertanyaan bagaimana membuat live usb dengan iso dari openSUSE Promo DVD dengan menggunakan sistem operasi lain misalnya Mac atau Windows atau linux distro lain? Untuk linux distro lain caranya tidak begitu berbeda, tetapi untuk Windows dan Mac bisa ikuti cara di link berikut:

[1] [cara membuat live usb di Windows](https://en.opensuse.org/SDB:Create_a_Live_USB_stick_using_Windows)

[2] [cara membuat live usb di Mac](https://en.opensuse.org/SDB:Create_a_Live_USB_stick_using_Mac_OS_x)