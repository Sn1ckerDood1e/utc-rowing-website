import { defineConfig, devices } from "@playwright/test";

const BASE_URL =
  process.env.PLAYWRIGHT_BASE_URL || "https://utc-rowing-website.vercel.app";

// iPhone (webkit) tests need libs not in WSL2 by default. Set
// PLAYWRIGHT_MOBILE_WEBKIT=1 once you've run
// `sudo npx playwright install-deps webkit` to enable them.
const enableWebkit = process.env.PLAYWRIGHT_MOBILE_WEBKIT === "1";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "chromium-mobile",
      // Pixel 7 emulation via Chromium — no webkit deps required.
      // Covers mobile-viewport breakpoints, touch targets, and the
      // sticky-nav drawer. Real Safari coverage requires webkit (see above).
      use: { ...devices["Pixel 7"] },
    },
    ...(enableWebkit
      ? [
          {
            name: "iphone-13-webkit",
            use: { ...devices["iPhone 13"] },
          },
        ]
      : []),
  ],
});
