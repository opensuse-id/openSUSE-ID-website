---
title: "Memasang GNOME Boxes Beta dengan Flatpak pada openSUSE Leap 15.0"
date: "2019-02-21"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Sekarang Anda dapat memasang Flatpak Beta dari Flatpak, lebih lanjut silakan dibaca disini. Sebelum mencoba panduan ini, pastikan Anda sudah memasang flatpak. Sebelum GNOME Boxes 3.32 rilis, kita bisa mencoba versi 3,31 (beta) dengan cara berikut. Menambahkan repo Flatpak Beta dari Flathub flatpa..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/memasang-gnome-boxes-beta-dengan-flatpak-pada-opensuse-leap-15-0/tsQsq4cF_400x400.jpg"
---

Sekarang Anda dapat memasang Flatpak Beta dari Flatpak, lebih lanjut silakan dibaca [disini](https://blogs.gnome.org/alexl/2019/02/19/changes-in-flathub-land/). Sebelum mencoba panduan ini, pastikan Anda sudah memasang `flatpak`. Sebelum GNOME Boxes 3.32 rilis, kita bisa mencoba versi 3,31 (beta) dengan cara berikut.

- Menambahkan repo Flatpak Beta dari Flathub

  ```
  flatpak remote-add flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
  ```

- Memasang GNOME Boxes Beta

  ```
  flatpak install flathub-beta org.gnome.Boxes
  ```

- Menjalankan GNOME Boxes Beta

  ```
  flatpak run org.gnome.Boxes//beta
  ```

Selamat mencoba, have fun!