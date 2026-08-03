---
title: "Cara Install Jupyter Notebook Pada openSUSE Leap 42.3"
date: "2017-12-31"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Pada tulisan ini, saya ingin berbagi cara untuk pemasangan jupyter-notebook pada openSUSE 42.3, tentunya aplikasi ini tidak asing bagi para pengguna bahasa pemrograman python, sebenarnya instalasi jupyter-notebook bisa dilakukan dengan menggunakan aplikasi anaconda dari situs jupyter project. Nam..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3//Screenshot_20171230_210128.png"
---

Pada tulisan ini, saya ingin berbagi cara untuk pemasangan jupyter-notebook pada openSUSE 42.3, tentunya aplikasi ini tidak asing bagi para pengguna bahasa pemrograman python, sebenarnya instalasi jupyter-notebook bisa dilakukan dengan menggunakan aplikasi anaconda dari situs [jupyter project](http://jupyter.org/). Namun, seringkali plugin-plugin dari python tidak diikutsertakan, jadi harus menambahkan secara manual, sedangkan pemasangan jupyter dari perintah *pip* tidak didukung untuk sistem operasi openSUSE.

Cara pemasangan jupyter-notbook :

1. buka browser, dalam hal ini yang digunakan adalah firefox, dan arahkan ke situs https://software.opensuse.org/search, kemudian isi dengan jupyter pada textbox yang tersedia dan tekan enter  
   ![Screenshot_20171230_204414](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3//Screenshot_20171230_204414.png)

2. pilih python-jupyter seperti pada gambar yang ditandai  
   ![Screenshot_20171230_204444](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204444.png)

3. kemudian pilih sistem operasi yang sesuai (openSUSE Leap 42.3), dan klik tanda panah dikanan (dilingkari), kemudian pilih opsi Show unstable packages  
   ![Screenshot_20171230_204458](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204458.png)

4. apabila ada peringatan seperti dibawah, klik pada tombol continue  
   ![Screenshot_20171230_204517](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204517.png)

5. pilih opsi paling atas, kemudian klik 1 Click Install  
   ![Screenshot_20171230_204532](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204532.png)

6. kemudian, pilih opsi open with YaST 1-Click Install  
   ![Screenshot_20171230_204544](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204544.png)

7. pada bagian Additional Software Repository, klik next  
   ![Screenshot_20171230_204557](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204557.png)

8. pada bagian Software to Be Installed, pastikan opsi python-jupyter tercentang, kemudian klik next  
   ![Screenshot_20171230_204606](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204606.png)

9. kemudian klik next untuk melanjutkan proses  
   ![Screenshot_20171230_204614](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204614.png)

10. klik yes untuk menlanjutkan, kemudian isikan password root apabila diminta  
    ![Screenshot_20171230_204628](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204628.png)  
    ![Screenshot_20171230_204641](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204641.png)

11. klik Trust untuk Import Untrusted GnuPG Key  
    ![Screenshot_20171230_204736](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_204736.png)

12. Klik Finish ketika instalasi selesai  
    ![Screenshot_20171230_210041](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_210041.png)

Untuk menjalankan jupyter, jalankan perintah dibawah ini pada terminal :

```
$ jupyter-notebook
```

jupyter akan otomatis terload ke dalam browser firefox, seperti pada gambar dibawah ini :

![Screenshot_20171230_210128](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2017/cara-install-jupyter-notebook-pada-opensuse-leap-42-3/Screenshot_20171230_210128.png)

untuk menghentikan, pada terminal tekan Ctrl + C dua kali