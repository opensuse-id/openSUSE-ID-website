---
title: "Memasang Vivaldi Pada openSUSE"
date: "2018-09-26"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Vivaldi 2.0 baru saja dirilis hari ini. Mari mencoba memasangnya pada openSUSE. Versi yang digunakan disini adalah openSUSE Leap 15.0. Unduh kunci publik Vivaldi wget https://repo.vivaldi.com/stable/linux_signing_key.pub Impor kunci publik Vivaldi sudo rpm –import linux_signing_key.pub Tambahkan ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-vivaldi-pada-opensuse/two-point-oh-hero-d.jpg"
---

![two-point-oh-hero-d-1024x576.jpg](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-vivaldi-pada-opensuse/two-point-oh-hero-d.jpg)

[Vivaldi 2.0](https://vivaldi.com/blog/vivaldi-2-0-your-browser-matters/)baru saja dirilis hari ini. Mari mencoba memasangnya pada openSUSE. Versi yang digunakan disini adalah openSUSE Leap 15.0.

* Unduh kunci publik Vivaldi

  ```
  wget https://repo.vivaldi.com/stable/linux_signing_key.pub
  ```
* Impor kunci publik Vivaldi

  ```
  sudo rpm --import linux_signing_key.pub
  ```
* Tambahkan repo Vivaldi

  ```
  sudo zypper ar https://repo.vivaldi.com/stable/rpm/x86_64/ Vivaldi
  ```
* Pasang Vivaldi

  ```
  sudo zypper in vivaldi-stable
  ```

Ada masalah dengan *codecs*? Silakan pasang dengan petunjuk [disini](https://gist.github.com/cho2/998073bb6567581846a09295ba1ae814).