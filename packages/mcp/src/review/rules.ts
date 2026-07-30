import type {Catalog, CatalogComponent} from '../catalog/types.js'
import {escapeRegExp} from '../util/text.js'
import {type Finding, type Rule, evidence} from './types.js'

/**
 * The review rule set. Each rule is intentionally narrow and grounded in the catalog or in
 * Primer Brand's published taste, so findings are objective ("this prop value is not allowed",
 * "this is a retired GitHub style") rather than subjective. The set mirrors the brand checks
 * an on-brand GitHub page is graded against: real components over raw HTML, design tokens over
 * hardcoded values, and avoidance of well-known off-brand visual "tells".
 */

const componentUsage = (code: string, name: string): RegExpMatchArray[] => [
  ...code.matchAll(new RegExp(`<${escapeRegExp(name)}\\b(?!\\.)[^>]*>`, 'g')),
]

/** `<Hero.Heading>` style usages of `Root.Sub`. */
const unknownSubcomponents: Rule = {
  id: 'unknown-subcomponent',
  run(code, catalog) {
    const byName = new Map(catalog.components.map(component => [component.name, component]))
    const findings: Finding[] = []
    const seen = new Set<string>()
    for (const match of code.matchAll(/<([A-Z][A-Za-z0-9]*)\.([A-Z][A-Za-z0-9]*)/g)) {
      const root = match[1]
      const sub = match[2]
      if (!root || !sub) continue
      const component = byName.get(root)
      if (!component) continue
      const qualified = `${root}.${sub}`
      if (component.subcomponents.includes(qualified) || seen.has(qualified)) continue
      seen.add(qualified)
      const known = component.subcomponents.length
        ? ` Known sub-components: ${component.subcomponents.join(', ')}.`
        : ''
      findings.push({
        severity: 'error',
        rule: this.id,
        message: `\`${qualified}\` is not a sub-component of \`${root}\`.${known}`,
        evidence: evidence(match[0]),
      })
    }
    return findings
  },
}

/** `<Hero variant="fancy">` where the prop is an enum with a fixed value set. */
const invalidPropValue: Rule = {
  id: 'invalid-prop-value',
  run(code, catalog) {
    const findings: Finding[] = []
    for (const component of catalog.components) {
      const enums = component.props.filter(prop => prop.enum && prop.enum.length > 0)
      if (enums.length === 0) continue
      for (const usage of componentUsage(code, component.name)) {
        for (const prop of enums) {
          const re = new RegExp(`\\b${escapeRegExp(prop.name)}=["']([^"']+)["']`, 'g')
          for (const attr of usage[0].matchAll(re)) {
            const value = attr[1]
            if (value && !prop.enum?.includes(value)) {
              findings.push({
                severity: 'error',
                rule: this.id,
                message: `\`${component.name}\` prop \`${
                  prop.name
                }\` does not accept \`"${value}"\`. Allowed: ${prop.enum?.map(v => `\`${v}\``).join(', ')}.`,
                evidence: evidence(usage[0]),
              })
            }
          }
        }
      }
    }
    return findings
  },
}

/**
 * Sometimes certain prop combinations shouldn't be used together, but we don't prevent it through the API.
 * This is less an issue for human users, as they will rarely discover these combos. Agents however, are great
 * at finding these awkward combos. We use a map here to add these to our MCP server, with hope that
 * agents will invoke these automatically and stop using them.
 */
type PropCombinationConstraint = {
  component: string
  when: {prop: string; value: string}
  disallow: {prop: string; value: string}
  message: string
}

const invalidPropComboMap: PropCombinationConstraint[] = [
  // prevent align="center" + variant="gridline-expressive" beig used in Hero
  {
    component: 'Hero',
    when: {prop: 'variant', value: 'gridline-expressive'},
    disallow: {prop: 'align', value: 'center'},
    message:
      'The `Hero` `gridline-expressive` variant is always start-aligned; `align="center"` is unsupported and will be ignored — remove it (the default `align="start"` is correct).',
  },
  {
    component: 'River',
    when: {prop: 'variant', value: 'gridline'},
    disallow: {prop: 'align', value: 'end'},
    message:
      'The `River` `gridline` variant must use a consistent start alignment; remove `align="end"` (the default `align="start"` is correct).',
  },
]

const invalidPropCombination: Rule = {
  id: 'invalid-prop-combination',
  run(code) {
    const hasAttribute = (tag: string, prop: string, value: string): boolean =>
      new RegExp(`\\b${escapeRegExp(prop)}=["']${escapeRegExp(value)}["']`).test(tag)

    const findings: Finding[] = []
    for (const constraint of invalidPropComboMap) {
      for (const usage of componentUsage(code, constraint.component)) {
        const tag = usage[0]
        if (
          hasAttribute(tag, constraint.when.prop, constraint.when.value) &&
          hasAttribute(tag, constraint.disallow.prop, constraint.disallow.value)
        ) {
          findings.push({severity: 'error', rule: this.id, message: constraint.message, evidence: evidence(tag)})
        }
      }
    }
    return findings
  },
}

/** Only permit balanced CTABanners when an image is present */
const balancedCtaRequiresImage: Rule = {
  id: 'balanced-cta-image',
  run(code) {
    const findings: Finding[] = []
    const balancedCta = /<CTABanner\b(?=[^>]*\bvariant=["']balanced["'])[^>]*>([\s\S]*?)<\/CTABanner>/g
    for (const match of code.matchAll(balancedCta)) {
      if (/<CTABanner\.Image\b/.test(match[1] ?? '')) continue
      findings.push({
        severity: 'error',
        rule: this.id,
        message:
          '`CTABanner variant="balanced"` requires a direct `CTABanner.Image` child for its two-column layout. Use the default centered banner when there is no media.',
        evidence: evidence(match[0]),
      })
    }
    return findings
  },
}

/** Heroes require visual media unless the brief explicitly says otherwise. */
const heroRequiresMedia: Rule = {
  id: 'hero-requires-media',
  requiresAssetGenerator: true,
  run(code) {
    const hasLayeredProductMedia =
      /dither/i.test(code) &&
      /(?:product[-_ ]?(?:shot|image)|(?:hero|product)Shot|shot[-_])/i.test(code) &&
      /background(?:-image|Image)/i.test(code)
    const findings: Finding[] = []
    for (const match of code.matchAll(/<Hero\b[^>]*>([\s\S]*?)<\/Hero>/g)) {
      if (/<Hero\.(?:Image|Video)\b/.test(match[1] ?? '') || hasLayeredProductMedia) continue
      findings.push({
        severity: 'warning',
        rule: this.id,
        message:
          'This Hero has no visual media. Heroes require `Hero.Image`, `Hero.Video`, or a deliberate full-width dither background with a separate product-shot foreground unless the brief explicitly asks for text only.',
        evidence: evidence(match[0]),
      })
    }
    return findings
  },
}

/** Product-looking media must use the required dither background treatment. */
const productShotNeedsDither: Rule = {
  id: 'product-shot-needs-dither',
  run(code) {
    // Words that mean "this is real product UI" — layout bits plus GitHub feature names.
    const productToken =
      /product[-_ ]?(?:shot|ui|screenshot)|screenshot|dashboard|console|panel|editor|settings|mockup|ui[-_]?shot|app[-_ ]?(?:ui|screenshot)|security|code[-_ ]?scanning|scanning|secrets?|\balerts?\b|autofix|dependabot|codeql|vulnerabilit|pull[-_ ]?request/i

    // ...and the giveaways that it's just decoration. This is what keeps security-overview.svg
    // (product) apart from overview-illustration.svg (decorative).
    const decorativeToken =
      /illustration|illustrative|abstract|wallpaper|pattern|decorative|texture|gradient|\blogo\b|logomark|\bicon\b|avatar|headshot/i

    // Remember each import's path so we can peek at the filename later.
    const importPath = new Map<string, string>()
    for (const match of code.matchAll(/import\s+([A-Za-z_$][\w$]*)\s+from\s+['"]([^'"]+)['"]/gi)) {
      const [, binding, path] = match
      if (binding && path !== undefined) importPath.set(binding, path)
    }

    // CSS classes that paint dither, so a CSS Module wrapper counts too — not just inline styles.
    const ditherClasses = new Set<string>()
    for (const match of code.matchAll(/\.(-?[A-Za-z_][\w-]*)\s*\{([^}]*)\}/g)) {
      const [, cls, body] = match
      if (cls && body && /background/i.test(body) && /dither/i.test(body)) ditherClasses.add(cls)
    }

    const openTagPaintsDither = (openTag: string): boolean => {
      if (/background(?:-image|Image)/.test(openTag) && /dither/i.test(openTag)) return true
      const classMatch = openTag.match(/class(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})/)
      const classValue = classMatch?.[1] ?? classMatch?.[2] ?? classMatch?.[3] ?? ''
      if (!classValue) return false
      if (/dither/i.test(classValue)) return true
      return [...ditherClasses].some(cls => new RegExp(`\\b${escapeRegExp(cls)}\\b`).test(classValue))
    }

    // Walk the tags once and jot down where each dither wrapper starts and ends.
    const voidElement = /^(?:img|source|br|input|hr|area|col|embed|track|wbr|meta|link)$/i
    const ditherRanges: Array<[number, number]> = []
    const openWrappers: Array<{dither: boolean; start: number}> = []
    for (const match of code.matchAll(/<(\/?)([A-Za-z][\w.]*)\b[^>]*?(\/?)>/g)) {
      const [, closing, name, selfClose] = match
      if (selfClose === '/' || (name !== undefined && voidElement.test(name))) continue
      if (closing === '/') {
        const opened = openWrappers.pop()
        if (opened?.dither) ditherRanges.push([opened.start, match.index + match[0].length])
      } else {
        openWrappers.push({dither: openTagPaintsDither(match[0]), start: match.index})
      }
    }
    // Never closed? Treat it as covering everything after it.
    for (const opened of openWrappers) {
      if (opened.dither) ditherRanges.push([opened.start, code.length])
    }
    const insideDitherWrapper = (index: number): boolean =>
      ditherRanges.some(([start, end]) => index > start && index < end)

    const altText = (tag: string): string => tag.match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1] ?? ''
    const srcBinding = (tag: string): string => tag.match(/\bsrc\s*=\s*\{([A-Za-z_$][\w$]*)\}/)?.[1] ?? ''
    const srcLiteral = (tag: string): string => tag.match(/\bsrc\s*=\s*["']([^"']*)["']/i)?.[1] ?? ''

    const findings: Finding[] = []
    for (const match of code.matchAll(/<(?:Hero\.Image|Image|img|picture)\b[^>]*>/g)) {
      const tag = match[0]
      const binding = srcBinding(tag)
      // Go on what describes the image — alt, src binding, filename — not stray attrs like className.
      const signals = [altText(tag), binding, importPath.get(binding) ?? '', srcLiteral(tag)]
      const looksLikeProduct = signals.some(signal => productToken.test(signal))
      const isDecorative = signals.some(signal => decorativeToken.test(signal))
      if (!looksLikeProduct || isDecorative) continue
      if (insideDitherWrapper(match.index)) continue
      findings.push({
        severity: 'warning',
        rule: this.id,
        message:
          'Product UI must not use a default/subtle gray media surface. Put the product shot in a contained foreground layer and replace the entire surrounding media background with full-width dither.',
        evidence: evidence(tag),
      })
    }
    return findings
  },
}

/** Dither is supporting background texture, never the image content itself. */
const ditherAsImage: Rule = {
  id: 'dither-as-image',
  run(code) {
    const ditherBindings = new Set<string>()
    for (const match of code.matchAll(/import\s+([A-Za-z_$][\w$]*)\s+from\s+['"][^'"]*dither[^'"]*['"]/gi)) {
      if (match[1]) ditherBindings.add(match[1])
    }

    const findings: Finding[] = []
    for (const match of code.matchAll(/<(?:Hero\.Image|Image|img|source)\b[^>]*>/gi)) {
      const tag = match[0]
      const usesDitherBinding = [...ditherBindings].some(binding =>
        new RegExp(`\\b(?:src|srcSet)\\s*=\\s*\\{[^}]*\\b${escapeRegExp(binding)}\\b`).test(tag),
      )
      if (!/dither/i.test(tag) && !usesDitherBinding) continue
      findings.push({
        severity: 'error',
        rule: this.id,
        message:
          'Dither must never be rendered as image content. Use it only as an edge-to-edge background behind a separate, contained product shot; if no product screenshot is available, omit the dither.',
        evidence: evidence(tag),
      })
    }
    return findings
  },
}

type RawPattern = {
  id: string
  test: RegExp
  message: string
}

const RAW_HTML_PATTERNS: RawPattern[] = [
  {
    id: 'raw-form-elements',
    test: /<(input|select|textarea)\b/i,
    message:
      'Raw form controls detected. Use Primer Brand form components (e.g. `FormControl`, `TextInput`, `Select`).',
  },
  {
    id: 'raw-pricing-table',
    test: /<table\b/i,
    message: 'Raw `<table>` detected. Use `PricingOptions` / `ComparisonTable` instead of a hand-built table.',
  },
  {
    id: 'raw-card-div',
    test: /<div\b[^>]*class(Name)?=["'`][^"'`]*\bcard\b/i,
    message: 'A hand-rolled card `<div className="card">` was detected. Use the Primer Brand `Card` component.',
  },
  {
    id: 'styled-heading',
    test: /<h[1-6]\b[^>]*\b(style|class|className)=/i,
    message: 'A styled raw heading was detected. Use the `Heading` (or `Hero.Heading`) component for type styles.',
  },
]

const rawHtml: Rule = {
  id: 'component-fidelity',
  run(code) {
    const findings: Finding[] = []
    for (const pattern of RAW_HTML_PATTERNS) {
      const match = pattern.test.exec(code)
      if (match) {
        findings.push({severity: 'warning', rule: pattern.id, message: pattern.message, evidence: evidence(match[0])})
      }
    }
    return findings
  },
}

const hardcodedValues: Rule = {
  id: 'token-usage',
  run(code) {
    const findings: Finding[] = []
    const hex = [...new Set([...code.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map(match => match[0]))]
    if (hex.length > 0) {
      findings.push({
        severity: 'warning',
        rule: 'hardcoded-hex',
        message: `Hardcoded hex colors found (${hex
          .slice(0, 4)
          .join(', ')}). Use Primer Brand color tokens — see \`primer_brand_tokens\`.`,
      })
    }

    const px = [...new Set([...code.matchAll(/\b(\d+)px\b/g)].map(match => match[0]))].filter(value => value !== '0px')
    if (px.length > 0) {
      findings.push({
        severity: 'warning',
        rule: 'hardcoded-px',
        message: `Hardcoded pixel sizes found (${px
          .slice(0, 4)
          .join(', ')}). Use size, spacing, or border-width tokens — see \`primer_brand_tokens\`.`,
      })
    }
    return findings
  },
}

/** Statically detectable versions of the off-brand "tells" the visual judge penalizes. */
const OFF_BRAND_TELLS: RawPattern[] = [
  {
    id: 'off-brand-gradient',
    test: /linear-gradient\([^)]*(purple|indigo|violet|#[46-9a-f][0-9a-f]?[0-9a-f]*f)/i,
    message:
      'A purple/indigo gradient is the classic off-brand "SaaS" tell and is penalized hard. Use neutral surfaces with a sparing functional accent.',
  },
  {
    id: 'pill-button',
    test: /border-?radius:\s*['"]?\s*(9999px|50%|100px)/i,
    message:
      'Pill / fully-rounded shapes are off-brand. GitHub uses a modest, consistent corner radius except on Label components.',
  },
  {
    id: 'shadow-and-gradient',
    test: /box-shadow:[^;]+;[\s\S]{0,200}gradient|gradient[\s\S]{0,200}box-shadow:/i,
    message:
      'Combining box-shadow with a gradient is a retired GitHub style. Prefer flat surfaces with thin 1px borders.',
  },
  {
    id: 'glassmorphism',
    test: /backdrop-filter:\s*blur|frosted/i,
    message: 'Glassmorphism / frosted blur is off-brand. Use flat surfaces separated by subtle 1px borders.',
  },
  {
    id: 'placeholder-copy',
    test: /lorem ipsum|your text here|placeholder text/i,
    message: 'Placeholder copy detected. GitHub pages use real, specific, technical copy.',
  },
  {
    id: 'serif-font',
    test: /font-family:\s*[^;]*\bserif\b(?!-)/i,
    message: 'Serif/display fonts are off-brand. GitHub uses Mona Sans / a clean system sans.',
  },
  {
    id: 'heavy-font-weight',
    test: /font-weight:\s*(800|900|bolder)\b/i,
    message: 'Ultra-heavy/black weights are off-brand. Favour regular and medium, with bold for genuine emphasis.',
  },
]

const offBrandTells: Rule = {
  id: 'off-brand-tells',
  run(code) {
    const findings: Finding[] = []
    for (const tell of OFF_BRAND_TELLS) {
      const match = tell.test.exec(code)
      if (match) {
        findings.push({severity: 'warning', rule: tell.id, message: tell.message, evidence: evidence(match[0])})
      }
    }
    return findings
  },
}

/**
 * `<Heading>` derives its visual size from `as` when no `size` is given, and those defaults are
 * often far too big for list items, cards, or body sections. Flag a standalone `Heading` with no explicit `size`; sub-component headings such as
 * `Hero.Heading` carry their own context-appropriate sizing and are intentionally not matched.
 */
const headingExplicitSize: Rule = {
  id: 'heading-explicit-size',
  run(code) {
    for (const match of code.matchAll(/<Heading\b[^>]*>/g)) {
      const tag = match[0]
      // A spread could carry `size`, so don't second-guess it.
      if (/\bsize=/.test(tag) || /\{\.\.\./.test(tag)) continue
      return [
        {
          severity: 'warning',
          rule: this.id,
          message:
            '`Heading` `as` sets the semantic level, not the visual size — without an explicit `size` it renders at display scale, usually too big for list items, cards, or body sections. Set `size` for the context (e.g. `size="5"`, `size="6"`, or `size="subhead-medium"`).',
          evidence: evidence(tag),
        },
      ]
    }
    return []
  },
}

/** Credit for actually importing approved brand components — surfaced as guidance, not a failure. */
export function brandComponentsUsed(code: string, catalog: Catalog): CatalogComponent[] {
  const imported = new Set<string>()
  for (const block of code.matchAll(
    /import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*['"]@primer\/react-brand(?:\/[^'"]+)?['"]/g,
  )) {
    for (const part of (block[1] ?? '').split(',')) {
      const name = part
        .trim()
        .split(/\s+as\s+/)[0]
        ?.trim()
      if (name) imported.add(name)
    }
  }
  return catalog.components.filter(component => imported.has(component.name))
}

export const allRules: Rule[] = [
  unknownSubcomponents,
  invalidPropValue,
  invalidPropCombination,
  balancedCtaRequiresImage,
  heroRequiresMedia,
  productShotNeedsDither,
  ditherAsImage,
  rawHtml,
  hardcodedValues,
  offBrandTells,
  headingExplicitSize,
]
