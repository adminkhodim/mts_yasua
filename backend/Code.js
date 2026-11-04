/**
 * ===================================================================
 * API BACKEND & DATABASE CONTROLLER - MTs YASUA PILANGWETAN (v1.4)
 * Modul: Data Guru, Hero 5 Foto, Banner 3:1, Pengumuman, & Berita/Artikel
 * Spreadsheet ID: 1m1uFzrLKoouVNAMwyWglJrYL_CWSVy-P2aScjM_KUjU
 * Drive Folder ID: 1vGgLqgV9YlbqWjGo3TdF0EgZmUOH2uh2
 * ===================================================================
 */

const CONFIG = {
  SPREADSHEET_ID: '1m1uFzrLKoouVNAMwyWglJrYL_CWSVy-P2aScjM_KUjU',
  DRIVE_FOLDER_ID: '1vGgLqgV9YlbqWjGo3TdF0EgZmUOH2uh2',
  SHEET_TEACHERS: 'teachers',
  SHEET_BANNERS: 'banners',
  SHEET_HERO: 'hero_slides',
  SHEET_NEWS: 'news',
  SHEET_SETTINGS: 'settings',
  DEFAULT_ADMIN_PASS: 'adminyasua2026'
};

/**
 * INISIALISASI DATABASE LENGKAP
 * Jalankan fungsi ini 1x di editor Apps Script (Pilih setupDatabase -> Klik Run)
 */
function setupDatabase() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

  // A. Setup Sheet 'teachers'
  let sheetTeachers = ss.getSheetByName(CONFIG.SHEET_TEACHERS);
  if (!sheetTeachers) {
    sheetTeachers = ss.insertSheet(CONFIG.SHEET_TEACHERS);
    const headers = [
      'id', 'urutan', 'nama', 'nip', 'kategori', 'jabatan',
      'mapel', 'badge', 'pendidikan', 'deskripsi', 'foto_url',
      'status_aktif', 'created_at', 'updated_at'
    ];
    sheetTeachers.appendRow(headers);
    sheetTeachers.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sheetTeachers.setFrozenRows(1);
  }

  // B. Setup Sheet 'banners' (Rasio 3:1 Promo Mobile)
  let sheetBanners = ss.getSheetByName(CONFIG.SHEET_BANNERS);
  if (!sheetBanners) {
    sheetBanners = ss.insertSheet(CONFIG.SHEET_BANNERS);
    const headers = [
      'id', 'urutan', 'badge', 'badge_color', 'judul',
      'deskripsi', 'gambar_url', 'link_url', 'status_aktif', 'updated_at'
    ];
    sheetBanners.appendRow(headers);
    sheetBanners.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sheetBanners.setFrozenRows(1);

    const defaultBanners = [
      ['BANNER-1', 1, 'Madrasah Digital', 'emerald', 'Unggul Teknologi & Kurikulum Terpadu', 'Lab CBT modern, literasi digital Islami, & pembelajaran interaktif.', 'banner_1.jpg', 'program.html', true, new Date().toISOString()],
      ['BANNER-2', 2, 'Tahfidz & Prestasi', 'amber', 'Generasi Qur\'ani Berprestasi Juara', 'Bimbingan tahfidz intensif, akhlak mulia, & rekam jejak juara.', 'banner_2.jpg', 'prestasi.html', true, new Date().toISOString()],
      ['BANNER-3', 3, 'Tradisi Salafiyah', 'teal', 'Kajian Kitab Salaf & Karakter Santri', 'Sorogan, bandongan fiqih-akhlak, & pembiasaan adab kepesantrenan.', 'banner_3.jpg', 'program.html', true, new Date().toISOString()]
    ];
    defaultBanners.forEach(row => sheetBanners.appendRow(row));
  }

  // C. Setup Sheet 'hero_slides' (5 Foto Hero Desktop Web)
  let sheetHero = ss.getSheetByName(CONFIG.SHEET_HERO);
  if (!sheetHero) {
    sheetHero = ss.insertSheet(CONFIG.SHEET_HERO);
    const headers = [
      'id', 'urutan', 'badge_icon', 'badge_text', 'judul',
      'deskripsi', 'gambar_url', 'thumb_title', 'status_aktif', 'updated_at'
    ];
    sheetHero.appendRow(headers);
    sheetHero.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sheetHero.setFrozenRows(1);

    const defaultHeroSlides = [
      ['HERO-1', 1, 'building-2', 'Kampus MTs YASUA', 'Gedung Pembelajaran Terpadu', 'Lingkungan madrasah yang asri, nyaman, dan berwibawa di Pilangwetan.', 'foto-gedung.webp', 'Gedung Kampus', true, new Date().toISOString()],
      ['HERO-2', 2, 'users', 'Kedisiplinan & Akhlak', 'Apel Pagi & Pembinaan Siswa', 'Membiasakan ketertiban, adab, dan rasa kebersamaan seluruh siswa-siswi.', 'foto-upacara.webp', 'Apel Pagi Siswa', true, new Date().toISOString()],
      ['HERO-3', 3, 'laptop', 'Literasi Digital', 'Praktik Komputer & ANBK', 'Penguasaan teknologi modern untuk mencetak generasi cerdas digital.', 'foto-labkom.webp', 'Laboratorium Komputer', true, new Date().toISOString()],
      ['HERO-4', 4, 'heart', 'Pembiasaan Ibadah', 'Shalat Berjamaah di Masjid', 'Penanaman nilai iman, taqwa, dan khusyuk dalam ibadah harian siswa putra.', 'foto-sholat-santri.webp', 'Sholat Berjamaah Siswa', true, new Date().toISOString()],
      ['HERO-5', 5, 'book-open', 'Bimbingan Siswi Putri', 'Bimbingan Belajar & Al-Qur\'an', 'Suasana khidmah pembinaan tahfidz Al-Qur\'an dan adab siswi.', 'foto-kajian-santriwati.webp', 'Bimbingan Siswi', true, new Date().toISOString()]
    ];
    defaultHeroSlides.forEach(row => sheetHero.appendRow(row));
  }

  // D. Setup Sheet 'news' (Berita & Pengumuman Madrasah)
  let sheetNews = ss.getSheetByName(CONFIG.SHEET_NEWS);
  if (!sheetNews) {
    sheetNews = ss.insertSheet(CONFIG.SHEET_NEWS);
    const headers = [
      'id', 'urutan', 'judul', 'kategori', 'badge_class',
      'tanggal', 'penulis', 'gambar_url', 'ringkasan', 'konten',
      'is_featured', 'status_aktif', 'created_at', 'updated_at'
    ];
    sheetNews.appendRow(headers);
    sheetNews.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sheetNews.setFrozenRows(1);

    const defaultNews = [
      [
        'NEWS-001', 1, 'Penilaian Tengah Semester (PTS) Gasal MTs YASUA Pilangwetan', 'Akademik', 'bg-blue-600 text-white',
        '5 - 10 Oktober 2026', 'Waka Kurikulum', 'poster_pts_berita.webp',
        'Diberitahukan kepada seluruh siswa-siswi kelas VII, VIII, dan IX serta Bapak/Ibu Wali Murid bahwa pelaksanaan PTS terpadu dilaksanakan berbasis asesmen tertulis dan digital komputer.',
        '<p class="mb-3">Pelaksanaan Penilaian Tengah Semester (PTS) Gasal Tahun Ajaran 2026/2027 MTs YASUA Pilangwetan diselenggarakan serentak untuk seluruh jenjang kelas VII, VIII, dan IX.</p><p class="mb-3">Asesmen menggabungkan ujian tertulis pendalaman materi keagamaan (Kitab Salaf, Fiqih, Al-Qur\'an Hadits) dan Computer Based Test (CBT) di Laboratorium Komputer untuk mata pelajaran umum.</p><p class="text-xs text-slate-500 italic mt-4">— Panitia PTS Gasal MTs YASUA Pilangwetan</p>',
        true, true, new Date().toISOString(), new Date().toISOString()
      ],
      [
        'NEWS-002', 2, 'Siswa MTs YASUA Raih Juara 1 Olimpiade Sains & Robotika Tingkat Provinsi Jawa Tengah', 'Prestasi', 'bg-emerald-600 text-white',
        '22 September 2026', 'Humas & Pembina Robotika', 'foto-upacara.webp',
        'Kabar membanggakan diraih delegasi siswa madrasah dalam ajang bergengsi sains dan teknologi terapan.',
        '<p class="mb-3">Prestasi gemilang kembali ditorehkan santri MTs YASUA Pilangwetan dalam ajang Olimpiade Sains dan Robotika Madrasah Tingkat Provinsi Jawa Tengah.</p><p class="mb-3">Melalui inovasi alat penyiram tanaman otomatis berbasis sensor mikrokontroler ramah lingkungan, tim siswa berhasil menyisihkan puluhan peserta dari berbagai kabupaten dan membawa pulang Trofi Juara 1 serta beasiswa pembinaan.</p><p class="text-xs text-slate-500 italic mt-4">— Humas & Tim Pembina Prestasi MTs YASUA</p>',
        false, true, new Date().toISOString(), new Date().toISOString()
      ],
      [
        'NEWS-003', 3, 'Workshop Parenting Akbar: Membangun Sinergi Rumah dan Sekolah Menuju Generasi Qur\'ani', 'Berita & Kegiatan', 'bg-blue-600 text-white',
        '15 September 2026', 'Komite Madrasah', 'foto-kajian-santriwati.webp',
        'Silaturahmi wali murid dan komite madrasah mendiskusikan bimbingan moral anak di era serba digital.',
        '<p class="mb-3">MTs YASUA Pilangwetan sukses menggelar kegiatan Workshop Parenting Akbar dan Silaturahmi Wali Siswa di Aula Madrasah yang dihadiri oleh ratusan orang tua/wali murid dari kelas VII, VIII, dan IX.</p><p class="mb-3">Mengangkat tema “Membina Karakter Islami di Era Serba Digital”, narasumber membagikan wawasan aplikatif mengenai pentingnya keteladanan orang tua, pendampingan belajar di rumah, serta sinergi erat bersama bapak/ibu guru di madrasah.</p><p class="text-xs text-slate-500 italic mt-4">— Komite Madrasah & Dewan Guru MTs YASUA</p>',
        false, true, new Date().toISOString(), new Date().toISOString()
      ],
      [
        'NEWS-004', 4, 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Resmi Dibuka', 'Pengumuman', 'bg-amber-600 text-white',
        '10 September 2026', 'Panitia PPDB', 'foto-gedung.webp',
        'Tersedia jalur prestasi beasiswa tahfidz serta jalur reguler bagi lulusan SD/MI se-Kabupaten Demak.',
        '<p class="mb-3">Panitia PPDB MTs YASUA Pilangwetan resmi membuka pendaftaran peserta didik baru untuk Tahun Pelajaran 2026/2027. Tersedia Jalur Prestasi (Beasiswa Tahfidz & Akademik) serta Jalur Reguler.</p><p class="mb-3">Pendaftaran dapat dilakukan secara langsung di Sekretariat Pendaftaran Kampus MTs YASUA maupun secara online melalui portal PPDB web ini.</p><p class="text-xs text-slate-500 italic mt-4">— Panitia PPDB MTs YASUA Pilangwetan</p>',
        false, true, new Date().toISOString(), new Date().toISOString()
      ],
      [
        'NEWS-005', 5, 'Khataman Al-Qur\'an & Doa Bersama Jelang Ujian Asesmen Madrasah', 'Berita & Kegiatan', 'bg-purple-600 text-white',
        '1 September 2026', 'Sie Keagamaan & Humas', 'foto-sholat-santri.webp',
        'Khataman bil ghaib dan doa munajat bersama para kiai dan guru untuk keberkahan santri madrasah.',
        '<p class="mb-3">Seluruh civitas akademika MTs YASUA Pilangwetan menggelar doa bersama dan Khatmil Qur\'an 30 Juz di Masjid madrasah menjelang pelaksanaan Asesmen Madrasah.</p><p class="mb-3">Kegiatan ini diawali shalat Dhuha berjamaah dilanjutkan pembacaan istighotsah dan shalawat nariyah bersama segenap masyayikh dan dewan asatidz demi kelancaran dan kesuksesan siswa.</p><p class="text-xs text-slate-500 italic mt-4">— Sie Keagamaan MTs YASUA Pilangwetan</p>',
        false, true, new Date().toISOString(), new Date().toISOString()
      ]
    ];
    defaultNews.forEach(row => sheetNews.appendRow(row));
  }

  // E. Setup Sheet 'settings'
  let sheetSettings = ss.getSheetByName(CONFIG.SHEET_SETTINGS);
  if (!sheetSettings) {
    sheetSettings = ss.insertSheet(CONFIG.SHEET_SETTINGS);
    sheetSettings.appendRow(['key', 'value', 'description']);
    sheetSettings.appendRow(['admin_password', CONFIG.DEFAULT_ADMIN_PASS, 'Password otentikasi portal admin']);
    sheetSettings.appendRow(['announcement_text', 'Selamat Datang di Portal Resmi MTs YASUA Pilangwetan', 'Pengumuman ticker running text']);
    sheetSettings.appendRow(['announcement_active', 'true', 'Status tampil pengumuman']);
    sheetSettings.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sheetSettings.setFrozenRows(1);
  }

  return { status: 'success', message: 'Semua tabel (teachers, banners, hero_slides, news, settings) berhasil diinisialisasi!' };
}

/**
 * ENTRYPOINT GET REQUEST
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'getTeachers';

    switch (action) {
      case 'getTeachers':
        return createJsonResponse({ status: 'success', data: fetchAllTeachers() });
      case 'getBanners':
        return createJsonResponse({ status: 'success', data: fetchAllBanners() });
      case 'getHeroSlides':
        return createJsonResponse({ status: 'success', data: fetchAllHeroSlides() });
      case 'getNews':
        return createJsonResponse({ status: 'success', data: fetchAllNews() });
      case 'incrementViews':
        return createJsonResponse({ status: 'success', data: incrementNewsViewsBackend(e.parameter.id || e.parameter.slug) });
      case 'getSettings':
        return createJsonResponse({ status: 'success', data: fetchAllSettings() });
      case 'getSummary':
        return createJsonResponse({
          status: 'success',
          teachers: fetchAllTeachers().length,
          banners: fetchAllBanners().length,
          heroSlides: fetchAllHeroSlides().length,
          news: fetchAllNews().length
        });
      default:
        return createJsonResponse({ status: 'error', message: 'Action tidak dikenal' });
    }
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

/**
 * ENTRYPOINT POST REQUEST
 */
function doPost(e) {
  try {
    let payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      payload = e.parameter;
    }

    const action = payload.action;
    const adminPass = payload.admin_password || payload.password;

    // Proteksi Password
    if (adminPass !== getAdminPassword()) {
      return createJsonResponse({ status: 'error', message: 'Password Administrator salah' });
    }

    let result;
    switch (action) {
      // Guru
      case 'addTeacher':
        result = addNewTeacher(payload.data);
        return createJsonResponse({ status: 'success', data: result });
      case 'updateTeacher':
        result = updateTeacherData(payload.id, payload.data);
        return createJsonResponse({ status: 'success', data: result });
      case 'deleteTeacher':
        result = deleteTeacherById(payload.id);
        return createJsonResponse({ status: 'success', message: 'Guru berhasil dihapus' });
      case 'uploadTeacherPhoto':
        result = uploadPhotoToDrive(payload.filename, payload.base64, 'GURU');
        return createJsonResponse({ status: 'success', data: result });

      // Hero Slider (5 Foto)
      case 'updateHeroSlide':
        result = updateHeroSlideData(payload.id, payload.data);
        return createJsonResponse({ status: 'success', data: result });
      case 'saveAllHeroSlides':
        result = saveBulkHeroSlides(payload.slides);
        return createJsonResponse({ status: 'success', data: result });
      case 'uploadHeroPhoto':
        result = uploadPhotoToDrive(payload.filename, payload.base64, 'HERO');
        return createJsonResponse({ status: 'success', data: result });

      // Banner Promo (3:1)
      case 'saveAllBanners':
        result = saveBulkBanners(payload.banners);
        return createJsonResponse({ status: 'success', data: result });
      case 'uploadBannerPhoto':
        result = uploadPhotoToDrive(payload.filename, payload.base64, 'BANNER');
        return createJsonResponse({ status: 'success', data: result });

      // Berita & Pengumuman
      case 'addNews':
        result = addNewNews(payload.data);
        return createJsonResponse({ status: 'success', data: result });
      case 'updateNews':
        result = updateNewsData(payload.id, payload.data);
        return createJsonResponse({ status: 'success', data: result });
      case 'deleteNews':
        result = deleteNewsById(payload.id);
        return createJsonResponse({ status: 'success', message: 'Berita berhasil dihapus' });
      case 'uploadNewsPhoto':
        result = uploadPhotoToDrive(payload.filename, payload.base64, 'NEWS');
        return createJsonResponse({ status: 'success', data: result });

      // Pengaturan Ticker
      case 'saveAnnouncement':
        result = saveAnnouncementSetting(payload.text, payload.active);
        return createJsonResponse({ status: 'success', data: result });

      default:
        return createJsonResponse({ status: 'error', message: 'Action POST tidak dikenal' });
    }
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

// ==========================================
// OPERASI BERITA & ARTIKEL (SHEET 'news' - v1.5 DILENGKAPI VIEWS & SLUG)
// ==========================================
function ensureNewsHeaders(sheet) {
  if (!sheet) return;
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) return;
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim().toLowerCase());
  
  const requiredFields = ['views', 'slug', 'read_time'];
  let currentHeaders = [...headers];
  
  requiredFields.forEach(field => {
    if (currentHeaders.indexOf(field) === -1) {
      const newCol = currentHeaders.length + 1;
      sheet.getRange(1, newCol).setValue(field)
        .setFontWeight('bold')
        .setBackground('#022c1f')
        .setFontColor('#ffffff');
      currentHeaders.push(field);
    }
  });
}

function generateBackendSlug(title) {
  return (title || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function calculateBackendReadTime(content) {
  const plainText = (content || '').replace(/<[^>]*>/g, ' ').trim();
  const words = plainText ? plainText.split(/\s+/).filter(w => w.length > 0).length : 0;
  return Math.max(1, Math.ceil(words / 180)) + ' menit baca';
}

function fetchAllNews() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NEWS);
  if (!sheet) return [];
  
  ensureNewsHeaders(sheet);
  
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0].map(h => String(h).trim().toLowerCase());
  const items = [];
  
  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    
    // Fallback otomatis jika field baru belum terisi di baris lama
    if (obj.views === undefined || obj.views === '' || obj.views === null) {
      obj.views = 1500 + (i * 240);
    } else {
      obj.views = Number(obj.views) || 0;
    }
    
    if (!obj.slug) {
      obj.slug = generateBackendSlug(obj.judul || obj.id);
    }
    
    if (!obj.read_time) {
      obj.read_time = calculateBackendReadTime(obj.konten);
    }

    items.push(obj);
  }
  return items;
}

function addNewNews(newsData) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NEWS);
  ensureNewsHeaders(sheet);
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0].map(h => String(h).trim().toLowerCase());
  const nextNum = data.length;
  const newId = 'NEWS-' + String(nextNum).padStart(3, '0');
  const now = new Date().toISOString();

  if (newsData.is_featured === true || String(newsData.is_featured).toLowerCase() === 'true') {
    unfeatureAllNews(sheet);
  }

  const judul = newsData.judul || 'Judul Berita';
  const slug = newsData.slug || generateBackendSlug(judul);
  const views = Number(newsData.views) || 1250;
  const readTime = newsData.read_time || calculateBackendReadTime(newsData.konten);

  const rowObj = {
    id: newId,
    urutan: Number(newsData.urutan) || nextNum,
    judul: judul,
    kategori: newsData.kategori || 'Berita & Kegiatan',
    badge_class: newsData.badge_class || 'bg-emerald-600 text-white',
    tanggal: newsData.tanggal || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    penulis: newsData.penulis || 'Humas MTs YASUA',
    gambar_url: newsData.gambar_url || 'poster_pts_berita.webp',
    ringkasan: newsData.ringkasan || '',
    konten: newsData.konten || '',
    is_featured: (newsData.is_featured === true || String(newsData.is_featured).toLowerCase() === 'true'),
    status_aktif: newsData.status_aktif !== undefined ? (newsData.status_aktif === true || String(newsData.status_aktif).toLowerCase() === 'true') : true,
    views: views,
    slug: slug,
    read_time: readTime,
    created_at: now,
    updated_at: now
  };

  const newRow = headers.map(h => rowObj[h] !== undefined ? rowObj[h] : '');
  sheet.appendRow(newRow);
  return { ...rowObj };
}

function updateNewsData(id, updatedData) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NEWS);
  ensureNewsHeaders(sheet);

  const data = sheet.getDataRange().getValues();
  const headers = data[0].map(h => String(h).trim().toLowerCase());

  if (updatedData.is_featured === true || String(updatedData.is_featured).toLowerCase() === 'true') {
    unfeatureAllNews(sheet);
  }

  const idColIdx = headers.indexOf('id');
  const targetCol = idColIdx !== -1 ? idColIdx : 0;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][targetCol]).trim() === String(id).trim()) {
      const rowIdx = i + 1;
      
      // Auto-update read_time jika konten diubah tapi read_time tidak dikirim
      if (updatedData.konten && !updatedData.read_time) {
        updatedData.read_time = calculateBackendReadTime(updatedData.konten);
      }
      if (updatedData.judul && !updatedData.slug) {
        updatedData.slug = generateBackendSlug(updatedData.judul);
      }

      for (const key in updatedData) {
        const colIdx = headers.indexOf(key.toLowerCase());
        if (colIdx !== -1) {
          sheet.getRange(rowIdx, colIdx + 1).setValue(updatedData[key]);
        }
      }
      
      const updatedCol = headers.indexOf('updated_at');
      if (updatedCol !== -1) {
        sheet.getRange(rowIdx, updatedCol + 1).setValue(new Date().toISOString());
      }
      return { id: id, ...updatedData };
    }
  }
  throw new Error('Berita dengan ID ' + id + ' tidak ditemukan');
}

function incrementNewsViewsBackend(targetIdOrSlug) {
  if (!targetIdOrSlug) return false;
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NEWS);
  if (!sheet) return false;
  
  ensureNewsHeaders(sheet);
  const data = sheet.getDataRange().getValues();
  const headers = data[0].map(h => String(h).trim().toLowerCase());
  const idCol = headers.indexOf('id');
  const slugCol = headers.indexOf('slug');
  const viewsCol = headers.indexOf('views');

  if (viewsCol === -1) return false;

  const targetLower = String(targetIdOrSlug).toLowerCase().trim();
  for (let i = 1; i < data.length; i++) {
    const rowId = String(data[i][idCol] || '').toLowerCase().trim();
    const rowSlug = slugCol !== -1 ? String(data[i][slugCol] || '').toLowerCase().trim() : '';
    if (rowId === targetLower || (rowSlug && rowSlug === targetLower)) {
      const current = Number(data[i][viewsCol]) || 0;
      sheet.getRange(i + 1, viewsCol + 1).setValue(current + 1);
      return { id: data[i][idCol], views: current + 1 };
    }
  }
  return false;
}

function unfeatureAllNews(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const featCol = headers.indexOf('is_featured');
  if (featCol !== -1) {
    for (let i = 1; i < data.length; i++) {
      sheet.getRange(i + 1, featCol + 1).setValue(false);
    }
  }
}

function deleteNewsById(id) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_NEWS);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  throw new Error('Berita dengan ID ' + id + ' tidak ditemukan');
}

// ==========================================
// OPERASI HERO SLIDES (SHEET 'hero_slides')
// ==========================================
function fetchAllHeroSlides() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_HERO);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const items = [];
  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    items.push(obj);
  }
  return items;
}

function updateHeroSlideData(id, updatedData) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_HERO);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) {
      const rowIdx = i + 1;
      for (const key in updatedData) {
        const colIdx = headers.indexOf(key);
        if (colIdx !== -1) {
          sheet.getRange(rowIdx, colIdx + 1).setValue(updatedData[key]);
        }
      }
      const updatedCol = headers.indexOf('updated_at');
      if (updatedCol !== -1) {
        sheet.getRange(rowIdx, updatedCol + 1).setValue(new Date().toISOString());
      }
      return { id: id, ...updatedData };
    }
  }
  throw new Error('Hero Slide dengan ID ' + id + ' tidak ditemukan');
}

function saveBulkHeroSlides(slides) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_HERO);
  const now = new Date().toISOString();

  sheet.clearContents();
  const headers = [
    'id', 'urutan', 'badge_icon', 'badge_text', 'judul',
    'deskripsi', 'gambar_url', 'thumb_title', 'status_aktif', 'updated_at'
  ];
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');

  slides.forEach((s, idx) => {
    sheet.appendRow([
      s.id || ('HERO-' + (idx + 1)),
      Number(s.urutan) || (idx + 1),
      s.badge_icon || 'building-2',
      s.badge_text || '',
      s.judul || '',
      s.deskripsi || '',
      s.gambar_url || '',
      s.thumb_title || '',
      s.status_aktif !== undefined ? s.status_aktif : true,
      now
    ]);
  });
  return { updated: slides.length };
}

// ==========================================
// OPERASI BANNER PROMO (SHEET 'banners')
// ==========================================
function fetchAllBanners() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_BANNERS);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const items = [];
  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    items.push(obj);
  }
  return items;
}

function saveBulkBanners(banners) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_BANNERS);
  const now = new Date().toISOString();

  sheet.clearContents();
  const headers = [
    'id', 'urutan', 'badge', 'badge_color', 'judul',
    'deskripsi', 'gambar_url', 'link_url', 'status_aktif', 'updated_at'
  ];
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');

  banners.forEach((b, idx) => {
    sheet.appendRow([
      b.id || ('BANNER-' + (idx + 1)),
      Number(b.urutan) || (idx + 1),
      b.badge || '',
      b.badge_color || 'emerald',
      b.judul || '',
      b.deskripsi || '',
      b.gambar_url || '',
      b.link_url || 'program.html',
      b.status_aktif !== undefined ? b.status_aktif : true,
      now
    ]);
  });
  return { updated: banners.length };
}

// ==========================================
// OPERASI UPLOAD FOTO KE GOOGLE DRIVE
// ==========================================
function uploadPhotoToDrive(originalFilename, base64Data, prefix) {
  const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
  const contentTypeMatch = base64Data.match(/^data:(.*?);base64,/);
  const contentType = contentTypeMatch ? contentTypeMatch[1] : 'image/jpeg';
  const cleanBase64 = base64Data.replace(/^data:.*?;base64,/, '');
  const decodedBytes = Utilities.base64Decode(cleanBase64);

  const ext = originalFilename.split('.').pop() || 'jpg';
  const cleanPrefix = prefix || 'FILE';
  const newFilename = cleanPrefix + '_' + new Date().getTime() + '.' + ext;
  const blob = Utilities.newBlob(decodedBytes, contentType, newFilename);

  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const fileId = file.getId();
  const directLink = 'https://lh3.googleusercontent.com/d/' + fileId;

  return {
    file_id: fileId,
    file_name: newFilename,
    direct_url: directLink
  };
}

// ==========================================
// OPERASI DATA GURU (SHEET 'teachers')
// ==========================================
function fetchAllTeachers() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_TEACHERS);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const items = [];
  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    items.push(obj);
  }
  return items;
}

function addNewTeacher(teacherData) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_TEACHERS);
  const data = sheet.getDataRange().getValues();
  const nextNum = data.length;
  const newId = 'GURU-' + String(nextNum).padStart(3, '0');
  const now = new Date().toISOString();

  const newRow = [
    newId,
    Number(teacherData.urutan) || nextNum,
    teacherData.nama || '',
    teacherData.nip || '-',
    teacherData.kategori || 'Guru Mapel',
    teacherData.jabatan || 'Tenaga Pendidik',
    teacherData.mapel || '',
    teacherData.badge || 'Pengampu',
    teacherData.pendidikan || '',
    teacherData.deskripsi || '',
    teacherData.foto_url || '',
    teacherData.status_aktif !== undefined ? teacherData.status_aktif : true,
    now,
    now
  ];

  sheet.appendRow(newRow);
  return { id: newId, ...teacherData };
}

function updateTeacherData(id, updatedData) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_TEACHERS);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) {
      const rowIdx = i + 1;
      for (const key in updatedData) {
        const colIdx = headers.indexOf(key);
        if (colIdx !== -1) {
          sheet.getRange(rowIdx, colIdx + 1).setValue(updatedData[key]);
        }
      }
      const updatedCol = headers.indexOf('updated_at');
      if (updatedCol !== -1) {
        sheet.getRange(rowIdx, updatedCol + 1).setValue(new Date().toISOString());
      }
      return { id: id, ...updatedData };
    }
  }
  throw new Error('Guru dengan ID ' + id + ' tidak ditemukan');
}

function deleteTeacherById(id) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_TEACHERS);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  throw new Error('Guru dengan ID ' + id + ' tidak ditemukan');
}

// ==========================================
// OPERASI PENGATURAN TICKER & PASSWORD
// ==========================================
function fetchAllSettings() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_SETTINGS);
  if (!sheet) return {};
  const data = sheet.getDataRange().getValues();
  const settings = {};
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] && data[i][0] !== 'admin_password') {
      settings[data[i][0]] = data[i][1];
    }
  }
  return settings;
}

function saveAnnouncementSetting(text, active) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_SETTINGS);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === 'announcement_text') sheet.getRange(i + 1, 2).setValue(text);
    if (data[i][0] === 'announcement_active') sheet.getRange(i + 1, 2).setValue(String(active));
  }
  return { announcement_text: text, announcement_active: active };
}

function getAdminPassword() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_SETTINGS);
  if (!sheet) return CONFIG.DEFAULT_ADMIN_PASS;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === 'admin_password') return String(data[i][1]);
  }
  return CONFIG.DEFAULT_ADMIN_PASS;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}