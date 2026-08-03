---
title: "Memperbaiki VirtualBox yang tidak bisa dijalankan setelah update kernel di openSUSE Tumbleweed"
date: "2018-12-22"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "openSUSE Tumbleweed melakukan updte secara berkala, dan kadang-kadang melakukan update kernel. Dan yang jadi permasalahan adalah, setelah update kernel, adakalanya beberapa aplikasi tidak bisa dijalankan, salah satunya adalah virtualbox. Ketika virtualbox dijalankan melalui terminal, akan ada inf..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

openSUSE Tumbleweed melakukan update secara berkala, dan kadang-kadang melakukan update kernel. Dan yang jadi permasalahan adalah, setelah update kernel, adakalanya beberapa aplikasi tidak bisa dijalankan, salah satunya adalah virtualbox.

Ketika virtualbox dijalankan melalui terminal, akan ada informasi seperti dibawah ini :

```
VirtualBox: Error -10 in SUPR3HardenedMain!
VirtualBox: Effective UID is not root (euid=1000 egid=100 uid=1000 gid=100)
VirtualBox: Tip! It may help to reinstall VirtualBox.
```

Hal yang pertama kali saya lakukan adalah melakukan reinstalasi virtualbox dengan dengan langkah-langkah :

Masuk kedalam mode root dengan perintah :

```
su -
```

Kemudian install ulang virtualbox dengan perintah :

```
zypper install -f virtualbox virtualbox-qt
```

Kemudian ganti permission aplikasi-aplikasi untuk menjalankan virtualbox dengan perintah :

```
chmod 4750 /usr/lib/virtualbox/VBoxNetNAT
chmod 4750 /usr/lib/virtualbox/VBoxNetDHCP
chmod 4750 /usr/lib/virtualbox/VBoxNetAdpCtl
chmod 4750 /usr/lib/virtualbox/VBoxHeadless
chmod 4750 /usr/lib/virtualbox/VirtualBox
chmod 4750 /usr/lib/virtualbox/VBoxSDL
```

Setelah itu, jalankan kembali aplikasi virtualbox