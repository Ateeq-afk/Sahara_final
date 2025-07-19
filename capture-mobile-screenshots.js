const puppeteer = require('puppeteer');
const path = require('path');

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // iPhone 12 Pro viewport
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });
  
  const screenshotsDir = path.join(__dirname, 'mobile-screenshots');
  
  try {
    // Homepage
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(screenshotsDir, 'homepage-mobile.png'), fullPage: true });
    
    // Services page
    await page.goto('http://localhost:3001/services', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(screenshotsDir, 'services-mobile.png'), fullPage: true });
    
    // Gallery page
    await page.goto('http://localhost:3001/gallery', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(screenshotsDir, 'gallery-mobile.png'), fullPage: true });
    
    // About page
    await page.goto('http://localhost:3001/about', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(screenshotsDir, 'about-mobile.png'), fullPage: true });
    
    console.log('Screenshots captured successfully!');
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();