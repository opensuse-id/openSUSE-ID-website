---
title: "Upgrade KDE Plasma 5.9 pada openSUSE 42.2 Leap"
date: "2017-02-03"
author: "Tim openSUSE Indonesia"
category: uncategorized
excerpt: "KDE Plasma 5.9 announcement: Pada tulisan ini saya ingin berbagi sedikit bagaimana caranya menambahkan KDE Plasma yang terbaru (dan seterusnya) pada openSUSE Leap atau reguler atau yang tidak bergilir. Dalam hal ini saya memakai zypper. 1. Tambashkan Repo KF5 # zypper ar -f http://download.opensu..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/upgrade-kde-plasma-5-9-pada-opensuse-42-2-leap/11949942481641741323about_kde.svg_.hi_.png"
---

KDE Plasma 5.9 announcement:

<iframe width="560" height="315" src="https://www.youtube.com/embed/lm0sqqVcotA?si=hnwwG4S5a1BPWWAs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Pada tulisan ini saya ingin berbagi sedikit bagaimana caranya menambahkan KDE Plasma yang terbaru (dan seterusnya) pada openSUSE Leap atau reguler atau yang tidak bergilir.

Dalam hal ini saya memakai zypper.

1. Tambashkan Repo KF5
    ```
    # zypper ar -f http://download.opensuse.org/repositories/KDE:/Frameworks5/openSUSE\_Leap\_42.2/ KF5
    ```
2. Tambahkan Repo KDE-extras
    ```
    # zypper ar -f http://download.opensuse.org/repositories/KDE:/Extra/openSUSE\_Leap\_42.2/ KDE-extra
    ```
3. Tambahkan repo Qt5 **– Big thanks to Dhenadi for this tips.**
    ```
    # zypper ar -f http://download.opensuse.org/repositories/KDE:/Qt5/openSUSE\_Leap\_42.2/ Qt5
    ```
4. Refresh repository dan lakukan upgrade KDE
    ```
    # zypper ref && zypper dup
    ```
Restart dan login kembali. Anda akan mendapatkan KDE Plasma 5.9 pada openSUSE 42.2 Leap

![16473061_1442679322431247_3481089929366041489_n-300x184.jpg](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/upgrade-kde-plasma-5-9-pada-opensuse-42-2-leap/16473061_1442679322431247_3481089929366041489_n.jpg)

(Courtesy: Muhammad Dhenadi @ Facebook)
