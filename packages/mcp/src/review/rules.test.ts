import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'

import type {Catalog} from '../catalog/types.js'
import {makeCatalog} from '../test-utils/catalog.js'
import {allRules, brandComponentsUsed} from './rules.js'
import type {Finding} from './types.js'

function review(code: string, catalog: Catalog = makeCatalog()): Finding[] {
  return allRules.flatMap(rule => rule.run(code, catalog))
}

const errorsOf = (findings: Finding[]): Finding[] => findings.filter(finding => finding.severity === 'error')
const ruleIds = (findings: Finding[]): string[] => findings.map(finding => finding.rule)

describe('primer_brand_review rules', () => {
  it('flags an invented sub-component', () => {
    const findings = review('<Hero><Hero.Title>Hi</Hero.Title></Hero>')
    expect(ruleIds(findings)).toContain('unknown-subcomponent')
    expect(errorsOf(findings)).toHaveLength(1)
  })

  it('flags an invalid enum prop value', () => {
    const findings = review('<Hero align="middle">x</Hero>')
    const finding = findings.find(entry => entry.rule === 'invalid-prop-value')
    expect(finding).toBeDefined()
    expect(finding?.message).toContain('start')
  })

  it('does not validate subcomponent props against the root component enum', () => {
    const findings = review('<Hero.PrimaryAction variant="primary">Build</Hero.PrimaryAction>')
    expect(ruleIds(findings)).not.toContain('invalid-prop-value')
  })

  it('flags align="center" on the gridline-expressive Hero variant', () => {
    const ids = ruleIds(
      review('<Hero variant="gridline-expressive" align="center"><Hero.Heading>Hi</Hero.Heading></Hero>'),
    )
    expect(ids).toContain('invalid-prop-combination')
  })

  it('allows the gridline-expressive Hero variant with the default start alignment', () => {
    const ids = ruleIds(
      review('<Hero variant="gridline-expressive" align="start"><Hero.Heading>Hi</Hero.Heading></Hero>'),
    )
    expect(ids).not.toContain('invalid-prop-combination')
  })

  it('flags align="end" on the gridline River variant', () => {
    const ids = ruleIds(review('<River variant="gridline" align="end"><River.Content>Hi</River.Content></River>'))
    expect(ids).toContain('invalid-prop-combination')
  })

  it.each([
    '<River variant="gridline" align="start"><River.Content>Hi</River.Content></River>',
    '<River variant="gridline"><River.Content>Hi</River.Content></River>',
  ])('allows a gridline River with start or default alignment: %s', code => {
    expect(ruleIds(review(code))).not.toContain('invalid-prop-combination')
  })

  it('flags a balanced CTABanner without a direct image child', () => {
    const findings = review('<CTABanner variant="balanced"><CTABanner.Heading>Build</CTABanner.Heading></CTABanner>')
    expect(ruleIds(findings)).toContain('balanced-cta-image')
    expect(errorsOf(findings)).toHaveLength(1)
  })

  it('allows a balanced CTABanner with its required direct image child', () => {
    const findings = review(
      '<CTABanner variant="balanced"><CTABanner.Heading>Build</CTABanner.Heading><CTABanner.Image src={image} alt="" /></CTABanner>',
    )
    expect(ruleIds(findings)).not.toContain('balanced-cta-image')
  })

  it('flags a Hero with no visual media', () => {
    expect(ruleIds(review('<Hero><Hero.Heading>Build</Hero.Heading></Hero>'))).toContain('hero-requires-media')
  })

  it.each([
    '<Hero><Hero.Heading>Build</Hero.Heading><Hero.Image src={image} alt="Product UI" /></Hero>',
    '<Hero><Hero.Heading>Build</Hero.Heading><Hero.Video src={video} /></Hero>',
    "import heroDither from './dither.png'\nimport heroShot from './shot-checks.png'\n<Hero><Hero.Heading>Build</Hero.Heading></Hero><div style={{backgroundImage: `url(${heroDither})`}}><img src={heroShot} alt=\"Product UI\" /></div>",
  ])('allows a Hero with visual media: %s', code => {
    expect(ruleIds(review(code))).not.toContain('hero-requires-media')
  })

  it('flags product UI rendered directly in Hero.Image without dither', () => {
    const code =
      'import securityOverview from "./security-overview.svg"\n<Hero><Hero.Image src={securityOverview} alt="Security dashboard" /></Hero>'
    expect(ruleIds(review(code))).toContain('product-shot-needs-dither')
  })

  it('flags product UI rendered directly in River.Visual without dither', () => {
    const code =
      'import securityOverview from "./security-overview.svg"\n<River.Visual><img src={securityOverview} alt="Security dashboard" /></River.Visual>'
    expect(ruleIds(review(code))).toContain('product-shot-needs-dither')
  })

  it('allows a product shot layered over a dither background', () => {
    const code =
      'import securityOverview from "./security-overview.svg"\nimport heroDither from "./hero-dither.png"\n<Hero><Hero.Heading>Security</Hero.Heading></Hero><div style={{backgroundImage: `url(${heroDither})`}}><img src={securityOverview} alt="Security dashboard" /></div>'
    expect(ruleIds(review(code))).not.toContain('product-shot-needs-dither')
  })

  it('does not flag decorative media when only an unrelated attribute contains a product word', () => {
    const code =
      'import abstractArt from "./abstract.svg"\n<Hero><Hero.Image src={abstractArt} alt="Abstract illustration" className="product-grid" /></Hero>'
    expect(ruleIds(review(code))).not.toContain('product-shot-needs-dither')
  })

  it('does not flag a decorative illustration whose filename contains "overview"', () => {
    const code =
      'import overviewGraphic from "./overview-illustration.svg"\n<River.Visual><img src={overviewGraphic} alt="Section illustration" /></River.Visual>'
    expect(ruleIds(review(code))).not.toContain('product-shot-needs-dither')
  })

  it('flags product UI detected from the src binding name', () => {
    const code = 'import productShot from "./hero-2.png"\n<Hero><Hero.Image src={productShot} alt="" /></Hero>'
    expect(ruleIds(review(code))).toContain('product-shot-needs-dither')
  })

  it('flags the archived Advanced Security Hero product shot (exact source)', () => {
    const code =
      'import securityOverview from "./security-overview.svg"\n<Hero.Image src={securityOverview} alt="GitHub security overview showing code scanning alerts, blocked secrets, and autofix acceptance" />'
    expect(ruleIds(review(code))).toContain('product-shot-needs-dither')
  })

  it('flags a bare River product shot even when another Hero shot is correctly dithered', () => {
    const code = [
      'import heroDither from "./hero-dither.png"',
      'import securityOverview from "./security-overview.svg"',
      'import consoleShot from "./console.svg"',
      '<Hero>',
      '  <Hero.Heading>Security</Hero.Heading>',
      '  <div style={{backgroundImage: `url(${heroDither})`}}>',
      '    <img src={securityOverview} alt="Security overview with code scanning alerts" />',
      '  </div>',
      '</Hero>',
      '<River>',
      '  <River.Visual>',
      '    <img src={consoleShot} alt="Console dashboard showing secret scanning" />',
      '  </River.Visual>',
      '</River>',
    ].join('\n')
    const productShotFindings = review(code).filter(finding => finding.rule === 'product-shot-needs-dither')
    expect(productShotFindings).toHaveLength(1)
    expect(productShotFindings[0]?.evidence).toContain('consoleShot')
  })

  it('treats a CSS Module class that paints dither as a covered background', () => {
    const code =
      'import styles from "./Hero.module.css"\nimport productShot from "./dashboard.png"\n<div className={styles.mediaBand}><img src={productShot} alt="Product dashboard" /></div>\n.mediaBand { background-image: url("./hero-dither.png"); }'
    expect(ruleIds(review(code))).not.toContain('product-shot-needs-dither')
  })

  it.each([
    'import heroDither from \'./assets/hero-dither.png\'\n<Hero.Image src={heroDither} alt="" />',
    'const riverDither = asset\n<River.Visual><img src={riverDither} alt="" /></River.Visual>',
  ])('flags dither rendered as image content: %s', code => {
    const findings = review(code)
    expect(ruleIds(findings)).toContain('dither-as-image')
    expect(findings.filter(finding => finding.rule === 'dither-as-image')).toHaveLength(1)
  })

  it('allows dither as a background behind a separate product shot', () => {
    const code =
      'import heroDither from \'./assets/hero-dither.png\'\n<div style={{backgroundImage: `url(${heroDither})`}}><img src={productShot} alt="Product UI" /></div>'
    expect(ruleIds(review(code))).not.toContain('dither-as-image')
  })

  it('accepts valid, on-brand usage with no errors', () => {
    const findings = review('<Hero align="center"><Hero.Heading>Build</Hero.Heading></Hero>')
    expect(errorsOf(findings)).toHaveLength(0)
  })

  it('flags hardcoded hex and px', () => {
    const ids = ruleIds(review('const s = {color: "#ff0000", padding: "24px"}'))
    expect(ids).toContain('hardcoded-hex')
    expect(ids).toContain('hardcoded-px')
  })

  it('flags hardcoded px including 1px/2px border widths, but not 0px', () => {
    expect(ruleIds(review('const s = {gap: "8px"}'))).toContain('hardcoded-px')
    expect(ruleIds(review('const s = {borderWidth: "1px"}'))).toContain('hardcoded-px')
    expect(ruleIds(review('const s = {borderWidth: "2px"}'))).toContain('hardcoded-px')
    expect(ruleIds(review('const s = {inset: "0px"}'))).not.toContain('hardcoded-px')
  })

  it('flags raw card divs and placeholder copy', () => {
    const ids = ruleIds(review('<div className="card">lorem ipsum dolor</div>'))
    expect(ids).toContain('raw-card-div')
    expect(ids).toContain('placeholder-copy')
  })

  it('allows a semantic form wrapper but flags raw form controls', () => {
    expect(ruleIds(review('<form><FormControl /></form>'))).not.toContain('raw-form-elements')
    expect(ruleIds(review('<form><input name="email" /></form>'))).toContain('raw-form-elements')
  })

  it('flags off-brand tells: pill radius and purple gradient', () => {
    expect(ruleIds(review('<a style={{borderRadius: "9999px"}}>x</a>'))).toContain('pill-button')
    expect(ruleIds(review('.hero{background: linear-gradient(90deg, purple, #4f46e5)}'))).toContain(
      'off-brand-gradient',
    )
  })

  it('flags a Heading with no explicit size (as does not set visual size)', () => {
    expect(ruleIds(review('<Heading as="h3">Welcome breakfast and check-in</Heading>'))).toContain(
      'heading-explicit-size',
    )
  })

  it('does not flag a sized Heading or a sub-component heading', () => {
    expect(ruleIds(review('<Heading as="h3" size="5">Sized</Heading>'))).not.toContain('heading-explicit-size')
    expect(ruleIds(review('<Hero><Hero.Heading>Big</Hero.Heading></Hero>'))).not.toContain('heading-explicit-size')
  })

  it('reports which approved brand components were imported', () => {
    const used = brandComponentsUsed("import {Hero, CTABanner} from '@primer/react-brand'", makeCatalog())
    expect(used.map(component => component.name).sort()).toEqual(['CTABanner', 'Hero'])
  })

  it('recognizes brand components imported from the /esm subpath', () => {
    const used = brandComponentsUsed("import {Hero} from '@primer/react-brand/esm'", makeCatalog())
    expect(used.map(component => component.name)).toEqual(['Hero'])
  })
})

// Self-referential guard: the design system's own canonical examples must pass review with no
// errors. A failure here means a rule produces false positives against known-correct code.
describe('primer_brand_review over generated canonical examples', () => {
  const catalogPath = fileURLToPath(new URL('../../dist/catalog.json', import.meta.url))
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8')) as Catalog
  const examples = [
    ...catalog.components.flatMap(component =>
      component.examples
        .filter(example => example.code)
        .map(example => ({name: component.name, code: example.code as string})),
    ),
    ...catalog.recipes.map(recipe => ({name: recipe.name, code: recipe.source})),
  ]

  it('includes object-assigned subcomponents separated by comments', () => {
    const hero = catalog.components.find(component => component.name === 'Hero')
    expect(hero?.subcomponents).toEqual(
      expect.arrayContaining(['Hero.ButtonGroup', 'Hero.PrimaryAction', 'Hero.SecondaryAction']),
    )
  })

  it('does not recommend deprecated Hero action subcomponents', () => {
    for (const example of examples) {
      const deprecatedActions = example.code.match(/<Hero\.(?:PrimaryAction|SecondaryAction)\b/g) ?? []
      expect({component: example.name, deprecatedActions}).toEqual({component: example.name, deprecatedActions: []})
    }
  })

  it('produces no errors on any catalog example', () => {
    expect(examples.length).toBeGreaterThan(0)
    for (const example of examples) {
      const errors = errorsOf(allRules.flatMap(rule => rule.run(example.code, catalog)))
      expect({component: example.name, errors}).toEqual({component: example.name, errors: []})
    }
  })
})
