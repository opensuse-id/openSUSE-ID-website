---
title: "Memperbaiki Function Key Keyboard Keychron K2 di openSUSE Tumbleweed"
date: "2022-02-11"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Keychron K2 adalah keyboard external keluaran dari Keychron yang dikhususkan untuk Mac dan Windows. Ketika pertama kali menghubungkan ke openSUSE Tumbleweed ada beberapa masalah yang ditemui, salah satunya adalah tidak berfungsinya function key, issue tersebut bisa dipecahkan dengan menambahkan b..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2022/memperbaiki-function-key-keyboard-keychron-k2-di-opensuse-tumbleweed/photo_2022-02-11_15-13-07.jpg"
---

![Keychron K2](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2022/memperbaiki-function-key-keyboard-keychron-k2-di-opensuse-tumbleweed/photo_2022-02-11_15-13-07.jpg)

Keychron K2 adalah keyboard external keluaran dari Keychron yang dikhususkan untuk Mac dan Windows.

Ketika pertama kali menghubungkan ke openSUSE Tumbleweed ada beberapa masalah yang ditemui, salah satunya adalah tidak berfungsinya function key, issue tersebut bisa dipecahkan dengan menambahkan beberapa konfigurasi seperti berikut : 

* Tambahkan file *hid_apple.conf* di direktori *modprobe.d*

> `sudo vim /etc/modprobe.d/hid_apple.conf`

* Isi file tersebut dengan baris berikut 

> `options hid_apple fnmode=2`

* Simpan file kemudian jalankan perintah berikut diterminal

> `sudo mkinitrd`

* Reboot laptop/komputer Anda

Selamat menikmati function key yang telah berfungsi kembali. 

Sumber: 

* [https://github.com/Kurgol/keychron/blob/master/k2.md#f-keys-on-ubuntu](https://github.com/Kurgol/keychron/blob/master/k2.md#f-keys-on-ubuntu)