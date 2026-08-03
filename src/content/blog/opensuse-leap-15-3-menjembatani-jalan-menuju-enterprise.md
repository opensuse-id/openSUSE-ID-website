---
title: "openSUSE Leap 15.3 Menjembatani Jalan Menuju Enterprise"
date: "2021-06-02"
author: "Tim openSUSE Indonesia"
category: uncategorized
excerpt: "2 Juni 2021 Nuremberg, Jerman – openSUSE Leap 15.3 dirilis! Versi minor terbaru dari openSUSE Leap adalah tambahan terbaru dan kokoh untuk seri openSUSE 15.x yang membawa semua atribut positif dari pendahulunya. Ada satu perubahan besar dari versi Leap sebelumnya. openSUSE Leap 15.3 dibuat tidak ..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2021/opensuse-leap-15-3-menjembatani-jalan-menuju-enterprise/191959767_10158573279002284_7600376146720937307_n.png"
---

![Gambar ilustrasi](https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2021/opensuse-leap-15-3-menjembatani-jalan-menuju-enterprise/191959767_10158573279002284_7600376146720937307_n.png)

2 Juni 2021

Nuremberg, Jerman – [openSUSE](https://www.opensuse.org/) [Leap 15.3](https://get.opensuse.org/leap) dirilis!

Versi minor terbaru dari [openSUSE Leap](https://en.opensuse.org/Portal:Leap) adalah tambahan terbaru dan kokoh untuk seri openSUSE 15.x yang membawa semua atribut positif dari pendahulunya. Ada satu perubahan besar dari versi Leap sebelumnya. openSUSE Leap 15.3 dibuat tidak hanya dari kode sumber [SUSE Linux Enterprise](https://www.suse.com/products/server/) seperti di versi sebelumnya, tetapi juga dibuat dengan paket biner yang sama persis, yang memperkuat aliran antara Leap dan SLE seperti [yin yang](https://youtu.be/ezmR9Attpyc).

"Pengerjaan perangkat lunak dari rilis ini membuat penggunaan peladen, *workstation*, destop, dan kontainer di openSUSE Leap menjadi distribusi yang diinginkan untuk profesional TI, wirausahawan, penghobi, bisnis kecil, dan praktisi pendidikan," kata manajer rilis Lubos Kocman.

Rilis ini sangat bermanfaat untuk proyek migrasi dan *user acceptance testing*. Tim pengembangan besar mendapatkan nilai tambah dengan menggunakan openSUSE Leap 15.3 untuk menjalankan dan menguji beban kerja secara optimal yang dapat diangkat dan dialihkan ke SUSE Linux Enterprise Linux 15 SP3 untuk pemeliharaan jangka panjang.

openSUSE Leap menawarkan keuntungan yang jelas untuk peladen dengan menyediakan setidaknya 18 bulan pemutakhiran untuk setiap rilis. Komunitas ini mendukung dan berinteraksi dengan orang-orang yang menggunakan Leap versi lama melalui saluran komunitas seperti [milis](https://lists.opensuse.org/), [Matrix](https://matrix.to/#/#newscom:opensuse.org), [Discord](https://discord.com/invite/opensuse), [Telegram](https://t.me/openSUSE_group), [Facebook](https://www.facebook.com/groups/opensuseproject), dll.

Hubungan kekerabatan yang terjalin, terhubung dan saling mendukung antara komunitas distribusi Leap dan distribusi *enterprise* versi SLE membuat rilis yang menarik bagi pengembang, administrator sistem, *distro-hopper*, vendor perangkat lunak independen, dan pengguna serta pelanggan SUSE.

Hubungan timbal balik yang dimiliki oleh openSUSE Leap 15.3 dan SLE 15 Service Pack 3 memberi pengguna kedua pilihan yang sama untuk ribuan paket yang didukung komunitas. Paket komunitas ini dibuat dalam proyek openSUSE yang disebut ["*Backport*"](https://en.opensuse.org/openSUSE:Packaging_for_Leap#How_do_packages_from_SUSE_Linux_Enterprise_get_to_openSUSE_Leap.3F) di atas *baseline* SLE. *Backport* dipublikasikan ke [SUSE Package Hub](https://packagehub.suse.com/), sehingga migrasi dari Leap ke SLE seragam dan seketika. Migrasi antara keduanya cepat. Dengan sistem berkas [btrfs](https://btrfs.wiki.kernel.org/index.php/Main_Page) pengguna dapat menguji di Leap, men-*deploy* ke SLE, dan bahkan melakukan *rollback* ke snapshot Leap.

Leap memberdayakan penggunanya untuk menjalankan sebanyak mungkin CPU dan meng-*hosting* sebanyak mungkin mesin virtual tanpa batasan apa pun. Pengguna Leap dapat memigrasi peladen, mesin virtual, atau kontainer yang ada ke SUSE Linux Enterprise, jika ada kebutuhan untuk "mengaktifkan" dukungan *enterprise* di lain waktu.

Banyak paket di [openSUSE Leap 15.3](https://get.opensuse.org/) tetap sama dengan yang ada di [versi sebelumnya](https://en.opensuse.org/Portal:15.2). Leap 15.3 disiapkan dengan perbaikan kutu dan *backport* keamanan ke [Kernel LTS](http://kroah.com/log/blog/2018/08/24/what-stable-kernel-should-i-use/#Distribution%20kernels). Ini memastikan bahwa pengguna mendapatkan sistem peladen yang stabil, sementara itu juga menyediakan penggerak untuk perangkat keras yang lebih baru kepada pengguna.

## Meningkatkan dari versi Leap sebelumnya

Pengguna yang meningkatkan ke openSUSE Leap 15.3 perlu menyadari bahwa peningkatan langsung dari versi sebelum openSUSE Leap 15.2 tidak direkomendasikan. Karena jalur peningkatan, sangat disarankan untuk meningkatkan ke Leap 15.2 sebelum meningkatkan ke Leap 15.3. Rilis ini hanya mendukung peningkatan dari openSUSE Leap 15.2 ke 15.3 seperti yang disorot di [catatan rilis](https://doc.opensuse.org/release-notes/x86_64/openSUSE/Leap/15.3/#upgrade).

## Apa yang Baru

Fitur utama baru ada di [Xfce](https://www.xfce.org/) [4.16](https://www.xfce.org/about/news/?post=1608595200). Ada identitas visual baru dalam rilis Xfce ini. Dengan ikon dan palet baru, Xfce lebih bersinar. Manajer Pengaturan menerima penyegaran visual dari kotak filternya, yang sekarang dapat disembunyikan secara permanen. Kemampuan pencarian kotak filter ditingkatkan dengan mencari bagian "Komentar" deskriptif dari setiap berkas peluncur dialog (alias .desktop). Dialog pengaturan dari manajer daya dibersihkan dan menampilkan pengaturan "pada baterai" atau "terpasang" sebagai kebalikan dari keduanya dalam tabel besar.

GNU Health, pemenang penghargaan sistem informasi dan manajemen kesehatan dan rumah sakit, hadir dalam versi 3.8 dengan modul gigi dan Odontogram baru . Sebagai distribusi pertama, openSUSE menyediakan MyGNUHealth, Manajer Kesehatan Medis Pribadi, yang dikembangkan dalam kerjasama antara GNU Health dan proyek KDE. Ini berjalan di PinePhone dan di destop Plasma, dan memberi pengguna kepemilikan dan kendali penuh atas datanya.

Manajer paket DNF diharapkan dalam pembaruan pemeliharaan dan akan memberikan versi 4.7.0 kepada pengguna yang menyediakan fitur baru di seluruh tumpukan dan peningkatan yang diharapkan. DNF Python API stabil dan didukung. Basis kontainer eksperimental "opensuse/leap-dnf" dan "opensuse/leap-microdnf" sekarang tersedia. Implementasi C ringan dari DNF yang disebut "Micro DNF" disertakan. Ini dirancang untuk digunakan untuk melakukan tindakan manajemen paket sederhana ketika pengguna tidak membutuhkan DNF lengkap dan menginginkan lingkungan yang berguna sekecil mungkin. Ini berguna untuk kontainer dan *appliance* minimal. Micro DNF telah di-*rebase* menjadi 3.8.0, yang membawa banyak perbaikan dan peningkatan. Terakhir, *backend* PackageKit alternatif eksperimental yang menggunakan DNF juga tersedia.

openSUSE Leap berjalan dengan baik pada beberapa arsitektur dan yang baru untuk rilis ini adalah dukungan untuk sistem [IBM Z dan LinuxONE (s390x)](https://en.wikipedia.org/wiki/Linux_on_IBM_Z). Distribusi komunitas memperoleh akses ke arsitektur s390x dari upaya membuatnya kompatibel dengan SLE.

Di versi Leap sebelumnya, [PowerPC](https://en.wikipedia.org/wiki/PowerPC) dan [aarch64](https://en.wikipedia.org/wiki/AArch64) adalah bagian dari port dan dikelola oleh tim komunitas terpisah dengan sumber daya terbatas. Sekarang openSUSE Leap secara langsung menggunakan paket biner dari sisi *enterprise* untuk aarch64, powerpc64, dan x86_64, sehingga pengguna dapat menemukan citra tersebut di [get.opensuse.org](https://get.opensuse.org/). Orang yang tertarik dengan armv7 dan arsitektur lain harus membaca pengumuman tentang [openSUSE Step](https://news.opensuse.org/2021/02/11/opensuse-new-project-looks-to-build-sle-on-more-architectures/).

## Teknologi Kontainer

Paket teknologi semuanya memiliki versi yang sama dari Leap 15.2, tetapi ada pembaruan keamanan untuk semua paket seperti [containerd](https://containerd.io/), [podman](https://podman.io/), [kubeadm](https://github.com/kubernetes/kubeadm) dan [cri-o](https://cri-o.io/).

Pengguna Leap 15.3 akan memiliki lebih banyak kekuatan untuk mengembangkan, mengirim, dan *deploy* aplikasi dalam kontainer menggunakan teknologi kontainer yang lebih baru yang dipertahankan dalam distribusi. [Kubernetes](https://kubernetes.io/) memberikan dorongan besar pada kapabilitas orkestrasi kontainer, yang memungkinkan pengguna mengotomasi *deployment*, menskalakan, dan mengelola aplikasi dalam kontainer. Helm, manajer paket untuk Kubernetes, membantu pengembang dan administrator sistem mengelola kompleksitas dengan menentukan, memasang, dan memutakhirkan aplikasi Kubernetes yang paling kompleks. *Container Runtime Interface* (CRI) yang menggunakan *Open Container Initiative* (OCI) *conformant runtimes* (CRI-O) juga disertakan dalam rilis ini. CRI-O adalah alternatif ringan untuk penggunaan Docker sebagai *runtime*, yang memungkinkan Kubernetes menggunakan *runtime* yang sesuai dengan OCI sebagai kontainer *runtime* untuk menjalankan pod atau proses yang berjalan di klaster. Bahkan dengan [Docker](https://www.docker.com/), penggunaan *microservice* akan aman berkat lebih banyak paket kontainer yang hadir dalam rilis ini.

Pengguna Kontainer Leap dapat memigrasi peladen, mesin virtual, atau kontainer yang ada ke SUSE Linux Enterprise dalam beberapa menit, jika ada kebutuhan untuk "mengaktifkan" dukungan *enterprise* di lain waktu.

Tidak ada batasan tentang berapa banyak CPU yang dapat dijalankan, berapa banyak mesin virtual yang dapat di-hosting, berapa lama mesin dapat berjalan, dan batasan lain yang ditemukan dengan beberapa distribusi *free tiers enterprise-grade*.

## Kecerdasan Buatan (AI) dan Pembelajaran Mesin

[Tensorflow](https://www.tensorflow.org/): Framework untuk deep learning yang dapat digunakan oleh ilmuwan data, menyediakan komputasi numerik dan grafik aliran data. Arsitekturnya yang fleksibel memungkinkan pengguna untuk menerapkan komputasi ke satu atau lebih CPU di destop, peladen, atau perangkat seluler tanpa menulis ulang kode.

[PyTorch](https://pytorch.org/tutorials/): Dibuat untuk sumber daya peladen dan komputasi, pustaka pembelajaran mesin ini mempercepat kemampuan pengguna untuk membuat prototipe proyek dan memindahkannya ke *deployment* produksi.

[ONNX](https://onnx.ai/): Format terbuka yang dibuat untuk merepresentasikan model pembelajaran mesin, memberikan interoperabilitas dalam ruang alat kecerdasan buatan. Ini memungkinkan pengembang kecerdasan buatan untuk menggunakan model dengan berbagai kerangka kerja, alat, waktu proses, dan kompiler.

[Grafana](https://grafana.com/) dan [Prometheus](https://prometheus.io/) sangat berguna bagi pakar analitik. Grafana memberi pengguna akhir kemampuan untuk membuat analitik visual interaktif. Paket pemodelan data yang kaya fitur: Graphite, Elastic, dan Prometheus memberikan pengguna openSUSE kebebasan yang lebih besar untuk membangun, menghitung, dan menguraikan data dengan lebih jelas.

## Lingkungan Destop

Versi Dukungan Jangka Panjang dari KDE Plasma 5.18 sekali lagi tersedia di Leap 15.3. LTS memiliki fitur polesan dan kualitas yang signifikan. Notifikasi lebih jelas, pengaturan lebih ramping dan tampilan keseluruhan lebih menarik. GNOME 3.34 memberikan sejumlah besar penyegaran visual untuk sejumlah aplikasi. Lebih banyak sumber data di sysprof membuat pembuatan profil kinerja aplikasi menjadi lebih mudah dan ada beberapa peningkatan pada Builder termasuk inspektur D-Bus terintegrasi. Dengan pola baru untuk Cinnamon, Leap 15.3 menawarkan total 8 Destop yang menarik untuk pemasangan (paralel), agar sesuai dengan preferensi pribadi dan kemampuan perangkat keras.

## *Cloud Image*, Perangkat Keras, dan Arsitektur

*Cloud image *Linode dari Leap tersedia saat ini dan siap untuk semua kebutuhan infrastruktur. Layanan *hosting cloud* akan menawarkan citra Leap 15.3 dalam beberapa minggu mendatang seperti Amazon Web Services, Azure, Google Compute Engine, dan OpenStack. Leap 15 terus dioptimalkan untuk skenario penggunaan *cloud* sebagai *host* dan *guest* virtualisasi. TUXEDO Komputer dan Linux notebook dapat dibeli dengan Leap 15.2 yang telah dipasang sebelumnya. Leap 15.3 juga dapat dipesan sebelumnya dengan Slimbooks.

## Peladen dan Destop

Leap sangat ideal untuk lingkungan destop dan peladen. Administrator Sistem dan bisnis kecil dapat menggunakan Leap untuk meng-*hosting* web dan peladen surel. Administrator Sistem dapat memanfaatkan sepenuhnya protokol manajemen jaringan *Dynamic Host Configuration Protocol* (DHCP), mengalokasikan sumber daya menggunakan *Domain Name System* (DNS) atau menawarkan akses komputer klien ke berkas melalui *Network FileSystem* (NFS). Berkas dan paket berbagi *host* seperti NextCloud juga tersedia dan kumpulan aplikasi *groupware* Kopano adalah bagian dari rilis resmi Leap 15.3.

Arsitektur tersedia untuk [pengujian](https://get.opensuse.org/testing/) termasuk [x86_64](https://en.wikipedia.org/wiki/X86-64), [aarch64](https://en.wikipedia.org/wiki/AArch64), [PowerPC](https://en.wikipedia.org/wiki/PowerPC) dan [s390x](https://en.wikipedia.org/wiki/Linux_on_IBM_Z). Arsitektur Armv7 harus membaca pengumuman tentang [openSUSE Step](https://news.opensuse.org/2021/02/11/opensuse-new-project-looks-to-build-sle-on-more-architectures/).

Temukan informasi lebih lanjut tentang openSUSE Leap 15.3 Subsistem Windows untuk Linux [disini](https://en.opensuse.org/openSUSE:WSL).

## Akhir Masa Pakai

openSUSE Leap 15.2 akan memiliki [Akhir Masa Pakai/*End of Life* (EOL)](https://en.wikipedia.org/wiki/End-of-life_product) enam bulan sejak rilis hari ini. Pengguna harus memutakhirkan ke openSUSE Leap 15.3 untuk terus menerima pemutakhiran keamanan dan pemeliharaan.

## Unduh Leap 15.3

Untuk mengunduh citra ISO, kunjungi [https://get.opensuse.org/leap/](https://get.opensuse.org/leap/)

## Pertanyaan

Jika Anda memiliki pertanyaan tentang rilis atau merasa menemukan kutu, kami ingin mendengar pendapat Anda di:

* [https://t.me/openSUSE_group](https://t.me/openSUSE_group)
* [https://lists.opensuse.org/opensuse-support/](https://lists.opensuse.org/opensuse-support/)
* [https://discordapp.com/invite/openSUSE](https://discordapp.com/invite/openSUSE)
* [https://www.facebook.com/groups/opensuseproject](https://www.facebook.com/groups/opensuseproject)

## Ikut Terlibat

Proyek openSUSE adalah komunitas di seluruh dunia yang mempromosikan penggunaan Linux di mana-mana. Ini menciptakan dua distribusi Linux terbaik dunia, rilis bergulir Tumbleweed, dan Leap, distribusi hibrida komunitas-*enterprise*. openSUSE terus bekerja sama secara terbuka, transparan, dan bersahabat sebagai bagian dari komunitas Perangkat Lunak Bebas dan Sumber Terbuka di seluruh dunia. Proyek ini dikendalikan oleh komunitasnya dan bergantung pada kontribusi individu, bekerja sebagai penguji, penulis, penerjemah, *usability experts*, seniman dan duta atau pengembang. Proyek ini mencakup berbagai macam teknologi, orang-orang dengan tingkat keahlian yang berbeda, berbicara dalam bahasa yang berbeda dan memiliki latar belakang budaya yang berbeda. Pelajari lebih lanjut tentang itu di [opensuse.org](https://www.opensuse.org/).