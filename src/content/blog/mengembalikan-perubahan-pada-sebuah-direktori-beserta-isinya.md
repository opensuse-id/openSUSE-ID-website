---
title: "Mengembalikan perubahan pada sebuah direktori beserta isinya"
date: "2017-12-30"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Salah satu kelebihan openSUSE dibanding distro lain adalah secara baku menggunakan BtrFS sebagai filesystem yang juga secara otomatis mengaktifkan fitur snapshot yang dikelola oleh Snapper. Semua ini sebenarnya bisa juga diterapkan di distro lain, tapi butuh pengetahuan lebih untuk melakukannya. ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/mengembalikan-perubahan-pada-sebuah-direktori-beserta-isinya/snapper_yast2_diff-250x250.png"
---

Salah satu kelebihan openSUSE dibanding distro lain adalah secara baku menggunakan BtrFS sebagai *filesystem* yang juga secara otomatis mengaktifkan fitur *snapshot* yang dikelola oleh **Snapper**. Semua ini sebenarnya bisa juga diterapkan di distro lain, tapi butuh pengetahuan lebih untuk melakukannya.

Seperti yang pernah saya tuliskan di artikel yang berjudul [Memanfaatkan fitur Rollback BtrFS](https://kiki-syahadat.blogspot.com/2016/12/memanfaatkan-fitur-rollback-btrfs.html), **Snapper** bisa digunakan untuk mengembalikan perubahan pada sistem operasi ke kondisi sebelumnya. Ini bermanfaat ketika kita melakukan miskonfigurasi. Kita bisa mengembalikannya ke kondisi sebelumnya meskipun miskonfigurasi tersebut menyebabkan kita tidak bisa masuk desktop.

Untuk mengembalikan perubahan, kita bisa melakukannya dengan perintah `sudo snapper undochange pre..post`. Nomor *pre* dan *post* bisa dilihat dengan perintah `sudo snapper list`. Untuk melihat perubahan apa saja yang terjadi, perintahnya adalah `sudo snapper diff pre..post /path/ke/file/yang/berubah`. Dan untuk mengembalikan perubahan pada satu file bisa dilakukan dengan perintah `sudo snapper undochange pre..post /path/ke/file/yang/ingin/dikembalikan`.

Tapi adakalanya kita ingin mengembalikan perubahan pada file-file di dalam sebuah direktori yang jumlahnya sangat banyak. Jika kita melakukannya dengan perintah `snapper`, kita harus mengetikkan nama file yang ingin dikembalikan satu per satu, karena `snapper` tidak bisa mengembalikan perubahan pada direktori beserta isinya secara rekursif.

Untuk melakukan ini sebenarnya kita bisa menggunakan modul **YaST** => **Snapper**. Tapi ketika saya mencobanya, jendela **Snapper** langsung tertutup sebelum proses selesai, sehingga proses pengembalian perubahan tidak tuntas. Mungkin karena waktu itu isi dari direktori yang diproses terlalu banyak, sehingga terlalu berat beban prosesnya. Untuk itu kita perlu membuat sebuah skrip ** yang bisa dijalankan melalui terminal untuk memudahkan pekerjaan ini.

Isi skripnya seperti berikut ini:

```
snapshot=$1
dir=$2
IFS="
"
file=$(sudo snapper status "${snapshot}..0" | grep "$dir" | cut -d' ' -f2-)
sudo snapper undochange "${snapshot}..0" $file
exit
```

Untuk menjalankannya kita ketikkan perintah berikut di terminal:

`/path/ke/skrip pre /path/ke/direktori/yang/ingin/dikembalikan`

Skrip tersebut berlaku untuk konfigurasi *snapper* yang berada di root. Jika Anda punya konfigurasi lain (bisa dicek dengan perintah `sudo snapper list-configs`), Anda bisa menambahkan variabel `config`, menjadi seperti berikut:

```
config=$1
snapshot=$2
dir=$3
IFS="
"
file=$(sudo snapper -c $config status "${snapshot}..0" | grep "$dir" | cut -d' ' -f2-)
sudo snapper -c $config undochange "${snapshot}..0" $file
exit
```

Dan menjalankannya dengan perintah `/path/ke/skrip root pre /path/ke/direktori/yang/ingin/dikembalikan`, untuk mengembalikan perubahan di root. Ganti `root` dengan `home` untuk konfigurasi home (sesuaikan dengan konfigurasi Anda).

Untuk mempermudah, simpan skrip tersebut di direktori **bin** yang berada di direktori `HOME`. Di openSUSE, direktori ini sudah masuk dalam *PATH environment*. Untuk memastikannya, Anda bisa menjalankan perintah `echo $PATH`.

Jika skrip berada di dalam direktori **bin**, perintah untuk menjalankannya akan menjadi lebih gampang:

`namaskrip pre /path/ke/direktori/yang/ingin/dikembalikan`

atau

`namaskrip root pre /path/ke/direktori/yang/ingin/dikembalikan`