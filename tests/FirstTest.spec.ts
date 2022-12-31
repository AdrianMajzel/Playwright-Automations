import test, { expect } from "@playwright/test";
import { captchasumlocator, emailadressfieldlocator, messagefieldlocator, namefieldlocator, submitbuttonlocator, sumfieldlocator } from "./locators";

test("FirstTest", async ({ page }) => {

    await page.goto("https://ultimateqa.com/complicated-page")

    const loginbutton = page.locator(`xpath=//*[@id="post-579"]/div/div[1]/div/div/div[7]/div[2]/div[2]/div[2]/form/p[4]/button`)

    await expect(loginbutton).toHaveAttribute("class", "et_pb_newsletter_button et_pb_button")

    await page.locator(`xpath=//*[@id="post-579"]/div/div[1]/div/div/div[7]/div[2]/div[2]/div[2]/form/p[4]/button`).click()



    //await expect(loginbutton).toHaveAttribute("class", "et_pb_newsletter_button et_pb_button" )
})

//<button type="submit" name="et_builder_submit_button" class="et_pb_newsletter_button et_pb_button">Login</button>


test("secondtest", async ({ page }) => {

    await page.goto("https://ultimateqa.com/complicated-page")

    page.locator(`xpath=//*[@id="et_pb_contact_form_0"]/div[2]/form/div/button`).scrollIntoViewIfNeeded()

    const namefield = page.locator(namefieldlocator)
    const emailadressfield = page.locator(emailadressfieldlocator)
    const messagefield = page.locator(messagefieldlocator)
    const sumfield = page.locator(sumfieldlocator)
    const captchasum = page.locator(captchasumlocator)
    const sumtext = (await captchasum.innerText()).valueOf()
    const submitbutton = page.locator(submitbuttonlocator)

    await namefield.type("Adrian")
    await emailadressfield.type("adrianmajzel@gmail.com")
    await messagefield.type("Bla bla blaaa")
    const arraycaptcha = sumtext.split(" ")
    arraycaptcha.forEach(string1 => {
        
        console.log(string1)
})

if(arraycaptcha[1] == "+"){
    sumfield.type(`${Number(arraycaptcha[0]) + Number(arraycaptcha[2])}`)
}
else{
    sumfield.type(`${Number(arraycaptcha[0]) - Number(arraycaptcha[2])}`)
}

await submitbutton.click()


})