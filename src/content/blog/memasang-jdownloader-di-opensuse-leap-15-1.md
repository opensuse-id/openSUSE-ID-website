---
title: "Memasang JDownloader di openSUSE Leap 15.1"
date: "2020-01-08"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Bagi yang terbiasa mengunduh file menggunakan download manager, mungkin banyak pilihan download manager yang dapat digunakan baik melalui ekstensi browser maupun melalui tools di konsole/terminal linux, beberapa alasan saya menggunakan download manager adalah agar dapat melakukan pause dan resume..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/memasang-jdownloader-di-opensuse-leap-15-1/jd1-dashboard.png"
---

![jd1-dashboard](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/memasang-jdownloader-di-opensuse-leap-15-1/jd1-dashboard.png)

Bagi yang terbiasa mengunduh file menggunakan download manager, mungkin banyak pilihan download manager yang dapat digunakan baik melalui ekstensi browser maupun melalui tools di konsole/terminal linux, beberapa alasan saya menggunakan download manager adalah agar dapat melakukan pause dan resume pada file yang di unduh.

pada tulisan ini saya akan memberikan sedikit panduan untuk memasang download manager berbaskasih komentar dan saranyais desktop yaitu JDownlader. JDownlader sendiri adalah tools download manager berbasis open source yang dapat di pasang di banyak platform salah satunya di Linux openSUSE, oke langsung saja buka konsole/terminal dan ketik perintah berikut

```
wget -c http://installer.jdownloader.org/JD2Setup_x64.sh
```

kemudian berikan executable pada file

```
chmod +x JD2Setup_x64.sh
```

lanjutkan proses pemasangan dengan mengetik perintah berikut

```
sh JD2Setup_x64.sh
```

dan lanjutkan intruksi yang tertera di layar  
![jd1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/memasang-jdownloader-di-opensuse-leap-15-1/jd1.png)

setelah selsai dapat langsung digunakan, jangan lupa untuk di integerasikan dengan ekstensi browser yang di pakai.

apabila ada kendala silahkan berikan komentar dan sarannya, sekian dan terimakasih.