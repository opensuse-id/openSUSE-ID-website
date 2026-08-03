---
title: "Instalasi Spotify Pada openSUSE Leap 42.2"
date: "2016-11-19"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Spotify adalah layanan streaming musik, podcast, dan video yang diluncurkan oleh perusahaan dari Swedia, Spotify Technology S.A. Spotify menyediakan konten yg dilindungi Digital Rights Management (DRM) dari label rekaman dan perusahaan media. Konten ini tersedia di sebagian besar Eropa, Amerika, ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-spotify-pada-opensuse-leap-42-2/CUJWxhIUAAAbryM.png"
---

Spotify adalah layanan streaming musik, podcast, dan video yang diluncurkan oleh perusahaan dari Swedia, Spotify Technology S.A.

Spotify menyediakan konten yg dilindungi Digital Rights Management (DRM) dari label rekaman dan perusahaan media. Konten ini tersedia di sebagian besar Eropa, Amerika, Australia, Selandia Baru, dan negara-negara wilayah terbatas di Asia.

Penulis ingin memasang Spotify pada openSUSE (dalam hal ini Leap 42.2) tapi tidak mendapati repository khusus ataupun tidak tersedia di repo packman. Lalu bagaimana caranya?

Penulis menemukan sesuatu yang menarik di [Github](https://github.com/cornguo/opensuse-spotify-installer) yang mengekstraksi file deb jadi rpm di openSUSE lalu menginstalasinya via zypper.

Berikut ini langkah-langkah instalasi Spotify pada openSUSE (bisa diterapkan pada Leap maupun Tumbleweed)

1. Aktifkan repo Packman (sebelumnya bisa melihat artikel yang dibuat mas Dhenandi [di link ini](https://opensuse.id/blog/hal-yang-dilakukan-setelah-memasang-opensuse-leap-42-2/))
2. Lakukan Cloning pada repo Githubnya.  
   `git clone https://github.com/cornguo/opensuse-spotify-installer.git`
3. Ubah direktori ke opensuse-spotify-installer dan lakukan eksekusi pada file install-spotify.sh  
   `cd opensuse-spotify-installer`  
   `./install-spotify.sh`  
   Tunggu sejenak, Anda dapat menyeruput kopi ataupun jalan-jalan sebentar karena prosesnya agak lama.  
   ![screenshot_20161119_200925](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-spotify-pada-opensuse-leap-42-2/Screenshot_20161119_200925.png)
4. Setelah itu, anda akan diminta password root dan dapat langsung dipasang via zypper.  
   ![screenshot_20161119_201054](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-spotify-pada-opensuse-leap-42-2/Screenshot_20161119_201054.png)

Selamat, Anda pun dapat menikmati ratusan musik legal di openSUSE Anda.

![screenshot_20161119_194721](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-spotify-pada-opensuse-leap-42-2/Screenshot_20161119_194721.png)