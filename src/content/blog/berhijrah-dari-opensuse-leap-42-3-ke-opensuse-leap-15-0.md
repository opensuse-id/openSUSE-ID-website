---
title: "Berhijrah dari openSUSE Leap 42.3 ke openSUSE Leap 15.0"
date: "2018-06-04"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "openSUSE Leap 15.0 baru saja dirilis beberapa pekan kemarin yakni tepatnya pada tanggal 25 May, pada openSUSE Leap 15.0 ini memiliki banyak pembaruan diantaranya yang menjadi sorotan dari pembaruan openSUSE Leap 15.0 ini dapat dilihat di situs kabar linux saya sendiri masih sempat bingung bagaima..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

openSUSE Leap 15.0 baru saja dirilis beberapa pekan kemarin yakni tepatnya pada tanggal 25 May, pada openSUSE Leap 15.0 ini memiliki banyak pembaruan diantaranya yang menjadi sorotan dari pembaruan openSUSE Leap 15.0 ini dapat dilihat di situs [kabar linux](https://kabarlinux.id/2018/opensuse-leap-15-dirilis-sertakan-fitur-transactional-update-dan-pembaruan-lain/) saya sendiri masih sempat bingung bagaimana caranya untuk update ke openSUSE Leap 15.0 ini sendiri, saya sendiri masih memakai openSUSE Leap 42.3 sebelum tulisan ini dirilis dan sekarang telah memakai openSUSE Leap 15.0. Yuk langsung aja kita cari tahu bagaimana cara update ke openSUSE Leap 15.0 ini :D.

## Pra upgrade

Sebelum kita upgrade si ijo ini kita terlebih dulu menyiapkan beberapa hal yang harus disiapkan. guna mengantisipasi beberapa hal yang tidak diinginkan terjadi (data hilang)

1. Backup Data penting anda ke Hardisk eksternal (kalau gk ada pinjem punya temen)
2. Siapkan niat
3. Internet
4. Repository lokal, ini tentu diperlukan saya sendiri memilih repo dari repo.opensuse.id agar proses update lebih kenceng

## Ganti Repository

Setelah sesajen sebelum upgrade disiapkan, kita langsung ke proses upgrade

```
zypper mr -da
zypper ar -f http://repo.opensuse.id/distribution/leap/15.0/repo/oss/ repo-opensuse-id-15-oss
zypper ar -f http://repo.opensuse.id/distribution/leap/15.0/repo/non-oss/ repo-opensuse-id-15-non-oss
zypper ar -f http://repo.opensuse.id/update/leap/15.0/oss/ repo-update-opensuse-id-15-oss
zypper ar -f http://repo.opensuse.id/update/leap/15.0/non-oss/ repo-update-opensuse-id-15-non-oss
```

## Upgrade

Setelah kita mengganti repository, kita lakukan upgrade openSUSE ini berikut perintahnya

1. Tekan Ctrl + Alt dan F1 secara bersamaan, lalu jalankan perintah dibawah ini

```
zypper ref
zypper dup
```

Setelah itu kalian bisa ngopi – ngopi atau ngaji juga boleh agar proses upgrade lancar 😀

Note : Semoga bermanfaat