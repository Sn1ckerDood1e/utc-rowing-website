import { test, expect } from "@playwright/test";

/**
 * Regression test for the "broken giving link" bug: every "Give" CTA on
 * any page must point at giving.utc.edu campaign 42934.
 *
 * This guards against a regression where the wrong URL gets pasted into
 * gomocs.com or some other endpoint and the donate flow silently fails.
 */

const REQUIRED_CAMPAIGN = /giving\.utc\.edu\/campaigns\/42934/;

test.describe("Giving links route to UTC campaign 42934", () => {
  test("/donate — Give once + Give monthly + footer all hit campaign 42934", async ({
    page,
  }) => {
    await page.goto("/donate");

    const giveOnce = page.getByRole("link", { name: /give once/i });
    const giveMonthly = page.getByRole("link", { name: /give monthly/i });

    expect(await giveOnce.count()).toBeGreaterThanOrEqual(1);
    expect(await giveMonthly.count()).toBeGreaterThanOrEqual(1);

    await expect(giveOnce.first()).toHaveAttribute("href", REQUIRED_CAMPAIGN);
    await expect(giveMonthly.first()).toHaveAttribute("href", REQUIRED_CAMPAIGN);
  });

  test("Footer 'Give to UTC Rowing' link routes to campaign 42934", async ({ page }) => {
    await page.goto("/");
    const footerGive = page.getByRole("link", { name: /give to utc rowing/i });
    await expect(footerGive.first()).toHaveAttribute("href", REQUIRED_CAMPAIGN);
  });

  test("No giving link routes to gomocs.com", async ({ page }) => {
    // gomocs.com was the old (broken) target — make sure no link still points there.
    await page.goto("/donate");

    const allLinks = page.locator("a[href*='gomocs']");
    const count = await allLinks.count();
    expect(count).toBe(0);
  });

  test("Named-giving link is a mailto to Coach Kinsey", async ({ page }) => {
    await page.goto("/donate");

    const named = page.getByRole("link", { name: /email coach kinsey/i });
    await expect(named.first()).toHaveAttribute(
      "href",
      /mailto:kinseymi@radl\.solutions/
    );
  });
});
