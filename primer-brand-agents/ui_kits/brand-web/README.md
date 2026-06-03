# Brand-Web UI Kit — GitHub Copilot marketing page

A high-fidelity, interactive recreation of GitHub's **brand / marketing web** surface,
in the style of the Copilot product landing page. Built from the Figma "BrandX UI System"
foundations (Heroes, Rivers, Pricing, FAQ, Navigation, Footer) and the root
`colors_and_type.css` tokens.

## Run it
Open `index.html`. It boots an interactive single-page marketing site.

**Interactions**
- **Theme toggle** (nav, ⚡/★ icon) — switches the whole page light ⇄ dark.
- **Products mega-menu** — click "Products" in the nav.
- **Pricing billing toggle** — Monthly ⇄ Annual updates all plan prices.
- **FAQ accordion** — expand/collapse questions.
- **Sign up flow** — any "Get started / Sign up / Sign in" opens a modal; submitting
  shows a confirmation toast.

## Files
| File | Role |
|---|---|
| `index.html` | Boots React + Babel, loads the scripts below, mounts `<App/>`. |
| `kit.css` | Component styles (imports root `colors_and_type.css`). |
| `icons.js` | Inlined Octicon path data (`window.GH_ICONS`) so icons inherit `currentColor`. |
| `components.jsx` | Primitives & chrome: `Icon`, `GitHubMark`, `Button`, `Eyebrow`, `Nav`, `Editor`, `Footer`. |
| `sections.jsx` | Page sections: `Hero`, `LogoStrip`, `SectionHead`, `River`, `PRVisual`, `TermVisual`, `CustomerStory`, `Pricing`, `FAQ`, `CTABanner`. |
| `app.jsx` | State (theme, modal, toast) + page assembly + `SignupModal`. |

## Component coverage
Navigation (with mega-menu + theme toggle + auth actions), hero (eyebrow + cursor motif,
dual CTA, purple-gradient product visual), social-proof logo strip, alternating rivers
with faux editor / PR-review / terminal visuals, customer-story band with stat, pricing
table (3 plans, featured plan with green glow, billing toggle), FAQ accordion, CTA banner,
multi-column footer, sign-up modal, buttons (primary/secondary/tertiary), form inputs,
pills, cards.

## Notes / fidelity
- These are **cosmetic recreations**, not production GitHub code — structure favors
  clarity and reuse over fidelity to the real implementation.
- Octicons and the GitHub Invertocat/wordmark are real vector assets copied from the
  Figma file (`assets/icons/`, `assets/github-*.svg`). Customer logos in `assets/logos/`.
- The purple-gradient product panels + faux VS Code editors stand in for the real product
  screenshots used on github.com, matching the brand's visual treatment.
