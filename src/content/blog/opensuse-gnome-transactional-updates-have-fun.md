---
title: "openSUSE + GNOME + Transactional Updates = Have Fun"
date: "2019-04-18"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Apa itu transactional updates? A “transactional update” is a kind of update that: is atomic – the update does not influence your running system can be rolled back – if the upgrade fails or if the newer software version is not compatible with your infrastructure, you can quickly restore the situat..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/opensuse-gnome-transactional-updates-have-fun/1.png"
---

Apa itu *transactional updates*?

> *A “transactional update” is a kind of update that:*
> * is atomic – the update does not influence your running system
> * can be rolled back – if the upgrade fails or if the newer software version is not compatible with your infrastructure, you can quickly restore the situation as it was before the upgrade.
> 
> (https://github.com/openSUSE/transactional-update)

Dengan kata lain, *transactional updates* adalah pemutakhiran secara atomic yang tidak akan langsung menyentuh sistem yang sedang berjalan. *Transactional update* juga dapat di-*roll back*/kembalikan ke situasi sebelum pemutakhiran apabila setelah pemutakhiran ternyata ada galat.

Pengguna openSUSE tentu sudah akrab dengan kondisi nomor dua, yaitu dengan menggunakan partisi Btrfs dengan snapshot dan snapper. Perbedaannya, dengan *transactional updates*, pemutakhiran tidak langsung menyentuh sistem yang sedang berjalan, untuk itu diperlukan nyala ulang *(reboot)*, sementara Btrfs dengan snapshot dan snapper tradisional, pemutakhiran menyentuh sistem yang sedang berjalan sehingga tidak diperlukan nyala ulang *(reboot)*. Pada dasarnya, *transactional updates* ini juga menggunakan Btrfs dengan snapshot dan snapper, hanya saja bersifat atomic. Sebenarnya, *transactional updates* ini dirancang untuk server. Namun, kali ini penulis mencoba memasang openSUSE dengan destop GNOME pada opsi server dengan *transactional updates*. Pada cuplikan layar, contoh yang digunakan adalah openSUSE Leap 15.0.

Langkah pertama, boot live DVD/USB instalasi sampai muncul tampilan berikut. Pilih opsi **Transactional Server**. Lalu tekan next dan jalankan installer sampai pada langkah kedua.

![1](https://opensuse.id/wp-content/uploads/2019/04/1.png)

Langkah kedua, ketika sudah sampai pada tampilan berikut, klik **Software**.

![2](https://opensuse.id/wp-content/uploads/2019/04/2.png)

Langkah ketiga, akan muncul tampilan seperti berikut. Beri centang pada **GNOME Desktop Environment**.

![3](https://opensuse.id/wp-content/uploads/2019/04/3.png)

Langkah keempat, pastikan **GNOME Desktop Environment** sudah tercentang. Pada contoh ini Wayland dan X11 ikut dipasang.

![4](https://opensuse.id/wp-content/uploads/2019/04/4.png)

Langkah kelima, pastikan pada **Patterns**, terdapat **GNOME Desktop Environment**. Selesaikan proses instalasi.

![5](https://opensuse.id/wp-content/uploads/2019/04/5.png)

Setelah instalasi berhasil, pastikan pengguna dapat masuk melalui GDM dan destop GNOME muncul serta dapat digunakan sebagaimana mestinya.

Karena kita menggunakan sistem *transactional updates*, maka kita tidak dapat menggunakan perintah `zypper` untuk memasang/menghapus paket dan memutakhirkannya. Salah satu perintah `zypper` yang masih dapat digunakan adalah `zypper ref`.  Perintah yang digunakan adalah `transactional-update` sebagai pengganti `zypper`. Berikut ini adalah padanan perintah yang dapat digunakan pada sistem *transactional updates.*

| | **Tradisional** | ***Transactional Updates*** |
| :--- | :--- | :--- |
| Memutakhirkan sistem pada openSUSE Leap | `zypper up` | `transactional-update up` |
| Memutakhirkan sistem pada openSUSE Tumbleweed | `zypper dup` | `transactional-update dup` |
| Memasang Paket | `zypper in` Contoh: `zypper in vim` | `transactional-update pkg in` Contoh: `transactional-update pkg in vim` |
| Menghapus Paket | `zypper rm` Contoh: `zypper in rm` | `transactional-update pkg rm` Contoh: `transactional-update pkg rm vim` |

Setelah menjalankan perintah pada *transactional* *updates*, jangan lupa untuk menyalakan ulang *(reboot)* sistem. Apabila setelah menyalakan ulang *(reboot)* terdapat galat, pengguna dapat kembali pada snapshot sebelumnya dengan perintah `transactional-update rollback`.

Berikut ini merupakan contoh cuplikan layar ketika menjalankan perintah `transactional-update up`.

![6](https://opensuse.id/wp-content/uploads/2019/04/6-1024x514.png)

Sistem *transactional updates* memiliki pemutakhiran otomatis yang akan berjalan dan menyalakan ulang sistem pada pukul 03.30 dan 05.00 apabila pemutakhiran sebelumnya tertunda.

* Pemutakhiran otomatis
  * Untuk pemutakhiran otomatis, dapat disetel dengan menggunakan perintah `systemctl enable --now transactional-update.timer`
  * Untuk mengecek statusnya, dapat menggunakan perintah `systemctl status transactional-update.timer`
  * Untuk menonaktifkan pemutakhiran otomatis, dapat disetel dengan menggunakan perintah `systemctl stop transactional-update.timer`
* Nyala ulang sistem otomatis
  * Untuk nyala ulang sistem otomatis, dapat disetel dengan menggunakan perintah `systemctl enable --now rebootmgr.service`
  * Untuk mengecek statusnya, dapat menggunakan perintah `systemctl status rebootmgr.service`
  * Untuk menonaktifkan nyala ulang sistem otomatis, dapat disetel dengan menggunakan perintah `systemctl stop rebootmgr.service`

Untuk aplikasi, pengguna dapat juga memasang aplikasi menggunakan [flatpak](https://flatpak.org/) sebagai alternatif. Untuk penyetelan awal, silakan lihat penjelasan [berikut](https://flatpak.org/setup/openSUSE/). Aplikasi yang penulis gunakan sebagian besar menggunakan flatpak sehingga ketika memasang atau mendapat pemutakhiran, tidak perlu memulai ulang sistem.

Menurut penulis, *transactional updates* ini lebih cocok digunakan pada openSUSE Tumbleweed. Karena sering dan banyaknya pemutakhiran yang terjadi, tidak menutup kemungkinan ada galat pada paket-paketnya meskipun sudah lolos uji oleh openQA. *Transactional updates* dapat membantu pengguna openSUSE Tumbleweed untuk mengembalikan pada kondisi sebelum galat. Penulis sendiri sudah bereksperimen dengan menggunakan *transactional updates* pada openSUSE Leap untuk komputasi sehari–hari. Akhir kata, selamat mencoba.

Have Fun!

Referensi lebih lanjut

1. https://github.com/openSUSE/transactional-update
2. https://kubic.opensuse.org/blog/2018-04-04-transactionalupdates/
3. https://kubic.opensuse.org/blog/2018-04-20-transactionalupdates2/