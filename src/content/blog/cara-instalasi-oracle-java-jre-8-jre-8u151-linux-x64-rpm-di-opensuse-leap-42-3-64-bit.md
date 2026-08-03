---
title: "Instalasi Oracle Java Jre 8 (Jre-8u151-Linux-X64.Rpm) Di openSUSE Leap 42.3"
date: "2017-11-10"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Karena ada aplikasi yang harus dijalankan dengan syarat Oracle Jre 8 terinstall di system maka openSUSE Leap 42.3 yang terinstall di komputer saya harus menginstallnya. Begini langkah-langkahnya: Komputer harus terkoneksi internet Buka terminal wget -c http://sdlc-esd.oracle.com/ESD6/JSCDL/jdk/8u..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Karena ada aplikasi yang harus dijalankan dengan syarat Oracle Jre 8 terinstall di system maka openSUSE Leap 42.3 yang terinstall di komputer saya harus menginstallnya. Begini langkah-langkahnya:

1. Komputer harus terkoneksi internet
2. Buka terminal

```
wget -c http://sdlc-esd.oracle.com/ESD6/JSCDL/jdk/8u151-b12/e758a0de34e24606bca991d704f6dcbf/jre-8u151-linux-x64.rpm
sudo rpm -ivh jre-8u151-linux-x64.rpm --nodeps
sudo ln -s /usr/sbin/update-alternatives /usr/sbin/alternatives
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/java/latest/bin/java" 1
sudo update-alternatives --set java /usr/java/latest/bin/java
```

Semoga berguna