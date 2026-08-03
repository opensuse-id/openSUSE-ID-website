---
title: "Menambahkan Repositori ISO"
date: "2021-02-03"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Kita butuh memasang ISO sebagai repositori pada saat: Melakukan instalasi menggunakan Flashdisk/USB Flash Drive yang dibuat bootable menggunakan Ventoy. Karena dengan cara ini, installer masih berupa file ISO. Dan tidak seperti instalasi yang dilakukan dengan piringan DVD yang bisa langsung digun..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2021/menambahkan-repositori-iso/yast-software.png"
---

Kita butuh memasang ISO sebagai repositori pada saat:

1. Melakukan instalasi menggunakan *Flashdisk*/*USB Flash Drive* yang dibuat *bootable* menggunakan [Ventoy](https://www.ventoy.net/). Karena dengan cara ini, installer masih berupa *file* ISO. Dan tidak seperti instalasi yang dilakukan dengan piringan DVD yang bisa langsung digunakan sebagai repositori, dengan metode ini installer tidak bisa langsung digunakan dengan hanya menancapkannya ke *port USB*.
2. Pengguna openSUSE Leap yang ingin memanfaatkan installer sebagai repositori tambahan, sehingga tidak harus selalu mendownload ketika ingin memasang paket. Jika paket atau dependensi yang ingin dipasang ada di dalam installer dan belum mengalami pembaruan di repositori *update*, paket yang akan dipasang akan diambil dari *file* ISO yang dijadikan repositori, dan bukan dari repositori *online*, asalkan pengaturan prioritasnya tepat.

Cara menambahkan *file* ISO ke daftar repositori:

```
su -c "zypper addrepo -n 'openSUSE-Leap-15.2-ISO' iso:/?iso=/mnt/openSUSE-Leap-15.2-DVD-x86_64.iso repo-iso"
```

Perintah di atas untuk menambahkan *file* ISO **openSUSE Leap 15.2** yang berada di **/mnt**, seperti jika kita melakukan instalasi menggunakan *Flashdisk* yang dibuat *bootable* menggunakan **Ventoy**, lalu kita ingin memasang paket tambahan tanpa harus terhubung ke internet terlebih dahulu. Seperti ketika kita melakukan [minimal/custom install openSUSE](https://kikisyahadat.github.io/2020/08/23/minimal-custom-install-opensuse.html).

Jika Anda menyimpan *file* ISO di tempat lain, ubah *path*/arahnya ke lokasi tersebut.

Sebelum menjalankan perintah di atas, kita perlu melakukan *mounting* *Flashdisk* yang digunakan sebagai installer dengan perintah:

```
su -c "mount -o uid=$UID,gid=$GROUPS /dev/sdc1 /mnt"
```

Perintah di atas diasumsikan lokasi *Flashdisk* berada di **/dev/sdc**.

Untuk mengetahui secara pasti di mana lokasinya, jalankan perintah berikut sebelum *Flashdisk* ditancapkan:

```
dmesg --follow
```

Lalu tancapkan *Flashdisk*.

Di terminal akan muncul di mana *Flashdisk* tersebut terpasang. Untuk keluar dari `dmesg`, tekan **Ctrl** dan **c** secara bersamaan.

Setelah melakukan semua perintah di atas (dengan urutan dari perintah paling bawah ke atas), kita bisa memasang paket dari *file* ISO dengan mengatur prioritasnya atau dengan mematikan semua repositori *online* terlebih dahulu.

Untuk mengatur prioritas:

```
su -c "zypper modifyrepo -p 90 repo-iso"
```

Ubah angka sesuai kebutuhan.

Untuk mematikan repositori *online*:

```
su -c "zypper modifyrepo -dt"
```

Untuk menghidupkannya kembali:

```
su -c "zypper modifyrepo -e repo-oss repo-non-oss repo-update repo-update-non-oss"
```