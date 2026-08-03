---
title: "Memasang PowerShell pada openSUSE Leap 15.0"
date: "2018-07-23"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Sudahkah Anda tahu bahwa PowerShell dapat dipasang pada disribusi Linux kesayangan Anda melalui Snap? Berikut ini cara memasangnya pada openSUSE Leap 15.0. Pasang repo snap     sudo zypper addrepo –refresh http://download.opensuse.org/repositories/system:/snappy/openSUSE_Leap_15.0/ snappy Pasang ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-powershell-pada-opensuse-leap-15-0/Powershell_256-250x250.png"
---

Sudahkah Anda tahu bahwa [PowerShell](https://snapcraft.io/powershell) dapat dipasang pada disribusi Linux kesayangan Anda melalui Snap?

Berikut ini cara memasangnya pada openSUSE Leap 15.0.

* Pasang repo snap

```
    sudo zypper addrepo --refresh http://download.opensuse.org/repositories/system:/snappy/openSUSE_Leap_15.0/ snappy
```

* Pasang snap

```
    sudo zypper install snapd
```

* Aktifkan soket pada systemd yang dibutuhkan oleh snap

```
    sudo systemctl enable --now snapd.socket
```

* Pasang PowerShell

```
    sudo snap install powershell --classic
```

* Jalankan PowerShell

```
    snap run powershell
```
