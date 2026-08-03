---
title: "Pasang Google Chrome web browser di openSUSE Leap dan openSUSE Tumbleweed"
date: "2017-10-10"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Panduan kali ini yaitu memasang Google Chrome web browser di sistem openSUSE kita, dimana tulisan ini bersumber dari https://www.google.com/linuxrepositories/. Oke tanpa bicara panjang lebar langsung saja kita mulai! Pertama, buka konsole lalu tambahkan Linux Package Signing Keys Google: wget htt..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/pasang-google-chrome-web-browser-di-opensuse-leap-dan-opensuse-tumbleweed//Screenshot_20171010_184051.png"
---

![Screenshot_20171010_184051.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/pasang-google-chrome-web-browser-di-opensuse-leap-dan-opensuse-tumbleweed//Screenshot_20171010_184051.png)

Panduan kali ini yaitu memasang Google Chrome web browser di sistem openSUSE kita, dimana tulisan ini bersumber dari [https://www.google.com/linuxrepositories/](https://www.google.com/linuxrepositories/). Oke tanpa bicara panjang lebar langsung saja kita mulai!

Pertama, buka konsole lalu tambahkan Linux Package Signing Keys Google:

* *wget https://dl.google.com/linux/linux\_signing\_key.pub*
* *sudo rpm –import linux\_signing\_key.pub*

Kemudian melakukan verifikasi key:

* *rpm -qi gpg-pubkey-7fac5991-\**

Selanjutnya unduh Google Chrome dilaman ini [https://www.google.com/chrome/](https://www.google.com/chrome/) Kemudian masuk ke folder letak unduhan tadi lalu pasang:

* *sudo zypper install google-chrome-stable\_current\_x86\_64.rpm*

Tunggu hingga proses pasang selesai, lancar tanpa hambatan!

NB: Jika setelah pasang Google Chrome dan repository tidak terkonfigurasi otomatis alias tidak terdaftar pada list repository, sehingga kita tidak bisa melakukan pembaharuan lakukan langkah berikut ini:

* *sudo zypper addrepo -g -f -n “Google-Chrome” http://dl.google.com/linux/chrome/rpm/stable/x86\_64 Google-Chrome*
* *sudo zypper refresh*

Kemudian cek repository yang telah kita tambahkan tadi:

* *zypper lr -u*

![Screenshot_20171010_200656.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/pasang-google-chrome-web-browser-di-opensuse-leap-dan-opensuse-tumbleweed//Screenshot_20171010_200656.png)

Oke, sekarang kita bisa perbaharui Google Chrome! Sekian, Terima kasih!
