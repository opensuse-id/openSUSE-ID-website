---
title: "Menyembunyikan Tab Toolbar Firefox"
date: "2019-11-22"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Di Falkon, fitur untuk menyembunyikan Tab Toolbar ada dalam pengaturan. Yaitu pada bagian Tabs >> Tabs behaviour >> Hide tabs when there is only one tab. Saat pengaturan ini dicentang, Tab Toolbar akan menghilang jika hanya ada satu tab aktif. Jika ada lebih dari satu, maka otomatis Tab Toolbar a..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/menyembunyikan-tab-toolbar-firefox/firefox.png"
---

Di Falkon, fitur untuk menyembunyikan Tab Toolbar ada dalam pengaturan. Yaitu pada bagian **Tabs** >> **Tabs behaviour** >> **Hide tabs when there is only one tab**. Saat pengaturan ini dicentang, Tab Toolbar akan menghilang jika hanya ada satu tab aktif. Jika ada lebih dari satu, maka otomatis Tab Toolbar akan muncul.

Di Firefox, pengaturan ini tidak tersedia. Tapi kita bisa mengakalinya dengan membuat berkas pengaturan khusus.

Caranya, di folder profil Firefox, yang biasanya ada di `~/.mozilla/firefox/<nama_profil>`, buat sebuah folder dengan nama `chrome`. Buat sebuah berkas di dalam folder tersebut dengan nama `userChrome.css`. Isi berkas tersebut dengan:

```
#tabbrowser-tabs, #tabbrowser-tabs arrowscrollbox { min-height: 0 !important; }
#tabbrowser-tabs tab { height: var(--tab-min-height); }
#tabbrowser-tabs tab:first-of-type:last-of-type { display: none !important; }
```

Setelah file tersebut dibuat, buka Firefox. Ketik `about:config` di *address bar*, klik **I accept the risk!** Cari **toolkit.legacyUserProfileCustomizations.stylesheets** dan ubah **Value** menjadi **true** dengan cara klik kanan dan pilih **toggle**.

Setelah mengubah konfigurasi, buka **Menu** >> **Customize…** Pindahkan ikon **New Tab** ke tempat lain, lalu klik **Done**

Selesai, jalankan ulang Firefox untuk melihat hasilnya.