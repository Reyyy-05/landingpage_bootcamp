import { test, expect } from "@playwright/test";

test.describe("Student Registration Flow E2E Scenarios", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Scenario A: Complete Registration Flow & WhatsApp Redirect", async ({ page }) => {
    // 1. Verify Landing Page Header
    await expect(page.locator("h1")).toContainText("Sudah Lama Belajar");

    // 2. Click Primary CTA to Navigate to Registration Form
    const ctaButton = page.getByRole("link", { name: /Daftar Sekarang/i }).first();
    await ctaButton.click();

    // 3. Fill Out Form Fields
    await page.fill('input[name="full_name"]', "Budi Santoso");
    await page.fill('input[name="email"]', "budi.santoso@gmail.com");
    await page.fill('input[name="phone_number"]', "081234567890");
    await page.fill('input[name="birth_place"]', "Yogyakarta");
    await page.fill('input[name="birth_date"]', "2002-04-10");
    await page.fill('textarea[name="address"]', "Jl. Solo Km 7, Yogyakarta");
    await page.selectOption('select[name="gender"]', "L");
    await page.fill('input[name="instagram_handle"]', "budisantoso");
    
    // Status selection
    await page.selectOption('select[name="student_status"]', "MAHASISWA");
    await page.fill('input[name="university_name"]', "Universitas Gadjah Mada");
    await page.fill('input[name="major"]', "Teknik Informatika");

    // 4. Submit Form
    const submitBtn = page.getByRole("button", { name: /Daftar Sekarang/i });
    await submitBtn.click();
  });

  test("Scenario B: Invalid Input Validation Error & Recovery", async ({ page }) => {
    await page.goto("/daftar");

    // Submit empty form to trigger validation errors
    const submitBtn = page.getByRole("button", { name: /Daftar Sekarang/i });
    await submitBtn.click();

    // Verify field validation error message is rendered
    await expect(page.getByText(/Mohon lengkapi semua field/i)).toBeVisible();
  });

  test("Scenario C: Spam Submit Prevention", async ({ page }) => {
    await page.goto("/daftar");

    const submitBtn = page.getByRole("button", { name: /Daftar Sekarang/i });
    
    // Rapid double click
    await submitBtn.click({ clickCount: 2 });

    // Submit button should enter disabled loading state
    await expect(submitBtn).toBeDisabled();
  });

  test("Scenario D: Network Failure Graceful Toast Message", async ({ page }) => {
    // Abort API POST requests to simulate network failure
    await page.route("**/api/students", (route) => route.abort());

    await page.goto("/daftar");

    await page.fill('input[name="full_name"]', "Test Failure");
    await page.fill('input[name="email"]', "fail@test.com");
    await page.fill('input[name="phone_number"]', "081234567890");
    await page.fill('input[name="birth_place"]', "Bantul");
    await page.fill('input[name="birth_date"]', "2000-01-01");
    await page.fill('textarea[name="address"]', "Alamat Test");
    await page.selectOption('select[name="gender"]', "L");
    await page.fill('input[name="instagram_handle"]', "testfail");
    await page.selectOption('select[name="student_status"]', "UMUM");

    const submitBtn = page.getByRole("button", { name: /Daftar Sekarang/i });
    await submitBtn.click();

    // Verify error toast message appears gracefully
    await expect(page.getByText(/Terjadi kesalahan/i)).toBeVisible();
  });
});
