import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero with mission + CTAs", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /fifty.?five years/i, level: 1 })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /read our history/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /i rowed at utc/i }).first()
    ).toBeVisible();
  });

  test("shows ACRA crew callout with all four athletes + coach", async ({ page }) => {
    const acra = page.getByText(/ACRA Nationals.*May 17, 2026/i);
    await expect(acra).toBeVisible();
    await expect(page.getByText(/Mako/i).first()).toBeVisible();
    await expect(page.getByText(/Conner/i).first()).toBeVisible();
    await expect(page.getByText(/Tyler/i).first()).toBeVisible();
    await expect(page.getByText(/Jay/i).first()).toBeVisible();
    await expect(page.getByText(/Michael Kinsey/i).first()).toBeVisible();
  });

  test("animated stats land on integer values", async ({ page }) => {
    // Wait for fall-out from animation
    await page.waitForTimeout(2200);
    const stats = page.locator("section").filter({ hasText: /alumni on the roster/i });
    await expect(stats).toBeVisible();
    // The live alumni count should appear after counter animates.
    // We check for any 3-digit number 4xx-5xx (currently 507; future-proof).
    const numberPattern = /\b[45]\d{2}\b/;
    await expect(page.getByText(numberPattern).first()).toBeVisible();
  });

  test("featured-alumni section shows Beery + AAs", async ({ page }) => {
    await expect(page.getByText(/Dan Beery/i).first()).toBeVisible();
    await expect(page.getByText(/Robert Meeks/i).first()).toBeVisible();
    await expect(page.getByText(/Stephen Thomas/i).first()).toBeVisible();
    await expect(page.getByText(/Athens 2004/i).first()).toBeVisible();
  });

  test("era cards link to alumni page", async ({ page }) => {
    const carneyCard = page.getByRole("link", { name: /carney/i }).first();
    await expect(carneyCard).toBeVisible();
    await expect(carneyCard).toHaveAttribute("href", /\/alumni/);
  });

  test("nav links navigate correctly", async ({ page }) => {
    const desktopHistory = page.getByRole("navigation").getByRole("link", { name: /^History$/ });
    if (await desktopHistory.first().isVisible().catch(() => false)) {
      await desktopHistory.first().click();
      await expect(page).toHaveURL(/\/history/);
    }
  });
});
