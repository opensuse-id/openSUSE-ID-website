---
title: "/tmp dengan tmpfs di openSUSE Tumbleweed"
date: "2020-08-08"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Jika Anda memasang openSUSE Tumbleweed dengan versi ISO Snapshot 20200806 secara baku instalasi Anda akan membuat direktori /tmp dengan tmpfs, sedangkan pada versi sebelum Snapshot tersebut /tmp akan berada pada sebuah subvolume Btrfs. Membuat /tmp dengan tmpfs pada instalasi sebelum 20200806 Jik..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tmp-dengan-tmpfs-di-opensuse-tumbleweed/folder-temp.png"
---

![folder-temp](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/tmp-dengan-tmpfs-di-opensuse-tumbleweed/folder-temp.png)

Jika Anda memasang openSUSE Tumbleweed dengan versi ISO Snapshot 20200806 secara baku instalasi Anda akan membuat direktori */tmp* dengan *tmpfs*, sedangkan pada versi sebelum Snapshot tersebut */tmp* akan berada pada sebuah *subvolume* Btrfs.

## Membuat */tmp* dengan *tmpfs* pada instalasi sebelum 20200806

Jika Anda sudah lama menggunakan openSUSE Tumbleweed (instalasi dilakukan sebelum ISO Snapshot 20200806) dan ingin membuat */tmp* berada pada *tmpfs* seperti pada instalasi baru, Anda tinggal menghapus baris mounting */tmp* di */etc/fstab* dengan perintah `su -c "sed -i '/tmp/d' /etc/fstab"`, lalu hapus semua file dan folder yang berada di direktori */tmp* dengan perintah `su -c "rm -rv /tmp/* /tmp/.*"`, setelah itu jalankan ulang komputer.

## Instalasi lama yang sudah menggunakan *tmpfs* untuk */tmp*

Sebelumnya saya pernah membuat tulisan tentang [Memindahkan /tmp ke tmpfs](/https://opensuse.id/blog/memindahkan-tmp-ke-tmpfs/). Jika Anda mengikuti tulisan tersebut, segera hapus link */etc/systemd/system/tmp.mount* dengan `su -c "rm -v /etc/systemd/system/tmp.mount"` setelah Anda melakukan update Tumbleweed ke versi 20200806, karena di versi tersebut file */usr/share/systemd/tmp.mount* sudah tidak ada. Jadi bisa dipastikan link tersebut akan terputus.

Jangan lupa juga untuk memastikan bahwa di */etc/fstab* sudah tidak ada baris mounting */tmp*.

---

Tulisan ini bisa dibaca juga di [https://kikisyahadat.github.io/2020/08/08/tmp-dengan-tmpfs-di-opensuse-tumbleweed.html](/https://kikisyahadat.github.io/2020/08/08/tmp-dengan-tmpfs-di-opensuse-tumbleweed.html)