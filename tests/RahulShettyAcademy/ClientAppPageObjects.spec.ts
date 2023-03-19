import test, { expect } from "@playwright/test";
import { DashboardPage } from "./PageObjects/DashboardPage";
import { LoginPage } from "./PageObjects/LoginPage";
import {CheckOutPage} from "./PageObjects/CheckOutPage";

test.only("ClientAppPageObjects", async ({ page }) => {

    const email = "adrianmajzel@gmail.com"
    const password = "Adrian0001"
    const productName = 'iphone 13 pro'
    const cardNumber = `4532 6472 2444 0374`
    const CVCode = `253`
    const cardHolderName = `Peter Mrkvicka`
    const expirationMonth = `05`
    const expirationYear = `23`
    const country= `India`
    const loginPage = new LoginPage(page)
    await loginPage.goTo();
    await loginPage.validLogin(email,password)

    const dashBoard = new DashboardPage(page)
    await dashBoard.addToCart(productName)

    const cartbtn = page.locator('[routerlink="/dashboard/cart"]')
    await cartbtn.click()
   
    await page.locator("div li").first().waitFor()
    const cartproduct = page.locator('h3:has-text(productName)').isVisible
    expect(cartproduct).toBeTruthy()
   
    const checkOutPage = new CheckOutPage(page)
    await checkOutPage.navigateToCheckOut()
    await checkOutPage.fillPaymentInfo(cardNumber, CVCode, cardHolderName, expirationMonth, expirationYear )
    await expect(page.locator(`.user__name [type="text"]`).first()).toHaveText(email)
    await checkOutPage.fillCountryInfo(country)

    await page.pause()

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