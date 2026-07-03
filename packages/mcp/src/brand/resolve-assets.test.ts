import {resolveInstalledAssets} from './resolve-assets.js'

describe('resolveInstalledAssets', () => {
  it('returns nothing when no asset packages are installed nearby', () => {
    const result = resolveInstalledAssets('/no/such/directory/anywhere')
    expect(result.assets).toEqual([])
    expect(result.sources).toEqual([])
  })

  it('extracts icons from the installed Octicons package, with a version', () => {
    const {assets, sources} = resolveInstalledAssets(process.cwd())
    const icons = assets.filter(asset => asset.kind === 'icon').map(asset => asset.name)
    // there should be lots of icons, including a stable one.
    expect(icons.length).toBeGreaterThan(100)
    expect(icons).toContain('ArrowRightIcon')
    const octicons = sources.find(source => source.module === '@primer/octicons-react')
    expect(octicons?.version).toMatch(/^\d+\.\d+\.\d+/)
  })
})
