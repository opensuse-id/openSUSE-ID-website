---
title: "Memasang Cockpit pada openSUSE Leap 15.1"
date: "2020-03-29"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Sebelumnya, ada obrolan tentang Cockpit di status facebook om Adang Hidayat, dan tantangan dari pak Presiden Kukuh Syafaat, akhirnya sifat iseng ini timbul kembali, apalagi saat ini sedang gencar #gerakdarirumah Apa itu Cockpit? Menurut situs Cockpit Project, cockpit merupakan sebuah interface ya..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/green.png"
---

Sebelumnya, ada obrolan tentang Cockpit di status facebook om Adang Hidayat, dan tantangan dari pak Presiden Kukuh Syafaat, akhirnya sifat iseng ini timbul kembali, apalagi saat ini sedang gencar [#gerakdarirumah](https://gerakdarirumah.id/).

##### Apa itu Cockpit?

Menurut situs [Cockpit Project](https://cockpit-project.org/), cockpit merupakan sebuah interface yang interaktif untuk administrasi server, sepengetahuan penulis, aplikasi ini secara default tersedia di distro linux CentOS, sedangkan untuk distro lain, seperti openSUSE dan Ubuntu, maka untuk menggunakan service cockpit, maka perlu dilakukan pemasangan service cockpit.

Untuk itu, dalam kesempatan ini, penulis akan berbagi tips cara pemasangan service cockpit dan bagaimana cara mengaktifkan service cockpit pada openSUSE Leap 15.1 (untuk sistem operasi lain tidak dibahas disini karena blog ini adalah blog openSUSE, bukan yang lain).

##### Langkah-langkah Pemasangan :

Tambahkan repository ***systemsmanagement:cockpit*** dengan perintah :

```
sudo zypper addrepo https://download.opensuse.org/repositories/systemsmanagement:cockpit/openSUSE_Leap_15.1/systemsmanagement:cockpit.repo
```

Setelah itu refresh database repository dengan perintah :

```
sudo zypper refresh
```

Apabila ada pertanyaan seperti dibawah ini, masukkan jawaban dengan huruf `a` (trust always) :

```
Do you want to reject the key, trust temporarily, or trust always? [r/t/a/?] (r): a
```

Kemudian install cockpit dengan perintah :

```
sudo zypper install cockpit
```

Setelah itu, jalankan service cockpit secara manual dengan perintah :

```
sudo systemctl start cockpit
```

##### Masuk ke webconsole Cockpit

Untuk masuk ke webconsole, pada web browser anda masukkan alamat :

```
https://IP_Address_Server_Cockpit:9090/
```

Apabila ada informasi ***Your connection is not private*** seperti gambar dibawah ini, klik tombol Advanced,

Kemudian klik opsi ***Proceed to <ip_address> (unsafe)***, seperti dibawah ini :

Setelah itu akan tampil halaman login cockpit :

Masukkan username dan password user yang digunakan untuk login di OS openSUSE Leap, untuk masuk ke menu cockpit.

Halaman dashboard cockpit :

##### Menjalankan cockpit secara otomatis setelah Restart/Reboot

Secara default, service cockpit tidak dapat dijalankan secara otomatis, karena tidak adanya komponen `[Install]`, dan apabila dijalankan perintah :

```
sudo systemctl enable cockpit
```

akan ada keluaran seperti dibawah ini :

```
The unit files have no installation config (WantedBy, RequiredBy, Also, Alias
settings in the [Install] section, and DefaultInstance for template units).
This means they are not meant to be enabled using systemctl.
Possible reasons for having this kind of units are:
1) A unit may be statically enabled by being symlinked from another unit's
.wants/ or .requires/ directory.
2) A unit's purpose may be to act as a helper for some other unit which has
a requirement dependency on it.
3) A unit may be started when needed via activation (socket, path, timer,
D-Bus, udev, scripted systemctl call, ...).
4) In case of template units, the unit is meant to be enabled with some
instance name specified.
```

Untuk itu perlu kita lakukan editing pada file ***/usr/lib/systemd/system/cockpit.service***, dan menambahkan baris :

```
[Install]
WantedBy=multi-user.target
```

Sehingga menjadi seperti dibawah ini :

```
[Unit]
Description=Cockpit Web Service
Documentation=man:cockpit-ws(8)
Requires=cockpit.socket

[Service]
ExecStartPre=/usr/sbin/remotectl certificate --ensure --user=root --group=cockpit-ws --selinux-type=etc_t
ExecStart=/usr/lib/cockpit-ws
PermissionsStartOnly=true
User=cockpit-ws
Group=cockpit-ws

[Install]
WantedBy=multi-user.target
```

Setelah itu jalankan perintah dibawah ini :

```
sudo systemctl daemon-reload
```

Kemudian lanjutkan dengan perintah dibawah ini agar service cockpit otomatis berjalan setelah restart :

```
sudo systemctl enable cockpit
```