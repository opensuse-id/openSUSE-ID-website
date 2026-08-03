---
title: "Membuat fitur serupa Deep Freeze"
date: "2019-02-17"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Bagi Anda yang pernah ke warung internet (warnet) atau pernah mengelola warnet mungkin mengetahui sebuah software bernama Deep Freeze. Software ini digunakan untuk menyimpan kondisi komputer pada keadaan tertentu dan memuatnya kembali saat komputer dijalankan. Jadi meskipun kita melakukan banyak ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Bagi Anda yang pernah ke warung internet (warnet) atau pernah mengelola warnet mungkin mengetahui sebuah software bernama **Deep Freeze**. Software ini digunakan untuk menyimpan kondisi komputer pada keadaan tertentu dan memuatnya kembali saat komputer dijalankan. Jadi meskipun kita melakukan banyak perubahan, saat kita menjalankan ulang komputer, perubahan tersebut akan hilang. Saya belum/tidak pernah menggunakan **Deep Freeze**, tapi saya pernah mencoba software serupa buatan **Microsoft** bernama **Steady State** yang hanya dibuat untuk **Windows XP**, tidak bisa dipasang di **Windows Vista** atau yang lebih baru.

Di **openSUSE** fitur ini bisa dibuat tanpa harus memasang software tambahan (kecuali jika Anda memasang [openSUSE minimal install](https://kiki-syahadat.blogspot.com/2018/06/opensuse-minimal-install.html)). Anda hanya perlu memasang openSUSE pada *filesystem* **BtrFS** dan memanfaatkan **Snapper**.

Misalnya jika kita ingin membuat fitur tersebut pada $HOME, kita hanya perlu memastikan bahwa **/home** berada pada sebuah partisi atau sebuah *subvolume* dari *filesystem* **BtrFS**. Lalu kita atur direktori $HOME seperti yang kita inginkan setiap kali komputer dijalankan. Setelah itu kita tinggal lakukan beberapa hal berikut:

- Buat konfigurasi **snapper** untuk **/home**,  

`su -c "snapper -c home create-config /home"`
- Matikan opsi untuk membuat *snapshot* secara otomatis setiap jam,  

`su -c "snapper -c home set-config TIMELINE_CREATE=no"`  

Untuk melihat opsi lainnya Anda bisa menjalankan perintah,  

`su -c "snapper -c home get-config"`
- Buat *snapshot* untuk dijadikan titik *reset*,  

`su -c "snapper -c home create -d 'reset'"`
- Lihat di nomor berapa *snapshot* dengan deskripsi **reset** berada,  

`su -c "snapper -c home list"`  

Jika belum pernah membuat *snapshot* sebelumnya, seharusnya adalah *snapshot* nomor 1.
- Buat sebuah berkas teks di **/etc/systemd/system** dengan nama **reset.service**. Isi berkas tersebut dengan,
```
[Unit]
Description=Reset partisi /home ke kondisi awal

[Service]
Type=oneshot
ExecStart=/usr/bin/snapper -c home undochange 1..0

[Install]
WantedBy=multi-user.target
```
Sesuaikan angka **1..0** dengan nomor hasil perintah sebelumnya.
- Aktifkan *service* dari *unit* yang baru saja dibuat,  

`su -c "systemctl enable reset.service"`

Setelah *service* diaktifkan, silakan buat perubahan di direktori $HOME Anda. Ketika komputer dijalankan ulang, semua perubahan akan hilang dan direktori $HOME akan kembali ke kondisi saat *snapshot* nomor 1 dibuat.