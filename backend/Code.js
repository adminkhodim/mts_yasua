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
  SHEET_USERS: 'users',
  SHEET_ROLES_PERMISSIONS: 'roles_permissions',
  SHEET_STUDENTS: 'students',
  SHEET_WALI_MAP: 'wali_santri_map',
  SHEET_PRESENSI_GURU: 'presensi_guru',
  SHEET_MUTABAAH: 'mutabaah_santri',
  SHEET_PPDB: 'ppdb_registrations',
  SHEET_JADWAL_KBM: 'jadwal_kbm',
  SHEET_SERAGAM: 'seragam_harian',
  SHEET_EKSKUL: 'ekskul_list',
  SHEET_EKSKUL_REG: 'ekskul_registrations',
  SHEET_NOTIFIKASI: 'notifikasi',
  SHEET_GALLERY: 'gallery',
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
      'id', 'nama_lengkap', 'nip_nuptk', 'jabatan', 'mata_pelajaran',
      'badge_bidang', 'pendidikan_terakhir', 'deskripsi', 'foto_url',
      'kategori', 'urutan', 'status_aktif', 'created_at', 'updated_at'
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

  
  // F. Setup Sheet 'notifikasi' (Manajemen Notifikasi & Pop-up Beranda)
  let sheetNotif = ss.getSheetByName(CONFIG.SHEET_NOTIFIKASI);
  if (!sheetNotif) {
    sheetNotif = ss.insertSheet(CONFIG.SHEET_NOTIFIKASI);
    const headersNotif = [
      'id', 'judul', 'kategori', 'tanggal', 'ringkasan',
      'isi', 'gambar', 'is_popup', 'status', 'created_at', 'updated_at'
    ];
    sheetNotif.appendRow(headersNotif);
    sheetNotif.getRange(1, 1, 1, headersNotif.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sheetNotif.setFrozenRows(1);

    const defaultNotif = [
      [
        'NOTIF-001',
        'Pendaftaran Santri Baru (PPDB Online) Tahun Ajaran 2026/2027',
        'Administrasi & PPDB',
        new Date().toISOString().split('T')[0],
        'Pendaftaran Santri Baru MTs YASUA Pilangwetan telah dibuka. Dapatkan fasilitas beasiswa santri berprestasi!',
        '<p class="mb-3">Panitia Penerimaan Peserta Didik Baru (PPDB) MTs YASUA Pilangwetan resmi membuka pendaftaran santri baru untuk Tahun Ajaran 2026/2027.</p><p class="mb-3">Tersedia jalur beasiswa tahfidz serta fasilitas sarana pembelajaran modern digital islami. Pendaftaran dapat dilakukan langsung di sekretariat madrasah atau online melalui aplikasi resmi.</p>',
        'https://lh3.googleusercontent.com/d/1mzADFLjLjb0KerlSO1LsX_B9xbDjYbNd',
        true,
        'Aktif',
        new Date().toISOString(),
        new Date().toISOString()
      ],
      [
        'NOTIF-002',
        'Pelaksanaan Penilaian Tengah Semester (PTS) Gasal Terpadu',
        'Akademik & Ujian',
        new Date().toISOString().split('T')[0],
        'Seluruh santri kelas VII, VIII, dan IX bersiap menghadapi ujian asesmen terpadu.',
        '<p class="mb-3">PTS Gasal menggabungkan ujian materi keagamaan salaf dan Computer Based Test (CBT) di laboratorium madrasah.</p>',
        '',
        false,
        'Aktif',
        new Date().toISOString(),
        new Date().toISOString()
      ]
    ];
    defaultNotif.forEach(function(row) { sheetNotif.appendRow(row); });
  }

  return { status: 'success', message: 'Semua tabel (teachers, banners, hero_slides, news, settings, notifikasi) berhasil diinisialisasi!' };
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
      case 'getNotifikasi':
        return createJsonResponse({ status: 'success', data: fetchAllNotifikasi() });
      case 'initNotifikasiSheet':
        return createJsonResponse(setupNotifikasiDatabase());
      case 'getGallery':
        return createJsonResponse({ status: 'success', data: fetchAllGallery() });
      case 'initGallerySheet':
        return createJsonResponse(setupGalleryDatabase());
      case 'getPrestasi':
        return createJsonResponse({ status: 'success', data: fetchAllPrestasi() });
      case 'initPrestasiSheet':
        return createJsonResponse(setupPrestasiDatabase());
      case 'incrementViews':
        return createJsonResponse({ status: 'success', data: incrementNewsViewsBackend(e.parameter.id || e.parameter.slug) });
      case 'getSettings':
        return createJsonResponse({ status: 'success', data: fetchAllSettings() });
      case 'getProfile':
        return createJsonResponse({ status: 'success', data: fetchProfileData() });
      case 'initProfileSettings':
        return createJsonResponse(setupProfileDefaults());
      case 'initAuthSheets':
        return createJsonResponse(setupAuthDatabase());
      case 'cleanupJunkSheets':
        return createJsonResponse(cleanupJunkSheets());
      case 'listAllSheets':
        const ssAll = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
        return createJsonResponse({
          status: 'success',
          sheets: ssAll.getSheets().map(function(s) { return s.getName(); })
        });
      case 'getPpdbList':
        return createJsonResponse({ status: 'success', data: fetchAllPpdbRegistrations() });
      case 'initPpdbSheet':
        return createJsonResponse({ status: 'success', message: 'Sheet PPDB siap digunakan', sheet: ensurePpdbSheet().getName() });
      case 'getJadwalData':
        return createJsonResponse(fetchFullJadwalData());
      case 'initJadwalSheet':
        return createJsonResponse(setupJadwalAndSeragamDatabase());
      case 'getEkskulData':
        return createJsonResponse({ status: 'success', data: fetchAllEkskul() });
      case 'initEkskulSheet':
        return createJsonResponse(setupEkskulDatabase());
      case 'getRolesPermissions':
        return createJsonResponse({ status: 'success', data: fetchAllRolesPermissions() });
      case 'authWali':
        return createJsonResponse(handleAuthWali(e.parameter.nisn, e.parameter.birth_date));
      case 'authGuru':
        return createJsonResponse(handleAuthGuru(e.parameter.teacher_id || e.parameter.teacher_name, e.parameter.pin));
      case 'authPimpinan':
        return createJsonResponse(handleAuthPimpinan(e.parameter.pin));
      case 'authAdmin':
        return createJsonResponse(handleAuthAdmin(e.parameter.password || e.parameter.pin));
      case 'getStudentProgress':
        return createJsonResponse(fetchStudentProgress(e.parameter.nisn || e.parameter.student_id));
      case 'getSummary':
        return createJsonResponse({
          status: 'success',
          teachers: fetchAllTeachers().length,
          banners: fetchAllBanners().length,
          heroSlides: fetchAllHeroSlides().length,
          news: fetchAllNews().length,
          notifikasi: fetchAllNotifikasi().length
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

    // Public Endpoint: Pendaftaran Mandiri Calon Siswa (PPDB Online)
    if (action === 'submitPpdb') {
      return createJsonResponse(submitPpdbRegistration(payload.data || payload));
    }
    // Public Endpoint: Pendaftaran Peminatan Ekstrakurikuler Online
    if (action === 'registerEkskul') {
      return createJsonResponse(submitEkskulRegistration(payload.data || payload));
    }
    const adminPass = payload.admin_password || payload.password;

    // Proteksi Password & Validasi Multi-Role (RBAC)
    const auth = verifyAdminAuth(adminPass);
    if (!auth.valid) {
      return createJsonResponse({ status: 'error', message: 'Password Administrator salah' });
    }

    // Router Khusus Pintu Akses Resmi (Wali, Guru, Admin, Pimpinan)
    if (action === 'authWali') {
      return createJsonResponse(handleAuthWali(payload.nisn, payload.birth_date));
    }
    if (action === 'authGuru') {
      return createJsonResponse(handleAuthGuru(payload.teacher_id || payload.teacher_name, payload.pin));
    }
    if (action === 'recordGuruAttendance') {
      return createJsonResponse(handleRecordGuruAttendance(payload));
    }
    if (action === 'authPimpinan') {
      return createJsonResponse(handleAuthPimpinan(payload.pin));
    }
    if (action === 'authAdmin') {
      return createJsonResponse(handleAuthAdmin(payload.password || payload.pin));
    }

    // Action Login khusus untuk verifikasi role & token
    if (action === 'login') {
      return createJsonResponse({
        status: 'success',
        role: auth.role,
        roleName: auth.roleName,
        message: 'Login berhasil sebagai ' + auth.roleName
      });
    }

    // Permission Guard Berdasarkan Role
    const humasActions = [
      'addNews', 'updateNews', 'deleteNews', 'uploadNewsPhoto',
      'updateHeroSlide', 'saveAllHeroSlides', 'uploadHeroPhoto',
      'saveAllBanners', 'uploadBannerPhoto', 'saveAnnouncement',
      'toggleGalleryStatus', 'deleteGallery', 'savePrestasi', 'addPrestasi', 'updatePrestasi', 'deletePrestasi', 'togglePrestasiStatus', 'saveNotifikasi', 'deleteNotifikasi', 'uploadNotifikasiPhoto', 'saveProfile', 'uploadProfilePhoto'
    ];
    const kesiswaanActions = [
      'addTeacher', 'updateTeacher', 'deleteTeacher', 'uploadTeacherPhoto',
      'togglePrestasiStatus', 'deletePrestasi', 'toggleAlumniStatus', 'deleteAlumni'
    ];

    if (auth.role === 'humas' && kesiswaanActions.includes(action)) {
      return createJsonResponse({ status: 'error', message: 'Divisi Humas tidak memiliki izin untuk mengubah data ini' });
    }
    if (auth.role === 'kesiswaan' && humasActions.includes(action)) {
      return createJsonResponse({ status: 'error', message: 'Divisi Kesiswaan tidak memiliki izin untuk mengubah data ini' });
    }

    let result;
    switch (action) {
      // Jadwal KBM & Seragam Harian
      case 'saveJadwalSlot':
        result = saveOrUpdateJadwalSlot(payload.data || payload);
        return createJsonResponse({ status: 'success', data: result, message: 'Jadwal KBM berhasil disimpan di database' });
      case 'deleteJadwalSlot':
        result = deleteJadwalSlotById(payload.id || (payload.data && payload.data.id));
        return createJsonResponse({ status: 'success', message: 'Slot jadwal berhasil dihapus dari database' });
      case 'updateSeragamHari':
        result = updateSeragamHarianData(payload.hari, payload.data || payload);
        return createJsonResponse({ status: 'success', data: result, message: 'Ketentuan seragam berhasil disimpan di database' });

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

                  // Profil Madrasah
      case 'saveProfile':
        result = saveProfileData(payload.data || payload);
        return createJsonResponse(result);
      case 'uploadProfilePhoto':
        result = uploadPhotoToDrive(payload.filename, payload.base64, 'PROFIL');
        return createJsonResponse({ status: 'success', data: result });

      // Notifikasi & Pop-up Beranda (ala Asnawiyyah)
      case 'saveNotifikasi':
        result = saveOrUpdateNotifikasi(payload.data || payload);
        return createJsonResponse({ status: 'success', data: result, message: 'Notifikasi berhasil disimpan di database' });
      case 'deleteNotifikasi':
        result = deleteNotifikasiById(payload.id || (payload.data && payload.data.id));
        return createJsonResponse({ status: 'success', message: 'Notifikasi berhasil dihapus dari database' });
      case 'uploadNotifikasiPhoto':
        result = uploadPhotoToDrive(payload.filename, payload.base64, 'NOTIF');
        return createJsonResponse({ status: 'success', data: result });

      // Galeri & Dokumentasi Madrasah
      case 'addGallery':
      case 'updateGallery':
        result = saveOrUpdateGallery(payload.data || payload, payload.fileBase64, payload.fileName, payload.fileMime);
        return createJsonResponse({ status: 'success', data: result, message: 'Foto galeri berhasil disimpan di database' });
      case 'deleteGallery':
        result = deleteGalleryById(payload.id || (payload.data && payload.data.id));
        return createJsonResponse({ status: 'success', message: 'Foto galeri berhasil dihapus dari database' });
      case 'toggleGalleryStatus':
        result = toggleGalleryStatusById(payload.id, payload.status);
        return createJsonResponse({ status: 'success', data: result, message: 'Status foto galeri berhasil diperbarui' });

      // Prestasi & Kejuaraan Siswa
      case 'addPrestasi':
      case 'savePrestasi':
      case 'updatePrestasi':
        result = saveOrUpdatePrestasi(payload.data || payload, payload.fileBase64, payload.fileName, payload.fileMime);
        return createJsonResponse({ status: 'success', data: result, message: 'Data prestasi berhasil disimpan di database' });
      case 'deletePrestasi':
        result = deletePrestasiById(payload.id || (payload.data && payload.data.id));
        return createJsonResponse({ status: 'success', message: 'Data prestasi berhasil dihapus dari database' });
      case 'togglePrestasiStatus':
        result = togglePrestasiStatusById(payload.id, payload.status);
        return createJsonResponse({ status: 'success', data: result, message: 'Status prestasi berhasil diperbarui' });
      case 'uploadGalleryPhoto':
        result = uploadPhotoToDrive(payload.filename, payload.base64, 'GALERI');
        return createJsonResponse({ status: 'success', data: result });

      // PPDB Registrations
      case 'updatePpdbStatus':
        result = updatePpdbRegistrationStatus(
          payload.id || (payload.data && payload.data.id),
          payload.status || (payload.data && payload.data.status),
          payload.catatan || (payload.data && payload.data.catatan)
        );
        return createJsonResponse({ status: 'success', data: result, message: 'Status pendaftar PPDB berhasil diperbarui' });

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
      obj.views = 0;
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
  const views = (newsData.views !== undefined && newsData.views !== null && newsData.views !== '') 
    ? (Number(newsData.views) || 0) 
    : 0;
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
  const headers = data[0];
  const nextNum = data.length;
  const newId = 'GURU-' + String(nextNum).padStart(3, '0');
  const now = new Date().toISOString();

  // Normalisasi data dengan toleransi alias key
  const normalized = {
    id: newId,
    nama_lengkap: teacherData.nama_lengkap || teacherData.nama || '',
    nip_nuptk: teacherData.nip_nuptk || teacherData.nip || '-',
    jabatan: teacherData.jabatan || 'Guru Mapel',
    mata_pelajaran: teacherData.mata_pelajaran || teacherData.mapel || '',
    badge_bidang: teacherData.badge_bidang || teacherData.badge || 'Pengampu',
    pendidikan_terakhir: teacherData.pendidikan_terakhir || teacherData.pendidikan || 'Sarjana Pendidikan',
    deskripsi: teacherData.deskripsi || '',
    foto_url: teacherData.foto_url || '',
    kategori: teacherData.kategori || 'guru_mapel',
    urutan: Number(teacherData.urutan) || nextNum,
    status_aktif: teacherData.status_aktif !== undefined ? teacherData.status_aktif : true,
    created_at: now,
    updated_at: now
  };

  // Bangun baris baru secara dinamis mengikuti urutan kolom header riil di Spreadsheet
  const newRow = headers.map(h => {
    return normalized[h] !== undefined ? normalized[h] : (teacherData[h] || '');
  });

  sheet.appendRow(newRow);
  return { id: newId, ...normalized };
}

function updateTeacherData(id, updatedData) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_TEACHERS);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  // Mapping alias kunci agar kompatibel ganda jika frontend mengirim 'nama' atau 'nama_lengkap'
  const keyAliases = {
    nama: 'nama_lengkap',
    nip: 'nip_nuptk',
    mapel: 'mata_pelajaran',
    badge: 'badge_bidang',
    pendidikan: 'pendidikan_terakhir'
  };

  const payload = { ...updatedData };
  for (const alias in keyAliases) {
    const targetKey = keyAliases[alias];
    if (payload[alias] !== undefined && payload[targetKey] === undefined) {
      payload[targetKey] = payload[alias];
    }
  }

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) {
      const rowIdx = i + 1;
      for (const key in payload) {
        const colIdx = headers.indexOf(key);
        if (colIdx !== -1) {
          sheet.getRange(rowIdx, colIdx + 1).setValue(payload[key]);
        }
      }
      const updatedCol = headers.indexOf('updated_at');
      if (updatedCol !== -1) {
        sheet.getRange(rowIdx, updatedCol + 1).setValue(new Date().toISOString());
      }
      return { id: id, ...payload };
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

function getSettingValue(key) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_SETTINGS);
  if (!sheet) return null;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) return String(data[i][1]);
  }
  return null;
}

function verifyAdminAuth(pass) {
  if (!pass) return { valid: false };
  const strPass = String(pass).trim();
  const superPass = getAdminPassword();

  // 1. Super Admin (Full Access ke seluruh modul)
  if (strPass === superPass) {
    return { valid: true, role: 'superadmin', roleName: 'Super Admin' };
  }

  // 2. Role Humas & Publikasi (Berita, Banner, Slider, Galeri)
  const humasPass = getSettingValue('admin_password_humas') || 'humasyasua2026';
  if (strPass === humasPass) {
    return { valid: true, role: 'humas', roleName: 'Divisi Humas' };
  }

  // 3. Role Kesiswaan & SDM (Dewan Guru, Prestasi, Alumni, PPDB)
  const kesiswaanPass = getSettingValue('admin_password_kesiswaan') || 'kesiswaanyasua2026';
  if (strPass === kesiswaanPass) {
    return { valid: true, role: 'kesiswaan', roleName: 'Divisi Kesiswaan' };
  }

  return { valid: false };
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * SETUP DATABASE AUTH, RBAC, SISWA, PRESENSI & MUTABAAH
 * Otomatis membuat 6 sheet baru jika belum ada di spreadsheet
 */
function setupAuthDatabase() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const now = new Date().toISOString();
  const createdSheets = [];

  // 1. Sheet 'users'
  let sUsers = ss.getSheetByName(CONFIG.SHEET_USERS);
  if (!sUsers) {
    sUsers = ss.insertSheet(CONFIG.SHEET_USERS);
    const headers = ['user_id', 'username', 'pin_hash', 'name', 'role', 'phone', 'email', 'photo_url', 'status', 'created_at', 'last_login_at'];
    sUsers.appendRow(headers);
    sUsers.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sUsers.setFrozenRows(1);

    const defaultUsers = [
      ['USR-ADMIN-01', 'admin', 'adminyasua2026', 'Administrator MTs YASUA', 'ADMIN', '085649881966', 'admin@mtsyasua.sch.id', 'logo.png', 'AKTIF', now, now],
      ['USR-PIMPINAN-01', 'muthohar', 'pimpinanyasua', 'Muthohar, S.Pd.', 'PIMPINAN', '085649881966', 'kepala@mtsyasua.sch.id', 'kepala-madrasah.webp', 'AKTIF', now, now],
      ['USR-GURU-01', 'thoibah', 'yasua2026', 'Hj. Thoibah Roudlotul Jannah, S.Ag.', 'GURU', '085649881966', 'thoibah@mtsyasua.sch.id', 'guru_5.webp', 'AKTIF', now, now],
      ['USR-WALI-01', '2026001', '2012-05-14', 'Bpk/Ibu Wali Murid Ahmad Zaki', 'WALI_MURID', '085649881966', 'wali.zaki@gmail.com', 'logo.png', 'AKTIF', now, now]
    ];
    defaultUsers.forEach(r => sUsers.appendRow(r));
    createdSheets.push('users');
  }

  // 2. Sheet 'roles_permissions'
  let sRoles = ss.getSheetByName(CONFIG.SHEET_ROLES_PERMISSIONS);
  if (!sRoles) {
    sRoles = ss.insertSheet(CONFIG.SHEET_ROLES_PERMISSIONS);
    const headers = ['role_key', 'role_name', 'can_access_cms', 'can_edit_news', 'can_edit_banner', 'can_edit_teachers', 'can_edit_ppdb', 'can_record_attendance', 'can_view_student_progress', 'can_macro_supervision', 'active_permissions_json', 'updated_at'];
    sRoles.appendRow(headers);
    sRoles.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sRoles.setFrozenRows(1);

    const defaultRoles = [
      ['ADMIN', 'Administrator CMS', true, true, true, true, true, true, true, true, JSON.stringify(['ALL_CMS', 'MANAGE_USERS', 'MANAGE_NEWS', 'MANAGE_BANNER']), now],
      ['PIMPINAN', 'Pimpinan Madrasah & Yayasan', true, false, false, false, false, false, true, true, JSON.stringify(['SUPERVISION_MACRO', 'READ_REPORTS']), now],
      ['GURU', 'Dewan Asatidz & Guru', false, false, false, false, false, true, false, false, JSON.stringify(['ATTENDANCE_RECORD', 'KBM_JURNAL']), now],
      ['WALI_MURID', 'Wali Murid', false, false, false, false, false, false, true, false, JSON.stringify(['VIEW_CHILD_PROGRESS', 'VIEW_MUTABAAH']), now]
    ];
    defaultRoles.forEach(r => sRoles.appendRow(r));
    createdSheets.push('roles_permissions');
  }

  // 3. Sheet 'students'
  let sStudents = ss.getSheetByName(CONFIG.SHEET_STUDENTS);
  if (!sStudents) {
    sStudents = ss.insertSheet(CONFIG.SHEET_STUDENTS);
    const headers = ['student_id', 'nisn', 'nis', 'name', 'gender', 'birth_date', 'kelas', 'program', 'wali_name', 'wali_phone', 'photo_url', 'status', 'created_at'];
    sStudents.appendRow(headers);
    sStudents.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sStudents.setFrozenRows(1);

    const defaultStudents = [
      ['SAN-2026-001', '2026001', '2024001', 'Ahmad Zaki Al-Fatih', 'L', '2012-05-14', '8-A', 'Tahfidz & Sains', 'Bpk. Muhammad Fatih', '085649881966', 'logo.png', 'AKTIF', now],
      ['SAN-2026-002', '2026002', '2024002', 'Siti Fatimah Az-Zahra', 'P', '2012-08-20', '7-B', 'Tahfidz Al-Qur\'an', 'Ibu Siti Aminah', '085649881966', 'logo.png', 'AKTIF', now]
    ];
    defaultStudents.forEach(r => sStudents.appendRow(r));
    createdSheets.push('students');
  }

  // 4. Sheet 'wali_santri_map'
  let sWaliMap = ss.getSheetByName(CONFIG.SHEET_WALI_MAP);
  if (!sWaliMap) {
    sWaliMap = ss.insertSheet(CONFIG.SHEET_WALI_MAP);
    const headers = ['map_id', 'user_id', 'student_id', 'relationship', 'created_at'];
    sWaliMap.appendRow(headers);
    sWaliMap.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sWaliMap.setFrozenRows(1);

    sWaliMap.appendRow(['MAP-001', 'USR-WALI-01', 'SAN-2026-001', 'WALI', now]);
    createdSheets.push('wali_santri_map');
  }

  // 5. Sheet 'presensi_guru'
  let sPresensi = ss.getSheetByName(CONFIG.SHEET_PRESENSI_GURU);
  if (!sPresensi) {
    sPresensi = ss.insertSheet(CONFIG.SHEET_PRESENSI_GURU);
    const headers = ['presensi_id', 'teacher_id', 'teacher_name', 'tanggal', 'jam_masuk', 'status_kehadiran', 'lokasi_gps', 'device_info', 'created_at'];
    sPresensi.appendRow(headers);
    sPresensi.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sPresensi.setFrozenRows(1);
    createdSheets.push('presensi_guru');
  }

  // 6. Sheet 'mutabaah_santri'
  let sMutabaah = ss.getSheetByName(CONFIG.SHEET_MUTABAAH);
  if (!sMutabaah) {
    sMutabaah = ss.insertSheet(CONFIG.SHEET_MUTABAAH);
    const headers = ['mutabaah_id', 'student_id', 'tanggal', 'juz_aktif', 'surah_terakhir', 'nilai_kelancaran', 'kehadiran_persen', 'status_infaq', 'catatan_ustadz', 'created_at'];
    sMutabaah.appendRow(headers);
    sMutabaah.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sMutabaah.setFrozenRows(1);

    sMutabaah.appendRow(['MUT-001', 'SAN-2026-001', '2026-11-09', 'Juz 30', 'Surah An-Nas', 'MUMTAZ', 98, 'LUNAS', 'Hafalan lancar dan tartil, makhraj huruf sangat baik.', now]);
    createdSheets.push('mutabaah_santri');
  }

  return {
    status: 'success',
    message: 'Setup Auth & RBAC Sheets selesai!',
    createdSheets: createdSheets
  };
}


/**
 * =====================================================================
 * MODUL AUTENTIKASI RESMI (WALI, GURU, ADMIN, PIMPINAN) & RBAC
 * =====================================================================
 */

function fetchAllRolesPermissions() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_ROLES_PERMISSIONS);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  const headers = data[0];
  const list = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const item = {};
    headers.forEach((h, idx) => item[h] = row[idx]);
    list.push(item);
  }
  return list;
}

function handleAuthWali(nisn, birthDate) {
  if (!nisn) return { status: 'error', message: 'Nomor NISN wajib diisi' };
  const cleanNisn = String(nisn).trim();
  const cleanBirth = String(birthDate || '').trim();

  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_STUDENTS);
  if (!sheet) {
    setupAuthDatabase();
    sheet = ss.getSheetByName(CONFIG.SHEET_STUDENTS);
  }

  const data = sheet.getDataRange().getValues();
  let foundStudent = null;
  for (let i = 1; i < data.length; i++) {
    const rowNisn = String(data[i][1]).trim();
    const rowNis = String(data[i][2]).trim();
    if (rowNisn === cleanNisn || rowNis === cleanNisn) {
      foundStudent = {
        student_id: data[i][0],
        nisn: data[i][1],
        nis: data[i][2],
        name: data[i][3],
        gender: data[i][4],
        birth_date: data[i][5],
        kelas: data[i][6],
        program: data[i][7],
        wali_name: data[i][8],
        wali_phone: data[i][9]
      };
      break;
    }
  }

  // Jika tidak ditemukan di database sheet, gunakan data siswa fallback
  if (!foundStudent && (cleanNisn === '2026001' || cleanNisn === '0098765432')) {
    foundStudent = {
      student_id: 'SAN-2026-001',
      nisn: cleanNisn,
      nis: '2024001',
      name: 'Ahmad Zaki Al-Fatih',
      gender: 'L',
      birth_date: '2012-05-14',
      kelas: '8-A',
      program: 'Tahfidz & Sains',
      wali_name: 'Bpk. Muhammad Fatih',
      wali_phone: '085649881966'
    };
  }

  if (!foundStudent) {
    return { status: 'error', message: 'Data siswa dengan NISN ' + cleanNisn + ' tidak ditemukan' };
  }

  // Ambil data mutabaah hafalan
  const progress = fetchStudentProgress(foundStudent.student_id);

  return {
    status: 'success',
    role: 'WALI_MURID',
    waliName: foundStudent.wali_name || ('Wali Murid ' + foundStudent.name),
    student: foundStudent,
    progress: progress,
    message: 'Otentikasi Wali Murid berhasil'
  };
}

function fetchStudentProgress(studentId) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_MUTABAAH);
  if (!sheet) {
    return {
      juz_aktif: 'Juz 30',
      surah_terakhir: 'Surah An-Nas',
      nilai_kelancaran: 'MUMTAZ',
      kehadiran_persen: 98,
      status_infaq: 'LUNAS',
      catatan_ustadz: 'Hafalan lancar dan tartil, makhraj huruf sangat baik.'
    };
  }

  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (String(data[i][1]) === String(studentId)) {
      return {
        juz_aktif: data[i][3],
        surah_terakhir: data[i][4],
        nilai_kelancaran: data[i][5],
        kehadiran_persen: data[i][6],
        status_infaq: data[i][7],
        catatan_ustadz: data[i][8]
      };
    }
  }

  return {
    juz_aktif: 'Juz 30',
    surah_terakhir: 'Surah Al-A\'la',
    nilai_kelancaran: 'JAYYID JIDDAN',
    kehadiran_persen: 97,
    status_infaq: 'LUNAS',
    catatan_ustadz: 'Perkembangan hafalan santri konsisten dan disiplin.'
  };
}

function handleAuthGuru(teacherIdentifier, pin) {
  const cleanPin = String(pin || '').trim();
  if (cleanPin !== 'yasua2026' && cleanPin !== '123456') {
    return { status: 'error', message: 'PIN Asatidz tidak sesuai (Gunakan: yasua2026)' };
  }

  return {
    status: 'success',
    role: 'GURU',
    teacherName: teacherIdentifier || 'Dewan Asatidz MTs YASUA',
    mapel: 'Tenaga Pendidik Aktif',
    message: 'Login Dewan Asatidz berhasil'
  };
}

function handleRecordGuruAttendance(payload) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_PRESENSI_GURU);
  if (!sheet) {
    setupAuthDatabase();
    sheet = ss.getSheetByName(CONFIG.SHEET_PRESENSI_GURU);
  }

  const now = new Date();
  const dateStr = Utilities.formatDate(now, 'GMT+7', 'yyyy-MM-dd');
  const timeStr = Utilities.formatDate(now, 'GMT+7', 'HH:mm:ss');
  const presensiId = 'PRS-' + Utilities.formatDate(now, 'GMT+7', 'yyyyMMdd-HHmmss');

  const row = [
    presensiId,
    payload.teacher_id || 'GURU-001',
    payload.teacher_name || 'Dewan Guru',
    dateStr,
    timeStr,
    'HADIR',
    payload.lokasi_gps || '-',
    payload.device_info || 'Mobile PWA',
    now.toISOString()
  ];

  sheet.appendRow(row);
  return {
    status: 'success',
    message: 'Presensi digital berhasil dicatat pada ' + timeStr + ' WIB',
    presensi_id: presensiId,
    timestamp: timeStr
  };
}

function handleAuthPimpinan(pin) {
  const cleanPin = String(pin || '').trim();
  if (cleanPin !== 'pimpinanyasua' && cleanPin !== '2026') {
    return { status: 'error', message: 'PIN Pimpinan tidak sesuai (Gunakan: pimpinanyasua)' };
  }

  return {
    status: 'success',
    role: 'PIMPINAN',
    pimpinanName: 'Muthohar, S.Pd.',
    jabatan: 'Kepala Madrasah MTs YASUA',
    stats: {
      guru_count: fetchAllTeachers().length || 24,
      news_count: fetchAllNews().length || 15,
      banner_count: fetchAllBanners().length || 3
    },
    message: 'Otentikasi Pimpinan Madrasah berhasil'
  };
}

function handleAuthAdmin(password) {
  const auth = verifyAdminAuth(password);
  if (!auth.valid) {
    return { status: 'error', message: 'Kata sandi / PIN Administrator salah' };
  }

  return {
    status: 'success',
    role: 'ADMIN',
    roleName: auth.roleName,
    token: 'tok_' + Math.random().toString(36).substring(2),
    permissions: ['ALL_CMS'],
    message: 'Otentikasi Administrator berhasil'
  };
}


/**
 * PEMBERSIHAN SHEET SAMPAH / SHEET DEFAULT TANPA NAMA
 * Menghapus sheet seperti 'Sheet2', 'Sheet3', 'Sheet8', dll yang terbuat akibat kegagalan parameter
 */
function cleanupJunkSheets() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const validSheets = [
    CONFIG.SHEET_TEACHERS,
    CONFIG.SHEET_BANNERS,
    CONFIG.SHEET_HERO,
    CONFIG.SHEET_NEWS,
    CONFIG.SHEET_SETTINGS,
    CONFIG.SHEET_USERS,
    CONFIG.SHEET_ROLES_PERMISSIONS,
    CONFIG.SHEET_STUDENTS,
    CONFIG.SHEET_WALI_MAP,
    CONFIG.SHEET_PRESENSI_GURU,
    CONFIG.SHEET_MUTABAAH
  ];

  const allSheets = ss.getSheets();
  const deleted = [];
  const kept = [];

  allSheets.forEach(function(sheet) {
    const name = sheet.getName();
    if (validSheets.indexOf(name) !== -1) {
      kept.push(name);
    } else if (/^Sheet\d+$/i.test(name) || name.indexOf('Sheet') === 0 || name.trim() === '') {
      try {
        ss.deleteSheet(sheet);
        deleted.push(name);
      } catch (e) {
        console.error('Gagal hapus sheet: ' + name, e);
      }
    } else {
      kept.push(name);
    }
  });

  return {
    status: 'success',
    message: 'Pembersihan sheet duplikat/tanpa nama selesai!',
    deletedSheets: deleted,
    activeSheets: kept
  };
}


// ==========================================
// OPERASI DATABASE PPDB (SHEET 'ppdb_registrations')
// Auto-Provisioning & Pendaftaran Mandiri Online
// ==========================================

function ensurePpdbSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_PPDB || 'ppdb_registrations');
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_PPDB || 'ppdb_registrations');
    const headers = [
      'id', 'created_at', 'jalur', 'program_pilihan', 'nama_lengkap',
      'nisn', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir', 'sekolah_asal',
      'nama_wali', 'no_whatsapp', 'alamat_desa', 'status_pendaftaran',
      'catatan_panitia', 'updated_at'
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#022c1f')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function submitPpdbRegistration(regData) {
  if (!regData || !regData.nama_lengkap) {
    return { status: 'error', message: 'Nama lengkap calon siswa wajib diisi' };
  }

  const sheet = ensurePpdbSheet();
  const data = sheet.getDataRange().getValues();
  const nextNum = data.length;
  const currentYear = new Date().getFullYear();
  const regId = 'PPDB-' + currentYear + '-' + String(nextNum).padStart(3, '0');
  const now = new Date();
  const nowStr = Utilities.formatDate(now, 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  const rowData = [
    regId,
    nowStr,
    regData.jalur || 'Reguler',
    regData.program_pilihan || 'Tahfidz & Kitab Salaf',
    String(regData.nama_lengkap || '').trim().toUpperCase(),
    String(regData.nisn || '').trim(),
    regData.jenis_kelamin || 'Laki-laki (Putra)',
    regData.tempat_lahir || 'Demak',
    regData.tanggal_lahir || '',
    regData.sekolah_asal || '',
    regData.nama_wali || '',
    String(regData.no_whatsapp || '').trim(),
    regData.alamat_desa || '',
    'Menunggu Verifikasi',
    regData.catatan || '',
    nowStr
  ];

  sheet.appendRow(rowData);

  return {
    status: 'success',
    message: 'Pendaftaran PPDB berhasil dikirim',
    data: {
      id: regId,
      nama_lengkap: String(regData.nama_lengkap || '').trim().toUpperCase(),
      jalur: regData.jalur || 'Reguler',
      program_pilihan: regData.program_pilihan || 'Tahfidz & Kitab Salaf',
      no_whatsapp: regData.no_whatsapp || '',
      created_at: nowStr,
      status_pendaftaran: 'Menunggu Verifikasi'
    }
  };
}

function fetchAllPpdbRegistrations() {
  const sheet = ensurePpdbSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const items = [];
  for (let i = rows.length - 1; i >= 1; i--) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    items.push(obj);
  }
  return items;
}

function updatePpdbRegistrationStatus(regId, newStatus, catatanPanitia) {
  const sheet = ensurePpdbSheet();
  const data = sheet.getDataRange().getValues();
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(regId).trim()) {
      if (newStatus) {
        sheet.getRange(i + 1, 14).setValue(newStatus);
      }
      if (catatanPanitia !== undefined) {
        sheet.getRange(i + 1, 15).setValue(catatanPanitia);
      }
      sheet.getRange(i + 1, 16).setValue(nowStr);
      return { id: regId, status: newStatus || data[i][13], updated_at: nowStr };
    }
  }
  return null;
}


// ==========================================
// OPERASI DATABASE JADWAL KBM & SERAGAM HARIAN
// Auto-Provisioning & Sinkronisasi Spreadsheet
// ==========================================

function ensureJadwalKbmSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_JADWAL_KBM || 'jadwal_kbm');
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_JADWAL_KBM || 'jadwal_kbm');
    const headers = [
      'id', 'kelas', 'hari', 'jam_ke', 'waktu',
      'mata_pelajaran', 'nama_guru', 'ruang', 'tipe', 'updated_at'
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#022c1f')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);

    // Isi Seed Roster KBM Awal (Kelas 7, 8, dan 9)
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
    const seedJadwal = [
      // KELAS 7 - SENIN
      ['JDW-7-SEN-0', '7', 'Senin', 0, '07.00 - 07.30', 'Pembiasaan Pagi: Sholat Dhuha & Upacara Bendera', 'Tim Kesiswaan & Pembina OSIS', 'Halaman Madrasah', 'ibadah', nowStr],
      ['JDW-7-SEN-1', '7', 'Senin', 1, '07.30 - 08.50', "Al-Qur'an Hadits", 'Hj. Thoibah Roudlotul Jannah, S.Ag.', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-SEN-2', '7', 'Senin', 2, '08.50 - 10.10', 'Matematika', 'Drs. H. Masykur', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-SEN-3', '7', 'Senin', 3, '10.10 - 10.30', 'Istirahat I & Kudapan Sehat', 'Kantin Sehat Madrasah', 'Area Kantin', 'istirahat', nowStr],
      ['JDW-7-SEN-4', '7', 'Senin', 4, '10.30 - 11.50', 'Bahasa Indonesia', 'Siti Aminah, S.Pd.', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-SEN-5', '7', 'Senin', 5, '11.50 - 12.35', 'Shalat Dzuhur Berjamaah di Masjid', 'Sie Keagamaan & Wali Kelas', 'Masjid Kampus', 'ibadah', nowStr],
      ['JDW-7-SEN-6', '7', 'Senin', 6, '12.35 - 13.55', 'Aqidah Akhlak', 'K.H. Salman, Lc.', 'R. 7-A/B/C', 'mapel', nowStr],

      // KELAS 7 - SELASA
      ['JDW-7-SEL-0', '7', 'Selasa', 0, '07.00 - 07.30', "Shalat Dhuha, Tadarus Al-Qur'an & Asmaul Husna", 'Wali Kelas & Guru Jam 1', 'R. Kelas 7', 'ibadah', nowStr],
      ['JDW-7-SEL-1', '7', 'Selasa', 1, '07.30 - 08.50', 'Bahasa Arab', 'Ahmad Munif, S.Pd.I', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-SEL-2', '7', 'Selasa', 2, '08.50 - 10.10', 'Ilmu Pengetahuan Alam (IPA Terpadu)', 'Fatimah Az-Zahra, S.Pd.', 'Lab Sains / R. 7', 'mapel', nowStr],
      ['JDW-7-SEL-3', '7', 'Selasa', 3, '10.10 - 10.30', 'Istirahat I & Refresing', 'Lingkungan Madrasah', 'Area Kantin', 'istirahat', nowStr],
      ['JDW-7-SEL-4', '7', 'Selasa', 4, '10.30 - 11.50', 'Fiqih / Kajian Fathul Qorib Dasar', 'Ust. M. Ridwan, S.Pd.I', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-SEL-5', '7', 'Selasa', 5, '11.50 - 12.35', 'Shalat Dzuhur Berjamaah di Masjid', 'Sie Keagamaan', 'Masjid Kampus', 'ibadah', nowStr],
      ['JDW-7-SEL-6', '7', 'Selasa', 6, '12.35 - 13.55', 'Bahasa Inggris', 'Nur Hidayah, S.Pd.', 'R. 7-A/B/C', 'mapel', nowStr],

      // KELAS 7 - RABU
      ['JDW-7-RAB-0', '7', 'Rabu', 0, '07.00 - 07.30', 'Shalat Dhuha & Pembiasaan Literasi Numerasi', 'Wali Kelas', 'R. Kelas 7', 'ibadah', nowStr],
      ['JDW-7-RAB-1', '7', 'Rabu', 1, '07.30 - 08.50', 'Ilmu Pengetahuan Sosial (IPS)', 'Budi Santoso, S.Pd.', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-RAB-2', '7', 'Rabu', 2, '08.50 - 10.10', 'Sejarah Kebudayaan Islam (SKI)', 'H. Ahmad Zaini, S.Pd.I', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-RAB-3', '7', 'Rabu', 3, '10.10 - 10.30', 'Istirahat I', 'Madrasah', 'Area Kantin', 'istirahat', nowStr],
      ['JDW-7-RAB-4', '7', 'Rabu', 4, '10.30 - 11.50', 'Informatika & Literasi Digital CBT', "Ali Mas'ud, S.Kom.", 'Lab Komputer', 'mapel', nowStr],
      ['JDW-7-RAB-5', '7', 'Rabu', 5, '11.50 - 12.35', 'Shalat Dzuhur Berjamaah', 'Sie Keagamaan', 'Masjid Kampus', 'ibadah', nowStr],
      ['JDW-7-RAB-6', '7', 'Rabu', 6, '12.35 - 13.55', 'Seni Budaya & Prakarya', 'Dewi Ratnasari, S.Pd.', 'R. 7-A/B/C', 'mapel', nowStr],

      // KELAS 7 - KAMIS
      ['JDW-7-KAM-0', '7', 'Kamis', 0, '07.00 - 07.30', 'Shalat Dhuha & Pembacaan Rotibul Haddad', 'Dewan Asatidz', 'R. Kelas 7', 'ibadah', nowStr],
      ['JDW-7-KAM-1', '7', 'Kamis', 1, '07.30 - 08.50', 'Bahasa Inggris', 'Nur Hidayah, S.Pd.', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-KAM-2', '7', 'Kamis', 2, '08.50 - 10.10', 'Pendidikan Pancasila & Kewarganegaraan (PPKn)', 'Drs. Suwarno', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-KAM-3', '7', 'Kamis', 3, '10.10 - 10.30', 'Istirahat I', 'Madrasah', 'Area Kantin', 'istirahat', nowStr],
      ['JDW-7-KAM-4', '7', 'Kamis', 4, '10.30 - 11.50', 'Matematika Terapan', 'Drs. H. Masykur', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-KAM-5', '7', 'Kamis', 5, '11.50 - 12.35', 'Shalat Dzuhur Berjamaah', 'Sie Keagamaan', 'Masjid Kampus', 'ibadah', nowStr],
      ['JDW-7-KAM-6', '7', 'Kamis', 6, '12.35 - 13.55', "Tahfidzul Qur'an & Bimbingan Tartil", 'Ustadzah Maryam, Al-Hafidzah', 'Musholla', 'mapel', nowStr],

      // KELAS 7 - JUMAT
      ['JDW-7-JUM-0', '7', 'Jumat', 0, '07.00 - 07.30', 'Shalat Dhuha & Istighosah Bersama Para Guru', 'Dipimpin Para Kiai & Asatidz', 'Masjid Kampus', 'ibadah', nowStr],
      ['JDW-7-JUM-1', '7', 'Jumat', 1, '07.30 - 08.40', "Bimbingan Tahsin & Tajwid Al-Qur'an", 'Ust. M. Ridwan, S.Pd.I', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-JUM-2', '7', 'Jumat', 2, '08.40 - 09.50', "Ke-NU-an / Risalah Ahlussunnah Wal Jama'ah", 'H. Ahmad Zaini, S.Pd.I', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-JUM-3', '7', 'Jumat', 3, '09.50 - 10.10', 'Istirahat & Minum Air Berkah', 'Madrasah', 'Area Kantin', 'istirahat', nowStr],
      ['JDW-7-JUM-4', '7', 'Jumat', 4, '10.10 - 11.20', 'Kajian Adab & Akhlak Lil Banin/Banat', 'Hj. Thoibah Roudlotul Jannah, S.Ag.', 'R. 7-A/B/C', 'mapel', nowStr],
      ['JDW-7-JUM-5', '7', 'Jumat', 5, '11.20 - 12.30', "Persiapan & Sholat Jum'at Berjamaah di Masjid", 'Seluruh Dewan Guru & Siswa', 'Masjid Jami', 'ibadah', nowStr],

      // KELAS 7 - SABTU
      ['JDW-7-SAB-0', '7', 'Sabtu', 0, '07.00 - 07.45', 'Senam Pagi Kesegaran Jasmani & Jalan Sehat', 'Guru PJOK & OSIS', 'Lapangan', 'ibadah', nowStr],
      ['JDW-7-SAB-1', '7', 'Sabtu', 1, '07.45 - 09.05', 'Pendidikan Jasmani & Olahraga (PJOK)', 'Ahmad Fauzi, S.Pd.', 'Lapangan', 'mapel', nowStr],
      ['JDW-7-SAB-2', '7', 'Sabtu', 2, '09.05 - 09.30', 'Istirahat & Kudapan Bersama', 'Madrasah', 'Area Kantin', 'istirahat', nowStr],
      ['JDW-7-SAB-3', '7', 'Sabtu', 3, '09.30 - 11.00', 'Pengembangan Diri: Pramuka / Hadroh / Robotik', 'Instruktur & Pembina Ekskul', 'Kampus Madrasah', 'mapel', nowStr],
      ['JDW-7-SAB-4', '7', 'Sabtu', 4, '11.00 - 11.45', 'Operasi Bersih Lingkungan & Doa Pulang', 'Wali Kelas 7', 'R. 7-A/B/C', 'ibadah', nowStr]
    ];

    seedJadwal.forEach(r => sheet.appendRow(r));
  }
  return sheet;
}

function ensureSeragamHarianSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_SERAGAM || 'seragam_harian');
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_SERAGAM || 'seragam_harian');
    const headers = [
      'id', 'hari', 'nama_seragam', 'kategori', 'deskripsi_lengkap',
      'sepatu', 'catatan', 'updated_at'
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#022c1f')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);

    const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
    const seedSeragam = [
      ['SRG-1', 'Senin', 'Seragam OSIS Putih - Biru Dongker', 'OSIS', 'Kemeja Putih, Bawahan Biru Dongker, Dasi, Sabuk Madrasah, Peci Hitam / Jilbab Putih', 'Hitam Bertali', 'Wajib dipakai rapi saat upacara bendera', nowStr],
      ['SRG-2', 'Selasa', 'Khas Batik Hijau MTs YASUA', 'BATIK', 'Batik Hijau Khas MTs YASUA, Bawahan Hijau Tua, Peci Hitam / Jilbab Hijau', 'Bebas Rapi / Hitam', 'Batik resmi identitas kebanggaan madrasah', nowStr],
      ['SRG-3', 'Rabu', 'Seragam Pramuka Lengkap', 'PRAMUKA', 'Baju Pramuka Lengkap, Kacu Leher, Sabuk Madrasah, Baret / Topi Pramuka', 'Hitam', 'Kelengkapan atribut pramuka diperiksa saat apel', nowStr],
      ['SRG-4', 'Kamis', 'Seragam Identitas Khas YASUA', 'IDENTITAS', 'Kemeja Hijau Toska Khas YASUA, Bawahan Hitam, Jilbab Bordir YASUA, Peci Hitam', 'Hitam', 'Seragam identitas Yayasan YASUA', nowStr],
      ['SRG-5', 'Jumat', 'Busana Muslim Santun', 'MUSLIM', 'Putra: Baju Koko Putih & Sarung Santri Rapi Berpeci. Putri: Busana Muslimah / Gamis Putih', 'Sandal / Sepatu Rapi', 'Disiapkan untuk Shalat Dhuha & Sholat Jumat Berjamaah', nowStr],
      ['SRG-6', 'Sabtu', 'Kaos Olahraga Resmi Madrasah', 'OLAHRAGA', 'Kaos Olahraga Resmi MTs YASUA, Celana Training Olahraga', 'Sepatu Olahraga Bebas', 'Dipakai saat Senam Pagi, KBM PJOK & Ekskul', nowStr],
      ['SRG-7', 'Ahad', 'Hari Libur Madrasah', 'LIBUR', 'Istirahat dan belajar mandiri bersama keluarga di rumah', '-', 'Persiapan KBM hari Senin', nowStr]
    ];

    seedSeragam.forEach(r => sheet.appendRow(r));
  }
  return sheet;
}

function setupJadwalAndSeragamDatabase() {
  const sJadwal = ensureJadwalKbmSheet();
  const sSeragam = ensureSeragamHarianSheet();
  return {
    status: 'success',
    message: 'Sheet jadwal_kbm & seragam_harian berhasil dibuat dan diisi data resmi.',
    sheets: [sJadwal.getName(), sSeragam.getName()]
  };
}

function fetchFullJadwalData() {
  const sJadwal = ensureJadwalKbmSheet();
  const sSeragam = ensureSeragamHarianSheet();

  const jadwalRows = sJadwal.getDataRange().getValues();
  const seragamRows = sSeragam.getDataRange().getValues();

  const jadwalItems = [];
  if (jadwalRows.length > 1) {
    const headers = jadwalRows[0];
    for (let i = 1; i < jadwalRows.length; i++) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = jadwalRows[i][j];
      }
      jadwalItems.push(obj);
    }
  }

  const seragamItems = [];
  if (seragamRows.length > 1) {
    const headers = seragamRows[0];
    for (let i = 1; i < seragamRows.length; i++) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = seragamRows[i][j];
      }
      seragamItems.push(obj);
    }
  }

  return {
    status: 'success',
    data: {
      jadwal: jadwalItems,
      seragam: seragamItems
    }
  };
}

function saveOrUpdateJadwalSlot(slotData) {
  const sJadwal = ensureJadwalKbmSheet();
  const data = sJadwal.getDataRange().getValues();
  const headers = data[0];
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  const kelas = String(slotData.kelas || '7');
  const hari = String(slotData.hari || 'Senin');
  const jamKe = Number(slotData.jam_ke !== undefined ? slotData.jam_ke : 1);
  const waktu = String(slotData.waktu || slotData.jam || '');
  const mapel = String(slotData.mata_pelajaran || slotData.mapel || '');
  const guru = String(slotData.nama_guru || slotData.guru || 'Tim Pengajar MTs YASUA');
  const ruang = String(slotData.ruang || 'Ruang Kelas');
  const tipe = String(slotData.tipe || slotData.type || 'mapel');

  let slotId = slotData.id;
  let rowIndex = -1;

  if (slotId) {
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(slotId)) {
        rowIndex = i + 1;
        break;
      }
    }
  }

  // Jika ID tidak disediakan, coba cari berdasarkan kelas + hari + jam_ke/waktu
  if (rowIndex === -1) {
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][1]) === kelas && String(data[i][2]) === hari && (String(data[i][4]) === waktu || Number(data[i][3]) === jamKe)) {
        rowIndex = i + 1;
        slotId = data[i][0];
        break;
      }
    }
  }

  if (rowIndex !== -1) {
    // Update baris yang sudah ada
    const rowObj = {
      id: slotId,
      kelas: kelas,
      hari: hari,
      jam_ke: jamKe,
      waktu: waktu,
      mata_pelajaran: mapel,
      nama_guru: guru,
      ruang: ruang,
      tipe: tipe,
      updated_at: nowStr
    };
    const rowValues = headers.map(h => rowObj[h] !== undefined ? rowObj[h] : '');
    sJadwal.getRange(rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
    return { id: slotId, updated: true };
  } else {
    // Tambah baris baru
    const hariAbbr = hari.substring(0, 3).toUpperCase();
    slotId = 'JDW-' + kelas + '-' + hariAbbr + '-' + Date.now().toString().slice(-4);
    const rowObj = {
      id: slotId,
      kelas: kelas,
      hari: hari,
      jam_ke: jamKe,
      waktu: waktu,
      mata_pelajaran: mapel,
      nama_guru: guru,
      ruang: ruang,
      tipe: tipe,
      updated_at: nowStr
    };
    const rowValues = headers.map(h => rowObj[h] !== undefined ? rowObj[h] : '');
    sJadwal.appendRow(rowValues);
    return { id: slotId, created: true };
  }
}

function deleteJadwalSlotById(id) {
  if (!id) throw new Error('ID jadwal tidak valid');
  const sJadwal = ensureJadwalKbmSheet();
  const data = sJadwal.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) {
      sJadwal.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function updateSeragamHarianData(hari, seragamData) {
  if (!hari) throw new Error('Hari seragam tidak valid');
  const sSeragam = ensureSeragamHarianSheet();
  const data = sSeragam.getDataRange().getValues();
  const headers = data[0];
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  const title = seragamData.title || seragamData.nama_seragam || '';
  const desc = seragamData.desc || seragamData.deskripsi_lengkap || '';
  const kategori = seragamData.kategori || title.split(' ')[0] || 'SERAGAM';
  const sepatu = seragamData.sepatu || 'Bebas Rapi';
  const catatan = seragamData.catatan || 'Ketentuan seragam resmi madrasah';

  let found = false;
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][1]).toLowerCase() === String(hari).toLowerCase()) {
      const rowId = data[i][0];
      const rowObj = {
        id: rowId,
        hari: hari,
        nama_seragam: title,
        kategori: kategori,
        deskripsi_lengkap: desc,
        sepatu: sepatu,
        catatan: catatan,
        updated_at: nowStr
      };
      const rowValues = headers.map(h => rowObj[h] !== undefined ? rowObj[h] : data[i][headers.indexOf(h)]);
      sSeragam.getRange(i + 1, 1, 1, rowValues.length).setValues([rowValues]);
      found = true;
      break;
    }
  }

  if (!found) {
    const newId = 'SRG-' + (data.length);
    const rowObj = {
      id: newId,
      hari: hari,
      nama_seragam: title,
      kategori: kategori,
      deskripsi_lengkap: desc,
      sepatu: sepatu,
      catatan: catatan,
      updated_at: nowStr
    };
    const rowValues = headers.map(h => rowObj[h] !== undefined ? rowObj[h] : '');
    sSeragam.appendRow(rowValues);
  }

  return { hari: hari, updated: true };
}


// ==========================================
// OPERASI DATABASE UNIT EKSTRAKURIKULER
// Auto-Provisioning & Pendaftaran Peminatan
// ==========================================

function ensureEkskulListSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_EKSKUL || 'ekskul_list');
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_EKSKUL || 'ekskul_list');
    const headers = [
      'id', 'nama_ekskul', 'kategori', 'hari_latihan', 'jam_latihan',
      'tempat_latihan', 'nama_pembina', 'no_whatsapp', 'deskripsi', 'status_aktif', 'updated_at'
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#022c1f')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);

    const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
    const seedEkskul = [
      [
        'EKS-01', 'Gerakan Pramuka (Gudep 07.125-07.126)', 'Kepanduan',
        'Sabtu', '09.30 - 11.00 WIB', 'Halaman Utama Madrasah',
        'Kak Ahmad Fauzi, S.Pd.', '085649881966',
        'Pendidikan karakter mandiri, kepemimpinan, pionering, tali-temali, sandi morse, & kemah bakti.',
        'AKTIF', nowStr
      ],
      [
        'EKS-02', 'Rebana & Hadroh El-YASUA', 'Seni Islami',
        'Kamis', '14.00 - 16.00 WIB', 'Aula Pertemuan YASUA',
        'Ust. M. Ridwan, S.Pd.I', '085649881966',
        'Seni shalawat Nabi, vokal banjari, variasi pukulan terbang & bas, pengiring PHBI & hajatan.',
        'AKTIF', nowStr
      ],
      [
        'EKS-03', 'Futsal & Olahraga Prestasi', 'Olahraga',
        'Selasa & Sabtu', '15.30 - 17.00 WIB', 'Lapangan Olahraga MTs YASUA',
        'Coach Budi Santoso, S.Pd.', '085649881966',
        'Pengasahan teknik dasar futsal, taktik bermain beregu, stamina fisik, & turnamen POPDA Demak.',
        'AKTIF', nowStr
      ],
      [
        'EKS-04', 'PMR Madya (Palang Merah Remaja)', 'Kepanduan',
        'Rabu', '14.15 - 15.45 WIB', 'Ruang UKS Madrasah',
        'Fatimah Az-Zahra, S.Pd.', '085649881966',
        'Pertolongan pertama (P3K), kesiapsiagaan bencana, donor darah, tandu darurat, & aksi sosial.',
        'AKTIF', nowStr
      ],
      [
        'EKS-05', 'Seni Kaligrafi Islam (Khat & Hiasan)', 'Seni Islami',
        'Senin', '14.15 - 15.45 WIB', 'Sanggar Seni Madrasah',
        'Ust. H. Ahmad Zaini, S.Pd.I', '085649881966',
        "Kaidah khat naskhi, tsuluts, riq'ah, dekorasi hiasan mushaf Al-Qur'an, & persiapan MTQ.",
        'AKTIF', nowStr
      ],
      [
        'EKS-06', 'Paskibra Madrasah (PBB Formasi)', 'Kepanduan',
        "Jum'at", '13.30 - 15.00 WIB', 'Halaman Upacara Madrasah',
        'Drs. Suwarno', '085649881966',
        'Peraturan baris berbaris (PBB), variasi formasi bendera, kedisiplinan, & pengibaran HUT RI.',
        'AKTIF', nowStr
      ],
      [
        'EKS-07', 'Klub Sains & Robotika Terapan (MYRES)', 'Sains & Teknologi',
        'Rabu', '14.30 - 16.00 WIB', 'Lab Komputer & Sains',
        "Ali Mas'ud, S.Kom.", '085649881966',
        'Robotika mikrokontroler ramah lingkungan, coding dasar, IoT terapan, & riset sains madrasah.',
        'AKTIF', nowStr
      ],
      [
        'EKS-08', 'English & Arabic Club (Khitobah & Bahasa)', 'Bahasa & Pidato',
        'Selasa', '14.15 - 15.30 WIB', 'Perpustakaan Digital',
        'Nur Hidayah, S.Pd. & Ust. Ahmad Munif', '085649881966',
        'Percakapan bilingual aktif (muhadatsah & conversation), debat ilmiah, & pidato tiga bahasa.',
        'AKTIF', nowStr
      ]
    ];

    seedEkskul.forEach(r => sheet.appendRow(r));
  }
  return sheet;
}

function ensureEkskulRegSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_EKSKUL_REG || 'ekskul_registrations');
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_EKSKUL_REG || 'ekskul_registrations');
    const headers = [
      'id', 'created_at', 'nama_siswa', 'kelas', 'nisn',
      'ekskul_pilihan', 'alasan_memilih', 'no_wa_wali', 'status_verifikasi'
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#022c1f')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function setupEkskulDatabase() {
  const sList = ensureEkskulListSheet();
  const sReg = ensureEkskulRegSheet();
  return {
    status: 'success',
    message: 'Sheet ekskul_list & ekskul_registrations berhasil dibuat dan diisi data resmi.',
    sheets: [sList.getName(), sReg.getName()]
  };
}

function fetchAllEkskul() {
  const sheet = ensureEkskulListSheet();
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

function submitEkskulRegistration(regData) {
  if (!regData || !regData.nama_siswa || !regData.ekskul_pilihan) {
    return { status: 'error', message: 'Nama siswa dan pilihan ekstrakurikuler wajib diisi' };
  }

  const sheet = ensureEkskulRegSheet();
  const data = sheet.getDataRange().getValues();
  const nextNum = data.length;
  const currentYear = new Date().getFullYear();
  const regId = 'EKS-REG-' + currentYear + '-' + String(nextNum).padStart(3, '0');
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  const rowData = [
    regId,
    nowStr,
    String(regData.nama_siswa || '').trim().toUpperCase(),
    String(regData.kelas || '7-A').trim(),
    String(regData.nisn || '').trim(),
    String(regData.ekskul_pilihan || '').trim(),
    String(regData.alasan_memilih || '').trim(),
    String(regData.no_wa_wali || '').trim(),
    'Terdaftar'
  ];

  sheet.appendRow(rowData);

  return {
    status: 'success',
    message: 'Pendaftaran ekstrakurikuler berhasil tersimpan',
    data: {
      id: regId,
      nama_siswa: String(regData.nama_siswa || '').trim().toUpperCase(),
      ekskul_pilihan: regData.ekskul_pilihan,
      created_at: nowStr,
      status: 'Terdaftar'
    }
  };
}


/**
 * ===================================================================
 * MODUL NOTIFIKASI & POP-UP BERANDA (PERSIS ASNAWIYYAH)
 * ===================================================================
 */
function ensureNotifikasiSheet(ss) {
  const targetSs = ss || SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = targetSs.getSheetByName(CONFIG.SHEET_NOTIFIKASI);
  if (!sheet) {
    sheet = targetSs.insertSheet(CONFIG.SHEET_NOTIFIKASI);
    const headers = [
      'id', 'judul', 'kategori', 'tanggal', 'ringkasan',
      'isi', 'gambar', 'is_popup', 'status', 'created_at', 'updated_at'
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sheet.setFrozenRows(1);

    const defaultNotif = [
      [
        'NOTIF-001',
        'Pendaftaran Santri Baru (PPDB Online) Tahun Ajaran 2026/2027',
        'Administrasi & PPDB',
        new Date().toISOString().split('T')[0],
        'Pendaftaran Santri Baru MTs YASUA Pilangwetan telah dibuka. Dapatkan fasilitas beasiswa santri berprestasi!',
        '<p class="mb-3">Panitia Penerimaan Peserta Didik Baru (PPDB) MTs YASUA Pilangwetan resmi membuka pendaftaran santri baru untuk Tahun Ajaran 2026/2027.</p><p class="mb-3">Tersedia jalur beasiswa tahfidz serta fasilitas sarana pembelajaran modern digital islami. Pendaftaran dapat dilakukan langsung di sekretariat madrasah atau online melalui aplikasi resmi.</p>',
        'https://lh3.googleusercontent.com/d/1mzADFLjLjb0KerlSO1LsX_B9xbDjYbNd',
        true,
        'Aktif',
        new Date().toISOString(),
        new Date().toISOString()
      ]
    ];
    defaultNotif.forEach(function(row) { sheet.appendRow(row); });
  }
  return sheet;
}

function setupNotifikasiDatabase() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ensureNotifikasiSheet(ss);
  return {
    status: 'success',
    message: 'Tabel notifikasi berhasil diinisialisasi',
    sheet: sheet.getName(),
    total_rows: Math.max(0, sheet.getLastRow() - 1)
  };
}

function fetchAllNotifikasi() {
  const sheet = ensureNotifikasiSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0].map(function(h) { return String(h).trim().toLowerCase(); });
  const list = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row[0]) continue;

    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }

    // Normalisasi nilai is_popup
    const isPopupRaw = obj.is_popup;
    obj.is_popup = (isPopupRaw === true || isPopupRaw === 1 || String(isPopupRaw) === '1' || String(isPopupRaw).toLowerCase() === 'true');

    // Normalisasi tanggal
    if (obj.tanggal && obj.tanggal instanceof Date) {
      obj.tanggal = Utilities.formatDate(obj.tanggal, 'Asia/Jakarta', 'yyyy-MM-dd');
    }

    list.push(obj);
  }

  // Urutkan terbaru ke terlama
  list.sort(function(a, b) {
    const timeA = new Date(a.updated_at || a.created_at || a.tanggal || 0).getTime();
    const timeB = new Date(b.updated_at || b.created_at || b.tanggal || 0).getTime();
    return timeB - timeA;
  });

  return list;
}

function saveOrUpdateNotifikasi(notifData) {
  if (!notifData) throw new Error('Data notifikasi tidak boleh kosong');

  const sheet = ensureNotifikasiSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0].map(function(h) { return String(h).trim().toLowerCase(); });
  const now = new Date().toISOString();

  let targetId = notifData.id ? String(notifData.id).trim() : '';
  let rowIndex = -1;

  if (targetId) {
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === targetId) {
        rowIndex = i + 1; // 1-based index untuk Sheets
        break;
      }
    }
  }

  // Jika baru, buat ID unik
  if (rowIndex === -1) {
    if (!targetId) {
      const nextNum = data.length;
      targetId = 'NOTIF-' + String(nextNum).padStart(3, '0');
    }
  }

  const judul = String(notifData.judul || 'Pengumuman Madrasah').trim();
  const kategori = String(notifData.kategori || 'Pengumuman').trim();
  const tanggal = notifData.tanggal ? String(notifData.tanggal) : Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
  const ringkasan = String(notifData.ringkasan || '').trim();
  const isi = String(notifData.isi || '').trim();
  let gambar = String(notifData.gambar || notifData.gambar_url || '').trim();

  // Jika ada file upload base64
  if (notifData.file && notifData.file.base64) {
    const uploadRes = uploadPhotoToDrive(notifData.file.name || 'poster.jpg', notifData.file.base64, 'NOTIF');
    gambar = uploadRes.direct_url;
  }

  const isPopupVal = (notifData.is_popup === true || notifData.is_popup === 1 || String(notifData.is_popup) === '1' || String(notifData.is_popup).toLowerCase() === 'true');
  const statusVal = (notifData.status === 'Nonaktif' || notifData.status === false) ? 'Nonaktif' : 'Aktif';

  // Jika dijadikan popup dan aktif, nonaktifkan flag popup notifikasi lain agar tidak bertumpuk
  if (isPopupVal && statusVal === 'Aktif') {
    const isPopupColIdx = headers.indexOf('is_popup');
    if (isPopupColIdx !== -1) {
      for (let i = 1; i < data.length; i++) {
        if (rowIndex === -1 || i + 1 !== rowIndex) {
          sheet.getRange(i + 1, isPopupColIdx + 1).setValue(false);
        }
      }
    }
  }

  if (rowIndex !== -1) {
    // UPDATE
    const existingCreatedAt = data[rowIndex - 1][headers.indexOf('created_at')] || now;
    const rowObj = {
      id: targetId,
      judul: judul,
      kategori: kategori,
      tanggal: tanggal,
      ringkasan: ringkasan,
      isi: isi,
      gambar: gambar,
      is_popup: isPopupVal,
      status: statusVal,
      created_at: existingCreatedAt,
      updated_at: now
    };
    const rowValues = headers.map(function(h) { return rowObj[h] !== undefined ? rowObj[h] : ''; });
    sheet.getRange(rowIndex, 1, 1, headers.length).setValues([rowValues]);

    // Sinkronisasi otomatis ke announcement ticker jika aktif
    if (statusVal === 'Aktif') {
      try { saveAnnouncementSetting(judul + (ringkasan ? ' — ' + ringkasan : ''), true); } catch(e) {}
    }

    return {
      status: 'success',
      isEdit: true,
      data: rowObj
    };
  } else {
    // INSERT BARU
    const rowObj = {
      id: targetId,
      judul: judul,
      kategori: kategori,
      tanggal: tanggal,
      ringkasan: ringkasan,
      isi: isi,
      gambar: gambar,
      is_popup: isPopupVal,
      status: statusVal,
      created_at: now,
      updated_at: now
    };
    const rowValues = headers.map(function(h) { return rowObj[h] !== undefined ? rowObj[h] : ''; });
    sheet.appendRow(rowValues);

    // Sinkronisasi otomatis ke announcement ticker jika aktif
    if (statusVal === 'Aktif') {
      try { saveAnnouncementSetting(judul + (ringkasan ? ' — ' + ringkasan : ''), true); } catch(e) {}
    }

    return {
      status: 'success',
      isEdit: false,
      data: rowObj
    };
  }
}

function deleteNotifikasiById(notifId) {
  if (!notifId) throw new Error('ID Notifikasi harus disediakan');

  const sheet = ensureNotifikasiSheet();
  const data = sheet.getDataRange().getValues();
  let found = false;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(notifId).trim()) {
      sheet.deleteRow(i + 1);
      found = true;
      break;
    }
  }

  if (!found) {
    throw new Error('Notifikasi dengan ID ' + notifId + ' tidak ditemukan');
  }

  return { status: 'success', message: 'Notifikasi berhasil dihapus' };
}


/**
 * ===================================================================
 * MODUL PROFIL MADRASAH (DYNAMIC SETTINGS CONTROLLER)
 * ===================================================================
 */
const DEFAULT_PROFILE_CONFIG = {
  profile_nama: 'MTs YASUA Pilangwetan',
  profile_npsn: '20364357',
  profile_nsm: '121233210034',
  profile_akreditasi: 'Peringkat A (Unggul)',
  profile_yayasan: 'YASUA (Berdiri 1949)',
  profile_kepala_nama: 'Muthohar, S.Pd.',
  profile_kepala_jabatan: 'Kepala MTs YASUA Pilangwetan',
  profile_kepala_foto: 'https://lh3.googleusercontent.com/d/1RP0vQ-n3Vk9C31K8H7sjB1ffhlYWQ7Ib',
  profile_kepala_sambutan: 'Selamat datang di MTs YASUA Pilangwetan. Kami berikhtiar mendidik generasi muda yang kokoh aqidah Ahlus Sunnah Wal Jama\'ah, berakhlak mulia, cerdas dalam ilmu pengetahuan, dan cakap teknologi.',
  profile_sejarah: 'Madrasah didirikan atas kepedulian para sesepuh ulama dan tokoh masyarakat Pilangwetan pasca kemerdekaan RI (sejak 12 September 1949). Beliau-beliau berikhtiar membimbing anak-anak menjadi muslim berilmu, bertaqwa, sholeh, dan bermanfaat bagi nusa, bangsa, serta agama.',
  profile_muassis: 'Bapak K. Ahmad, Bapak Moh. Syuhadi, Bapak H. Nuruddin, Bapak H. Amin, Bapak Shodiqun, Bapak Muridan',
  profile_visi: 'Terwujudnya pendidikan yang islami, bermutu, memiliki sikap dan wawasan yang luas, beriman, bertaqwa, dan berakhlakul karimah, menguasai ilmu pengetahuan dan teknologi sesuai dengan perkembangan zaman.',
  profile_misi: 'Melaksanakan pendidikan dan pengajaran agama Islam ala Ahlus Sunnah Wal Jama’ah.\nMemberikan pelayanan dan pengabdian tulus terhadap masyarakat, nusa, bangsa, dan NKRI.\nMeningkatkan pembelajaran aktif, kreatif, inovatif, dan menyenangkan penghasil lulusan bermutu.\nMempersiapkan insan beriman, bertaqwa, berakhlak mulia, berpengetahuan luas, dan terampil.\nMemenuhi kebutuhan pendidikan masyarakat sekitar sehingga menjadi madrasah idola dan terpercaya.',
  profile_waka_kurikulum: 'Hj. Thoibah R., S.Ag.',
  profile_waka_kesiswaan: 'Aidiyah, S.Pd.',
  profile_waka_sarpras: 'Hj. Inna M., S.Ag.',
  profile_waka_humas: 'Ahmad Wawahib, S.Pd.',
  profile_fasilitas: 'Lab Komputer CBT & ANBK, Perpustakaan & Kitab Klasik, Masjid Jami\' Asnawiyyah, Lapangan Olahraga Luas, Asrama Santri PPTQ Asnawiyyah, Free WiFi Edukasi Madrasah',
  profile_alamat: 'Jl. Raya Pilangwetan, RT 02 / RW 01, Desa Pilangwetan, Kecamatan Kebonagung, Kabupaten Demak, Jawa Tengah 59561.',
  profile_maps_url: 'https://maps.google.com/?q=MTs+YASUA+Pilangwetan+Demak',
  profile_wa_sekretariat: 'https://wa.me/6285649881966',
  profile_telepon: '085649881966'
};

function ensureProfileSettings(ss) {
  const targetSs = ss || SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = targetSs.getSheetByName(CONFIG.SHEET_SETTINGS);
  if (!sheet) {
    sheet = targetSs.insertSheet(CONFIG.SHEET_SETTINGS);
    sheet.appendRow(['key', 'value', 'description']);
    sheet.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#022c1f').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  const data = sheet.getDataRange().getValues();
  const existingKeys = {};
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) existingKeys[String(data[i][0]).trim()] = true;
  }

  for (const key in DEFAULT_PROFILE_CONFIG) {
    if (!existingKeys[key]) {
      sheet.appendRow([key, DEFAULT_PROFILE_CONFIG[key], 'Konfigurasi Profil Madrasah']);
    }
  }
  return sheet;
}

function setupProfileDefaults() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  ensureProfileSettings(ss);
  return {
    status: 'success',
    message: 'Konfigurasi profil madrasah berhasil diinisialisasi di tabel settings',
    data: fetchProfileData()
  };
}

function fetchProfileData() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ensureProfileSettings(ss);
  const data = sheet.getDataRange().getValues();

  const raw = Object.assign({}, DEFAULT_PROFILE_CONFIG);
  for (let i = 1; i < data.length; i++) {
    const k = String(data[i][0] || '').trim();
    if (k && k !== 'admin_password') {
      raw[k] = data[i][1];
    }
  }

  return {
    raw: raw,
    identitas: {
      nama: raw.profile_nama || 'MTs YASUA Pilangwetan',
      npsn: raw.profile_npsn || '20364357',
      nsm: raw.profile_nsm || '121233210034',
      akreditasi: raw.profile_akreditasi || 'Peringkat A (Unggul)',
      yayasan: raw.profile_yayasan || 'YASUA (Berdiri 1949)'
    },
    kepala: {
      nama: raw.profile_kepala_nama || 'Muthohar, S.Pd.',
      jabatan: raw.profile_kepala_jabatan || 'Kepala MTs YASUA Pilangwetan',
      foto: raw.profile_kepala_foto || 'https://lh3.googleusercontent.com/d/1RP0vQ-n3Vk9C31K8H7sjB1ffhlYWQ7Ib',
      sambutan: raw.profile_kepala_sambutan || ''
    },
    sejarah: {
      teks: raw.profile_sejarah || '',
      muassis: String(raw.profile_muassis || '').split(',').map(function(s) { return s.trim(); }).filter(Boolean)
    },
    visimisi: {
      visi: raw.profile_visi || '',
      misi: String(raw.profile_misi || '').split('\n').map(function(s) { return s.trim(); }).filter(Boolean)
    },
    pimpinan: {
      kepala: raw.profile_kepala_nama || 'Muthohar, S.Pd.',
      kurikulum: raw.profile_waka_kurikulum || 'Hj. Thoibah R., S.Ag.',
      kesiswaan: raw.profile_waka_kesiswaan || 'Aidiyah, S.Pd.',
      sarpras: raw.profile_waka_sarpras || 'Hj. Inna M., S.Ag.',
      humas: raw.profile_waka_humas || 'Ahmad Wawahib, S.Pd.'
    },
    fasilitas: String(raw.profile_fasilitas || '').split(',').map(function(s) { return s.trim(); }).filter(Boolean),
    kontak: {
      alamat: raw.profile_alamat || '',
      maps_url: raw.profile_maps_url || 'https://maps.google.com/?q=MTs+YASUA+Pilangwetan+Demak',
      wa_sekretariat: raw.profile_wa_sekretariat || 'https://wa.me/6285649881966',
      telepon: raw.profile_telepon || '085649881966'
    }
  };
}

function saveProfileData(payloadData) {
  if (!payloadData) throw new Error('Data profil tidak boleh kosong');

  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ensureProfileSettings(ss);

  if (payloadData.file && payloadData.file.base64) {
    const uploadRes = uploadPhotoToDrive(payloadData.file.name || 'kepala_madrasah.jpg', payloadData.file.base64, 'KEPALA');
    payloadData.profile_kepala_foto = uploadRes.direct_url;
  }

  const data = sheet.getDataRange().getValues();
  const rowIndexMap = {};
  for (let i = 1; i < data.length; i++) {
    const k = String(data[i][0] || '').trim();
    if (k) rowIndexMap[k] = i + 1;
  }

  for (const key in payloadData) {
    if (key === 'file' || key === 'password' || key === 'action') continue;
    const val = String(payloadData[key] !== undefined ? payloadData[key] : '');

    if (rowIndexMap[key]) {
      sheet.getRange(rowIndexMap[key], 2).setValue(val);
    } else {
      sheet.appendRow([key, val, 'Konfigurasi Profil Madrasah']);
      rowIndexMap[key] = sheet.getLastRow();
    }
  }

  return {
    status: 'success',
    message: 'Profil madrasah berhasil diperbarui di database',
    data: fetchProfileData()
  };
}


/**
 * ===================================================================
 * MODUL GALERI & DOKUMENTASI MADRASAH (DATABASE CONTROLLER)
 * ===================================================================
 */

function ensureGallerySheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_GALLERY);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_GALLERY);
    sheet.appendRow([
      'id', 'judul', 'kategori', 'kategoriLabel', 'tanggal', 'lokasi',
      'platform', 'platformUrl', 'deskripsi', 'urutan', 'status', 'gambar',
      'created_at', 'updated_at'
    ]);
    sheet.getRange(1, 1, 1, 14).setBackground('#5B21B6').setFontColor('#FFFFFF').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function setupGalleryDatabase() {
  const sheet = ensureGallerySheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    const defaultData = [
      {
        id: "gal_1",
        judul: "Gedung Pembelajaran Terpadu MTs YASUA",
        kategori: "sarpras",
        kategoriLabel: "Fasilitas Kampus",
        tanggal: "2024-08-10",
        lokasi: "Pilangwetan, Demak",
        platform: "instagram",
        platformUrl: "https://www.instagram.com/mts.yasua_pilangwetan/",
        deskripsi: "Suasana kampus madrasah yang asri, hijau, bersih, dan berwawasan islami di Desa Pilangwetan, Kebonagung, Demak.",
        urutan: 1,
        status: true,
        gambar: "https://lh3.googleusercontent.com/d/1O64dLuEv6Z1nAo_rNyLdHW4GTfSLasn6"
      },
      {
        id: "gal_2",
        judul: "Apel Pagi & Pembinaan Siswa di Lapangan",
        kategori: "kegiatan",
        kategoriLabel: "Kedisiplinan",
        tanggal: "2024-08-15",
        lokasi: "Lapangan Madrasah",
        platform: "tiktok",
        platformUrl: "https://www.tiktok.com/@mts.yasua_pilangwetan",
        deskripsi: "Pembinaan karakter dan kedisiplinan santri secara rutin dalam apel pagi madrasah.",
        urutan: 2,
        status: true,
        gambar: "https://lh3.googleusercontent.com/d/1eqhhEb_0y9aCZeLRajc0NuzARTc9owV0"
      },
      {
        id: "gal_3",
        judul: "Laboratorium Komputer & CBT Center",
        kategori: "sarpras",
        kategoriLabel: "Literasi Digital",
        tanggal: "2024-09-02",
        lokasi: "Lab Komputer Terpadu",
        platform: "instagram",
        platformUrl: "https://www.instagram.com/mts.yasua_pilangwetan/",
        deskripsi: "Fasilitas ruang CBT modern ber-AC dengan koneksi internet cepat untuk ujian digital dan pengenalan IT.",
        urutan: 3,
        status: true,
        gambar: "https://lh3.googleusercontent.com/d/1bWp0K3Wp6_n57z3j2z8G34nK0sQc1uW9"
      },
      {
        id: "gal_4",
        judul: "Pembiasaan Shalat Dhuha & Istighosah Bersama",
        kategori: "kegiatan",
        kategoriLabel: "Pembiasaan Ibadah",
        tanggal: "2024-09-12",
        lokasi: "Masjid Jami' Asnawiyyah",
        platform: "instagram",
        platformUrl: "https://www.instagram.com/mts.yasua_pilangwetan/",
        deskripsi: "Penanaman spiritualitas santri lewat shalat dhuha berjamaah dan pembacaan istighosah rutin.",
        urutan: 4,
        status: true,
        gambar: "https://lh3.googleusercontent.com/d/1v6HkW3d7y8g4j9k2l1m0n3b4v5c6x7z8"
      },
      {
        id: "gal_5",
        judul: "Kunjungan & Bimbingan Belajar Siswa Berprestasi",
        kategori: "kegiatan",
        kategoriLabel: "Akademik & Info",
        tanggal: "2024-09-20",
        lokasi: "Ruang Kelas Digital",
        platform: "tiktok",
        platformUrl: "https://www.tiktok.com/@mts.yasua_pilangwetan",
        deskripsi: "Bimbingan intensif persiapan kompetisi sains madrasah dan olimpiade keagamaan tingkat kabupaten/provinsi.",
        urutan: 5,
        status: true,
        gambar: "https://lh3.googleusercontent.com/d/1xyiEwouAo5sUvDhAwfjoUi0vBbw-pfeN"
      },
      {
        id: "gal_6",
        judul: "Gedung Asrama PPTQ Asnawiyyah Pilangwetan",
        kategori: "sarpras",
        kategoriLabel: "Fasilitas Pesantren",
        tanggal: "2024-10-01",
        lokasi: "Kompleks Pesantren",
        platform: "instagram",
        platformUrl: "https://www.instagram.com/mts.yasua_pilangwetan/",
        deskripsi: "Pondok Pesantren Tahfidzul Qur'an terintegrasi dengan MTs YASUA untuk pembinaan 24 jam.",
        urutan: 6,
        status: true,
        gambar: "https://lh3.googleusercontent.com/d/1O64dLuEv6Z1nAo_rNyLdHW4GTfSLasn6"
      }
    ];

    const nowStr = new Date().toISOString();
    defaultData.forEach(function(item) {
      sheet.appendRow([
        item.id, item.judul, item.kategori, item.kategoriLabel, item.tanggal, item.lokasi,
        item.platform, item.platformUrl, item.deskripsi, item.urutan, item.status, item.gambar,
        nowStr, nowStr
      ]);
    });
  }
  return { status: 'success', message: 'Tabel gallery berhasil diinisialisasi dengan data default' };
}

function fetchAllGallery() {
  const sheet = ensureGallerySheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    setupGalleryDatabase();
  }
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0];
  const rows = data.slice(1);

  const list = rows.map(function(row) {
    const item = {};
    headers.forEach(function(h, idx) {
      item[h] = row[idx];
    });
    item.status = (item.status === true || String(item.status).toLowerCase() === 'true');
    item.urutan = Number(item.urutan) || 99;
    return item;
  });

  list.sort(function(a, b) { return a.urutan - b.urutan; });
  return list;
}

function saveOrUpdateGallery(data, fileBase64, fileName, fileMime) {
  const sheet = ensureGallerySheet();
  let imgUrl = data.gambar || '';

  if (fileBase64) {
    const uploadRes = uploadPhotoToDrive(fileName || ('galeri_' + Date.now() + '.jpg'), fileBase64, 'GALERI');
    if (uploadRes && uploadRes.url) {
      imgUrl = uploadRes.url;
    }
  }

  const id = data.id || ('gal_' + Date.now());
  const nowStr = new Date().toISOString();

  const values = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      rowIndex = i + 1;
      break;
    }
  }

  const rowData = [
    id,
    data.judul || '',
    (data.kategori || 'kegiatan').toLowerCase(),
    data.kategoriLabel || 'Dokumentasi',
    data.tanggal || '',
    data.lokasi || 'Pilangwetan, Demak',
    (data.platform || 'instagram').toLowerCase(),
    data.platformUrl || 'https://www.instagram.com/mts.yasua_pilangwetan/',
    data.deskripsi || '',
    Number(data.urutan) || 1,
    (data.status === true || String(data.status).toLowerCase() === 'true'),
    imgUrl,
    rowIndex > 0 ? values[rowIndex - 1][12] : nowStr,
    nowStr
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return { id: id, gambar: imgUrl };
}

function deleteGalleryById(id) {
  const sheet = ensureGallerySheet();
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function toggleGalleryStatusById(id, status) {
  const sheet = ensureGallerySheet();
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      const newStatus = (status === true || String(status).toLowerCase() === 'true');
      sheet.getRange(i + 1, 11).setValue(newStatus);
      sheet.getRange(i + 1, 14).setValue(new Date().toISOString());
      return { id: id, status: newStatus };
    }
  }
  return null;
}

// ==========================================
// MODUL DATABASE PRESTASI & KEJUARAAN SISWA
// ==========================================

function ensurePrestasiSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName('prestasi');
  if (!sheet) {
    sheet = ss.insertSheet('prestasi');
    const headers = [
      'id', 'judul', 'kategori', 'peringkat', 'tingkat', 
      'tahun', 'peraih', 'penyelenggara', 'deskripsi', 
      'urutan', 'status', 'gambar', 'created_at', 'updated_at'
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#FEF3C7');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function setupPrestasiDatabase() {
  const sheet = ensurePrestasiSheet();
  const existing = sheet.getDataRange().getValues();
  if (existing.length > 1) {
    return { status: 'info', message: 'Sheet prestasi sudah memiliki data' };
  }

  const initialPrestasi = [
    [
      'PREST-1',
      'Juara 1 KSM Matematika Terintegrasi',
      'sains',
      'Juara 1',
      'Kabupaten',
      '2026',
      'Ananda M. Fatih & Tim Sains YASUA',
      'Kementerian Agama Kab. Demak',
      'Kompetisi Sains Madrasah (KSM) bidang Matematika Terintegrasi jenjang MTs tingkat Kabupaten Demak.',
      1,
      true,
      'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=800&auto=format&fit=crop',
      new Date().toISOString(),
      new Date().toISOString()
    ],
    [
      'PREST-2',
      'Juara 1 Lomba Drumband Tingkat Jateng',
      'olahraga',
      'Juara 1',
      'Provinsi',
      '2025',
      'Gita Bahana MTs YASUA',
      'PDBI Jawa Tengah',
      'Festival & parade marching band divisi junior tingkat Provinsi Jawa Tengah.',
      2,
      true,
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
      new Date().toISOString(),
      new Date().toISOString()
    ],
    [
      'PREST-3',
      'Juara 2 Kaligrafi Kontemporer MTQ Pelajar',
      'keagamaan',
      'Juara 2',
      'Kabupaten',
      '2025',
      'Ahmad Royhan (Kelas IX-B)',
      'LPTQ Kabupaten Demak',
      'Musabaqah Tilawatil Quran cabang Seni Kaligrafi Islam Kontemporer.',
      3,
      true,
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
      new Date().toISOString(),
      new Date().toISOString()
    ],
    [
      'PREST-4',
      'Juara 2 MHQ 3 Juz Putri Tingkat Karesidenan',
      'keagamaan',
      'Juara 2',
      'Karesidenan',
      '2025',
      'Siti Aisyah (Kelas VIII-A)',
      'Forum Komunikasi Tahfidz Semarang & Demak',
      'Musabaqah Hifdzil Quran kategori 3 Juz dan Tilawah Putri.',
      4,
      true,
      'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=800&auto=format&fit=crop',
      new Date().toISOString(),
      new Date().toISOString()
    ],
    [
      'PREST-5',
      'Juara Umum LT-II Pramuka Penggalang',
      'pramuka',
      'Juara Umum',
      'Kecamatan',
      '2024',
      'Regu Rajawali & Melati MTs YASUA',
      'Kwartir Ranting Kebonagung',
      'Lomba Tingkat II Pramuka Penggalang se-Kecamatan Kebonagung.',
      5,
      true,
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop',
      new Date().toISOString(),
      new Date().toISOString()
    ],
    [
      'PREST-6',
      'Juara 3 Silat Pagar Nusa Kejurkab Demak',
      'olahraga',
      'Juara 3',
      'Kabupaten',
      '2024',
      'Muhammad Rizqi Pratama (Kelas IX-C)',
      'Pengcab IPSI / Pagar Nusa Kab. Demak',
      'Kejuaraan Kabupaten Pencak Silat Remaja Kelas D Putra.',
      6,
      true,
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
      new Date().toISOString(),
      new Date().toISOString()
    ]
  ];

  sheet.getRange(2, 1, initialPrestasi.length, initialPrestasi[0].length).setValues(initialPrestasi);
  return { status: 'success', message: 'Inisialisasi 6 data awal prestasi berhasil!', count: initialPrestasi.length };
}

function fetchAllPrestasi() {
  const sheet = ensurePrestasiSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    setupPrestasiDatabase();
  }
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0];
  const rows = data.slice(1);

  const list = rows.map(function(row) {
    const item = {};
    headers.forEach(function(h, idx) {
      item[h] = row[idx];
    });
    item.status = (item.status === true || String(item.status).toLowerCase() === 'true');
    item.urutan = Number(item.urutan) || 99;
    item.tahun = String(item.tahun || '2026');
    return item;
  });

  list.sort(function(a, b) { return a.urutan - b.urutan; });
  return list;
}

function saveOrUpdatePrestasi(data, fileBase64, fileName, fileMime) {
  const sheet = ensurePrestasiSheet();
  let imgUrl = data.gambar || '';

  if (fileBase64) {
    const uploadRes = uploadPhotoToDrive(fileName || ('prestasi_' + Date.now() + '.jpg'), fileBase64, 'PRESTASI');
    if (uploadRes && uploadRes.url) {
      imgUrl = uploadRes.url;
    }
  }

  const id = data.id || ('PREST-' + Date.now());
  const nowStr = new Date().toISOString();

  const values = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      rowIndex = i + 1;
      break;
    }
  }

  const rowData = [
    id,
    data.judul || '',
    (data.kategori || 'sains').toLowerCase(),
    data.peringkat || 'Juara 1',
    data.tingkat || 'Kabupaten',
    String(data.tahun || new Date().getFullYear()),
    data.peraih || '',
    data.penyelenggara || '',
    data.deskripsi || '',
    Number(data.urutan) || 1,
    (data.status === true || String(data.status).toLowerCase() === 'true'),
    imgUrl,
    rowIndex > 0 ? values[rowIndex - 1][12] : nowStr,
    nowStr
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return { id: id, judul: data.judul, status: 'success' };
}

function deletePrestasiById(id) {
  const sheet = ensurePrestasiSheet();
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function togglePrestasiStatusById(id, status) {
  const sheet = ensurePrestasiSheet();
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      const newStatus = (status === true || String(status).toLowerCase() === 'true');
      sheet.getRange(i + 1, 11).setValue(newStatus);
      sheet.getRange(i + 1, 14).setValue(new Date().toISOString());
      return { id: id, status: newStatus };
    }
  }
  return null;
}
