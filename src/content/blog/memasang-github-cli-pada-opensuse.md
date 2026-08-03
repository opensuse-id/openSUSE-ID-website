---
title: "Memasang GitHub CLI pada openSUSE"
date: "2020-12-04"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Apa itu GitHub CLI? GitHub CLI adalah fungsi GitHub di baris perintah, berupa pull request, issue, dan konsep GitHub lainnya ke terminal di tempat Anda bekerja dengan git dan kode Anda. Jadi sehabis mendorong kode ke repo, kita bisa langsung membuat pull request tanpa perlu kembali ke peramban, b..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/memasang-github-cli-pada-opensuse/social-card.png"
---

Apa itu GitHub CLI? GitHub CLI adalah fungsi GitHub di baris perintah, berupa *pull request*, *issue*, dan konsep GitHub lainnya ke terminal di tempat Anda bekerja dengan git dan kode Anda. Jadi sehabis mendorong kode ke repo, kita bisa langsung membuat *pull request* tanpa perlu kembali ke peramban, begitu juga ketika membuat *issue*, dan lain sebagainya. GitHub CLI ini dibangun untuk mengurangi *context switching* dari terminal ke peramban dan sebaliknya. Menarik bukan.


Cara memasang di openSUSE (baik Leap maupun Tumbleweed) cukup dengan menjalankan tiga perintah berikut, yaitu menambahkan repo, menyegarkan repo, lalu memasang paket GitHub CLI.


```
sudo zypper addrepo https://cli.github.com/packages/rpm/gh-cli.repo

sudo zypper ref

sudo zypper install gh
```


Mudah bukan? Selamat mencoba