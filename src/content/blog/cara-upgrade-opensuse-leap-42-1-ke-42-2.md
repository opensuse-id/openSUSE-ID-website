---
title: "Cara Upgrade openSUSE Leap 42.1 Ke 42.2"
date: "2017-11-10"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Server SIMRS Khanza saya memakai openSUSE Leap 42.1, ternyata pada saat mau menginstall software lagi repositorinya sudah tidak aktif lagi, ada sih 1 repositori yang masih aktif yaitu http://repo.opensuse.id/ , tapi berhubung takut suatu ketika tidak aktif lagi sayapun melakukan upgrade ke versi ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Server SIMRS Khanza saya memakai openSUSE Leap 42.1, ternyata pada saat mau menginstall software lagi repositorinya sudah tidak aktif lagi, ada sih 1 repositori yang masih aktif yaitu [http://repo.opensuse.id/](http://repo.opensuse.id/) , tapi berhubung takut suatu ketika tidak aktif lagi sayapun melakukan upgrade ke versi Opensuse 42.2, berikut langkah-langkahnya:

1. Saya hapus semua repositori yang sudah ada dan menambahkan repositori ini:

***[http://repo.opensuse.id/update/leap/42.1/non-oss/](http://repo.opensuse.id/update/leap/42.1/non-oss/)***

***[http://repo.opensuse.id/update/leap/42.1/oss/](http://repo.opensuse.id/update/leap/42.1/oss/)***

***[http://repo.opensuse.id/distribution/leap/42.1/repo/non-oss/](http://repo.opensuse.id/distribution/leap/42.1/repo/non-oss/)***

***[http://repo.opensuse.id/distribution/leap/42.1/repo/oss/](http://repo.opensuse.id/distribution/leap/42.1/repo/oss/)***

2. Masuk ke mode text tty5, dengan menekan Ctrl + Alt + F1, tujuannya agar koneksi internet pake wifi tidak putus

3. Lakukan refresh

```bash
sudo zypper refresh
sudo zypper update
```

4. Backup repository

```bash
sudo cp -Rv /etc/zypp/repos.d /etc/zypp/repos.d.Old
```

5. Ganti repositorynya dengan repository 42.2

***[http://repo.opensuse.id/distribution/leap/42.2/repo/non-oss/](http://repo.opensuse.id/distribution/leap/42.2/repo/non-oss/)***

***[http://repo.opensuse.id/distribution/leap/42.2/repo/oss/](http://repo.opensuse.id/distribution/leap/42.2/repo/oss/)***

6. Lakukan upgrade

```bash
sudo zypper dup
```

7. Restart komputer

8. Setelah di restart system berjalan normal, cuma WiFi saja yang tidak ke detek, karena chip wifi komputer saya Broadcom BCM4312, setelah saya menambahkan repository packman dan menginstall paket broadcom-wl bisa kedetek lagi

Referensi:

***[https://en.opensuse.org/SDB:System_upgrade](https://en.opensuse.org/SDB:System_upgrade)***