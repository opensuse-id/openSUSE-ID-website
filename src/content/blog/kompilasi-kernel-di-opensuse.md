---
title: "Kompilasi Kernel di openSUSE"
date: "2018-05-31"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Jaman sekarang, saat distribusi Linux seperti openSUSE dan Ubuntu sudah berkembang pesat, kompilasi kernel secara mandiri hampir sudah tidak diperlukan lagi. Kernel bawaan distribusi sudah just work, tanpa perlu bersusah payah mengunduh kode sumber kernel, melakukan konfigurasi serta melakukan ko..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/kompilasi-kernel-di-opensuse/Cuplikan-layar-dari-2018-05-31-05-57-55.png"
---

Jaman sekarang, saat distribusi Linux seperti openSUSE dan Ubuntu sudah berkembang pesat, kompilasi kernel secara mandiri hampir sudah tidak diperlukan lagi. Kernel bawaan distribusi sudah *just work*, tanpa perlu bersusah payah mengunduh kode sumber kernel, melakukan konfigurasi serta melakukan kompilasi yang membutuhkan waktu dan sumber daya komputer yang cukup banyak.

Namun, saya kemarin menemukan kendala dengan kernel bawaan dari openSUSE, baik Tumbleweed maupun Leap. Pada Tumbleweed, baterai laptop saya tidak dikenali. Sedangkan pada Leap 15, baterai sukses dikenali, namun saat diisi daya dari listrik, proses pengisian daya tidak dikenali.

Karena saya sibuk santai-santai, dan sekalian uji nyali, saya memutuskan untuk kompilasi kernel sendiri pada mesin GPD Pocket. Langkah-langkahnya sebagai berikut:

* Pasang perabotan yang dibutuhkan, seperti: `git`, `ncurses-devel`, `patterns-devel-base-devel_basis`, `libelf-devel`, `rpmbuild`, `bc`, `libopenssl-devel`

```
sudo zypper in git ncurses-devel patterns-devel-base-devel_basis libelf-devel rpmbuild bc libopenssl-devel
```

* Unduh kode sumber kernel, dalam kasus saya, saya mengunduh dari https://github.com/jwrdegoede/linux-sunxi.git. Jika Anda menggunakan paket data, pastikan saat meng-klon, gunakan opsi `--depth 1` biar hemat.

```
git clone https://github.com/jwrdegoede/linux-sunxi.git --depth 1
```

* Masuk ke direktori kode sumber kernel
* Jalankan `make rpm LOCALVERSION=-kompilasi-gpd-pocket`. Saya menambahkan opsi `-j4` untuk menggunakan 4 inti prosesor yang saya punya.

```
make -j4 rpm LOCALVERSION=-kompilasi-gpd-pocket
```

![Proses Kompilasi](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/kompilasi-kernel-di-opensuse/Cuplikan-layar-dari-2018-05-31-05-55-23.png)
*Proses Kompilasi*

![Htop](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/kompilasi-kernel-di-opensuse/Cuplikan-layar-dari-2018-05-31-05-57-55.png)
*Htop*

* Hasil kompilasi berada di folder `~/rpmbuild/RPMS/x86_64/`

```
kernel-4.17.0_rc6_kompilasi_gpd_pocket-1.x86_64.rpm
kernel-devel-4.17.0_rc6_kompilasi_gpd_pocket-1.x86_64.rpm
kernel-headers-4.17.0_rc6_kompilasi_gpd_pocket-1.x86_64.rpm
```

Dari paket rpm di atas, kita sudah bisa memasangnya di openSUSE. Selamat mencoba!