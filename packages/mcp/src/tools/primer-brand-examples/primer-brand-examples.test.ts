import {makeContext} from '../../test-utils/catalog.js'
import {primerBrandExamplesTool} from './primer-brand-examples.js'

describe('primer_brand_examples', () => {
  it('falls back to the default foundational set when nothing matches the goal', async () => {
    const result = await primerBrandExamplesTool.run({goal: 'zzzz nonexistent zzzz'}, makeContext())
    expect(result.isError).toBeFalsy()
    expect(result.text.toLowerCase()).toContain('default')
    expect(result.text).toContain('Hero')
    expect(result.text.toLowerCase()).toContain('adapt')
  })

  it('ranks examples by goal', async () => {
    const result = await primerBrandExamplesTool.run({goal: 'pricing'}, makeContext())
    expect(result.text).toContain('PricingOptions')
  })

  it('matches on docs keywords, not just the name and description', async () => {
    // "billing" appears only in PricingOptions' keywords — not its name or description.
    const result = await primerBrandExamplesTool.run({goal: 'billing'}, makeContext())
    expect(result.text).toContain('PricingOptions')
    expect(result.text.toLowerCase()).not.toContain('default')
  })

  it('never emits a stub block for a component that has no example', async () => {
    const result = await primerBrandExamplesTool.run({goal: 'zzzz nonexistent zzzz'}, makeContext())
    expect(result.text).not.toContain('### Stack')
  })

  it('leads page-level goals with the closest full-page template', async () => {
    const result = await primerBrandExamplesTool.run({goal: 'category page'}, makeContext())
    expect(result.text).toContain('Full-page template')
    expect(result.text).toContain('category landing page')
    // Other matching templates are surfaced by name so the agent knows the full set.
    expect(result.text).toContain('Other full-page templates')
  })

  it('does not inject a full-page template for a component-level goal', async () => {
    const result = await primerBrandExamplesTool.run({goal: 'pricing'}, makeContext())
    expect(result.text).not.toContain('Full-page template')
  })
})
