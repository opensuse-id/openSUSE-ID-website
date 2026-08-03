---
title: "Mengarahkan Domain dengan ssl ke Domain Lain pada Nginx"
date: "2018-01-18"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Tempat saya bekerja mempunyai domain co.id (domain_lama) yang sudah lama sekali dipergunakan. Ketika domain .id mulai diperkenalkan, saya membeli domain .id (domain_baru) untuk perusahaan tempat saya bekerja. Masalahnya saya tidak ingin memaintain kedua domain tersebut. Apa yang saya lakukan adal..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/mengarahkan-domain-dengan-ssl-ke-domain-lain-pada-nginx/nginx-1.png"
---

Tempat saya bekerja mempunyai domain co.id (domain\_lama) yang sudah lama sekali dipergunakan. Ketika domain .id mulai diperkenalkan, saya membeli domain .id (domain\_baru) untuk perusahaan tempat saya bekerja. Masalahnya saya tidak ingin memaintain kedua domain tersebut. Apa yang saya lakukan adalah me-redirect domain .id ke halaman .co.id.  
Hal ini saya lakukan hanya untuk alamat website saja, tidak untuk service yang lain.

Cara mengkonfigurasi pada nginx sangat sederhana.  
1. Buat sertifikat ssl untuk domain .id  
2. Buat konfigurasi nginx utk domain .id  
3. Isi dengan konfigurasi seperti di bawah
```
server {
listen 443 ssl;
ssl\_certificate /path/to/domain.id/domain\_id.cert;
ssl\_certificate\_key /path/to/domain.id/domain\_id.key;
server\_name www.domain.id domain.id;
return 301 https://www.domain.co.id$request\_uri;
}
server {
listen 443 ssl;
server\_name www.domain.co.id domain.co.id;
ssl\_certificate /path/to/domain.co.id/domain\_co\_id.cert;
ssl\_certificate\_key /path/to/domain.co.id/domain\_co\_id.key;
[......] #konfigurasi\_lain
}
```
Jangan lupa anda harus membuat A record pada DNS domain.id untuk domain.id dan www.domain.id diarahkan ke alamat IP yang sama dengan IP www.domain.co.id dan domain.co.id  
Sekarang kalau kita mengakses domain.id maka akan otomatis akan diarahkan ke domain.co.id.

Dalam kasus saya, silakan anda coba akses [https://nsi.id](https://nsi.id/) akan menghasilkan halaman yang sama dengan [https://nsi.co.id](https://www.nsi.co.id/)

Semoga bermanfaat.  
Have fun.