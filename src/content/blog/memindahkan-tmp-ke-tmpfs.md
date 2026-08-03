---
title: "Memindahkan /tmp ke tmpfs"
date: "2019-09-08"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Secara baku, direktori /tmp di openSUSE berada dalam sebuah subvolume. Karena secara baku, filesystem yang digunakan oleh openSUSE adalah BtrFS. Keuntungan dari lokasi /tmp berada di sebuah subvolume adalah kita tidak akan kehabisan ruang ketika kita bekerja dengan aplikasi pembuat berkas ISO sep..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/memindahkan-tmp-ke-tmpfs/folder-temp.png"
---

Secara baku, direktori /tmp di openSUSE berada dalam sebuah *subvolume*. Karena secara baku, *filesystem* yang digunakan oleh openSUSE adalah **BtrFS**. Keuntungan dari lokasi /tmp berada di sebuah subvolume adalah kita tidak akan kehabisan ruang ketika kita bekerja dengan aplikasi pembuat berkas ISO seperti *disk burner*, aplikasi editor video atau aplikasi animasi seperti Blender.

Tapi bagi pemilik **SSD** yang sedikit paranoid karena banyaknya proses *write* ke direktori /tmp yang bisa mempercepat habisnya usia SSD, Anda bisa memindahkan direktori /tmp tersebut ke **tmpfs**. Caranya buat *symlink* `/usr/share/systemd/tmp.mount` di `/etc/systemd/system/` dengan perintah;

`su -c "ln -s /usr/share/systemd/tmp.mount /etc/systemd/system/tmp.mount"`

Setelah itu Anda bisa menghapus *subvolume* /tmp dari **YaST** >> **Partitioner**, lalu *restart* komputer.