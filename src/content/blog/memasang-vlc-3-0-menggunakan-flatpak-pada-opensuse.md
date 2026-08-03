---
title: "Memasang VLC 3.0 Menggunakan Flatpak pada openSUSE"
date: "2018-02-11"
author: "Tim openSUSE Indonesia"
category: uncategorized
excerpt: "VLC 3.0 baru saja dirilis. Lima fitur unggulannya antara lain: Dukungan chromecast VLC 3.0 merupakan rilis LTS (Long Term Support) Dukungan penjelajahan jaringan Dukungan adaptive streaming Sudah menggunakan openGL pada Linux untuk memutar video 4K dengan smooth Berikut ini cara memasang VLC meng..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-vlc-3-0-menggunakan-flatpak-pada-opensuse/vlc.png"
---

[VLC 3.0](https://www.videolan.org/vlc/releases/3.0.0.html) baru saja dirilis. Lima fitur unggulannya antara lain:

1. Dukungan chromecast
2. VLC 3.0 merupakan rilis LTS *(Long Term Support)*
3. Dukungan penjelajahan jaringan
4. Dukungan *adaptive streaming*
5. Sudah menggunakan openGL pada Linux untuk memutar video 4K dengan *smooth*

Berikut ini cara memasang VLC menggunakan [Flatpak](http://flatpak.org/):

* Pastikan Anda sudah memasang paket `flatpak`, jika belum silakan pasang, contoh pemasangan melalui terminal adalah dengan mengetikkan perintah:
  ```bash
  sudo zypper install flatpak
  ```
* Apabila paket `flatpak` sudah terpasang, langkah selanjutnya adalah memasang VLC dengan flatpak. Masih di terminal, ketikkan:
  ```bash
  flatpak install --from https://flathub.org/repo/appstream/org.videolan.VLC.flatpakref
  ```
* Tunggu sampai pemasangan selesai dan VLC siap digunakan.
  ![VLC](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-vlc-3-0-menggunakan-flatpak-pada-opensuse/vlc.png)