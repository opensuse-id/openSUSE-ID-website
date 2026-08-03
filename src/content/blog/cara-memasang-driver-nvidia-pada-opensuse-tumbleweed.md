---
title: "Cara Memasang Driver NVIDIA pada OpenSUSE Tumbleweed"
date: "2019-10-28"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Di postingan kali ini kita akan mencoba untuk memasang driver Nvidia pada Opensuse Tumbleweed. Pada contoh kali ini saya sudah mengetesnya di NVIDIA GeForce GTX 1050 Ti. Berikut langkah-langkah dan cara mengeceknya. Cek apakah laptop anda sudah menggunakan Nvidia sebagai Graphics default di lapto..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Di postingan kali ini kita akan mencoba untuk memasang driver Nvidia pada Opensuse Tumbleweed. Pada contoh kali ini saya sudah mengetesnya di NVIDIA GeForce GTX 1050 Ti.

Berikut langkah-langkah dan cara mengeceknya.

* Cek apakah laptop anda sudah menggunakan Nvidia sebagai Graphics default di laptop anda dengan mengeceknya di **Settings -> Details** lalu lihat dikolom **Graphics** apakah sudah menggunakan Nvidia atau belum. Jika sudah maka anda tidak perlu melanjutkan langkah-langkah dipostingan ini dan langsung bisa membuka **NVIDIA X Server Settings**, dan jika belum maka silahkan ikuti langkah-langkah di bawah ini.

* Cek Hardware Nvidia anda dengan mengetikan perintah berikut :

```
sudo lspci -v | grep VGA
```

* Tambahkan repository Nvidia.

1. Buka Yast Software Repositories
2. Klik tombol Add di pojok kiri bawah
3. Pilih Community Repositories
4. Lalu pilih NVIDIA Graphics dan klik Oke

* Install driver NVIDIA sesuai dengan Model Nvidia anda

1. Buka Yast Software Management
2. Pilih Search
3. Ketikan NVIDIA di kolom Search
4. Lalu pilih driver yang sesuai dengan versi NVIDIA anda

Gambar di bawah adalah settingan Driver untuk VGA saya yaitu NVIDIA GeForce GTX 1050 Ti.

![Contoh Setting Driver Nvidia (Rafael)](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/cara-memasang-driver-nvidia-pada-opensuse-tumbleweed/IMG20191028094919-1440x1080.jpg)

* Mungkin ada beberapa driver NVIDIA yang masih belum tersedia di repository tersebut namun tenang saja kita masih bisa menginstallnya dengan cara mendownload nya di [https://www.nvidia.com/Download/index.aspx?lang=en-us](https://www.nvidia.com/Download/index.aspx?lang=en-us) lalu menginstallnya dengan manual.
* Di beberapa masalah seperti saya kita harus mendownload **nvidia-settings** dengan cara seperti dibawah ini.

```
1. Ketikan sudo zypper in nvidia-settings
2. sudo prime-select nvidia
```

Sekian postingan saya tentang “Cara Memasang Driver NVIDIA pada OpenSUSE Tumbleweed “.

Selamat Mencoba, keep spirit.