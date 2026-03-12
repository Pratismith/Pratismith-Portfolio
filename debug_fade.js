const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set viewport to mobile size
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.goto('http://localhost:8000/about.html', { waitUntil: 'networkidle0' });
    
    // Check if .fade-in elements are visible
    const fadeIns = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.fade-in')).map(el => {
            const rect = el.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(el);
            return {
                className: el.className,
                opacity: computedStyle.opacity,
                top: rect.top,
                bottom: rect.bottom,
                isVisible: el.classList.contains('visible')
            };
        });
    });
    
    console.log('About page fade-ins:', fadeIns);

    // Scroll down 1000px
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(1000); // Wait for transition

    const fadeInsAfterScroll = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.fade-in')).map(el => {
            return {
                className: el.className,
                isVisible: el.classList.contains('visible'),
                opacity: window.getComputedStyle(el).opacity
            };
        });
    });

    console.log('About page fade-ins after scroll:', fadeInsAfterScroll);

    await browser.close();
})();
