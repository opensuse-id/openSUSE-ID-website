---
title: "Instalasi Bumblebee Untuk NVIDIA Optimus Pada openSUSE Leap 42.2"
date: "2016-11-18"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "NVIDIA Optimus adalah sebuah fitur pada laptop yang memungkinkan sistem untuk mengatur sistem agar dapat menggunakan kartu grafis terintegrasi (Intel) dan menggantinya menjadi NVIDIA secara otomatis. Nah, bagaimana caranya install paket-paket tersebut pada openSUSE terbaru, Leap 42.2 yang baru di..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

NVIDIA Optimus adalah sebuah fitur pada laptop yang memungkinkan sistem untuk mengatur sistem agar dapat menggunakan kartu grafis terintegrasi (Intel) dan menggantinya menjadi NVIDIA secara otomatis.

Nah, bagaimana caranya install paket-paket tersebut pada openSUSE terbaru, Leap 42.2 yang baru dirilis tanggal 16 November kemarin? Yuk simak caranya berikut ini.

1. Tambahkan repository Bumblebee (dalam hal ini repository untuk openSUSE Leap 42.2)  
   `zypper ar -f http://repo.opensuse.id/repositories/X11:/Bumblebee/openSUSE_Leap_42.2/ Bumblebee`
2. Lakukan refresh pada zypper  
   `zypper ref`  
   Jika ada peringatan menambahkan key, lanjutkan dengan menekan a (always) trust.  
   ![screenshot_20161118_202312](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-bumblebee-untuk-nvidia-optimus-pada-opensuse-leap-42-2/Screenshot_20161118_202312\.png)
3. Lalu, lakukan pemasangan pada paket bumblebee  
   `zypper in bumblebee nvidia-bumblebee primus`  
   ![screenshot_20161118_203307](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-bumblebee-untuk-nvidia-optimus-pada-opensuse-leap-42-2/Screenshot_20161118_203307.png)  
   Tunggu saja sampai pemasangan paket selesai.
4. Tambahkan username anda ke dalam group bumblebee dan video, dalam contoh yang ditampilkan, nama username pada sistem saya adalah “”kana”, maka perintahnya adalah  
   `usermod -G video,bumblebee kana`  
   ![screenshot_20161118_204059](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-bumblebee-untuk-nvidia-optimus-pada-opensuse-leap-42-2/Screenshot_20161118_204059.png)
5. Lakukan pengaktifan pada service bumblebeed dan dkms  
   `systemctl enable bumblebeed`  
   `systemctl enable dkms`  
   ![screenshot_20161118_204501](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-bumblebee-untuk-nvidia-optimus-pada-opensuse-leap-42-2/Screenshot_20161118_204501.png)
6. Tambahkan beberapa baris pada file /etc/modprobe.d/50-blacklist.conf (Anda dapat menggunakan nano, vi ataupun text editor lain kesayangan anda, namun dalam contoh ini saya akan memakai nano).  
   `nano /etc/modprobe.d/50-blacklist.conf`
   ```  
   <…>

   blacklist nouveau

   options nouveau modeset=0
   ```
   ![screenshot_20161118_204953](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-bumblebee-untuk-nvidia-optimus-pada-opensuse-leap-42-2/Screenshot_20161118_204953.png)
7. Jalankan perintah mkinitrd.  
   ![screenshot_20161118_205120](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-bumblebee-untuk-nvidia-optimus-pada-opensuse-leap-42-2/Screenshot_20161118_205120.png)

Reboot laptop Anda dan Anda dapat menggunakan NVIDIA Optimus pada Leap 42.2 yang telah anda pasang.

![Kartu grafis terintegrasi (Intel)](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-bumblebee-untuk-nvidia-optimus-pada-opensuse-leap-42-2/Screenshot_20161118_205738.png)

Kartu grafis terintegrasi (Intel)

![NVIDIA Optimus](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/instalasi-bumblebee-untuk-nvidia-optimus-pada-opensuse-leap-42-2/Screenshot_20161118_205829.png)

NVIDIA Optimus