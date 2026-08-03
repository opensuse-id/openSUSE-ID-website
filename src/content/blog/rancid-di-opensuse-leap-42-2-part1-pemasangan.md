---
title: "RANCID di OpenSUSE Leap 42.2 [part1: pemasangan]"
date: "2017-02-01"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "RANCID, satu hal yang muncul di pikiran saya ketika mendengar kata ini adalah sebuah lantunan lagu berjudul “Radio Havana” yang dibawakan oleh grup punk legendaris dari Berkeley, California. Ketahuilah mereka dan lagunya itu sangat keren, tapi saat ini adalah lain hal yang akan kita bahas. RANCID..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part1-pemasangan/shrubbery.jpg"
---

**![radiohavanapromo2.jpg](https://www.rancid-discography.com/promocds/radiohavanapromo2.jpg) RANCID**, satu hal yang muncul di pikiran saya ketika mendengar kata ini adalah sebuah lantunan lagu berjudul “[Radio Havana](https://www.youtube.com/watch?v=NoV0l-mrVIg)” yang dibawakan oleh grup punk legendaris dari Berkeley, California. Ketahuilah mereka dan lagunya itu sangat keren, tapi saat ini adalah lain hal yang akan kita bahas.

[RANCID](http://www.shrubbery.net/rancid/) – **Really Awesome New Cisco confIg Differ,** adalah sebuah aplikasi dari Shrubbery Networks Inc. yang berguna untuk memantau konfigurasi dari perangkat jaringan dan menampungnya pada sebuah repo dengan *[version control](https://en.wikipedia.org/wiki/Version_control)* ([CVS](https://en.wikipedia.org/wiki/Concurrent_Versions_System) atau [SVN](https://en.wikipedia.org/wiki/Apache_Subversion)) sehingga kita dapat melihat setiap perubahan yang terjadi pada perangkat yang di monitor tersebut.

Dengan lisensi BSD-Style, tools satu ini benar-benar powerfull seperti malaikat bagi para operator yang mencari backup config saat perangkat jaringannya mati mendadak atau bermasalah. Sebelumnya, bahasan ini akan saya buat menjadi 3 bagian (pemasangan, tambah perangkat, web-based).

Berikut adalah langkah-langkah tahap satu seputar bahasan pemasangan RANCID yang saya lakukan di mesin OpenSuse Leap 42.2 :

* **Unduh berkas RANCID dari laman resmi Shrubbery Inc. (current ver : 3.6.2)**  
  `$ wget -c ftp://ftp.shrubbery.net/pub/rancid/rancid-3.6.2.tar.gz`

* **Pasang paket pendukung**
  ```
  $ zypper install expect \  
  > make \  
  > autoconf \  
  > gcc \  
  > subversion \  
  > subversion-perl \  
  > subversion-devel \  
  > subversion-tools
  ```
* **Ekstrak berkas dan konfigur kode sumber**  
  ```
  $ tar xzvf rancid-3.6.2.tar.gz  
  cd rancid-3.6.2/  
  ./configure --prefix=/ \  
  > --exec-prefix=/usr \  
  > --bindir=/usr/bin \  
  > --sbindir=/usr/sbin \  
  > --libexecdir=/usr/libexec \  
  > --sysconfdir=/etc/rancid \  
  > --sharedstatedir=/var/lib/rancid/com \  
  > --localstatedir=/var/lib/rancid \  
  > --libdir=/usr/lib \  
  > --includedir=/usr/include \  
  > --oldincludedir=/usr/include \  
  > --datarootdir=/usr/share \  
  > --datadir=/usr/share \  
  > --infodir=/usr/share/info \  
  > --localedir=/usr/share/locale \  
  > --mandir=/usr/share/man \  
  > --docdir=/usr/share/doc/packages/rancid \  
  > --htmldir=/usr/share/doc/packages/rancid \  
  > --dvidir=/usr/share/doc/packages/rancid \  
  > --pdfdir=/usr/share/doc/packages/rancid \  
  > --psdir=/usr/share/doc/packages/rancid \  
  > --with-svn=fsfs
  ```
* **Kompilasi dan pasang paket**  
  `$ make && make install`

* **Buat user dan grup RANCID**  
  `$ groupadd rancid`  
  `$ useradd -g rancid -c "Network Backups" -d /etc/rancid rancid`

* **Atur hak akses RANCID**  
  `$ cp cloginrc.sample /etc/rancid/.cloginrc  
  $ chmod 0640 /etc/rancid/.cloginrc  
  $ chmod 770 /usr/share/rancid  
  $ chmod 770 /var/lib/rancid  
  $ chown -R rancid:rancid /usr/share/rancid  
  $ chown -R rancid:rancid /var/lib/rancid  
  $ chown -R rancid:rancid /etc/rancid`

* **Masuk ke user RANCID, dan buat nama grup dari list perangkat yang nanti akan ditambahkan**  
  `$ su - rancid`  
  ![masukrancid](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part1-pemasangan/masukrancid.png)  
  `$ vi /etc/rancid/rancid.conf`  
   **Sunting pada line di bawah ini (nama list grup saya adalah ‘MYLAB‘) :**

  ``` 
  ... 
  <109> LIST_OF_GROUPS="MYLAB" 
  ... 
  ```

  ![gruprancid](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part1-pemasangan/gruprancid.png)  
  **Masih di file yang sama, cek line versioning control, ganti ke SVN karena saya akan memakai subversion :**

   ``` 
   ... 
   <57> CVSROOT=$BASEDIR/SVN; export CVSROOT 
   ... 
   <64>RCSSYS=svn; export RCSSYS 
   ... 
   ```

  ![svnbasedir](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part1-pemasangan/svnbasedir.png)
* **Setelah menyimpan konfigurasi, lanjut init repo sesuai berkas konfig**  
  `$ rancid-cvs MYLAB`  
  ![buatreporancid](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part1-pemasangan/buatreporancid.png)  
  Jika sukses, maka akan muncul 3 direktori pada */var/lib/rancid* :  
  ![verifikasisukses](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/rancid-di-opensuse-leap-42-2-part1-pemasangan/verifikasisukses.png)

Sampai di sini proses pemasangan RANCID telah selesai, pada tahap kedua, akan kita bahas mengenai penambahan perangkat. Happy Salma! 😉