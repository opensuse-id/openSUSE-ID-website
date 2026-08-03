---
title: "Memperbaiki tampilan VLC yang membesar pada GNOME di openSUSE Leap 15.0"
date: "2019-02-11"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Hal ini bermula dari keisengan saya yang mencoba menginstall VLC melalui repo packman, karena biasanya saya menginstall VLC ini melalui flatpak dan masalah ini tidak terjadi. Jadi ketika menginstall VLC dari repo packman tampilan VLC sungguh tidak manusiawi, tampilan VLC jadi besar sekali, beriku..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Hal ini bermula dari keisengan saya yang mencoba menginstall VLC melalui repo packman, karena biasanya saya menginstall VLC ini melalui flatpak dan masalah ini tidak terjadi. Jadi ketika menginstall VLC dari repo packman tampilan VLC sungguh tidak manusiawi, tampilan VLC jadi besar sekali, berikut tampilan VLC yang besar tersebut 

![Tampilan VLC yang membesar](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/memperbaiki-tampilan-vlc-yang-membesar-pada-gnome-di-opensuse-leap-15-0/image-1024x613.png)

Sungguh tampilan tersebut membuat suasana menonton video di VLC menjadi tidak menyenangkan, maka berikut langkah – langkah untuk memperbaiki masalah tersebut :

```
vim /home/USER/Desktop/gnome-qt.sh 
```

Masukkan script berikut dan simpan

```
export QT_AUTO_SCREEN_SCALE_FACTOR=0
```

Buka terminal dan ketik 

```
sudo cp '/home/USER/Desktop/gnome-qt.sh' /etc/profile.d
```

Restart komputer atau laptop anda

Tampilan VLC pun kembali manusiawi. 

![Tampilan VLC normal](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/memperbaiki-tampilan-vlc-yang-membesar-pada-gnome-di-opensuse-leap-15-0/image-1-1024x547.png)

Sumber : https://ubuntuforums.org/showthread.php?t=2390362