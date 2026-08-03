---
title: "Memperbaiki Grub error"
date: "2018-06-02"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Grub error atau hilang bisa terjadi karena berbagai hal. Yang paling umum adalah karena memasang ulang atau update/upgrade Windows bagi pengguna dualboot yang masih menggunakan komputer dengan firmware BIOS. Atau bisa juga karena proses upgrade openSUSE yang tidak sempurna, seperti yang pernah sa..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

*Grub error* atau hilang bisa terjadi karena berbagai hal. Yang paling umum adalah karena memasang ulang atau *update*/*upgrade* Windows bagi pengguna *dualboot* yang masih menggunakan komputer dengan *firmware BIOS*. Atau bisa juga karena proses *upgrade* **openSUSE** yang tidak sempurna, seperti yang pernah saya alami ketika *upgrade* dari **Leap 42.2** ke **Leap 42.3**.

Untuk memperbaiki *Grub error* kita membutuhkan salah satu dari *installer openSUSE*, *openSUSE Live* atau *Rescue CD*. Di sini saya akan menjelaskan proses menggunakan *installer*, karena kita bisa menggunakan *ISO* yang pernah kita gunakan untuk memasang **openSUSE** meskipun versi *installer* dengan **openSUSE** yang saat ini digunakan berbeda.

*Boot* ke *DVD* atau *Flashdisk* *installer* **openSUSE**, lalu pilih **System rescue**. Untuk *installer* terbaru, Anda mungkin perlu memilih menu **More** untuk menampilkan menu **System rescue**.

Saat proses *booting* akan ditampilkan pilihan untuk menggunakan *layout keyboard* yang ingin digunakan. Biasanya kita hanya perlu menekan *Enter* saja.

Setelah proses *booting* selesai, kita diharuskan untuk *login* dengan menggunakan akun `root`, tanpa *password*, langsung saja tekan *Enter* setelah mengisi *user root*.

Setelah login dengan `root`, lakukan langkah-langkah berikut:

- Cari tahu di mana **partisi root** berada (jika Anda sudah tahu, Anda bisa melewati proses ini);  
  `lsblk`
- Contoh di sini **partisi root** berada di `/dev/sda2`. *mount* semua yang diperlukan;  
  `mount /dev/sda2 /mnt`  
  `mount -t proc none /mnt/proc`  
  `mount --rbind /dev /mnt/dev`  
  `mount --rbind /sys /mnt/sys`
- `chroot` ke `/mnt`;  
  `chroot /mnt /bin/bash`
- `mount` semua yang ada di `/etc/fstab` dari sistem yang berada dalam `chroot`;  
  `mount -a`
- Pasang `grub`;  
  `grub2-install /dev/sda`
- Konfigurasi `grub`;  
  `grub2-mkconfig -o /boot/grub2/grub.cfg`
- Proses memperbaiki `grub` selesai, keluar dari `chroot` lalu jalankan ulang komputer;  
  `umount -a`  
  `exit`  
  `reboot`

Selesai, kita bisa menggunakan kembali komputer kita.