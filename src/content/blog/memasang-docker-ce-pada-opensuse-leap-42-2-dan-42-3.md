---
title: "Memasang Docker-CE pada openSUSE Leap 42.2 dan 42.3"
date: "2017-11-15"
author: "Tim openSUSE Indonesia"
category: uncategorized
excerpt: "Dalam dokumentasi resmi Docker, tidak ada lagi laman dokumentasi pemasangan docker-ce untuk openSUSE. Jadi berikut adalah langkah-langkah untuk memasang docker-ce pada openSUSE Leap 42.2 maupun 42.3. Buat berkas konfigurasi repo. sudo vim /etc/zypp/repos.d/docker.reposudo vim /etc/zypp/repos.d/do..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-docker-ce-pada-opensuse-leap-42-2-dan-42-3/docker-official-800.png"
---

Dalam dokumentasi resmi Docker, tidak ada lagi laman dokumentasi pemasangan docker-ce untuk openSUSE. Jadi berikut adalah langkah-langkah untuk memasang docker-ce pada openSUSE Leap 42.2 maupun 42.3.

Buat berkas konfigurasi repo.

```
sudo vim /etc/zypp/repos.d/docker.repo
```

Untuk openSUSE Leap 42.2 isi sebagai berikut

```
[Virtualization_containers]
name=Virtualization:containers (openSUSE_Leap_42.2)
type=rpm-md
baseurl=http://download.opensuse.org/repositories/Virtualization:/containers/openSUSE_Leap_42.2/
gpgcheck=1
gpgkey=http://download.opensuse.org/repositories/Virtualization:/containers/openSUSE_Leap_42.2/repodata/repomd.xml.key
enabled=1
```

Untuk openSUSE Leap 42.3 isi sebagai berikut

```
[Virtualization_containers]
name=Virtualization:containers (openSUSE_Leap_42.3)
type=rpm-md
baseurl=http://download.opensuse.org/repositories/Virtualization:/containers/openSUSE_Leap_42.3/
gpgcheck=1
gpgkey=http://download.opensuse.org/repositories/Virtualization:/containers/openSUSE_Leap_42.3/repodata/repomd.xml.key
enabled=1
```

Jalankan perintah berikut untuk memperbarui daftar repo dan memasang docker-ce

```
sudo zypper ref
sudo zypper in docker
```

Pastikan layanan docker sudah menyala

```
sudo systemctl status docker.service
```

Referensi:
[0] [http://blog.sdmoko.net/installation-docker-ce-on-openSUSE-Leap-42-3.html](http://blog.sdmoko.net/installation-docker-ce-on-openSUSE-Leap-42-3.html)