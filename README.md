# Optimotion Auth & KYC Testing (Cypress)

Automated UI testing for the Optimotion rider web app (UAT environment), covering Login, Signup, Dashboard, and the full KYC verification flow.

**Environment tested:** `https://optimotion-uat.onrender.com`

## What's covered

| Spec file | Covers |
|---|---|
| `login.cy.js` | Login form, phone validation, OTP popup trigger |
| `signup.cy.js` | Signup form, field validation, submission |
| `full-flow.cy.js` | Single continuous session: Home → Models → Bookings → Profile → Logout |
| `kyc-flow.cy.js` | Full 4-step KYC wizard: Personal → Identity (Aadhaar/PAN) → Address → Review |

**Result: 41 of 43 planned test cases pass.** The remaining 2 (wrong OTP / correct OTP edge cases) are intentionally manual-only — see "Why some tests need manual steps" below.

## Why some tests need manual steps

OTP is sent via real WhatsApp and is randomized every time — there's no fixed test OTP in UAT. So full hands-off automation of login isn't possible without backend support. Instead, `full-flow.cy.js` and `kyc-flow.cy.js` use `cy.pause()`:

1. The test opens the login page and fills the phone number
2. It pauses and waits
3. You manually check WhatsApp, enter the OTP, and click Verify
4. You click **Resume (▶)** in the Cypress runner
5. Everything after that runs fully automatically, using that one login

This means each full run still needs one manual OTP entry, but covers every other page and the entire KYC flow automatically after that.

## Key technical issue found

**Session does not survive `cy.visit()` (full page reload) inside Cypress.** Visiting a dashboard URL directly results in a 401 on `/api/v1/customer/me` and a forced redirect to login. The fix used throughout: navigate by **clicking sidebar links** (`cy.get('a').contains('Models').click()`) instead of typing URLs, and keep the entire flow inside **one single `it()` block** so Cypress never resets the page mid-test.

Note: this 401-on-refresh behavior has **not been reproduced in normal manual browser usage** — it may be specific to how Cypress handles cookies/storage rather than a real production bug. Flagged to dev team for clarification, not as a confirmed issue.

## How to run

```bash
npm install
npx cypress open
```

Select a spec from the list. For `full-flow.cy.js` and `kyc-flow.cy.js`, be ready to check WhatsApp for the OTP when the test pauses.

## Test data used

- Test phone: `9407984243`
- Dummy Aadhaar: `234567890123`
- Dummy PAN: `ABCDE1234F`
- Sample images for Aadhaar/PAN/address-proof uploads are in `cypress/fixtures/`

## Issues flagged to dev team

See `Optimotion_UAT_Testing_Documentation.docx` for the full write-up. Summary:

- Date of Birth field on KYC is mandatory but not marked with a red asterisk (UI inconsistency)
- `/dashboard/bookings` (plural) returns 404; sidebar correctly uses `/dashboard/booking` (singular)
- Post-login landing page is inconsistent (sometimes Home, Profile, or directly KYC)
- No fixed test OTP available in UAT — recommend one for QA efficiency
