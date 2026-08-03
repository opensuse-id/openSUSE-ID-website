---
title: "Memasang pgadmin4 pada Tumbleweed"
date: "2018-09-29"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Singkat cerita saya meng-upgrade postgresql dari 9.6 ke 10.5, dan ketika mengaksesnya dengan pgadmin3 ada peringatan bahwa pgadmin3 tidak fully support postgresql di atas 10.0.0. Wah… Saya cek ke website nya ternyata pengembangan pgadmin3 sudah dihentikan, dan pengguna disarankan pindah ke pgadmi..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-pgadmin4-pada-tumbleweed/pgAdmin4.png"
---

Singkat cerita saya meng-*upgrade* postgresql dari 9.6 ke 10.5, dan ketika mengaksesnya dengan pgadmin3 ada peringatan bahwa pgadmin3 tidak *fully support* postgresql di atas 10.0.0. Wah… Saya cek ke *website* nya ternyata pengembangan pgadmin3 sudah dihentikan, dan pengguna disarankan pindah ke pgadmin4. Terus terang terakhir kali menggunakan pgadmin4 masih kurang nyaman. Sempat berpikir kalau mau menggunakan phpPgAdmin, tapi kawan-kawan pada protes, mereka nggak suka (di) php (in).

Kami menggunakan postgresql karena bisa dengan mudah dilakukan *query* lokasi terhadap obyek geografis dengan bantuan PostGIS. Maklum kerjaan kami agak nyerempet-nyerempet tukang ukur tanah, *tracking*, survey. [PostGIS](https://postgis.net/) itu *spatial database extender* khusus untuk PostgreSQL. Terima kasih utk semua pengembangnya. Bayangkan kita bisa dengan mudah dan gratis menikmati fitur yang biasanya hanya terdapat pada *database* yang mahal. Mau ngebayangin apa itu? Silakan lihat-lihat demo implementasinya di map viewer sederhana ini [NSI Map Viewer](https://telisik.nsi.co.id/map-viewer/dist/#/). Harap dimaklumi kalau agak lambat itu cuma demo sederhana di kvm dengan *resource* yang terbatas. Aplikasi data spasial berbasis web (web gis) memang lumayan boros dumber daya.

Saya mencoba mencari pgadmin4 di repositori resmi openSUSE ternyata pgadmin4 belum tersedia dan paket yang terdapat di OBS ternyata mengalami masalah dalam dependesinya. Sehingga pgadmin4 saya download dari [website pgadmin](https://www.pgadmin.org/). Saya memilih utk menggunakan pgadmin4 berbasis web.  
Berikut langkah-langkah yang harus dilakukan untuk memasang pgadmin4 (jalankan di terminal):
```
sudo pip3 install virtualenv
mkdir pyvenv
sudo pip3 install virtualenvwrapper
```
tambahkan baris di bawah ke dalam ~/.bashrc
```
export WORKON\_HOME=$HOME/pyvenv # Optional
export PROJECT\_HOME=$HOME/pyvenv/pgadmin4 # Optional
VIRTUALENVWRAPPER\_PYTHON=/usr/bin/python3
source /usr/bin/virtualenvwrapper.sh
```
Selanjutnya jalankan pada terminal
```
source ~/.bashrc
mkvirtualenv pgadmin4
cd ~/pyvenv/pgadmin4
wget https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v3.3/pip/pgadmin4-3.3-py2.py3-none-any.whl
pip3 install pgadmin4-3.3-py2.py3-none-any.whl
```
Jika ada kegagalan “*Failed building wheel for pycrypto*” instal paket **python-devel** dan **pattern-python3-devel**.

Selanjutnya buat file konfigurasi python utk *virtual environment* pgadmin4
```
vim lib/python3.6/site-packages/pgadmin4/config\_local.py
```
isi dengan:
```
import os
DATA\_DIR = os.path.realpath(os.path.expanduser(u'~/.pgadmin/'))
LOG\_FILE = os.path.join(DATA\_DIR, 'pgadmin4.log')
SQLITE\_PATH = os.path.join(DATA\_DIR, 'pgadmin4.db')
SESSION\_DB\_PATH = os.path.join(DATA\_DIR, 'sessions')
STORAGE\_DIR = os.path.join(DATA\_DIR, 'storage')
SERVER\_MODE = False
```
Jalankan dg perintah
```
python3 lib/python3.6/site-packages/pgadmin4/pgAdmin4.py &
```
Selanjutnya buka browser anda dan arahkan ke http://127.0.0.1:5050  
Selebihnya trivial lah 🙂

![Screenshot_20180929_083632.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2018/memasang-pgadmin4-pada-tumbleweed/Screenshot_20180929_083632.png)

Mematikan pgadmin4 ini masih menggunakan cara primitif, *ctr +c*, atau *kill process* id dari
```
ps x | grep pgAdmin4
```
Untuk keluar dari *virtual environment* python, ketik
```
deactivate
```
Kalau ingin menjalankan lagi:

buka terminal, pindah ke direktori pgadmin4
```
cd ~/pyvenv/pgadmin4
workon pgadmin4
```
jalankan dg perintah
```
python3 lib/python3.6/site-packages/pgadmin4/pgAdmin4.py &
```
Bagi yang bisa bantu buat *shortcut* aplikasi baik di GNOME maupun KDE silakan, ditunggu tulisannya di opensuse.id

Sebagai info saja bagi yang belum tahu, 6 langkah awal di atas (sampai mkvirtualenv) adalah salah satu cara membuat *virtual environment* untuk python. Saya menggunakan python3 (3.6) tetapi pgadmin4 bisa dijalankan dengan python2 (2.7). Jadi yang kita lakukan di atas adalah memasang dan menjalankan pgadmin4 melalui *virtual environment*. Untuk lebih jauh mengenai python silakan tanya-tanya langsung ke pakarnya, Kakek [Yan Sugiyama](https://twitter.com/yanarief)  😀