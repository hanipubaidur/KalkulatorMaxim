# Kalkulator Tarif Maxim (Bike & Car)

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/versi-2.0-blue?style=for-the-badge" alt="Versi">
  <img src="https://img.shields.io/badge/lisensi-MIT-green?style=for-the-badge" alt="Lisensi">
</p>

Sebuah tool berbasis web sederhana untuk membantu mitra driver Maxim menghitung dan memberikan estimasi tarif untuk orderan offline. Proyek ini mendukung layanan **Bike** dan **Car**, dibuat berdasarkan analisis data dan reverse-engineering tarif di area Yogyakarta.

### Tampilan Aplikasi
<p align="center">
  <img src="https://imgur.com/a/XtibB0z" alt="Tampilan Aplikasi Kalkulator Bike" width="350">
  <img src="https://imgur.com/a/FUtnQPU" alt="Tampilan Aplikasi Kalkulator Car" width="350">
</p>

---

## 🌐 Demo Langsung (Live Demo)

Aplikasi ini sudah di-hosting dan bisa diakses langsung melalui link di bawah ini.

**[➡️ Buka Kalkulator Tarif Maxim (Bike & Car) ⬅️](https://hanipubaidur.github.io/KalkulatorMaxim/)**

---

## 🆕 Apa Yang Baru

- Update tampilan aplikasi pada README dengan dua screenshot terbaru.
- Logic perhitungan untuk layanan **Car** telah diperbarui.

---

## ✨ Fitur Utama

-   **Pemilihan Layanan:** Pilih antara layanan **Bike** dan **Car** untuk perhitungan yang spesifik.
-   **Kalkulasi Dua Arah:** Hitung **Tarif dari Jarak** (KM -> Rp) dan estimasi **Jarak dari Tarif** (Rp -> KM).
-   **Tombol Swap:** Tukar mode perhitungan dengan mudah hanya dengan satu klik.
-   **Penanganan Desimal:** Menerima input jarak dengan format desimal, baik menggunakan titik (`4.5`) maupun koma (`4,5`).
-   **Sapaan Dinamis:** Memberikan ucapan selamat (Pagi, Siang, Sore, Malam) sesuai waktu lokal.
-   **Desain Responsif:** Tampilan optimal di berbagai perangkat.
-   **Transparansi Rumus:** Dilengkapi keterangan dinamis yang menampilkan formula sesuai layanan yang dipilih.

---

## 💻 Teknologi yang Digunakan

-   **HTML5:** Untuk struktur dasar halaman.
-   **CSS3 & Bootstrap 5:** Untuk styling dan layout responsif.
-   **JavaScript (ES6):** Untuk semua logika fungsional dan interaktivitas.

---

## 🚀 Cara Penggunaan

### 1. Akses Langsung (Online)
Cara termudah adalah dengan mengunjungi **[link demo langsung](https://hanipubaidur.github.io/KalkulatorMaxim/)**. Aplikasi bisa langsung digunakan dari browser di HP maupun desktop.

### 2. Penggunaan Lokal (Offline)
1.  **Unduh Proyek:** Di halaman GitHub, klik tombol hijau **`< > Code`**, lalu pilih **`Download ZIP`**. Ekstrak file tersebut.
2.  **Buka di Browser:** Masuk ke folder hasil ekstrak dan klik dua kali file `index.html`.

---

## ➗ Formula Perhitungan

Kalkulator ini menggunakan formula berbeda untuk setiap layanan, ditemukan dari hasil analisis data orderan nyata.

### Layanan Maxim Bike
-   **Formula:** `(Jarak × Rp 2.400) - Rp 1.800`
-   **Tarif Minimal:** `Rp 8.900`

### Layanan Maxim Car
-   **Formula:** `(Jarak × Rp 4.150) + Rp 3.100`
-   **Tarif Minimal:** `Rp 12.100`

**Disclaimer:** Formula ini adalah hasil estimasi dan reverse-engineering. Tarif final di aplikasi resmi Maxim dapat berbeda tergantung pada kondisi lalu lintas, waktu pemesanan, dan kebijakan terbaru dari Maxim.

---

## 👤 Kredit

Dibuat dan dikembangkan berdasarkan ide dan data dari **Hanif Ubaidur Rohman Syah**.

-   **GitHub:** [hanipubaidur](https://github.com/hanipubaidur)

Proyek ini berada di bawah Lisensi MIT.