---
'@primer/brand-primitives': minor
---

Improved typographic defaults for all text design tokens:

- Replaced heading weight values with explicit font axis values ranging between `410` to `550`.
- Backfilled `--brand-text.subhead-*` letter-spacing tokens and moved its weight settings to numeric axis values with breakpoint-specific adjustments.
- Expanded the `--brand-text-weight-*` collection with named grades (`extralight` through `heavy`) mapped to Mona Sans numeric values while keeping the legacy numeric steps for compatibility.
- Loosened text `line-heights` for body sizes (e.g `200`) and added refined responsive values at 768px/1012px to improve readability across breakpoints.
- Updated text `letter-spacing` so sizes `100`–`800` now default to neutral or slightly positive tracking, reserving negative spacing only for the largest size at the widest viewport.

<details>
  <summary>Open to see all changes</summary>
  
    
  ```diff
  - --base-text-weight-normal: 450;
  + --base-text-weight-normal: 400;
  ```
        
  ```diff
  + --base-text-weight-regular: 400;
  ```
        
  ```diff
  - --brand-text-letterSpacing-1000: -0.03em;
  + --brand-text-letterSpacing-1000: 0;
  ```
        
  ```diff
  - --brand-text-letterSpacing-900: -0.02em;
  + --brand-text-letterSpacing-900: 0;
  ```
        
  ```diff
  - --brand-text-letterSpacing-800: -0.02em;
  + --brand-text-letterSpacing-800: 0;
  ```
        
  ```diff
  - --brand-text-letterSpacing-700: -0.02em;
  + --brand-text-letterSpacing-700: 0;
  ```
        
  ```diff
  - --brand-text-letterSpacing-600: -0.02em;
  + --brand-text-letterSpacing-600: 0;
  ```
        
  ```diff
  - --brand-text-letterSpacing-500: -0.01em;
  + --brand-text-letterSpacing-500: 0;
  ```
        
  ```diff
  - --brand-text-letterSpacing-400: 0em;
  + --brand-text-letterSpacing-400: 0;
  ```
        
  ```diff
  - --brand-text-letterSpacing-350: 0em;
  + --brand-text-letterSpacing-350: 0.18px;
  ```
        
  ```diff
  - --brand-text-letterSpacing-300: 0em;
  + --brand-text-letterSpacing-300: 0.18px;
  ```
        
  ```diff
  - --brand-text-letterSpacing-200: 0em;
  + --brand-text-letterSpacing-200: 0.24px;
  ```
        
  ```diff
  - --brand-text-letterSpacing-100: 0.02em;
  + --brand-text-letterSpacing-100: 0.21px;
  ```
        
  ```diff
  - --brand-text-lineHeight-1000: 1.1;
  + --brand-text-lineHeight-1000: 1.149;
  ```
        
  ```diff
  - --brand-text-lineHeight-900: 1.1;
  + --brand-text-lineHeight-900: 1.2;
  ```
        
  ```diff
  - --brand-text-lineHeight-600: 1.2;
  + --brand-text-lineHeight-600: 1.3;
  ```
        
  ```diff
  - --brand-text-lineHeight-400: 1.3;
  + --brand-text-lineHeight-400: 1.4;
  ```
        
  ```diff
  - --brand-text-lineHeight-350: 1.3;
  + --brand-text-lineHeight-350: 1.5;
  ```
        
  ```diff
  - --brand-text-weight-1000: var(--base-text-weight-bold);
  + --brand-text-weight-heavy: 550;
  ```
        
  ```diff
  - --brand-text-weight-900: var(--base-text-weight-semibold);
  + --brand-text-weight-extrabold: 543;
  ```
        
  ```diff
  - --brand-text-weight-800: var(--base-text-weight-semibold);
  + --brand-text-weight-bold: 537;
  ```
        
  ```diff
  - --brand-text-weight-700: var(--base-text-weight-semibold);
  + --brand-text-weight-semibold: 525;
  ```
        
  ```diff
  - --brand-text-weight-600: var(--base-text-weight-semibold);
  + --brand-text-weight-medium: 500;
  ```
        
  ```diff
  - --brand-text-weight-500: var(--base-text-weight-semibold);
  + --brand-text-weight-normal: 400;
  ```
        
  ```diff
  - --brand-text-weight-400: var(--base-text-weight-semibold);
  + --brand-text-weight-regular: 400;
  ```
        
  ```diff
  - --brand-text-weight-350: var(--base-text-weight-semibold);
  + --brand-text-weight-light: 400;
  ```
        
  ```diff
  + --brand-text-weight-extralight: 400;
  ```
        
  ```diff
  + --brand-text-weight-1000: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-weight-900: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-weight-800: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-weight-700: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-weight-600: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-weight-500: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-weight-400: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-weight-350: var(--base-text-weight-normal);
  ```
        
  ```diff
  - --brand-text-subhead-weight-large: var(--base-text-weight-semibold);
  + --brand-text-subhead-weight-large: 475;
  ```
        
  ```diff
  - --brand-text-subhead-weight-medium: var(--base-text-weight-semibold);
  + --brand-text-subhead-weight-medium: 550;
  ```
        
  ```diff
  + --brand-text-subhead-letterSpacing-large: 0.1px;
  ```
        
  ```diff
  + --brand-text-subhead-letterSpacing-medium: 0.24px;
  ```
        
  ```diff
  - --brand-heading-weight-1000: var(--base-text-weight-bold);
  + --brand-heading-weight-1000: 425;
  ```
        
  ```diff
  - --brand-heading-weight-900: var(--base-text-weight-semibold);
  + --brand-heading-weight-900: 425;
  ```
        
  ```diff
  - --brand-heading-weight-800: var(--base-text-weight-semibold);
  + --brand-heading-weight-800: 450;
  ```
        
  ```diff
  - --brand-heading-weight-700: var(--base-text-weight-semibold);
  + --brand-heading-weight-700: 460;
  ```
        
  ```diff
  - --brand-heading-weight-600: var(--base-text-weight-semibold);
  + --brand-heading-weight-600: 460;
  ```
        
  ```diff
  - --brand-heading-weight-500: var(--base-text-weight-semibold);
  + --brand-heading-weight-500: 480;
  ```
        
  ```diff
  - --brand-heading-weight-400: var(--base-text-weight-semibold);
  + --brand-heading-weight-400: 480;
  ```
        
  ```diff
  - --brand-fontStack-monospace: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  + --brand-fontStack-monospace: "Mona Sans Mono", monospace;
  ```
        
  ```diff
  - --brand-text-lineHeight-1000: 1.05;
  + --brand-text-lineHeight-1000: 1.08;
  ```
        
  ```diff
  - --brand-text-lineHeight-900: 1.05;
  + --brand-text-lineHeight-900: 1.2;
  ```
        
  ```diff
  + --brand-text-lineHeight-800: 1.2;
  ```
        
  ```diff
  - --brand-text-size-1000: 4rem;
  + --brand-text-size-1000: 3.5rem;
  ```
        
  ```diff
  - --brand-text-size-800: 2.25rem;
  + --brand-text-size-800: 2.5rem;
  ```
        
  ```diff
  - --brand-text-size-700: 2.25rem;
  + --brand-text-size-700: 2.125rem;
  ```
        
  ```diff
  - --brand-text-size-600: 2rem;
  + --brand-text-size-600: 1.75rem;
  ```
        
  ```diff
  + --brand-text-size-500: 1.5rem;
  ```
        
  ```diff
  + --brand-text-size-400: 1.25rem;
  ```
        
  ```diff
  + --brand-text-subhead-weight-large: 525;
  ```
        
  ```diff
  + --brand-text-letterSpacing-1000: -0.035em;
  ```
        
  ```diff
  - --brand-text-lineHeight-1000: 1;
  + --brand-text-lineHeight-1000: 1.08;
  ```
        
  ```diff
  - --brand-text-lineHeight-900: 1;
  + --brand-text-lineHeight-900: 1.1;
  ```
        
  ```diff
  + --brand-text-lineHeight-800: 1.18;
  ```
        
  ```diff
  - --brand-text-lineHeight-500: 1.2;
  + --brand-text-lineHeight-500: 1.35;
  ```
        
  ```diff
  - --brand-text-size-1000: 6rem;
  + --brand-text-size-1000: 4rem;
  ```
        
  ```diff
  - --brand-text-size-900: 4.5rem;
  + --brand-text-size-900: 3.5rem;
  ```
        
  ```diff
  - --brand-text-size-800: 4rem;
  + --brand-text-size-800: 3rem;
  ```
        
  ```diff
  - --brand-text-size-700: 3rem;
  + --brand-text-size-700: 2.5rem;
  ```
        
  ```diff
  - --brand-text-size-600: 2.5rem;
  + --brand-text-size-600: 2.125rem;
  ```
        
  ```diff
  - --brand-text-size-500: 2rem;
  + --brand-text-size-500: 1.75rem;
  ```
        
  ```diff
  - --brand-text-size-400: 1.5rem;
  + --brand-text-size-400: 1.375rem;
  ```
        
  ```diff
  + --brand-text-subhead-weight-large: 500;
  ```
        
  ```diff
  + --brand-text-subhead-size-large: 1.25rem;
  ```
        
  ```diff
  + --brand-text-codeInline-size: 0.9285em;
  ```
        
  ```diff
  + --brand-text-codeBlock-lineHeight: 1.5385;
  ```
        
  ```diff
  + --brand-text-codeBlock-size: 0.8125rem;
  ```
        
  ```diff
  + --brand-text-caption-lineHeight: 1.3333;
  ```
        
  ```diff
  + --brand-text-caption-size: 0.75rem;
  ```
        
  ```diff
  + --brand-text-body-lineHeight-small: 1.6666;
  ```
        
  ```diff
  + --brand-text-body-lineHeight-medium: 1.4285;
  ```
        
  ```diff
  + --brand-text-body-lineHeight-large: 1.5;
  ```
        
  ```diff
  + --brand-text-body-size-small: 0.75rem;
  ```
        
  ```diff
  + --brand-text-body-size-medium: 0.875rem;
  ```
        
  ```diff
  + --brand-text-body-size-large: 1rem;
  ```
        
  ```diff
  + --brand-text-subtitle-lineHeight: 1.6;
  ```
        
  ```diff
  + --brand-text-subtitle-size: 1.25rem;
  ```
        
  ```diff
  + --brand-text-title-lineHeight-small: 1.5;
  ```
        
  ```diff
  + --brand-text-title-lineHeight-medium: 1.6;
  ```
        
  ```diff
  + --brand-text-title-lineHeight-large: 1.5;
  ```
        
  ```diff
  + --brand-text-title-size-small: 1rem;
  ```
        
  ```diff
  + --brand-text-title-size-medium: 1.25rem;
  ```
        
  ```diff
  + --brand-text-title-size-large: 2rem;
  ```
        
  ```diff
  + --brand-text-display-lineHeight: 1.4;
  ```
        
  ```diff
  + --brand-text-display-size: 2.5rem;
  ```
        
  ```diff
  + --brand-text-display-lineBoxHeight: 1.4;
  ```
        
  ```diff
  + --brand-fontStack-sansSerifDisplay: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  ```
        
  ```diff
  - --brand-fontStack-sansSerif: 'Mona Sans', 'MonaSansFallback', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  + --brand-fontStack-sansSerif: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  ```
        
  ```diff
  - --brand-fontStack-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  + --brand-fontStack-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  ```
        
  ```diff
  + --brand-text-codeInline-weight: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-codeBlock-weight: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-caption-weight: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-body-weight: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-subtitle-weight: var(--base-text-weight-normal);
  ```
        
  ```diff
  + --brand-text-title-weight-small: var(--base-text-weight-semibold);
  ```
        
  ```diff
  + --brand-text-title-weight-medium: var(--base-text-weight-semibold);
  ```
        
  ```diff
  + --brand-text-title-weight-large: var(--base-text-weight-semibold);
  ```
        
  ```diff
  + --brand-text-display-weight: var(--base-text-weight-medium);
  ```
        
  ```diff
  + --brand-text-codeInline-shorthand: var(--brand-text-codeInline-weight) var(--brand-text-codeInline-size) var(--brand-fontStack-monospace);
  ```
        
  ```diff
  + --brand-text-codeBlock-shorthand: var(--brand-text-codeBlock-weight) var(--brand-text-codeBlock-size)/var(--brand-text-codeBlock-lineHeight) var(--brand-fontStack-monospace);
  ```
        
  ```diff
  + --brand-text-caption-shorthand: var(--brand-text-caption-weight) var(--brand-text-caption-size)/var(--brand-text-caption-lineHeight) var(--brand-fontStack-sansSerif);
  ```
        
  ```diff
  + --brand-text-body-shorthand-small: var(--brand-text-body-weight) var(--brand-text-body-size-small)/var(--brand-text-body-lineHeight-small) var(--brand-fontStack-sansSerif);
  ```
        
  ```diff
  + --brand-text-body-shorthand-medium: var(--brand-text-body-weight) var(--brand-text-body-size-medium)/var(--brand-text-body-lineHeight-medium) var(--brand-fontStack-sansSerif);
  ```
        
  ```diff
  + --brand-text-body-shorthand-large: var(--brand-text-body-weight) var(--brand-text-body-size-large)/var(--brand-text-body-lineHeight-large) var(--brand-fontStack-sansSerif);
  ```
        
  ```diff
  + --brand-text-subtitle-shorthand: var(--brand-text-subtitle-weight) var(--brand-text-subtitle-size)/var(--brand-text-subtitle-lineHeight) var(--brand-fontStack-sansSerifDisplay);
  ```
        
  ```diff
  + --brand-text-title-shorthand-small: var(--brand-text-title-weight-small) var(--brand-text-title-size-small)/var(--brand-text-title-lineHeight-small) var(--brand-fontStack-sansSerif);
  ```
        
  ```diff
  + --brand-text-title-shorthand-medium: var(--brand-text-title-weight-medium) var(--brand-text-title-size-medium)/var(--brand-text-title-lineHeight-medium) var(--brand-fontStack-sansSerifDisplay);
  ```
        
  ```diff
  + --brand-text-title-shorthand-large: var(--brand-text-title-weight-large) var(--brand-text-title-size-large)/var(--brand-text-title-lineHeight-large) var(--brand-fontStack-sansSerifDisplay);
  ```
        
  ```diff
  + --brand-text-display-shorthand: var(--brand-text-display-weight) var(--brand-text-display-size)/var(--brand-text-display-lineHeight) var(--brand-fontStack-sansSerifDisplay);
  ```


</details>
