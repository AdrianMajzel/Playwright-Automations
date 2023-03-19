class LoginPage {

    constructor(page) {
        this.page = page
        this.signInBtn = page.locator(`#login`)
        this.userName = page.locator(`#userEmail`)
        this.userPassword = page.locator(`#userPassword`)
        this.allProducts = page.locator(`.card-body`)

    }

    async goTo()
    {
    await this.page.goto("https://rahulshettyacademy.com/client/")
    }

    async validLogin(email, password)
{
    await this.userName.fill(email)
    await this.userPassword.fill(password)
    await this.signInBtn.click()
}
}
module.exports = {LoginPage}