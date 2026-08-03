---
title: "Membuat Breeze lebih berwarna"
date: "2018-03-11"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Sejak hadir Plasma 5, Breeze menggantikan Oxygen. Secara keseluruhan hampir semua aspek saya suka. Hanya satu yang saya kurang sreg, Window Decoration. Warna border samping (kanan & kiri) dan bawah yang sewarna dengan warna jendela kurang terasa enak dipandang menurut saya. Saya lebih suka jika s..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Sejak hadir Plasma 5, Breeze menggantikan Oxygen. Secara keseluruhan hampir semua aspek saya suka. Hanya satu yang saya kurang sreg, *Window Decoration*. Warna border samping (kanan & kiri) dan bawah yang sewarna dengan warna jendela kurang terasa enak dipandang menurut saya. Saya lebih suka jika sisi-sisi *Window Decoration* ini sewarna dengan *Title Bar*, bukan dengan warna jendela.

Karena alasan ini, saya sering menggantinya dengan *Window Decoration* lain, seperti [Freeze](https://store.kde.org/p/1002663/) misalnya. Tapi **Freeze** ini menggunakan *engine* **Aurorae** yang sudah sangat lama ada di KDE. Saya khawatir suatu saat nanti *engine* ini akan *deprecated*.

Sampai kemudian saya kembali mencoba menggunakan **Breeze** dengan sedikit modifikasi supaya warnanya sesuai dengan yang saya inginkan. Jika Anda ingin mencoba juga, begini caranya. Buka berkas **kdeglobals** yang berada di direktori **~/.config**. Cari teks berikut di baris paling bawah;

```
[WM]
activeBackground=71,80,87
activeBlend=255,255,255
activeForeground=239,240,241
inactiveBackground=239,240,241
inactiveBlend=75,71,67
inactiveForeground=189,195,199
```

Tambahkan `frame` dan `inactiveFrame` dengan warna yang sama dengan `activeBackground` dan `inactiveBackground` menjadi seperti ini;

```
[WM]
activeBackground=71,80,87
activeBlend=255,255,255
activeForeground=239,240,241
frame=71,80,87
inactiveBackground=239,240,241
inactiveBlend=75,71,67
inactiveForeground=189,195,199
inactiveFrame=239,240,241
```

Setelah menambahkan `frame` dan `inactiveFrame`, simpan berkas tersebut. Biasanya begitu Anda menyimpan perubahan, warna sisi-sisi *Window Decoration* akan langsung berubah mengikuti pengaturan baru.

Dan akhirnya sekarang saya bisa menggunakan dan menikmati tema **Breeze** sepenuhnya.
