# Kalkulator Tarif Maxim Offline

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/versi-1.3-green?style=for-the-badge" alt="Versi">
  <img src="https://img.shields.io/badge/lisensi-MIT-blue?style=for-the-badge" alt="Lisensi">
</p>

Sebuah tool berbasis web sederhana untuk membantu mitra driver Maxim menghitung dan memberikan estimasi tarif untuk orderan offline. Proyek ini dibuat berdasarkan analisis data dan reverse-engineering tarif layanan Maxim Bike di area Yogyakarta.

---

## 🌐 Demo Langsung (Live Demo)

Aplikasi ini sudah di-hosting dan bisa diakses langsung melalui link di bawah ini.

**[➡️ Buka Kalkulator Tarif Maxim Sekarang ⬅️](https://hanipubaidur.github.io/KalkulatorMaxim/)**

---

## ✨ Fitur Utama

-   **Kalkulasi Dua Arah:** Hitung **Tarif dari Jarak** (KM -> Rp) dan estimasi **Jarak dari Tarif** (Rp -> KM).
-   **Tombol Swap:** Tukar mode perhitungan dengan mudah hanya dengan satu klik.
-   **Penanganan Desimal:** Menerima input jarak dengan format desimal, baik menggunakan titik (`4.5`) maupun koma (`4,5`).
-   **Sapaan Dinamis:** Memberikan ucapan selamat (Pagi, Siang, Sore, Malam) sesuai dengan waktu lokal pengguna.
-   **Desain Responsif:** Tampilan optimal di berbagai perangkat, mulai dari ponsel hingga desktop.
-   **Tema Nyaman:** Menggunakan skema warna kuning-hitam-putih khas Maxim yang sudah disesuaikan agar tidak menyilaukan mata.
-   **Transparansi Rumus:** Dilengkapi keterangan mengenai formula perhitungan yang digunakan untuk menjaga transparansi.

---

## 💻 Teknologi yang Digunakan

Proyek ini dibangun murni dengan teknologi front-end standar:

-   **HTML5:** Untuk struktur dasar halaman.
-   **CSS3:** Untuk styling, dengan bantuan dari:
    -   **Bootstrap 5:** Framework untuk layout responsif dan komponen UI.
    -   **Bootstrap Icons:** Untuk ikon-ikon yang informatif.
    -   **Google Fonts (Poppins):** Untuk tipografi yang lebih modern.
-   **JavaScript (ES6):** Untuk semua logika fungsional, termasuk kalkulasi, interaksi DOM, dan fitur dinamis.

---

## 🚀 Cara Penggunaan

Ada dua cara untuk menggunakan kalkulator ini:

### 1. Akses Langsung (Online)

Cara termudah adalah dengan mengunjungi link demo langsung di atas. Aplikasi bisa langsung digunakan dari browser di HP maupun desktop tanpa perlu instalasi apa pun.

### 2. Penggunaan Lokal (Offline)

Jika Anda ingin menjalankan file ini secara offline dari komputer Anda:

1.  **Unduh Proyek**
    -   Kunjungi halaman repository di GitHub.
    -   Klik tombol hijau **`< > Code`**, lalu pilih **`Download ZIP`**.
    -   Ekstrak file ZIP yang sudah Anda unduh.

2.  **Buka di Browser**
    -   Masuk ke dalam folder hasil ekstrak tersebut.
    -   Cari file `index.html` dan klik dua kali. File akan otomatis terbuka di browser default Anda (Chrome, Firefox, dll).

3.  **Siap Digunakan**
    -   Kalkulator kini siap digunakan sepenuhnya secara offline.

---

## ➗ Formula Perhitungan

Kalkulator ini menggunakan formula linear yang ditemukan dari hasil analisis data orderan nyata:

Estimasi Tarif = (Jarak Perjalanan [km] × Rp 2.400) - Rp 1.800

-   **Tarif Minimal:** Diterapkan tarif minimal sebesar **Rp 8.900**. Jika hasil perhitungan formula lebih rendah dari angka ini, maka tarif minimal yang akan ditampilkan.
-   **Pembulatan:** Hasil akhir dibulatkan ke atas ke ratusan terdekat.

**Disclaimer:** Formula ini adalah hasil estimasi dan reverse-engineering. Tarif final yang ditampilkan di aplikasi resmi Maxim dapat sedikit berbeda tergantung pada kondisi lalu lintas, waktu pemesanan, dan kebijakan terbaru dari Maxim.

---

## 👤 Kredit

Dibuat dan dikembangkan berdasarkan ide dari **Hanif Ubaidur Rohman Syah**.

-   **GitHub:** [hanipubaidur](https://github.com/hanipubaidur)

Proyek ini berada di bawah Lisensi MIT.