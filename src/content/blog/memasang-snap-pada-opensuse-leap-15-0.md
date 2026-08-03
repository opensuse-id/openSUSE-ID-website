---
title: "Memasang Snap Pada openSUSE Leap 15.0"
date: "2019-04-24"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Mari kita coba memasang snap pada openSUSE Leap. Berikut langkahnya. Tambahkan repo snap sudo zypper addrepo –refresh https://download.opensuse.org/repositories/system:/snappy/openSUSE_Leap_15.0 snappy Impor gpg secara otomatis sudo zypper –gpg-auto-import-keys refresh Pasang snap sudo zypper ins..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/memasang-snap-pada-opensuse-leap-15-0/snapcraft_green-red_hex.png"
---

![snapcraft](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/memasang-snap-pada-opensuse-leap-15-0/snapcraft_green-red_hex.png)

Mari kita coba memasang snap pada openSUSE Leap. Berikut langkahnya.

* Tambahkan repo snap
  ```
  sudo zypper addrepo --refresh https://download.opensuse.org/repositories/system:/snappy/openSUSE_Leap_15.0 snappy
  ```
* Impor gpg secara otomatis
  ```
  sudo zypper --gpg-auto-import-keys refresh
  ```
* Pasang snap
  ```
  sudo zypper install snapd
  ```
* Anda perlu menyalakan ulang komputer atau keluar dan masuk ke user Anda lagi, atau jalankan `source /etc/profile` untuk menambahkan `/snap/bin` ke `PATH`
* Nyalakan servis snap
  ```
  sudo systemctl enable snapd
  sudo systemctl start snapd
  ```
* Snap siap digunakan
* Untuk pengguna Tumbleweed, perbedaannya terdapat pada langkah 1 dan 5.
  * Langkah 5, jalankan
    ```
    sudo systemctl enable snapd.apparmor
    sudo systemctl start snapd.apparmor
    ```
  * Langkah 1, reponya adalah
    ```
    sudo zypper addrepo --refresh https://download.opensuse.org/repositories/system:/snappy/openSUSE_Tumbleweed snappy
    ```

Selamat mencoba, have fun!