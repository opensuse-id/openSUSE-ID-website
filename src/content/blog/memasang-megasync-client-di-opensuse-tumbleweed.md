---
title: "Memasang MEGAsync client di openSUSE Tumbleweed"
date: "2017-10-06"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "MEGA adalah layanan cloud storage yang memberikan kapasitas penyimpanan data sebesar 50GB secara gratis. Layanan MEGA sama halnya dengan media penyimpanan online lainnya seperti: Google Drive, Dropbox, Mediafire, 4Shared dan lain-lain. Pasang MEGAsync client: Buat akun/daftar di https://mega.nz U..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-megasync-client-di-opensuse-tumbleweed/Screenshot_20171006_182035.png"
---

![Screenshot_20171006_182035.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-megasync-client-di-opensuse-tumbleweed/Screenshot_20171006_182035.png)

MEGA adalah layanan cloud storage yang memberikan kapasitas penyimpanan data sebesar 50GB secara gratis. Layanan MEGA sama halnya dengan media penyimpanan online lainnya seperti: Google Drive, Dropbox, Mediafire, 4Shared dan lain-lain.

Pasang MEGAsync client:

* Buat akun/daftar di [https://mega.nz](https://mega.nz/)
* Unduh aplikasi client disini [https://mega.nz/sync.](https://mega.nz/sync) Kemudian pilih distro linux dan arsitektur yang kita gunakan. Sebagai contoh saya menggunakan openSUSE Tumbleweed 64bit.
* Buka konsole Lalu tambahkan repository sebagai berikut: `sudo zyyper addrepo https://mega.nz/linux/MEGAsync/openSUSE\_Tumbleweed/ MEGAsync`
* Kemudian perbaharui daftar repository: `sudo zypper refresh`
* Masuk ke folder dimana aplikasi MEGAsync tersimpan contoh: “cd Downloads/” lalu enter.
* Lalu pasang MEGAsync client: `sudo zypper install megasync-openSUSE\_Tumbleweed.x86\_64.rpm`
* Jalankan aplikasi client jika sudah selesai terpasang.
* Pilih I have a MEGA account ![Screenshot_20171006_161833.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-megasync-client-di-opensuse-tumbleweed/Screenshot_20171006_161833.png)
* Masukkan email dan password yang telah kita daftar![Screenshot_20171006_162001.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-megasync-client-di-opensuse-tumbleweed/Screenshot_20171006_162001.png)
* Kemudian pilih salah satu Full sync atau Selective sync![megasync-ubuntu-3.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-megasync-client-di-opensuse-tumbleweed/megasync-ubuntu-3.png)
* Kemudian klik next hingga muncul jendela berikut, lalu klik Finish.![megasync-ubuntu-5.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-megasync-client-di-opensuse-tumbleweed/megasync-ubuntu-5.png)

Seperti tampilan gambar ini, setelah proses selesai.

![Screenshot_20171006_180303.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-megasync-client-di-opensuse-tumbleweed/Screenshot_20171006_180303.png)

Bagaimana mudah bukan? Selamat mencoba!
