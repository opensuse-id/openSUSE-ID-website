---
title: "RANCID di OpenSUSE Leap 42.2 [part2: tambah perangkat]"
date: "2017-02-04"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Oke, kali ini kita akan membahas tahap kedua dari bahasan pertama sebelumnya seputar pemasangan RANCID. Ada 2 perangkat untuk pengujian yang masuk lab yaitu Mikrotik dan Cisco Catalyst Switch, sedangkan RANCID akan berjalan di atas mesin OpenSUSE Leap 42.2. Perlu diketahui juga, cukup banyak tipe..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part2-tambah-perangkat/topologi.png"
---

Oke, kali ini kita akan membahas tahap kedua dari bahasan pertama sebelumnya [seputar pemasangan RANCID](https://opensuse.id/blog/rancid-di-opensuse-leap-42-2-part1-pemasangan/). Ada 2 perangkat untuk pengujian yang masuk lab yaitu Mikrotik dan Cisco Catalyst Switch, sedangkan RANCID akan berjalan di atas mesin OpenSUSE Leap 42.2.

Perlu diketahui juga, cukup banyak tipe perangkat yang didukung oleh RANCID, anda dapat melihatnya **[di sini](http://www.shrubbery.net/rancid/man/router.db.5.html)**.

Pertama-tama kita buat dulu skema seperti apa yang akan di buat, misalnya kita buat topologi seperti di bawah ini untuk implementasi selanjutnya :

![topologi.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part2-tambah-perangkat/topologi.png)

*Mikrotik a.k.a **Router** = **IP 10.64.1.80***  
*Cisco Catalyst a.k.a **Switch** = **IP 10.64.1.122***  
*OpenSUSE di Laptop a.k.a **RANCID Server** = **IP 10.64.1.226***

---

Sebelum memulai jangan lupa memastikan grup list devices/perangkat di RANCID yang sudah dibuat [(lihat tahap 1)](https://opensuse.id/blog/rancid-di-opensuse-leap-42-2-part1-pemasangan/) tersedia, semua perangkat dapat terhubung, username+password masing-masing perangkat sudah di konfigurasi, kemudian lakukan langkah-langkah selanjutnya :

* **Pastikan semua perangkat dalam kondisi aktif, sehat wal’ afiat dan saling berkomunikasi**  
  `$ echo 10.64.1.80 10.64.1.122 | xargs -n1 ping -w 1`  
  ![pingtest-300x182.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part2-tambah-perangkat/pingtest.png)

* **Tambahkan perangkat jaringan (router, switch, dsb) pada RANCID** */etc/hosts* = berfungsi untuk menambahkan hostname perangkat yang akan kita tampung pada DNS/hosts file.  
  `$ vi /etc/hosts`

  ``` 
  # MYLAB
  10.64.1.80       mikrotikro
  10.64.1.122      ciscosw  
  ```

* **Buat kredensial pada perangkat yang akan kita backup konfigurasinya** */etc/rancid/.cloginrc* = berfungsi untuk mengatur kredensial termasuk username, password, dan metode untuk mengakses perangkat dalam jaringan yang ingin di remote oleh server RANCID.  
  `$ vi /rancid/.cloginrc`
  (Isi berkas tersebut sesuai dengan konfigurasi perangkat. Pada case ini,  
  saya menonaktifkan semua opsi pada berkas, dan menambahkan perintah  
  di bawah ini pada baris baru/baris paling akhir) 
  ```
  ## MYLAB

  add password    mikrotikro       r4!nc!1d
  add user        mikrotikro       rancid
  add method      mikrotikro       telnet
  add autoenable  mikrotikro       1

  add password    ciscosw          r4!nc!1d
  add user        ciscosw          rancid
  add method      ciscosw          telnet
  add autoenable  ciscosw          1
  ```

* **Definisikan status dari list perangkat pada repositori yang dibuat di RANCID** *router.db* = setelah menambahkan hostname pada perangkat, membuat kredensial agar server dapat masuk ke perangkat yang akan dimonitor, tugas selanjutnya adalah mengkonfirmasi tipe dan status kedua perangkat tersebut pada repositori yang kita buat sebelumnya *(“**MYLAB**“)* agar dikenali oleh RANCID. Secara default, berkas router.db belum ada isinya, silahkan isi dengan format :  
  *“<hostname>:<[tipe-perangkat](http://www.shrubbery.net/rancid/man/router.db.5.html)>:<status-up-atau-down>“*  
  `$ vi /var/lib/rancid/MYLAB/router.db`

  ```
  mikrotikro:mikrotik:up 
  ciscosw:cisco:up
  ```

* **EKSEKUSI!** Setelah semua proses pemasangan dan konfigurasi sudah kita kerjakan. Silahkan test login ke perangkat dan test proses pengambilan data konfigurasi pada perangkat yang sudah kita buat serta cek juga log pengetesannya, jika sukses akan tampil seperti video/gambar di bawah ini.  
    ```
    $ su - rancid  
    $ /usr/bin/clogin <ip/domain perangkat>``$ /usr/bin/rancid-run  
    ```

    <video controls>
    <source src="https://github.com/cho2/osid-img-restore/raw/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part2-tambah-perangkat/rancid.mp4" type="video/mp4">
    </video>
    
  >> Log dari service yang dijalankan dapat di lihat di /var/lib/rancid/logs   
  >> Berkas konfig yang telah dibackup dapat di lihat di  /var/lib/rancid/MYLAB/configs/ 

  ![lsbackup-1024x610.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part2-tambah-perangkat/lsbackup.png)

* **Penjadwalan Otomatis** Agar RANCID dapat berjalan otomatis dan melakukan backup konfigurasi pada waktu-waktu tertentu, maka kita harus menambahkan jadwalnya pada cronjob.  
`$ crontab -e`
  ```
  # jalankan rancid tiap 30 menit 
  */30 * * * * /usr/bin/rancid-run
  ```
Sip, tahap kedua selesai kita kerjakan. Sebenarnya semua konfigurasi dan pekerjaan pemasangan RANCID sudah selesai pada tahap ini, namun karena materi ini ada 3 tahapan, maka pada bahasan ketiga nanti, kita akan membuat tampilan web-based agar lebih manusiawi untuk dilihat 😀

> *NB: Bila Anda menemukan error :  
> **“WARNING: Have you forgotten to update the FS in router.db?”** ,  
> **JANGAN PANIK!** coba buka berkas ‘../router.db‘ lalu ganti tanda titik dua (:) dengan titik koma (;) sebagai pemisah format lalu jalankan kembali ‘usr/bin/rancid-run‘ dan cek lognya lagi (seharusnya sukses dan normal kembali).*
