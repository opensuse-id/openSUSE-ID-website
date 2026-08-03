---
title: "Memasang Collabora Office (Snapshot) pada openSUSE Tumbleweed"
date: "2020-05-21"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Apa itu Collabora Office? Collabora Office adalah enterprise office suite dari LibreOffice, office suite Open Source yang paling banyak digunakan di dunia. Apakah Anda pernah mencoba Collabora Office? Mari kita coba snapshot terbaru. Anda juga dapat mencobanya di openSUSE Leap. Unduh dan impor ku..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/memasang-collabora-office-snapshot-pada-opensuse-tumbleweed/collabora-office-1232x693.png"
---

![Collabora Office](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/memasang-collabora-office-snapshot-pada-opensuse-tumbleweed/collabora-office-1232x693.png)

Apa itu Collabora Office? Collabora Office adalah *enterprise office suite* dari LibreOffice, *office suite* Open Source yang paling banyak digunakan di dunia.

Apakah Anda pernah mencoba Collabora Office? Mari kita coba snapshot terbaru. Anda juga dapat mencobanya di openSUSE Leap.

* Unduh dan impor kunci
  ```
  wget https://www.collaboraoffice.com/Collabora-Office-6.2-Snapshot/Linux/yum/repodata/repomd.xml.key && sudo rpm --import repomd.xml.key
  ```
* Tambah repositori
  ```
  sudo zypper addrepo 'https://www.collaboraoffice.com/Collabora-Office-6.2-Snapshot/Linux/yum' 'Collabora Office 6.2 Snapshot'
  ```
* Segarkan
  ```
  sudo zypper ref
  ```
* Pasang
  ```
  sudo zypper install collaboraoffice
  ```

Enjoy!