---
title: "Minimal/custom install KDE"
date: "2020-09-07"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Setelah selesai melakukan minimal/custom install openSUSE dan membuat fitur factory reset, langkah selanjutnya adalah memasang Desktop Environment/Window Manager, Display Manager, aplikasi-aplikasi pendukung dan modul-modul YaST yang diperlukan. Tapi sayangnya saya cuma punya satu laptop, sehingg..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/minimal-custom-install-kde/kde-minimal.png"
---

Setelah selesai melakukan [minimal/*custom* install openSUSE](https://kikisyahadat.github.io/2020/08/23/minimal-custom-install-opensuse.html) dan [membuat fitur *factory reset*](https://kikisyahadat.github.io/2020/09/03/membuat-fitur-factory-reset.html), langkah selanjutnya adalah memasang Desktop Environment/Window Manager, Display Manager, aplikasi-aplikasi pendukung dan modul-modul YaST yang diperlukan. Tapi sayangnya saya cuma punya satu laptop, sehingga tidak bisa mencoba banyak Desktop Environment atau Window Manager. Jadi yang saya tuliskan di sini apa yang biasa saya gunakan saja, sesuai dengan judul tulisan.

## Memasang paket dari installer

Ketika belum terhubung ke internet, jika kita tidak mematikan repositori online saat baru selesai instalasi openSUSE, zypper akan komplain bahwa repositori-repositori tersebut gagal diperbarui. Jadi sebaiknya kita matikan dahulu:

`su -c "zypper modifyrepo -dt"`

Lalu hidupkan repositori installer:

`su -c "zypper modifyrepo -el"`

Setelah itu masukkan piringan DVD atau *flashdisk* yang digunakan untuk instalasi openSUSE. Lalu pasang semua paket yang diperlukan dengan perintah:

`su -c "zypper install <nama-paket>"`

Paket-paket yang mungkin perlu adalah:

- `plasma5-session` atau `plasma5-session-wayland`: Desktop Environment. Perbedaan dari kedua paket tersebut adalah, jika memasang `plasma5-session-wayland` akan ikut membawa `plasma5-session` sebagai dependensi, tapi tidak sebaliknya. Jika memasang `plasma5-session` kita hanya bisa login ke sesi **X11** saja, tapi `plasma5-session-wayland`, selain bisa ke **X11**, juga bisa ke sesi **Wayland** dan **Full Wayland**.
- `sddm`: Display Manager. Setelah memasang paket ini saya bisanya mengganti service *display-manager.service* dengan *sddm.service* dengan perintah: `su -c "systemctl disable display-manager.service && systemctl enable sddm.service"`. Jika perlu login otomatis, ubah parameter `DISPLAYMANAGER_AUTOLOGIN` di /etc/sysconfig/displaymanager dengan perintah: `su -c "sed -i 's/DISPLAYMANAGER_AUTOLOGIN="/DISPLAYMANAGER_AUTOLOGIN="$USER/' /etc/sysconfig/displaymanager"`.
- `plasma-nm5`: NetworkManager applet.
- `plasma5-pa`: Volume Manager applet.
- `dolphin`: File Manager.
- `konsole`: Terminal Emulator.
- `kate`: Text Editor.
- `okular`: Document Viewer.
- `gwenview5`: Image Viewer.
- `spectacle`: Screen Capture, untuk mengambil *screenshot* desktop.
- `ark`: Archive Manager, untuk membuka file .zip, .tar, dan lain-lain.
- `vlc`: Multimedia Player, untuk memutar video dan musik.
- `MozillaFirefox`: Web Browser.
- `libreoffice-writer`: Word Processor LibreOffice.
- `libreoffice-calc`: Spreadsheet LibreOffice.
- `libreoffice-impress`: Presentation LibreOffice.
- `libreoffice-qt5`: Antarmuka Qt LibreOffice, supaya serasi dengan tampilan KDE.

Paket-paket pelengkap

- `kernel-firmware` atau di Tumbleweed ada `kernel-firmware-<perangkat>`. Paket ini tergantung pada hardware yang digunakan. Jika ada hardware yang membutuhkan `kernel-firmware` biasanya saat *booting* muncul peringatan seperti `fail to load firmware brcm/bcm43xx-0.fw` (ini yang muncul di laptop saya), atau bisa juga diperiksa dengan perintah `dmesg | grep -i 'firmware'`. Dari peringatan tersebut kita bisa menentukan firmware apa yang dibutuhkan dengan perintah `zypper search --provides bcm43xx-0.fw`. Dari hasil perintah tersebut akan muncul `kernel-firmware` atau `kernel-firmware-brcm` (tergantung apakah Anda menggunakan Leap atau Tumbleweed). Maka pasang paket tersebut.
- `glibc-locale` atau `glibc-locale-base`. Ini adalah paket *locale*. Untuk menghilangkan peringatan `-bash: warning: setlocale: LC_BLABLA: cannot change locale (BLABLA): No such file or directory` saat masuk mode CLI yang dibahas di tulisan [minimal/*custom* install openSUSE](https://kikisyahadat.github.io/2020/08/23/minimal-custom-install-opensuse.html#pasca-instalasi) dan peringatan `Failed to set local. Fix your system.` saat menjalankan perintah `snapper` yang dibahas di tulisan [membuat fitur factory reset](https://kikisyahadat.github.io/2020/09/03/membuat-fitur-factory-reset.html#buat-konfigurasi-snapper). Jika Anda akan menggunakan bahasa selain Inggris (US), pasang `glibc-locale`. Tapi jika Anda hanya akan menggunakan bahasa Inggris standar sistem, cukup pasang `glibc-locale-base`. Jika Anda memilih memasang `glibc-locale-base` tapi lebih suka format 24 jam daripada AM/PM dan/atau lebih suka format tanggal bulan tahun daripada bulan tanggal tahun, Anda bisa mengubah bahasa dari `en_US.UTF-8` ke `C.UTF-8` dengan perintah `su -c "localectl set-locale LANG=C.UTF-8"`.
- `ca-certificates-mozilla`. Untuk mengakses jaringan aman, termasuk repositori https.
- `deltarpm`. Jika menggunakan openSUSE Leap. Supaya ukuran file yang diunduh ketika *update* lebih kecil.
- `btrfsmaintenance`. Jika menggunakan Btrfs, untuk *scrub*, *balance* dan *trim* otomatis dalam jangka waktu tertentu.
- `alsa-plugins-pulse`. Tanpa ini PulseAudio tidak bisa memutar suara dari lebih dari satu sumber secara bersamaan.
- `usb_modeswitch`, `ModemManager` dan `mobile-broadband-provider-info`. Jika Anda menggunakan modem mobile broadband (operator selular atau sejenisnya). Bisa juga ditambahkan `modem-manager-gui` jika perlu.
- `kdeconnect-kde`. Untuk menghubungkan komputer dengan *smartphone* Android dan perangkat lain. Jangan lupa untuk memasang `openssh` untuk bisa membuka tempat penyimpanan Android dari Dolphin.
- `kio-extras5`. Komponen tambahan KIO. Salah satu fungsinya supaya bisa menampilkan preview file di File Manager Dolphin atau Konqueror.
- `ffmpegthumbs`. Untuk menampilkan preview file video.
- `libqt5-qtimageformats`. Beberapa format gambar, seperti .webp, tidak bisa dibuka di Gwenview tanpa paket ini.
- `xdg-desktop-portal-kde`. Supaya open/save dialog jadi serasi di aplikasi non KDE.
- `upower`. Untuk manajemen daya yang nantinya bisa diatur dari System Settings.
- `tlp-rdw`. Otomatis membawa paket `tlp` sebagai dependensi. Untuk manajemen daya.
- `smartmontools`. Monitor perangkat SMART (Self-Monitoring, Analysis and Reporting Technology System).
- `grub2-branding-openSUSE`. Jika ingin menu Grub *bling-bling*. Tanpa paket ini tampilan Grub hanya layar hitam dengan tulisan putih.
- `grub2-snapper-plugin`. Supaya bisa *boot* ke *read-only snapshot* melalui menu Grub.
- `plymouth`. Jika ingin layar *booting* *bling-bling*. Tanpa ini, saat *booting* hanya layar hitam.
- `command-not-found`. Untuk mempermudah mencari paket yang harus dipasang. Ketika kita menjalankan suatu perintah mendapat respon `bash: command not found`, cara termudah mencari paket yang harus dipasang adalah dengan perintah `cnf <perintah>` lewat paket ini.
- `udisks2`. Untuk mempermudah *mounting* perangkat internal atau eksternal (seperti *flashdisk*) dari File Manager Dolphin.
- `ntfs-3g`. Jika ada partisi dengan filesystem NTFS.
- `man`. Untuk membaca Manual.
- `xdg-utils`. Perintah `xdg-open`, `xdg-su` dan beberapa perintah `xdg-<sesuatu>` lainnya ada di paket ini.
- `xdg-user-dirs`. Untuk manajemen direktori standar (seperti Documents, Music, Videos, dll) di $HOME.
- `fonts-config`. Setelan *antialiasing*, *hinting*, mengatur *default* fonts Sans, Serif dan Monospace diatur lewat paket ini. Pengaturannya ada di /etc/sysconfig/fonts-config. Setelah mengubah isi dari file tersebut, jalankan `su -c "fonts-config"`.
- Font pelengkap. Bisa coba dengan `noto*fonts` atau `google*fonts`. Tanda `*` supaya semua paket dengan awalan `noto` atau `google` dan akhiran `fonts` ikut dipilih untuk dipasang.
- `plasma5-addons`. Tambahan koleksi Widget Plasma.
- `vim` atau `nano`. Jika butuh teks editor CLI.
- `sudo`. Untuk mengganti `su -c "perintah"` dengan `sudo perintah`, jika Anda lebih terbiasa atau lebih nyaman dengan `sudo`.
- Modul-modul YaST. Cari dengan perintah `zypper search yast`. Pasang sesuai dengan kebutuhan. Jangan lupa untuk memasang `libyui-qt-pkg*` dan/atau `libyui-ncurses-pkg*` jika tidak otomatis ikut terpasang. Ganti `*` dengan nomor yang sesuai dengan hasil pencarian menggunakan `zypper search libyui`. Setelah memasang YaST, jangan lupa untuk mengubah parameter `USE_SNAPPER` di /etc/sysconfig/yast2 menjadi `no` dengan perintah `su -c "sed -i 's/USE_SNAPPER="yes/USE_SNAPPER="no/' /etc/sysconfig/yast2"`. Karena jika tidak diubah, YaST akan membuat Snapshot di konfigurasi *root* setiap kali kita membuka modul YaST yang akan membuat nomor Snapshot menjadi tidak serasi antara konfigurasi *root* dengan konfigurasi lainnya.
- Dan lain-lain. Silakan cari dengan perintah `zypper search <keyword>` jika ada paket yang dibutuhkan yang ada dalam installer.

Setelah semua paket yang dibutuhkan yang ada dalam installer dipasang, cabut/keluarkan piringan DVD atau *flashdisk* installer. Lalu matikan kembali repositori installer tersebut:

`su -c "zypper modifyrepo -dl"`

Hidupkan kembali *repo-oss*, *repo-non-oss*, *repo-update* dan *repo-update-non-oss*. Untuk *repo-update-non-oss* ini hanya ada di Leap, sedangkan di Tumbleweed tidak ada:

`su -c "zypper modifyrepo -e repo-oss repo-non-oss repo-update repo-update-non-oss"`

## Tambahkan repositori Packman

Setelah selesai dengan semua proses instalasi paket dari installer, jalankan ulang (*reboot*) komputer, lalu hubungkan ke internet. Lanjutkan dengan menambahkan repositori Packman.

Untuk openSUSE Leap 15.2 (untuk Leap selain 15.2, sesuaikan angka versinya):

`su -c "zypper addrepo --name 'Packman Repository' https://repo.opensuse.id/packman/openSUSE_Leap_15.2/ repo-packman"`

Untuk openSUSE Tumbleweed:

`su -c "zypper addrepo --name 'openSUSE-Tumbleweed-Packman' https://repo.opensuse.id/packman/openSUSE_Tumbleweed/ repo-packman"`

Nama setelah opsi `--name` silakan ubah sesuai keinginan supaya mudah diingat atau supaya cocok dengan penamaan repositori lainnya. Untuk melihat daftar repositori, gunakan perintah `zypper repos`.

Jika tidak mau repositori otomatis melakukan *refresh*, tambahkan opsi `--no-refresh`. Untuk melakukan *refresh* secara manual, jalankan perintah `su -c "zypper refresh"`.

Jika ingin paket yang diinstall tidak otomatis terhapus setelah paket terpasang, tambahkan opsi `--keep-packages`. Semua file paket ada di /var/cache/zypp/packages.

Untuk opsi-opsi lainnya silakan jalankan perintah `zypper help addrepo`.

Setelah repositori Packman ditambahkan, *update* paket ke repositori tersebut:

`su -c "zypper dup --from repo-packman"`

Setelah selesai, coba VLC untuk memainkan berbagai format audio/video. Seharusnya proses ini sudah cukup untuk menjalankan berbagai format standar audio/video, seperti .mp3 atau .mp4, tanpa harus memasang lagi *codec* khusus.

## Pasang paket lain yang tidak tersedia di installer

Paket-paket yang mungkin perlu ditambahkan:

- `opi`. Untuk memasang paket dari OBS. Pastikan untuk memasang `sudo` juga jika memasang paket ini. Cara mencari dan memasang paket dari OBS dengan `opi` adalah dengan perintah `opi <keyword>`, lalu ikuti petunjuknya.
- `falkon`. Jika tidak suka dengan Firefox.
- `mpv`. Jika Anda menganggap VLC terlalu *bloated* atau terlalu *overkill*.
- `elisa` atau `clementine`. Jika ingin memisahkan player musik dengan player video. Jangan lupa untuk memasang `gstreamer-plugins-libav`, `gstreamer-plugins-good`, `gstreamer-plugins-bad` dan `gstreamer-plugins-ugly` jika Anda memasang `clementine`, jika paket-paket tersebut tidak otomatis ikut terpasang sebagai dependensi.
- Dan lain-lain. Silakan cari dengan perintah `zypper search <keyword>` jika ada paket yang dibutuhkan yang tidak ada di dalam installer.

## Untuk pengguna Desktop Environment atau Window Manager lain

Jika Anda ingin menggunakan Desktop Environment atau Window Manager lain, buat semua paket yang ada di sini sebagai acuan dan ganti dengan alternatif di Desktop Environment/Window Manager yang Anda gunakan. Misalnya ganti `dolphin` dengan `nautilus` atau `thunar` dan seterusnya.

Untuk pengguna Plasma 5 pun tidak perlu mengikuti daftar ini, karena saya juga tidak memasang semua yang ada di sini. Anda bisa bereksperimen dengan mengurangi atau menambahkan paket lainnya sesuai kebutuhan. Jika ada yang salah atau dirasa kurang pas, lakukan *factory reset* dan mulai lagi dari awal sampai menemukan setelan yang pas dengan selera pribadi. *“No pain, no gain.”*

Jika ada paket penting yang tidak tercantum di sini, [kabari saya](https://t.me/KikiSyahadat).

---

Tulisan ini dapat dibaca juga di: [https://kikisyahadat.github.io/2020/09/07/minimal-custom-install-kde.html](https://kikisyahadat.github.io/2020/09/07/minimal-custom-install-kde.html)