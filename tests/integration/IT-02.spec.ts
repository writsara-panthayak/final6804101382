import { test, expect, type Browser, type BrowserContext, type Page } from '@playwright/test';

// DRIVER: เตรียมสถานะ Login ด้วย Cookie แล้วเปิดหน้า Inventory จริงโดยตรง (ไม่ผ่าน Login Form)
async function driverOpenInventory(browser: Browser): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    },
  ]);
  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/inventory.html');
  return { context, page };
}

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
  let context!: BrowserContext;
  let page!: Page;

  try {
    await test.step('สร้าง Driver และเปิด Inventory', async () => {
      ({ context, page } = await driverOpenInventory(browser));
      await expect(page).toHaveURL(/inventory\.html/);
    });

    await test.step('ตรวจสอบ Inventory จริง', async () => {
      await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    });

    await test.step('เพิ่มสินค้า 2 รายการ', async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    });

    await test.step('ตรวจสอบสินค้าใน Cart', async () => {
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/cart\.html/);
      const names = page.locator('[data-test="inventory-item-name"]');
      await expect(names).toHaveCount(2);
      await expect(names).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    });
  } finally {
    // ปิด BrowserContext ที่สร้างเองเมื่อสิ้นสุดการทดสอบ
    if (context) await context.close();
  }
});
