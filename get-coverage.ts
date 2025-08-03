#!/usr/bin/env npx tsx

import * as fs from 'fs'
import * as path from 'path'

interface FileCoverage {
  s: Record<string, number> // statements
  f: Record<string, number> // functions
  b: Record<string, number> // branches
}

interface CoverageData {
  [filePath: string]: FileCoverage
}

interface ComponentCoverage {
  component: string
  statements: number
  functions: number
  branches: number
}

function getComponentName(filePath: string): string {
  // Extract component name from path like "src/Button/Button.tsx" -> "Button"
  const match = filePath.match(/src\/([^/]+)\/[^/]+\.tsx?$/)
  if (match) {
    return match[1]
  }

  // Handle files directly in src like "src/utils.ts" -> "utils"
  const directMatch = filePath.match(/src\/([^/]+)\.tsx?$/)
  if (directMatch) {
    return directMatch[1].replace(/\.tsx?$/, '')
  }

  // Fallback to filename
  return path.basename(filePath, path.extname(filePath))
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

function main() {
  // Use GitHub Actions workspace paths, with fallback to local paths for development
  const workspace = process.env.GITHUB_WORKSPACE || '/Users/rezrah/dev/github/brand'
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

  const currentCoveragePath = isGitHubActions
    ? `${workspace}/current/packages/react/coverage/coverage-final.json`
    : `${workspace}/packages/react/coverage/coverage-final.json`

  const mainCoveragePath = isGitHubActions
    ? `${workspace}/main/packages/react/coverage/coverage-final.json`
    : `${workspace}/main/packages/react/coverage/coverage-final.json`

  // Debug output for GitHub Actions
  if (process.env.GITHUB_ACTIONS) {
    console.error(`Workspace: ${workspace}`)
    console.error(`Current coverage path: ${currentCoveragePath}`)
    console.error(`Main coverage path: ${mainCoveragePath}`)
  }

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

main()
