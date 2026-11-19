# Free ZIP Tool

[Free ZIP Tool](https://free-zip-tool.web-free.site/) — unzip archives and create new ZIP files in your browser. Nothing is uploaded.

Built on [unzip-files-local](https://github.com/turhe123/unzip-files-local) (MIT, Or Davidai Bachar) with **fflate** 0.8.2 for compression. Part of [web-free.site](https://web-free.site/).

## Features

- Open local `.zip` files, browse folders, preview text and images, download or repack selections
- **Create ZIP** tab: add files or a folder, download a new archive
- Runs client-side; Adsterra ads and Cloudflare Web Analytics on the public site

## Develop

```bash
python3 -m http.server 8080
# open http://127.0.0.1:8080/

npm i -D @playwright/test
npx playwright install chromium
bash scripts/test.sh
```

## Deploy

Configured for Cloudflare Workers static assets (`wrangler.toml`). Deployment is handled off-repo; do not commit `account_id`.