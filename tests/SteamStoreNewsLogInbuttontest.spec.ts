import test, { expect } from "@playwright/test";

import { steamobchodbuttonlocator, steamobchodnovinkybuttonlocator, steamobchodnovinkyprihlasitsebuttonlocator } from "./locators";


test("SteamStoreNewsLogInButtonTest", async ({ page }) => {

    const steamobchodbutton = page.locator(steamobchodbuttonlocator)
    const steamobchodnovinkybutton = page.locator(steamobchodnovinkybuttonlocator)
    const steamobchodnovinkyprihlasitsebutton = page.locator(steamobchodnovinkyprihlasitsebuttonlocator)


    await page.goto("https://store.steampowered.com/")

    await steamobchodbutton.hover();

    
    await page.waitForSelector(`xpath=//*[@id="global_header"]/div/div[2]/div[2]/div/a[5]`,{timeout:6000})
    
    
    
    await steamobchodnovinkybutton.click()

    await steamobchodnovinkyprihlasitsebutton.click()

}
)