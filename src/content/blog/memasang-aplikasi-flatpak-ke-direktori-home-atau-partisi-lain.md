---
title: "Memasang aplikasi Flatpak ke direktori HOME atau partisi lain"
date: "2018-10-24"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Bagi Anda yang belum pernah mencoba memasang aplikasi berformat Flatpak, Anda bisa mencobanya di openSUSE dengan memasang paket flatpak melalui perintah zypper install flatpak sebagai root atau dengan menggunakan sudo. Atau melalui YaST. Umumnya, aplikasi Flatpak secara baku akan terpasang di dir..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Bagi Anda yang belum pernah mencoba memasang aplikasi berformat **Flatpak**, Anda bisa mencobanya di **openSUSE** dengan memasang paket `flatpak` melalui perintah `zypper install flatpak` sebagai *root* atau dengan menggunakan `sudo`. Atau melalui **YaST**.

Umumnya, aplikasi Flatpak secara baku akan terpasang di direktori **/var**. Tapi kita bisa mengatur ke manapun kita ingin aplikasi dipasang. Jika ingin terpasang di direktori HOME, kita cukup menambahkan opsi `--user` saat menambahkan repositori Flatpak maupun saat memasang aplikasi.

Contoh, saat menambahkan repositori *flathub*, jika tanpa opsi `--user` adalah seperti ini:

`flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo`

Jika ingin menambahkan repositori ke direktori HOME, maka cukup tambahkan opsi `--user`, menjadi:

`flatpak --user remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo`

Lalu saat memasang aplikasi, jika tanpa opsi `--user` adalah seperti ini:

`flatpak install flathub org.libreoffice.LibreOffice`

Jika ingin memasang aplikasi ke direktori HOME, maka perintahnya menjadi:

`flatpak --user install flathub org.libreoffice.LibreOffice`

Tapi bagaimana jika partisi HOME kita tidak dipisah dari *root* dan kita ingin memasang aplikasi Flatpak ke partisi lain supaya partisi *root* tidak cepat habis? Kita bisa membuat sebuah skrip *bash* di **/home/(user)/bin**. Di openSUSE, direktori **/home/(user)/bin** sudah masuk ke PATH environment secara baku, jadi kita bisa menyimpan skrip bash untuk dieksekusi di sana.

Supaya bisa memasang aplikasi Flatpak ke partisi atau direktori yang kita inginkan, buat sebuah file di **/home/(user)/bin** dengan nama `flatpak`, isi file tersebut dengan:

```bash
#!/bin/bash

export HOME=/path/ke/direktori/tujuan
export XDG_DATA_HOME=$HOME/.local/share
export XDG_CONFIG_HOME=$HOME/.config
export XDG_CACHE_HOME=$HOME/.cache

exec /usr/bin/flatpak "$@"
```

Buat file tersebut supaya bisa dieksekusi melalui file manager atau dengan perintah `chmod +x $HOME/bin/flatpak`. Lalu buat tiga folder di direktori tujuan, masing-masing dengan nama `.cache`, `.config` dan `.local` (semua diawali dengan titik), di dalam `.local` buat lagi folder dengan nama `share` (tanpa titik).

Setelah itu, tambahkan repositori dengan menambahkan opsi `--user` seperti ini:

`flatpak --user remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo`

Tambahkan repositori lain jika perlu.

Setelah menambah repositori, kita bisa memasang aplikasi Flatpak, semua dengan opsi `--user`. Misal jika kita ingin memasang LibreOffice, maka jalankan perintah:

`flatpak --user install flathub org.libreoffice.LibreOffice`

Satu lagi yang perlu dilakukan setelah memasang aplikasi Flatpak, sebelum menjalankannya. Yaitu, kita perlu mengubah file-file `.desktop` dari setiap aplikasi yang dipasang. File-file ini berada di **/path/ke/direktori/tujuan/.local/share/flatpak/app/(nama.aplikasi)/current/active/export/share/applications**, ganti *(nama.aplikasi)* dengan nama aplikasi yang sebenarnya, misal untuk LibreOffice *org.libreoffice.LibreOffice*. Salin semua file `.desktop` ke **/home/(user)/.local/share/applications**, lalu buka dengan editor teks. Cari bagian `Exec=` (mungkin hanya satu, tapi mungkin juga lebih dari satu), lalu ubah `/usr/bin/flatpak` menjadi `flatpak` (hilangkan `/usr/bin/`). Ganti juga bagian `Icon=` dengan penamaan icon standar di *Icon theme* yang digunakan di komputer kita. Misal untuk LibreOffice, dari `org.libreoffice.LibreOffice-startcenter` menjadi `libreoffice-startcenter`.

Setelah mengubah semua file .desktop, kita bisa menjalankan aplikasi melalui menu di komputer kita seperti biasa.

Untuk melakukan manajemen aplikasi lainnya, misalnya melakukan update, pastikan selalu menggunakan opsi `--user`. Kecuali untuk menjalankan aplikasi dari terminal, misal `flatpak run org.libreoffice.LibreOffice` jangan menggunakan opsi `--user`.