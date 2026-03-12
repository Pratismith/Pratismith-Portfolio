const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set viewport to mobile size
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    
    // Capture about.html
    await page.goto('http://localhost:8000/about.html', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'about_mobile.png', fullPage: true });
    
    // Capture projects.html
    await page.goto('http://localhost:8000/projects.html', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'projects_mobile.png', fullPage: true });

    // Capture index.html for comparison
    await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'index_mobile.png', fullPage: true });

    await browser.close();
    console.log('Screenshots captured: about_mobile.png, projects_mobile.png, index_mobile.png');
})();
