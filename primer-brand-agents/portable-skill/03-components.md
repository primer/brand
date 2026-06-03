# 03 — Components

The full component stylesheet (`kit.css`) embedded verbatim, plus markup recipes. Two ways
to use it:

- **Plain HTML/CSS:** paste the CSS below as `kit.css` (it `@import`s `colors_and_type.css`
  from `02-tokens.md`), then write semantic markup using the class names shown in the recipes.
- **React:** the original kit ships React components — their APIs are summarized at the bottom
  so you can rebuild them on the same class names.

## Component coverage
Nav (mega-menu + theme toggle + auth), hero (eyebrow+cursor, dual CTA, purple product
visual), social-proof logo strip, alternating rivers with faux editor / PR-review / terminal
visuals, customer-story band with stat, 3-plan pricing (featured plan has green glow +
billing toggle), FAQ accordion, CTA banner, multi-column footer, sign-up modal, buttons
(primary/secondary/tertiary), form inputs, pills, cards.

---

## Markup recipes (key patterns)

**Eyebrow + cursor** (the signature kicker):

```html
<span class="eyebrow">GITHUB COPILOT<span class="cur"></span></span>
```

**Buttons** — primary green / secondary translucent / tertiary text+arrow:

```html
<button class="btn btn-primary">Get started for free</button>
<button class="btn btn-secondary">Watch the demo</button>
<button class="btn btn-tertiary">Learn more →</button>
<!-- add btn-sm for the compact nav size -->
```

**Section shell** — centered, guttered, 96px vertical rhythm:

```html
<section class="section">
  <div class="sec-head">
    <span class="eyebrow">WHY GITHUB<span class="cur"></span></span>
    <h2>Code, command, and collaborate</h2>
    <p>Bring AI into every step of your workflow.</p>
  </div>
  <div class="wrap"><!-- content --></div>
</section>
```

**River** (alternating image/text band — add `flip` to mirror):

```html
<div class="river">
  <div class="river-text">
    <span class="eyebrow">IN THE EDITOR<span class="cur"></span></span>
    <h3>Make your editor your most powerful accelerator</h3>
    <p>Copilot completes whole functions…</p>
    <button class="btn btn-tertiary">Learn more →</button>
  </div>
  <div class="river-visual"><!-- editor / popover / terminal visual --></div>
</div>
```

**Purple product visual** + faux VS Code editor (the brand's hero treatment):

```html
<div class="visual">
  <div class="editor">
    <div class="editor-bar">
      <span class="dot" style="background:#FF5F57"></span>
      <span class="dot" style="background:#FEBC2E"></span>
      <span class="dot" style="background:#28C840"></span>
      <span class="editor-tab">rate_limiter.ts</span>
    </div>
    <div class="editor-body">
      <div class="gutter"><div>1</div><div>2</div><div>3</div></div>
      <div class="code"><span class="c-com"># Copilot, add a rate limiter</span>
<span class="c-key">export function</span> <span class="c-fn">rateLimit</span>() {}</div>
    </div>
  </div>
</div>
<!-- syntax classes: c-key c-fn c-str c-com c-var c-num c-def · .ghost = AI suggestion -->
```

**Pricing plan** (add `feat` for the featured/glowing plan):

```html
<div class="plan feat">
  <span class="pname">PRO</span>
  <div class="price">$8<small> / mo</small></div>
  <p class="pdesc">For individual developers shipping daily.</p>
  <button class="btn btn-primary">Get started</button>
  <ul><li><span class="gh-icon">✓</span> Unlimited completions &amp; chat</li></ul>
</div>
```

**FAQ item** (toggle `open` to expand; `.faq-a` animates `max-height`):

```html
<div class="faq">
  <div class="faq-item open">
    <button class="faq-q">What's the difference between Free and Pro? <span class="gh-icon">⌄</span></button>
    <div class="faq-a" style="max-height:200px"><p>Free includes a capped number…</p></div>
  </div>
</div>
```

> In every recipe above, replace the inline glyph placeholders (✓ ⌄ →) with real **Octicons**
> per `04-assets.md`. They're shown as glyphs here only to keep the markup readable.

## React component APIs (original kit)
If rebuilding in React, mirror these signatures on the same class names:

- `Icon({name, size=16, color})` — inline Octicon by name (inherits `currentColor`).
- `GitHubMark({size=28})` — the Invertocat mark (single path, `currentColor`).
- `Button({variant='primary'|'secondary'|'tertiary', size, icon, trailingArrow, ...})`.
- `Eyebrow({children})` — renders `<span class="eyebrow">…<span class="cur"/></span>`.
- `Nav({theme, onTheme, onSignup, onSignin})` — sticky nav + Products mega-menu + theme toggle.
- `Editor({tab, lines, children})` — faux VS Code panel.
- `Hero`, `LogoStrip`, `SectionHead({eyebrow,title,sub})`, `River({flip,eyebrow,title,body})`,
  `PRVisual`, `TermVisual`, `CustomerStory`, `Pricing`, `FAQ`, `CTABanner`, `Footer`.
- Theme is just `data-theme="dark"` on a wrapper; everything reads CSS vars.

---

## Full source — `kit.css` (verbatim)

```css
/* GitHub Brand-Web UI Kit — component styles (tokens from ../../colors_and_type.css) */
@import url('../../colors_and_type.css');

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font-sans);background:var(--canvas-default);color:var(--fg-default);-webkit-font-smoothing:antialiased;transition:background .3s,color .3s}
a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
.gh-icon{display:inline-flex;align-items:center;justify-content:center}
.gh-icon svg{display:block;width:100%;height:100%}

/* ---- layout ---- */
.wrap{max-width:1280px;margin:0 auto;padding:0 40px}
.section{padding:96px 0}
.center{text-align:center}
.eyebrow{font-family:var(--font-mono);font-weight:500;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:var(--fg-muted);display:inline-flex;align-items:center}
.eyebrow .cur{display:inline-block;width:9px;height:1em;background:var(--accent-green-strong);margin-left:7px;animation:blink 1.1s steps(1) infinite}
[data-theme="dark"] .eyebrow .cur{background:var(--accent-green)}
@keyframes blink{50%{opacity:0}}
@media (prefers-reduced-motion: reduce){.eyebrow .cur{animation:none}}

/* ---- buttons ---- */
.btn{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;font-weight:500;font-size:16px;letter-spacing:.01em;border-radius:6px;padding:11px 20px;border:1px solid transparent;transition:filter .15s,background .15s,transform .05s}
.btn:active{transform:translateY(1px)}
.btn-sm{font-size:14px;padding:7px 14px}
.btn-primary{background:var(--btn-primary-bg);color:var(--btn-primary-fg);border-color:var(--btn-primary-border)}
.btn-primary:hover{filter:brightness(1.08)}
.btn-secondary{background:var(--btn-secondary-bg);color:var(--btn-secondary-fg);border:1px solid var(--btn-secondary-border);backdrop-filter:blur(40px)}
.btn-secondary:hover{background:rgba(127,127,127,.12)}
.btn-tertiary{padding-left:0;padding-right:0;color:var(--fg-link);background:none}
.btn-tertiary .gh-icon{transition:transform .15s}
.btn-tertiary:hover .gh-icon{transform:translateX(3px)}

/* ---- nav ---- */
.nav{position:sticky;top:0;z-index:50;height:68px;display:flex;align-items:center;border-bottom:1px solid var(--border-default);background:color-mix(in srgb,var(--canvas-default) 80%,transparent);backdrop-filter:saturate(180%) blur(20px)}
.nav .wrap{display:flex;align-items:center;gap:24px;width:100%}
.nav-mark{width:28px;height:28px;flex:none}
.nav-links{display:flex;gap:4px;margin-left:8px}
.nav-link{display:flex;align-items:center;gap:4px;padding:8px 10px;border-radius:6px;font-size:15px;font-weight:500;color:var(--fg-default);transition:background .15s}
.nav-link:hover{background:color-mix(in srgb,var(--fg-default) 7%,transparent)}
.nav-link .gh-icon{width:14px;height:14px;color:var(--fg-muted);transition:transform .2s}
.nav-spacer{flex:1}
.nav-actions{display:flex;align-items:center;gap:8px}
.icon-btn{width:36px;height:36px;border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--fg-default)}
.icon-btn:hover{background:color-mix(in srgb,var(--fg-default) 7%,transparent)}
.icon-btn .gh-icon{width:16px;height:16px}

/* mega menu */
.mega{position:absolute;top:64px;left:0;right:0;z-index:40;background:var(--canvas-default);border:1px solid var(--border-default);border-radius:12px;box-shadow:var(--shadow-lg);padding:24px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px 28px;max-width:780px}
.mega-col-title{grid-column:1/-1;font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--fg-muted);padding:4px 8px;margin-top:4px}
.mega-item{display:flex;gap:12px;padding:10px 8px;border-radius:8px;transition:background .12s}
.mega-item:hover{background:var(--canvas-subtle)}
.mega-item .gh-icon{width:20px;height:20px;color:var(--accent-green-strong);flex:none;margin-top:2px}
[data-theme="dark"] .mega-item .gh-icon{color:var(--accent-green)}
.mega-item b{font-size:14px;font-weight:600;display:block}
.mega-item span{font-size:13px;color:var(--fg-muted)}

/* ---- hero ---- */
.hero{position:relative;overflow:hidden;border-bottom:1px solid var(--border-default)}
.hero .wrap{display:grid;grid-template-columns:1.05fr 1.25fr;gap:48px;align-items:center;padding-top:72px;padding-bottom:72px}
.hero h1{font-family:var(--font-sans);font-weight:500;font-size:64px;line-height:1.08;letter-spacing:0;margin:18px 0}
.hero p.lede{font-weight:500;font-size:20px;line-height:1.5;letter-spacing:.01em;color:var(--fg-muted);max-width:30ch;margin-bottom:28px}
.hero-cta{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.hero-cta .btn{flex:none}

/* purple product-visual panel */
.visual{position:relative;border-radius:16px;overflow:hidden;padding:34px;background:
  radial-gradient(120% 120% at 20% 0%, #B870FF 0%, #8534F3 38%, #4B19B0 100%);
  box-shadow:0 30px 80px rgba(101,25,225,.35)}
.visual::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.16) 1.2px,transparent 1.2px);background-size:14px 14px;mix-blend-mode:overlay;pointer-events:none}

/* faux editor */
.editor{position:relative;border-radius:10px;overflow:hidden;background:#0D1117;border:1px solid #30363D;box-shadow:0 20px 50px rgba(0,0,0,.4);font-family:var(--font-mono);font-size:13px}
.editor-bar{display:flex;align-items:center;gap:7px;padding:11px 14px;background:#161B22;border-bottom:1px solid #30363D}
.dot{width:11px;height:11px;border-radius:50%}
.editor-tab{margin-left:14px;font-family:var(--font-mono);font-size:12px;color:#7d8590}
.editor-body{display:flex;padding:14px 0}
.gutter{padding:0 14px;color:#484f58;text-align:right;user-select:none;line-height:1.7}
.code{padding-right:18px;line-height:1.7;white-space:pre;overflow:hidden}
.c-key{color:#FF7B72}.c-fn{color:#D2A8FF}.c-str{color:#A5D6FF}.c-com{color:#8b949e}.c-var{color:#79C0FF}.c-num{color:#79C0FF}.c-def{color:#e6edf3}
.ghost{color:#6e7681;background:rgba(110,118,129,.12);border-radius:3px}

/* ---- logo strip ---- */
.logostrip{border-top:1px solid var(--border-default);border-bottom:1px solid var(--border-default);padding:40px 0;background:var(--canvas-subtle)}
.logostrip .row{display:flex;align-items:center;justify-content:center;gap:56px;flex-wrap:wrap}
.logostrip img{height:26px;opacity:.7;filter:var(--logo-filter,none)}
[data-theme="dark"]{--logo-filter:invert(1) brightness(2)}

/* ---- section header ---- */
.sec-head{text-align:center;max-width:620px;margin:0 auto 56px}
.sec-head h2{font-weight:440;font-size:44px;letter-spacing:0;margin:14px 0 12px;line-height:1.15}
.sec-head p{font-weight:400;font-size:18px;color:var(--fg-muted);line-height:1.6;letter-spacing:.01em}

/* ---- river ---- */
.river{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;padding:56px 0}
.river.flip .river-text{order:2}
.river h3{font-weight:460;font-size:34px;letter-spacing:0;margin:14px 0 14px;line-height:1.2}
.river p{font-weight:400;font-size:18px;color:var(--fg-muted);line-height:1.6;letter-spacing:.01em;margin-bottom:20px;max-width:44ch}

/* faux UI: PR review popover */
.popover{background:var(--canvas-default);border:1px solid var(--border-default);border-radius:12px;box-shadow:var(--shadow-lg);overflow:hidden;font-size:13px}
.po-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--border-muted);font-weight:600}
.po-body{padding:14px}
.suggestion{background:rgba(95,237,131,.12);border:1px solid rgba(8,135,43,.4);border-radius:8px;padding:10px 12px;font-family:var(--font-mono);font-size:12px;color:var(--fg-default);margin-top:10px}
.chip{display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:4px 10px;border-radius:999px;background:var(--canvas-subtle);border:1px solid var(--border-default);color:var(--fg-muted)}

/* ---- customer story ---- */
.story{display:grid;grid-template-columns:1.3fr 1fr;gap:0;border-radius:16px;overflow:hidden;border:1px solid var(--border-default)}
.story-text{background:var(--canvas-subtle);padding:48px}
.story-text .quote{font-weight:500;font-size:26px;line-height:1.3;letter-spacing:0;margin:18px 0}
.story-photo{background:linear-gradient(135deg,#0D6731,#08872B 60%,#0E4A2E);position:relative;min-height:320px;display:flex;align-items:flex-end;padding:28px}
.story-photo .stat{color:#fff}
.story-photo .stat .big{font-weight:700;font-size:64px;letter-spacing:-.03em;line-height:1}

/* ---- pricing ---- */
.bill-toggle{display:inline-flex;background:var(--canvas-subtle);border:1px solid var(--border-default);border-radius:999px;padding:4px;gap:4px;margin:0 auto 44px}
.bill-toggle button{padding:8px 18px;border-radius:999px;font-size:14px;font-weight:500;color:var(--fg-muted)}
.bill-toggle button.on{background:var(--canvas-default);color:var(--fg-default);box-shadow:var(--shadow-sm)}
.plans{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.plan{border:1px solid var(--border-default);border-radius:16px;padding:28px;display:flex;flex-direction:column;background:var(--canvas-default)}
.plan.feat{border-color:var(--accent-green-strong);box-shadow:0 0 0 1px var(--accent-green-strong), var(--glow-green)}
[data-theme="dark"] .plan.feat{border-color:var(--accent-green)}
.plan .pname{font-family:var(--font-mono);font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--fg-muted)}
.plan .price{font-weight:700;font-size:46px;letter-spacing:-.03em;margin:14px 0 2px}
.plan .price small{font-size:15px;font-weight:500;color:var(--fg-muted);letter-spacing:0}
.plan .pdesc{font-size:14px;color:var(--fg-muted);min-height:42px;margin-bottom:18px}
.plan ul{list-style:none;display:flex;flex-direction:column;gap:11px;margin-top:20px}
.plan li{display:flex;gap:10px;font-size:14px;line-height:1.4}
.plan li .gh-icon{width:16px;height:16px;color:var(--accent-green-strong);flex:none;margin-top:1px}
[data-theme="dark"] .plan li .gh-icon{color:var(--accent-green)}
.plan .btn{justify-content:center;width:100%}

/* ---- FAQ ---- */
.faq{max-width:820px;margin:0 auto;border-top:1px solid var(--border-default)}
.faq-item{border-bottom:1px solid var(--border-default)}
.faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 4px;text-align:left;font-weight:600;font-size:18px}
.faq-q .gh-icon{width:18px;height:18px;color:var(--fg-muted);transition:transform .2s;flex:none}
.faq-item.open .faq-q .gh-icon{transform:rotate(180deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .28s ease}
.faq-a p{padding:0 4px 22px;color:var(--fg-muted);font-size:16px;line-height:1.6;max-width:64ch}

/* ---- CTA banner ---- */
.cta{text-align:center;padding:96px 0}
.cta h2{font-weight:440;font-size:48px;letter-spacing:0;margin-bottom:26px;line-height:1.15;max-width:18ch;margin-left:auto;margin-right:auto}
.cta .hero-cta{justify-content:center}

/* ---- footer ---- */
.footer{background:var(--canvas-subtle);border-top:1px solid var(--border-default);padding:64px 0 40px}
.foot-grid{display:grid;grid-template-columns:1.4fr repeat(4,1fr);gap:32px;margin-bottom:48px}
.foot-col h4{font-size:13px;font-weight:600;margin-bottom:14px}
.foot-col a{display:block;font-size:13px;color:var(--fg-muted);padding:5px 0}
.foot-col a:hover{color:var(--fg-default);text-decoration:underline}
.foot-mark{width:32px;height:32px;color:var(--fg-default)}
.foot-bottom{display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border-default);padding-top:24px;font-size:13px;color:var(--fg-muted);flex-wrap:wrap;gap:12px}

/* ---- modal ---- */
.overlay{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;padding:20px;animation:fade .2s}
@keyframes fade{from{opacity:0}}
.modal{background:var(--canvas-default);border:1px solid var(--border-default);border-radius:16px;box-shadow:var(--shadow-lg);width:100%;max-width:420px;padding:32px;position:relative}
.modal h3{font-weight:700;font-size:26px;letter-spacing:-.02em;margin-bottom:8px}
.modal p{color:var(--fg-muted);font-size:15px;margin-bottom:22px}
.field{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}
.field label{font-size:13px;font-weight:500}
.field input{font-family:var(--font-sans);font-size:15px;padding:11px 13px;border-radius:6px;border:1px solid var(--border-default);background:var(--canvas-default);color:var(--fg-default)}
.field input:focus{outline:none;border-color:var(--fg-link);box-shadow:0 0 0 3px color-mix(in srgb,var(--fg-link) 18%,transparent)}
.modal-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--fg-muted)}
.modal-close:hover{background:var(--canvas-subtle)}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:120;background:var(--accent-green-strong);color:#fff;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:500;box-shadow:var(--shadow-lg);animation:fade .2s}

@media(max-width:980px){
  .hero .wrap,.river,.story,.foot-grid{grid-template-columns:1fr}
  .plans{grid-template-columns:1fr}
  .river.flip .river-text{order:0}
  .hero h1{font-size:48px}
  .nav-links{display:none}
}

```
