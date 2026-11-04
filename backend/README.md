# ⚙️ Backend API & Database Controller — MTs YASUA Pilangwetan

Dokumentasi resmi untuk modul Backend Serverless Google Apps Script yang mengontrol database Google Sheets dan penyimpanan berkas Google Drive resmi madrasah.

---

## 📌 Identitas Proyek & Cloud Ecosystem

* **Google Apps Script Project**: [Buka di Apps Script Editor](https://script.google.com/u/0/home/projects/1Jah5Qlt01G9i0j7zGyDv-F_fsMYk82pkWMcmpzGX6Ki91wXIR-wTm-uW/edit)
* **Script ID**: `1Jah5Qlt01G9i0j7zGyDv-F_fsMYk82pkWMcmpzGX6Ki91wXIR-wTm-uW`
* **Spreadsheet Database ID**: `1m1uFzrLKoouVNAMwyWglJrYL_CWSVy-P2aScjM_KUjU`
* **Google Drive Upload Folder ID**: `1vGgLqgV9YlbqWjGo3TdF0EgZmUOH2uh2`
* **Deployed Web App URL**:
  `https://script.google.com/macros/s/AKfycbxNFLoL96Ch_8QOKhp5AFauIGb9GcMpd9eb3my_zqikL0sDuncgRhDPD6tez-fuY6wT/exec`

---

## 🗂️ Struktur File Backend

```text
backend/
├── .clasp.json        # Konfigurasi Google Clasp CLI
├── appsscript.json    # Manifest konfigurasi Google Apps Script (Timezone & Scopes)
├── Code.js            # Source code lengkap controller API (v1.5)
└── README.md          # Dokumentasi teknis dan panduan operasional backend
```

---

## 📊 Skema Database (Google Sheets)

Database menggunakan tab-tab terpisah di dalam spreadsheet madrasah:

1. **`news` (Berita & Pengumuman)**:
   * Kolom: `id`, `urutan`, `judul`, `kategori`, `badge_class`, `tanggal`, `penulis`, `gambar_url`, `ringkasan`, `konten`, `is_featured`, `status_aktif`, `views`, `slug`, `read_time`, `created_at`, `updated_at`.
2. **`teachers` (Data Dewan Guru & Tenaga Kependidikan)**:
   * Kolom: `id`, `urutan`, `nama`, `jabatan`, `kategori`, `mapel`, `pendidikan`, `foto_url`, `status_aktif`, `created_at`, `updated_at`.
3. **`hero_slides` (Slider Beranda 5 Foto)**:
   * Kolom: `id`, `urutan`, `judul`, `subjudul`, `deskripsi`, `gambar_url`, `status_aktif`.
4. **`banners` (Banner Pengumuman Rasio 3:1)**:
   * Kolom: `id`, `urutan`, `judul`, `gambar_url`, `link_url`, `status_aktif`.
5. **`settings` (Konfigurasi Ticker & Sistem)**:
   * Key-value konfigurasi pengumuman berjalan.

---

## 🌐 Referensi Endpoint API

### A. HTTP GET (`doGet`)
* `?action=getNews` : Mengambil seluruh arsip berita yang terbit.
* `?action=getTeachers` : Mengambil daftar dewan guru.
* `?action=getHeroSlides` : Mengambil data slider foto beranda.
* `?action=getBanners` : Mengambil daftar banner promosi 3:1.
* `?action=getSummary` : Mengambil ringkasan metrik jumlah seluruh data.
* `?action=incrementViews&id={id_or_slug}` : Menambahkan counter pembaca (+1).

### B. HTTP POST (`doPost`)
Semua request POST memerlukan parameter otentikasi `password: "..."`.
* `action: 'addNews'` : Menambahkan berita baru.
* `action: 'updateNews'` : Memperbarui berita yang ada berdasarkan `id`.
* `action: 'deleteNews'` : Menghapus berita berdasarkan `id`.
* `action: 'uploadNewsPhoto'` : Mengunggah file Base64 langsung ke folder Google Drive resmi.
* `action: 'addTeacher'`, `updateTeacher`, `deleteTeacher`, `uploadTeacherPhoto`.
* `action: 'saveAllHeroSlides'`, `uploadHeroPhoto`.
* `action: 'saveAllBanners'`, `uploadBannerPhoto`.
* `action: 'saveAnnouncement'` : Memperbarui teks ticker pengumuman atas.

---

## 🚀 Prosedur Deploy Versi Baru

1. Perbarui kode pada [`Code.js`](./Code.js).
2. Salin kode ke [Google Apps Script Editor](https://script.google.com/u/0/home/projects/1Jah5Qlt01G9i0j7zGyDv-F_fsMYk82pkWMcmpzGX6Ki91wXIR-wTm-uW/edit).
3. Klik **Simpan (Save)** 💾.
4. Klik **Deploy** $\rightarrow$ **Kelola Deployment** $\rightarrow$ **Edit (ikon pensil)** $\rightarrow$ Pilih **Versi Baru** $\rightarrow$ Klik **Deploy**.

