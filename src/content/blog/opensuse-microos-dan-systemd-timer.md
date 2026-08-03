---
title: "openSUSE MicroOS dan Systemd Timer"
date: "2019-11-05"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Beberapa waktu belakangan ini saya sedang mencoba openSUSE MicroOS dan Kubic. MicroOS ini mengubah cara pandang dan kebiasaan kita terhadap instalasi sistem operasi pada server yang selama ini kita gunakan. MicroOS memang dirancang untuk mengakomodasi penggunaan container (podman, cri-o) yang mak..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/opensuse-microos-dan-systemd-timer/kubic-2.png"
---

![Kubic](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/opensuse-microos-dan-systemd-timer/kubic-2.png)

Beberapa waktu belakangan ini saya sedang mencoba openSUSE MicroOS dan Kubic. MicroOS ini mengubah cara pandang dan kebiasaan kita terhadap instalasi sistem operasi pada server yang selama ini kita gunakan. MicroOS memang dirancang untuk mengakomodasi penggunaan *container* (podman, cri-o) yang makin banyak diadopsi oleh para pengembang aplikasi perangkat lunak.

Beberapa hal yang perlu digarisbawahi dalam penggunaan MicroOS/Kubic:

1. Sistem operasi didasarkan pada openSUSE Tumbleweed. Jangan kuatir, uji coba saya selama 2 bulan sangat-sangat stabil.
2. Read-only BTRFS root file system. Anda tidak bisa dengan seenaknya menulis dan menyimpan file, sebagian besar directory adalah read-only. Saya menemukan bahwa file bisa disimpan pada */home, /root, /etc, /var, /usr/local*.
3. Setiap kali anda menambah instalasi aplikasi dengan *zypper in* butuh reboot sebelum aplikasi bisa dijalankan, perintah *zypper in* berubah menjadi *transactional-update pkg in *. Demikian pula ketika melakukan *zypper dup* anda harus me-reboot agar update bisa diterapkan. Oya perintah *zypper dup* berubah menjadi *transactional-update dup*.
4. Default container bawaan adalah menggunakan podman. Kelebihan podman adalah hemat RAM karena anda tidak perlu service daemon seperti halnya docker.

Silakan baca lebih lengkap di [Kubic website](https://kubic.opensuse.org/) dan [Portal:Kubic](https://en.opensuse.org/Portal:Kubic).

Ada satu hal yang kadang diperlukan tetapi secara default tidak diaktifkan dalam MicroOS, **cron**. Kadang sebagai admin server anda membutuhkan cron baik sebagai otomasi atau pintas jalan keluar (baca:workaround) 😀  
Kebetulan saya melakukan pengujian MicroOS untuk container postgresql yang datanya disimpan ke mesin lain yang menggunakan glusterfs. Jadi glusterfs di-mount ke mesin MicroOS dan container postgresql akan menyimpan data ke glusterfs. Entah kenapa mounting ini beberapa kali terlepas, tidak ada log sama sekali yang menunjukkan apa yang terjadi sehingga menyebabkan mounting tersebut terlepas. Dugaan saya, saya musti membuat LAN/VLAN terpisah untuk glusterfs ini karena data yang dituliskan frekuensinya lumayan tinggi dan cukup besar, sekitar 500 row per menit dan besaran sekitar 1.8 GB/hari. Sayangnya belum punya cukup waktu untuk kutak-katik vlan.

Karena cron tidak disertakan, maka digunakan ***systemd timer***. Langkahnya ternyata tidak terlalu sulit, hanya saja selama ini tidak terbiasa. Secara garis besar langkah yang dilakukan: membuat *script* untuk *service*, membuat *systemd service* dengan memanggil script, membuat *systemd timer* untuk memanggil *systemd service* dan menset waktunya.  
Di bawah ini adalah contoh membuat *script, systemd service* dan *systemd timer*. Silakan anda berkreasi sesuai kebutuhan anda.

### 1. Membuat *script* `.sh`
Langkah pertama adalah membuat script untuk **service** yang akan dijalankan oleh systemd timer.

```
#!/bin/
#by medwinz@gmail.com
#free to copy

#Script untuk memeriksa mounting glusterfs
#Jika mounting ok, no further action
#Jika mounting terlepas, matikan podman, hapus container, mounting ulang glusterfs,
# create dan jalankan ulang container

S1='jeos-1:/dis-rep-vol'
S2=`mount | grep "jeos-1:/dis-rep-vol on /home/opensuse/data-postgres type fuse.glusterfs"| awk -F' ' '{print $1}'`

if [ "$S2" == "$S1" ]
 then
    echo -n "glusterfs mounted, postgresql running. $0 will exit now."
    exit 1
  else
    podman stop postgresql &&
    podman rm postgresql
    sleep 1
    mount -t glusterfs jeos-1:/dis-rep-vol /home/opensuse/data-postgres
    sleep 2
    podman run -d --name postgresql -e POSTGRES_PASSWORD=rahasia -v /home/opensuse/data-postgres:/var/lib/postgresql/data -p 5432:5432 --restart always postgres:latest
    sleep 1
    exit 1
fi
```

Simpan file di */usr/local/bin* misalnya sebagai *check-glusterfs.sh*

### 2. Membuat file systemd service
Buat sebuah file di */etc/systemd/system*, beri nama misalnya *glusterfs-check.service* isi dengan

```
[Unit]
Description="Check glusterfs mount from other machine to /home/opensuse/data-postgres for podman /var/lib/postgresql/data"

[Service]
ExecStart=/usr/local/bin/check-glusterfs.sh
```

### 3. Membuat file systemd timer
Buat sebuah file di */etc/systemd/system*, beri nama misalnya *glusterfs-check.timer* isi dengan

```
[Unit]
Description="Check glusterfs mount and restart podman"
After=network-online.target network.target

[Timer]
OnBootSec=5min
OnUnitActiveSec=60min
Unit=glusterfs-check.service

[Install]
WantedBy=multi-user.target
```

Perhatikan bagian [Unit], karena mounting ke glusterfs hanya bisa dilakukan setelah network-online.target dan network.target selesai dipanggil maka perlu diberi directive After. Dalam kasus di atas nama vm yang dipanggil adalah jeos-1, karenanya ip dan nama vm tersebut didaftarkan pada file /etc/hosts.  
Perhatikan juga bagian *OnBootSec=5 min*, artinya timer akan dipanggil 5 menit setelah boot dan berikutnya *OnUnitActiveSec=60 min*, artinya setelah itu akan dipanggil setiap 60 menit sekali.  
Silakan disesuaikan dengan kebutuhan masing-masing.

Selanjutnya tinggal mendaftarkan service dan timer dan mengaktifkannya dengan

```
systemctl daemon-reload
systemctl start glusterfs-check.timer
systemctl enable glusterfs-check.timer
```

Untuk melihat apakah systemd timer kita sudah berjalan, dapat diperiksa dengan perintah

```
systemctl list-timers
```

Hasilnya misalnya  
![Contoh 1](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2019/opensuse-microos-dan-systemd-timer/Screenshot_20191105_114857.png)

Silakan mencoba MicroOS, anda akan menemukan banyak hal baru yang keren. Sistem operasi ini sepertinya akan jadi tren baru untuk implementasi aplikasi yang menggunakan *container* karena ringan dan *powerfull*.

Have fun!