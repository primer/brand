import {mkdtempSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {delimiter, join} from 'node:path'

import {detectAssetGenerator} from './detect-asset-generator.js'

describe('detectAssetGenerator', () => {
  const emptyDir = (): string => {
    return mkdtempSync(join(tmpdir(), 'primer-brand-mcp-ag-'))
  }

  const dirWithBin = (name: string): string => {
    const dir = emptyDir()
    writeFileSync(join(dir, name), '')
    return dir
  }

  it('is available when asset-generator-mcp is on PATH', () => {
    expect(detectAssetGenerator({PATH: dirWithBin('asset-generator-mcp')}).available).toBe(true)
  })

  it('is not available when the binary is absent from PATH', () => {
    expect(detectAssetGenerator({PATH: emptyDir()}).available).toBe(false)
  })

  it('is not available when PATH is unset', () => {
    expect(detectAssetGenerator({}).available).toBe(false)
  })

  it('scans every PATH entry', () => {
    const path = `${emptyDir()}${delimiter}${dirWithBin('asset-generator-mcp')}`
    expect(detectAssetGenerator({PATH: path}).available).toBe(true)
  })

  it('finds a Windows shim via PATHEXT', () => {
    const dir = dirWithBin('asset-generator-mcp.cmd')
    expect(detectAssetGenerator({PATH: dir, PATHEXT: '.COM;.EXE;.CMD'}).available).toBe(true)
  })
})
