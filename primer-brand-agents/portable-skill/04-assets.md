# 04 — Assets (fonts, icons, logo)

Everything here is either a **public CDN pointer** or **inline SVG** — no binary files need
to travel with this package.

## Fonts — load from the Fontsource CDN
These three `@import`s are already at the top of the `colors_and_type.css` in `02-tokens.md`,
so if you use that file the fonts load automatically. To load them standalone:

```css
@import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/mona-sans@5/index.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/hubot-sans@5/index.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/monaspace-neon@5/index.css');
```

Family stacks (from the tokens file):
- `--font-sans` / `--font-display`: `"Mona Sans Variable", "Mona Sans", -apple-system, …`
- `--font-mono`: `"Monaspace Neon", ui-monospace, "SF Mono", Menlo, Consolas, monospace`
- Hubot Sans is loaded as the expressive display sidekick for rare oversized headlines.

> Mona Sans, Hubot Sans and Monaspace are GitHub's own open-source typefaces, so this is
> exact — no substitution. Sources: github.com/github/mona-sans, github.com/githubnext/monaspace.

## Icons — Primer Octicons from CDN
GitHub's icon set is **Octicons**: single-color SVGs that inherit `currentColor` on a 16/24px
grid. Pull any icon by name from the public CDN — no local files needed:

```
https://cdn.jsdelivr.net/npm/@primer/octicons@19/build/svg/<name>-16.svg
https://cdn.jsdelivr.net/npm/@primer/octicons@19/build/svg/<name>-24.svg
```

Inline them so they inherit color, e.g.:

```html
<span class="gh-icon" style="width:16px;height:16px;color:var(--accent-green-strong)">
  <!-- paste the <svg>…</svg> body of search-16.svg here -->
</span>
```

Working set used across this system: `search`, `star`, `zap`, `copilot`, `chevron-down`,
`shield-lock`, `lock`, `codescan`, `issue-opened`, `mcp`, `book`, `gear`, `globe`, `check`.
Set `color` (or `currentColor` via a parent) to tint. **Never hand-draw icons or use emoji.**

## GitHub Invertocat mark (inline SVG, `currentColor`)
Use at 28px in nav, 32–36px in footer/modal. It's a single path that inherits text color.

```html
<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
  <path d="M 40.529 0 C 18.12 0 0 18.562 0 41.528 C 0 59.888 11.607 75.421 27.711 80.922 C 29.727 81.335 30.465 80.027 30.465 78.931 C 30.465 77.969 30.399 74.67 30.399 71.227 C 19.124 73.699 16.776 66.275 16.776 66.275 C 14.967 61.465 12.279 60.225 12.279 60.225 C 8.587 57.686 12.544 57.686 12.544 57.686 C 16.635 57.964 18.784 61.946 18.784 61.946 C 22.409 68.274 28.242 66.486 30.598 65.38 C 30.93 62.697 32.008 60.841 33.145 59.812 C 24.151 58.85 14.693 55.272 14.693 39.326 C 14.693 34.787 16.303 31.074 18.85 28.189 C 18.443 27.16 17.041 22.899 19.256 17.187 C 19.256 17.187 22.675 16.09 30.399 21.448 C 33.701 20.536 37.111 20.072 40.529 20.072 C 43.947 20.072 47.44 20.553 50.659 21.448 C 58.375 16.081 61.801 17.187 61.801 17.187 C 64.017 22.89 62.606 27.16 62.208 28.189 C 64.821 31.074 66.365 34.787 66.365 39.326 C 66.365 55.281 56.906 58.782 47.847 59.812 C 49.323 61.12 50.601 63.592 50.601 67.515 C 50.601 73.084 50.535 77.555 50.535 78.931 C 50.535 80.027 51.273 81.335 53.289 80.922 C 69.393 75.421 81 59.888 81 41.528 C 81.066 18.562 62.88 0 40.537 0 L 40.529 0 Z" fill="currentColor" fill-rule="evenodd"></path>
</svg>
```

## GitHub wordmark (inline SVG, `currentColor`)

```html
<svg xmlns="http://www.w3.org/2000/svg" width="67" height="18" viewBox="0 0 67 18" fill="none">
  <path d="M 27.799 14.908 L 27.769 14.908 C 27.783 14.908 27.792 14.922 27.805 14.925 C 27.807 14.925 27.813 14.923 27.814 14.923 L 27.799 14.908 Z M 27.805 14.925 C 27.666 14.926 27.315 14.998 26.944 14.998 C 25.774 14.998 25.369 14.462 25.369 13.764 L 25.369 9.112 L 27.754 9.112 C 27.889 9.112 27.994 8.993 27.994 8.829 L 27.994 6.302 C 27.994 6.169 27.874 6.05 27.754 6.05 L 25.369 6.05 L 25.369 2.913 C 25.369 2.794 25.294 2.72 25.159 2.72 L 21.918 2.72 C 21.783 2.72 21.708 2.794 21.708 2.913 L 21.708 6.139 C 21.708 6.139 20.073 6.54 19.968 6.555 C 19.848 6.585 19.773 6.689 19.773 6.808 L 19.773 8.829 C 19.773 8.993 19.893 9.112 20.028 9.112 L 21.693 9.112 L 21.693 13.987 C 21.693 17.614 24.244 17.985 25.984 17.985 C 26.779 17.985 27.739 17.732 27.889 17.658 C 27.979 17.628 28.024 17.524 28.024 17.42 L 28.024 15.191 C 28.024 15.044 27.922 14.945 27.805 14.925 Z M 63.354 11.653 C 63.354 8.963 62.259 8.606 61.104 8.725 C 60.204 8.785 59.484 9.23 59.484 9.23 L 59.484 14.462 C 59.484 14.462 60.219 14.968 61.314 14.998 C 62.859 15.042 63.354 14.492 63.354 11.653 Z M 67 11.415 C 67 16.514 65.335 17.97 62.424 17.97 C 59.964 17.97 58.644 16.737 58.644 16.737 C 58.644 16.737 58.584 17.42 58.509 17.51 C 58.464 17.599 58.389 17.628 58.299 17.628 L 56.078 17.628 C 55.928 17.628 55.793 17.51 55.793 17.376 L 55.823 0.862 C 55.823 0.728 55.943 0.61 56.078 0.61 L 59.274 0.61 C 59.409 0.61 59.529 0.728 59.529 0.862 L 59.529 6.466 C 59.529 6.466 60.759 5.678 62.559 5.678 L 62.544 5.648 C 64.345 5.648 67 6.317 67 11.415 Z M 53.918 6.05 L 50.768 6.05 C 50.603 6.05 50.513 6.169 50.513 6.332 L 50.513 14.418 C 50.513 14.418 49.687 14.998 48.562 14.998 C 47.437 14.998 47.107 14.492 47.107 13.377 L 47.107 6.317 C 47.107 6.183 46.987 6.064 46.852 6.064 L 43.642 6.064 C 43.506 6.064 43.386 6.183 43.386 6.317 L 43.386 13.912 C 43.386 17.182 45.232 18 47.767 18 C 49.852 18 51.548 16.855 51.548 16.855 C 51.548 16.855 51.623 17.435 51.668 17.524 C 51.698 17.599 51.803 17.658 51.908 17.658 L 53.918 17.658 C 54.083 17.658 54.173 17.539 54.173 17.405 L 54.203 6.302 C 54.203 6.169 54.083 6.05 53.918 6.05 Z M 18.362 6.035 L 15.167 6.035 C 15.032 6.035 14.912 6.169 14.912 6.332 L 14.912 17.242 C 14.912 17.539 15.107 17.643 15.362 17.643 L 18.242 17.643 C 18.542 17.643 18.617 17.509 18.617 17.242 L 18.617 6.287 C 18.617 6.154 18.497 6.035 18.362 6.035 Z M 16.787 1.011 C 15.632 1.011 14.717 1.918 14.717 3.062 C 14.717 4.207 15.632 5.113 16.787 5.113 C 17.912 5.113 18.827 4.207 18.827 3.062 C 18.827 1.918 17.912 1.011 16.787 1.011 Z M 41.526 0.639 L 38.361 0.639 C 38.226 0.639 38.106 0.758 38.106 0.892 L 38.106 6.971 L 33.14 6.971 L 33.14 0.892 C 33.14 0.758 33.02 0.639 32.885 0.639 L 29.689 0.639 C 29.554 0.639 29.434 0.758 29.434 0.892 L 29.434 17.405 C 29.434 17.539 29.569 17.658 29.689 17.658 L 32.885 17.658 C 33.02 17.658 33.14 17.539 33.14 17.405 L 33.14 10.345 L 38.106 10.345 L 38.076 17.405 C 38.076 17.539 38.196 17.658 38.331 17.658 L 41.526 17.658 C 41.661 17.658 41.781 17.539 41.781 17.405 L 41.781 0.892 C 41.781 0.758 41.661 0.639 41.526 0.639 Z M 13.217 7.952 L 13.217 16.484 C 13.217 16.543 13.202 16.647 13.127 16.677 C 13.127 16.677 11.252 18 8.161 18 C 4.426 18 0 16.841 0 9.201 C 0 1.561 3.871 -0.015 7.651 0 C 10.922 0 12.242 0.728 12.452 0.862 C 12.512 0.937 12.542 0.996 12.542 1.07 L 11.912 3.716 C 11.912 3.85 11.777 4.013 11.612 3.969 C 11.072 3.805 10.262 3.478 8.356 3.478 C 6.151 3.478 3.781 4.102 3.781 9.022 C 3.781 13.942 6.031 14.522 7.651 14.522 C 9.031 14.522 9.526 14.358 9.526 14.358 L 9.526 10.94 L 7.321 10.94 C 7.156 10.94 7.036 10.821 7.036 10.687 L 7.036 7.952 C 7.036 7.818 7.156 7.699 7.321 7.699 L 12.932 7.699 C 13.097 7.699 13.217 7.818 13.217 7.952 Z" fill="currentColor" fill-rule="evenodd"></path>
</svg>
```

## Customer / partner logos
The social-proof logo strip uses third-party trademarks (e.g. Shopify, Microsoft, Decathlon,
Doctolib). **These cannot travel with the package.** Substitute real logo SVGs you have
rights to, or neutral wordmark placeholders. In the logo strip they render at `height:26px`,
`opacity:.7`, and on dark theme get `filter:invert(1) brightness(2)` so they read on black.

## Quick wiring checklist
1. Save the CSS from `02-tokens.md` as `colors_and_type.css` (fonts auto-load).
2. Save the CSS from `03-components.md` as `kit.css` (it `@import`s the tokens file).
3. Link `kit.css` in your HTML; write markup with the recipe classes.
4. Inline Octicons + the mark above where you need icons/logo.
5. Toggle `data-theme="dark"` on a wrapper for the dark theme.