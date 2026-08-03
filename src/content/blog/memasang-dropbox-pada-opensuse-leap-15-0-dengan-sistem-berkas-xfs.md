---
title: "Memasang Dropbox pada openSUSE Leap 15.0 dengan Sistem Berkas XFS"
date: "2018-12-29"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Seperti diketahui bahwa Dropbox menghentikan dukungan mereka pada beberapa jenis sistem berkas dan pada Linux hanya akan mendukung Ext4. Lantas bagaimana dengan sistem berkas XFS atau Btrfs? Panduan ini mencoba untuk menjalankan Dropbox pada openSUSE Leap 15.0 dengan sistem berkas XFS. Pasang Dro..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-dropbox-pada-opensuse-leap-15-0-dengan-sistem-berkas-xfs/com.dropbox.Client.png"
---

Seperti diketahui bahwa Dropbox menghentikan dukungan mereka pada beberapa jenis sistem berkas dan pada [Linux](https://www.dropbox.com/help/desktop-web/system-requirements#desktop) hanya akan mendukung Ext4. Lantas bagaimana dengan sistem berkas XFS atau Btrfs? Panduan ini mencoba untuk menjalankan Dropbox pada openSUSE Leap 15.0 dengan sistem berkas XFS.

* [Pasang](https://www.dropbox.com/install-linux) Dropbox terlebih dahulu
  ```
  cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64" | tar xzf -
  ```
* Jalankan dan masuk ke Dropbox
  ```
  ~/.dropbox-dist/dropboxd
  ```
* Pasang perkakas pengembangan.
  ```
  sudo zypper install -t pattern devel_basis
  ```
* Klon dan bangun [`dropbox-filesystem-fix`](https://github.com/dark/dropbox-filesystem-fix).
  ```
  git clone https://github.com/dark/dropbox-filesystem-fix.git

  cd dropbox-filesystem-fix

  make
  ```
  Berkas dengan nama `libdropbox_fs_fix.so` harus ada pada folder `dropbox-filesystem-fix` setelah menjalankan `make`.
* Pindahkan folder `dropbox-filesystem-fix` ke `/opt` dan ubah izin `dropbox_start.py` agar dapat dieksekusi.
  ```
  sudo mv dropbox-filesystem-fix /opt/

  sudo chmod +x /opt/dropbox-filesystem-fix/dropbox_start.py
  ```
  `dropbox_start.py` harus berada pada folder yang sama dengan `libdropbox_fs_fix.so`, jadi jangan pindahkan ke `/usr/local/bin/` atau folder lainnya.
* Pastikan Dropbox tidak berjalan dulu.
  ```
  ~/.dropbox-dist/dropboxd stop
  ```
* Jalankan Dropbox dengan perintah berikut.
  ```
  /opt/dropbox-filesystem-fix/dropbox_start.py
  ```
  Pastikan mendapat pesan `>>> Dropbox started successfully`
* Menghentikan mulai otomatis milik Dropbox

  Entri mulai otomatis milik Dropbox akan dimatikan karena nantinya yang digunakan adalah skrip `dropbox_start.py`. Untuk menghentikannya, pada menu Dropbox pilih `Preferensi`, lalu tab `Umum`, hapus tanda centang pada `Jalankan Dropbox saat komputer dinyalakan`.
* Menambahkan Entri Mulai Otomatis Yang Baru
  * Buat berkas `dropbox-fix.desktop` pada `~/.config/autostart/` lalu buka.
    ```
    touch ~/.config/autostart/dropbox-fix.desktop

    gedit ~/.config/autostart/dropbox-fix.desktop
    ```
  * Isi berkas `dropbox-fix.desktop` dengan isian berikut.
    ```ini
    [Desktop Entry]
    Type=Application
    Exec=/opt/dropbox-filesystem-fix/dropbox_start.py
    Hidden=false
    NoDisplay=false
    X-GNOME-Autostart-enabled=true
    Name=Dropbox Fix		
    ```

Selamat Mencoba

---

[Referensi](https://www.linuxuprising.com/2018/11/how-to-use-dropbox-on-non-ext4.html)