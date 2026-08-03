---
title: "Memasang Vagrant pada openSUSE Leap"
date: "2016-11-12"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Ikhtisar Sewaktu openSUSE Asia Summit 2016 bulan kemarin, disalah satu workshop, yaitu workshopnya pak Estu Fardani dengan materi Elastic Logtash dan Kibana pada openSUSE menjadi salah satu workshop yang menarik bagi saya. Di workshop tersebut untuk melakukan simulasi ELK nya pak Estu menggunakan..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/memasang-vagrant-pada-opensuse-leap/logo_large-c92469b9.png"
---

## Ikhtisar

Sewaktu openSUSE Asia Summit 2016 bulan kemarin, disalah satu workshop, yaitu workshopnya pak [Estu Fardani](tuanpembual.wordpress.com) dengan materi Elastic Logtash dan Kibana pada openSUSE menjadi salah satu workshop yang menarik bagi saya. Di workshop tersebut untuk melakukan simulasi ELK nya pak Estu menggunakan Vagrant. Sebelumnya saya sudah pernah mendengar aplikasi tersebut namun belum sempat saya pelajari.

Pasca openSUSE Asia Summit akhirnya materi tersebut saya pelajari dengan memasang dan melakukan simulasi Vagrant dengan VirtualBox pada openSUSE Leap yang terpasang pada laptop saya. Berikut penjelasannya.

## Sekilas Vagrant

Vagrant merupakan aplikasi berbasis command line untuk melakukan manajemen terhadap mesin virtual dalam mempermudah proses development(pengembangan). Vagrant memungkinkan anda untuk melakukan proses pengembangan tanpa mengubah sistem hos yang anda punya. Vagrant memanfaatkan teknologi virtualisasi seperti VirtualBox, VMware, Docker, Qemu dll.

Pada tulisan ini saya akan menjelaskan tutorial bagaimana cara memasang Vagrant pada mesin openSUSE Leap  dengan memanfaatkan VirtualBox.

## Pemasangan

* Sebelum memasang Vagrant, pastikan anda sudah memasang **VirtualBox** pada Destop anda. Jika belum dipasang silakan ikuti tutorial [berikut](https://dhenandi.com/how-to-install-virtualbox-latest-version-on-opensuse-leap/) pada blog pribadi saya (menggunakan bahasa inggris).
* Jika sudah, silakan unduh vagrant versi terbaru pada link [berikut](https://www.vagrantup.com/downloads.html). Sayangnya pada Vagrant belum tersedia pemasang untuk versi openSUSE. Namun kita dapat menggunakan installer milik CentOS, namun sebelum mendownload pastikan arsitektur laptop anda sesuai dengan arsitektur Vagrant, apakah menggunakan 32bit atau 64bit. Saat ini saya menggunakan vagrant versi 1.8.6.

    ```
    wget -c https://releases.hashicorp.com/vagrant/1.8.6/vagrant_1.8.6_x86_64.rpm
    rpm -ivh vagrant_1.8.6_x86_64.rpm
    ```

* Untuk membangun sistem operasi dengan vagrant anda cukup menjalankan perintah berikut, sebagai simulasinya saya akan menginstall openSUSE Leap dengan Vagrant :

    ```
    dhenandi@leap:/data/vagrant/suse:~> vagrant init opensuse/openSUSE-42.1-x86_64 
    A `Vagrantfile` has been placed in this directory. You are now 
    ready to `vagrant up` your first virtual environment! Please read 
    the comments in the Vagrantfile as well as documentation on 
    `vagrantup.com` for more information on using Vagrant. 

    dhenandi@leap:/data/vagrant/suse:~> vagrant up 
    Bringing machine 'default' up with 'virtualbox' provider... 
    ==> default: Importing base box 'opensuse/openSUSE-42.1-x86_64'... 
    ==> default: Matching MAC address for NAT networking... 
    ==> default: Checking if box 'opensuse/openSUSE-42.1-x86_64' is up to date... 
    ==> default: Setting the name of the VM: suse_default_1478929590297_98552 
    ==> default: Clearing any previously set network interfaces... 
    ==> default: Preparing network interfaces based on configuration... 
       default: Adapter 1: nat 
    ==> default: Forwarding ports... 
       default: 22 (guest) => 2222 (host) (adapter 1) 
    ==> default: Booting VM... 
    ==> default: Waiting for machine to boot. This may take a few minutes... 
       default: SSH address: 127.0.0.1:2222 
       default: SSH username: vagrant 
       default: SSH auth method: private key 
       default:  
       default: Vagrant insecure key detected. Vagrant will automatically replace 
       default: this with a newly generated keypair for better security. 
       default:  
       default: Inserting generated public key within guest... 
       default: Removing insecure key from the guest if it's present... 
       default: Key inserted! Disconnecting and reconnecting using new SSH key... 
    ==> default: Machine booted and ready! 
    ==> default: Checking for guest additions in VM... 
       default: The guest additions on this VM do not match the installed version of 
       default: VirtualBox! In most cases this is fine, but in rare cases it can 
       default: prevent things such as shared folders from working properly. If you see 
       default: shared folder errors, please make sure the guest additions within the 
       default: virtual machine match the version of VirtualBox you have installed on 
       default: your host and reload your VM. 
       default:  
       default: Guest Additions Version: 5.0.10 
       default: VirtualBox Version: 5.1 
    ==> default: Mounting shared folders... 
       default: /vagrant => /data/vagrant/suse
    ```

**opensuse/openSUSE-42.1-x86\_64** merupakan salah satu Vagrant box, anda bisa menyesuaikannya dengan sistem operasi yang anda inginkan pada laman Vagrant Box [berikut](https://atlas.hashicorp.com/boxes/search).  Ketika anda menjalankan perintah diatas untuk pertama kalinya maka Vagrant akan mengunduh Vagrant box dari openSUSE Leap 42.1 dan akan disimpan pada sistem sehingga saat anda memanggil Vagrant box openSUSE Leap tersebut anda tidak perlu mengunduhnya kembali.

Dengan Vagrant, mesin virtual akan berjalan pada VirtualBox tanpa perlu membuat mesin virtual dengan cara manual, anda hanya perlu menjalankan perintah diatas.

![vagrant-suse](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2016/memasang-vagrant-pada-opensuse-leap/vagrant-suse.png)

Untuk mempelajari vagrant lebih lanjut anda dapat mengunjungi website resmi Vagrant [disini](https://www.vagrantup.com/docs/). Sekilas dari saya, semoga bermanfaat 🙂
