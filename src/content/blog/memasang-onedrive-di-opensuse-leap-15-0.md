---
title: "Memasang OneDrive di openSUSE Leap 15.0"
date: "2019-01-11"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Pasang dependensi sudo zypper in libcurl-devel sqlite3-devel curl -fsS https://dlang.org/install.sh |  -s dmd Catatan: meskipun paket dmd ada di repositori openSUSE, dalam panduan ini disarankan memasang dari kode sumber sesuai cara diatas. Klon dan pasang git clone https://github.com/skilion..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/memasang-onedrive-di-opensuse-leap-15-0/onedrive.jpg"
---

* Pasang dependensi
  ```
  sudo zypper in libcurl-devel sqlite3-devel
  curl -fsS https://dlang.org/install.sh |  -s dmd
  ```
  Catatan: meskipun paket `dmd` ada di repositori openSUSE, dalam panduan ini disarankan memasang dari kode sumber sesuai cara diatas.

* Klon dan pasang
  ```
  git clone https://github.com/skilion/onedrive.git
  cd onedrive
  make
  sudo make install
  ```

* Jalankan    
  ```
  onedrive
  ```
  Anda akan diminta untuk mengunjungi URL autorisasi. Masuk ke akun OneDrive Anda, dan berikan izin aplikasi untuk mengakses akun Anda. Setelah selesai, Anda akan menemui halaman putih kosong. Salin URL dan tempel ke Terminal saat diminta. Onedrive akan mulai mengunduh semua berkas Anda di awan ke folder lokal Anda.

* Konfigurasi
  Anda dapat menemukan berkas konfigurasi di folder git onedrive. Untuk membuatnya aktif, pindahkan ke folder `~/.config/onedrive/`.
  ```
  mkdir -p ~/.config/onedrive
  cp ~/onedrive/config ~/ .config/onedrive/config
  ```
  Buka file konfigurasi. Ada dua opsi yang dapat Anda konfigurasi: `sync_dir` dan `skip_files`.
  * `sync_dir`: lokasi untuk menyimpan berkas OneDrive Anda. Semua berkas yang ditempatkan/dihapus dari folder ini akan disinkronkan ke awan.
  * `skip_files`: jenis atau pola berkas yang tidak akan disinkronkan.

  Setelah Anda membuat perubahan, simpan dan mulai kembali onedrive.

* Mulai otomatis
  Setel mulai otomatis dengan systemd.
  ```
  sudo systemctl --user enable onedrive
  sudo systemctl --user start onedrive
  ```

Selamat mencoba

[Referensi](https://www.maketecheasier.com/sync-onedrive-linux/)