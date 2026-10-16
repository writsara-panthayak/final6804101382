# Software Testing Final Exam — Playwright (SauceDemo)

- เครื่องมือ: Playwright Test (TypeScript)
- ระบบทดสอบ: https://www.saucedemo.com/
- ชื่อ/รหัสนักศึกษา: **(ใส่ชื่อ-นามสกุล และรหัสนักศึกษา)**

## วิธีรัน

```bash
npm install
npx playwright install chromium
npx playwright test
npx playwright show-report
```

รายงานที่ได้: `playwright-report/index.html` และ `reports/results.json`

## โครงสร้างข้อสอบ

| รหัส | ไฟล์ | ชื่อ Test |
|------|------|-----------|
| UT-01 | tests/unit/UT-01.spec.ts | UT-01.1 / UT-01.2 / UT-01.3 (Login Form Validation) |
| UT-02 | tests/unit/UT-02.spec.ts | product button state Add to cart -> Remove -> Add to cart |
| IT-01 | tests/integration/IT-01.spec.ts | top-down REAL Login -> browser-level Inventory STUB |
| IT-02 | tests/integration/IT-02.spec.ts | DRIVER login state -> REAL Inventory and Cart |
| ST-01 | tests/system/ST-01.spec.ts | complete purchase of two products |
| ST-02 | tests/system/ST-02.spec.ts | checkout validation and recovery |

หมายเหตุ: บทที่ 1 เป็นการทดสอบ UI แบบ Black-box ผ่านเบราว์เซอร์ (UI Component/Functional Testing) ไม่ใช่ Unit Testing ของฟังก์ชันภายใน เพราะไม่สามารถเข้าถึง Source Code ของ SauceDemo ได้

## IT-01: Top-Down Integration Testing ด้วย Stub

| ส่วน | สถานะ | รายละเอียด |
|------|-------|------------|
| หน้า Login (กรอก standard_user / secret_sauce, กด Login) | **Real** | ใช้เว็บไซต์ SauceDemo จริง |
| การเปลี่ยน URL เป็น inventory.html | **Real** | ตรวจจากเบราว์เซอร์จริงหลัง Login |
| เนื้อหาหน้า Inventory | **Stub** | แทนที่ DOM ด้วย `page.setContent()` ให้แสดง "Mock Inventory Ready" และสินค้าจำลอง Mock Backpack, Mock Bike Light |

Stub นี้จำลอง DOM ระดับเบราว์เซอร์หลัง Login จริง ไม่ได้แทน Internal Module ของ SauceDemo

## IT-02: Bottom-Up Integration Testing ด้วย Driver

**บทบาทของ Driver:** ฟังก์ชัน `driverOpenInventory()` ทำหน้าที่เป็นตัวเรียกใช้งานส่วนล่าง (Inventory/Cart) แทนส่วนบน (Login Form) โดยสร้าง BrowserContext, ตั้ง Cookie `session-username=standard_user` บนโดเมน `www.saucedemo.com` ด้วย `BrowserContext.addCookies()` แล้วเปิด `/inventory.html` โดยตรง ไม่ผ่านหน้า Login

| ส่วน | สถานะ | รายละเอียด |
|------|-------|------------|
| การเตรียมสถานะ Login | **Driver** | ตั้ง Cookie เอง ข้าม Login Form |
| หน้า Inventory (6 สินค้า) | **Real** | หน้าเว็บจริงของ SauceDemo |
| Add to cart, Cart Badge, หน้า Shopping Cart | **Real** | ทำงานบนเว็บไซต์จริง |

## System Testing

- ST-01: ซื้อสินค้า 2 รายการตั้งแต่ Login จนขึ้นข้อความ "Thank you for your order!"
- ST-02: ตรวจ Validation ของ Checkout (First Name / Last Name / Postal Code) แล้วแก้ข้อมูลจนสั่งซื้อสำเร็จ

ทั้งสองข้อใช้ระบบจริงทั้งหมด ไม่มี Stub หรือ Driver
