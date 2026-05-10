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
});
