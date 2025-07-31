---
'@primer/react-brand': patch
---

Fix layout shift in the `PricingOptions` feature list accordion

The feature lists now respect their explicit `expanded` prop values on the initial render, and no longer apply default animations. This prevents layout shift in certain SSR contexts where the component was incorrectly relying on the client-side `window` size even when explicitly passed `expanded={true}` or `expanded={false}`, which shouldn't depend on viewport size.
