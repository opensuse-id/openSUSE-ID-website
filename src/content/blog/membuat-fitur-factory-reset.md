---
title: "Membuat fitur factory reset"
date: "2020-09-03"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Tidak seperti Android atau Windows yang sudah diatur oleh pabrikan, factory reset di Linux bisa diatur seperti apa kita mau saat kita melakukan factory reset. Kita bisa mengubah konfigurasi atau memasang software yang jika komputer kita kembalikan ke factory reset, konfigurasi atau software terse..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/membuat-fitur-factory-reset/snapper.png"
---

![snapper](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/membuat-fitur-factory-reset/snapper.png)

# Membuat fitur factory reset

Tidak seperti Android atau Windows yang sudah diatur oleh pabrikan, *factory reset* di Linux bisa diatur seperti apa kita mau saat kita melakukan *factory reset*. Kita bisa mengubah konfigurasi atau memasang software yang jika komputer kita kembalikan ke *factory reset*, konfigurasi atau software tersebut tidak ikut hilang. Seperti pada tulisan [minimal/custom install openSUSE](https://kikisyahadat.github.io/2020/08/23/minimal-custom-install-opensuse.html), kita mengubah konfigurasi /etc/zypp/zypp.conf dan beberapa opsi repositori sebelum membuat *factory reset*. Pengaturan yang sudah diubah ini tidak akan kembali ke *default* jika kita melakukan *factory reset*.

Di tulisan tersebut juga disebutkan bahwa kita membuat *factory reset* sebelum memasang **Desktop Environment**/**Window Manager** dan **Display Manager**. Tujuannya supaya jika kita ingin mengganti Desktop Environment dengan yang lain atau dengan Window Manager, kita tidak perlu menghapus paket-paket dari Desktop Environment yang sudah terpasang beserta aplikasi-aplikasi pendukungnya. Cukup melakukan reset, semua yang terpasang akan langsung hilang. Karena jika kita menghapus paket-paket yang sudah terpasang, terutama Desktop Environment, mungkin akan menyisakan dependensi yang tidak ikut terhapus atau konfigurasi-konfigurasi dari Desktop Environment tersebut.

## Persiapan

Jika Anda ingin membuat fitur *factory reset* di openSUSE, disarankan untuk tidak mengaktifkan Snapshot ketika membuat partisi Btrfs saat proses instalasi, karena kita akan membuat konfigurasi di *subvolume* yang lain. Sehingga nomor Snapshot akan serasi di semua konfigurasi jika membuatnya secara bersamaan, yang akan membuat manajemen Snapshot lebih mudah.

### Atur konfigurasi yang diperlukan

Atur konfigurasi yang diperlukan, seperti mengubah beberapa opsi di /etc/zypp/zypp.conf dan opsi repositori seperti yang dilakukan di tulisan [minimal/*custom* install openSUSE](https://kikisyahadat.github.io/2020/08/23/minimal-custom-install-opensuse.html#pasca-instalasi) supaya kita tidak perlu mengatur lagi opsi-opsi tersebut setelah melakukan *factory reset*.

### Pastikan Snapper terpasang

Di openSUSE, fitur *factory reset* bisa dibuat dengan menggunakan **Snapper** yang sudah tersedia di dalam installer. Jika Anda memasang openSUSE dengan cara [minimal/*custom* install](https://kikisyahadat.github.io/2020/08/23/minimal-custom-install-opensuse.html#software-selection-and-system-tasks), pastikan memilih paket `snapper` di layar **Software Selection and System Tasks**. Jika Anda memasang openSUSE dengan cara standar, paket tersebut sudah otomatis ikut terpasang.

Jika saat instalasi Anda tidak memilih untuk memasang Snapper, pasang dari DVD installer. Login sebagai root untuk mempercepat proses. Jika sudah terlanjur masuk sebagai user standar, pindah ke root:

`su -`

Matikan semua repositori online:

`zypper modifyrepo -dt`

Aktifkan repositori dari installer:

`zypper modifyrepo -el`

Masukkan piringan DVD/flashdisk installer, lalu install Snapper:

`zypper install snapper`

Matikan lagi repositori dari installer:

`zypper modifyrepo -dl`

Aktifkan kembali repositori `repo-oss`, `repo-non-oss`, `repo-update` dan `repo-update-non-oss`:

`zypper modifyrepo -e repo-oss repo-non-oss repo-update repo-update-non-oss`

### Matikan *snapper-timeline.timer*

Service *snapper-timeline.timer* dimaksudkan untuk membuat Snapshot setiap jam. Kita tidak ingin mempunyai Snapshot sebanyak itu, jadi kita perlu mematikannya sebelum membuat konfigurasi Snapper:

`systemctl disable --now snapper-timeline.timer`

### Pastikan Kernel GA tidak akan terhapus

Periksa jika `multiversion.kernels` di /etc/zypp/zypp.conf sudah menyertakan `oldest` sebagai salah satu opsi. Ini juga sudah dibahas di tulisan [minimal/custom install openSUSE](https://kikisyahadat.github.io/2020/08/23/minimal-custom-install-opensuse.html#modifikasi-etczyppzyppconf). Lihat dengan `grep`:

`grep -i 'multiversion.kernels' /etc/zypp/zypp.conf`

Jika belum ada opsi `oldest` seperti ini:

```multiversion.kernels = latest,latest-1,running
```

Tambahkan opsi `oldest`:

`sed -i 's/,running/,running,oldest/' /etc/zypp/zypp.conf`

Yang akan membuatnya berubah menjadi seperti ini:

```multiversion.kernels = latest,latest-1,running,oldest
```

## Membuat Snapshot

Kita akan membuat konfigurasi Snapper sesuai dengan *subvolume* yang tersedia, kecuali */tmp* dan dua *subvolume* di dalam direktori */boot*.

### Lihat daftar subvolume

Setelah semua persiapan selesai kita bisa mulai membuat konfigurasi Snapper berdasarkan daftar *subvolume* yang dibuat saat instalasi openSUSE.

Lihat daftar Snapshot:

`btrfs subvolume list /`

Di layar akan muncul respon serupa dengan ini:

```ID 256 gen 71 top level 5 path @
ID 258 gen 70 top level 256 path var
ID 259 gen 57 top level 256 path usr/local
ID 260 gen 58 top level 256 path tmp
ID 261 gen 57 top level 256 path srv
ID 262 gen 57 top level 256 path root
ID 263 gen 57 top level 256 path opt
ID 264 gen 57 top level 256 path home
ID 265 gen 57 top level 256 path boot/grub2/x86_64-efi
ID 266 gen 57 top level 256 path boot/grub2/i386-pc
```

### Buat konfigurasi Snapper

Berdasarkan daftar di atas kita buat konfigurasi Snapper untuk *@* (root), *var*, *usr/local*, *srv*, *root*, *opt* dan *home*:

`snapper -c root create-config /`

`snapper -c var create-config /var`

`snapper -c local create-config /usr/local`

`snapper -c srv create-config /srv`

`snapper -c su create-config /root`

`snapper -c opt create-config /opt`

`snapper -c home create-config /home`

Untuk *subvolume* /root beri nama *su* karena nama konfigurasi *root* sudah dibuat sebelumnya.

Jika setiap menjalankan perintah di atas muncul peringatan `Failed to set locale. Fix your system.` Abaikan saja untuk saat ini.

Lihat hasilnya:

`snapper list-configs`

### Sesuaikan setelan konfigurasi

Untuk melihat setelan konfigurasi Snapper, jalankan:

`snapper -c root get-config`

Untuk melihat setelan semua konfigurasi:

`for config in `. /etc/sysconfig/snapper; echo $SNAPPER_CONFIGS`; do snapper -c $config get-config; done`

Sesuaikan konfigurasi yang dibutuhkan:

`for config in `. /etc/sysconfig/snapper; echo $SNAPPER_CONFIGS`; do snapper -c $config set-config TIMELINE_CREATE=no TIMELINE_LIMIT_DAILY=7 TIMELINE_LIMIT_HOURLY=6 TIMELINE_LIMIT_MONTHLY=0 TIMELINE_LIMIT_WEEKLY=4 TIMELINE_LIMIT_YEARLY=0; done`

`TIMELINE_CREATE` adalah opsi untuk membuat Snapshot setiap jam. Kita tidak ingin membuat Snapshot setiap jam, jadi opsi ini kita isi dengan `no`. Opsi `TIMELINE_LIMIT` adalah untuk membatasi jumlah Snapshot berdasarkan kalender. Anda bisa mengaturnya sesuai kebutuhan.

### Buat Snapshot setiap komputer dinyalakan

Untuk mengganti Snapshot timeline yang dibuat setiap jam, kita lebih baik membuat Snapshot yang dibuat setiap kali komputer dinyalakan.

Snapper menyediakan sebuah *service* dengan nama *snapper-boot.service* dan *snapper-boot.timer*, tapi secara *default* tidak aktif. Kita perlu memodifikasi *service* ini karena dia hanya membuat Snapshot untuk konfigurasi *root* saja. Untuk meyakinkan, periksa apakah *snapper-boot.timer* berjalan:

`systemctl status snapper-boot.timer`

Jika berjalan, matikan:

`systemctl disable snapper-boot.timer`

Salin file /usr/lib/systemd/system/snapper-boot.service ke /etc/systemd/system/ untuk dimodifikasi:

`cp -av /usr/lib/systemd/system/snapper-boot.service /etc/systemd/system/`

Hapus opsi `ExecStart` untuk diganti yang baru:

`sed -i '/ExecStart/d' /etc/systemd/system/snapper-boot.service`

Buat `ExecStart` baru:

`echo -e "ExecStart=/bin/bash -c 'for config in \`. /etc/sysconfig/snapper; echo \$SNAPPER_CONFIGS\`; do /usr/bin/snapper -c \$config create -c timeline; done'" >> /etc/systemd/system/snapper-boot.service`

Kita akan buat *snapper-boot.service* berjalan mandiri, tanpa harus dipicu oleh *snapper-boot.timer* seperti sebelum dimodifikasi. Untuk itu kita perlu menambahkan bagian `[Install]`:

`echo -e "\n[Install]\nWantedBy=multi-user.target" >> /etc/systemd/system/snapper-boot.service`

Lihat hasilnya dengan perintah `cat`:

`cat /etc/systemd/system/snapper-boot.service`

Hasilnya seperti ini:

```
[Unit]
Description=Take snapper snapshot of root on boot

[Service]
Type=oneshot
ExecStart=/bin/bash -c 'for config in `. /etc/sysconfig/snapper; echo $SNAPPER_CONFIGS`; do /usr/bin/snapper -c $config create -c timeline; done'

[Install]
WantedBy=multi-user.target
```

Aktifkan *service* tersebut:

`systemctl enable snapper-boot.service`

Periksa jika ada Snapshot yang sudah terlanjur dibuat oleh `snapper-timeline.timer`:

`snapper list -a`

Kita berharap hanya ada Snapshot 0 saja. Jika ada Snapshot lain, hapus:

`for config in `. /etc/sysconfig/snapper; echo $SNAPPER_CONFIGS`; do snapper -c $config delete --sync 1`

Perintah tersebut untuk menghapus Snapshot nomor 1. Jika ada Snapshot lain selain nomor 1, hapus juga dengan mengubah angkanya.

Jalankan ulang (*reboot*) komputer untuk membuat Snapshot pertama. Kita perlu membuat Snapshot saat komputer *booting* karena saat itu kita sedang tidak melakukan apa-apa di komputer, sehingga data yang diambil oleh Snapshot akan sempurna. Tidak akan ada yang terambil separuh karena sedang kita modifikasi misalnya.

### Buat titik *factory reset*

Setelah komputer dijalankan ulang, periksa apakah Snapshot berhasil dibuat:

`snapper list -a`

Jika berhasil, seharusnya ada Snapshot nomor 1 di semua konfigurasi dengan kolom `Cleanup` berisi `timeline`. Modifikasi Snapshot tersebut supaya tidak terhapus:

`for config in `. /etc/sysconfig/snapper; echo $SNAPPER_CONFIGS`; do snapper -c $config modify -c '' -d 'factory reset' -u 'reset=yes' 1`

Periksa hasilnya:

`snapper list -a`

Jika berhasil, kolom `Cleanup` berubah menjadi kosong, kolom `Description` menjadi `factory reset` dan kolom `Userdata` menjadi `reset=yes`.

Selesai. Proses selanjutnya Anda tinggal memasang **Desktop Environment**/**Window Manager** dan **Display Manager** serta aplikasi-aplikasi lainnya untuk digunakan sehari-hari.

## Cara melakukan *factory reset*

Untuk melakukan *factory reset*, Anda perlu *boot* ke Kernel pertama (Kernel yang dipasang saat instalasi openSUSE) dengan memilih opsi **Advanced options for openSUSE Leap/Tumbleweed** pada tampilan **Grub2**. Setelah opsi tersebut dipilih dengan menekan **Enter**, akan ada daftar Kernel yang terpasang. Arahkan pada pilihan Kernel paling bawah (tanpa tulisan *recovery mode*), lalu tekan **e** pada keyboard untuk mengubah parameternya. Arahkan ke teks bertuliskan `linuxefi` atau `linux`, tekan tombol **End** pada keyboard untuk mengarahkan kursor ke ujung teks. Tambahkan spasi dan angka **3**, lalu tekan **F10**.

Ini akan membawa Anda ke *Virtual Console* (CLI). Login sebagai root, lalu jalankan:

`for config in `. /etc/sysconfig/snapper; echo $SNAPPER_CONFIGS`; do snapper -c $config undochange 1..0; done`

Reboot.

## Mengembalikan perubahan tanpa *factory reset*

Service `snapper-boot.service` yang tadi kita modifikasi akan membuat Snapshot setiap kali komputer dijalankan. Ini berguna ketika kita ingin mengembalikan perubahan tanpa harus melakukan *factory reset*. Karena jika melakukan *factory reset*, Anda harus memulai lagi dari awal memasang **Desktop Environment**/**Window Manager** dan aplikasi-aplikasi lainnya.

Misalnya jika Anda mengalami *error* di komputer, cukup *reboot* dan masuk ke *Virtual Console* seperti pada proses akan melakukan *factory reset* di atas. Lalu jalankan `snapper undochange` ke nomor Snapshot sebelum *error* terjadi, misalnya:

`for config in `. /etc/sysconfig/snapper; echo $SNAPPER_CONFIGS`; do snapper -c $config undochange 1234..0; done`

Akan berguna juga jika kita ingin mencoba *software*, tapi ternyata kita tidak puas dengan *software* tersebut. Kita bisa meresetnya ke Snapshot sebelum *software* tersebut dipasang.

## Pastikan Snapshot tetap serasi

Pastikan Anda rutin memeriksa nomor Snapshot supaya tetap sama di semua konfigurasi dengan:

`snapper list -a`

Jika ada salah satu konfigurasi Snapper yang nomor Snapshot-nya tidak sama dengan konfigurasi yang lain, buat Snapshot baru supaya jadi sama:

`snapper -c <nama_konfigurasi> create -c timeline`

## Peringatan!

Karena *subvolume* /home dimasukkan ke daftar konfigurasi Snapper, jika kita melakukan *factory reset*, semua data yang ada di sana akan ikut hilang. Jadi disarankan untuk membuat partisi khusus untuk menyimpan data-data penting seperti halnya pengguna Windows biasa menyimpan data di *drive* D, E, F, dan seterusnya. Biarkan hanya file-file konfigurasi saja yang ada di direktori home atau data-data sementara/tidak penting yang Anda tidak akan menyesal kehilangannya.

Atau Anda bisa melakukan reset dengan mengecualikan konfigurasi *home* dengan perintah berikut:

`for config in `. /etc/sysconfig/snapper; echo $SNAPPER_CONFIGS | sed 's/ home//'`; do snapper -c $config undochange 1..0; done`

Dengan resiko konfigurasi-konfigurasi dari *software* yang direset yang berada di direktori home tidak akan ikut terhapus yang mungkin akan menyebabkan konflik dengan konfigurasi baru dari *software* yang dipasang kemudian. Seperti jika Anda mengubah Desktop Environment dengan Desktop Environment yang lain.

---

Tulisan ini bisa dibaca juga di: [https://kikisyahadat.github.io/2020/09/03/membuat-fitur-factory-reset.html](https://kikisyahadat.github.io/2020/09/03/membuat-fitur-factory-reset.html)