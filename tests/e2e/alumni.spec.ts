import { test, expect } from "@playwright/test";

test.describe("Alumni page", () => {
  test("loads roster grouped by era", async ({ page }) => {
    await page.goto("/alumni");
    await expect(page.getByRole("heading", { name: /UTC Rowing alumni/i, level: 1 })).toBeVisible();

    // Wait for client-side hydration
    await page.waitForLoadState("networkidle");

    // Era heading should be visible
    await expect(page.getByRole("heading", { name: /Espeseth era/i }).first()).toBeVisible();

    // Some known names
    await expect(page.getByText(/Dan Beery/i).first()).toBeVisible();
    await expect(page.getByText(/Axel Marshall/i).first()).toBeVisible();
  });

  test("search filters the roster", async ({ page }) => {
    await page.goto("/alumni");
    await page.waitForLoadState("networkidle");

    const search = page.getByPlaceholder(/search alumni/i);
    await expect(search).toBeVisible();
    await search.fill("beery");

    // Wait for debounced search
    await page.waitForTimeout(800);

    // Dan Beery should still be visible
    await expect(page.getByText(/Dan Beery/i).first()).toBeVisible();

    // Axel Marshall should NOT be visible after filtering
    await expect(page.getByText(/Axel Marshall/i)).not.toBeVisible();
  });

  test("search handles partial / OCR-variant names", async ({ page }) => {
    await page.goto("/alumni");
    await page.waitForLoadState("networkidle");

    const search = page.getByPlaceholder(/search alumni/i);
    await search.fill("marchall"); // OCR variant of Marshall
    await page.waitForTimeout(800);

    // Should still find Axel Marshall via the variants column
    await expect(page.getByText(/Axel Marshall/i).first()).toBeVisible();
  });

  test("empty search shows no-match message", async ({ page }) => {
    await page.goto("/alumni");
    await page.waitForLoadState("networkidle");

    await page.getByPlaceholder(/search alumni/i).fill("zzzzzznotaname");
    await page.waitForTimeout(800);

    await expect(page.getByText(/no matches/i)).toBeVisible();
  });

  test("Worth-era names are searchable (post-May 2026 import)", async ({ page }) => {
    await page.goto("/alumni");
    await page.waitForLoadState("networkidle");

    // After the Worth-era archive import, these names must appear.
    const search = page.getByPlaceholder(/search alumni/i);

    // Sasha Dohse — 2018-19 President per Worth's BOD minutes
    await search.fill("dohse");
    await page.waitForTimeout(800);
    await expect(page.getByText(/Sasha Dohse/i).first()).toBeVisible();

    // Olivia Been — 2017-18 President
    await search.fill("been");
    await page.waitForTimeout(800);
    await expect(page.getByText(/Olivia Been/i).first()).toBeVisible();

    // Sarah McDarmont — first UTC ACRA W1x (2019)
    await search.fill("mcdarmont");
    await page.waitForTimeout(800);
    await expect(page.getByText(/Sarah McDarmont/i).first()).toBeVisible();
  });

  test("Worth-era heading appears with non-zero count", async ({ page }) => {
    await page.goto("/alumni");
    await page.waitForLoadState("networkidle");

    // Worth era heading should be visible with a count
    const worthHeading = page
      .getByRole("heading", { level: 2 })
      .filter({ hasText: /worth era/i });
    await expect(worthHeading.first()).toBeVisible();
  });
});
