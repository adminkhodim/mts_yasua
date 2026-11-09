const fs = require('fs');
const path = require('path');

const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxNFLoL96Ch_8QOKhp5AFauIGb9GcMpd9eb3my_zqikL0sDuncgRhDPD6tez-fuY6wT/exec?action=getNews";
const SITE_DOMAIN = "https://www.mtsyasua.sch.id";

// In-Memory Cache untuk menghindari cold-start GAS
let globalNewsCache = null;
let lastCacheFetchTime = 0;
const CACHE_LIFETIME_MS = 60 * 1000; // 1 Menit

// Dataset Berita Bawaan Terkini (Akselerasi Instan 0ms)
const STATIC_NEWS = [
  {
    id: 'NEWS-001',
    alt_id: 'adiwiyata',
    slug: 'bergerak-bersama-mts-yasua-pilangwetan-matangkan-kesiapan-menuju-madrasah-adiwiyata',
    judul: 'Bergerak Bersama, MTs Yasua Pilangwetan Matangkan Kesiapan Menuju Madrasah Adiwiyata',
    ringkasan: 'Komitmen seluruh civitas akademika madrasah dalam mewujudkan lingkungan belajar yang hijau, asri, bersih, dan berwawasan lingkungan.',
    gambar_url: 'https://lh3.googleusercontent.com/d/1FZjGhGErRl_Kiym4XhhmIfPtltuPDii7'
  },
  {
    id: 'NEWS-002',
    alt_id: 'asmaulhusna',
    slug: 'awali-hari-dengan-keberkahan-lantunan-asmaulhusna-doa-dan-murojaah-menggema-setiap-pagi-di-mts-yasua',
    judul: 'Awali Hari dengan Keberkahan: Lantunan Asmaulhusna, Doa, dan Murojaah Menggema Setiap Pagi di MTs Yasua',
    ringkasan: 'Pembiasaan karakter islami santri melalui lantunan doa, asmaulhusna, dan murojaah hafalan Al-Qur\'an sebelum memulai jam pembelajaran.',
    gambar_url: 'https://www.mtsyasua.sch.id/foto-upacara.jpg'
  },
  {
    id: 'NEWS-003',
    alt_id: 'pembelajaran-inovatif',
    slug: 'hadirkan-pembelajaran-menarik-dan-inovatif-guru-mts-yasua-sukses-tingkatkan-antusiasme-belajar-siswa',
    judul: 'Hadirkan Pembelajaran Menarik dan Inovatif, Guru MTs Yasua Sukses Tingkatkan Antusiasme Belajar Siswa',
    ringkasan: 'Penerapan metode pembelajaran interaktif berbasis teknologi digital dan media visual yang menyenangkan di ruang kelas madrasah.',
    gambar_url: 'https://lh3.googleusercontent.com/d/1J-IAdpO8om28ePlE2YcwcCt9LseViKiW'
  },
  {
    id: 'NEWS-004',
    alt_id: 'ppdb',
    slug: 'penerimaan-peserta-didik-baru-ppdb-tahun-ajaran-20262027-resmi-dibuka',
    judul: 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Resmi Dibuka',
    ringkasan: 'Tersedia jalur prestasi beasiswa tahfidz serta jalur reguler bagi lulusan SD/MI se-Kabupaten Demak.',
    gambar_url: 'https://www.mtsyasua.sch.id/foto-gedung.jpg'
  },
  {
    id: 'NEWS-005',
    alt_id: 'shalat-zuhur',
    slug: 'bentuk-karakter-religius-dan-disiplin-siswa-siswi-mts-yasua-konsisten-jalankan-shalat-zuhur-berjamaah',
    judul: 'Bentuk Karakter Religius dan Disiplin, Siswa-Siswi MTs Yasua Konsisten Jalankan Shalat Zuhur Berjamaah',
    ringkasan: 'Kedisiplinan ibadah shalat berjamaah tepat waktu sebagai fondasi pembentukan akhlakul karimah seluruh santri madrasah.',
    gambar_url: 'https://www.mtsyasua.sch.id/foto-sholat-santri.jpg'
  },
  {
    id: 'NEWS-006',
    alt_id: 'tempat-sampah',
    slug: 'keren-mts-yasua-hadirkan-tempat-sampah-khusus-botol-plastik-demi-wujudkan-madrasah-hijau',
    judul: 'Keren! MTs Yasua Hadirkan Tempat Sampah Khusus Botol Plastik demi Wujudkan Madrasah Hijau',
    kategori: 'Berita & Kegiatan',
    tanggal: '9 November 2026',
    views: 1226,
    read_time: '2 menit baca',
    ringkasan: 'DEMAK – Langkah nyata dalam menjaga kelestarian lingkungan terus digalakkan di lingkungan pendidikan.',
    gambar_url: 'https://lh3.googleusercontent.com/d/1YuAgGt2guP9c9Pi79YGzNZTYZahpPhSL',
    konten: '<p class="mb-3">DEMAK – Langkah nyata dalam menjaga kelestarian lingkungan terus digalakkan di lingkungan pendidikan. Salah satu terobosan menarik lahir dari MTs Yasua, Kecamatan Kebonagung, Kabupaten Demak. Guna menekan angka limbah plastik di sekolah, pihak madrasah secara resmi meluncurkan fasilitas tempat sampah khusus botol plastik di lingkungan sekolah.</p><p class="mb-3">Langkah inovatif ini diambil bukan tanpa alasan. Produksi sampah botol plastik bekas minuman harian siswa dinilai cukup tinggi. Melalui penyediaan tempat sampah terpisah ini, MTs Yasua berkomitmen untuk mempermudah proses pemilahan sampah sejak dari sumbernya (hulu), sekaligus mengedukasi para siswa tentang pentingnya konsep daur ulang (recycle).</p><p class="mb-3">Kepala MTs Yasua menyampaikan bahwa program ini merupakan bagian dari gerakan menuju madrasah hijau (green madrasah) yang bebas dari tumpukan sampah plastik yang tidak terurai.<br>"Kami ingin menanamkan karakter peduli lingkungan kepada para siswa sejak dini. Dengan adanya tempat sampah khusus botol plastik ini, siswa diajarkan bahwa botol bekas bukanlah limbah yang tidak berguna, melainkan material yang memiliki nilai ekonomis dan kreativitas jika dikelola dengan benar," ujarnya.</p><p class="mb-3">Pilah Sampah Jadi Tabungan Kreatif<br>Menariknya, botol-botol plastik yang terkumpul di tempat sampah khusus tersebut tidak akan langsung dibuang begitu saja ke Tempat Pembuangan Akhir (TPA). Madrasah telah merencanakan program lanjutan untuk mengolah botol bekas tersebut.<br>Beberapa opsi pengelolaan yang disiapkan antara lain menyalurkannya ke bank sampah, memanfaatkannya sebagai media tanam hidroponik di taman sekolah, hingga mengolahnya menjadi bahan baku kerajinan tangan bernilai estetika tinggi pada mata pelajaran Prakarya.</p><p class="mb-3">Respon positif pun datang dari para siswa. Mereka mengaku menjadi lebih bersemangat untuk memilah sampah karena tempat sampahnya dirancang dengan visual yang menarik dan mudah dikenali di area koridor madrasah.</p><p class="mb-3">Melalui kehadiran tempat sampah khusus ini, MTs Yasua berharap dapat menjadi inspirasi bagi sekolah-sekolah lain di wilayah Demak untuk terus berinovasi dalam mengelola kebersihan lingkungan demi masa depan bumi yang lebih baik.</p>'
  }
];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function resolveImageUrl(rawImg, host) {
  const baseHost = host ? `https://${host}` : SITE_DOMAIN;
  const defaultImg = `${baseHost}/logo.png`;
  if (!rawImg) return defaultImg;

  let img = String(rawImg).trim();
  if (img.startsWith('data:')) return defaultImg;

  // Google Drive Link Resolver
  if (img.includes('drive.google.com') || img.includes('docs.google.com') || img.includes('googleusercontent.com')) {
    const driveMatch = img.match(/(?:id=|d\/|open\?id=)([a-zA-Z0-9_-]{25,})/);
    if (driveMatch && driveMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
    }
  }

  // Jika URL Eksternal Lengkap
  if (img.startsWith('http://') || img.startsWith('https://')) {
    return img;
  }

  // Relative Path File Lokal - Bersihkan leading slash
  img = img.replace(/^\/+/, '');

  // Preferensi JPG untuk WhatsApp Open Graph Scraper
  const jpgVariant = img.replace(/\.webp$/i, '.jpg');
  const jpgPath = path.join(process.cwd(), jpgVariant);
  if (fs.existsSync(jpgPath)) {
    return `${baseHost}/${jpgVariant}`;
  }

  return `${baseHost}/${img}`;
}

async function fetchFromGasWithCache() {
  const now = Date.now();
  if (globalNewsCache && (now - lastCacheFetchTime < CACHE_LIFETIME_MS)) {
    return globalNewsCache;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7500); // 7.5s toleransi GAS
    const res = await fetch(GAS_API_URL, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const json = await res.json();
      if (json && json.status === 'success' && Array.isArray(json.data)) {
        globalNewsCache = json.data;
        lastCacheFetchTime = now;
        return globalNewsCache;
      }
    }
  } catch (err) {
    console.warn('[OG Resolver] GAS fetch error:', err.message);
  }

  return globalNewsCache;
}

async function findNewsItem(slug) {
  if (!slug) return null;
  const search = slug.toString().toLowerCase().trim();

  // 1. Cek di cache/live GAS terlebih dahulu (Data Terkini & Lengkap)
  const liveList = await fetchFromGasWithCache();
  if (Array.isArray(liveList)) {
    const found = liveList.find(n => 
      (n.slug && String(n.slug).toLowerCase() === search) ||
      (n.id && String(n.id).toLowerCase() === search)
    );
    if (found) return found;
  }

  // 2. Fallback ke dataset lokal (Instan 0ms jika GAS offline / cold start)
  const local = STATIC_NEWS.find(n => 
    (n.slug && n.slug.toLowerCase() === search) ||
    (n.id && n.id.toLowerCase() === search) ||
    (n.alt_id && n.alt_id.toLowerCase() === search)
  );
  if (local) return local;

  return null;
}

module.exports = async function handler(req, res) {
  const slug = req.query.slug || '';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'www.mtsyasua.sch.id';

  try {
    const htmlPath = path.join(process.cwd(), 'berita.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    const newsItem = await findNewsItem(slug);

    if (newsItem) {
      const canonicalSlug = newsItem.slug || slug;
      const title = `${newsItem.judul} — MTs YASUA Pilangwetan`;
      const description = newsItem.ringkasan || (newsItem.konten ? String(newsItem.konten).replace(/<[^>]*>/g, ' ').substring(0, 160).trim() : 'Kabar resmi madrasah MTs YASUA Pilangwetan, Kebonagung, Demak.');
      const image = resolveImageUrl(newsItem.gambar_url || newsItem.gambar, host);
      const url = `https://${host}/berita/${canonicalSlug}`;

      // Hapus metadata lama
      html = html
        .replace(/<title>[\s\S]*?<\/title>/i, '')
        .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
        .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
        .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
        .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '')
        .replace(/<link\s+rel=["']image_src["'][^>]*>/gi, '');

      const dynamicMetaTags = `
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(url)}">

  <!-- Open Graph Dinamis (WhatsApp, Facebook, Telegram, Medsos) -->
  <meta property="og:site_name" content="MTs YASUA Pilangwetan">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:image:secure_url" content="${escapeHtml(image)}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(newsItem.judul)}">
  <link rel="image_src" href="${escapeHtml(image)}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${escapeHtml(url)}">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
      `;

      const initialArticleScript = `
  <!-- Injeksi Data Artikel Instan 0ms untuk Client-Side Hydration -->
  <script>
    window.__INITIAL_NEWS_ITEM__ = ${JSON.stringify(newsItem).replace(/</g, '\\u003c')};
  </script>
`;
      html = html.replace(/<head>/i, `<head>\n  <base href="/">\n${dynamicMetaTags}\n${initialArticleScript}`);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[OG Serverless Error]:', err);
    const fallbackPath = path.join(process.cwd(), 'berita.html');
    const fallbackHtml = fs.readFileSync(fallbackPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(fallbackHtml);
  }
};
