import { test, expect } from "@playwright/test";

test.describe("Static pages", () => {
  test("/history renders timeline content", async ({ page }) => {
    await page.goto("/history");

    await expect(
      page.getByRole("heading", { name: /UTC Rowing/i, level: 1 })
    ).toBeVisible();
    await expect(page.getByText(/a history/i).first()).toBeVisible();

    // Timeline should mention key historical anchors
    await expect(page.getByText(/Espeseth/i).first()).toBeVisible();
    await expect(page.getByText(/Beery/i).first()).toBeVisible();
    await expect(page.getByText(/1983/i).first()).toBeVisible();
  });

  test("/donate shows tiers + needs", async ({ page }) => {
    await page.goto("/donate");

    await expect(
      page.getByRole("heading", { name: /help bring UTC Rowing/i, level: 1 })
    ).toBeVisible();

    // Three tiers
    await expect(page.getByText(/single donation/i).first()).toBeVisible();
    await expect(page.getByText(/monthly sustaining donor/i).first()).toBeVisible();
    await expect(page.getByText(/named giving/i).first()).toBeVisible();

    // Needs section
    await expect(page.getByText(/pole barn/i).first()).toBeVisible();
    await expect(page.getByText(/replacement barges/i).first()).toBeVisible();
  });

  test("/contact has email + affiliations", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByRole("heading", { name: /^contact$/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /kinseymi@radl\.solutions/i })
    ).toBeVisible();
    await expect(page.getByText(/ACRA/i).first()).toBeVisible();
    await expect(page.getByText(/SIRA/i).first()).toBeVisible();
  });

  test("404 returns not-found page", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
