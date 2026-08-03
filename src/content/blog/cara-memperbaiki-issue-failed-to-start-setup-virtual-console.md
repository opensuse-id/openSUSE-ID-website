---
title: "Cara memperbaiki issue “Failed to start setup Virtual Console”"
date: "2018-11-06"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Dalam beberapa update openSUSE Leap kemarin saya menemukan sedikit issue ketika boot openSUSE di laptop saya, yaitu issue munculnya tulisan “Failed to start setup Virtual Console”, nah tampilannya seperti ini mungkin issue ini tidak begitu penting karena tidak berpengaruh apa – apa terhadap kiner..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Dalam beberapa update openSUSE Leap kemarin saya menemukan sedikit issue ketika boot openSUSE di laptop saya, yaitu issue munculnya tulisan “Failed to start setup Virtual Console”, nah tampilannya seperti ini ![tampilan issue](https://rifki21blog.files.wordpress.com/2018/10/failed.jpg)  
mungkin issue ini tidak begitu penting karena tidak berpengaruh apa – apa terhadap kinerja openSUSE sendiri, tapi kalau dilihat cukup untuk membuat resah mata untuk saya, jadi saya menemukan solusinya, yaitu sebagai berikut :

```
vim vconsole.patch
```

```
masukkan script ini
```

```
su
```

```
zypper in patch
```

```
cd /usr/lib/dracut
```

```
patch -p1 < /path/to/vconsole.patch
```

```
dracut -f
```

```
reboot
```

Selesai 😀