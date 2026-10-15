const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const ROOT_DIR = __dirname;

// Simple static HTTP server to serve files cleanly
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(ROOT_DIR, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp'
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

async function capture() {
  server.listen(PORT, async () => {
    console.log(`Server listening on http://localhost:${PORT}`);

    try {
      const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();

      // Ensure screenshots folder exists
      const screenshotsDir = path.join(ROOT_DIR, 'screenshots');
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }

      // 1. DESKTOP VIEWPORT SCREENSHOT (Hero & Navigation)
      console.log('Capturing Desktop Landing Viewport...');
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
      await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1500)); // Allow Tailwind & Fonts to settle

      await page.screenshot({
        path: path.join(screenshotsDir, 'desktop-landing.png')
      });

      // 2. DESKTOP PRODUCTS SECTION SCREENSHOT
      console.log('Capturing Desktop Products Section...');
      const productSection = await page.$('#products');
      if (productSection) {
        await productSection.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({
          path: path.join(screenshotsDir, 'desktop-products.png')
        });
      }

      // 3. DESKTOP CART SLIDE-OVER DRAWER SCREENSHOT
      console.log('Capturing Desktop Cart Drawer...');
      await page.click('#cartBtn');
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(screenshotsDir, 'desktop-cart-drawer.png')
      });
      // Close cart
      await page.click('#closeCartBtn');
      await new Promise(r => setTimeout(r, 400));

      // 4. DESKTOP FULL-PAGE SCREENSHOT
      console.log('Capturing Desktop Full Page...');
      await page.screenshot({
        path: path.join(screenshotsDir, 'desktop-fullpage.png'),
        fullPage: true
      });

      // 5. MOBILE VIEWPORT SCREENSHOT (iPhone 14 / Modern Smartphone 390x844)
      console.log('Capturing Mobile Landing Viewport...');
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
      await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1200));

      await page.screenshot({
        path: path.join(screenshotsDir, 'mobile-landing.png')
      });

      // 6. MOBILE PRODUCTS SECTION SCREENSHOT
      console.log('Capturing Mobile Products Section...');
      const mobileProductSection = await page.$('#products');
      if (mobileProductSection) {
        await mobileProductSection.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({
          path: path.join(screenshotsDir, 'mobile-products.png')
        });
      }

      // 7. MOBILE NAVIGATION MENU SCREENSHOT
      console.log('Capturing Mobile Menu Drawer...');
      await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 800));
      await page.click('#mobileMenuToggle');
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(screenshotsDir, 'mobile-menu.png')
      });

      console.log('All screenshots captured successfully!');
      await browser.close();
      server.close();
      process.exit(0);
    } catch (err) {
      console.error('Error during screenshot capture:', err);
      server.close();
      process.exit(1);
    }
  });
}

capture();

