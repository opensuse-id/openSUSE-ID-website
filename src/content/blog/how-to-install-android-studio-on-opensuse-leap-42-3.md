---
title: "How to install Android Studio on openSUSE Leap 42.3"
date: "2018-04-27"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Pengenalan Android Studio Pada kesempatan kali ini saya akan membahas cara instalasi android studio pada openSUSE Leap 42.3. Android Studio adalah sebuah Lingkungan terpadu atau yang kadang lebih dikenal dengan sebutan IDE (Integreted Development Environment), untuk pengembangan aplikasi Android ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---


# Tahap Instalasi

Pada tulisan saya kali ini, saya memakai laptop Lenovo Z40-75 berbasis openSUSE Leap 42.3. Sebelum instalasi dimulai ada baiknya sobat mengunduh Android Studio pada laman [ini](https://developer.android.com/studio/index.html?hl=id#linux-bundle).

Setelah selesai pengunduhan kita mulai tahap mula &#8211; mula :

- Ekstrak hasil unduhan

```
unzip android-studio-ide-173.4670197-linux.zip
```

- Pindahkan direktori Android Studio ke /opt

```
mv android-studio /opt
```

- Install !

```
cd /opt/android-studio/bin/
```

```
./studio.sh
```

Tunggu tahap instalasi sampai selesai 😀

### Beberapa Screenshot

![Tampilan Splash screen Android Studio](https://rifki21blog.files.wordpress.com/2018/03/screenshot_20180329_211208.png)
*Tampilan Splash screen Android Studio*

![Tampilan awal](https://rifki21blog.files.wordpress.com/2018/03/screenshot_20180329_211552.png)
*Tampilan awal*

#### note

Jika ingin menambahkan shortcut Desktop Android Studio pada Linux anda cukup dengan

- Tools =&gt; Create Desktop Entry

##### Sumber

- http://developer.android.com/studio/install.html
- https://developer.android.com/studio/intro/index.html?hl=id