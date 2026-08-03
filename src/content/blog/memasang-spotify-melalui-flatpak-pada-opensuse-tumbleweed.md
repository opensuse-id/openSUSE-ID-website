---
title: "Memasang Spotify Melalui Flatpak pada openSUSE Tumbleweed"
date: "2017-09-16"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Pasang flatpak sudo zypper install flatpak Tambahkan lumbung flathub flatpak remote-add –if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo Isi sandi root Pasang spotify (bila ada permintaan untuk memasang runtime dari GNOME, pilih ya) flatpak install –from https://flathub.org/rep..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-spotify-melalui-flatpak-pada-opensuse-tumbleweed/Cuplikan-layar-dari-2017-09-16-17-30-01.png"
---

![Cuplikan-layar-dari-2017-09-16-17-30-01.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-spotify-melalui-flatpak-pada-opensuse-tumbleweed/Cuplikan-layar-dari-2017-09-16-17-30-01.png)

* Pasang flatpak  
  `sudo zypper install flatpak`
* Tambahkan lumbung flathub  
  `flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo`
* Isi sandi root
* Pasang spotify (bila ada permintaan untuk memasang runtime dari GNOME, pilih ya)  
  `flatpak install --from https://flathub.org/repo/appstream/com.spotify.Client.flatpakref`
* Jalankan Spotify  
  `flatpak run com.spotify.Client`

Sayangnya, metode pemasangan dengan Flatpak ini, kita harus menjalankan perintah untuk memanggil program tersebut. Untuk mengakalinya, maka kita perlu membuat pintasan (*shortcut*) untuk mempermudah memanggil program. Pada destop GNOME, referensinya adalah [ini](https://developer.gnome.org/integration-guide/stable/desktop-files.html.en).

* Masuk ke direktori ~/.local/share/applications  
  `cd ~/.local/share/applications`
* Buat berkas spotify-flatpak.desktop  
  `touch spotify-flatpak.desktop`
* Sunting berkas spotify-flatpak.desktop  
  `gedit spotify-flatpak.desktop`
* Isikan berkas tersebut seperti berikut

  ```
  [Desktop Entry]
  Name=Spotify
  Exec=flatpak run com.spotify.Client
  Icon=/usr/share/icons/Moka/256x256@2x/web/spotify-client.png
  Type=Application
  Categories=Music;
  ```

  Untuk bagian ikon, pastikan Anda telah memiliki ikon Spotify dan mengarahkannya ke berkas ikon tersebut, dalam contoh ini, saya menggunakan ikon Moka. Bila dicari dengan mengetikkan Spotify, akan muncul seperti berikut.

![Cuplikan-layar-dari-2017-09-16-17-56-44.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-spotify-melalui-flatpak-pada-opensuse-tumbleweed/Cuplikan-layar-dari-2017-09-16-17-56-44.png)

NB: Sejak kapan Glenn Fredly alirannya Metal? (gambar pertama)