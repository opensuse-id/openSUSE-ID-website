---
title: "Pengumuman Rilis 15.2"
date: "2020-07-02"
author: "Tim openSUSE Indonesia"
category: kegiatan
excerpt: "Pengumuman Rilis openSUSE 15.2 Rilis openSUSE Leap 15.2 Membawa Hal-hal Menarik Baru untuk Paket Kecerdasan Buatan (AI), Pembelajaran Mesin (ML), dan Paket Kontainer 02/07/2020 NUREMBERG, Jerman – Tim rilis openSUSE dengan bangga mengumumkan ketersediaan openSUSE Leap 15.2 yang dikembangkan oleh ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/pengumuman-rilis-opensuse-152/container-5-2-salinan-.png"
---

![container-5-2-768x432.png](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/pengumuman-rilis-opensuse-152/container-5-2-salinan-.png)

# Pengumuman Rilis openSUSE 15.2

**Rilis openSUSE Leap 15.2 Membawa Hal-hal Menarik Baru untuk Paket Kecerdasan Buatan (AI), Pembelajaran Mesin (ML), dan Paket Kontainer**

02/07/2020
NUREMBERG, Jerman – Tim rilis openSUSE dengan bangga mengumumkan ketersediaan openSUSE Leap 15.2 yang dikembangkan oleh komunitas. Pengguna profesional, mulai dari destop dan server pusat data hingga host kontainer dan Mesin Virtual (VM), akan dapat menggunakan Leap 15.2 sebagai sistem operasi Linux berkualitas tinggi, mudah digunakan, kelas perusahaan.

Rilis ini menyediakan pembaruan keamanan, perbaikan bug, peningkatan jaringan, dan banyak fitur baru untuk pengguna openSUSE yang bergantung pada distribusi yang stabil dan dapat diskalakan. Platform Linux openSUSE yang kaya dan matang mendukung beban kerja pada sistem x86-64, ARM64 dan POWER. Ketergantungan paket inti yang ditemukan di versi Leap 15 sebelumnya dan teknologi sumber terbuka yang lebih baru di Leap 15.2 siap untuk berbagai kasus penggunaan dan beban kerja.

> *“Leap 15.2 mewakili langkah besar ke depan dalam ruang Kecerdasan Buatan,” kata Marco Varlese, seorang pengembang dan anggota proyek. “Saya sangat senang bahwa pengguna akhir openSUSE akhirnya dapat mengkonsumsi kerangka kerja Machine Learning / Deep Learning dan aplikasi melalui repositori kami untuk menikmati ekosistem yang stabil dan terkini.”*

## Apa yang Baru

Beberapa paket Kecerdasan Buatan (AI) dan Pembelajaran Mesin (ML) yang menarik ditambahkan dalam Leap 15.2.

- **Tensorflow:** Kerangka kerja untuk pembelajaran mendalam yang dapat digunakan oleh para ilmuwan data, menyediakan perhitungan numerik dan grafik aliran data. Arsitekturnya yang fleksibel memungkinkan pengguna untuk menyebarkan komputasi ke satu atau lebih CPU di desktop, server, atau perangkat seluler tanpa menulis ulang kode.
- **PyTorch:** Dibuat untuk sumber daya server dan komputasi, pustaka pembelajaran mesin ini mempercepat kemampuan pengguna daya untuk membuat prototipe proyek dan memindahkannya ke penerapan produksi.
- **ONNX:** Format terbuka yang dibangun untuk mewakili model pembelajaran mesin, memberikan interoperabilitas dalam ruang alat AI. Ini memungkinkan pengembang AI untuk menggunakan model dengan berbagai kerangka kerja, alat, runtime, dan kompiler.

Grafana dan Prometheus adalah dua paket baru yang dikelola yang membuka kemungkinan baru bagi para ahli analitis. Grafana memberi pengguna akhir kemampuan untuk membuat analisis visual interaktif.
Paket pemodelan data yang kaya fitur: Graphite, Elastic, dan Prometheus memberi pengguna openSUSE kebebasan yang lebih besar untuk membuat, menghitung, dan menguraikan data dengan lebih cerdas.

Secara umum, paket perangkat lunak dalam distribusi bertambah ratusan. Bukan hanya Penggabungan data, Pembelajaran Mesin dan AI yang baru di openSUSE Leap 15.2; Kernel Real-Time untuk mengelola waktu mikroprosesor untuk memastikan peristiwa kritis waktu diproses seefisien mungkin juga tersedia dalam rilis ini.

> *“Penambahan kernel real time ke openSUSE Leap membuka kemungkinan baru,” kata Gerald Pfeifer, ketua dewan proyek. “Pikirkan edge computing, embedded device, data capture, semuanya mengalami pertumbuhan luar biasa. Secara historis banyak di antaranya telah menjadi domain dengan pendekatan tertutup; openSUSE sekarang membukanya untuk pengembang, peneliti dan perusahaan yang tertarik menguji kemampuannya secara langsung atau mungkin bahkan ikut serta dalam berkontribusi. Sebuah domain lain yang open source membantu membukanya!”*

## Teknologi Kontainer

Pengguna openSUSE akan memiliki lebih banyak kekuatan untuk mengembangkan, mengirim dan menyebarkan aplikasi kontainer menggunakan teknologi kontainer yang lebih baru yang dikelola dalam distribusi.

Untuk pertama kalinya, Kubernetes adalah paket resmi dalam rilis. Ini memberikan dorongan besar untuk kemampuan mengatur wadah, memungkinkan pengguna untuk mengotomatiskan penyebaran, skala, dan mengelola aplikasi kemas.

Helm, manajer paket untuk Kubernetes, juga ditambahkan. Helm membantu pengembang dan administrator sistem mengelola kompleksitas dengan mendefinisikan, menginstal, dan memutakhirkan aplikasi Kubernetes yang paling kompleks.

Container Runtime Interface (CRI) menggunakan Open Container Initiative (OCI) conformant runtimes (CRI-O) juga baru untuk rilis ini. CRI-O adalah alternatif yang ringan untuk menggunakan Docker sebagai runtime, yang memungkinkan Kubernetes untuk menggunakan runtime yang sesuai dengan OCI sebagai runtime kontainer untuk menjalankan pod atau proses yang berjalan pada sebuah cluster.

Bahkan dengan Docker, penggunaan layanan microservices akan aman berkat paket kontainer lebih banyak yang dibawa dalam rilis ini.

Cilium membantu mengamankan konektivitas jaringan dan menyeimbangkan beban antara wadah aplikasi dan layanan yang dikerahkan menggunakan kerangka kerja wadah Linux seperti Docker dan Kubernetes. Cilium menyediakan cara yang efisien untuk mendefinisikan dan menegakkan kebijakan keamanan lapisan jaringan dan lapisan aplikasi, yang didasarkan pada identitas wadah / pod.

Leap 15.2 menawarkan peran sistem Server dan Server Transaksional. Peran sistem Server menggunakan seperangkat kecil paket yang cocok untuk server dengan antarmuka mode teks sedangkan peran sistem Server Transaksional mirip dengan peran Server, tetapi menggunakan sistem file root read-only untuk menyediakan pembaruan sistem secara atomik dan otomatis dari sistem tanpa mengganggu sistem yang sedang berjalan.

## Proses Instalasi

Installer openSUSE akan tetap kuat dan serbaguna seperti sebelumnya, memungkinkan untuk dengan mudah mengubah setiap aspek sistem termasuk mitigasi untuk serangan berbasis CPU seperti Specter atau Meltdown. Proses instalasi menghadirkan beberapa peningkatan seperti dialog yang lebih ramah pengguna untuk memilih peran sistem, peningkatan informasi tentang kemajuan instalasi, kompatibilitas yang lebih baik dengan bahasa kanan-ke-kiri seperti bahasa Arab dan banyak perangkat tambahan kecil lainnya.

Leap 15.2 menawarkan deteksi yang lebih akurat dari partisi MS Windows yang dienkripsi dengan BitLocker dan manajemen yang lebih baik dari perangkat penyimpanan untuk Raspberry Pi. Pemasang juga memudahkan untuk menyesuaikan mitigasi untuk serangan berbasis CPU seperti Specter atau Meltdown.

Instalasi tanpa pengawasan dengan AutoYaST sangat ditingkatkan. Banyak aspek yang dipoles di semua tingkatan. Lebih banyak opsi konfigurasi ditambahkan dan kemungkinan kesalahan dalam profil pengguna dan proses instalasi sekarang ditangani dan dilaporkan dengan cara yang lebih masuk akal dan informatif.

### Perbaikan ke YaST – Alat konfigurasi paling lengkap untuk Linux

YaST Partitioner tetap menjadi alat paling ampuh untuk mengkonfigurasi semua jenis teknologi penyimpanan di Linux, baik selama instalasi sistem atau pada tahap selanjutnya. Rilis ini menggabungkan kemungkinan untuk membuat dan mengelola sistem berkas Btrfs yang diperluas ke beberapa perangkat, dan rilis ini juga memungkinkan penggunaan teknologi enkripsi yang lebih maju.

Leap 15.2 adalah rilis openSUSE pertama yang memperkenalkan perubahan bertahap yang membagi konfigurasi sistem antara `/usr/etc` dan `/etc` direktori. YaST mendukung struktur baru ini di semua modul yang terkena dampak, menawarkan titik sentral kepada administrator sistem untuk memeriksa konfigurasi yang akan membantu mereka selama masa transisi dan seterusnya.

Leap dapat dieksekusi di atas Windows Subsystem for Linux (WSL), memberikan kekuatan openSUSE ke dunia Windows. Versi YaST di Leap 15.2 meningkatkan kompatibilitas dengan platform itu, khususnya ketika menjalankan YaST Firstboot untuk melakukan semua penyesuaian awal yang diperlukan.

## Lingkungan Destop

Sementara lingkungan destop dalam rilis ini akan menjadi baru, fokusnya tetap pada rilis tetap yang lebih konservatif. Versi Dukungan Jangka Panjang untuk KDE Plasma 5.18 LTS tersedia di Leap 15.2. LTS yang lebih baru memiliki jumlah fitur yang diperbaiki dan fitur baru yang signifikan. Notifikasi lebih jelas, pengaturan disederhanakan dan tampilan keseluruhan yang lebih menarik. GNOME 3.34 pembaruan dari sebelumnya versi 3.26 yang tersedia di Leap 15.1. GNOME baru menyediakan sejumlah penyegaran visual untuk sejumlah aplikasi. Lebih banyak sumber data di Sysprof membuat profil kinerja aplikasi lebih mudah dan ada beberapa peningkatan untuk Builder termasuk pemeriksa D-Bus terintegrasi. Xfce memiliki pembaruan kecil ke versi 4.14 setelah empat tahun lebih pengembangan; versi baru menghasilkan banyak pembaruan dan fitur, termasuk peningkatan untuk manajer jendela, manajer berkas, pencari aplikasi dan manajemen daya.

## Imej Awan, Perangkat Keras dan Arsitektur

Imej cloud Linode untuk Leap tersedia saat ini dan siap untuk semua kebutuhan infrastruktur. Layanan cloud hosting akan menawarkan Leap 15.2 dalam beberapa minggu mendatang seperti Amazon Web Services, Azure, Google Compute Engine, dan OpenStack. Leap 15 terus dioptimalkan untuk skenario penggunaan cloud sebagai host dan guest virtualisasi.

Komputer dan notebook TUXEDO Linux dapat dibeli dengan Leap 15.2 yang sudah diinstal.

Skenario penerapan Leap meliputi fisik, virtual, host dan guest, dan cloud. Versi untuk arsitektur lain seperti ARM64 dan POWER diharapkan akan keluar dalam beberapa minggu mendatang.

## Komponen Inti

Kompiler, bahasa scripting, alat konfigurasi sistem dan antarmuka pengguna grafis semuanya telah ditingkatkan.

GNU Compiler Collection 7 hingga 9 tersedia dalam versi Leap minor yang lebih baru ini bersama dengan versi terbaru dari paket Grafik 3D Mesa untuk mendukung penggunaan sistem operasi kelas profesional. Leap 15.2 memiliki versi 234 yang sama dengan systemd yang digunakan dalam Leap 15.0 dan 15.1.

Dukungan perangkat keras grafis baru telah di-backport untuk rilis Leap 15.2 dan Linux Kernel 5.3 akan digunakan untuk rilis ini. Fitur-fitur kernel secara otomatis tersedia di Leap karena distribusi berbagi kernel yang sama dengan SUSE Linux Enterprise (SLE).

openSUSE Leap 15.2 adalah distribusi dengan paket komunitas yang dibangun di atas sumber inti dari SLE 15 SP 2. Berbagi pakai komponen inti dan keselarasan dengan SLE membuat migrasi ke produk SUSE enterprise akan mudah bagi profesional yang ingin memperpanjang siklus hidup pemeliharaan dan keamanan melewati siklus hidup Leap. Bermigrasi dari versi komunitas Leap ke SUSE Linux Enterprise adalah opsi yang tersedia bagi mereka yang ingin bermigrasi. Migrasi dari instalasi server Leap openSUSE ke SUSE Linux Enterprise mudah bagi integrator sistem yang mengembangkan kode Leap yang mungkin memutuskan untuk pindah ke versi perusahaan untuk SLA, sertifikasi, penyebaran massal, atau Dukungan Jangka Panjang yang diperpanjang.

## Paket Kesehatan

Rilis Leap ini meningkatkan kemampuan layanan kesehatan. Sistem manajemen rumah sakit dan kesehatan yang memenangkan penghargaan, GNU Health hadir dalam versi 3.6.4. Sistem ini memiliki GUI yang diperbarui dan disiapkan untuk pelacakan pandemi COVID-19, termasuk kode ICD-10 yang diperbarui dan fungsi laboratorium yang ditingkatkan. GNU Health dapat langsung berinteraksi dengan Orthanc, Server PACS gratis, yang baru dikirimkan dalam rilis ini. Pengembang bidang kesehatan dan medis memiliki beberapa alat sumber terbuka dengan Leap openSUSE yang dapat digunakan untuk membuat User Interface (UI) dan User Experiences (UX) yang kuat untuk perangkat medis. Pengembang perangkat Healthcare dapat lebih percaya diri dalam penggunaan dan kinerja Leap dan mengandalkan sistem yang mendukung perangkat keras yang lebih baru dan lebih lama.

## Manajemen Konfigurasi

Administrator sistem akan memiliki alat terbaru untuk manajemen konfigurasi. Salt 3000 telah tiba di Leap; versi Salt baru menghapus versi tanggal dan menyediakan fungsi baru untuk chroot: apply, sls, dan highstate. Ini juga memperbarui sintaksis slot untuk mendukung tanggapan kamus parsing dan menambahkan teks. Ansible juga tersedia untuk sysadmin. Ansible bekerja melalui SSH dan tidak memerlukan perangkat lunak atau daemon untuk diinstal pada node jarak jauh.

## Groupware dan File Hosting

Berbagi file dan layanan cloud termasuk perangkat lunak seperti NextCloud dan bahkan suite aplikasi groupware Kopano (sebelumnya dikenal sebagai Zarafa) adalah bagian dari repositori resmi Leap 15.2.

Seperti versi sebelumnya, Administrator Sistem dan usaha kecil dapat menggunakan Leap untuk menempatkan web dan server mail atau untuk manajemen jaringan dengan DHCP, DNS, NTP, Samba, NFS, LDAP, dan ratusan layanan lainnya.

## Siklus Hidup Leap

Versi minor dari seri Leap 15 memiliki siklus hidup 18 bulan; rilis minor datang kira-kira setahun sekali. Pengguna openSUSE Leap 15.1, yang dirilis pada Mei 2019, harus meningkatkan sistemnya ke Leap 15.2 dalam 6 bulan ke depan. Rilis pertama Leap 15 dirilis dua tahun lalu.

## Unduh Leap 15.2

Untuk mengunduh imej ISO, kunjungi [https://software.opensuse.org/distributions/leap](https://software.opensuse.org/distributions/leap)

## Pertanyaan

Jika Anda mempunyai pertanyaan tentang rilis atau anda merasa menemukan kutu/bug, kami akan sangat senang mendengar Anda melalui:

- [openSUSE Indonesia Telegram Group](https://t.me/openSUSE_ID)
- [openSUSE Support Mailing List](https://lists.opensuse.org/opensuse-support/)
- [openSUSE Discord Group](https://discordapp.com/invite/openSUSE)

## Ikut Terlibat

Proyek openSUSE adalah komunitas dunia yang mempromosikan penggunaan Linux di mana-mana. Ini menciptakan dua distribusi Linux terbaik dunia, rilis bergulir Tumbleweed, dan Leap, distribusi hibrid perusahaan-komunitas. openSUSE terus bekerja bersama secara terbuka, transparan, dan ramah sebagai bagian dari komunitas Perangkat Lunak Bebas dan Sumber Terbuka dunia. Proyek ini dikendalikan oleh komunitasnya dan bergantung pada kontribusi individu, bekerja sebagai penguji, penulis, penerjemah, ahli kegunaan, seniman dan duta atau pengembang. Proyek ini mencakup beragam teknologi, orang-orang dengan berbagai tingkat keahlian, berbicara dalam berbagai bahasa dan memiliki latar belakang budaya yang berbeda-beda. Pelajari lebih lanjut di opensuse.org