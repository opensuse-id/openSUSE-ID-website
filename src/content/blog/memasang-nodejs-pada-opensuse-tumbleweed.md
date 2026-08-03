---
title: "Memasang NodeJS pada openSUSE Tumbleweed"
date: "2017-01-28"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Kali ini, kita akan mencoba memasang NodeJS pada openSUSE Tumbleweed. Sampai panduan ini ditulis, versi NodeJS versi 6 LTS terakhir di openSUSE Tumbleweed adalah 6.9.3, sedangkan di NodeJS telah menyediakan versi 6.9.4. Adakalanya kita ingin memasang versi yang lebih baru dari yang ada di repo. U..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-nodejs-pada-opensuse-tumbleweed/nodejs-new-pantone-black.png"
---

Kali ini, kita akan mencoba memasang [NodeJS](https://nodejs.org/en/) pada openSUSE Tumbleweed. Sampai panduan ini ditulis, versi NodeJS versi 6 LTS terakhir di openSUSE Tumbleweed adalah [6.9.3](https://build.opensuse.org/package/show?project=openSUSE%3AFactory&package=nodejs6), sedangkan di NodeJS telah menyediakan versi 6.9.4. Adakalanya kita ingin memasang versi yang lebih baru dari yang ada di repo. Untuk panduan memasang NodeJS dari repositori ada [disini](https://nodejs.org/en/download/package-manager/#opensuse-and-sle). Panduan ini akan mencoba untuk memasang NodeJS dari kode sumber.

* Unduh kode sumber NodeJS

  ```
  wget -c https://nodejs.org/dist/v6.9.4/node-v6.9.4-linux-x64.tar.xz
  ```
* Ekstrak kode sumber NodeJS kedalam folder `/tmp`

  ```
  sudo tar xvfJ node-v6.9.4-linux-x64.tar.xz -C /tmp
  ```
* Relokasi NodeJS ke `/usr/local/node`

  ```
  sudo su -c "chown -R root:root /tmp/node*"
  ```

  ```
  sudo mv /tmp/node* /usr/local/node
  ```
* Atur path untuk local user, buka berkas `.bashrc`

  ```
  nano $HOME/.bashrc
  ```

  lalu tambahkan pada bagian akhir baris berikut

  ```
  export PATH=$PATH:/usr/local/node/bin
  ```

  simpan dan kemudian muat ulang

  ```
  source $HOME/.bashrc
  ```
* Untuk melihat apakah NodeJS telah terpasang, silakan ketik

  ```
  node -v
  ```
* Hasilnya akan seperti gambar berikut ![Cuplikan layar dari 2017-01-28 10-46-30](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-nodejs-pada-opensuse-tumbleweed/Cuplikan-layar-dari-2017-01-28-10-46-30.png)