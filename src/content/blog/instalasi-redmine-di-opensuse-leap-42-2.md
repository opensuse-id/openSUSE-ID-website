---
title: "Instalasi Redmine di openSUSE Leap 42.2"
date: "2017-02-10"
author: "Tim openSUSE Indonesia"
category: komunitas
excerpt: "Salah satu tools yang digunakan oleh openSUSE dalam proses pengembangan adalah Redmine. Bagi yang pernah melaporkan permasalahan seputar pengembangan openSUSE melalui https://progress.opensuse.org pasti mengetahuinya. Redmine adalah alat bantu manajemen proyek dan pelacak isu berbasis web (web-ba..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/instalasi-redmine-di-opensuse-leap-42-2/200px-Redmine_logo.svg_.png"
---

Salah satu tools yang digunakan oleh openSUSE dalam proses pengembangan adalah Redmine. Bagi yang pernah melaporkan permasalahan seputar pengembangan openSUSE melalui [https://progress.opensuse.org](https://progress.opensuse.org/) pasti mengetahuinya.

![Screenshot_20170127_145549](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/instalasi-redmine-di-opensuse-leap-42-2/Screenshot_20170127_145549.png) 

![Screenshot_20170127_145645](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/instalasi-redmine-di-opensuse-leap-42-2/Screenshot_20170127_145645.png)

[Redmine](http://www.redmine.org/) adalah alat bantu manajemen proyek dan pelacak isu berbasis web (web-based project management and issue tracking tool) bebas sumber terbuka. Redmine dikembangkan menggunakan Ruby on Rails dengan lisensi GNU General Public License v2 (GPL). Ruby adalah salah satu bahasa yang “ajib” dan Ruby on Rails adalah framework yang keren. Sekali lagi Ruby seperti halnya python membutuhkan environment yang diset sesuai dengan versi dari Ruby yang digunakan. Yast2 juga dikembangkan dengan Ruby dan bagi anda yang belum pernah melakukan implementasi Ruby banyak-banyaklah bertanya dan latihan. Jangan melakukan update manual terhadap paket Ruby kalau anda tidak mengerti apa yang anda lakukan, salah-salah Yast2 anda akan berhenti bekerja 🙂

Ada banyak tools yang fungsinya mirip-mirip dengan Redmine, JIRA dari Atlassian misalnya. Atlassian memang salah satu pemain besar dalam bidang ini dengan produk-produknya seperti Bitbucket, Sourcetree dan baru-baru ini mereka mengakuisisi trello. Kita tidak akan membandingkan Redmine dengan JIRA silakan anda bandingkan sendiri 🙂

Sebenarnya sudah ada yang memaketkan Redmine di OBS, ada di home nya darix. Tapi di sini saya akan menunjukkan bagaimana menginstal dari source Redmine yang diunduh dari websitenya dan menggunakan **nginx** serta **postgresql** dalam implementasinya. Ayo kita mulai.

Unduh Redmine dari [sini](http://www.redmine.org/projects/redmine/wiki/Download).

**Install postgresql**
```
zypper in postgresql
```
Selanjutnya buatlah sebuah database production dan user untuk Redmine pada postgresql, misalnya kita akan membuat database redmine\_db dan user redmine.
```
su - postgres
createuser redmine
psql
alter user redmine with encrypted password 'my\_password' noinherit valid until 'infinity';
create database redmine\_db with encoding='UTF8' owner=redmine;
```
Anda dapat juga menambahkan database lain untuk Redmine misalnya untuk development dan test.

Lakukan perubahan seperlunya pada /var/lib/pgsql/data/pg\_hba.conf, misalnya menjadi:
```
local all all md5
host all all 127.0.0.1/32 md5
host all all ::1/128 md5
host all all 0.0.0.0/0 md5
```
Juga perubahan seperlunya untuk /var/lib/pgsql/data/postgresql.conf, misalnya pada bagian connections dan authentications
```
listen\_addresses = '\*'
port = 5432
```
Selanjutnya enable dan restart postgresql
```
systemctl enable postgresql.service
systemctl start postgresql.service
```
**Instalasi Redmine**  
Ekstrak Redmine dan letakkan di /srv/www/vhosts/redmine
```
tar -xvzf redmine-3.3.2.tar.gz
mv redmine-3.3.2 /srv/www/vhosts/redmine
chown -R redmine:redmine /srv/www/vhosts/redmine
```
Selanjutnya copy file /srv/www/vhosts/redmine/config/configuration.yml.example menjadi /srv/www/vhosts/redmine/config/configuration.yml dan /srv/www/vhosts/redmine/config/database.yml.example menjadi /srv/www/vhosts/redmine/config/database.yml
```
cp /srv/www/vhosts/redmine/config/configuration.yml.example /srv/www/vhosts/redmine/config/configuration.yml
cp /srv/www/vhosts/redmine/config/database.yml.example /srv/www/vhosts/redmine/config/database.yml
```
Pengaturan yang penting diperhatikan pada configuration.yml adalah pengaturan email. Pada openSUSE, Postfix harusnya secara default sudah terinstall, pastikan bahwa service postfix jalan. Jika anda tidak ingin Redmine mengirimkan email maka pastikan anda memberi comment (#) pada seluruh bagian “email\_delivery:”. Jika anda menginginkan postfix di mesin lokal mengirimkan email setiap ada perubahan issue pada Redmail maka pastikan bagian “email\_delivery:” berisi:
```
email\_delivery:
# ==== Simple SMTP server at localhost
#
# email\_delivery:
delivery\_method: :smtp
smtp\_settings:
address: "localhost"
port: 25
```
Jika anda sudah memiliki akun email (bisa saja pada server email lain) dan menginginkan akun tersebut yang mengirimkan email setiap ada penambahan issue pada Redmine maka lakukan perubahan pada configuration.yml menjadi seperti:
```
email\_delivery:
# email\_delivery:
delivery\_method: :smtp
smtp\_settings:
enable\_starttls\_auto: true
address: "smtp.google.com"
port: 587
domain: "gmail.com" # 'your.domain.com' for GoogleApps
authentication: :plain
user\_name: "redmine\_saya@gmail.com"
password: "mypassword"
```
Untuk database.yml, karena kita menggunakan postgresql maka pastikan bahwa adapter yang digunakan adalah postgresql. Pastikan anda memberi comment (#) untuk adapater yang lain.
```
production:
adapter: postgresql
database: redmine\_db
host: localhost
username: redmine
password: "my\_password"
encoding: utf8
development:
adapter: postgresql
database: redmine\_development\_db
host: localhost
username: redmine
password: "my\_password"
encoding: utf8
test:
adapter: postgresql
database: redmine\_test\_db
host: localhost
username: redmine
password: "my\_password"
encoding: utf8
```
Kemudian jalankan perintah-perintah di bawah ini untuk mengunduh gem yang dibutuhkan oleh Redmine
```
gem install bundler
gem update --system
bundle install --without development test
bundle exec rake generate\_secret\_token
```
Kadangkala bisa terjadi ada gem yang tidak terinstall, jangan panik. Sistem akan menunjukkan gem apa dan versi berapa yang belum terinstal. Ulangi dengan instal manual, misalnya:
```
gem install rails-dom-testing -v '1.0.8' && bundle install
```
Jika instalasi gem dan bundle sudah selesai, lanjutkan dengan langkah berikut
```
RAILS\_ENV=production bundle exec rake db:migrate
RAILS\_ENV=production bundle exec rake redmine:load\_default\_data
mkdir -p tmp tmp/pdf public/plugin\_assets
sudo chown -R redmine:redmine files log tmp public/plugin\_assets
sudo chmod -R 755 files log tmp public/plugin\_assets
```
Kalau langkah-langkah di atas berhasil tanpa ada pesan kesalahan, maka lanjutkan langkah terakhir untuk menyalakan service dari Redmine
```
bundle exec rails server webrick -e production &
```
Hasilnya adalah sebagai berikut:  
![Screenshot_20170210_074808.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/instalasi-redmine-di-opensuse-leap-42-2/Screenshot_20170210_074808.png)

Redmine akan berjalan pada port 3000, cek ulang dengan netstat dan pastikan sudah berjalan:
```
netstat -tulpn | grep 3000
```
**Konfigurasi nginx**  
Langkah terakhir yang harus dilakukan adalah menyiapkan konfigurasi vhost nginx dan mengalihkan setiap request menuju port 80 ke upstream port 3000 dimana Redmine bekerja.

Untuk http, buatlah sebuah file untuk vhost misalnya di /etc/nginx/vhosts.d/redmine.opensuse.id.conf (asumsi nama server nantinya redmine.opensuse.id, ganti sesuai dengan nama server anda) dengan isi:
```
server {
listen 80;
server\_name redmine.opensuse.id;
server\_tokens off;
client\_max\_body\_size 20m;
access\_log /var/log/nginx/redmine\_opensuse\_id\_access.log;
error\_log /var/log/nginx/redmine\_opensuse\_id\_error.log;
location ~ \.\*$ {
proxy\_pass http://127.0.0.1:3000;
}
location / {
root /srv/www/vhosts/redmine/public;
index index.html index.htm;
autoindex on;
autoindex\_exact\_size on;
autoindex\_localtime on;
}
# redirect server error pages to the static page /50x.html
#
error\_page 500 502 503 504 /50x.html;
location = /50x.html {
root html;
}
}
```
Jika anda menggunakan https, maka file di atas isinya kira-kira (sesuaikan dengan kondisi implementasi anda):
```
server {
listen 80;
server\_name redmine.opensuse.id;
return 301 https://$host$request\_uri;
server\_tokens off;
client\_max\_body\_size 20m;
}
server {
listen \*:443 ssl;
server\_name redmine.opensuse.id;
server\_tokens off;
access\_log /var/log/nginx/redmine\_opensuse\_id\_access.log;
error\_log /var/log/nginx/redmine\_opensuse\_id\_error.log;
ssl on;
ssl\_certificate /etc/certbot/live/redmine.opensuse.id/fullchain.pem;
ssl\_certificate\_key /etc/certbot/live/redmine.opensuse.id/privkey.pem;
ssl\_dhparam /etc/ssl/dhparams.pem;
ssl\_session\_timeout 5m;
ssl\_session\_cache builtin:1000 shared:SSL:10m;
ssl\_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl\_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
ssl\_prefer\_server\_ciphers on;
##HSTS
add\_header Strict-Transport-Security "max-age=31536000";
# force https-redirects
if ($scheme = http) {
return 301 https://$server\_name$request\_uri;
}
location ~ \.\*$ {
proxy\_pass http://127.0.0.1:3000;
}
location / {
root /srv/www/vhosts/redmine/public;
index index.html index.htm;
autoindex on;
autoindex\_exact\_size on;
autoindex\_localtime on;
}
# redirect server error pages to the static page /50x.html
#
error\_page 500 502 503 504 /50x.html;
location = /50x.html {
root html;
}
}
```
Selanjutnya enable dan start nginx
```
systemctl enable nginx.service
systemctl start nginx.service
```
Bukalah browser anda menuju ke alamat yang sesuai dengan nama server yang di-publish, misalnya https://redmine.opensuse.id/login. Isi dengan default user = admin, default password = admin dan segera ganti password tersebut.

Selamat mencoba dan semoga bermanfaat.