// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const fs = require('fs')

const cleanLine = (line: string) => line.replace(/\t/g, '').trim()

const beforeAfterArr: {
  before: string
  after: string
}[] = []

function highlight(oldText: string, newText: string, isAfter: boolean) {
  let text = ''

  const newTextChars = newText.split('')

  for (const [i, val] of newTextChars.entries()) {
    if (val !== oldText.charAt(i)) {
      // eslint-disable-next-line github/unescaped-html-literal
      text += `<span style="background-color: ${
        isAfter ? 'rgb(171, 242, 188)' : 'rgba(255, 129, 130, 0.4)'
      }">${val}</span>`
    } else text += val
  }

  return text
}

try {
  const data = fs.readFileSync('diff.txt', 'utf8')
  const lines = data.split(/\r?\n/).map(cleanLine)

  for (const line of lines) {
    const [before, after] = line.split('|')
    if (before && after) {
      beforeAfterArr.push({before: before.trim(), after: after.trim()})
    }
  }
} catch (err) {
  throw new Error('error converting diff.txt')
}

if (beforeAfterArr.length > 0) {
  // eslint-disable-next-line github/unescaped-html-literal
  const template = `
  ### 🔍 Design token changes found

  ${beforeAfterArr.reduce((acc, {before, after}) => {
    return (acc += `
    ```diff
    - {before}
    + {after}
    ```

   `)
  }, '')}

  `
  try {
    fs.writeFileSync('diff.md', template.trim())
    // file written successfully
  } catch (err) {
    throw new Error()
  }
}
