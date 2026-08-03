---
title: "Membersihkan Snapshot yang tertinggal"
date: "2020-07-29"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Pada dasarnya Snapshot yang dibuat oleh Snapper akan otomatis dihapus oleh snapper-cleanup.service jika sudah waktunya terhapus sesuai dengan konfigurasi yang ada di /etc/snapper/configs (atau dengan perintah su -c “snapper -c root get-config”). Namun adakalanya Snapper gagal menghapus satu atau ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/membersihkan-snapshot-yang-tertinggal/snapper.png"
---

Pada dasarnya Snapshot yang dibuat oleh Snapper akan otomatis dihapus oleh *snapper-cleanup.service* jika sudah waktunya terhapus sesuai dengan konfigurasi yang ada di */etc/snapper/configs* (atau dengan perintah `su -c "snapper -c root get-config"`). Namun adakalanya Snapper gagal menghapus satu atau beberapa Snapshot yang saya sendiri masih belum paham kenapa bisa gagal terhapus.

Jika kita tidak menghapus Snapshot yang gagal terhapus tersebut lama-kelamaan akan membuat ruang penyimpanan (HDD/SSD) semakin terkikis habis karena semakin banyak selisih data yang tersimpan antara Snapshot yang gagal terhapus dengan kondisi terkini.

## Mendeteksi Snapshot yang gagal terhapus

Untuk mencaritahu apakah ada Snapshot yang gagal terhapus kita bisa membandingkan Snapshot yang terdata oleh Snapper dengan jumlah Snapshot yang ada di tempat Snapshot itu berada.

### Melihat data Snapshot dengan Snapper

Untuk melihat daftar Snapshot yang terdata oleh Snapper, kita bisa menjalankan perintah `su -c "snapper list"`. Atau jika Anda mempunyai lebih dari satu konfigurasi Snapper (seperti saya), tambahkan opsi `-a` untuk menampilkan daftar Snapshot dari semua konfigurasi, `su -c "snapper list -a"`.

### Melihat jumlah Snapshot

Untuk melihat jumlah sebenarnya dari Snapshot kita bisa menggunakan perintah standar Linux, yaitu `su -c "ls /.snapshots"`. Untuk Snapshot yang berada di konfigurasi home (jika Anda punya), jalankan `su -c "ls /home/.snapshots"` dan seterusnya (bisa dilihat dengan perintah `su -c "snapper list-configs"`).

Perintah `ls` harus dijalankan dengan akses root karena direktori tersebut hanya bisa dilihat oleh root.

### Bandingkan

Bandingkan jumlah Snapshot yang muncul dari perintah `snapper` dan `ls`. Jika sama berarti aman. Jika jumlah dari perintah `ls` lebih banyak, berarti ada Snapshot yang tidak terdata oleh Snapper.

Perhatikan/cari nomor Snapshot yang ada di perintah `ls` tapi tidak ada di perintah `snapper`. Snapshot inilah yang seharusnya sudah terhapus.

## Menghapus Snapshot

Ada tiga cara untuk menghapus Snapshot yang tidak kita inginkan ini, yaitu:

1. Cara barbar, dengan perintah `rm -rf`.
2. Cara yang cukup bisa diterima, dengan perintah `btrfs subvolume delete`.
3. Cara elegan, yaitu dengan mengembalikan Snapshot tersebut ke Snapper untuk kemudian dihapus secara alami.

### Backup data dan siapkan rescue system

Sebelum menjalankan proses penghapusan sebaiknya backup semua data penting ke partisi lain atau ke penyimpanan eksternal untuk mengantisipasi kerusakan sistem, terutama jika Anda memilih cara pertama dalam menghapus Snapshot.

Siapkan juga installer di *thumb drive*/*flashdisk* atau DVD untuk persiapan install ulang jika Anda menggunakan cara pertama, atau persiapan *fsck* (`btrfs check`) *filesystem* jika Anda menggunakan cara kedua. Cara kedua bisa dikategorikan aman, hanya saja menghapus Snapshot dengan cara ini kadang membuat metadata menjadi tidak klop yang membuat Btrfs menjadi *read-only* sebagai proteksi menghindari kehilangan data. Memperbaiki *filesystem* yang *read-only* juga bisa dilakukan dengan *live system* sebagai alternatif jika Anda sudah tidak memiliki ISO installer.

### Cara pertama, rm -rf

1. Cari tahu subvolid dari Snapshot yang akan dihapus dengan perintah `su -c "btrfs subvol list /" | grep <nomor_snapshot>`. Ganti `<nomor_snapshot>` dengan nomor Snapshot yang akan dihapus. Perintah ini akan menampilkan keluaran: `ID <subvolid> gen <dan_seterusnya>`.
2. Kaitkan/*mount* *subvolume* di mana Snapshot yang akan dihapus berada ke sebuah direktori (biasanya /mnt) dengan perintah `su -c "mount -o subvolid=<subvolid_dari_perintah_1> /dev/sdXY /mnt"`, di mana `sdXY` adalah partisi tempat Snapshot berada, misal `/dev/sda2`.
3. Cari tahu lokasi Snapshot yang akan dihapus yang berada di /mnt dengan perintah `su -c "btrfs subvol list /mnt" | grep <nomor_snapshot>`. Ganti `<nomor_snapshot>` dengan nomor Snapshot yang akan dihapus.
4. Hapus Snapshot tersebut dengan perintah `su -c "rm -rfv /mnt/<nomor_snapshot>"`. Ganti `<nomor_snapshot>` dengan nomor Snapshot yang akan dihapus.
5. Lepaskan kaitan/*unmount* *subvolume* dengan perintah `su -c "umount /mnt"`.

Coba jalankan ulang komputer. Jika berjalan normal (tidak kernel panik atau kehilangan *root filesystem*) atau tidak menjadi *read-only* berarti aman dan Anda tidak salah hapus *subvolume.* Lanjutkan aktivitas Anda.

### Cara kedua, btrfs subvol delete

Jalankan langkah 1 hingga 3 dari cara pertama. Lalu:

* Hapus Snapshot tersebut dengan perintah `su -c "btrfs subvol delete /mnt/<nomor_snapshot>/snapshot"`. Ganti `<nomor_snapshot>` dengan nomor Snapshot yang akan dihapus.<br>
Lanjutkan ke langkah 4 dan 5 dari cara pertama.

Coba jalankan ulang komputer. Jika berjalan normal (tidak menjadi *read-only*) berarti aman. Lanjutkan aktivitas Anda.

### Cara ketiga, kembalikan Snapshot ke Snapper

Tidak terdatanya Snapshot oleh Snapper biasanya karena *subvolume* `/.snapshots/<nomor_snaphot>/snapshot` masih ada (tidak terhapus), tapi *file* `/.snapshots/<nomor_snapshot>/info.xml` hilang atau kosong (tidak ada isinya).

Untuk mengembalikan Snapshot ke Snapper kita harus mengembalikan *file* `info.xml` ke kondisi seharusnya. Caranya dengan menyalin *file* `info.xml` dari Snapshot yang lebih baru ke Snapshot yang tidak terdata Snapper lalu mengubah isinya supaya sesuai dengan Snapshot tersebut.

Kita umpamakan Snapshot yang tidak terdata adalah nomor 567 dan Snapshot yang lebih baru adalah nomor 1234 (anggap saja Snapshot nomor 568 sampai nomor 1233 sudah terhapus).

1. Salin *file* `info.xml` dari Snapshot 1234 ke Snapshot 567 dengan perintah `su -c "cp /.snapshots/1234/info.xml /.snapshots/567/"`.
2. Ubah nomor Snapshot di `info.xml` yang baru saja disalin supaya sesuai dengan Snapshot 567 dengan perintah `su -c "sed -i 's/1234/567/' /.snapshots/567/info.xml"`. Ubah juga tanggalnya jika perlu, tapi ini hanya opsional saja. Jika Anda tidak mengerti dengan yang saya maksud, baca file tersebut dengan perintah `su -c "cat /.snapshots/567/info.xml"`, terdapat informasi tanggal di sana.
3. Biarkan sistem menghapus Snapshot tersebut secara alami pada waktunya. Jika Anda tidak sabar ingin segera menghapusnya, jalankan *service* `snapper-cleanup` dengan perintah `su -c "systemctl start snapper-cleanup.service"`. Atau bisa langsung menggunakan perintah `snapper`, yaitu `su -c "snapper -c root delete 567"`, bisa juga ditambah opsi `--sync` supaya ruang penyimpanan segera dikembalikan, `su -c "snapper -c root delete --sync 567"`.

## Hapus Snapshot yang berada di konfigurasi lain

Jika Anda punya lebih dari satu konfigurasi Snapper (seperti saya) dan juga ada Snapshot yang gagal terhapus, ulangi cara di atas untuk konfigurasi lain. Yang membedakan hanya lokasi di mana direktori .snapshots berada. Anda bisa memeriksanya dengan perintah `su -c "snapper list-configs"`, di sana ditunjukkan di mana lokasi subvolume berada, tinggal ditambahkan *.snapshots* di belakangnya. Misal untuk *subvolume* `/home` lokasi *.snapshots* berada di `/home/.snapshots`, dan seterusnya.

---

Tulisan ini bisa dibaca juga di [https://kikisyahadat.github.io/2020/07/29/membersihkan-snapshot-yang-tertinggal.html](https://kikisyahadat.github.io/2020/07/29/membersihkan-snapshot-yang-tertinggal.html)