import test, { expect } from "@playwright/test";

test.only("logInAndProductTitle", async ({ page }) => {

    const userName = page.locator(`#userEmail`)
    const userPassword = page.locator(`#userPassword`)
    const signInBtn = page.locator(`#login`)
    const products = page.locator(`.card-body`)

    await page.goto("https://rahulshettyacademy.com/client/")
    await userName.fill(`adrianmajzel@gmail.com`)
    await userPassword.fill(`Adrian0001`)
    await signInBtn.click()

    const productname = await page.locator(`.card-body b`).first().textContent()

    //await expect(page.locator(`.card-body b`).first()).toContainText(`zara coat 3`)

    const countproduct = await products.count()

    for (let i = 0; i < countproduct; ++i) {
        if (await products.nth(i).locator(`b`).textContent() === productname) {
            await products.nth(i).locator(`text= Add To Cart`).click()
            break
        }
    }

    const cartbtn = page.locator(`[routerlink="/dashboard/cart"]`)
    await cartbtn.click()

    await page.locator("div li").first().waitFor()

    const cartproduct = page.locator('h3:has-text("zara coat 3")').isVisible
    expect(cartproduct).toBeTruthy()

    await page.locator(`text=Checkout`).click()

    await page.locator(`div.field .input.txt.text-validated`).fill(`4532 6472 2444 0374`)
    await page.locator(`input[type="text"]`).nth(1).fill(`253`)
    await page.locator(`div.field .input.txt`).nth(2).fill(`Peter Mrkvička`)
    await page.locator(`select.input.ddl`).first().selectOption(`05`)
    await page.locator(`select.input.ddl`).last().selectOption(`20`)

    page.locator(`[placeholder="Select Country"]`).type(`Ind`, { delay: 100 })

    const countrydropdown = page.locator(`.ta-results`)
    await countrydropdown.waitFor()
    const countriescount = await countrydropdown.locator("button").count()

    for (let i = 0; i < countriescount; ++i) {
        const text = await countrydropdown.locator("button").nth(i).textContent()
        if (text === ` India`) {
            await countrydropdown.locator("button").nth(i).click()
            break
        }

    }

    await expect(page.locator(`.user__name [type="text"]`).first()).toHaveText(`adrianmajzel@gmail.com`)
    await page.locator(`.actions .btnn.action__submit`).click()

    await expect(page.locator(`.hero-primary`)).toHaveText(` Thankyou for the order. `)

    const ordernumber = await page.locator(`td.em-spacer-1 .ng-star-inserted`).innerText()
    console.log(ordernumber);
    const ordernumber1 = ordernumber.split(` `)
    console.log(ordernumber1)
    const ordernumber2 = ordernumber1[1]
    console.log(ordernumber2)
    //const ordernumber3 = ordernumber2.splice(0,1)
    //console.log(ordernumber3)

    await page.locator(`[routerlink="/dashboard/myorders"].btn`).click()

    const orderlist = page.locator(`tbody .ng-star-inserted`)
    await orderlist.first().waitFor()
    const orderlistcount = await orderlist.count()

    for (let i = 0; i < orderlistcount; ++i) {

        const orderlistnumber = await orderlist.locator(`[scope="row"]`).nth(i).textContent()
        if (orderlistnumber?.includes(ordernumber2)) {
            await orderlist.locator(`.btn-primary`).nth(i).click()
            break
        }
    }

    await page.pause()

})