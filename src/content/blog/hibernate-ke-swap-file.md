---
title: "Hibernate ke Swap file"
date: "2020-02-03"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Bagi yang terbiasa memasang Linux tanpa partisi Swap seperti saya, tetapi ingin memanfaatkan fitur Hibernate/Hibernasi, Anda bisa membuat Swap dalam bentuk file. Saya terbiasa tidak membuat partisi Swap karena biasanya menggunakan Zram untuk kebutuhan Swap. Dengan Zram, komputer tetap responsif t..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/hibernate-ke-swap-file/energy-saving.png"
---

![Energy Saving](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/hibernate-ke-swap-file/energy-saving.png)

Bagi yang terbiasa memasang Linux tanpa partisi Swap seperti saya, tetapi ingin memanfaatkan fitur Hibernate/Hibernasi, Anda bisa membuat Swap dalam bentuk file. Saya terbiasa tidak membuat partisi Swap karena biasanya menggunakan Zram untuk kebutuhan Swap. Dengan Zram, komputer tetap responsif tanpa ada *lag* meskipun Swap terpakai, tapi kekurangannya yang saya rasakan adalah kita tidak bisa memanfaatkan fitur hibernate.

Buat apa fitur Hibernate untuk pengguna SSD, karena boot dari komputer mati biasanya justru lebih cepat daripada *resume* dari Hibernate? Karena saya kadang-kadang perlu mematikan komputer tanpa harus menyimpan pekerjaan terlebih dahulu. Dan jika menggunakan Sleep, jika laptop ditinggalkan lama karena pekerjaan lain atau karena lupa bisa membuat baterai kehabisan daya sehingga perkerjaan yang tersimpan hilang begitu saja.

Tapi dengan Hibernate, kita bisa memanfaatkan fitur *Sleep Then Hibernate* yang jika komputer/laptop dibiarkan Sleep dalam waktu tertentu, dia akan berpindah ke Hibernate. Bagi pengguna Plasma 5 fitur ini bisa diaktifkan di **System Settings** > **Power Management** > **Energy Saving** atau bisa langsung menggunakan *Systemd*.

Membuat Swap file bisa dilakukan dengan proses berikut:

Pertama buat file dengan `fallocate`. Untuk membuat Swap sebesar 4 GiB, gunakan **4096M** atau **4G** (sesuaikan dengan kebutuhan):

`su -c "fallocate -l 4096M /swapfile"`

Jika Anda menggunakan BtrFS dengan snapshot, sebaiknya buat **swapfile** di partisi lain, jadi ubah `/swapfile` dengan `/path/ke/partisi/lain/swapfile`. Dan yang perlu diperhatikan juga, untuk membuat Swapfile di BtrFS, Anda harus menggunakan Kernel 5 ke atas.

Lalu ubah hak akses supaya aman dari modifikasi pengguna lain:

`su -c "chown -v 600 /swapfile"`

Buat jadi Swap:

`su -c "mkswap /swapfile"`

Aktifkan Swap:

`su -c "swapon /swapfile"`

Masukkan ke **/etc/fstab** supaya Swap aktif saat komputer dinyalakan:

`su -c "echo '/swapfile  none  swap  defaults  0  0' >> /etc/fstab"`

Supaya komputer bisa Resume dari Hibernate, kita perlu menambahkan kernel parameter `resume` dan `resume_offset` ke Grub. Parameter `resume` diisi dengan partisi di mana letak **swapfile** berada. Misal jika ada di **/dev/sda2**, isi dengan `resume=/dev/sda2`. Sedangkan `resume_offset` bisa diketahui dengan perintah `filefrag`, kecuali jika Anda membuat swapfile tersebut di BtrFS.

`su -c "filefrag -v /swapfile"`

Dari hasil perintah tersebut akan muncul hasil seperti ini:

```
Filesystem type is: ef53
File size of /swapfile is 4294967296 (1048576 blocks of 4096 bytes)
 ext:     logical_offset:        physical_offset: length:   expected: flags:
   0:        0..       0:   17782784..  17782784:      1:            
   1:        1..    2047:   17782785..  17784831:   2047:             unwritten
   2:     2048..   32767:   18071552..  18102271:  30720:   17784832: unwritten
   3:    32768..   63487:   18102272..  18132991:  30720:             unwritten
   4:    .......   .....:   ..........  ........:  .....:             .........
```

Parameter `resume_offset` diisi dengan angka pertama dari **physical_offset**. Jadi dengan hasil perintah di atas, diisi dengan `resume_offset=17782784` (sesuaikan dengan hasil Anda).

Untuk mencari `resume_offset` di BtrFS bisa menggunakan [btrfs_map_physical](https://github.com/osandov/osandov-linux/blob/master/script/btrfs_map_physical.c). Download file tersebut, *compile*, lalu jalankan.

Masukkan kedua parameter tersebut ke file **/etc/default/grub** pada opsi `GRUB_CMDLINE_LINUX_DEFAULT`. Jika kita memasang openSUSE dengan partisi Swap, parameter `resume` ini akan berada di antara `splash=silent` dan `quiet`. Kita juga bisa memasukkan kedua parameter di atas di tempat yang sama dengan perintah:

`su -c "sed -i 's/silent/silent resume=\/dev\/sda2 resume_offset=17782784/g' /etc/default/grub"`

Lalu update grub dengan perintah:

`su -c "grub2-mkconfig -o /boot/grub2/grub.cfg"`

Kekurangan dari Swap dalam bentuk file atau partisi adalah saat Swap terpakai komputer akan terasa berat/*ngelag*. Untuk mengantisipasi ini saya tetap membuat Swap dengan Zram dengan prioritas lebih tinggi. Caranya buat sebuah file di **/usr/local/sbin/** dengan nama **swap-zram**, isi dengan:

```
#!/bin/bash

num_cpus=$(grep -c processor /proc/cpuinfo)
[ "$num_cpus" != 0 ] || num_cpus=1
decr_num_cpus=$((num_cpus - 1))

if [ "$1" -ne 0 ]; then
    mod_parm=$(modinfo zram |grep parm |tr -s " " |cut -f2 -d ":")
    modprobe zram $mod_parm=$num_cpus

    for i in $(seq 0 $decr_num_cpus); do
    echo $((($1 * 1024 * 1024) / num_cpus)) > /sys/block/zram$i/disksize
    done

    for i in $(seq 0 $decr_num_cpus); do
    mkswap /dev/zram$i
    done

    for i in $(seq 0 $decr_num_cpus); do
    swapon -p 100 /dev/zram$i
    done
else
    for i in $(seq 0 $decr_num_cpus); do
    if [ "$(grep /dev/zram$i /proc/swaps)" != "" ]; then
    swapoff /dev/zram$i
    fi
    done

    rmmod zram
fi
```

Buat file tersebut supaya bisa dieksekusi:

`su -c "chmod +x /usr/local/sbin/swap-zram"`

Lalu buat sebuah folder di **/usr/local/lib/** dengan nama **systemd**. Di dalamnya buat lagi folder dengan nama **system**. Perintahnya adalah:

`su -c "mkdir -p /usr/local/lib/systemd/system"`

Di dalam folder **system**, buat sebuah file dengan nama **swap-zram.service**. Isi dengan:

```
[Unit]
Description=Service enabling compressing RAM with zRam
After=multi-user.target

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/swap-zram 4096
ExecStop=/usr/local/sbin/swap-zram 0
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

Angka `4096` jika kita ingin membuat Swap dari Zram sebesar 4 GiB. Sehingga total Swap dengan Swapfile yang tadi dibuat menjadi 8 GiB. Silakan sesuaikan dengan kebutuhan.
Aktifkan dan jalankan *service* tersebut dengan:

`su -c "systemctl enable swap-zram.service"`

Dan

`su -c "systemctl start swap-zram.service"`