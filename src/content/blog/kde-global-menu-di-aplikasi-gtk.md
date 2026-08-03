---
title: "KDE Global Menu di aplikasi GTK"
date: "2018-11-24"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Dukungan Global Menu di aplikasi GTK resmi diperkenalkan di pengumuman rilis Plasma 5.14, setelah di Plasma 5.13 statusnya sebagai tech preview. Pengguna openSUSE Tumbleweed sekarang sudah bisa menikmatinya, dan begini caranya. Pasang paket appmenu-gtk2-module untuk dukungan di aplikasi GTK+2 dan..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Dukungan **Global Menu** di aplikasi GTK resmi diperkenalkan [di pengumuman rilis Plasma 5.14](https://www.kde.org/announcements/plasma-5.14.0.php), setelah di Plasma 5.13 statusnya sebagai *tech preview*. Pengguna openSUSE Tumbleweed sekarang sudah bisa menikmatinya, dan begini caranya.

Pasang paket `appmenu-gtk2-module` untuk dukungan di aplikasi GTK+2 dan `appmenu-gtk3-module` untuk aplikasi GTK+3. Lalu cek di `/home/user/.gtkrc-2.0` dan `/home/user/.config/gtk-3.0/settings.ini` apakah opsi `gtk-modules=appmenu-gtk-module` sudah ada? Kalau belum ada, tambahkan.

Untuk mengaktifkan **Global Menu**, buka **System Settings** KDE, lalu buka bagian **Application Style**, lalu **Window Decorations**. Pilih tab **Buttons**, kemudian seret ikon **Application menu** dari kotak di bawah **Titlebar** ke **Titlebar**, tempatkan di manapun Anda menginginkannya (saya biasanya menempatkannya setelah ikon **Menu** dan **On all desktop** di sebelah kiri). Setelah selesai, klik **Apply**.

Jika Anda lebih suka **Global Menu** ditempatkan di panel, buka kunci **Widgets** jika terkunci. Klik tiga garis vertikal di ujung kanan panel, lalu pilih **Add widgets…**. Pilih widget **Global Menu**. Ini akan memunculkan widget **Global Menu** di panel. Geser ke tempat yang Anda inginkan.

Di **GIMP** dan **Inkscape**, Global Menu akan langsung aktif. Sementara untuk **LibreOffice** Anda harus memasang paket `libreoffice-qt5` jika belum terpasang. Sementara untuk **Audacity** Anda perlu menyalin file `audacity.desktop` dari `/usr/share/applications` ke `/home/user/.local/share/applications`. Kemudian buka file tersebut dengan teks editor. Cari bagian `Exec=`, lalu hapus `env UBUNTU_MENUPROXY=0` sehingga menjadi hanya `Exec=audacity %F` saja.

Untuk programmer pengguna **IntelliJ IDEA**, dukungan Global Menu baru akan hadir di versi 183.3459. Sementara aplikasi Java lainnya belum ada dukungan untuk Global Menu.

**Firefox** dan **Thunderbird** juga tidak bisa, perlu diimplementasikan oleh developer *Mozilla* langsung. Sedangkan untuk aplikasi GTK lainnya saya tidak mencobanya. Jadi silakan eksplorasi sendiri.