---
title: "Memasang DNSCrypt pada openSUSE Leap"
date: "2018-03-11"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Kenapa? Tulisan saya kemarin perihal memperbaiki LID laptop MacBook yang hidup kembali saat laptop ditutup ini memberikan banyak pencerahan, salah satu kendala yang dihadapi saat berselancar di dumay agar masalah tersebut teratasi adalah diblokir nya situs reddit.com oleh provider yang saya gunak..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-dnscrypt-pada-opensuse-leap/image_2018-03-10_23-27-49-1.png"
---

## Kenapa?

Tulisan saya kemarin perihal memperbaiki LID laptop MacBook yang hidup kembali saat laptop ditutup [ini](https://opensuse.id/blog/memperbaiki-layar-macbook-yang-hidup-kembali-saat-laptop-ditutup-pada-opensuse/) memberikan banyak pencerahan, salah satu kendala yang dihadapi saat berselancar di *dumay* agar masalah tersebut teratasi adalah diblokir nya situs [reddit.com](http://reddit.com/) oleh provider yang saya gunakan, sementara bisa jadi solusinya ada di forum tersebut.

Untuk mengatasinya sebenarnya banyak berbagai cara yang bisa dilakukan, bisa menggunakan VPN, SSH Tunneling, dll. Namun rasanya saya pikir tidak simple dan butuh tambahan server untuk VPN Server ataupun SSH Tunneling.

## Lalu?

![Ilustrasi DNSCrypt](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-dnscrypt-pada-opensuse-leap/image_2018-03-10_23-27-49-1.png)

Nah, salah satu yang solusi yang bisa dilakukan adalah memasang [DNSCrypt](https://en.wikipedia.org/wiki/DNSCrypt) pada mesin anda, DNSCrypt kurang lebih adalah sebuah protokol yang bisa melakukan enkripsi terhadap mesin anda dengan DNS resolver sehingga koneksi menjadi lebih aman. simple nya tugas si DNSCrypt ini mengelabui DNS resolver ISP yang kita gunakan.

Gak percaya? berikut ini hasil uji coba saya sebelum memasang DNSCrypt pada mesin, uji coba bisa dilakukan dengan membuka [dnsleaktest.com](http://dnsleaktest.com/) :

![Hasil uji coba sebelum DNSCrypt](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-dnscrypt-pada-opensuse-leap/image_2018-03-10_23-27-49.png)

Duh, ketauan kan provider yang saya gunakan (*tutupmuka). Ini bisa dibilang masih polos, keliatan jelas provider yang digunakan masih pake si t*i.

## Gimana?

Terus gimana caranya supaya saya bisa memasang si DNSCrypt ini di mesin saya?

Mudah, caranya bisa dengan cara memasang [Simple DNSCrypt Proxy](https://simplednscrypt.org/), prosesnya bisa dibilang mudah dan cepat, *sat set bas bes …* 😀

Saya denger si DNSCrypt ini sebenernya sudah agak lama, terakhir saya denger dan lihat saat Om Edwin pasang aplikasi ini di openSUSE Leap diacara openSUSE Translator ID Meetup di tahun 2016. Saya lihat kayaknya agak sulit, jadi saya males untuk pasang dan juga belum terlalu dibutuhkan saat itu. Saat itu masih versi 1.x

Akhirnya, ketika saya coba pasang ternyata DNSCrypt Proxy ini sudah memasuki versi ke 2.x dan memiliki arsitektur yang berbeda. Bedanya versi 1.x ditulis menggunakan C sementara di versi kedua ini ditulis dengan Go.

Jadi, langsung saja ..

## Langkah Demi Langkah

Pertama, Unduh DNSCrypt proxy pada tautan [berikut,](https://github.com/jedisct1/dnscrypt-proxy/releases) pilih versi x86_64 atau sesuaikan dengan arsitektur yang anda gunakan.

```
wget -c https://github.com/jedisct1/dnscrypt-proxy/releases/download/2.0.6/dnscrypt-proxy-linux_x86_64-2.0.6.tar.gz
tar -zxvf dnscrypt-proxy-linux_x86_64-2.0.6.tar.gz
sudo mv linux-x86_64 /opt/dnscrypt-proxy
```

Selanjutnya lakukan konfigurasi service untuk DNSCrypt

```
sudo mv /opt/dnscrypt-proxy/dnscrypt-proxy.* /etc/systemd/system/
```

Salin konfigurasi dnscrypt-proxy :

```
cp example-dnscrypt-proxy.toml dnscrypt-proxy.toml
```

Cari bagian `listen_addresses` dan ubah menjadi seperti berikut :

```
Sebelum :
listen_addresses = ['127.0.0.1:53', '[::1]:53']

Sesudah :
listen_addresses = ['127.0.0.2:53']
```

**Kenapa tidak menggunakan 127.0.0.1 ?**

Karena sudah digunakan oleh service avahi-daemon (saya belum tahu ini service buat apa :-D)

Edit file /etc/hosts pastikan ip 127.0.0.2 sudah mengarah ke localhost

```
127.0.0.1       localhost
127.0.0.2       localhost
```

Sampai disini konfigurasi selesai, jalankan service dnscrypt-proxy :

```
sudo systemctl enable dnscrypt-proxy
sudo systemctl start dnscrypt-proxy
```

Jangan lupa untuk mengarahkan DNS Server ke ip 127.0.0.2, jika anda menggunakan Network Manager bisa dikonfigurasikan pada panel yang ada, kurang lebih seperti berikut:

![Konfigurasi Network Manager](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-dnscrypt-pada-opensuse-leap/Screenshot_20180311_002510.png)

Atau kalau gak mau lama bisa langsung tempel di /etc/resolv.conf.

Ini hasil setelah dipasang DNSCrypt

![Hasil setelah dipasang DNSCrypt](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-dnscrypt-pada-opensuse-leap/Screenshot_20180310_231509.png)

Dan pemasangan selesai, selanjutnya anda tinggal menikmati berselancar di internet tanpa ada pemblokiran situs. Di artikel lain mungkin saya akan membahas terkait konfigurasi yang ada di DNSCrypt ini. Tapi itu lain cerita, kapan-kapan lah.

Demikian tutorial singkatnya, semoga bermanfaat!

**Eits iya, jangan sampai cara ini digunakan untuk membuka situs yang tidak baik ya :-P.**
