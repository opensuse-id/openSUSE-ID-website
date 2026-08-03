---
title: "Cara Instalasi Netbeans 8.2 Di openSUSE Leap 42.3"
date: "2017-11-10"
author: "Tim openSUSE Indonesia"
category: uncategorized
excerpt: "Untuk menginstall Netbeans 8.2 di openSUSE Leap 42.3 lakukan langkah-langkah berikut ini: Komputer harus terkoneksi internet Download dan install dulu Oracle JDK 8 wget -c http://download.oracle.com/otn-pub/java/jdk/8u152-b16/aa0333dd3019491ca4f6ddbe78cdb6d0/jdk-8u152-linux-x64.rpm?AuthParam=1510..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Untuk menginstall Netbeans 8.2 di openSUSE Leap 42.3 lakukan langkah-langkah berikut ini:

* Komputer harus terkoneksi internet
* Download dan install dulu Oracle JDK 8

```
wget -c http://download.oracle.com/otn-pub/java/jdk/8u152-b16/aa0333dd3019491ca4f6ddbe78cdb6d0/jdk-8u152-linux-x64.rpm?AuthParam=1510213743_8da7442cf35a6361d7693a134e16d0ba
sudo rpm -ivh jdk-8u152-linux-x64.rpm --nodeps
sudo ln -s /usr/sbin/update-alternatives /usr/sbin/alternatives
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/java/latest/bin/java" 1
sudo update-alternatives --set java /usr/java/latest/bin/java
```

* Download dan install Netbeans 8.2

```
wget -c http://download.netbeans.org/netbeans/8.2/final/bundles/netbeans-8.2-linux.sh
sudo chmod 755 netbeans-8.2-linux.sh
sudo ./netbeans-8.2-linux.sh
```

Ikuti langkah-langkah yang tertera di layar, jika ditanyakan path java arahkan ke **`/usr/java/jdk1.8.0_151/`**

Semoga berguna