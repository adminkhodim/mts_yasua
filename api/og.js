const fs = require('fs');
const path = require('path');

const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxNFLoL96Ch_8QOKhp5AFauIGb9GcMpd9eb3my_zqikL0sDuncgRhDPD6tez-fuY6wT/exec?action=getNews";
const SITE_DOMAIN = "https://www.mtsyasua.sch.id";

// Dataset Berita Bawaan Madrasah (Akselerasi Instan < 5ms)
const STATIC_NEWS = [
  {
    id: 'pts',
    alt_id: 'NEWS-001',
    slug: 'penilaian-tengah-semester-pts-gasal-mts-yasua-pilangwetan',
    judul: 'Penilaian Tengah Semester (PTS) Gasal MTs YASUA Pilangwetan',
    ringkasan: 'Diberitahukan kepada seluruh siswa-siswi kelas VII, VIII, dan IX serta Bapak/Ibu Wali Murid bahwa pelaksanaan PTS terpadu dilaksanakan berbasis asesmen tertulis dan digital komputer.',
    gambar_url: 'poster_pts_berita.jpg'
  },
  {
    id: 'prestasi',
    alt_id: 'NEWS-002',
    slug: 'siswa-mts-yasua-raih-juara-1-olimpiade-sains-robotika-tingkat-provinsi-jawa-tengah',
    judul: 'Siswa MTs YASUA Raih Juara 1 Olimpiade Sains & Robotika Tingkat Provinsi Jawa Tengah',
    ringkasan: 'Kabar membanggakan diraih delegasi siswa madrasah dalam ajang bergengsi sains dan teknologi terapan.',
    gambar_url: 'foto-upacara.jpg'
  },
  {
    id: 'parenting',
    alt_id: 'NEWS-003',
    slug: 'workshop-parenting-akbar-membangun-sinergi-rumah-dan-sekolah-menuju-generasi-qurani',
    judul: "Workshop Parenting Akbar: Membangun Sinergi Rumah dan Sekolah Menuju Generasi Qur'ani",
    ringkasan: 'Silaturahmi wali murid dan komite madrasah mendiskusikan bimbingan moral anak di era serba digital.',
    gambar_url: 'foto-kajian-santriwati.jpg'
  },
  {
    id: 'ppdb',
    alt_id: 'NEWS-004',
    slug: 'penerimaan-peserta-didik-baru-ppdb-tahun-ajaran-2026-2027-resmi-dibuka',
    judul: 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Resmi Dibuka',
    ringkasan: 'Tersedia jalur prestasi beasiswa tahfidz serta jalur reguler bagi lulusan SD/MI se-Kabupaten Demak.',
    gambar_url: 'foto-gedung.jpg'
  },
  {
    id: 'anbk',
    alt_id: 'NEWS-005',
    slug: 'pelaksanaan-asesmen-nasional-anbk-di-laboratorium-komputer-berlangsung-tertib-lancar',
    judul: 'Pelaksanaan Asesmen Nasional (ANBK) di Laboratorium Komputer Berlangsung Tertib & Lancar',
    ringkasan: 'Infrastruktur jaringan komputer mandiri memastikan 100% peserta mengerjakan asesmen tanpa kendala.',
    gambar_url: 'foto-labkom.jpg'
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

async function findNewsItem(slug) {
  if (!slug) return null;
  const search = slug.toString().toLowerCase().trim();

  // 1. Cek di dataset lokal terlebih dahulu (Instan)
  const local = STATIC_NEWS.find(n => 
    (n.slug && n.slug.toLowerCase() === search) ||
    (n.id && n.id.toLowerCase() === search) ||
    (n.alt_id && n.alt_id.toLowerCase() === search)
  );
  if (local) return local;

  // 2. Fetch dari Google Apps Script jika tidak ditemukan di data lokal
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(GAS_API_URL, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const json = await res.json();
      if (json && json.status === 'success' && Array.isArray(json.data)) {
        const found = json.data.find(n => 
          (n.slug && String(n.slug).toLowerCase() === search) ||
          (n.id && String(n.id).toLowerCase() === search)
        );
        if (found) return found;
      }
    }
  } catch (err) {
    console.warn('[OG Resolver] Google Apps Script fetch timed out or error:', err.message);
  }

  return null;
}

module.exports = async function handler(req, res) {
  const slug = req.query.slug || '';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'www.mtsyasua.sch.id';

  try {
    // Baca template berita.html
    const htmlPath = path.join(process.cwd(), 'berita.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

    const newsItem = await findNewsItem(slug);

    if (newsItem) {
      const canonicalSlug = newsItem.slug || slug;
      const title = `${newsItem.judul} — MTs YASUA Pilangwetan`;
      const description = newsItem.ringkasan || (newsItem.konten ? String(newsItem.konten).replace(/<[^>]*>/g, ' ').substring(0, 160).trim() : 'Kabar resmi madrasah MTs YASUA Pilangwetan, Kebonagung, Demak.');
      const image = resolveImageUrl(newsItem.gambar_url || newsItem.gambar, host);
      const url = `https://${host}/berita/${canonicalSlug}`;

      // Hapus metadata Open Graph & Twitter lama agar tidak duplikat
      html = html
        .replace(/<title>[\s\S]*?<\/title>/i, '')
        .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
        .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
        .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
        .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');

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

      html = html.replace(/<head>/i, `<head>\n${dynamicMetaTags}`);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (err) {
    console.error('[OG Serverless Error]:', err);
    // Fallback: kirim berita.html standar jika terjadi error tak terduga
    const fallbackPath = path.join(process.cwd(), 'berita.html');
    const fallbackHtml = fs.readFileSync(fallbackPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(fallbackHtml);
  }
};

