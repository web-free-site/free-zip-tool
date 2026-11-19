# Cursor agent brief — free-zip-tool

Target: https://free-zip-tool.web-free.site
Repo name (wrangler `name`): `free-zip-tool`
English name: "Free ZIP Tool". English primary.

Follow every rule in the attached `agent-brief-common.md`, with one SEO override below. Do not write the tool from scratch. Do not deploy. Do not switch models. Push to `main` of this repo when the work is done.

**SEO / language override (takes precedence over the common brief):** do **not** add a French or Swahili landing page, UI translation, or how-to pages. How-to and legal pages are English only. You may omit `hreflang` fr.

The site must both **unzip** an archive in the browser and **create a ZIP** from local files. Nothing is uploaded.

## Recommended base (use this)

- Repo: https://github.com/turhe123/unzip-files-local
- License: MIT (keep `LICENSE`, credit Or Davidai Bachar in the footer and on `/about`). Also keep and credit **fflate** 0.8.2 (MIT, Copyright (c) 2023 Arjun Barrett) already vendored in `vendor/fflate/` with its `LICENSE` and `VENDOR.json`.
- Stars: 0
- Last commit: 21 Oct 2026, 16:40 CAT (Africa/Kigali) — `aacad07` on `main`
- Official demo: `https://turhe123.github.io/unzip-files-local/`
- Stack: vanilla HTML/CSS/JS, no install, no build, no server. ZIP logic is **fflate** (not JSZip), with a Web Worker for large entries, CRC-32 checks, nested ZIP support, CP437/UTF-8 file names, and a file tree with preview (text and images). Already has `index.html`, `app.js`, `worker.js`, `sw.js`, `robots.txt`, `sitemap.xml`, and Playwright tests (`tests/smoke.spec.js`, `tests/factory.spec.js`).
- Coverage already in the base: open a local ZIP, browse folders, filter by name, preview, save one file, save selected files, **repack the selection as one new ZIP**, save all, zip-bomb / password / split-archive warnings. It does **not** yet start from loose files to create a brand-new archive — add that mode (see below).
- Cloudflare: yes — static assets / Workers with assets. Treat the repo root as the site (you may move files into `public/` if that keeps wrangler simpler).
- Verification (this box, 19 Nov 2026, CAT): cloned; `LICENSE` is a real MIT file (Copyright (c) 2026 Or Davidai Bachar). `vendor/fflate/LICENSE` is MIT (fflate 0.8.2). `index.html` currently loads GoatCounter (`turhe123.goatcounter.com`) — **remove it** and use only the Cloudflare Web Analytics tag below.
- Local clone already on the box: `/workspace/repo-candidates/batch-2026-11-19/unzip-files-local`
- Why this one: MIT with a real `LICENSE` file, a complete static website (not a library), careful ZIP parsing, tests, and no framework. The engine can already write a ZIP, so adding a “create ZIP from files” mode is a small, natural extension.

## Backup (MIT; can also create a new ZIP from scratch)

- Repo: https://github.com/dinoosauro/Unzipify
- License: MIT (LICENSE file, Copyright (c) 2023 Dinoosauro)
- Stars: 2
- Last commit: 5 Oct 2023, 21:39 CAT (Africa/Kigali) — `d01bfea` on `main`
- Official demo: `https://dinoosauro.github.io/Unzipify/`
- Stack: static JS (JSZip), can open a ZIP or start a new one, search, preview, download. Older and less careful about ZIP edge cases than the recommended base. If you use it, still prerender the how-to and legal pages, and credit JSZip.
- Local clone: `/workspace/repo-candidates/batch-2026-11-19/Unzipify`

`devxashish/unzip-web` (MIT, Copyright (c) 2024 devxashish, React + Vite + JSZip, demo `https://unzip-web.netlify.app`, last commit 14 Jul 2026 — `f4a1c68`) is a usable unzip-only SPA. Prefer it only if the two bases above fail; you would still have to add ZIP creation and prerender every public page.

## Do not use these

- Libraries alone (`101arrowz/fflate`, `Touffy/client-zip`, `Stuk/jszip`) — they are not a complete website.
- Tools that upload the archive to a server, or that only handle RAR/7z (those formats need other, often non-MIT, codecs).

## What to build on top of turhe123/unzip-files-local

1. Import the base into this repo, keep both MIT licenses (the app and fflate), and credit Or Davidai Bachar and fflate. Omit GitHub Actions workflows if any (the token lacks the `workflow` scope — do not restore them). **Remove GoatCounter** and any other third-party analytics besides the Cloudflare tag below. You may keep the offline service worker if it does not break ads or prerendered pages; otherwise drop it.
2. Rebrand to "Free ZIP Tool". English primary. No FR/SW translations of the site.
3. Keep unzipping 100% client-side. No APIs, no keys, no accounts, no uploads.
4. **Add a Create ZIP mode** (required): the user selects or drops one or more local files (folders via `webkitdirectory` are welcome), sees a list, and downloads a `.zip` built in the browser with fflate. Keep the existing “repack selected entries as one ZIP” action in the unzip view.
5. Adsterra only, never AdSense. Use **only** the codes in `/workspace/ads-free-zip-tool.md` (that file will be filled in before you start; do not invent codes). Follow the `free-invoice-generator` pattern: all 10 units, banners in isolated iframes, `atOptions {key, format:'iframe', height, width, params:{}}`, `src https://bauval.org/22/<key>`, `public/ads.json`. Never set COEP/COOP headers. Ads must not break open, preview, or download.
6. SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical, OG; JSON-LD (WebApplication + FAQPage); `sitemap.xml` and `robots.txt` for `https://free-zip-tool.web-free.site` (replace the upstream sitemap/robots host); English how-to pages, at least `/how-to-unzip-a-file-in-the-browser` and `/how-to-create-a-zip-file-in-the-browser`; prerendered `/privacy`, `/terms`, `/about`, `/contact`. Canonicals must be `https://free-zip-tool.web-free.site`. No French landing page. If you keep a single HTML file as the app shell, still prerender the how-to and legal pages as real HTML files.
7. Footer: credit the upstream project and fflate, and add a link back to the hub `https://web-free.site`.
8. On every prerendered HTML page, before `</body>`, add:
   - The same **"More free tools"** block used on the other web-free.site tools (`id="wf-more-tools"`). Include a "Guides on this site" column for the how-to pages. List every current hub tool, plus the four other sites in this batch. Show **Free ZIP Tool** as bold text, not a self-link.
     - **Documents & writing:** Free Word Counter, Free PDF Converter, Free CV Maker, Free Invoice Generator, Free Typing Test, Free Signature Generator, and Free Email Signature Generator (`https://free-email-signature-generator.web-free.site/`).
     - **Images & codes:** Free QR Code Creator, Free Image Resizer, Free Image to Text, Free Background Remover, Free Image Compressor.
     - **Calculators & currency:** Free Online Calculator, Free Currency Converter, Free Unit Converter, Free Loan Calculator, Free Age Calculator, Free Percentage Calculator, Free BMI Calculator.
     - **Text & SEO:** Free AI Humanizer, Free SEO Generator, Free Backlink Generator, Free JSON Formatter, Free Text to Speech, Free Speech to Text, and Free Diff Checker (`https://free-diff-checker.web-free.site/`).
     - **Audio & video:** Free Video to MP3 Converter, Free MP3 Cutter (`https://free-mp3-cutter.web-free.site/`), and Free Screen Recorder (`https://free-screen-recorder.web-free.site/`).
     - **Files:** **Free ZIP Tool**.
     - **Test data:** Free Fake Address Generator, Free Fake Name Generator.
     - **Security & passwords:** Free Password Generator.
   - The same Cloudflare Web Analytics tag used on the other sites: `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->`
9. `wrangler.toml`: `name = "free-zip-tool"`, `[assets]` pointing at the static output. Use `html_handling = "auto-trailing-slash"` and `not_found_handling = "none"`. Custom domain `free-zip-tool.web-free.site`. **Do not put `account_id` (or API tokens) in the committed file.** **Do not deploy.** Push to this repo only. Deploy happens from Gentil's box.
10. Test: open a small ZIP, browse the tree, preview a text or image file, download one file, download a repacked selection as a ZIP and confirm it opens; create a new ZIP from two or three loose files and confirm it opens; try a non-ZIP file and a clearly invalid archive; check mobile at 390px; confirm nothing is uploaded; fix bugs. If you can run the Playwright tests (`bash scripts/test.sh`), do so and report the result. Critique your own result and fix issues.
11. Push everything to `main`. Final report: base repo + license, fflate credit, pages, tests and results, remaining caveats, commit hash.

## Adsterra ad codes

Read `/workspace/ads-free-zip-tool.md` and use only the codes in that file. It will be filled in separately, before this agent is launched. Do not invent Adsterra keys, URLs, or site IDs.


---
NOTE: any /workspace/... box path mentioned above is NOT accessible to you; everything you need is inline below. Clone the base repo from GitHub yourself.

# COMMON RULES (contents of agent-brief-common.md)
COMMON RULES (from Gentil, mandatory):
- Start from an existing, usable open-source repository: search GitHub, then compare stars, activity, license (MIT/Apache/BSD preferred; avoid AGPL/GPL unless nothing else fits) and code quality. Import its code into this repo, keep its LICENSE, and credit it in the footer and on /about.
- Do NOT write the tool from scratch. If no suitable open-source base exists, STOP before coding and report the 2-3 best candidates and why they fail. Gentil must approve any from-scratch work, and he only allows it for one or two simple pages.
- Keep the model you were launched with. Do not switch models.
- Must be hostable on Cloudflare Workers with static assets (free plan). No paid APIs, no server costs, no API keys. Client-side processing preferred.
- Monetization: Adsterra only, never AdSense. The real codes for this site are in the attached adsterra-new-codes.md, in this site's section (use only that section). Integrate all 10 units following the free-invoice-generator pattern: Popunder and Social Bar in the HTML; 728x90 at the top; sidebar 160x600 and 160x300; mid-page 728x90, 468x60 and Native; 300x250; sticky 320x50 on mobile; Smartlink as a discreet link. Banners go in isolated iframes with atOptions {key, format:'iframe', height, width, params:{}} and src https://bauval.org/22/<key>. Also write public/ads.json with all the codes. Never set COEP/COOP headers. Ads must not break the tool.
- SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical and OG tags; JSON-LD (WebApplication + FAQPage); hreflang en/fr; sitemap.xml and robots.txt using the site's own URL; a long-tail keyword page or two; FAQ and how-to content; /privacy, /terms, /about and /contact pages (prerendered); plus a French landing page.
- Name: "Free <Tool>". English primary.
- Add wrangler.toml with name = <repo name> and [assets] pointing to the build output. Do NOT deploy: Gentil's box deploys it.
- Test: build, run it locally, exercise the main feature in a browser, check mobile at 390px, and fix bugs. Critique your own result and fix the issues you find.
- Push everything to main of this repo.
- Final report: the base repo and its license, the pages, the tests and their results, the remaining caveats, and the commit hash.


# ADSTERRA CODES FOR THIS SITE (use only these)
Code formats (KEY = the 32-char hash):
- Popunder: <script data-cfasync="false" src="https://abscloud.org/1/KEY"></script>
- Native Banner: <script async="async" data-cfasync="false" src="https://bauval.org/21/KEY"></script><div id="container-KEY"></div>
- Social Bar: <script data-cfasync="false" src="https://bauval.org/14/KEY"></script>
- Banner WxH: <script>atOptions = {'key':'KEY','format':'iframe','height':H,'width':W,'params':{}};</script><script src="https://bauval.org/22/KEY"></script>
- Smartlink URL: https://araplhn.org/4/KEY

## free-zip-tool.web-free.site — site ID 6213250
Popunder 484c067e5c8fb4dc53c0baed3225291e
Native Banner b6b3531f05aa5a04d18379ace3976697
Smartlink cc9e234aeed7ff3bd494d10b593d2812
Social Bar 19cc84e78f2c4b43608bb40cd8aad758
468x60 202df9cc3ae88707864c2ef59f3655f6
160x300 5cc0d06177f60b5d7ae91fe293c9d35c
320x50 d123e9436bc0ed70c0e3670d916600fc
300x250 09aff4dc207ff2c7e8927eff8c3ffdd0
160x600 db313f897bcef6bb51f6b32b5b76a8f5
728x90 ea3cb6ef41ec5d71886d994a0f297b17

## 