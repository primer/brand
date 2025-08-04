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
    statements: Math.round(statementsPercent * 10) / 10, // Round to 1 decimal
    functions: Math.round(functionsPercent * 10) / 10,
    branches: Math.round(branchesPercent * 10) / 10,
  }
}

function main() {
  const workspace = process.env.GITHUB_WORKSPACE || process.cwd()

  const currentCoveragePath = `${workspace}/current/packages/react/coverage/coverage-final.json`

  const mainCoveragePath = `${workspace}/main/packages/react/coverage/coverage-final.json`

  const currentCoverage = loadCoverageData(currentCoveragePath)
  const mainCoverage = loadCoverageData(mainCoveragePath)

  // Process current branch coverage
  const currentComponents: Record<string, ComponentCoverage> = {}
  Object.entries(currentCoverage).forEach(([filePath, coverage]) => {
    // Only include .tsx files (components), skip test files
    if (filePath.includes('.tsx') && !filePath.includes('.test.') && !filePath.includes('.stories.')) {
      const componentName = getComponentName(filePath)
      const coverageData = calculateCoverage(coverage)
      currentComponents[componentName] = {
        component: componentName,
        ...coverageData,
      }
    }
  })

  // Process main branch coverage
  const mainComponents: Record<string, ComponentCoverage> = {}
  Object.entries(mainCoverage).forEach(([filePath, coverage]) => {
    if (filePath.includes('.tsx') && !filePath.includes('.test.') && !filePath.includes('.stories.')) {
      const componentName = getComponentName(filePath)
      const coverageData = calculateCoverage(coverage)
      mainComponents[componentName] = {
        component: componentName,
        ...coverageData,
      }
    }
  })

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

      // Only include if there are differences
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

  // Generate GitHub comment HTML
  const commentHtml = generateGitHubCommentHtml(differences)

  // Output the HTML to console (for GitHub Action to capture)
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
    improvedCoverage: differences.filter(d => d.current && d.main && d.diff.statements > 0).length,
    decreasedCoverage: differences.filter(d => d.current && d.main && d.diff.statements < 0).length,
  }

  if (differences.length === 0) {
    return `## 📊 Test Coverage Report

✅ **No coverage changes detected** - All components maintain the same coverage as main branch.`
  }

  let html = `## 📊 Test Coverage Report

**Summary:** ${summaryStats.newComponents} new, ${summaryStats.removedComponents} removed, ${summaryStats.improvedCoverage} improved, ${summaryStats.decreasedCoverage} decreased

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
      statusText = '🆕 NEW'
      statementsStr = `${current!.statements}%`
      functionsStr = `${current!.functions}%`
      branchesStr = `${current!.branches}%`
    } else if (!current) {
      statusText = '❌ REMOVED'
      statementsStr = `${main.statements}%`
      functionsStr = `${main.functions}%`
      branchesStr = `${main.branches}%`
    } else {
      const diffStr = diff.statements > 0 ? `+${diff.statements.toFixed(1)}` : diff.statements.toFixed(1)
      statusText = diff.statements > 0 ? `📈 ${diffStr}%` : `📉 ${diffStr}%`
      statementsStr = `${current.statements}%`
      functionsStr = `${current.functions}%`
      branchesStr = `${current.branches}%`
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
