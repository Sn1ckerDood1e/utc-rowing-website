# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: submit.spec.ts >> Submit form >> invalid email shows validation error
- Location: tests/e2e/submit.spec.ts:55:7

# Error details

```
TimeoutError: locator.fill: Timeout 10000ms exceeded.
Call log:
  - waiting for getByLabel(/your name/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "U UTCRowing" [ref=e4] [cursor=pointer]:
        - /url: /
        - generic [ref=e5]: U
        - generic [ref=e6]: UTCRowing
      - navigation [ref=e7]:
        - list [ref=e8]:
          - listitem [ref=e9]:
            - link "History" [ref=e10] [cursor=pointer]:
              - /url: /history
          - listitem [ref=e11]:
            - link "Alumni" [ref=e12] [cursor=pointer]:
              - /url: /alumni
          - listitem [ref=e13]:
            - link "Submit" [ref=e14] [cursor=pointer]:
              - /url: /submit
          - listitem [ref=e15]:
            - link "Donate" [ref=e16] [cursor=pointer]:
              - /url: /donate
          - listitem [ref=e17]:
            - link "Contact" [ref=e18] [cursor=pointer]:
              - /url: /contact
          - listitem [ref=e19]:
            - link "Support →" [ref=e20] [cursor=pointer]:
              - /url: /donate
  - main [ref=e21]:
    - generic [ref=e24]:
      - img [ref=e26]
      - paragraph [ref=e29]: Add to the record
      - heading "Tell us you rowed at UTC." [level=1] [ref=e30]
      - paragraph [ref=e31]: "The shortest path: just your name and the years you rowed. Want to share a memory, correct an entry, or send us a photo? Expand the form below."
      - paragraph [ref=e32]: We read every submission. Your contribution makes the picture more complete.
    - generic [ref=e34]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e38]: Your name*
          - textbox [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]: Email*
          - paragraph [ref=e42]: We won't publish or share this. Used only to follow up if needed.
          - textbox [ref=e43]
        - generic [ref=e44]:
          - generic [ref=e45]: Years you rowed at UTC
          - paragraph [ref=e46]: e.g. "2003–2006" or "spring 1995 only" — rough is fine.
          - textbox "e.g. 2003–2006" [ref=e47]
        - generic [ref=e48]:
          - generic [ref=e49]: Coach during your years
          - paragraph [ref=e50]: Carney / Espeseth / Worth / Kinsey — whoever you remember.
          - textbox "e.g. Espeseth" [ref=e51]
        - button "+ Add a memory, correction, or note" [ref=e52]
        - button "Submit" [ref=e53]
      - paragraph [ref=e54]: We’ll never publish your email. Stories can be shared anonymously by request.
  - contentinfo [ref=e55]:
    - generic [ref=e57]:
      - generic [ref=e58]:
        - generic [ref=e59]:
          - generic [ref=e60]: U
          - paragraph [ref=e61]: UTC Rowing
        - paragraph [ref=e62]: University of Tennessee at Chattanooga. Club sport since 1983. Olympic gold to ACRA, on the Tennessee River.
        - paragraph [ref=e63]:
          - link "Support the program →" [ref=e64] [cursor=pointer]:
            - /url: /donate
      - generic [ref=e65]:
        - paragraph [ref=e66]: Help us rebuild the record
        - paragraph [ref=e67]: We’re collecting alumni stories, photos, and corrections. Every contribution makes the picture more complete.
        - link "Submit your story →" [ref=e68] [cursor=pointer]:
          - /url: /submit
      - generic [ref=e69]:
        - paragraph [ref=e70]: Connect
        - list [ref=e71]:
          - listitem [ref=e72]:
            - link "Contact" [ref=e73] [cursor=pointer]:
              - /url: /contact
          - listitem [ref=e74]:
            - link "Program site" [ref=e75] [cursor=pointer]:
              - /url: https://utcrowing.org
          - listitem [ref=e76]:
            - link "gomocs.com/giving" [ref=e77] [cursor=pointer]:
              - /url: https://gomocs.com/giving
    - generic [ref=e79]:
      - paragraph [ref=e80]: © 2026 UTC Rowing alumni community.
      - img [ref=e82]
  - alert [ref=e85]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Submit form", () => {
  4  |   test("level-1 minimal submission redirects to thank-you", async ({ page }) => {
  5  |     await page.goto("/submit");
  6  | 
  7  |     await expect(
  8  |       page.getByRole("heading", { name: /tell us you rowed at UTC/i, level: 1 })
  9  |     ).toBeVisible();
  10 | 
  11 |     const ts = Date.now();
  12 |     await page.getByLabel(/your name/i).fill(`Playwright Test ${ts}`);
  13 |     await page.getByLabel(/^email/i).fill(`playwright+${ts}@test.invalid`);
  14 | 
  15 |     await page.getByRole("button", { name: /^submit$/i }).click();
  16 | 
  17 |     // Should land on thank-you
  18 |     await expect(page).toHaveURL(/\/submit\/thank-you/, { timeout: 10_000 });
  19 |     await expect(page.getByRole("heading", { name: /thank you/i })).toBeVisible();
  20 |   });
  21 | 
  22 |   test("level-2 submission with topic + body works", async ({ page }) => {
  23 |     await page.goto("/submit");
  24 | 
  25 |     const ts = Date.now();
  26 |     await page.getByLabel(/your name/i).fill(`Playwright Memory ${ts}`);
  27 |     await page.getByLabel(/^email/i).fill(`pwmemory+${ts}@test.invalid`);
  28 |     await page.getByLabel(/years you rowed/i).fill("2010–2013");
  29 | 
  30 |     // Expand to level 2
  31 |     await page.getByRole("button", { name: /add a memory/i }).click();
  32 | 
  33 |     await page.getByLabel(/what are you sharing/i).selectOption("memory");
  34 |     await page.getByLabel(/your story/i).fill(
  35 |       `Automated Playwright test memory submitted at ${new Date(ts).toISOString()}.`
  36 |     );
  37 | 
  38 |     await page.getByRole("button", { name: /^submit$/i }).click();
  39 | 
  40 |     await expect(page).toHaveURL(/\/submit\/thank-you/, { timeout: 10_000 });
  41 |   });
  42 | 
  43 |   test("validation blocks empty submit", async ({ page }) => {
  44 |     await page.goto("/submit");
  45 | 
  46 |     await page.getByRole("button", { name: /^submit$/i }).click();
  47 | 
  48 |     // Should still be on /submit (didn't navigate)
  49 |     await expect(page).toHaveURL(/\/submit$/);
  50 | 
  51 |     // Validation message visible
  52 |     await expect(page.getByText(/please enter your name/i)).toBeVisible();
  53 |   });
  54 | 
  55 |   test("invalid email shows validation error", async ({ page }) => {
  56 |     await page.goto("/submit");
  57 | 
> 58 |     await page.getByLabel(/your name/i).fill("Test User");
     |                                         ^ TimeoutError: locator.fill: Timeout 10000ms exceeded.
  59 |     await page.getByLabel(/^email/i).fill("not-an-email");
  60 | 
  61 |     await page.getByRole("button", { name: /^submit$/i }).click();
  62 | 
  63 |     await expect(page.getByText(/please enter a valid email/i)).toBeVisible();
  64 |     await expect(page).toHaveURL(/\/submit$/);
  65 |   });
  66 | });
  67 | 
```