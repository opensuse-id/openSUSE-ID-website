---
title: "Solusi Grub Tidak Muncul saat Dual Boot dengan Windows 10"
date: "2017-08-23"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Setelah memasang openSUSE Tumbleweed dengan skeman dual boot dengan Microsoft Windows 10, ada kemungkinan boot loader yang muncul masih menggunakan bawaan dari Windows 10. Sebelumnya, tulisan ini tidak akan membahas bagaimana cara untuk memasang openSUSE dual boot dengan Windows 10, tetapi hanya ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/solusi-grub-tidak-muncul-saat-dual-boot-dengan-windows-10/grub-opensuse-windows10.jpg"
---

![Grub](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/solusi-grub-tidak-muncul-saat-dual-boot-dengan-windows-10/grub-opensuse-windows10.jpg)

Setelah memasang openSUSE Tumbleweed dengan skeman dual boot dengan Microsoft Windows 10, ada kemungkinan boot loader yang muncul masih menggunakan bawaan dari Windows 10. Sebelumnya, tulisan ini tidak akan membahas bagaimana cara untuk memasang openSUSE dual boot dengan Windows 10, tetapi hanya menjelaskan bagaimana proses selanjutnya setelah memasang openSUSE (dan mungkin distro lainnya) yang bersebelahan (dual boot) dengan Microsoft Windows 10.

Jika setelah selesai proses pemasangan openSUSE dan masih saja masuk ke Sistem Operasi Windows 10 tanpa ada grub muncul di layar, sebaiknya anda jangan langsung panik bahwa proses pemasangan tersebut gagal, karena sebenarnya, openSUSE berhasil terpasang di partisi yang telah disesuaikan, dan juga berkas `grub.efi` telah disalin di partisi EFI. Yang anda perlukan hanyalah beberapa langkah berikut ini

**Cari Berkas grub di Partisi EFI**  
Masih di Sistem Operasi Windows 10, buka `Command Prompt` sebagai Administrator lalu berikan perintah

```
mountvol X: /s
```

Kemudian masuk ke direktori opensuse pada kandar EFI dengan perintah

```
cd X:\EFI\opensuse
```

Pada direktori ini terdapat satu buah berkas dengan ekstensi `.efi` yang nantinya akan digunakan sebagai boot manager default, berikan perintah `dir` untuk melihat nama berkas secara utuh di command prompt yang sama, misalkan `grubx64.efi`

**Mengatur Boot Manager**  
Langkah ini adalah untuk mengatur boot manager agar boot loader yang digunakan adalah grub, masih dengan command prompt yang sama dengan sebelumnya dan masih dengan akses `Administrator`, berikan perintah berikut (ganti nama berkas ‘grubx64.efi’ jika berkas boot loader berbeda)

```
bcdedit /set {bootmgr} path \EFI\opensuse\grubx64.efi
```

**Restart**  
Setelah semua proses di atas selesai, yang harus dilakukan kemudian adalah restart komputer anda untuk melihat hasilnya.