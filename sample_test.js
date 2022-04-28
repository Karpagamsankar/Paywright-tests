const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://app.facilio.com/
  await page.goto('https://app.facilio.com/');

  // Go to https://app.facilio.com/auth/login?redirect=%2F
  await page.goto('https://app.facilio.com/auth/login?redirect=%2F');

  // Fill [placeholder="Enter your email address"]
  await page.locator('[placeholder="Enter your email address"]').fill('karpagam@facilio.com');

  // Press Enter
  await page.locator('[placeholder="Enter your email address"]').press('Enter');

  // Fill [placeholder="Enter your password"]
  await page.locator('[placeholder="Enter your password"]').fill('Ananth03');

  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.facilio.com/app' }*/),
    page.locator('[placeholder="Enter your password"]').press('Enter')
  ]);

  // Go to https://app.facilio.com/app/home
  await page.goto('https://app.facilio.com/app/home');

  // Go to https://app.facilio.com/app/home/dashboard
  await page.goto('https://app.facilio.com/app/home/dashboard');

  // Go to https://app.facilio.com/app/home/dashboard/overview
  await page.goto('https://app.facilio.com/app/home/dashboard/overview');

  await page.waitForLoadState();
  
  // Click [aria-label="Maintenance"] path >> nth=1
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.facilio.com/app/wo/orders/myopen' }*/),
    page.locator('[aria-label="Maintenance"] path').nth(1).click()
  ]);

  // Go to https://app.facilio.com/app/home/dashboard/overview
  await page.goto('https://app.facilio.com/app/wo/orders/myopen'); 

  // Click span[role="button"]:has-text("My Open Work Orders")
  await page.locator('span[role="button"]:has-text("My Open Work Orders")').click();

  // Click text=All Work Orders
  await page.locator('text=All Work Orders').click();
  // assert.equal(page.url(), 'https://app.facilio.com/app/wo/orders/all');

  // Click .el-table__fixed-body-wrapper .el-table__body tbody tr .el-table_1_column_3 .cell .flex-middle .fw5 >> nth=0
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.facilio.com/app/wo/orders/summary/6814483' }*/),
    page.locator('.el-table__fixed-body-wrapper .el-table__body tbody tr .el-table_1_column_3 .cell .flex-middle .fw5').first().click()
  ]);
  
  await page.waitForLoadState();

  // Click header >> text=KA
  await page.locator('header >> text=KA').click();
  
  await page.waitForLoadState();
  // Click text=Logout
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.facilio.com/auth/login?redirect=%2Fapp%2Fwo%2Forders%2Fsummary%2F6814483' }*/),
    page.locator('text=Logout').click()
  ]);

  // ---------------------
  await context.close();
  await browser.close();
})();