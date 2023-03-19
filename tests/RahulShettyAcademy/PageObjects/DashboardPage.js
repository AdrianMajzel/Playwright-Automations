class DashboardPage {

    constructor(page) {
        this.page = page
        this.cartbtn = page.locator('[routerlink="/dashboard/cart"]')
        this.productName = page.locator(`b:has-text("adidas original")`)
        this.allProducts = page.locator(".card-body")

    }

    async addToCart(productName) {
        await this.allProducts.first().waitFor()
        const countAllProduct = await this.allProducts.count()
        for (let i = 0; i < countAllProduct; ++i) {
            if (await this.allProducts.nth(i).locator("b").textContent() === productName) {
                await this.allProducts.nth(i).locator("text= Add To Cart").click()
                break
            }
        }
        /*await this.page.waitForLoadState(`networkidle`)
        await this.cartbtn.click()*/
    }

    /*async navigateToCart(){
        await this.cartbtn.click()
    }*/
}
module.exports = { DashboardPage }