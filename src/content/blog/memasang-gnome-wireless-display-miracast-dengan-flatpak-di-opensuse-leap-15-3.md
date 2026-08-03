---
title: "Memasang Gnome Wireless Display (Miracast) dengan Flatpak di openSUSE Leap 15.3"
date: "2021-08-02"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Assalamu’alaikum, alhamdulillah setelah sekian lama mencari fitur serupa miracast di Linux akhirnya ketemu juga yaitu Gnome Network Display fitur ini memungkinkan kita berbagi tampilan layar dan audio desktop linux kita ke media lain berupa smart TV, saya sendiri menggunakan openSUSE Leap 15.3 de..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2021/memasang-gnome-wireless-display-miracast-dengan-flatpak-di-opensuse-leap-15-3/Screenshot-from-2021-08-02-09-50-10.png"
---


![Screenshot](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2021/memasang-gnome-wireless-display-miracast-dengan-flatpak-di-opensuse-leap-15-3/Screenshot-from-2021-08-02-09-50-10.png)

Assalamu'alaikum, alhamdulillah setelah sekian lama mencari fitur serupa miracast di Linux akhirnya ketemu juga yaitu [Gnome Network Display](https://gitlab.gnome.org/GNOME/gnome-network-displays).

Fitur ini memungkinkan kita berbagi tampilan layar dan audio desktop linux kita ke media lain berupa smart TV, saya sendiri menggunakan openSUSE Leap 15.3 dengan desktop Gnome 3.34.7.

Berikut tahapan installasinya, pertama tambahkan flathub repository:

```
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```

Update flatpak:

```
flatpak update
```

Install Gnome Wireless Display:

```
flatpak install org.gnome.NetworkDisplays
```

Setelah selesai jalankan aplikasi dan coba hubungkan ke perangkat Smart TV, pastikan perangkat wireless pada laptop hidup.