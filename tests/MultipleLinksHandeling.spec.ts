import { test, expect } from '@playwright/test';




test('Multiple Links Handling',async ({ page }) => {
await page.goto('https://the-internet.herokuapp.com');

    let links = page.getByRole('link');
    let linkCount = await links.count();
    
    for(let i = 0; i < linkCount; i++) 
    {
        let link = links.nth(i);
        let linkText = await link.textContent();
        let linkHref = await link.getAttribute('href');
        if(!linkHref?.includes('http')) {
       // console.log(`Link ${i + 1}: ${linkText} - ${'https://the-internet.herokuapp.com' + linkHref}`);
        await page.goto('https://the-internet.herokuapp.com' + linkHref)
        await page.waitForLoadState()
        await page.keyboard.press('Escape')
        }
        else
        {
        //    console.log(`Link ${i + 1}: ${linkText} - ${linkHref}`);
            await page.goto(linkHref)
            await page.waitForLoadState()
        }
        console.log(await page.title())
        
        await page.goto('https://the-internet.herokuapp.com');
    }
})