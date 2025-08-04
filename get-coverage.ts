#!/usr/bin/env npx tsx

import * as fs from 'fs'
import * as path from 'path'
type FileCoverage = {
  s: Record<string, number> // statements
  f: Record<string, number> // functions
  b: Record<string, number> // branches
}

type CoverageData = {
  [filePath: string]: FileCoverage
}

type ComponentCoverage = {
  component: string
  statements: number
  functions: number
  branches: number
}

function calculateCoverage(coverage: FileCoverage): {statements: number; functions: number; branches: number} {
  const statements = Object.values(coverage.s)
  const functions = Object.values(coverage.f)
  const branches = Object.values(coverage.b).flat()

  const statementsTotal = statements.length
  const statementsCovered = statements.filter(s => s > 0).length
  const statementsPercent = statementsTotal > 0 ? (statementsCovered / statementsTotal) * 100 : 0

  const functionsTotal = functions.length
  const functionsCovered = functions.filter(f => f > 0).length
  const functionsPercent = functionsTotal > 0 ? (functionsCovered / functionsTotal) * 100 : 0

  const branchesTotal = branches.length
  const branchesCovered = branches.filter(b => b > 0).length
  const branchesPercent = branchesTotal > 0 ? (branchesCovered / branchesTotal) * 100 : 0

  return {
    statements: statementsPercent, // Keep full precision
    functions: functionsPercent,
    branches: branchesPercent,
  }
}

function processCoverageData(
  coverageData: CoverageData,
  workspace: string,
  branchPath: string,
): Record<string, ComponentCoverage> {
  const components: Record<string, ComponentCoverage> = {}

  Object.entries(coverageData).forEach(([filePath, coverage]) => {
    // Only include .tsx files (components), skip test files and stories
    if (filePath.includes('.tsx') && !filePath.includes('.test.') && !filePath.includes('.stories.')) {
      const componentName = getComponentName(filePath)

      // Check if there's a corresponding test file
      const testFilePath = filePath.replace('.tsx', '.test.tsx')

      // Only include components that have dedicated test files
      if (fs.existsSync(testFilePath)) {
        const coverageData = calculateCoverage(coverage)
        components[componentName] = {
          component: componentName,
          ...coverageData,
        }
      }
    }
  })

  return components
}

function main() {
  const workspace = process.env.GITHUB_WORKSPACE || process.cwd()
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

  // Build paths based on environment
  const sharedPathname = `packages/react/coverage/coverage-final.json`
  const basePath = isGitHubActions ? `${workspace}/current` : workspace
  const currentCoveragePath = `${basePath}/${sharedPathname}`
  const mainCoveragePath = `${workspace}/main/${sharedPathname}`

  // Debug
  console.error(`Environment: ${isGitHubActions ? 'GitHub Actions' : 'Local'}`)
  console.error(`Current coverage: ${currentCoveragePath}`)
  console.error(`Main coverage: ${mainCoveragePath}`)

  const currentCoverage = loadCoverageData(currentCoveragePath)
  const mainCoverage = loadCoverageData(mainCoveragePath)

  const currentComponents = processCoverageData(currentCoverage, workspace, basePath)
  const mainComponents = processCoverageData(mainCoverage, workspace, `${workspace}/main`)

  // Debug: Check Button coverage specifically
  console.error(`Current Button coverage:`, currentComponents['Button'])
  console.error(`Main Button coverage:`, mainComponents['Button'])
  console.error(`Current Testimonial coverage:`, currentComponents['Testimonial'])
  console.error(`Main Testimonial coverage:`, mainComponents['Testimonial'])
  console.error(`Total current components:`, Object.keys(currentComponents).length)
  console.error(`Total main components:`, Object.keys(mainComponents).length)

  // Find differences
  const allComponents = new Set([...Object.keys(currentComponents), ...Object.keys(mainComponents)])

  const differences: Array<{
    component: string
    current: ComponentCoverage | null
    main: ComponentCoverage | null
    diff: {statements: number; functions: number; branches: number}
  }> = []

  allComponents.forEach(component => {
    const current = currentComponents[component] || null
    const main = mainComponents[component] || null

    if (current && main) {
      const statementsDiff = current.statements - main.statements
      const functionsDiff = current.functions - main.functions
      const branchesDiff = current.branches - main.branches

      // Only include if there are meaningful differences (>0.1% to avoid test flakiness)
      if (Math.abs(statementsDiff) > 0.1 || Math.abs(functionsDiff) > 0.1 || Math.abs(branchesDiff) > 0.1) {
        differences.push({
          component,
          current,
          main,
          diff: {statements: statementsDiff, functions: functionsDiff, branches: branchesDiff},
        })
      }
    } else if (current && !main) {
      // New component
      differences.push({
        component,
        current,
        main: null,
        diff: {statements: current.statements, functions: current.functions, branches: current.branches},
      })
    } else if (!current && main) {
      // Removed component
      differences.push({
        component,
        current: null,
        main,
        diff: {statements: -main.statements, functions: -main.functions, branches: -main.branches},
      })
    }
  })

  // Sort by biggest statement coverage change
  differences.sort((a, b) => Math.abs(b.diff.statements) - Math.abs(a.diff.statements))

  const commentHtml = generateGitHubCommentHtml(differences)

  console.log(commentHtml)
}

function generateGitHubCommentHtml(
  differences: Array<{
    component: string
    current: ComponentCoverage | null
    main: ComponentCoverage | null
    diff: {statements: number; functions: number; branches: number}
  }>,
): string {
  const summaryStats = {
    newComponents: differences.filter(d => !d.main).length,
    removedComponents: differences.filter(d => !d.current).length,
    improvedCoverage: differences.filter(
      d => d.current && d.main && (d.diff.statements > 0 || d.diff.functions > 0 || d.diff.branches > 0),
    ).length,
    decreasedCoverage: differences.filter(
      d => d.current && d.main && (d.diff.statements < 0 || d.diff.functions < 0 || d.diff.branches < 0),
    ).length,
  }

  if (differences.length === 0) {
    return `### 🟢 No unit test coverage changes found

All components with tests maintain the same coverage as the main branch.`
  }

  let html = `### 🟢 Unit test coverage changes found

Unit test coverage has been updated through this PR.

**Changes:** ${summaryStats.newComponents} new tests, ${summaryStats.removedComponents} removed tests, ${summaryStats.improvedCoverage} improved, ${summaryStats.decreasedCoverage} decreased

<table>
<thead>
<tr>
<th>Component</th>
<th>Statements</th>
<th>Functions</th>
<th>Branches</th>
<th>Change</th>
</tr>
</thead>
<tbody>`

  differences.forEach(({component, current, main, diff}) => {
    let statusText = ''
    let statementsStr = ''
    let functionsStr = ''
    let branchesStr = ''

    if (!main) {
      statusText = 'NEW'
      statementsStr = `${current!.statements.toFixed(1)}%`
      functionsStr = `${current!.functions.toFixed(1)}%`
      branchesStr = `${current!.branches.toFixed(1)}%`
    } else if (!current) {
      statusText = 'REMOVED'
      statementsStr = `${main.statements.toFixed(1)}%`
      functionsStr = `${main.functions.toFixed(1)}%`
      branchesStr = `${main.branches.toFixed(1)}%`
    } else {
      // Find the most significant change to display
      const maxChange = Math.max(Math.abs(diff.statements), Math.abs(diff.functions), Math.abs(diff.branches))
      let significantDiff = diff.statements
      if (Math.abs(diff.functions) === maxChange) significantDiff = diff.functions
      if (Math.abs(diff.branches) === maxChange) significantDiff = diff.branches

      const diffStr = significantDiff > 0 ? `+${significantDiff.toFixed(1)}` : significantDiff.toFixed(1)
      statusText = `${diffStr}%`
      
      // Show before/after with strikethrough for changed values
      statementsStr = Math.abs(diff.statements) > 0.1 
        ? `<del>${main.statements.toFixed(1)}%</del> ${current.statements.toFixed(1)}%`
        : `${current.statements.toFixed(1)}%`
      
      functionsStr = Math.abs(diff.functions) > 0.1 
        ? `<del>${main.functions.toFixed(1)}%</del> ${current.functions.toFixed(1)}%`
        : `${current.functions.toFixed(1)}%`
      
      branchesStr = Math.abs(diff.branches) > 0.1 
        ? `<del>${main.branches.toFixed(1)}%</del> ${current.branches.toFixed(1)}%`
        : `${current.branches.toFixed(1)}%`
    }

    html += `
<tr>
<td><code>${component}</code></td>
<td>${statementsStr}</td>
<td>${functionsStr}</td>
<td>${branchesStr}</td>
<td>${statusText}</td>
</tr>`
  })

  html += `
</tbody>
</table>`

  return html
}

function getComponentName(filePath: string): string {
  const component = filePath.match(/src\/([^/]+)\/[^/]+\.tsx?$/)
  if (component) {
    return component[1] // component name
  }

  const helpers = filePath.match(/src\/([^/]+)\.tsx?$/)
  if (helpers) {
    return helpers[1].replace(/\.tsx?$/, '') // file name
  }

  return path.basename(filePath, path.extname(filePath))
}

function loadCoverageData(filePath: string): CoverageData {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`Coverage file not found: ${filePath}`)
      return {}
    }
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Error loading coverage data from ${filePath}:`, error)
    return {}
  }
}

main()
