/**
 * compares the bundle sizes of the main branch and current feature branch, then outputs a markdown report
 * npm run size-report
 */
/* eslint-disable github/unescaped-html-literal */
import {readFileSync} from 'node:fs'

const [prPath, mainPath] = process.argv.slice(2)

const prSizes = JSON.parse(readFileSync(prPath, 'utf8'))
const mainSizes = JSON.parse(readFileSync(mainPath, 'utf8'))

const mainMap = new Map(mainSizes.map(e => [e.name, e.size]))

const KB = 1024
const MB = KB * KB
const formatted = b => (b >= MB ? `${(b / MB).toFixed(2)} MB` : b >= KB ? `${(b / KB).toFixed(2)} kB` : `${b} B`)

const rows = prSizes.map(entry => {
  const mainSize = mainMap.get(entry.name) ?? 0
  const prSize = entry.size
  const diff = prSize - mainSize
  const hasDiff = diff !== 0
  const isIncrease = diff > 0
  const percentage = mainSize > 0 ? Math.abs((diff / mainSize) * 100).toFixed(1) : '0.0'
  const sign = isIncrease ? '+' : '-'
  const formattedDiff = `${sign}${formatted(Math.abs(diff))} (${sign}${percentage}%)`
  const change = !hasDiff ? '✅ No change' : isIncrease ? `⚠️ ${formattedDiff}` : `✅ ${formattedDiff}`

  return `      <tr><td>${entry.name}</td><td>${formatted(mainSize)}</td><td>${formatted(
    prSize,
  )}</td><td>${change}</td></tr>`
})

const body = [
  '<h2>📦 Bundle size report</h2>',
  '<table>',
  '  <thead>',
  '    <tr><th>Check</th><th>Main</th><th>PR</th><th>Change</th></tr>',
  '  </thead>',
  '  <tbody>',
  ...rows,
  '  </tbody>',
  '</table>',
].join('\n')

process.stdout.write(body)
