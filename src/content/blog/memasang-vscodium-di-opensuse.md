---
title: "Memasang VSCodium di openSUSE"
date: "2020-09-25"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Free/Libre Open Source Software Binaries of VSCode Kode sumber Microsoft vscode adalah sumber terbuka (berlisensi MIT), tetapi produk yang tersedia untuk diunduh (Visual Studio Code) dilisensikan di bawah lisensi bukan FLOSS dan berisi telemetri/pelacakan. Proyek VSCodium ada sehingga Anda tidak ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/memasang-vscodium-di-opensuse/code.png"
---

> Free/Libre Open Source Software Binaries of VSCode

Kode sumber Microsoft vscode adalah sumber terbuka (berlisensi MIT), tetapi produk yang tersedia untuk diunduh (Visual Studio Code) dilisensikan di bawah lisensi bukan FLOSS dan berisi telemetri/pelacakan.

Proyek VSCodium ada sehingga Anda tidak perlu mengunduh + build dari sumber. Proyek ini menyertakan skrip build khusus yang mengkloning repo Microsoft vscode, menjalankan perintah build, dan mengunggah binari yang dihasilkan untuk pengguna. Binari ini dilisensikan di bawah lisensi MIT. Telemetri dinonaktifkan.

Cara memasangnya di openSUSE adalah sebagai berikut.

1. Tambahkan kunci gpg
   ```
   sudo rpm --import https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg
   ```

2. Tambahkan repo VSCodium
   ```
   printf "[gitlab.com_paulcarroty_vscodium_repo]\nname=gitlab.com_paulcarroty_vscodium_repo\nbaseurl=https://paulcarroty.gitlab.io/vscodium-deb-rpm-repo/rpms/\nenabled=1\ngpgcheck=1\nrepo_gpgcheck=1\ngpgkey=https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg" |sudo tee -a /etc/zypp/repos.d/vscodium.repo
   ```

3. Pasang VSCodium
   ```
   sudo zypper in codium
   ```