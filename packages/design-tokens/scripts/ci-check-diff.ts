// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const fs = require('fs')

const cleanLine = (line: string) => line.trim().replace(/\s+/g, ' ').replace(/\t/g, '').trim()

const beforeAfterArr: {
  before?: string
  after: string
}[] = []

try {
  const data = fs.readFileSync('diff.txt', 'utf8')

  const lines = data.split(/\r?\n/).map(cleanLine)

  for (const line of lines) {
    if (line.includes('|')) {
      const [before, after] = line.split('|')
      if (before && after) {
        beforeAfterArr.push({before: before.trim(), after: after.trim()})
      }
    } else if (line.includes('> --')) {
      beforeAfterArr.push({after: line.replace('> --', '--').trim()})
    }
  }
} catch (_err) {
  throw new Error('error converting diff.txt')
}

if (beforeAfterArr.length > 0) {
  const template = `
  ### 🔍 Design token changes found

  <details>
  <summary>View CSS variable changes</summary>
    ${beforeAfterArr.reduce((acc, {before, after}) => {
      if (!before) {
        return (acc += `
\`\`\`diff
+ ${after}
\`\`\`
      `)
      }

      return (acc += `
\`\`\`diff
- ${before}
+ ${after}
\`\`\`
      `)
    }, '')}
  

  </details>
  
  `
  try {
    fs.writeFileSync('diff.md', template.trim())
    // file written successfully
  } catch (_err) {
    throw new Error()
  }
}
