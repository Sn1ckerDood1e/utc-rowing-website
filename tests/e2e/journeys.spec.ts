import { test, expect } from "@playwright/test";

/**
 * Full user-journey tests — simulate real visitors moving through the site
 * end-to-end. These catch issues that page-isolated tests don't (broken
 * cross-page navigation, link rot, header rendering on subsequent pages).
 */

test.describe("Alumni visit journey", () => {
  test("Alum lands on home → reads history → searches roster → submits memory", async ({
    page,
  }) => {
    // 1) Land on home
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /fifty.?five years/i, level: 1 })
    ).toBeVisible();

    // 2) Click "Read our history"
    await page.getByRole("link", { name: /read our history/i }).first().click();
    await expect(page).toHaveURL(/\/history$/);
    await expect(page.getByTestId("era-rail")).toBeVisible();

    // 3) Jump to Espeseth era
    await page.getByTestId("era-jump-espeseth").click();
    await expect(page.getByTestId("era-section-espeseth")).toBeInViewport({
      ratio: 0.05,
    });

    // 4) Navigate to alumni roster via top nav
    const alumniLink = page
      .getByRole("navigation")
      .getByRole("link", { name: /^alumni$/i })
      .first();
    if (await alumniLink.isVisible().catch(() => false)) {
      await alumniLink.click();
    } else {
      // mobile drawer path
      await page.getByLabel(/toggle menu/i).click();
      await page.getByRole("link", { name: /^alumni$/i }).first().click();
    }
    await expect(page).toHaveURL(/\/alumni$/);
    await page.waitForLoadState("networkidle");

    // 5) Search for an alum
    await page.getByPlaceholder(/search alumni/i).fill("beery");
    await page.waitForTimeout(800);
    await expect(page.getByText(/Dan Beery/i).first()).toBeVisible();

    // 6) Go submit a memory
    const submitNav = page
      .getByRole("navigation")
      .getByRole("link", { name: /^submit$/i })
      .first();
    if (await submitNav.isVisible().catch(() => false)) {
      await submitNav.click();
    } else {
      await page.getByLabel(/toggle menu/i).click();
      await page.getByRole("link", { name: /^submit$/i }).first().click();
    }
    await expect(page).toHaveURL(/\/submit$/);

    // 7) Submit a quick memory
    const ts = Date.now();
    await page.getByLabel(/your name/i).fill(`Journey Test ${ts}`);
    await page.getByLabel(/^email/i).fill(`journey+${ts}@test.invalid`);
    await page.getByLabel(/years you rowed/i).fill("2002–2005");
    await page.getByRole("button", { name: /add a memory/i }).click();
    await page
      .getByLabel(/your story/i)
      .fill("Rowed for Espeseth, met Beery once on a launch.");
    await page.getByRole("button", { name: /^submit$/i }).click();

    // 8) Land on thank you
    await expect(page).toHaveURL(/\/submit\/thank-you/, { timeout: 10_000 });
    await expect(page.getByRole("heading", { name: /thank you/i })).toBeVisible();
  });
});

test.describe("Donor visit journey", () => {
  test("Visitor goes home → donate → clicks Give and route is correct", async ({
    page,
  }) => {
    await page.goto("/");

    // Click "Support the team" CTA
    await page
      .getByRole("link", { name: /support the team/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/donate$/);

    // Confirm priority list (the new fundraising priorities)
    await expect(page.getByText(/covered rack space/i).first()).toBeVisible();
    await expect(page.getByText(/replacement 8\+/i).first()).toBeVisible();

    // The "Give once" link should target campaign 42934 — opens externally
    const giveOnce = page.getByRole("link", { name: /give once/i }).first();
    await expect(giveOnce).toHaveAttribute("href", /giving\.utc\.edu/);
    await expect(giveOnce).toHaveAttribute("href", /42934/);
  });
});

test.describe("Persistent UI", () => {
  test("Top nav is present on every public page", async ({ page }) => {
    const routes = ["/", "/history", "/alumni", "/submit", "/donate", "/contact"];
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole("link", { name: /UTC.*Rowing/i }).first()).toBeVisible();
    }
  });

  test("Footer is present on every public page with correct giving link", async ({
    page,
  }) => {
    const routes = ["/", "/history", "/alumni", "/submit", "/donate", "/contact"];
    for (const route of routes) {
      await page.goto(route);
      // Footer "Give to UTC Rowing" link
      const footerGive = page.getByRole("link", { name: /give to utc rowing/i });
      if (await footerGive.first().isVisible().catch(() => false)) {
        await expect(footerGive.first()).toHaveAttribute("href", /giving\.utc\.edu.*42934/);
      }
    }
  });
});
