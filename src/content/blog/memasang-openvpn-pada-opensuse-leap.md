---
title: "Memasang OpenVPN Pada openSUSE Leap"
date: "2018-11-13"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Seringkali kita harus mengakses jaringan baik di kantor, cloud provider, atau pelanggan kita melalui jaringan internet menggunakan VPN. Ada banyak implementasi VPN, yang paling sering digunakan adalah PPTP karena gampang untuk mengkonfigurasinya, percayalah PPTP itu tidak aman 😉 Salah satu yang c..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-openvpn-pada-opensuse-leap/openvpn.png"
---

Seringkali kita harus mengakses jaringan baik di kantor, *cloud provider*, atau pelanggan kita melalui jaringan internet menggunakan VPN. Ada banyak implementasi VPN, yang paling sering digunakan adalah PPTP karena gampang untuk mengkonfigurasinya, percayalah PPTP itu tidak aman 😉

Salah satu yang cukup baik adalah OpenVPN. Instalasi OpenVPN di openSUSE tidak semudah di Ubuntu misalnya yang sudah menyediakan banyak script bantu yang membuat implementasinya menjadi mudah. Tapi, memasang OpenVPN di openSUSE akan membuat anda mengerti apa sebetulnya yang terjadi 😀

**Memasang Paket OpenVPN**

Langkah pertama yang harus dilakukan adalah memasang paket openvpn dari repositori.
```
sudo zypper in openvpn
```
**Memasang Easyrsa**

Masuklah ke directory /etc/openvpn dan download easyrsa. Kita akan menggunakan easyrsa untuk membuat sertifikat dan kunci bagi server dan klien
```
cd /etc/openvpn
git clone git://github.com/OpenVPN/easy-rsa
```
Edit file /etc/openvpn/easy-rsa/easyrsa3/vars.example dan simpanlah menjadi vars. Pastikan baris di bawah dilengkapi, ubahlah seperlunya
```
set\_var EASYRSA\_REQ\_COUNTRY "ID"
set\_var EASYRSA\_REQ\_PROVINCE "DKI Jakarta"
set\_var EASYRSA\_REQ\_CITY "Jakarta Selatan"
set\_var EASYRSA\_REQ\_ORG "openSUSE Indonesia"
set\_var EASYRSA\_REQ\_EMAIL "geeko@opensuse.id"
set\_var EASYRSA\_REQ\_OU "admin"
set\_var EASYRSA\_KEY\_SIZE 4096
```
Selanjutnya kita membutuhkkan 2 buah direktori terpisah untuk membuat kunci  rsa, dan menandatangani sertifikat untuk klien dan server. Salin isi direktori /etc/openvpn/easy-rsa/easyrsa3/ ke dalam direktori yang baru dibuat tersebut
```
mkdir /etc/openvpn/client
mkdir /etc/openvpn/server
cp -R /etc/openvpn/easy-rsa/easyrsa3/\* /etc/openvpn/client/
cp -R /etc/openvpn/easy-rsa/easyrsa3/\* /etc/openvpn/server/
```
**Kunci Klien dan Request Sertifikat Klien**

Pada tahapan ini semua infrastruktur yang dibutuhkan untuk menjalankan OpenVPN sudah siap, saatnya kita membuat kunci dan sertifikat. Kunci untuk klien dan request sertifikat akan dibuat di dalam direktori client, sedangkan kunci dan sertifikat server dibuat di dalam direktori server. Request sertifikat klien akan kita accept dan sign di dalam direktori server.  Di bawah ini adalah cara membuat kunci klien dan request sertifikat untuk sertifikat bernama “geeko”. Pastikan anda mengisi password saat membuat geeko.key agar proteksi kunci lebih aman, dan catatlah password yang anda masukkan.
```
cd /etc/openvpn/client
./easyrsa init-pki
./easyrsa gen-req geeko
```
Periksalah pada direktori /etc/openvpn/client/pki/private akan terdapat file kunci bernama geeko.key serta pada direktori /etc/openvpn/client/pki/reqs akan terdapat file geeko.req. Easyrsa akan membuat key dan request tersebut berdasarkan konfigurasi pada file vars. Pastikan bahwa panjang kuncinya sudah sesuai dengan ukuran yang kita set pada file vars. Dalam contoh ini kita menggunakan panjang kunci 4096 bit.
```
ssh-keygen -y -e -f /etc/openvpn/client/pki/private/geeko.key
Enter passphrase:
---- BEGIN SSH2 PUBLIC KEY ----
Comment: "4096-bit RSA, converted by geeko@machine from OpenSSH"
```
Sampai tahap ini kita telah memiliki file kunci klien dan sebuah file request sertifikat klien. File sertifikatnya akan dibuat dan di-sign pada direktori server. Anda dapat membuat kunci klien dan request sertifikat sebanyak yang anda butuhkan, sedangkan berapa koneksi vpn yang diperbolehkan pada satu waktu yang bersamaan akan kita atur pada file konfigurasi openvpn server di /etc/openvpn/server.conf

**Certification Authority, Kunci Server dan Sertifikat Server**

Selanjutnya kita harus membuat sebuah certification authority, CA, yang dibutuhkan untuk men-sign sertifikat (baik sertifikat server maupun klien) serta sebuah sertifikat server. Hal ini dilakukan pada direktori /etc/openvpn/server jangan lupa memasukkan passphrase saat anda membuat CA dan pastikan bahwa file /etc/openvpn/server/pki/private/ca.key memiliki panjang kunci 4096 bit
```
cd /etc/openvpn/server
./easyrsa init-pki
./easyrsa build-ca
ssh-keygen -y -e -f ~/server/pki/private/ca.key
Enter passphrase:
---- BEGIN SSH2 PUBLIC KEY ----
Comment: "4096-bit RSA, converted by geeko@machine from OpenSSH
```
Kemudian kita perlu untuk membuat sebuah sertifikat untuk server (dalam contoh ini menggunakan nama serverku). Caranya adalah dengan membuat request sertifikat dan men-sign nya dengan CA yang sudah kita buat sebelumnya. Pada saat membuat request sertifikat maka akan dibuat juga sebuah kunci untuk server. Kita tidak perlu memberikan passphrase untuk kunci server ini karena kunci tersebut tidak akan kita berikan kemana-mana hanya saja pastikan bahwa permissionnya diset ke 600. Saat men-sign sertifikat untuk server pastikan anda menjawab “yes” dan mengisikan passphrase CA yang anda buat di atas.
```
cd /etc/openvpn/server
./easyrsa gen-req serverku.domain.id nopass
./easyrsa sign-req server serverku.domain.id
Using SSL: openssl OpenSSL 1.1.0i-fips 14 Aug 2018
You are about to sign the following certificate.
Please check over the details shown below for accuracy. Note that this request
has not been cryptographically verified. Please be sure it came from a trusted
source or that you have verified the request checksum with the sender.
Request subject, to be signed as a server certificate for 1080 days:
subject=
commonName = serverku
Type the word 'yes' to continue, or any other input to abort.
Confirm request details: yes
Using configuration from /etc/openvpn/server/pki/safessl-easyrsa.cnf
Enter pass phrase for /etc/openvpn/server/pki/private/ca.key:
```
**Transport Layer Security serta Koneksi dari Klien ke Server (dan sebaliknya) pada OpenVPN**

Secara default OpenVPN menggunakan port UDP 1194. Anda dapat saja mengubahnya sesuai kebutuhan. Koneksi ini menggunakan TLS dan untuk itu kita membutuhkan kunci statik TLS dan DH parameter (apa itu Diffie-Helman key exchange dapat anda baca pada tautan [ini](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange), dan beberapa catatan implementasinya dapat anda baca di [sini](https://weakdh.org/sysadmin.html)) yang digunakan untuk saling bertukar kunci. Di bawah ini adalah cara membuat DH parameter dan kunci statik TLS. Harap diperhatikan bahwa file dh.pem akan terbentuk pada direktori /etc/openvpn/server/pki yang panjang kuncinya 4096 bit (sesuai dengan setting pada file vars). File dh.pem ini sebenarnya tidak security sensitive karena hanya digunakan di server, permission 644 adalah cukup. Sedangkan file  ta.key memiliki panjang kunci standar OpenVPN 2048 bit. File ini harus diset permissionnya 600
```
cd /etc/openvpn/server
./easyrsa gen-dh
/usr/sbin/openvpn --genkey --secret ta.key
```
**Men-sign sertifikat klien**

Langkah berikutnya adalah mengimpor request sertifikat client dan men-sign nya sebagai client di direktori server. Sekali lagi men-sign sebagai client di direktori server 🙂 Hasilnya adalah file geeko.crt pada direktori /etc/openvpn/server/pki/issued/
```
cd /etc/openvpn/server
./easyrsa import-req ../client/pki/reqs/geeko.req geeko
./easyrsa show-req geeko
./easyrsa sign-req client geeko
```
**Konfigurasi Server OpenVPN**

Setelah semua sertifikat dan kunci yang dibutuhkan sudah tersedia sekarang saatnya melakukan konfigurasi server. Seperti sudah disebutkan di atas secara default OpenVPN menggunakan port UDP 1194 (anda dapat menggantinya sesuai kebutuhan), pastikan bahwa port UDP tersebut tidak diblok oleh firewall. Jika anda menggunakan server di dalam dmz pastikan bahwa router anda melakukan NAT/port forwarding ke port tersebut. Pada konfigurasi ini saya menggunakan TAP device, anda juga bisa menggunakan TUN device, tergantung kebutuhan anda.
```
firewall-cmd --zone=public --add-port=1194/udp
firewall-cmd --zone=public --query-port=1194/udp
yes
```
Pastikan pula bahwa server dapat memforward trafik. Pastikan bahwa baris di bawah terdapat di dalam file /etc/sysctl.conf
```
net.ipv4.ip\_forward = 1
```
Sebelum melakukan konfigurasi server, biasanya kita perlu membatasi jumlah koneksi klien dan mendaftarkan alamat IP yang akan diberikan kepada klien. Hal ini walaupun tidak fleksibel, membuat kita memiliki kontrol penuh terhadap klien yang terkoneksi. Buatlah sebuah direktori /etc/openvpn/static-clients dan isikan dengan file konfigurasi per klien
```
sudo mkdir /etc/openvpn/static-clients
cd /etc/openvpn/static-clients
vim geeko
```
Isilah file geeko dengan baris seperti di bawah (ubah sesuai kebutuhan)
```
ifconfig-push 10.20.40.2 255.255.255.0
push "route 10.20.30.0 255.255.255.0 10.20.40.1"
push "route other\_internal\_network subnet\_address 10.20.40.1"
push "dhcp-option DNS ip\_of\_dns1"
push "dhcp-option DNS ip\_of\_dns2"
```
Selanjutnya adalah melakukan konfigurasi file /etc/openvpn/server.conf. Dalam contoh di bawah ini, ip lokal eth dari server adalah 10.20.30.10 sedangkan ip device tap0 yang akan terbentuk kalau OpenVPN server dijalankan adalah 10.20.40.1.
```
local 10.20.30.10
port 1194 #ganti dengan port yang digunakan
proto udp
dev tap0 # bisa dengan "dev tun"
#certificate configuration
ca /etc/openvpn/server/pki/ca.crt #ca certificate
cert /etc/openvpn/server/pki/issued/serverku.domain.id.crt #server certificate
key /etc/openvpn/server/pki/private/serverku.domain.id.key #server key and keep this is secret
dh /etc/openvpn/server/pki/dh.pem
#crl-verify /etc/openvpn/server/pki/crl.pem #certificate revocation list
tls-auth /etc/openvpn/server/ta.key 0 #tls-auth, 0 for server
remote-cert-tls client #important for client
#internal IP yang akan didapat setelah tersambung
topology subnet
server 10.20.40.0 255.255.255.0
client-config-dir /etc/openvpn/static-clients
client-to-client
keepalive 20 60
cipher AES-256-CBC
comp-lzo
max-clients 20
persist-key
persist-tun
daemon
status /var/log/openvpn/openvpn-status.log #openvpn status log
log-append /var/log/openvpn/openvpn.log #enable log
verb 3 #Log Level
```
Selanjutnya kita membuat 2 buah files untuk log dan status dan menjalankan service openvpn@server
```
sudo touch /var/log/openvpn/openvpn-status.log
sudo touch /var/log/openvpn/openvpn.log
sudo systemctl enable openvpn@server
sudo systemctl start openvpn@server
```
**Me-revoke sertifikat klien dan membuat sertifikat klien baru**

Jika diperhatikan konfigurasi di atas, baris crl (certificate revocation list) diberi tanda # di depannya. Hal ini karena belum ada sertifikat klien yang di-revoke. Ketika sebuah sertifikat dibatalkan maka baris tersebut harus diaktifkan dengan menghapus tanda # dan merestart OpenVPN. Cara me-revoke sebuah sertifikat adalah:
```
cd /etc/openvpn/server
./easyrsa revoke geeko
./easyrsa gen-crl /etc/openvpn/server/pki/crl.pem
```
Sedangkan untuk menambah atau membuat sertifikat baru dapat kita ulang langkah-langkah yang telah dijelaskan di atas
```
cd /etc/openvpn/client
./easyrsa gen-req client\_baru
cd/etc/openvpn/server
./easyrsa import-req ../client/pki/reqs/client\_baru.req client\_baru
./easyrsa show-req client\_baru
./easyrsa sign-req client client\_baru
```
**Konfigurasi Klien**

Seluruh langkah-langkah yang dilakukan di atas dikerjakan di server. Sekarang saatnya melakukan konfigurasi pada klien. Tentu saja yang pertama dilakukan memasang paket openvpn dari repositori. Selanjutnya mengcopy file sertifikat dan kunci yang dibutuhkan dari server, bisa dengan mengcopy melalui flashdisk, email ataupun melalui scp ke server. Pastikan file kunci tetap terjaga kerahasiannya. Selanjutnya adalah membuat file konfigurasi klien openvpn. Perhatikan langkah-langkah di bawah:
```
sudo zypper in openvpn
mkdir /home/geeko/ovpn
cd /home/geeko/ovpn
scp root@serverku.domain.id:/etc/openvpn/server/pki/ca.crt ca.srt
scp root@serverku.domain.id:/etc/openvpn/server/pki/issued/geeko.crt geeko.crt
scp root@serverku.domain.id:/etc/openvpn/client/pki/private/geeko.key geeko.key
scp root@serverku.domain.id:/etc/openvpn/server/ta.key ta.key
```
Pada saat membuat kunci klien geeko.key di server (lihat di atas) kita memasukkan password. Misalkan password kita adalah “tumbleweed” maka password ini dapat kita tulis pada sebuah file misalnya pada /home/geeko/ovpn/auth.txt agar password dapat diarahakan ke file tersebut dan kita tidak perlu mengetiknya lagi saat melakukan koneksi. Ingat untuk membuat permission nya menjadi 600 agar tidak bisa terbaca oleh user lain.

Selanjutnya tinggal membuat file log dan konfigurasi klien, seperti di bawah ini contohnya
```
sudo touch /var/log/openvpn/openvpn-status.log
sudo touch /var/log/openvpn/openvpn.log
vim /home/geeko/ovpn/geeko.ovpn
```
Isi file /home/geeko/ovpn/geeko.ovpn seperti di bawah.
```
tls-client
pull
client
dev tap
proto udp
#Server IP and Port
remote ip\_public\_server 1194 #isi ip\_public\_server dengan IP server anda
resolv-retry infinite
nobind
persist-key
persist-tun
mute-replay-warnings
askpass /home/geeko/ovpn/auth.txt
ca /home/geeko/ovpn/ca.crt
cert /home/geeko/ovpn/geeko.crt
key /home/geeko/ovpn/geeko.key
tls-auth /home/geeko/ovpn/ta.key 1
auth-nocache
remote-cert-tls server
comp-lzo
float
cipher AES-256-CBC
tls-version-min 1.2
tls-cipher TLS-DHE-RSA-WITH-AES-256-GCM-SHA384:TLS-DHE-RSA-WITH-AES-256-CBC-SHA256:TLS-DHE-RSA-WITH-AES-128-GCM-SHA256:TLS-DHE-RSA-WITH-AES-128-CBC-SHA256
status /var/log/openvpn/openvpn-status.log
log-append /var/log/openvpn/openvpn.log
verb 3
```
Untuk membuat koneksi VPN ke server dengan openvpn maka anda dapat melakukannya melalui terminal atau menggunakan networkmanager. Dengan terminal langkah-langkah yang harus dilakukan adalah
```
cd /home/geeko/ovpn
sudo openvpn --config geeko.ovpn &
```
periksa ip address anda, jika VPN terhubung maka akan terbentuk device TAP. Jalankan perintah “ip a” melalui terminal dan hasilnya harus terdapat device tap, misalnya

![Screenshot_20181113_174944.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-openvpn-pada-opensuse-leap/Screenshot_20181113_174944.png)

Koneksi dapat juga dilakukan dengan menggunakan networkmanager. Anda harus membuat koneksi baru dengan mengimpor file /home/geeko/ovpn/geeko.ovpn yang anda buat di atas.

![Screenshot_20181113_184241.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-openvpn-pada-opensuse-leap/Screenshot_20181113_184241.png)

Perhatikan bahwa password geeko.key harus anda isikan pada bagian Private Key Password

![Screenshot_20181113_175500.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-openvpn-pada-opensuse-leap/Screenshot_20181113_175500.png)

Kemudian pilih “Advanced” dan masuk ke tab “General,”aktifkan dan pilih TAP pada “Set virtual device type”, dan pastikan anda mengaktifkan “Accept authenticated packets from any address (Float)”

![Screenshot_20181113_182624.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-openvpn-pada-opensuse-leap/Screenshot_20181113_182624.png)

Selanjutnya pilih tab “TLS Settings” dan aturlah seperti contoh di bawah

![Screenshot_20181113_182828.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-openvpn-pada-opensuse-leap/Screenshot_20181113_182828.png)

Untuk melakukan koneksi anda tinggal memilih koneksi VPN pada networkmanager applet dan mengaktifkannya

![Screenshot_20181113_184502.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-openvpn-pada-opensuse-leap/Screenshot_20181113_184502.png)

**PENUTUP**

Semoga setelah membaca dan mempelajari tulisan ini Anda semua sudah bisa membuat koneksi VPN. Mungkin masih ada yang terlewat ditunggu koreksinya. Have fun!