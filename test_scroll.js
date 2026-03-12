const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    
    await page.goto('http://localhost:8000/about.html', { waitUntil: 'networkidle0' });
    
    // Log initial scroll
    console.log('Initial scrollY:', await page.evaluate(() => window.scrollY));
    
    // Attempt scroll
    await page.evaluate(() => window.scrollTo(0, 1000));
    // alternative manual scroll
    await page.mouse.wheel({ deltaY: 1000 });
    await new Promise(r => setTimeout(r, 1000));
    
    console.log('After scroll, scrollY:', await page.evaluate(() => window.scrollY));

    await browser.close();
})();
