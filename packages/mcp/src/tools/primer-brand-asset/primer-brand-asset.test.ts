import {makeContext} from '../../test-support/catalog.js'
import {primerBrandAssetTool} from './primer-brand-asset.js'

describe('primer_brand_asset', () => {
  it('finds an icon by query and emits an import statement', async () => {
    const result = await primerBrandAssetTool.run({query: 'arrow', limit: 12}, makeContext())
    expect(result.text).toContain('ArrowRightIcon')
    expect(result.text).toContain('@primer/octicons-react')
  })

  it('filters by kind', async () => {
    const result = await primerBrandAssetTool.run({query: 'copilot', kind: 'illustration', limit: 12}, makeContext())
    expect(result.text).toContain('CopilotIcon')
    expect(result.text).not.toContain('ShieldIcon')
  })

  it('notes when assets are resolved from the installed packages', async () => {
    const result = await primerBrandAssetTool.run({query: 'arrow', limit: 12}, makeContext({assetsOrigin: 'installed'}))
    expect(result.text.toLowerCase()).toContain('installed')
  })
})
