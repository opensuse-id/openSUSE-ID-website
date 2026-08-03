---
title: "Membuat konfigurasi Snapper"
date: "2018-12-31"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "PERHATIAN: Tulisan ini hanya berlaku untuk openSUSE Leap 15.0 ke atas atau Tumbleweed saja. Karena sebagian fitur dalam tulisan ini tidak ada di versi sebelumnya. Jika kita memasang openSUSE dengan pilihan baku, menggunakan filesystem BtrFS, akan secara otomatis dibuatkan snapshot yang bisa dikel..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

**PERHATIAN**: Tulisan ini hanya berlaku untuk openSUSE Leap 15.0 ke atas atau Tumbleweed saja. Karena sebagian fitur dalam tulisan ini tidak ada di versi sebelumnya.

Jika kita memasang openSUSE dengan pilihan baku, menggunakan *filesystem* **BtrFS**, akan secara otomatis dibuatkan **snapshot** yang bisa dikelola oleh **Snapper**. Tapi snapshot yang dibuat hanya akan ada pada *root* saja dan tidak termasuk *subvolume* yang ada di dalamnya. Snapshot akan secara otomatis dibuat ketika kita membuka modul **YaST** atau memasang/menghapus paket dengan menggunakan perintah `zypper`.

Subvolume yang ada di dalam partisi root adalah:

* /home (jika tidak dipisah dari partisi root)
* /var
* /usr/local
* /tmp
* /srv
* /root
* /opt
* /boot/grub2/x86_64-efi
* /boot/grub2/i386-pc

Apapun isi yang berada di dalam direktori dari subvolume di atas tidak akan dimasukkan ke dalam snapshot yang dibuat, sehingga kita tidak bisa melakukan *rollback*/*undochange* terhadap konten yang berada di dalam subvolume tersebut.

Saya biasanya membuat konfigurasi Snapper untuk sebagian subvolume tersebut. Diantara yang saya buat adalah **/home** (karena saya tidak pernah memisahkan HOME dari root), **/var**, **/usr/local**, **/srv**, **/root** dan **/opt**.

Untuk membuat konfigurasi dari masing-masing subvolume, jalankan perintah-perintah berikut (semua perintah `su -c` di bawah bisa diganti dengan `sudo` dan menghilangkan tanda petik jika Anda memasang paket `sudo`):

`su -c "snapper -c home create-config /home"` (untuk subvolume /home jika tidak dipisah dari root)

`su -c "snapper -c var create-config /var"`

`su -c "snapper -c local create-config /usr/local"`

`su -c "snapper -c srv create-config /srv"`

`su -c "snapper -c su create-config /root"` (jangan menggunakan nama konfigurasi **root** karena sudah digunakan oleh konfigurasi bawaan untuk partisi root, jadi gunakan **su** atau nama lain saja)

`su -c "snapper -c opt create-config /opt"`

Setelah selesai membuat konfigurasi, kita bisa melihat semua konfigurasi dengan perintah:

`su -c "snapper list-configs"`

Secara baku, semua konfigurasi Snapper yang dibuat secara manual akan membuat snapshot berdasarkan waktu (timeline) dan akan dibuat setiap jam. Jadi, jika komputer kita hidup 24 jam, dalam sehari semalam Snapper akan membuat 24 snapshot di semua konfigurasi. Untuk saya ini terlalu banyak. Apalagi saat membuat dan menghapus snapshot, komputer kadang terasa berat. Sehingga saya memilih mematikan opsi ini dan menggantinya dengan membuat snapshot saat *boot*.

Untuk mematikan opsi baku ini, kita bisa menjalankan perintah berikut:

`su -c "snapper -c home set-config TIMELINE_CREATE=no"`

Jalankan perintah tersebut untuk konfigurasi lainnya.

Untuk melihat hasil perubah konfigurasi, jalankan:

`su -c "snapper -c home get-config"` (untuk konfigurasi home)

Untuk konfigurasi lain, ganti `home` dengan nama konfigurasi yang ingin diubah/dilihat (`root`, `local`, `var`, `srv`, `su` dan `opt`).

Dan untuk membuat snapshot pada saat *boot* secara otomatis, kita bisa memodifikasi dan mengaktifkan *service* **snapper-boot**. Caranya, salin *file* **snapper-boot.service** dan **snapper-boot.timer** dari `/usr/lib/systemd/system` ke `/etc/systemd/system` dengan perintah:

`su -c "cp /usr/lib/systemd/system/snapper-boot* /etc/systemd/system/"`

Lalu *edit* /etc/systemd/system/snapper-boot.service. Ubah `--cleanup-algorithm number` menjadi `--cleanup-algorithm timeline` dengan perintah:

`su -c "sed -i 's/cleanup-algorithm number/cleanup-algorithm timeline/' /etc/systemd/system/snapper-boot.service"`

Yang dilakukan di atas adalah untuk membuat snapshot saat *boot* untuk konfigurasi root. Untuk membuat hal yang sama untuk konfigurasi lain, salin **snapper-boot.service** dan **snapper-boot.timer** yang baru saja kita *edit* menjadi **snapper-boot-home.service** dan **snapper-boot-home.timer** (untuk konfigurasi home). Lalu ubah `--config root` di *file* **snapper-boot-home.service** menjadi `--config home` dengan perintah:

`su -c "sed -i 's/config root/config home/' /etc/systemd/system/snapper-boot-home.service"`

Ulangi proses di atas untuk konfigurasi **var**, **local**, **srv**, **su** dan **opt**. Ubah juga deskripsinya jika perlu.

Setelah selesai dengan proses di atas, sesuaikan opsi `TIMELINE_LIMIT` sesuai kebutuhan. Saya mengubahnya menjadi seperti ini:

* TIMELINE_LIMIT_DAILY=3-10
* TIMELINE_LIMIT_HOURLY=4-10
* TIMELINE_LIMIT_MONTHLY=0
* TIMELINE_LIMIT_WEEKLY=2-10
* TIMELINE_LIMIT_YEARLY=0

Atur semua konfigurasi tersebut dengan perintah:

`su -c "snapper -c root set-config TIMELINE_LIMIT_DAILY=3-10 TIMELINE_LIMIT_HOURLY=4-10 TIMELINE_LIMIT_MONTHLY=0 TIMELINE_LIMIT_WEEKLY=2-10 TIMELINE_LIMIT_YEARLY=0"`

Ulangi proses di atas untuk konfigurasi **home**, **var**, **local**, **srv**, **su** dan **opt**.

Setelah selesai dengan semua proses di atas, jalankan *service* untuk semua konfigurasi dengan perintah:

`su -c "systemctl enable snapper-boot.timer` (untuk konfigurasi root)

`su -c "systemctl enable snapper-boot-home.timer` (untuk konfigurasi home)

`su -c "systemctl enable snapper-boot-var.timer` (untuk konfigurasi var)

`su -c "systemctl enable snapper-boot-local.timer` (untuk konfigurasi local)

`su -c "systemctl enable snapper-boot-srv.timer` (untuk konfigurasi srv)

`su -c "systemctl enable snapper-boot-su.timer` (untuk konfigurasi su)

`su -c "systemctl enable snapper-boot-opt.timer` (untuk konfigurasi opt)

Setelah menjalankan semua *service*, setiap kali komputer dijalankan, Snapper akan membuat snapshot untuk semua konfigurasi. Ini akan membuat *booting* komputer terasa sedikit lebih lambat walaupun tidak akan terlalu jauh berbeda. Karena saat membuat snapshot, Snapper butuh waktu sekitar beberapa detik.

Membuat konfigurasi Snapper ini sangat berguna bagi kita yang suka coba-coba pada komputer. Ketika terjadi masalah karena coba-coba tersebut, atau kurang puas dengan hasil uji coba, kita bisa mengembalikan komputer ke kondisi semula. Juga sangat berguna bagi yang menginginkan fitur *factory reset* seperti yang saya buat di komputer saya. Tentang fitur *factory reset* ini akan saya tulis tahun depan