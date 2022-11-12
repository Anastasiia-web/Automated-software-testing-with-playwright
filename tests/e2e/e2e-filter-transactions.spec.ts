import { test, expect } from '@playwright/test'

test.describe.only("Filter transactions", () => {
    // hook
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text = Sign in')                       // or alternatively:    await page.click("input[name='submit']")  
    })

    test('Successful login', async ({ page }) => {
        const signInBtn = await page.locator("input[name='submit']")
        await expect(signInBtn).not.toBeVisible
    })

    test('Verify the results for each account', async ({ page }) => {
        await page.click('#transfer_funds_link')                // or  click('text=Transfer Funds')  
        await page.click('#account_activity_tab')
        await page.selectOption('#aa_accountId', '2')           // for option in dropdown choose the 'value' needed
        const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')   // test for tables (inside a div a table with 3 items)
        await expect(checkingAccount).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')           // for option in dropdown choose the 'value' needed
        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')           // for option in dropdown choose the 'value' needed
        const noResults = await page.locator('.well')
        await expect(noResults).toBeVisible
    })
})


// npx playwright test tests/e2e/e2e-transfer-funds.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                     // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder)