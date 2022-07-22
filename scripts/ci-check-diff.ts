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
  const template = `<style>
  html, body {font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace; font-size: 12px;}
  table {font-size:12px}
  </style>
  <table id="diff-table">
  <tr>
  <th align="left">Before</th><th align="left">After</th>
  </tr>
  ${beforeAfterArr.reduce((acc, {before, after}) => {
    return (acc += `
     <tr>
       <td style="background-color: rgb(255, 235, 233)">${highlight(after, before, false)}</td>
       <td style="background-color: rgb(230, 255, 236)">${highlight(before, after, true)}</td>
     </tr>
   `)
  }, '')}
  </table>
  `
  try {
    fs.writeFileSync('index.html', template.trim())
    // file written successfully
  } catch (err) {
    throw new Error()
  }
}
