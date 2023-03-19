class CheckOutPage {

    constructor(page) {
        this.page = page
        this.checkoutbtn = page.locator(`text=Checkout`)
        this.cardNumberField = page.locator(`div.field .input.txt.text-validated`)
        this.CVCodeField = page.locator(`xpath=/html/body/app-root/app-order/section/div/div/div[2]/div/div/div[3]/div[1]/form/div/div[2]/div[2]/input`)
        this.cardHolderNameField = page.locator(`div.field .input.txt`)
        this.expirationDateField = page.locator(`select.input.ddl`)
        this.selectCountryField = page.locator(`[placeholder="Select Country"]`)
        this.countryDropdown = page.locator(`.ta-results`)

    }

    async navigateToCheckOut() {

        await this.checkoutbtn.click()
    }

    async fillPaymentInfo(cardNumber, CVCode, cardHolderName, expirationMonth, expirationYear) {
        await this.cardNumberField.fill(cardNumber)
        await this.CVCodeField/*.locator(`.row .field.small input.input.txt`)*/.fill(CVCode)
        await this.cardHolderNameField.nth(2).fill(cardHolderName)
        await this.expirationDateField.nth(0).selectOption(expirationMonth)
        await this.expirationDateField.nth(1).selectOption(expirationYear)
    }

    async fillCountryInfo(country) {
        await this.selectCountryField.type(country, { delay: 100 })
        await this.countryDropdown.waitFor()

        const countriesCount = await this.countryDropdown.locator("button").count()

        for (let i = 0; i < countriesCount; ++i) {
            const text = await this.countryDropdown.locator("button").nth(i).textContent()
            if (text === ` India`) {
                await this.countryDropdown.locator("button").nth(i).click()
                break
            }
    
        }


    }






}
module.exports = { CheckOutPage }