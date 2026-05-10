import { test, expect } from "@playwright/test";

test.describe("Submit form", () => {
  test("level-1 minimal submission redirects to thank-you", async ({ page }) => {
    await page.goto("/submit");

    await expect(
      page.getByRole("heading", { name: /tell us you rowed at UTC/i, level: 1 })
    ).toBeVisible();

    const ts = Date.now();
    await page.getByLabel(/your name/i).fill(`Playwright Test ${ts}`);
    await page.getByLabel(/^email/i).fill(`playwright+${ts}@test.invalid`);

    await page.getByRole("button", { name: /^submit$/i }).click();

    // Should land on thank-you
    await expect(page).toHaveURL(/\/submit\/thank-you/, { timeout: 10_000 });
    await expect(page.getByRole("heading", { name: /thank you/i })).toBeVisible();
  });

  test("level-2 submission with topic + body works", async ({ page }) => {
    await page.goto("/submit");

    const ts = Date.now();
    await page.getByLabel(/your name/i).fill(`Playwright Memory ${ts}`);
    await page.getByLabel(/^email/i).fill(`pwmemory+${ts}@test.invalid`);
    await page.getByLabel(/years you rowed/i).fill("2010–2013");

    // Expand to level 2
    await page.getByRole("button", { name: /add a memory/i }).click();

    await page.getByLabel(/what are you sharing/i).selectOption("memory");
    await page.getByLabel(/your story/i).fill(
      `Automated Playwright test memory submitted at ${new Date(ts).toISOString()}.`
    );

    await page.getByRole("button", { name: /^submit$/i }).click();

    await expect(page).toHaveURL(/\/submit\/thank-you/, { timeout: 10_000 });
  });

  test("validation blocks empty submit", async ({ page }) => {
    await page.goto("/submit");

    await page.getByRole("button", { name: /^submit$/i }).click();

    // Should still be on /submit (didn't navigate)
    await expect(page).toHaveURL(/\/submit$/);

    // Validation message visible
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
  });

  test("invalid email shows validation error", async ({ page }) => {
    await page.goto("/submit");

    await page.getByLabel(/your name/i).fill("Test User");
    await page.getByLabel(/^email/i).fill("not-an-email");

    await page.getByRole("button", { name: /^submit$/i }).click();

    await expect(page.getByText(/please enter a valid email/i)).toBeVisible();
    await expect(page).toHaveURL(/\/submit$/);
  });
});
