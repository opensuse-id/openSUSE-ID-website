---
title: "Mencoba Podman dan Buildah di openSUSE Tumbleweed"
date: "2020-01-10"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Podman Apa itu Podman? Podman adalah mesin kontainer tanpa daemon untuk mengembangkan, mengelola, dan menjalankan container OCI di GNU/Linux. Kontainer dapat dijalankan sebagai root atau dalam mode tanpa root.Sederhananya: `alias docker=podman`. Podman dapat mengelola seluruh ekosistem container ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/mencoba-podman-dan-buildah-di-opensuse-tumbleweed/opensuse-teh.jpg"
---

![podman-logo](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/mencoba-podman-dan-buildah-di-opensuse-tumbleweed/podman-logo.png)

# Podman

> Apa itu Podman? Podman adalah mesin kontainer tanpa daemon untuk mengembangkan, mengelola, dan menjalankan container OCI di GNU/Linux. Kontainer dapat dijalankan sebagai root atau dalam mode tanpa root.Sederhananya: `alias docker=podman`.
> 
> Podman dapat mengelola seluruh ekosistem container yang mencakup pod, container, container image, dan volume menggunakan pustaka libpod. Podman dapat menjalankan semua perintah dan fungsi yang membantu memelihara dan memodifikasi container image OCI, seperti menarik dan memberi tag. Ini memungkinkan untuk membuat, menjalankan, dan memelihara container yang dibuat dari image dalam lingkungan produksi.

## Memasang Podman

`sudo zypper in slirp4netns podman`

## Menjalankan Podman Tanpa Akses Root

```
sudo  -c 'echo 10000 > /proc/sys/user/max_user_namespaces'
sudo  -c "echo $(whoami):100000:65536 > /etc/subuid"
sudo  -c "echo $(whoami):100000:65536 > /etc/subgid"
```

## Ujicoba Podman

```
podman pull nginx:stable
podman run --name nginx nginx:stable
podman rm nginx
```

## Podman Cheat Sheet

```
podman login docker.io
podman search tuanpembual
podman run docker.io/tuanpembual/hello
podman run --rm --name hello -p 8080:80/tcp docker.io/tuanpembual/hello
podman rm hello
```

Sampe batas ini, ya memang benar kita bisa dengan entengnya membuat

```
alias docker=podman
```

di file `.zshrc`.

![buildah](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/mencoba-podman-dan-buildah-di-opensuse-tumbleweed/buildah.png)

# Buildah

> Buildah – a tool that facilitates building OCI container images.

Buildah adalah tool buat bikin container images, dengan beberapa fitur yang menawan, diantaranya:

* Tidak ada Daemon. Jadi kalo mau build image ya tinggal build aja.
* Buat image dari nol(scratch) atau dari image yang sudah jadi.
* Merupakan Build tools external, sehingga memiliki karakter;Ukuran image lebih kecil,Membuat lebih aman dengan tidak memasukkan software untuk membuat container (like gcc, make, and dnf), Membutuhkan resource yang lebih kecil untuk mengirim images.

## Memasang Buildah

`sudo zypper in buildah`

## Membuat image dengan Buildah dari Dockerfile

```
# ls
Dockerfile  myecho
# cat Dockerfile
FROM registry.access.redhat.com/ubi8/ubi
ADD myecho /usr/local/bin
ENTRYPOINT "/usr/local/bin/myecho"
# cat myecho
echo "This container works!"
# chmod 755 myecho
# ./myecho
This container works!
```

## Build Step

```
# buildah bud -t tuanpembual/myecho .
STEP 1: FROM registry.redhat.io/ubi8/ubi
STEP 2: ADD myecho /usr/local/bin
STEP 3: ENTRYPOINT "/usr/local/bin/myecho"
```

## Docker Format dan Push Image

```
buildah bud --format=docker -t docker.io/tuanpembual/myecho .
buildah push docker.io/tuanpembual/myecho
```

## Melihat List images

```
buildah images
podman images
```

## Menjalankan Container dan Memeriksa Container

```
podman run --rm tuanpembual/myecho
buildah inspect tuanpembual/myecho | less
```

Dah itu saja dulu. Ngoprek selanjutnya bagaimana menggunakan dua perkakas ini ke Gitlab-CI.

Estu~