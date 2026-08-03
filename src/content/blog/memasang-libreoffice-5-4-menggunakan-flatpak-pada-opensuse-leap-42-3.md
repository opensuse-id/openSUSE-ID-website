---
title: "Memasang LibreOffice 5.4 Menggunakan Flatpak Pada openSUSE Leap 42.3"
date: "2017-08-12"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Langkah pertama adalah memasang Flatpak pada openSUSE $ sudo zypper install flatpak Berikutnya adalah menambahkan repositori Flatpak yang mengandung runtime GNOME $ wget https://sdk.gnome.org/keys/gnome-sdk.gpg $ flatpak remote-add –user –gpg-import=gnome-sdk.gpg gnome https://sdk.gnome.org/repo/..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-libreoffice-5-4-menggunakan-flatpak-pada-opensuse-leap-42-3/flatpak-250x250.png"
---

Langkah pertama adalah memasang [Flatpak](http://flatpak.org/) pada openSUSE

```
$ sudo zypper install flatpak
```

Berikutnya adalah menambahkan repositori Flatpak yang mengandung runtime GNOME

```
$ wget https://sdk.gnome.org/keys/gnome-sdk.gpg
$ flatpak remote-add --user --gpg-import=gnome-sdk.gpg gnome https://sdk.gnome.org/repo/
$ flatpak install --user gnome org.gnome.Platform 3.24
```

Unduh berkas LibreOffice Flatpak pada laman [ini](http://www.libreoffice.org/download/flatpak/)

```
$ wget http://download.documentfoundation.org/libreoffice/flatpak/latest/LibreOffice.flatpak
```

Pasang LibreOffice Flatpak

```
$ flatpak install --user --bundle LibreOffice.flatpak
```

Jalankan LibreOffice Flatpak

```
$ flatpak run org.libreoffice.LibreOffice
```

![VirtualBox_Leap-42.3_12_08_2017_19_32_53.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-libreoffice-5-4-menggunakan-flatpak-pada-opensuse-leap-42-3/VirtualBox_Leap-42.3_12_08_2017_19_32_53.png)