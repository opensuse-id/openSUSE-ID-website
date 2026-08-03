---
title: "Repositori Lokal openSUSE Leap 42.2 Indonesia"
date: "2017-03-22"
author: "Tim openSUSE Indonesia"
category: komunitas
excerpt: "Pendahuluan Secara default, saat pertama kali memasang openSUSE Leap, repositori yang akan digunakan oleh openSUSE adalah repositori bawaan milik openSUSE yang berada pada download.opensuse.org. Lokasi repositori tersebut terdapat pada jaringan IX atau berada di luar Indonesia. Salah satu hambata..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Secara default, saat pertama kali memasang openSUSE Leap, repositori yang akan digunakan oleh openSUSE adalah repositori bawaan milik openSUSE yang berada pada download.opensuse.org. Lokasi repositori tersebut terdapat pada jaringan IX atau berada di luar Indonesia.

Salah satu hambatan di Indonesia adalah lambatnya koneksi internet ke IX. Sehingga bagi pengguna openSUSE Leap yang ingin memperbaharui paketnya kadang terkendala oleh repositori yang letaknya berada di luar negeri.

Jika koneksi internet anda cepat, anda tidak perlu khawatir akan hal ini. Namun bagi anda yang mungkin kecepatan internetnya terbatas, openSUSE Indonesia menawarkan solusi untuk menggunakan beberapa repositori yang bisa dijadikan alternatif repositori lokal untuk memperbaharui paket openSUSE anda. Salah satu repositori yang sering digunakan adalah repo.opensuse.id buatan pak **Edwin Zakaria**.

Berikut beberapa referensi repositori untuk openSUSE Leap 42.2 yang ada di Indonesia, repo tersebut bisa langsung ditambahkan melalui CLI dengan perintah dibawah :

## Repositori openSUSE.ID

```
zypper ar -f http://repo.opensuse.id/distribution/leap/42.2/repo/non-oss/ repo-non-oss
zypper ar -f http://repo.opensuse.id/distribution/leap/42.2/repo/oss/ repo-oss
zypper ar -f http://repo.opensuse.id/update/leap/42.2/non-oss/ repo-update-non-oss
zypper ar -f http://repo.opensuse.id/update/leap/42.2/oss/ repo-update-oss
zypper ar -f http://repo.opensuse.id/packman/openSUSE_Leap_42.2/ packman
```

## Repositori UNNES.AC.ID

```
zypper ar -f http://repo.unnes.ac.id/opensuse/42.2/repo/non-oss/ repo-non-oss
zypper ar -f http://repo.unnes.ac.id/opensuse/42.2/repo/oss/ repo-oss
zypper ar -f http://repo.unnes.ac.id/opensuse/42.2/update/non-oss/ repo-update-non-oss
zypper ar -f http://repo.unnes.ac.id/opensuse/42.2/update/oss/ repo-update-oss
zypper ar -f http://repo.unnes.ac.id/opensuse/42.2/packman/ packman
```

## Repositori KAMBING.UI.AC.ID

```
zypper ar -f http://kambing.ui.ac.id/opensuse/distribution/leap/42.2/repo/non-oss/ repo-non-oss
zypper ar -f http://kambing.ui.ac.id/opensuse/distribution/leap/42.2/repo/oss/ repo-oss
zypper ar -f http://kambing.ui.ac.id/opensuse/update/leap/42.2/non-oss/ repo-update-non-oss
zypper ar -f http://kambing.ui.ac.id/opensuse/update/leap/42.2/oss/ repo-update-oss
```

## Repositori BUAYA.KLAS.OR.ID

```
zypper ar -f https://buaya.klas.or.id/opensuse/distribution/leap/42.2/repo/non-oss/ repo-non-oss
zypper ar -f https://buaya.klas.or.id/opensuse/distribution/leap/42.2/repo/oss/ repo-oss
```

Dari ke-empat repositori diatas silakan dipilih sesuai kebutuhan. Apabila mengalami error pada repositori jangan ragu untuk menginformasikan ke Komunitas openSUSE Indonesia. Semoga bermanfaat 🙂
