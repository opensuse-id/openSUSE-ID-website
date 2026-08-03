---
title: "Memperbaiki Papan Tik MacBook Air pada openSUSE Leap (atau Linux Systemd)"
date: "2017-11-09"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Salah satu kendala jika kita memasang linux pada MacBook Air adalah dimana tombol backtick/Tilde yang tidak dapat berfungsi sesuai dengan keluarannya. Biasanya tombol tersebut akan menampilkan simbol lain. Hal ini tentu menyulitkan bilamana kita hendak membuat suatu kode maupun dalam kegiatan men..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Salah satu kendala jika kita memasang linux pada MacBook Air adalah dimana tombol backtick/Tilde yang tidak dapat berfungsi sesuai dengan keluarannya. Biasanya tombol tersebut akan menampilkan simbol lain. Hal ini tentu menyulitkan bilamana kita hendak membuat suatu kode maupun dalam kegiatan mengetik kita. Tentu sangat mengganggu bukan?

## Ternyata ..
Masalahnya sederhana, cek sendiri disini: https://bugzilla.kernel.org/show_bug.cgi?id=60181#c43

Untuk memperbaikinya, cukup jalankan satu perintah berikut :
```
echo 0 > /sys/module/hid_apple/parameters/iso_layout
Mudah, bukan?
```
## Selesai sih, tapi…
Masalah tersebut akan datang kembali jika anda menghidupkan ulang MacBook Air anda. Jika anda menggunakan SystemV atau init anda bisa membuat permanen dengan cara memasukan perintah tersebut kedalam rc.local atau boot.after.

Tapi untuk openSUSE Leap 42.3 yang menggunakan Systemd, bagaimana caranya?

Sederhana kok, cukup buat service dengan systemd pada direktori /etc/systemd/system/ dengan cara berikut :
```
[Unit]
Description=Fix MacBook Air Keyboard

[Service]
Type=oneshot
ExecStart=/bin/bash -c '/usr/bin/echo 0 > /sys/module/hid_apple/parameters/iso_layout'

[Install]
WantedBy=multi-user.target
```
Atau, untuk mempermudah, silakan download file yang sudah jadi dengan wget:
```
cd /etc/systemd/system/
wget -c https://dhenandi.com/repo/mba-keyboard-fix.service
```
Jalankan dan dan buat permanen saat booting dengan perintah berikut:
```
systemctl enable mba-keyboard-fix.service
systemctl start mba-keyboard-fix.service
```
Silakan coba hidupkan ulang MacBook Air anda apakah papan tik nya berjalan atau tidak. Jika tidak, mungkin anda perlu mempertimbangkan untuk menjual MacBook anda dan membeli Laptop openSUSE Tuxedo Infinity :-P.

<iframe width="560" height="315" src="https://www.youtube.com/embed/k6iZ5h1LAS0?si=KmjqBQZZJVVWPWe3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 