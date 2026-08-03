---
title: "Menambah repositori Snapshot bagi pengguna Tumbleweed"
date: "2018-09-18"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Tumbleweed adalah distribusi rolling dari openSUSE. Seperti distribusi rolling lainnya, perubahan di Tumbleweed juga sangat cepat. Dan seperti distribusi rolling pada umumnya, ketika ingin memperbarui paket-paket yang sudah terpasang, kita harus memperbarui sistem secara keseluruhan untuk menghin..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Tumbleweed adalah distribusi *rolling* dari openSUSE. Seperti distribusi *rolling* lainnya, perubahan di Tumbleweed juga sangat cepat. Dan seperti distribusi *rolling* pada umumnya, ketika ingin memperbarui paket-paket yang sudah terpasang, kita harus memperbarui sistem secara keseluruhan untuk menghindari ketidakstabilan sistem akibat dari perbedaan versi librari yang terpasang. Begitu juga ketika kita ingin memasang suatu paket, kita perlu memperbarui terlebih dahulu paket-paket yang terpasang. Bagi pengguna dengan akses internet terbatas, ini adalah masalah. Karena setiap kali memperbarui sistem, akan diperlukan akses data hingga ratusan MB atau bahkan lebih dari 1 GB.

Untuk mengakali ini, kita bisa memanfaatkan projek [tumbleweed.boombatower.com](http://tumbleweed.boombatower.com/). Projek ini menyediakan repositori dari snapshot-snapshot yang telah dirilis untuk openSUSE Tumbleweed.

Cara resmi untuk memanfaatkan projek ini adalah dengan menggunakan `tumbleweed-cli`. Caranya, pasang paket `tumbleweed-cli` melalui **YaST** >> **Software Management** atau dengan perintah `zypper install tumbleweed-cli` sebagai *root*. Lalu jalankan perintah `tumbleweed init` untuk melakukan inisialisasi dan melakukan perubahan repositori ke arah repositori snapshot yang sedang kita gunakan. Untuk perintah-perintah manajemen snapshot lainnya bisa dilihat dengan perintah `tumbleweed --help`.

Tapi sayangnya cara di atas seringkali gagal saya lakukan. Ketika menjalankan perintah `tumbleweed init`, repositori tetap mengarah ke [download.opensuse.org](https://download.opensuse.org/). Sehingga akhirnya saya tidak menggunakan cara ini.

Cara alternatif adalah dengan menambahkan repositori snapshot secara langsung tanpa memanfaatkan `tumbleweed-cli`. Caranya, buka **YaST** >> **Software Repositories**, lalu klik **Add**. Centang pilihan **Specify URL…**, lalu klik **Next**. Isi kolom **Repository Name** dengan `openSUSE-Tumbleweed-Snapshot-Oss` atau apapun untuk membedakan dari repositori lain. Dan isi kolom **URL** dengan `http://download.tumbleweed.boombatower.com/(nomor-snapshot)/repo/oss/`. Ganti *(nomor-snapshot)* dengan versi Tumbleweed yang sedang digunakan, dengan format: tahun, bulan dan tanggal (YYYYMMDD) seperti yang tercantum di /etc/os-release, contoh yang saya gunakan saat ini **20180903**, lalu klik **Next**. Tunggu hingga selesai.

Tambahkan juga repositori Non Oss dengan cara yang sama seperti di atas, dengan **Repository Name** `openSUSE-Tumbleweed-Snapshot-Non-Oss` dan **URL** `http://download.tumbleweed.boombatower.com/(nomor-snapshot)/repo/non-oss/`. Setelah selesai menambahkan kedua repositori tersebut, matikan repositori Oss, Non Oss dan Update yang asli dengan menghilangkan centang pada bagian **Enable**, lalu tutup jendela **Software Repositories** dengan mengklik **OK**. Tutup **YaST**.

Setelah selesai menambahkan repositori snapshot dan mematikan repositori asli, kita bisa memasang paket baru dengan aman. Untuk memperbarui Tumbleweed ke versi terbaru atau yang lebih baru dari yang sedang digunakan saat ini, kita bisa mengubah **URL** repositori snapshot Oss dan Non Oss yang tadi kita tambahkan melalui **Software Repositories** dengan versi snapshot yang sudah dirilis oleh openSUSE. Untuk melihat versi terbaru atau versi mana saja yang tersedia, kita bisa membuka alamat [review.tumbleweed.boombatower.com](http://review.tumbleweed.boombatower.com/) atau [download.tumbleweed.boombatower.com](http://download.tumbleweed.boombatower.com/). Setelah **URL** repositori diubah, jalankan `zypper dup` sebagai *root* seperti biasa.

---

Update:

* Berdasarkan kabar dari web [openSUSE Release Tools](http://release-tools.opensuse.org/2018/09/18/Tumbleweed-Snapshots-Official.html), repositori **Snapshot** sekarang bisa diakses menggunakan alamat resmi [opensuse.org](https://download.opensuse.org/). Sehingga ketika menambahkan repositori **Snapshot Oss** dan **Snapshot Non Oss**, Anda bisa mengisi **URL** dengan `https://download.opensuse.org/history/(nomor-snapshot)/tumbleweed/repo/oss/` untuk **Oss** dan `https://download.opensuse.org/history/(nomor-snapshot)/tumbleweed/repo/non-oss/` untuk **Non Oss**.
* Berdasarkan kabar yang sama pula, kini kita juga bisa melihat versi snapshot yang tersedia di halaman [download.opensuse.org/history](https://download.opensuse.org/history/).