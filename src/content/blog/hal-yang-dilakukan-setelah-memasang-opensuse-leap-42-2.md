---
title: "Hal yang Dilakukan Setelah Memasang openSUSE Leap 42.2"
date: "2016-11-17"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "SUSE Linux Enterprise Server (SLES) SP2 telah dirilis pada tanggal 4 November 2016. Kini giliran openSUSE Leap 42.2 diliris secara resmi pada tanggal 16 November kemarin. Selang 1 tahun sebelumnya openSUSE telah merilis openSUSE Leap 42.1 dengan berdasarkan paket perangkat lunak stabil milik SLES..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/hal-yang-dilakukan-setelah-memasang-opensuse-leap-42-2/Screenshot_20161117_205832.png"
---

SUSE Linux Enterprise Server (SLES) SP2 telah dirilis pada tanggal 4 November 2016. Kini giliran openSUSE Leap 42.2 diliris secara resmi pada tanggal 16 November kemarin. Selang 1 tahun sebelumnya openSUSE telah merilis openSUSE Leap 42.1 dengan berdasarkan paket perangkat lunak stabil milik SLES 12 SP1, sama halnya juga dengan openSUSE 42.2 yang berdasarkan paket stabil milik SLES 12 SP2 sehingga membuat komputer anda lebih nyaman digunakan.

Jika anda pengguna KDE, pada versi openSUSE Leap 42.2 ini terdapat beberapa perubahan dan pembaharuan perangkat lunak yang digunakan pada umumnya. Versi sebelumnya openSUSE menggunakan KDE Versi 5.1-5.5 kini KDE pada openSUSE Leap 42.2 menggunakan versi 5.8 yang membuat destop anda menjadi lebih responsif dan stabil. Jika biasanya anda menggunakan KSnapshot untuk menangkap gambar layar. Kini openSUSE Leap mengadopsi Spectacle sebagai perangkat lunak untuk menangkap layar, dan masih banyak yang lainnya. Anda dapat membaca release notes pada tautan [berikut](https://doc.opensuse.org/release-notes/x86_64/openSUSE/Leap/42.2/).

Jika anda belum mencoba openSUSE ini saya sarankan anda untuk mencobanya. Jika anda tertarik untuk mencobanya anda dapat mengunduh ISO filenya pada tautan [berikut](http://repo.opensuse.id/distribution/leap/42.2/iso/).

Nah, jika anda telah memasang openSUSE Leap 42.2 pada perangkat anda. Apa yang akan anda lakukan selanjutnya? Mungkin beberapa tips berikut dapat membantu.

## 1. Mengubah Repositori Lokal (Jika Perlu)

Secara default pada saat openSUSE dipasang, repositori akan mengarah ke repositori resmi milik opensuse. Namun jika anda merasa bandwith lambat, tidak masalah! anda dapat mengarahkan repositori ke repositori milik Komunitas openSUSE Indonesia resmi. Terima kasih untuk pak Edwin Zakaria yang telah membangun repositori ini.

```
zypper mr -da
zypper ar -f http://repo.opensuse.id/distribution/leap/42.2/repo/oss/ repo-opensuse-id-oss
zypper ar -f http://repo.opensuse.id/distribution/leap/42.2/repo/non-oss/ repo-opensuse-id-non-oss
zypper ar -f http://repo.opensuse.id/update/leap/42.2/oss/ repo-opensuse-id-update-oss
zypper ar -f http://repo.opensuse.id/update/leap/42.2/non-oss/ repo-opensuse-id-update-non-oss
```

## 2. Mengecek Pembaharuan

Pastikan openSUSE anda terbaharui, anda dapat mengeceknya dengan perintah berikut :

```
zypper ref
zypper up
```

## 3. Menambahkan Repositori Packman/Komunitas

openSUSE dikemas dengan repositori resmi, namun ada beberapa paket yang tidak dikemas pada repositori resmi karena masalah perizinan dan lisensi. Packman adalah repositori komunitasi yang menawarkan bermacam-macam paket tambahan untuk openSUSE terutama untuk multimedia. Packman terdiri dari 4 repositori berikut :

**Essentials**: Menyediakan paket-paket codec untuk kebutuhan multimedia anda  
**Multimedia** : Menyediakan perangkat lunak multimedia anda, seperti VLC, SMPlayer, dll.  
**Extra** : Menyediakan paket-paket non-multimedia, biasanya pada repositori ini menyediakan paket untuk kebutuhan jaringan.  
**Games**: Menyediakan paket-paket hiburan, seperti permainan

Repositori packman dapat anda dapatkan di luar indonesia seperti di ftp.gwdg.de atau milik Komunitasi openSUSE Indonesia.

```
zypper ar -f http://ftp.gwdg.de/pub/linux/misc/packman/suse/openSUSE_Leap_42.2/ packman

atau

zypper ar -f http://repo.opensuse.id/packman/openSUSE_Leap_42.2/ packman
```

## 4.  Memasang Codecs

Untuk memaksimalkan multimedia anda, disarankan untuk memasang codecs. Codecs membantu anda untuk memainkan beberapa format video, anda bisa mendapatkan paket tersebut pada repositori packman pada langkah ke-3. Jalankan perintah berikut:

```
zypper in ffmpeg lame phonon-backend-vlc phonon4qt5-backend-vlc vlc-codecs
zypper rm phonon-backend-gstreamer phonon4qt5-backend-gstreamer
```

**Atau**

Jika ragu, anda dapat dengan mudah memasang codecs dengan satu kali klik. Ikuti panduannya pada laman berikut [http://opensuse-community.org/](http://opensuse-community.org/).

## 5. Memasang Aplikasi Pemutar Suara  & Video

Salah satu aplikasi favorit untuk memutar video atau suara pada destop adalah VLC Media Player, perangkat lunak tersebut dapat dipasang pada beberapa sistem operasi , salah satunya linux. VLC juga memiliki codecs tersendiri, namun jika anda mengikuti langkah sebelumnya anda tidak perlu memasangnya kembali. Berikut cara memasangnya aplikasi VLC Media Player :

```
zypper in vlc
```

## 6.  Memasang Flash Player

Walaupun beberapa laman website sudah menggunakan HTML5, namun tidak menutup kemungkinan anda juga membutuhkan flash player sebagai plugin tambahan pada suatu website. Berikut langkahnya :

```
rpm -ivh http://linuxdownload.adobe.com/adobe-release/adobe-release-x86_64-1.0-1.noarch.rpm
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-adobe-linux
zypper install flash-plugin
```

## 7. Memasang Google Chrome

Secara default, openSUSE Leap mengadopsi Mozilla Firefox sebagai perangkat lunak untuk menjelajah website. Namun bagi anda yang sudah terbiasa menggunakan Google Chrome dibanding Mozilla anda dapat memasangnya dengan langkah berikut:

```
rpm --import https://dl.google.com/linux/linux_signing_key.pub
zypper ar http://dl.google.com/linux/chrome/rpm/stable/x86_64 google-chrome
zypper ref
zypper in google-chrome-stable
```

## 7. Memasang Perangkat Lunak Desain

Bagi anda, penggemar desain yang baru migrasi dari windows ke linux. Anda dapat menggunakan Inkscape sebagai pengganti dari Adobe Photoshop atau CorelDraw atau aplikasi lainnya. Sayangnya pada openSUSE Leap 42.2 secara default tidak mengikutsertakan Inkscape pada saat instalasi. Namun tidak perlu khawatir anda dapat memasangnya :

```
zypper in inkscape gimp
```

## 8. Memasang Aplikasi Email Client

Nah, apabila anda pekerja kantoran dan sering menggunakan email dengan menggunakan email client anda dapat memasang thunderbird atau aplikasi sejenisnya. Jika anda ingin memasang thunderbird, berikut langkahnya :

```
zypper in MozillaThunderbird
```

## 9. Memasang Aplikasi Remote Desktop

Jika anda menggunakan KDE anda dapat menggunakan KRDC atau RDP sebagai solusinya, saya pribadi lebih prefer ke KRDC karena dapat terintegrasi denga KWallet dimana jika anda memiliki komputer yang dapat dikontrol jauh anda tidak perlu menghapal sandi dari komputer tersebut satu persatu, karena sandi akan tersimpan pada KWallet pada saat pertama kali anda masuk/login. Berikut cara memasangnya :

```
zypper in krdc
```

## 10. Memasang Aplikasi Percakapan Telegram

Saya pribadi, penggemar aplikasi telegram, karena secara penggunaan sangat mudah, dan terdapat fitur bot yang memudahkan. Aplikasi telegram dapat anda pasang dengan mengunduh aplikasinya pada tautan berikut. [https://desktop.telegram.org/](https://desktop.telegram.org/)

## 11. Memasang Aplikasi Tambahan Lainnya

Sebenarnya masih banyak beberapa aplikasi yang dapat anda pasang bisa disesuaikan dengan kebutuhan anda. Berikut beberapa aplikasinya:

```  
# Memasang Torrent Downloader :  
zypper install qbittorrent deluge

# Memasang FTP Client  
zypper install filezilla

# Memasang Dropbox  
zypper install dropbox

# Memasang Steam untuk  
zypper install steam

# Memasang Emulator Wine  
zypper install wine

# Memasang Aplikasi Percakapan Client  
zypper install pidgin  
```

Ini hanya beberapa tips dari saya, mungkin anda dapat menyesuaikan aplikasi sesuai dengan kebutuhan anda, saya mohon maaf bila ada kesalahan dalam penulisan. Saya berharap tulisan ini bermanfaat bagi pengguna openSUSE di Indonesia terutama yang baru memulai. Jika ada yang perlu ditanyakan, jangan ragu untuk mengadu pada kolom komentar dibawah atau dapat mendiskusikannya pada Grup Facebook [Komunitas openSUSE Indonesia](https://www.facebook.com/groups/opensuse.indonesia/).