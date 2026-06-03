# 02 — Design tokens

Every token in the system. The **summary tables** are for quick reference; the **full CSS**
below is the source of truth — drop it into any project as `colors_and_type.css` and you get
pixel-identical color, type, spacing, radii and shadows. Fonts load from CDN automatically
(see the `@import`s at the top of the CSS, and `04-assets.md`).

## Quick reference

### Signature accents
| Token | Value | Use |
|---|---|---|
| `--accent-green` | `#5FED83` | Bright signature green; glow accent |
| `--accent-green-strong` / `--btn-primary-bg` | `#08872B` | Primary button (both themes), green emphasis |
| `--accent-blue` | `#3094FF` | Accent / links |
| `--accent-purple` | `#8534F3` | Copilot / product visuals ONLY |

### Semantic — light (default) / dark (`[data-theme="dark"]`)
| Token | Light | Dark |
|---|---|---|
| `--fg-default` | `#000000` | `#FFFFFF` |
| `--fg-muted` | `#58635B` | `#A4AEA6` |
| `--fg-emphasis` | `#08872B` | `#5FED83` |
| `--fg-link` | `#005DD5` | `#5FB9FF` |
| `--canvas-default` | `#FFFFFF` | `#000000` |
| `--canvas-subtle` | `#F2F5F3` | `#0F1511` |
| `--canvas-muted` | `#FAFAFA` | `#0D1117` (Primer) |
| `--border-default` | `#D2D9D4` | `#262C28` |

### Radii / spacing / elevation
- **Radii:** sm `4px` · md `6px` (buttons/inputs) · lg `12px` (cards) · xl `16px` · 2xl `24px` · section `40px` · full `999px`
- **Spacing (4px base):** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128
- **Shadows:** sm/md/lg soft + low. **Signature green glow** `0 0 60px rgba(95,237,131,.75)`; blue glow `rgba(158,236,255,.70)`
- **Layout:** container max `1280px`; desktop gutter `176px`

### Type ramp (class → desktop size)
- Display: `.t-display` 64px / Mona Sans 425 / 1.08
- Headings: `.t-h1` 56px(440) · `.t-h2` 48px(440) · `.t-h3` 40px(460) · `.t-h4` 34px(460) · `.t-h5` 28px(480) · `.t-h6` 22px(480), all ~0 tracking
- Subheads: `.t-subhead` 20px(500) · `.t-subhead-md` 16px(500), +1% tracking
- Body: `.t-body-lg` 18px · `.t-body` 16px · `.t-body-sm` 14px, weight 400, +1% tracking
- Mono: `.t-mono-lg` 18px · `.t-mono` 16px · `.t-mono-sm` 14px, Monaspace Neon 500
- Eyebrow: `.t-eyebrow` 14px uppercase Monaspace, 1px tracking, muted, + `.eyebrow-cursor` green block
- Responsive: scales down at `≤1023px` (tablet) and `≤599px` (mobile) — see media queries in the CSS.

---

## Full source — `colors_and_type.css` (verbatim)

```css
/* ============================================================================
   GitHub Brand Web — Colors & Type
   Foundational tokens reconstructed from the "BrandX UI System" Figma file.
   Palette derives from GitHub's Primer color system, refined for accessibility.
   ----------------------------------------------------------------------------
   FONTS — Mona Sans, Hubot Sans & Monaspace are GitHub's open-source typefaces.
   Self-hosted here via the Fontsource CDN (no substitution needed).
============================================================================ */

@import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/mona-sans@5/index.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/hubot-sans@5/index.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/monaspace-neon@5/index.css');

:root {
  /* ---- Font families --------------------------------------------------- */
  --font-sans: "Mona Sans Variable", "Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-display: "Mona Sans Variable", "Mona Sans", sans-serif; /* display = Mona Sans, large + tight */
  --font-mono: "Monaspace Neon", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  /* Hubot Sans is the loaded sidekick face, available for rare expressive moments. */

  /* ========================================================================
     PRIMITIVES — full tonal scales (light-theme reference values, 0→9 + tints)
     ======================================================================== */
  /* GREEN — the signature GitHub brand accent */
  --green-0:#EBF9F4; --green-1:#BFFFD1; --green-2:#8CF2A6; --green-3:#5FED83;
  --green-4:#23EA57; --green-5:#0FBF3E; --green-6:#08872B; --green-7:#0D6731;
  --green-8:#0E4A2E; --green-9:#0D3024;
  /* LIME */
  --lime-0:#F3FEC8; --lime-1:#E8FC97; --lime-2:#DCFA67; --lime-3:#D1F441;
  --lime-4:#B2DE28; --lime-5:#92C219; --lime-6:#698E17; --lime-7:#425E13;
  --lime-8:#2C440B; --lime-9:#182C01;
  /* TEAL */
  --teal-0:#DAF9F5; --teal-1:#A4EFE8; --teal-2:#6EE5DC; --teal-3:#39DAD2;
  --teal-4:#23B1AE; --teal-5:#197B7B; --teal-6:#136061; --teal-7:#024B4D;
  --teal-8:#083D3D; --teal-9:#052B2C;
  /* BLUE */
  --blue-0:#DDF4FF; --blue-1:#BCECFF; --blue-2:#8DD6FF; --blue-3:#5FB9FF;
  --blue-4:#3094FF; --blue-5:#0377FF; --blue-6:#0055D5; --blue-7:#0040A7;
  --blue-8:#002F7A; --blue-9:#001C4D;
  /* INDIGO */
  --indigo-0:#EFF2FF; --indigo-1:#D4DBFF; --indigo-2:#B3C1FD; --indigo-3:#8E9DF7;
  --indigo-4:#6B7BEF; --indigo-5:#4956E5; --indigo-6:#2D3DD7; --indigo-7:#262DAE;
  --indigo-8:#212183; --indigo-9:#12144F;
  /* PURPLE — Copilot / product-visual accent */
  --purple-0:#F0E5FF; --purple-1:#DBBFFD; --purple-2:#C898FD; --purple-3:#B870FF;
  --purple-4:#9F51FA; --purple-5:#8534F3; --purple-6:#6619E1; --purple-7:#43179E;
  --purple-8:#26115F; --purple-9:#160048;
  /* PINK */
  --pink-0:#FFF0FC; --pink-1:#FFC9F2; --pink-2:#F67ED2; --pink-3:#FF80D2;
  --pink-4:#FF4AC0; --pink-5:#EF2AA4; --pink-6:#CA2186; --pink-7:#952866;
  --pink-8:#651643; --pink-9:#3D0A28;
  /* RED */
  --red-0:#FFEBE9; --red-1:#FFCECB; --red-2:#FFABA8; --red-3:#FF8182;
  --red-4:#FA4549; --red-5:#CF2230; --red-6:#AE0B29; --red-7:#860620;
  --red-8:#730019; --red-9:#420011;
  /* CORAL */
  --coral-0:#FFF0EB; --coral-1:#FFCAB8; --coral-2:#FFA387; --coral-3:#FF7B56;
  --coral-4:#FE4C25; --coral-5:#E13F1B; --coral-6:#C53211; --coral-7:#A22710;
  --coral-8:#801E0F; --coral-9:#500A00;
  /* ORANGE */
  --orange-0:#FFF1E5; --orange-1:#FCCEAB; --orange-2:#F4A876; --orange-3:#F08A3A;
  --orange-4:#DA7210; --orange-5:#B85B06; --orange-6:#954502; --orange-7:#703100;
  --orange-8:#5C2300; --orange-9:#471700;
  /* YELLOW */
  --yellow-0:#FFF8C5; --yellow-1:#FFE777; --yellow-2:#FFD743; --yellow-3:#FABF21;
  --yellow-4:#DB9D00; --yellow-5:#BE7D00; --yellow-6:#A06100; --yellow-7:#824800;
  --yellow-8:#653200; --yellow-9:#471F00;
  /* LEMON */
  --lemon-0:#FDF5B3; --lemon-1:#F5E36B; --lemon-2:#F2DA3B; --lemon-3:#E1C50F;
  --lemon-4:#C7A60B; --lemon-5:#A98906; --lemon-6:#806803; --lemon-7:#614D01;
  --lemon-8:#413200; --lemon-9:#322400;

  /* Neutrals (warm-gray, green-tinted) — light reference */
  --gray-0:#FFFFFF; --gray-1:#FAFAFA; --gray-2:#F2F5F3; --gray-3:#E4EBE6;
  --gray-4:#D2D9D4; --gray-5:#B6BFB8; --gray-6:#8C998F; --gray-7:#58635B;
  --gray-8:#38423E; --gray-9:#191F1B; --black:#000000;
  /* GitHub product canvas dark (Primer) */
  --canvas-dark:#0D1117; --canvas-dark-inset:#010409; --border-dark-primer:#30363D;

  /* ========================================================================
     SEMANTIC — LIGHT THEME (default)
     ======================================================================== */
  --fg-default:#000000;        /* primary text */
  --fg-muted:#58635B;          /* secondary text, eyebrows */
  --fg-emphasis:#08872B;       /* brand-green emphasis text */
  --fg-link:#005DD5;           /* links */
  --fg-error:#CF222E;          /* error */
  --fg-on-emphasis:#FFFFFF;    /* text on green/dark */

  --canvas-default:#FFFFFF;    /* page background */
  --canvas-subtle:#F2F5F3;     /* subtle section background */
  --canvas-muted:#FAFAFA;      /* muted background */
  --canvas-inset:#F2F5F3;

  --border-default:#D2D9D4;    /* default borders / dividers */
  --border-muted:#E4EBE6;      /* lighter borders */
  --border-emphasis:#08872B;

  /* Brand accents */
  --accent-green:#5FED83;      /* bright signature green */
  --accent-green-strong:#08872B;
  --accent-blue:#3094FF;
  --accent-purple:#8534F3;     /* product / Copilot visuals */

  /* Action surfaces */
  --btn-primary-bg:#08872B;
  --btn-primary-fg:#FFFFFF;
  --btn-primary-border:rgba(0,0,0,0.12);
  --btn-secondary-bg:rgba(0,0,0,0.06);
  --btn-secondary-fg:#000000;
  --btn-secondary-border:#D2D9D4;

  /* ========================================================================
     RADII / SPACING / ELEVATION
     ======================================================================== */
  --radius-sm:4px;   --radius-md:6px;   --radius-lg:12px;
  --radius-xl:16px;  --radius-2xl:24px; --radius-section:40px; --radius-full:999px;

  /* 4px base spacing scale */
  --space-1:4px;  --space-2:8px;  --space-3:12px; --space-4:16px; --space-5:20px;
  --space-6:24px; --space-8:32px; --space-10:40px; --space-12:48px; --space-16:64px;
  --space-20:80px; --space-24:96px; --space-32:128px;

  /* Shadows + signature brand glows */
  --shadow-sm:0 1px 0 rgba(31,35,40,0.04);
  --shadow-md:0 3px 6px rgba(31,35,40,0.10), 0 1px 0 rgba(31,35,40,0.04);
  --shadow-lg:0 8px 24px rgba(31,35,40,0.12);
  --glow-green:0 0 60px rgba(95,237,131,0.75);   /* signature green glow */
  --glow-blue:0 0 60px rgba(158,236,255,0.70);

  /* Layout */
  --container-max:1280px;
  --page-gutter:176px; /* desktop nav/section gutter */
}

/* ===========================================================================
   DARK THEME — apply via [data-theme="dark"] on any container
   =========================================================================== */
[data-theme="dark"] {
  --fg-default:#FFFFFF;
  --fg-muted:#A4AEA6;
  --fg-emphasis:#5FED83;
  --fg-link:#5FB9FF;
  --fg-error:#FC5C5D;
  --fg-on-emphasis:#FFFFFF;

  --canvas-default:#000000;
  --canvas-subtle:#0F1511;
  --canvas-muted:#0D1117;     /* Primer product canvas */
  --canvas-inset:#010409;

  --border-default:#262C28;
  --border-muted:#191F1B;
  --border-emphasis:#5FED83;

  --btn-primary-bg:#08872B;   /* same brand green, white text */
  --btn-primary-fg:#FFFFFF;
  --btn-primary-border:rgba(0,0,0,0.12);
  --btn-secondary-bg:rgba(255,255,255,0.12);
  --btn-secondary-fg:#FFFFFF;
  --btn-secondary-border:rgba(255,255,255,0.06);
}

/* ===========================================================================
   SEMANTIC TYPE RAMP  (desktop ≥1023px) — EDITORIAL / MARKETING scale
   Values taken directly from the Figma "Editorial Typescale" frame + the live
   Copilot hero component. Mona Sans for display/headings/copy; Monaspace mono.
   • DISPLAY (expressive hero) = Mona Sans MEDIUM (500), large, ~0 tracking.
     (live hero "Command your craft" = Mona Sans 500 · 64px · 108% · 0%)
   • HEADINGS = Mona Sans SemiBold (600); tracking tightens with size (-3%→-0.5%).
   • SUBHEADERS = Mona Sans SemiBold (600) · 0%.  BODY = Mona Sans (450) · 0%.
   NOTE: GitHub's logged-in PRODUCT/UI uses a different scale (wght 440-480, 0%).
   =========================================================================== */
.t-display { font-family:var(--font-display); font-weight:425; font-size:64px; line-height:1.08; letter-spacing:0; }
.t-display-1,.t-display-2,.t-display-3 { font-family:var(--font-display); font-weight:425; font-size:64px; line-height:1.08; letter-spacing:0; }

.t-h1 { font-family:var(--font-sans); font-weight:440; font-size:56px; line-height:1.10; letter-spacing:0; }
.t-h2 { font-family:var(--font-sans); font-weight:440; font-size:48px; line-height:1.18; letter-spacing:0; }
.t-h3 { font-family:var(--font-sans); font-weight:460; font-size:40px; line-height:1.20; letter-spacing:0; }
.t-h4 { font-family:var(--font-sans); font-weight:460; font-size:34px; line-height:1.30; letter-spacing:0; }
.t-h5 { font-family:var(--font-sans); font-weight:480; font-size:28px; line-height:1.35; letter-spacing:0; }
.t-h6 { font-family:var(--font-sans); font-weight:480; font-size:22px; line-height:1.40; letter-spacing:0; }

.t-subhead    { font-family:var(--font-sans); font-weight:500; font-size:20px; line-height:1.5; letter-spacing:0.01em; }  /* Subheading Large */
.t-subhead-md { font-family:var(--font-sans); font-weight:500; font-size:16px; line-height:1.5; letter-spacing:0.01em; }  /* Subheading Medium */
.t-body-lg    { font-family:var(--font-sans); font-weight:400; font-size:18px; line-height:1.6; letter-spacing:0.01em; }  /* Body Large */
.t-body       { font-family:var(--font-sans); font-weight:400; font-size:16px; line-height:1.6; letter-spacing:0.01em; }  /* Body Medium */
.t-body-sm    { font-family:var(--font-sans); font-weight:400; font-size:14px; line-height:1.5; letter-spacing:0.01em; }  /* Body Small */

.t-mono-lg { font-family:var(--font-mono); font-weight:500; font-size:18px; line-height:1.5; letter-spacing:0; }          /* Mono Large */
.t-mono    { font-family:var(--font-mono); font-weight:500; font-size:16px; line-height:1.5; letter-spacing:0; }          /* Mono Medium */
.t-mono-sm { font-family:var(--font-mono); font-weight:500; font-size:14px; line-height:1.5; letter-spacing:0.15px; }     /* Mono Small */

/* Tablet 600–1023px */
@media (max-width:1023px){
  .t-display,.t-display-1,.t-display-2,.t-display-3 { font-size:56px; }
  .t-h1{font-size:48px;line-height:1.2} .t-h2{font-size:40px;line-height:1.2} .t-h3{font-size:34px}
  .t-h4{font-size:28px} .t-h5{font-size:24px;line-height:1.3} .t-h6{font-size:20px}
  .t-subhead{font-weight:480;font-size:18px}
}
/* Mobile 0–599px */
@media (max-width:599px){
  .t-display,.t-display-1,.t-display-2,.t-display-3 { font-size:40px;line-height:1.15; }
  .t-h1{font-size:36px} .t-h2{font-size:32px} .t-h3{font-size:28px}
  .t-h4{font-size:24px} .t-h5{font-size:22px} .t-h6{font-size:20px}
}

/* Eyebrow / kicker — uppercase mono label, often paired with a green cursor block */
.t-eyebrow {
  font-family:var(--font-mono); font-weight:500; font-size:14px; line-height:1.5;
  letter-spacing:1px; text-transform:uppercase; color:var(--fg-muted);
}
.eyebrow-cursor { display:inline-block; width:10px; height:1em; background:var(--accent-green-strong);
  vertical-align:text-bottom; margin-left:6px; }
[data-theme="dark"] .eyebrow-cursor { background:var(--accent-green); }

```
