import { test, expect } from '@playwright/test';


test('',async ({page})=>{

   await page.goto("https://the-internet.herokuapp.com/")
  let bool= await page.getByRole('link', {name:'A/B Testing'}).isVisible()
    bool=false
console.log(bool)
     expect(await page.getByRole('heading',{name:'Welcome to the-internet'}).textContent(),"Welcome to the-intererr")

})