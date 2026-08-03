---
title: "Mengaktifkan Fitur Usap dengan 3 Jari pada Touchpad di openSUSE"
date: "2018-03-11"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Saat ini saya adalah pengguna dual boot untuk Mac dan openSUSE. Perlahan namun pasti saya akan menggunakan openSUSE ini sebagai sistem operasi utama saya. Secara nama dan kualitas, Mac memang sudah tidak diragukan lagi, fitur yang ada pun sangat lengkap, dari segi perangkat keras dan desain lapto..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Saat ini saya adalah pengguna dual boot untuk Mac dan openSUSE. Perlahan namun pasti saya akan menggunakan openSUSE ini sebagai sistem operasi utama saya. Secara nama dan kualitas, Mac memang sudah tidak diragukan lagi, fitur yang ada pun sangat lengkap, dari segi perangkat keras dan desain laptop yang dibuat sangatlah keren menurut saya. Salah satunya adalah kualitas touchpad yang sangat enak dan lembut ketika digunakan.

Touchpad yang lembut ini juga sudah dilengkapi dengan fitur mengusap touchpad dengan menggunkan 3 jari (Swipe 3 Fingers) dan cubit (pinch) lewat perangkat lunaknya agar pengguna mudah dan nyaman menggunakan sistem operasi mereka. Fitur tersebut sering saya gunakan dan sangat membantu mempermudah pekerjaan.

Fitur yang seringkali saya gunakan adalah :

1. Mengusap layar ke atas (swipe up) untuk melihat semua jendela aplikasi yang terbuka.
2. Mengusap layar ke bawah (swipe down) untuk melihat semua jendela aplikasi yang saat ini sedang dibuka.
3. Mengusap layar ke kiri (swipe left) untuk berpindah ke desktop sebelumnya.
4. Mengusap layar ke kanan (swipe right) untuk berpindah ke desktop selanjutnya.
5. Mencubit layar keatas (pinch out) untuk melihat desktop.

Namun, setelah saya memasang openSUSE diatas MacBook ini, fitur tersebut belum tersedia secara bawaan setelah instalasi. Jadi, buat saya merupakan hal yang *mubadzir* jika tidak bisa digunakan dan toh fitur tersebut sangat membantu pekerjaan. Jadi saya memutuskan untuk mencari cara supaya fitur ini juga bisa aktif di openSUSE yang saya gunakan.

Ada beberapa aplikasi yang saya coba, pertama yaitu *Touchegg.* Aplikasi ini secara bawaan sudah ada di repo openSUSE resmi. Instalasinya mudah dan sudah dilengkapi dengan GUI, hanya saja saya tidak berhasil memasangnya dikarenakan bentrok dengan driver ***libinput*** yang sudah terpasang di openSUSE. Jika mau menggunakan harus menonaktifkan beberapa fitur ***libinput*** yang digunakan.

Alhasil, setelah browsing sana-sini semesta berpihak kepada saya *(cieilah).* Fitur tersebut dapat dengan mudah diaktifkan dengan [libinput-gesture](https://github.com/bulletmark/libinput-gestures).

libinput-gesture merupakan utilitas yang membaca gesture(sentuhan) dari touchpad yang Anda gunakan dan memetakan sentuhan tersebut kedalam file konfigurasi yang dibuat. Nah, setiap sentuhan tersebut dijembatani oleh perintah aplikasi yang bernama ***xdotool***. Apalagi ***xdotool***? xdotool ini berfungsi memetakan pintasan(shortcut) papan tik yang biasa digunakan kedalam perintah shell.

Jadi, langsung kita mulai saja tahapan memasangnya …

## Langkah-langkah

Pasang terlebih dahulu dependensinya, yang dibutuhkan yaitu* **libinput-tools** * dan ***xdotool*** :

```bash
sudo zypper in libinput-tools xdotool
```

Kemudian masukkan user Anda ke grup input :

```bash
sudo gpasswd -a $USER input
```

Selanjutnya, clone repo github diatas dan lakukan compile :

```bash
git clone https://github.com/bulletmark/libinput-gestures.git
cd libinput-gestures
sudo make install
```

Pastikan tidak menemui error saat compile, jika tidak ada error bisa dilanjut dengan membuat konfigurasi gesture yang kita inginkan, dalam hal ini saya akan membuat gesture sesuai dengan info diatas.

Secara bawaan, konfigurasi libinput-gesture berada di direktori **/etc/libinput-gestures.conf. **Namun kita dapat membuat secar kustom sesuai dengan yang kita inginkan pada direktori **~/.config/libinput-gestures.conf**. Oke, silakan buat file tersebut dan isi seperti berikut :

```
# 1. Menampilkan semua jendela aplikasi yang digunakan
gesture swipe up        xdotool key ctrl+F9

# 2. Menampilkan semua jendela aplikasi yang saat ini digunakan
gesture swipe down      xdotool key ctrl+F7

# 3. Menampilkan desktop
gesture pinch out xdotool key ctrl+F12

# 4. Geser ke desktop sebelumnya
gesture swipe left      xdotool key ctrl+F5

# 5. Geser ke desktop selanjutnya
gesture swipe right     xdotool key ctrl+F6
```

Darimana pintasan tersebut tahunya? kok ada **ctrl+F6**, **ctrl+F12** dan segala macem. Tenang, jika Anda menggunakan KDE, Anda dapat melihat tombol kombinasi pintasan tersebut pada **Global Shortcut** **KWin**/**Plasma** di **Configure Desktop**.

![Screenshot_20180311_234435](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/mengaktifkan-fitur-usap-dengan-3-jari-pada-touchpad-di-opensuse/Screenshot_20180311_234435-1024x615.png)

Untuk konfigurasi nomor 1, 2 dan 3 biasanya sudah tersedia dari bawaan KDE. Namun untuk konfigurasi nomor 5 Anda harus memetakan dan menyesuaikan terlebih dahulu tombol pintasannya. Buat pintasan pada menu (Switch to Next Desktop & Switch to Previous Desktop) seperti berikut :

![Screenshot_20180311_234505](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/mengaktifkan-fitur-usap-dengan-3-jari-pada-touchpad-di-opensuse/Screenshot_20180311_234505.png)

Bagaimana untuk yang menggunakan GNOME?, saya kebetulan kurang tahu jika menggunakan GNOME, mungkin bisa disesuaikan dengan yang ada.

Jika sudah, jalankan libinput-gesture nya :

```bash
libinput-gestures-setup start
libinput-gestures-setup autostart
```

Selesai, hidupkan ulang PC Anda. Dan cobalah menggunakan fitur yang telah dibuat :-).

Semoga bermanfaat untuk teman-teman :-).