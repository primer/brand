import {makeContext} from '../../test-utils/catalog.js'
import {primerPageDesignTool} from './primer-brand-page-design.js'

describe('primer_brand_page_design', () => {
  it('returns the bundled page-design guidance', async () => {
    const result = await primerPageDesignTool.run({}, makeContext())
    expect(result.isError).toBeFalsy()
    expect(result.text).toContain('SubdomainNavBar')
    expect(result.text).toContain('gridline')
    expect(result.text).toContain('FlexSuiteAIOverview')
  })
})
