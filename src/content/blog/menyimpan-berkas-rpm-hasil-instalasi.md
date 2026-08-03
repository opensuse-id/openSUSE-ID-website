---
title: "Menyimpan berkas .rpm hasil instalasi"
date: "2019-03-19"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Secara baku, ketika kita memasang paket dari repositori, semua berkas .rpm akan diunduh ke /var/cache/zypp/packages, lalu akan dihapus setelah proses instalasi selesai. Tapi adakalanya kita ingin menyimpan berkas-berkas .rpm tersebut untuk dipasang di komputer lain. Atau ketika kita memasang pake..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/menyimpan-berkas-rpm-hasil-instalasi/yast-2.png"
---

Secara baku, ketika kita memasang paket dari repositori, semua berkas *.rpm* akan diunduh ke **/var/cache/zypp/packages**, lalu akan dihapus setelah proses instalasi selesai. Tapi adakalanya kita ingin menyimpan berkas-berkas *.rpm* tersebut untuk dipasang di komputer lain. Atau ketika kita memasang paket pembaruan, kita ingin menyimpannya supaya ketika paket pembaruan tersebut ternyata membawa *bug*, kita bisa memasang-ulang berkas *.rpm* lama untuk *downgrade*.

Supaya kita bisa menyimpan berkas-berkas *.rpm* hasil instalasi, kita bisa mengubah konfigurasinya melalui **YaST** atau dengan perintah `zypper`.

Untuk mengubahnya melalui **YaST**, kita bisa membuka modul **Software Repositories**. Lalu pilih salah satu repositori, kemudian centang opsi **Keep packages** di bagian bawah. Ulangi proses tersebut untuk repositori-repositori lainnya.

Jika melalui perintah `zypper`, bisa dilakukan dengan perintah `su -c "zypper modifyrepo --keep-packages <nama-repo>"`. Nama repositori bisa dicari dengan perintah `zypper repos`, lalu lihat pada kolom **Alias**. Perintah `zypper repos` bisa dilakukan dengan akun pengguna biasa, tidak harus *root* atau menggunakan `sudo`.

Setelah konfigurasi diubah, semua berkas *.rpm* akan tersimpan di **/var/cache/zypp/packages/<nama-repo>/<arsitektur>**.

Yang perlu diperhatikan bagi Anda yang membuat konfigurasi **Snapper** untuk *subvolume* **/var** seperti yang ditulis [di sini](https://kiki-syahadat.blogspot.com/2018/12/membuat-konfigurasi-snapper.html) adalah semua berkas tersebut akan dimasukkan ke dalam *snapshot* yang dibuat. Jadi kita perlu memindahkannya ke partisi lain dengan cara mengubah konfigurasi di **/etc/zypp/zypp.conf**. Cari opsi `# cachedir = /var/cache/zypp`, lalu hilangkan tanda pagar (#) dan ubah arahnya ke sebuah direktori di partisi lain yang akan digunakan untuk menyimpan berkas-berkas *.rpm* tersebut.