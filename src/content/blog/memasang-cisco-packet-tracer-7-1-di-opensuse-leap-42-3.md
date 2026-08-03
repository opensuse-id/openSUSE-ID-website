---
title: "Memasang Cisco Packet Tracer 7.1 di openSUSE Leap 42.3"
date: "2017-11-12"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "1. Unduh Cisco Packet Tracer 7.1 di https://www.netacad.com/ 2. Buat folder sementara mkdir sementaramkdir sementara 3. Ekstrak file .tar.gz tar -xvf PacketTracer71_64bit_linux.tar.gz -c sementara/tar -xvf PacketTracer71_64bit_linux.tar.gz -c sementara/ 4. Pasang Packet Tracer sudo ./installsudo ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-cisco-packet-tracer-7-1-di-opensuse-leap-42-3/Selection_050.png"
---

![Packet Tracer](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/memasang-cisco-packet-tracer-7-1-di-opensuse-leap-42-3/Selection_050.png)

1. Unduh Cisco Packet Tracer 7.1 di [https://www.netacad.com/](https://www.netacad.com/)
2. Buat folder sementara

```
mkdir sementara
```

3. Ekstrak file .tar.gz

```
tar -xvf PacketTracer71_64bit_linux.tar.gz -c sementara/
```

4. Pasang Packet Tracer

```
sudo ./install
```

5. Ikuti langkahnya sampai selesai
6. Pasang paket libQt5 tambahan

```
sudo zypper in libQt5WebKit5 libQt5WebKitWidgets5 libQt5Multimedia5 libQt5Svg5 libQt5Xml5 libQt5Script5
```

7. Hapus dan jalankan symlink

```
sudo rm /usr/local/bin/packettracer
sudo ln -s /opt/pt/bin/PacketTracer7 /usr/local/bin/packettracer
```

8. Jalankan packet tracer

```
packettracer
```

**Refrensi**: forum openSUSE dan teman-teman dikantor [Dendy](https://www.facebook.com/delly.dendy?fref=ts), [Ragil](https://www.facebook.com/ragiels.setianjaya.9?fref=ts)