---
title: "Mencoba Microsoft Edge Dev Pada openSUSE Leap"
date: "2020-10-21"
author: "Tim openSUSE Indonesia"
category: panduan
excerpt: "Panduan ini dicoba pada openSUSE Leap 15.2. Langkahnya: Tambahkan kunci dari Microsoft sudo rpm –import https://packages.microsoft.com/keys/microsoft.asc Tambahkan repositori Microsoft Edge Dev sudo zypper ar https://packages.microsoft.com/yumrepos/edge microsoft-edge-dev Segarkan repositori sudo..."
image: "https://raw.githubusercontent.com/opensuse-id/blog-images-restore/refs/heads/main/2020/mencoba-microsoft-edge-dev-pada-opensuse-leap/Cuplikan-layar-dari-2020-10-21-13-46-25.png"
---

Panduan ini dicoba pada openSUSE Leap 15.2. Langkahnya:

1. Tambahkan kunci dari Microsoft
   ```
   sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
   ```
2. Tambahkan repositori Microsoft Edge Dev
   ```
   sudo zypper ar https://packages.microsoft.com/yumrepos/edge microsoft-edge-dev
   ```
3. Segarkan repositori
   ```
   sudo zypper refresh
   ```
4. Pasang Microsoft Edge Dev
   ```
   sudo zypper install microsoft-edge-dev
   ```

Selamat mencoba!