#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const tail = fs.readFileSync(path.join(root, 'partials/wf-more-tools.html'), 'utf8');
const site = 'https://free-zip-tool.web-free.site';

function page({ title, description, slug, canonical, body, extraLd }) {
  const canon = canonical || `${site}${slug}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="color-scheme" content="light dark">
  <link rel="canonical" href="${canon}">
  <link rel="alternate" hreflang="en" href="${canon}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canon}">
  <meta property="og:site_name" content="Free ZIP Tool">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"WebPage","name":${JSON.stringify(title)},"description":${JSON.stringify(description)},"url":${JSON.stringify(canon)},"isPartOf":{"@type":"WebSite","name":"Free ZIP Tool","url":${JSON.stringify(site)}}}
  </script>
  ${extraLd || ''}
<script src="https://ref.web-free.site/r.js" defer></script>
</head>
<body class="legal-page">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="/"><img class="brand__icon" src="/icon.svg" alt="" width="28" height="28"><span class="brand__name">Free ZIP Tool</span></a>
      <nav class="site-nav" aria-label="Page">
        <a href="/">Tool</a>
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  </header>
  <main id="main" class="container legal-main">
    <article class="legal-article">
      ${body}
    </article>
  </main>
  <footer class="site-footer">
    <div class="container">
      <p class="site-footer__links">
        <a href="/about">About</a> ·
        <a href="/privacy">Privacy</a> ·
        <a href="/terms">Terms</a> ·
        <a href="/contact">Contact</a> ·
        <a href="https://web-free.site/" rel="noopener">web-free.site</a> ·
        <a href="https://github.com/turhe123/unzip-files-local" rel="noopener">Upstream source (MIT)</a>
      </p>
      <p class="site-footer__copy">© Free ZIP Tool · MIT License (app) · fflate 0.8.2 (MIT)</p>
    </div>
  </footer>
  <script data-cfasync="false" src="https://abscloud.org/1/484c067e5c8fb4dc53c0baed3225291e"></script>
  <script data-cfasync="false" src="https://bauval.org/14/19cc84e78f2c4b43608bb40cd8aad758"></script>
  <script src="/wf-ads.js" defer></script>
  ${tail}
</body>
</html>`;
}

const pages = [
  {
    slug: '/about',
    title: 'About Free ZIP Tool — private browser ZIP unzip & create',
    description: 'Free ZIP Tool runs in your browser to open archives or build new ZIP files. Based on unzip-files-local (MIT) and fflate. Nothing is uploaded.',
    body: `<h1>About Free ZIP Tool</h1>
<p>Free ZIP Tool helps you open ZIP archives and create new ones entirely in your web browser. Your files are read on your device with JavaScript; they are never uploaded to a server.</p>
<h2>Open-source base</h2>
<p>This site is built on <a href="https://github.com/turhe123/unzip-files-local" rel="noopener">unzip-files-local</a> by <strong>Or Davidai Bachar</strong>, licensed under the <a href="https://opensource.org/licenses/MIT" rel="noopener">MIT License</a>. We kept the MIT <code>LICENSE</code> file and thank Or for the careful ZIP parsing, previews, and repack feature.</p>
<h2>Compression library</h2>
<p>ZIP reading and writing uses <strong>fflate</strong> 0.8.2 (MIT, Copyright (c) 2023 Arjun Barrett), vendored in <code>vendor/fflate/</code> with its own LICENSE.</p>
<h2>Part of web-free.site</h2>
<p>Free ZIP Tool is one of the free utilities on <a href="https://web-free.site/">web-free.site</a> — browser tools with no sign-up and no server-side file access.</p>`,
  },
  {
    slug: '/privacy',
    title: 'Privacy Policy — Free ZIP Tool',
    description: 'Privacy policy for Free ZIP Tool: client-side ZIP processing, local files only, Cloudflare Web Analytics, and Adsterra ads. No archive uploads.',
    body: `<h1>Privacy Policy</h1>
<p><strong>Last updated:</strong> November 2026</p>
<p>Free ZIP Tool processes ZIP files locally in your browser. We do not receive your archives or extracted files.</p>
<h2>Files you open or zip</h2>
<p>When you select, drop, or folder-pick files, they stay on your device. Decompression and compression run with JavaScript in the page. No API keys or accounts are required for the tool itself.</p>
<h2>Analytics</h2>
<p>We use Cloudflare Web Analytics (cookieless) to understand aggregate traffic. It does not receive file names or contents.</p>
<h2>Advertising</h2>
<p>We display Adsterra advertisements. Ad networks may set their own cookies or identifiers when you interact with ads. See Adsterra's policies for details.</p>
<h2>Contact</h2>
<p>Questions: see our <a href="/contact">contact page</a>.</p>`,
  },
  {
    slug: '/terms',
    title: 'Terms of Use — Free ZIP Tool',
    description: 'Terms of use for Free ZIP Tool: free browser utility, no warranty, your responsibility for file contents, and acceptable use.',
    body: `<h1>Terms of Use</h1>
<p><strong>Last updated:</strong> November 2026</p>
<p>By using Free ZIP Tool you agree to these terms.</p>
<h2>The service</h2>
<p>Free ZIP Tool is provided free of charge as a browser-based utility to open and create ZIP files. It is offered “as is” without warranties of any kind.</p>
<h2>Your content</h2>
<p>You are responsible for the files you open, create, or download. Do not use the tool for unlawful purposes or to distribute malware.</p>
<h2>Limitations</h2>
<p>Browser memory limits apply. Very large archives, password-protected ZIPs, and non-ZIP formats may not work. See the on-page FAQ for details.</p>
<h2>Changes</h2>
<p>We may update these terms or the tool at any time. Continued use means you accept the updated terms.</p>`,
  },
  {
    slug: '/contact',
    title: 'Contact — Free ZIP Tool',
    description: 'How to report bugs or suggest improvements for Free ZIP Tool on web-free.site.',
    body: `<h1>Contact</h1>
<p>Free ZIP Tool is operated as part of <a href="https://web-free.site/">web-free.site</a>.</p>
<p>To report a bug in the open-source ZIP engine, open an issue on the upstream repository: <a href="https://github.com/turhe123/unzip-files-local/issues" rel="noopener">turhe123/unzip-files-local issues</a>.</p>
<p>For site or deployment questions related to the web-free.site hub, use the contact options listed on <a href="https://web-free.site/">web-free.site</a>.</p>`,
  },
  {
    slug: '/how-to-unzip-a-file-in-the-browser',
    title: 'How to Unzip a File in the Browser — Free ZIP Tool',
    description: 'Step-by-step guide to open a ZIP file online without uploading it: drop the archive, browse folders, preview files, and download what you need.',
    body: `<h1>How to unzip a file in the browser</h1>
<p>You can open a ZIP archive in Chrome, Edge, Firefox, or Safari without installing software and without uploading the file to a server.</p>
<ol class="steps">
<li><strong>Open Free ZIP Tool</strong> and stay on the <em>Unzip</em> tab.</li>
<li><strong>Drop your .zip file</strong> on the highlighted area or choose it from your device.</li>
<li><strong>Browse folders</strong> in the file tree, use the name filter, and preview text or images before saving.</li>
<li><strong>Download</strong> one file, a selection, everything as separate files, or repack a selection into a smaller ZIP.</li>
</ol>
<p>Nothing leaves your computer during these steps. If you see an error, the file may be corrupt, password-protected, or not a ZIP at all.</p>
<p><a href="/">← Back to Free ZIP Tool</a></p>`,
  },
  {
    slug: '/how-to-create-a-zip-file-in-the-browser',
    title: 'How to Create a ZIP File in the Browser — Free ZIP Tool',
    description: 'Create a ZIP archive from local files or a folder in your browser. Pick files, compress with fflate, and download the .zip — no upload.',
    body: `<h1>How to create a ZIP file in the browser</h1>
<p>Free ZIP Tool can build a new <code>.zip</code> from files on your device.</p>
<ol class="steps">
<li>On the home page, switch to the <strong>Create ZIP</strong> tab.</li>
<li>Add files with <strong>Choose files</strong> or add a whole folder with <strong>Choose folder</strong> (where your browser supports it).</li>
<li>Review the list, remove anything you do not want, and set the download name if you like.</li>
<li>Click <strong>Download ZIP</strong>. The archive is built locally and saved to your downloads folder.</li>
</ol>
<p>Photos and already-compressed formats are stored efficiently. For mixed folders, paths inside the ZIP match your folder structure.</p>
<p><a href="/">← Back to Free ZIP Tool</a></p>`,
  },
];

for (const p of pages) {
  const dir = path.join(root, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(p));
  console.log('wrote', p.slug);
}

const urls = [
  '/',
  ...pages.map((p) => p.slug),
];
const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site}${u === '/' ? '/' : u}</loc><changefreq>monthly</changefreq><priority>${u === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sm);
console.log('wrote sitemap.xml');