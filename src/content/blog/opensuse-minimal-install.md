---
title: "openSUSE minimal install"
date: "2018-06-06"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Tulisan ini adalah pembaruan dari tulisan yang pernah saya tulis sebelumnya yang berjudul Install (sangat) minimal openSUSE dengan KDE Plasma dan Minimal install openSUSE dengan KDE Plasma 5 (atau GNOME 3?). Tapi di sini saya mencoba mengimplementasikan GNOME juga. Untuk Desktop Environment lain ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Tulisan ini adalah pembaruan dari tulisan yang pernah saya tulis sebelumnya yang berjudul [Install (sangat) minimal openSUSE dengan KDE Plasma](https://kiki-syahadat.blogspot.com/2017/02/install-sangat-minimal-opensuse-dengan.html) dan [Minimal install openSUSE dengan KDE Plasma 5 (atau GNOME 3?)](https://kiki-syahadat.blogspot.com/2016/05/minimal-install-opensuse-kde.html). Tapi di sini saya mencoba mengimplementasikan **GNOME** juga. Untuk *Desktop Environment* lain caranya kurang lebih sama, hanya saja saya tidak mencobanya, jadi silakan gunakan imajinasi Anda.

Salah satu perbedaan *installer* openSUSE Leap 15 dibanding Leap 42 yang saya gunakan di tulisan sebelumnya adalah adanya opsi **Custom** saat pemilihan **User Interface**, jadi kita tidak perlu lagi menggunakan pilihan **Minimal server (Text only)**.

### Instalasi

Langsung saja menuju inti. Setelah kita membuat *bootable DVD* atau *Flashdisk* lalu *boot* ke perangkat tersebut, kita memilih menu **Installation**.

Layar yang pertama tampil adalah **Language, Keyboard and License Agreement**. Untuk bahasa, Anda bisa memilih apapun yang Anda mau. Sedangkan **Keyboard Layout**, yang banyak beredar di Indonesia adalah *layout* **English (US)**. Baca perjanjian lisensi jika perlu, lalu klik **Next** tanda kita menyetujuinya.

Jika komputer tidak terhubung ke internet (dan sebaiknya tidak usah terhubung ke internet jika tidak menggunakan *ISO net install*), layar berikutnya yang akan tampil adalah **Network Setting**. Di sini kita bisa menamai komputer kita pada *tab* **Hostname/DNS**. Klik **Next**.

Layar berikutnya adalah **User Interface**. Di sinilah proses *minimal install* dimulai. Pilih **Custom**, lalu klik **Next**.

Layar berikutnya adalah **Software Selection and System Tasks**. Klik **Details** di bagian kiri bawah layar. Ini akan menampilkan menu di atas layar. Pilih menu **Dependencies**, lalu hilangkan centang pada **Install Recommended Packages**. Selanjutnya pilih opsi **Options**, lalu centang **Cleanup when deleting packages**. Lanjutkan dengan pindah ke *tab* **Search**. Ketik `session` di kolom pencarian. Akan muncul tiga opsi *session*, yaitu **GNOME**, **Plasma 5** dan **XFCE4**. Jika Anda ingin menggunakan **GNOME**, pilih paket `gnome-session` dan `gnome-session-wayland`. Begitu juga jika Anda ingin memilih **Plasma 5**, pilih paket `plasma5-session` dan `plasma5-session-wayland`. Sementara jika Anda memilih **XFCE4**, tidak ada pilihan *session wayland*. Untuk Anda yang memilih **GNOME**, cari juga paket `xf86-input-libinput`. Anda yang memilih **Plasma 5**, paket ini langsung terseleksi secara otomatis. Lalu cari dan pilih *Display Manager* yang ingin digunakan. Untuk **GNOME** pilih `gdm`, untuk **Plasma 5** pilih `sddm`. Jika Anda akan menggunakan *BtrFS*, cari juga paket `grub2-snapper-plugin` dan `snapper-zypp-plugin`. Setelah selesai, klik **Next**.

Layar berikutnya adalah **Suggested Partitioning**. Jika komputer kita sudah berisi data, sebaiknya kita memilih **Expert Partitioner**, lalu pilih **Start with Existing Partitions**. Klik **Next**.

Jika kita memilih **Expert Partitioner**, di layar berikutnya kita bisa mengatur partisi kita. Klik **Hard Disks** di sebelah kiri untuk memunculkan tombol **Edit** dan tombol-tombol lainnya untuk mengatur partisi. Saya biasanya hanya membuat tiga partisi saja; `/dev/sda1` dengan ukuran 256 MiB, tipe `EFI System Partition`, tipe *FS* `FAT` dan *Mount Point* `/boot/efi`. Partisi ini dibutuhkan untuk komputer dengan *firmware* **UEFI**. Komputer dengan *firmware* **BIOS** tidak membutuhkan partisi ini. Partisi kedua adalah `/dev/sda2` dengan ukuran 60 GiB (karena saya tidak memisahkan $HOME dari *root*), tipe `Linux Native`, tipe *FS* `BtrFS` dan *Mount Point* `/`. Jangan lupa untuk mencentang opsi `Enable Snapshots` saat *editing* partisi. Opsi ini bisa dicentang setelah kita menentukan *Mount Point*. Anda bisa memilih untuk menggunakan `Ext4` jika menginginkannya. Dan jika memilih `Ext4`, biasanya ukurannya tidak perlu terlalu besar, karena tidak perlu ruang kosong lebih banyak untuk *Snapshot*. Partisi ketiga adalah `/dev/sda3` dengan ukuran sisa dari total HDD/SSD, tipe `Linux Native`, tipe *FS* `Ext4` dan di-*Mount* sebagai partisi data boleh di mana saja, `/mnt/data` atau `/home/data`, atau di manapun yang Anda inginkan. Dan JANGAN FORMAT PARTISI INI jika sudah berisi data. Saya sengaja tidak membuat partisi **Swap** karena saya biasa menggunakan fitur **ZRAM** untuk membuat **Swap** seperti yang pernah saya bahas di tulisan yang berjudul [Menggunakan zRam sebagai Swap](https://kiki-syahadat.blogspot.com/2016/11/menggunakan-zram-sebagai-swap.html). Setelah selesai mengatur partisi, klik **Next**.

Selesai mengatur partisi kita akan kembali ke layar **Suggested Partitioning**. Klik **Next**.

Layar berikutnya adalah **Clock and Time Zone**. Atur **Region** ke **Asia** dan **Time Zone** ke **Jakarta** jika Anda tinggal di wilayah *Waktu Indonesia Barat*. Jika *Linux* adalah satu-satunya sistem operasi di komputer kita, centang opsi **Hardware Clock Set to UTC**. Tapi jika *dualboot* dengan *Windows*, jangan centang opsi ini. Kita juga bisa melakukan sinkronisasi jam otomatis dengan membuka opsi **Other Settings…**. Lanjutkan dengan klik **Next**.

Layar berikutnya adalah **Local Users**. Isi nama di kolom pertama, *username* (tidak harus sama dengan nama) di kolom kedua dan sandi di kolom ketiga dan keempat. Klik **Next**.

Layar berikutnya adalah **Installation Settings**. Kita bisa mengatur **Boot Loader** jika perlu, dengan mengklik teks **Booting**. Mengatur lamanya tampilan **Grub2** (saya biasa mengatur jadi `1` detik saja) dan/atau menyembunyikan menu **Grub2** serta opsi-opsi lainnya. Jika sudah cukup puas dengan pilihan Anda, klik **Install**. Tunggu hingga proses instalasi selesai.

Setelah proses instalasi selesai, *reboot* komputer, lalu lepas media instalasi (DVD atau Flashdisk).

Lanjutkan dengan proses pasca install.

### Pasca Install

Setelah komputer reboot, kita harus beralih ke *Virtual Console* atau biasa juga disebut *TTY* dengan menekan tombol **Ctrl**, **Alt** dan **F1** secara bersamaan. Untuk **F1**, kita bisa menggantinya dengan **F2** sampai **F6**. Dan untuk kembali ke *desktop* kita bisa menekan **Ctrl**, **Alt** dan **F7** secara bersamaan.

Hal pertama yang perlu dilakukan adalah mengubah file `/etc/zypp/zypp.conf`. Kita akan mengubah seperti apa yang diubah saat instalasi, yaitu menghilangkan centang pada **Install Recommended Packages** dan mencentang **Cleanup when deleting packages**. Karena instalasi dengan cara ini secara baku tidak membawa paket-paket teks editor seperti **Vi/Vim** atau **Nano**, kita harus melakukannya dengan **Sed**. Caranya, jalankan kedua perintah berikut:

`su -c "sed -i 's/# solver.onlyRequires = false/solver.onlyRequires = true/' /etc/zypp/zypp.conf"`

`su -c "sed -i 's/# solver.cleandepsOnRemove = false/solver.cleandepsOnRemove = true/' /etc/zypp/zypp.conf"`

Kenapa menggunakan perintah `su -c`? Karena `sudo` pun tidak ikut terpasang.

Jika Anda ingin mempertahankan *Kernel* bawaan rilis openSUSE (Kernel GA), Anda bisa menjalankan perintah berikut;

`su -c "sed -i 's/,running/,running,oldest/' /etc/zypp/zypp.conf"`

Manfaat dari mempertahankan *Kernel GA* adalah kita bisa melakukan *Factory Reset* openSUSE tanpa mengalami *Kernel panic*.

Setelah mengubah konfigurasi `zypp` kita perlu mematikan dulu semua repositori *online* karena kita akan melakukan instalasi paket dari media installer DVD atau *Flashdisk*. Jalankan perintah berikut;

`su -c "zypper modifyrepo --disable repo-oss repo-non-oss repo-update repo-update-non-oss"`

Setelah mematikan semua repositori *online* kita bisa menghapus paket-paket `patterns` jika perlu. Tapi kita perlu mengunci paket `zypper` terlebih dahulu supaya tidak ikut terhapus. Jalankan perintah-perintah berikut;

`su -c "zypper addlock zypper"`

`su -c "zypper remove patterns-*"`

Lalu lepas kembali kunci `zypper`

`su -c "zypper removelock zypper"`

Masukkan *DVD/Flashdisk installer*, lalu pasang paket-paket yang dibutuhkan dengan perintah `su -c "zypper install *nama-paket*"`. Cari tahu terlebih dahulu apa fungsi dari paket tersebut dengan perintah `zypper info *nama-paket*`, sehingga Anda bisa mengabaikan paket yang tidak diperlukan. Selain paket-paket yang tertulis di bawah, paket lain bisa dicari dengan perintah `zypper search *keyword*`:

* `glibc-locale`
* `kernel-firmware`
* `ucode-intel` untuk pengguna CPU Intel atau `ucode-amd` untuk pengguna CPU AMD
* `deltarpm`
* `ca-certificates-mozilla`
* `btrfsmaintenance` jika menggunakan *BtrFS*
* `xdg-utils`
* `xdg-user-dirs`
* `xdg-user-dirs-gtk` untuk pengguna **GNOME**
* `man`
* `udisks2`
* `upower`
* `alsa`
* `plasma5-pa` untuk pengguna **Plasma 5** yang akan ikut membawa `pulseaudio` sebagai dependensi
* `pulseaudio` untuk pengguna **GNOME**
* `gnome-keyring` untuk pengguna **GNOME**
* `gsettings-backend-dconf` untuk pengguna **GNOME**
* Modul-modul **YaST** yang dibutuhkan (jika Anda bingung apa yang harus dipasang, [ini yang saya pasang di komputer saya](https://kiki-syahadat.blogspot.com/2018/07/apa-yang-terpasang-di-komputer-saya.html))
* Aplikasi-aplikasi yang dibutuhkan (jika Anda bingung apa yang harus dipasang, [ini yang saya pasang di komputer saya](https://kiki-syahadat.blogspot.com/2018/07/apa-yang-terpasang-di-komputer-saya.html))
* `kde-gtk-config5` untuk pengguna **Plasma 5** yang ingin memasang aplikasi GTK/GNOME
* `QGnomePlatform` untuk pengguna **GNOME** yang ingin memasang aplikasi QT/KDE

Setelah semua paket yang dibutuhkan yang tersedia di media instalasi dipasang, hubungkan komputer ke internet, lalu hidupkan kembali semua repositori online dengan perintah;

`su -c "zypper modifyrepo --enable repo-oss repo-non-oss repo-update repo-update-non-oss"`

Tambahkan juga repositori *Packman* jika perlu dengan perintah;

`su -c "zypper addrepo --check https://repo.opensuse.id/packman/openSUSE_Leap_15.0/ repo-packman"` (ganti versi `Leap_15.0` jika Anda menggunakan versi openSUSE lain)

Terima *GPG Key* dari repositori yang baru ditambahkan, lalu *refresh* semua repositori dengan perintah;

`su -c "zypper refresh"`

Kemudian *update*;

`su -c "zypper up"`

*Switch* ke repositori *Packman*;

`su -c "zypper dup --from repo-packman"`

Dengan memasang openSUSE seperti ini, kita tidak akan terpaku dengan aplikasi-aplikasi dari **Desktop Environment** yang digunakan. Kita bisa saja memasang **Nautilus** atau **Gnome Terminal** di **Plasma 5** maupun memasang **Dolphin** atau **Konsole** di **GNOME** tanpa akan ada dua *File Manager* atau *Terminal* yang membuat salah satunya menjadi tidak terpakai. Dan juga kita tidak perlu memasang aplikasi-aplikasi dari repositori openSUSE, terutama pengguna **GNOME**, karena aplikasi-aplikasi inti **GNOME** sekarang sudah bisa dipasang dari **Flathub** (*Flatpak*).

Dan dengan cara seperti ini tidak akan ada lagi *bloatware*, karena semua yang terpasang adalah benar-benar apa yang kita butuhkan saja.

Jika Anda merasa ada yang kurang, silakan gunakan imajinasi Anda. Manfaatkan mesin pencari DuckDuckGo, Google, Yahoo, Bing, Yandex, Ecosia atau apapun yang biasa Anda gunakan. Cari tahu paket apa yang perlu dipasang untuk menutup kekurangan tersebut.

Silakan diskusikan juga jika perlu di grup [@openSUSE_ID](https://t.me/openSUSE_ID) di [Telegram](https://desktop.telegram.org/).