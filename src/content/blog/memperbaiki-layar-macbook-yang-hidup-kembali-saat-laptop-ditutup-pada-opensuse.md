---
title: "Memperbaiki Layar MacBook yang Hidup Kembali saat Laptop Ditutup pada openSUSE"
date: "2018-03-09"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Baru beberapa hari saya memasang openSUSE Leap 15 pada MacBook Air dengan menimpa ulang sistem openSUSE Leap 42.3, namun saya sudah bisa merasakan performa stabilnya yang bisa dibilang memuaskan walaupun dalam versi Beta release dengan harapan penyakit-penyakit yang ada pada versi sebelumnya bisa..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Baru beberapa hari saya memasang openSUSE Leap 15 pada MacBook Air dengan menimpa ulang sistem openSUSE Leap 42.3, namun saya sudah bisa merasakan performa stabilnya yang bisa dibilang memuaskan walaupun dalam versi Beta release dengan harapan penyakit-penyakit yang ada pada versi sebelumnya bisa teratasi pada versi major ini.

Nyatanya, penyakit-penyakit lama masih saya temui pada openSUSE 15 versi Beta. Seperti driver wireless broadcom yang tidak pernah terdeteksi saat pertama kali dipasang dan layar LID yang kembali menyala saat laptop ditutup, hal ini terlihat dari logo apel groak yang lampunya menyala saat laptop ditutup.

Walaupun demikian, saya sangat senang melakukan troubleshooting yang menantang kesabaran hingga rasanya ingin ganti laptop :-D. Soal penyakit yang kedua ini cukup merepotkan, karena laptop tidak tersuspend dan tetap berjalan saat laptop ditutup. Pernah suatu hari laptop saya panas dan suara fan nya sangat kencang sehingga tas saya ikut panas.

Pada versi sebelumnya saya sudah utak-atik segala macam, googling sana-sini. Nggak nemu, ternyata masalah tersebut terjadi karena adanya bug disisi XHCI controller yang menyebabkan terbentuknya ACPI (Advance Configuration dan Power Interface) palsu. Selain itu, modul wireless broadcom ini sepertinya juga memiliki masalah dengan suspend dan resume proses. Lebih lengkapnya bisa melihat tautan berikut :

[https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1507472](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1507472)

## Ternyata…

Solusinya sangat simple, dan bikin gondok hati karena udah mbikin puyeng :D. Cukup jalankan perintah berikut dengan privilege akses :

```
echo XHC1 > /proc/acpi/wakeup
```

Kelar!

## Selesai sih, tapi…

Masalah tersebut kembali lagi saat laptop dihidupkan ulang. Supaya tidak terjadi lagi, di openSUSE Leap anda bisa buat service menggunakan systemd pada direktori **/etc/systemd/system**, agak mirip caranya dengan tulisan saya [sebelumnya](https://opensuse.id/blog/memperbaiki-keyboard-macbook-air-pada-opensuse-leap-atau-linux-systemd/) :

```
[Unit]
Description=Fix MacBook Air LID After suspend

[Service]
Type=oneshot
ExecStart=/bin/bash -c '/usr/bin/echo XHC1 > /proc/acpi/wakeup'

[Install]
WantedBy=multi-user.target
```

Kalo gak mau ribet bisa download file yang udah jadi :

```
cd /etc/systemd/system/
wget -c https://dhenandi.com/repo/mba-lid-fix.service
```

Terakhir, jalankan supaya otomatis berjalan saat boot

```
systemctl enable mba-lid-fix.service
systemctl start mba-lid-fix.service
```

Finally, selesai silakan dicoba di Mac anda sendiri. Kalau belum bisa coba kasih saya laptopnya 😛