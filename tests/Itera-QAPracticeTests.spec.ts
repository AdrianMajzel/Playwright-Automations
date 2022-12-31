import { test, expect } from '@playwright/test';
import { namefieldlocator, mobilenumberfieldlocator, emailaddressfieldlocator, passwordfieldlocator, addressfieldlocator, submitbuttonlocator, gendermalecheckboxlocator, tuesdaycheckboxlocator, fridaycheckboxlocator, traveldropdownmenulocator, dropdownnorwaylocator, } from "./Itera-QALocators"

test("Itera-QAPracticeTest1-Text", async ({ page }) => {

    const namefield = page.locator(namefieldlocator)
    const mobilenumberfield = page.locator(mobilenumberfieldlocator)
    const emailaddressfield = page.locator(emailaddressfieldlocator)
    const passwordfield = page.locator(passwordfieldlocator)
    const addressfield = page.locator(addressfieldlocator)
    const submitbutton = page.locator(submitbuttonlocator)


    await page.goto("https://itera-qa.azurewebsites.net/home/automation")

    await namefield.type("Maťo")
    await mobilenumberfield.type("+421903654385")
    await emailaddressfield.type("mrkvicka.mato@email.sk")
    await passwordfield.type("IamDume")
    await addressfield.type("Špatná 358, Hlohovec")

    await submitbutton.click()


    //await page.waitForSelector(`xpath=//*[@id="global_header"]/div/div[2]/div[2]/div/a[5]`,{timeout:6000})

})

test("Itera-QAPracticeTest2-CheckBox", async ({ page }) => {

    const gendermalecheckbox = page.locator(gendermalecheckboxlocator)
    const tuesdaycheckbox = page.locator(tuesdaycheckboxlocator)
    const fridaycheckbox = page.locator(fridaycheckboxlocator)

    await page.goto("https://itera-qa.azurewebsites.net/home/automation")

    await gendermalecheckbox.click()
    await tuesdaycheckbox.click()
    await fridaycheckbox.click()


})

test("Itera-QAPracticeTest3-DropDown", async ({ page }) => {

    const traveldropdownmenu = page.locator(traveldropdownmenulocator)
    const dropdownnorway = page.locator(dropdownnorwaylocator)

    await page.goto("https://itera-qa.azurewebsites.net/home/automation")

    //traveldropdownmenu.scrollIntoViewIfNeeded()

    await traveldropdownmenu.selectOption(`1`)


})