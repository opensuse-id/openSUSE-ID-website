---
title: "Instalasi Omnibus Gitlab pada openSUSE Leap 42.2"
date: "2017-01-26"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Gitlab Community Edition (Gitlab CE) adalah salah satu tool open source untuk git repository hosting, code review, issue tracking, dan continous integration yang dapat kita pasang/install pada server kita sendiri secara bebas. Sebenarnya sudah ada pemaketan Gitlab pada OBS di openSUSE tetapi cara..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/instalasi-omnibus-gitlab-pada-opensuse-leap-42-2/gitlab-logo-square.png"
---

[![gitlab-logo-square](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/instalasi-omnibus-gitlab-pada-opensuse-leap-42-2/gitlab-logo-square.png)Gitlab](https://about.gitlab.com/community/) Community Edition ([Gitlab CE](https://gitlab.com/gitlab-org/gitlab-ce)) adalah salah satu tool open source untuk git *repository hosting, code review, issue tracking,* dan *continous integration* yang dapat kita pasang/*install* pada server kita sendiri secara bebas. Sebenarnya sudah ada pemaketan Gitlab pada OBS di openSUSE tetapi cara mengkonfigurasinya tidaklah terlalu mudah. Gitlab merupakan suatu tools yang cukup kompleks di mana dalam pemasangannya membutuhkan Ruby, sidekiq, nginx, postgresql, redis dan unicorn.

Cara termudah untuk memasang Gitlab pada server mungkin adalah dengan menggunakan image docker dari docker-hub. Tetapi di sini kita akan membahas pemasangan [Omnibus Gitlab](https://gitlab.com/gitlab-org/omnibus-gitlab) yang juga sudah menyediakan pemaketan untuk [openSUSE](https://about.gitlab.com/downloads/#opensuse421). Omnibus Gitlab akan membentuk suatu lingkungan kerja (*environment*) tersendiri di mana akan secara otomatis memasang komponen-komponen yang dibutuhkan oleh Gitlab, termasuk semua yang sudah disebutkan di atas. Bagi anda yang pernah melakukan pemrograman dengan Ruby atau Python pasti memahami bahwa menjalankan aplikasi Ruby atau Python termudah adalah dengan menggunakan *environment* tersendiri. Omnibus Gitlab telah memaketkan semua dependensi dan lingkungan Ruby yang dibutuhkan untuk memasang dan menjalankan Gitlab CE. Perlu diketahui bahwa YaST dikembangkan menggunakan Ruby, python, dan C++ tetapi hampir semua fungsinya dipanggil lewat Ruby melalui yast-ruby-bindings. Hindari mencoba melakukan instalasi manual terhadap rubygem (kalau anda tidak mengerti apa yang anda lakukan) karena dapat mempengaruhi fungsionalitas dari YaST 🙂

Berikut adalah langkah-langkahnya yang sudah dicoba pada openSUSE Leap 42.2.

Pastikan anda sudah menginstall paket curl, openssh, dan postfix (instalasi standar minimal server harusnya sudah mengikutkan semua paket itu). Selanjutnya pastikan openssh dan postfix dipanggil saat boot, harusnya sudah tapi jika tidak anda dapat menjankan perintah
```
systemctl enable postfix.service
systemctl start postfix.service
systemctl enable sshd.service
systemctl start sshd.service
```
Pastikan bahwa port tcp 22, 25, 80, 443, 465, 587 dibuka di SuSEfirewall2. Periksa pengaturan SuSEfirewall2 anda pada file /etc/sysconfig/SuSEfirewall2.

Download paket gitlab-ce dari repository gitlab untuk openSUSE 42.1. Saat tulisan ini dibuat baru ada gitlab-ce utk openSUSE 42.1 tapi saya sudah menggunakannya di 42.2 dan tetap berfungsi dengan baik
```
zypper ar 'https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/config\_file.repo?os=opensuse&amp;amp;dist=42.1&amp;amp;source=script'
zypper in gitlab-ce
```
atau dengan mengikuti cara di [gitlab.com](https://packages.gitlab.com/gitlab/gitlab-ce/packages/opensuse/42.1/gitlab-ce-8.16.2-ce.0.sles42.x86_64.rpm)
```
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
zypper install gitlab-ce-8.16.2-ce.0.sles42.x86\_64
```
File konfigurasi gitlab terdapat pada /etc/gitlab/gitlab.rb . Jika server anda hanya menjalankan service gitlab maka proses pemasangan dengan cara di atas sudah cukup. Tetapi jika anda menggunakan server anda untuk beberapa web service maka penggunaan nginx external sangat dibutuhkan. Juga jika anda ingin lebih fleksibel dalam mengelola data, maka penggunaan database postgresql external juga disarankan.

Jika penggunaan nginx bawaan dari paket omnibus gitlab sudah cukup maka anda tidak perlu melakukan konfigurasi lain, anda cukup memastikan bahwa pada file /etc/gitlab/gitlab.rb nama server anda sudah dikonfigur dengan benar, misalnya
```
## Configuration options with # in front are not active and they were
## valid at install time. Updating the package does not update this file
## automatically.
## Latest options listed at:
## https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/files/gitlab-config-template/gitlab.rb.template
## URL on which GitLab will be reachable.
## For more details on configuring external\_url see:
## https://docs.gitlab.com/omnibus/settings/configuration.html#configuring-the-external-url-for-gitlab
external\_url 'http://gitlab.opensuse.id'
```
selanjutnya jalankan perintah
```
gitlab-ctl reconfigure
```
buka browser anda dan arahkan ke url sesuai url server gitlab anda.

Untuk penggunaan nginx eksternal akan kita bahas pada bagian selanjutnya. Sedangkan untuk menggunakan postgresql eksternal silakan anda mencobanya sendiri dengan menggunakan panduan dari [gitlab](https://docs.gitlab.com/omnibus/settings/database.html#using-a-non-packaged-postgresql-database-management-server)

**Menggunakan nginx eksternal untuk Omnibus Gitlab**

Jika server anda juga digunakan untuk virtual host lain maka penggunaan nginx (atau web server lain misalnya apache) eksternal menjadi kebutuhan. Hal ini dapat dilakukan dengan sedikit memodifikasi /etc/gitlab/gitlab.rb dan membuat vhost untuk gitlab melalui nginx. Berikut langkah-langkahnya.

Pastikan anda menginstall nginx.
```
zypper in nginx
systemctl enable nginx.service
systemctl start nginx.service
```
Jika anda menggunakan https, catatlah lokasi anda menyimpan sertifikat dan key karena nanti akan dipanggil melalui konfigurasi nginx. Misalkan anda membuat vhost untuk url https://gitlab.opensuse.id maka anda harus membuat sebuah konfigurasi di ***/etc/nginx/vhost.d/gitlab.opensuse.id.conf***. Bukalah editor dan buatlah sebuah konfigurasi seperti contoh di bawah (silakan disesuaikan dengan implementasi anda)
```
upstream gitlab-workhorse {
server unix:/var/opt/gitlab/gitlab-workhorse/socket fail\_timeout=0;
}
map $http\_upgrade $connection\_upgrade\_gitlab\_ssl {
default upgrade;
'' close;
}
server {
listen \*:80;
server\_name gitlab.opensuse.id;
server\_tokens off;
return 301 https://$host$request\_uri;
access\_log /var/log/nginx/gitlab\_opensuse\_id\_access.log;
error\_log /var/log/nginx/gitlab\_opensuse\_id\_error.log;
}
server {
listen \*:443 ssl;
server\_name gitlab.opensuse.id;
server\_tokens off;
access\_log /var/log/nginx/gitlab\_opensuse\_id\_access.log;
error\_log /var/log/nginx/gitlab\_opensuse\_id\_error.log;
ssl on;
ssl\_certificate /etc/certbot/live/gitlab.opensuse.id/fullchain.pem;
ssl\_certificate\_key /etc/certbot/live/gitlab.opensuse.id/privkey.pem;
ssl\_dhparam /etc/ssl/dhparams.pem;
ssl\_session\_timeout 5m;
ssl\_session\_cache shared:SSL:10m;
ssl\_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl\_prefer\_server\_ciphers on;
ssl\_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
add\_header Strict-Transport-Security "max-age=31536000";
location / {
client\_max\_body\_size 0;
gzip off;
proxy\_read\_timeout 300;
proxy\_connect\_timeout 300;
proxy\_redirect off;
proxy\_http\_version 1.1;
proxy\_set\_header Host $http\_host;
proxy\_set\_header X-Real-IP $remote\_addr;
proxy\_set\_header X-Forwarded-Ssl on;
proxy\_set\_header X-Forwarded-For $proxy\_add\_x\_forwarded\_for;
proxy\_set\_header X-Forwarded-Proto $scheme;
proxy\_set\_header Upgrade $http\_upgrade;
proxy\_set\_header Connection $connection\_upgrade\_gitlab\_ssl;
proxy\_pass http://gitlab-workhorse;
}
error\_page 404 /404.html;
error\_page 422 /422.html;
error\_page 500 /500.html;
error\_page 502 /502.html;
error\_page 503 /503.html;
location ~ ^/(404|422|500|502|503)\.html$ {
root /opt/gitlab/embedded/service/gitlab-rails/public;
internal;
}
}
```
Selanjutnya bukalah file ***/etc/gitlab/gitlab.rb*** dan lakukan beberapa penyesuaian konfigurasi sebagai berikut:  
Sesuaikan url anda ke https
```
## URL on which GitLab will be reachable.
## For more details on configuring external\_url see:
## https://docs.gitlab.com/omnibus/settings/configuration.html#configuring-the-external-url-for-gitlab
external\_url 'https://gitlab.opensuse.id'
nginx['redirect\_http\_to\_https'] = true
```
Pada bagian gitlab.yml configuration, isilah ip address trusted\_proxies dengan ip address server di mana nginx berjalan (tuliskan setiap ip address dari mesin tersebut)
```
############################
# gitlab.yml configuration #
############################
....
gitlab\_rails['trusted\_proxies'] = [ '139.0.6.173' ]
```
Pada bagian Gitlab Web server masukkan nama user yang menjalankan nginx. Pada openSUSE nginx dijalankan oleh user nginx
```
#####################
# GitLab Web server #
#####################
...
web\_server['external\_users'] = ['nginx']
```
Catatan:  
instalasi paket gitlab dilakukan ke direcktori /opt/gitlab dan /var/opt/gitlab yang ownershipnya dipegang oleh root:root. Menurut dokumentasi gitlab, instalasi gitlab akan membuat group gitlab-www untuk menjalankan webserver bawaan (nginx). Jika ada masalah dalam pengaksesan ketika menggunakan nginx eksternal kemungkinan besar masalahnya adalah dalam ownership atau group. Karena itu sebaiknya user nginx dan root dimasukkan ke dalam group gitlab-www. Jalankan pada konsole/terminal perintah berikut utk menambahkan user nginx dan root ke dalam group gitlab-www
```
usermod -aG gitlab-www nginx
usermod -aG gitlab-www root
```
Kembali ke file /etc/gitlab/gitlab.rb, carilah bagian Gitlab Nginx dan pastikan nginx bawaan tidak digunakan (false) serta jangan lupa untuk mensetup XFF untuk header nginx agar tidak bermasalah dengan https. Bukalah editor anda dan lakukan perubahan sebagai berikut
```
################
# GitLab Nginx #
################
...
nginx['enable'] = false
...
nginx['proxy\_set\_headers'] = {
"Host" =&gt; "$http\_host",
"X-Real-IP" =&gt; "$remote\_addr",
"X-Forwarded-For" =&gt; "$proxy\_add\_x\_forwarded\_for",
"X-Forwarded-Proto" =&gt; "https",
"X-Forwarded-Ssl" =&gt; "on",
"Upgrade" =&gt; "$http\_upgrade",
"Connection" =&gt; "$connection\_upgrade"
}
```
Selanjutnya tinggal merestart service nginx dan gitlab. Berdoalah semoga semua lancar-lancar saja :-).
```
gitlab-ctl reconfigure
gitlab-ctl restart
systemctl restart nginx.service
```
Bukalah browser dan arahkan ke alamat web gitlab server anda. Saat pertama kali diakses maka gitlab memberikan default user=root dengan password=password. Segera login dan gantilah password tersebut.  
![Screenshot_20170126_174515](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/instalasi-omnibus-gitlab-pada-opensuse-leap-42-2/Screenshot_20170126_174515.png)

Semoga tulisan ini bermanfaat.

Tambahan:  
Sekiranya anda melakukan update terhadap paket gitlab, misalnya anda melakukan zypper up dan gitlab ikut terupdate. Bisa jadi gitlab tidak mau direstart. Jangan panik, coba lakukan langkah di bawah ini. Gitlab harusnya beroperasi normal kembali:-)
```
sudo ln -sf \
/opt/gitlab/bin/gitlab-ctl \
/opt/gitlab/bin/gitlab-rake \
/opt/gitlab/bin/gitlab-rails \
/opt/gitlab/bin/gitlab-ci-rake \
/opt/gitlab/bin/gitlab-ci-rails \
/usr/bin/
gitlab-ctl reconfigure
gitlab-ctl restart
systemctl restart nginx.service
```