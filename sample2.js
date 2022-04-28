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

  // Click [placeholder="Enter your email address"]
  await page.locator('[placeholder="Enter your email address"]').click();

  // Fill [placeholder="Enter your email address"]
  await page.locator('[placeholder="Enter your email address"]').fill('karpagam@facilio.com');

  // Click button:has-text("Next")
  await page.locator('button:has-text("Next")').click();

  // Click [placeholder="Enter your password"]
  await page.locator('[placeholder="Enter your password"]').click();

  // Fill [placeholder="Enter your password"]
  await page.locator('[placeholder="Enter your password"]').fill('Ananth03');

  // Click button:has-text("Sign in")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.facilio.com/app' }*/),
    page.locator('button:has-text("Sign in")').click()
  ]);

  // Go to https://app.facilio.com/app/home
  await page.goto('https://app.facilio.com/app/home');

  // Go to https://app.facilio.com/app/home/dashboard
  await page.goto('https://app.facilio.com/app/home/dashboard');

  // Go to https://app.facilio.com/app/home/dashboard/overview
  await page.goto('https://app.facilio.com/app/home/dashboard/overview');

  // Click [aria-label="Maintenance"] #Layer_1
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.facilio.com/app/wo/orders/myopen' }*/),
    page.locator('[aria-label="Maintenance"] #Layer_1').click()
  ]);

  // Click text=My Open Work Orders My Open Work Orders Open Work Orders Resolved Work Orders Cl
  await page.locator('text=My Open Work Orders My Open Work Orders Open Work Orders Resolved Work Orders Cl').click();

  // Click text=All Work Orders
  await page.locator('text=All Work Orders').click();
  // assert.equal(page.url(), 'https://app.facilio.com/app/wo/orders/all');

  // Go to https://app.facilio.com/app/wo/orders/summary/6807424
  await page.goto('https://app.facilio.com/app/wo/orders/summary/6807424');

  // Click text=KA
  await page.locator('text=KA').click();

  // Click text=Logout
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://app.facilio.com/auth/login?redirect=%2Fapp%2Fwo%2Forders%2Fsummary%2F6807424' }*/),
    page.locator('text=Logout').click()
  ]);

  // ---------------------
  await context.close();
  await browser.close();
})();