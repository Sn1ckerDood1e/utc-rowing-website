import { defineConfig, devices } from "@playwright/test";

const BASE_URL =
  process.env.PLAYWRIGHT_BASE_URL || "https://utc-rowing-website.vercel.app";

// Mobile (webkit) tests need system deps that don't ship in WSL2 by default.
// Set PLAYWRIGHT_MOBILE=1 once you've run `sudo npx playwright install-deps webkit`
// (or in CI, on macOS, or anywhere webkit is supported).
const enableMobile = process.env.PLAYWRIGHT_MOBILE === "1";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : [["list"]],
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
    ...(enableMobile
      ? [
          {
            name: "iphone-13",
            use: { ...devices["iPhone 13"] },
          },
        ]
      : []),
  ],
});
