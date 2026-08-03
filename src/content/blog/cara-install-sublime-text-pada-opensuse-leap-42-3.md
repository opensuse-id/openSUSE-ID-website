---
title: "Cara Install Sublime Text pada openSUSE Leap 42.3"
date: "2018-01-02"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Sublime text adalah text editor yang cukup terkenal dengan beberapa fitur – fitur bagus yang terdapat didalamnya. Dimana Sublime ini juga menjadi salah satu editor yang banyak digunakan. Dan adapun Sublime Text ini bersifat gratis tapi jika anda ingin membeli lisensi Sublime ini dihargai $70, jik..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Sublime text adalah text editor yang cukup terkenal dengan beberapa fitur – fitur bagus yang terdapat didalamnya. Dimana Sublime ini juga menjadi salah satu editor yang banyak digunakan.  
Dan adapun Sublime Text ini bersifat gratis tapi jika anda ingin membeli lisensi Sublime ini dihargai $70, jika anda tidak sanggup untuk membayarnya maka akan ada tulisan seperti ini ketika membuka Sublime

![Sublime](https://i2.wp.com/rifki21blog.files.wordpress.com/2018/01/sublime.png?ssl=1&w=800)

Berikut beberapa langkah untuk menginstall Sublime Text pada openSUSE Leap 42.3 :

1. Install GPG Key dengan perintah berikut :

```
sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg
```

2. Tambahkan repo untuk menginstall Sublime Text dengan perintah :

```
sudo zypper addrepo -g -f https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo
```

3. Install Sublime Text dengan perintah :

```
sudo zypper install sublime-text
```

Berikut Tampilan Sublime Text  
![Tampilan Sublime Text](https://rifki21blog.files.wordpress.com/2018/01/sublime2.png)
