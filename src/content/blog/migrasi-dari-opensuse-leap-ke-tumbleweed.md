---
title: "Migrasi dari openSUSE Leap ke Tumbleweed"
date: "2016-04-14"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "openSUSE memliki 2 versi, Leap versi stabil dan Tumbleweed versi rilis bergulir. Apabila sebelumnya sudah memasang openSUSE Leap dan hendak mencoba pengalaman baru atau mungkin tertarik setelah membaca tulisan Richard Brown tentang Tumbleweed, berikut ini langkah-langkah migrasi dari Leap ke Tumb..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/migrasi-dari-opensuse-leap-ke-tumbleweed/openSUSE-Tumbleweed-screenfetch.png"
---

![openSUSE-Tumbleweed-screenfetch](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/migrasi-dari-opensuse-leap-ke-tumbleweed/openSUSE-Tumbleweed-screenfetch.png)

openSUSE memliki 2 versi, Leap versi stabil dan Tumbleweed versi rilis bergulir. Apabila sebelumnya sudah memasang openSUSE Leap dan hendak mencoba pengalaman baru atau mungkin tertarik setelah membaca  [tulisan Richard Brown tentang Tumbleweed](http://rootco.de/2016-03-28-why-use-tumbleweed/), berikut ini langkah-langkah migrasi dari Leap ke Tumbleweed.

Langkah pertama, login sebagai root kemudian membackup repostori Leap, nanti bisa digunakan kembali apabila ingin kembali ke Leap.

```
sudo su
mkdir /etc/zypp/repos.d/leap
mv /etc/zypp/repos.d/*.repo /etc/zypp/repos.d/leap
```

Selanjutnya menambah repositori Tumbleweed.

```
zypper ar -f -c http://download.opensuse.org/tumbleweed/repo/oss repo-oss
zypper ar -f -c http://download.opensuse.org/tumbleweed/repo/non-oss repo-non-oss
zypper ar -f -c http://download.opensuse.org/tumbleweed/repo/debug repo-debug
zypper ar -f -c http://download.opensuse.org/update/tumbleweed/ repo-update
```

Mengcek repositori Tumbleweed, akan ditampilkan daftar semua repositori.

```
zypper lr -u
```

Refresh repositori dengan *gpg keys* baru.

```
zypper --gpg-auto-import-keys ref
```

Terakhir, lakukan system upgrade,

```
zypper dup
```

Sambil menunggu proses selesai, bisa ngopi-ngopi dulu atau jalan-jalan juga boleh. !🙂

Silakan mencoba.