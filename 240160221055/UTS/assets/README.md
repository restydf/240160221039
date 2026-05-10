# 🧑‍💻 Rasya Putri Ramadhani — Portfolio Website

## Fitur

- **Dark/Light Mode** — Toggle tema tersimpan di localStorage
- **Custom Cursor** — Kursor animasi dengan efek hover
- **Page Loader** — Animasi loading saat halaman pertama dibuka
- **Responsive Design** — Mobile, tablet, dan desktop
- **Smooth Scrolling** — Navigasi mulus antar section
- **Active Nav Spy** — Link aktif mengikuti posisi scroll
- **Hero Section** — Animasi CSS blob, floating card, dan ring
- **Skill Tabs** — Tab Frontend / Backend / Tools dengan animasi progress bar
- **Counter Animation** — Angka statistik yang naik saat terlihat
- **Portfolio Filter** — Filter kategori proyek dengan animasi
- **Lightbox** — Preview proyek dengan navigasi keyboard, swipe, dan tombol
- **Form Validasi** — Validasi realtime dengan feedback error per-field
- **Scroll Reveal** — Elemen muncul saat di-scroll
- **Lazy Loading** — Gambar dimuat saat akan terlihat 

## Struktur Proyek

```
project-root/
│
├── index.html              # Halaman utama
└── assets/
    ├── css/
    │   └── custom.css      # Stylesheet utama
    ├── js/
    │   └── script.js       # Logika JavaScript
    ├── images/
    │   ├── profile/        # Foto profil 
    │   ├── projects/       # Screenshot proyek 
    │   ├── logo.svg        # Logo personal
    │   └── Preview/        # Preview Web
    ├── icons/
    │   ├── social/         # Ikon media sosial
    │   └── skills/         # Ikon kemampuan
    ├── docs/
    │   └── CV Rasya Putri Ramadhani - 240160221055.pdf  # CV untuk diunduh
    └── README.md
```

## Teknologi

| Kategori | Teknologi |
|----------|-----------|
| Markup   | HTML5 Semantic |
| Styling  | CSS3 Custom Properties, Flexbox, Grid |
| Logika   | Vanilla JavaScript ES6+ |
| Font     | Syne (display) + DM Sans (body) via Google Fonts |
| Icon     | Font Awesome 6 |
| Animasi  | CSS Keyframes + IntersectionObserver API |

## Cara Penggunaan

1. Clone atau download repository ini
2. Buka `index.html` di browser (atau gunakan Live Server di VS Code)
3. Sesuaikan data personal di `index.html`:
   - Nama, tagline, deskripsi
   - Link media sosial
   - Data proyek di `assets/js/script.js` (array `projects`)
4. Ganti foto profil di `assets/images/profile/`
5. Upload screenshot proyek ke `assets/images/projects/`
6. Ganti link PDF CV di tombol "Download CV"

## Kustomisasi

Semua warna dan variabel desain ada di bagian `:root` dalam `custom.css`:

```css
:root {
  --accent:   #6c63ff;   /* Warna utama */
  --accent-2: #3ecfcf;   /* Warna sekunder */
  /* ... dst */
}
```

## Tampilan Web

![Preview](images/Preview/home1.png)
![Preview](images/Preview/about1.png)
![Preview](images/Preview/portofolio1.png)
![Preview](images/Preview/contact1.png)
![Preview](images/Preview/home2.png)
![Preview](images/Preview/aboutt2.png)
![Preview](images/Preview/portofolio2.png)
![Preview](images/Preview/contact2.png)