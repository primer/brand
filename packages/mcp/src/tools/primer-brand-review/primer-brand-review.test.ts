import {makeContext} from '../../test-support/catalog.js'
import {primerBrandReviewTool} from './primer-brand-review.js'

describe('primer_brand_review', () => {
  it('reminds the agent to include CSS when given JSX only', async () => {
    const code = `import {Hero} from '@primer/react-brand'\n<Hero><Hero.Heading>Ship faster</Hero.Heading></Hero>`
    const result = await primerBrandReviewTool.run({code}, makeContext())
    expect(result.text).toContain('Include your CSS')
  })

  it('does not remind when a stylesheet is included, and reviews the CSS', async () => {
    const code = `<Hero><Hero.Heading>Ship faster</Hero.Heading></Hero>\n.hero { padding: 24px; }`
    const result = await primerBrandReviewTool.run({code}, makeContext())
    expect(result.text).not.toContain('Include your CSS')
    // The hardcoded px lives in the CSS — the full-output review must catch it.
    expect(result.text).toContain('24px')
  })

  it('flags raw HTML elements in the full output', async () => {
    const code = `<form><input type="email" /></form>\n.field { margin: 12px; }`
    const result = await primerBrandReviewTool.run({code}, makeContext())
    expect(result.text.toLowerCase()).toContain('raw')
  })
})
