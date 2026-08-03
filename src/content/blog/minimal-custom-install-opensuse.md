---
title: "Minimal/custom install openSUSE"
date: "2020-08-23"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Minimal/custom install openSUSE bisa dilakukan dengan menggunakan ISO DVD Image atau Network Image. Tapi saya biasanya menggunakan DVD Image, supaya saat proses instalasi tidak harus terhubung ke internet yang membuat proses instalasi lebih cepat. Juga setelah proses instalasi selesai kita bisa l..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/minimal-custom-install-opensuse/kde-minimal.png"
---

Minimal/*custom* install openSUSE bisa dilakukan dengan menggunakan ISO **DVD Image** atau **Network Image**. Tapi saya biasanya menggunakan DVD Image, supaya saat proses instalasi tidak harus terhubung ke internet yang membuat proses instalasi lebih cepat. Juga setelah proses instalasi selesai kita bisa langsung memasang software yang dibutuhkan dari DVD Image sehingga tidak pusing harus terhubung ke internet terlebih dahulu.

## Pra instalasi

### Download ISO

Image (DVD atau Network) openSUSE bisa didapatkan di halaman [software.opensuse.org/distributions](https://software.opensuse.org/distributions). Di sana ada pilihan **Tumbleweed** dan **Leap**. Jika Anda bingung mau/harus memilih yang mana, saran saya pilih Leap. Jika *sudah tiba waktunya*, Anda akan beralih ke Tumbleweed dengan sendirinya.

### Burn/dump ke DVD disk/flashdisk

Setelah ISO Image didapat, *burn* ke piringan DVD atau *dump* ke *flashdisk*, lalu *boot* komputer ke perangkat tersebut. Lalu di layar pertama pilih **Installation**.

## Instalasi

### Language, Keyboard and License Agreement

Setelah proses *boot* selesai, layar yang pertama tampil adalah **Language, Keyboard and License Agreement**. Untuk **Language** silakan pilih bahasa yang ingin digunakan (untuk tulisan ini saya membiarkan bahasa *default* Inggris, Anda bisa menyesuaikannya selama proses). **Keyboard Layout**, umumnya *layout* yang beredar di Indonesia menggunakan **English (US)**, coba di kolom **Keyboard Test** jika tidak yakin. Baca **License Agreement** jika perlu. Lanjutkan dengan klik **Next** di kanan bawah layar.

### Network Settings

Jika saat instalasi komputer tidak terhubung dengan internet (dan saya sarankan untuk tidak terhubung jika menggunakan DVD Image), layar selanjutnya adalah **Network Settings**. Klik tab **Hostname/DNS**. Isi kolom **Static Hostname** dengan *hostname* yang Anda inginkan. Standarnya adalah **localhost**, tapi Anda bisa mengubahnya dengan **opensuse** atau yang lainnya. Klik **Next**.

### System Role

Layar selanjutnya adalah **System Role**. Pilih **Desktop with KDE Plasma**, **Desktop with GNOME** atau **Generic Desktop**. Kecuali jika Anda akan menggunakannya untuk *server*. Pilihan ini tidak akan berpengaruh pada hasil instalasi karena di proses selanjutnya semua paket akan di-*reset* supaya jadi *minimal*. Memilih salah satu dari **System Role** hanya supaya bisa masuk ke proses selanjutnya. Klik **Next**.

### Suggested Partitioning

Layar selanjutnya adalah **Suggested Partitioning**. Anda bisa mengubahnya dengan mengklik **Expert Partitioner** lalu memilih salah satu dari **Start with Current Proposal** atau **Start with Existing Partitions**. Jika sebelumnya Anda sudah menyiapkan partisi untuk instalasi openSUSE, pilih yang kedua. Jika belum Anda bisa mencoba memilih yang pertama. Klik **Next**.

#### Expert Partitioner

Layar selanjutnya adalah **Expert Partitioner**. Klik **Hard Disks** di panel sebelah kiri, lalu atur susunan partisi di sebelah kanan sesuai kebutuhan melalui pilihan menu **Modify** dan **Partitions** di bagian bawah layar. Sebagai gambaran, susunan partisi saya adalah seperti berikut:

* /dev/sda: SSD 120 GiB, terbaca 111,8 GiB
  * /dev/sda1: 300 MiB, **Type**: *EFI System Partition*, **Mount Point**: */boot/efi*
  * /dev/sda2: 111.5 GiB, **Type**: *BtrFS*, **Mount Point**: */* (dengan membuat satu *subvolume* tambahan untuk menyimpan software-software yang tidak dipasang melalui repositori)
* /dev/sdb: HDD 500 GiB, terbaca 465.8 GiB
  * /dev/sdb1: 465.8 GiB, **Type**: *Ext4*, **Mount Point**: */home/data* (karena saya membiarkan /home berada di sebuah *subvolume* di dalam partisi root, maka semua data dipisah di satu partisi besar ini)

Saya **tidak** menggunakan partisi **Swap** karena saya membuat Swap berupa **Swapfile** dan **Zram** setelah instalasi selesai.

Perhatikan partisi yang akan diformat. Jika sebelumnya sudah ada sistem operasi lain dan akan jadi *multiboot*, partisi *EFI System Partition* jangan diformat. Partisi di mana data tersimpan juga jangan diformat. Jadi yang diformat hanya partisi root (*/) saja.

Jika Anda memilih BtrFS untuk root (*/f*), Anda bisa mengaktifkan **Snapshot** saat pemilihan partisi ini. Tapi saya biasanya tidak mengaktifkan Snapshot di sini melainkan setelah proses instalasi selesai. Alasannya karena saya membuat konfigurasi Snapshot bukan untuk *root* saja, tapi untuk *subvolume* lainnya juga. Dengan mengaktifkan Snapshot secara bersamaan setelah proses instalasi selesai, nomor Snapshot akan selalu serasi di semua konfigurasi.

Setelah selesai mengatur partisi klik **Accept** untuk kembali ke layar **Suggested Partitioning**. Klik **Next**.

### Clock and Time Zone

Layar selanjutnya adalah **Clock and Time Zone**. Di pilihan **Region** pilih **Asia** dan di pilihan **Time Zone** pilih **Jakarta** jika Anda tinggal di wilayah *Waktu Indonesia Barat*. Untuk wilayah lain silakan sesuaikan. Untuk pilihan **Hardware Clock Set to UTC**, jika Anda *multi/dualboot* dengan Windows, jangan centang opsi ini. Jika *singleboot* atau *multi/dualboot* dengan Linux yang lain tanpa ada Windows sama sekali, lebih baik opsi ini dicentang. Setelah selesai klik **Next**.

### Local User

Layar selanjutnya adalah **Local User**. Isi **User’s Full Name** dengan nama Anda (tidak perlu nama lengkap meskipun yang diminta *Full Name*). **Username** diisi dengan huruf kecil tanpa spasi. **Password** dan **Confirm Password** diisi dengan kata sandi minimal 8 karakter, dengan campuran huruf kecil, huruf besar, angka dan karakter khusus. Klik **Next**.

### Installation Settings

Layar selanjutnya adalah **Installation Settings**. Ini adalah layar terakhir sebelum proses instalasi dilakukan. Di sini kita akan membuat instalasi openSUSE jadi minimal/*custom* sesuai keinginan kita. Jika Anda pernah memasang **Arch Linux** yang bisa memasang hanya paket-paket yang diingankan saja, openSUSE pun bisa seperti itu.

#### Boot Loader Settings

Klik teks **Booting** untuk menyesuaikan pengaturan *bootloader* di layar **Boot Loader Settings**, seperti mematikan **Secure Boot**, memodifikasi **Kernel Parameter**, menyesuaikan **Timeout** jadi beberapa detik saja atau menyembunyikan menu **Grub**. Klik **OK** untuk kembali ke layar **Instalation Settings**.

#### Software Selection and System Tasks

Klik teks **Software** untuk menuju layar **Software Selection and System Tasks**. Klik **Details…** di kiri bawah untuk menampilkan menu di bagian atas layar. Klik menu **Dependencies**, hilangkan centang pada **Install Recommended Packages** dengan mengklik pilihan tersebut. Klik menu **Options**, centang **Cleanup when deleting packages** dengan mengklik pilihan tersebut. Pada kolom **Pattern**, hilangkan semua tanda centang di semua pilihan **Pattern**. Sebagian **Pattern** hanya bisa dihapus tanda centangnya setelah kita menghapus tanda centang di **Pattern** yang lain. Jadi pastikan saja semua tanda centang diklik untuk dihapus sampai pilihan paling bawah.

Setelah semua tanda centang **Pattern** dihapus, klik tab **Search**. Di sini kita akan memilih dua atau tiga paket saja sesuai dengan pengaturan instalasi Anda. Di kolom pencarian, ketik `libinput` lalu tekan *Enter* atau klik **Search** di sebelah kanan kolom. Centang paket **xf86-input-libinput** di hasil pencarian yang muncul. Lalu cari paket `zypper`. Untuk paket ketiga, jika Anda memilih BtrFS saat mengatur partisi dan bermaksud menggunakan fitur Snapshot, cari paket `snapper`. Setelah memilih **xf86-input-libinput**, **zypper** dan **snapper** Anda bisa membuka tab **Installation Summary** untuk melihat paket apa saja yang akan dipasang. Paket dengan kotak sempurna adalah paket yang kita pilih secara manual (tiga paket tadi), sementara kotak yang bagian bawahnya berupa titik-titik adalah paket-paket yang secara otomatis ikut dipasang sebagai dependensi. Jumlah paket yang akan dipasang kurang lebih sekitar 330 paket. Klik **Accept** untuk kembali ke layar **Installation Settings**. Saat muncul *pop up* **Changed Packages – YaST2**, klik **Continue**.

#### Set Default Systemd Target

Setelah mengubah **Software Selection and System Tasks**, **Default systemd target** akan berubah menjadi **Text mode**. Klik teks **Default systemd target**, lalu di layar **Set Default Systemd Target** ubah kembali menjadi **Graphical mode**. Tujuannya supaya setelah kita memasang Desktop Environment atau Window Manager, kita bisa langsung masuk ke GUI tanpa harus mengubah lagi default target. Klik **OK** untuk kembali ke layar **Installation Settings**.

Ketika kembali ke layar **Installation Settings** akan ada dua tulisan berwarna merah:

* The installer is recommending you the default target ‘Text mode’
* X11 packages have not been selected for installation

Abaikan keduanya.

#### Network Configuration

Pastikan setelan **Network Configuration** adalah **– Using NetworkManager**. Jika bukan, klik **switch to NetworkManager**. Kecuali jika Anda sudah terbiasa dengan *wicked* dan ingin menggunakannya.

Setelah semua proses di atas selesai, klik **Install** untuk memulai proses instalasi. Saat muncul *pop up* **Confirm Installation**, klik **Install**.

Tunggu hingga proses instalasi selesai dan komputer dijalankan ulang (**reboot**).

## Pasca Instalasi

Saat komputer pertama kali dijalankan, Anda akan masuk ke mode CLI. Dan saat login akan muncul peringatan `-bash: warning: setlocale: LC_BLABLA: cannot change locale (BLABLA): No such file or directory`. Untuk saat ini abaikan saja.

### Modifikasi /etc/zypp/zypp.conf

Di layar **Software Selection and System Tasks** di atas kita mengubah dua opsi, yaitu menghilangkan centang **Install Recommended Packages** dan mencentang **Cleanup when deleting packages**. Setelah instalasi selesai dan sebelum memasang paket apa pun, kita perlu menyesuaikan kedua opsi tersebut di /etc/zypp/zypp.conf. Karena jika tidak, saat kita memasang paket atau melakukan *update* akan banyak paket rekomendasi yang dipasang yang membuat proses di atas menjadi sia-sia.

Hilangkan centang **Install Recommended Packages**:

`su -c "sed -i 's/# solver.onlyRequires = false/solver.onlyRequires = true/' /etc/zypp/zypp.conf"`

Centang **Cleanup when deleting packages**:

`su -c "sed -i 's/# solver.cleandepsOnRemove = false/solver.cleandepsOnRemove = true/' /etc/zypp/zypp.conf"`

Sebagai tambahan, Anda juga bisa mengubah opsi **Allow vendor change** supaya saat memasang atau *update* paket tidak banyak pertanyaan untuk mengganti vendor dari paket yang akan dipasang:

`su -c "sed -i 's/# solver.allowVendorChange = false/solver.allowVendorChange = true/' /etc/zypp/zypp.conf"`

dan:

`su -c "sed -i 's/solver.dupAllowVendorChange = false/# solver.dupAllowVendorChange = true/' /etc/zypp/zypp.conf"`

Dan jika Anda ingin membuat fitur *factory reset*, Anda perlu mempertahankan **kernel GA** supaya saat di-*reset* tidak terjadi *kernel panic*:

`su -c "sed -i 's/,running/,running,oldest/' /etc/zypp/zypp.conf"`

### Hapus paket-paket yang tidak dibutuhkan

Anda sekarang bisa menghapus semua paket `patterns` yang ikut dipasang saat proses instalasi. Langkah pertama adalah mematikan semua repositori online:

`su -c "zypper modifyrepo -dt"`

Aktifkan repositori dari installer:

`su -c "zypper modifyrepo -el"`

Hapus semua paket `patterns`:

`su -c "zypper remove patterns-*"`

Periksa jika ada paket `unneeded` dan `orphaned`:

`zypper packages --unneeded --orphaned`

Jika ada, hapus semua:

`su -c "zypper remove <nama-paket>"`

Setelah selesai, aktifkan kembali repositori `oss`, `non-oss`, `update` dan `update-non-oss`:

`su -c "zypper modifyrepo -e repo-oss repo-non-oss repo-update repo-update-non-oss"`

Matikan repositori lokal:

`su -c "zypper modifyrepo -dl"`

Jika perlu, matikan autorefresh semua repositori. Ketika kita akan memasang atau *update* paket kita bisa memperbarui repositori secara manual:

`su -c "zypper modifyrepo -Fa"`

Jika Anda ingin menyimpan semua *file* **.rpm** yang diunduh saat memasang paket (semua paket tersebut akan tersimpan di /var/cache/zypp/packages):

`su -c "zypper modifyrepo -ka"`

## Langkah selanjutnya

Proses instalasi sudah selesai, Anda bisa melanjutkan ke proses selanjutnya:

1. [Membuat **Snapshot** dan fitur **Factory Reset**.](https://kikisyahadat.github.io/2020/09/03/membuat-fitur-factory-reset.html)
2. [Memasang **Desktop Environment**/**Window Manager** dan **Display Manager**.](https://kikisyahadat.github.io/2020/09/07/minimal-custom-install-kde.html)
3. [Memasang software aplikasi yang dibutuhkan untuk komputasi harian.](https://kikisyahadat.github.io/2020/09/07/minimal-custom-install-kde.html)
4. [Memasang modul-modul **YaST2** yang dibutuhkan.](https://kikisyahadat.github.io/2020/09/07/minimal-custom-install-kde.html)

## Penampakan

Setelah membuat **Snapshot**, fitur **Factory Reset**, memasang paket `plasma5-session`, `sddm`, `plasma-nm5`, `plasma5-pa` dan `konsole`, berikut penampakannya:

![openSUSE Leap 15.2 Plasma 5.18](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/minimal-custom-install-opensuse/kde-minimal.png)

openSUSE Leap 15.2 Plasma 5.18

## Eksperimen

Silakan Anda lakukan percobaan-percobaan modifikasi dari tulisan ini, seperti mengubah pilihan paket **xf86-input-libinput** dengan *driver* input yang lain, mengganti **zypper** dengan manajer paket lain seperti **dnf** dan lain-lain.

---

Tulisan ini juga bisa dibaca di: [https://kikisyahadat.github.io/2020/08/23/minimal-custom-install-opensuse.html](https://kikisyahadat.github.io/2020/08/23/minimal-custom-install-opensuse.html)