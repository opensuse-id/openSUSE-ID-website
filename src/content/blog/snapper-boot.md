---
title: "snapper-boot"
date: "2019-02-28"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Di tulisan saya sebelumnya tentang Membuat konfigurasi Snapper saya menuliskan bagaimana cara membuat snapshot otomatis saat booting. Di sana saya menggunakan service systemd untuk semua konfigurasi Snapper (root, home, var, local, srv, su dan opt). Di tulisan ini saya ingin membuatnya lebih sede..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Di tulisan saya sebelumnya tentang [Membuat konfigurasi Snapper](https://kiki-syahadat.blogspot.com/2018/12/membuat-konfigurasi-snapper.html) saya menuliskan bagaimana cara membuat *snapshot* otomatis saat *booting*. Di sana saya menggunakan *service systemd* untuk semua konfigurasi **Snapper** (root, home, var, local, srv, su dan opt). Di tulisan ini saya ingin membuatnya lebih sederhana.

Jika di tulisan tersebut saya menyalin dua berkas **snapper-boot.service** dan **snapper-boot.timer**, mengubah isinya, lalu menyalin kedua berkas tersebut untuk digunakan oleh konfigurasi lain, di sini saya hanya menggunakan kedua berkas tersebut untuk semua konfigurasi **Snapper**.

Jika Anda sudah terlanjur mengikuti tulisan tersebut, matikan dulu semua *service* **snapper-boot** dengan perintah;

`su -c "systemctl disable snapper-boot.timer"`

Lakukan juga untuk konfigurasi lainnya.

Lalu hapus semua berkas *snapper-boot\** dari **/etc/systemd/system/**.

Buat sebuah berkas teks di **/usr/local/bin/** dengan nama `snapper-boot` dan ubah hak aksesnya supaya bisa dieksekusi dengan perintah;

`su -c "chmod +x /usr/local/bin/snapper-boot"`

Isi berkas tersebut dengan;

```
#!/bin/bash

configs=$(snapper list-configs | awk '{print $1}' | tail -n +3 | tr '
' ' ')
for config in $configs; do
snapper -c $config create -c timeline -d "boot"
done
```

Salin berkas **snapper-boot.service** dan **snapper-boot.timer** dari **/usr/lib/systemd/system/** ke **/etc/systemd/system/** dan ubah bagian `ExecStart` pada berkas **snapper-boot.service** menjadi;

`/usr/local/bin/snapper-boot`

Setelah itu jalankan kembali **snapper-boot.timer**;

`su -c "systemctl enable snapper-boot.timer"`

Selesai.