# Test Summary

รันด้วยคำสั่ง `npx playwright test` (Playwright 1.64.1, Chromium, workers: 1, retries: 0)

**ผลรวม: 8 passed, 0 failed (ใช้เวลา 24.5 วินาที)**

| Test | ผล | ข้อผิดพลาดที่พบ |
|------|----|-----------------|
| UT-01.1: empty username and password | Passed | ไม่พบ |
| UT-01.2: missing password | Passed | ไม่พบ |
| UT-01.3: invalid login details | Passed | ไม่พบ |
| UT-02: product button state Add to cart -> Remove -> Add to cart | Passed | ไม่พบ |
| IT-01: top-down REAL Login -> browser-level Inventory STUB | Passed | ไม่พบ |
| IT-02: DRIVER login state -> REAL Inventory and Cart | Passed | ไม่พบ |
| ST-01: complete purchase of two products | Passed | ไม่พบ |
| ST-02: checkout validation and recovery | Passed | ไม่พบ |

รายงานฉบับเต็มอยู่ที่ `playwright-report/index.html` และ `reports/results.json`
(ดูด้วย `npx playwright show-report`)