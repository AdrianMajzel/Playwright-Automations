import test, { expect } from "@playwright/test";
import {
    cookieAcceptButtonLocator,
    devicePlusButtonLocator,
    yearMinusButtonLocator,
    priceDataLocator,
    kupitButtonLocator,
    kosikButtonLocator,
    doKosikaButtonLocator,
} from "./Eset-Locators"

test.beforeEach(async ({ page }) => {

    await page.goto("https://www.eset.com/sk/")
})

//Test sa skladá z menších testovacích dielov, aby sme sa vyhli interdepedence logických častí
test("testovanie_pocitadla", async ({ page }) => {

    //Akceptovanie cookies
    const cookieAcceptButton = page.locator(cookieAcceptButtonLocator)

    await cookieAcceptButton.click()

    //Pridanie zariadení a uberanie rokov na počítadlách 

    await page.click(devicePlusButtonLocator)
    await page.click(devicePlusButtonLocator)
    await page.click(yearMinusButtonLocator)

    await expect(page.locator(priceDataLocator)).toHaveText('79,90€')
})

test("testovanie_vyberu_produktu", async ({ page }) => {

    //Test tlačidla "Kúpiť" a overenie navigácie do košíka a presmerovanie na URL "https://obchod.eset.com/Pages/Cart.aspx"
    const kosikButton = page.locator(kosikButtonLocator)

    await page.click(kupitButtonLocator)
    await kosikButton.hover()

    await page.waitForSelector(doKosikaButtonLocator, { timeout: 6000 })
    await page.click(doKosikaButtonLocator)

    await expect(page).toHaveURL(`https://obchod.eset.com/Pages/Cart.aspx`)
})