import {existsSync, readFileSync} from 'node:fs'
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
  const hasCatalog = existsSync(catalogPath)
  const testOrSkip = hasCatalog ? it : it.skip

  testOrSkip('produces no errors on any catalog example', () => {
    const catalog = JSON.parse(readFileSync(catalogPath, 'utf8')) as Catalog
    const examples = catalog.components.flatMap(component =>
      component.examples
        .filter(example => example.code)
        .map(example => ({name: component.name, code: example.code as string})),
    )
    expect(examples.length).toBeGreaterThan(0)
    for (const example of examples) {
      const errors = errorsOf(allRules.flatMap(rule => rule.run(example.code, catalog)))
      expect({component: example.name, errors}).toEqual({component: example.name, errors: []})
    }
  })
})
