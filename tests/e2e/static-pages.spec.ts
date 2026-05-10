import { test, expect } from "@playwright/test";

test.describe("Static pages", () => {
  test("/history renders interactive timeline", async ({ page }) => {
    await page.goto("/history");

    // Cover hero
    await expect(
      page.getByRole("heading", { name: /UTC Rowing/i, level: 1 })
    ).toBeVisible();

    // Era-jump rail with all 5 eras
    const rail = page.getByTestId("era-rail");
    await expect(rail).toBeVisible();
    await expect(page.getByTestId("era-jump-founding")).toBeVisible();
    await expect(page.getByTestId("era-jump-carney")).toBeVisible();
    await expect(page.getByTestId("era-jump-espeseth")).toBeVisible();
    await expect(page.getByTestId("era-jump-worth")).toBeVisible();
    await expect(page.getByTestId("era-jump-resurrection")).toBeVisible();

    // Era sections render
    await expect(page.getByTestId("era-section-founding")).toBeVisible();

    // Key historical anchors in the moment cards
    await expect(page.getByText(/Bill Raoul donates/i).first()).toBeVisible();
    await expect(page.getByText(/three USRowing/i).first()).toBeVisible();
    await expect(page.getByText(/Athens/i).first()).toBeVisible();
  });

  test("/history era-jump rail navigates to era", async ({ page }) => {
    await page.goto("/history");

    // Click the Worth-era jump and verify we scroll to it
    const worthJump = page.getByTestId("era-jump-worth");
    await worthJump.scrollIntoViewIfNeeded();
    await worthJump.click();

    // Worth-era section should now be on screen
    const worthSection = page.getByTestId("era-section-worth");
    await expect(worthSection).toBeInViewport({ ratio: 0.05 });
  });

  test("/history moment cards expand on click", async ({ page }) => {
    await page.goto("/history");

    // Find any "Read more" toggle (some moments have detail, some don't)
    const toggles = page.getByTestId("moment-toggle");
    await expect(toggles.first()).toBeAttached();

    const firstToggle = toggles.first();
    await firstToggle.scrollIntoViewIfNeeded();
    await expect(firstToggle).toHaveAttribute("aria-expanded", "false");
    await firstToggle.click();
    await expect(firstToggle).toHaveAttribute("aria-expanded", "true");
    // Button label flips
    await expect(firstToggle).toHaveText(/show less/i);
  });

  test("/donate shows tiers + needs + correct giving link", async ({ page }) => {
    await page.goto("/donate");

    await expect(
      page.getByRole("heading", { name: /help bring UTC Rowing/i, level: 1 })
    ).toBeVisible();

    // Three tiers
    await expect(page.getByText(/single donation/i).first()).toBeVisible();
    await expect(page.getByText(/monthly sustaining donor/i).first()).toBeVisible();
    await expect(page.getByText(/named giving/i).first()).toBeVisible();

    // Current fundraising priorities (post-May 2026 update)
    await expect(page.getByText(/covered rack space/i).first()).toBeVisible();
    await expect(page.getByText(/replacement 8\+/i).first()).toBeVisible();

    // Confirm all "give" CTAs route to giving.utc.edu campaign 42934
    const giveLinks = page.getByRole("link", { name: /give once|give monthly/i });
    const count = await giveLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);
    for (let i = 0; i < count; i++) {
      await expect(giveLinks.nth(i)).toHaveAttribute(
        "href",
        /giving\.utc\.edu.*42934/
      );
    }
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
