import {IDEChatMessage, IDEEditorFile} from '../IDE'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import monaAvatar from '../../fixtures/images/avatar-mona.png'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)

export const chatScript: IDEChatMessage[] = [
  {
    role: 'user',
    handle: 'monalisa',
    avatar: monaAvatar,
    message: 'How do I concatenate two arrays in JavaScript?',
  },
  {
    role: 'assistant',
    handle: 'GitHub Copilot',
    message: "To concatenate two arrays in JavaScript, you can use the `concat` method. Here's an example:",
    codeSnippet: hljs.highlight(
      'const array1 = [1, 2, 3];\nconst array2 = [4, 5, 6];\nconst resultArray = array1.concat(array2);\nconsole.log(resultArray); // Output: [1, 2, 3, 4, 5, 6]',
      {language: 'javascript'},
    ).value,
    highlighter: 'hljs',
  },
  {
    role: 'user',
    handle: 'monalisa',
    avatar: monaAvatar,
    message: 'Thanks! How do I check if a variable is an array?',
  },
  {
    role: 'assistant',
    handle: 'GitHub Copilot',
    message: "You can use the `Array.isArray()` method to check if a variable is an array. Here's an example:",
    codeSnippet: hljs.highlight(
      "const myVariable = [1, 2, 3];\nif (Array.isArray(myVariable)) {\n  console.log('It is an array!');\n} else {\n  console.log('It is not an array.');\n}",
      {language: 'javascript'},
    ).value,
    highlighter: 'hljs',
  },
  {
    role: 'user',
    handle: 'monalisa',
    avatar: monaAvatar,
    message: 'How do I remove a specific element from an array?',
  },
  {
    role: 'assistant',
    handle: 'GitHub Copilot',
    message: "You can use the `filter` method to remove a specific element from an array. Here's an example:",
    codeSnippet: hljs.highlight(
      'const array = [1, 2, 3, 4, 5];\nconst elementToRemove = 3;\nconst filteredArray = array.filter(item => item !== elementToRemove);\nconsole.log(filteredArray); // Output: [1, 2, 4, 5]',
      {language: 'javascript'},
    ).value,
    highlighter: 'hljs',
  },
]

export const defaultFiles: IDEEditorFile[] = [
  {
    name: 'index.js',
    suggestedLineStart: 6,
    code: `import { fetch } from "fetch-h2";

async function isPositive(text: string): Promise<boolean> {
  const response = await fetch(...)
  const drawScatterplot = (data, height, width) => {
    const svg = d3.select("#scatterplot")
      .data(data)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 5)
  }
  const json = await response.json();
  return json.label === "pos";
}`,
  },
]

export const singleFile: IDEEditorFile[] = [
  {
    name: 'sentiments.ts',
    suggestedLineStart: 6,
    code: `async function isPositive(text: string): Promise<boolean> {
const response = await fetch(...)
const drawScatterplot = (data, height, width) => {
const svg = d3.select("#scatterplot")
.data(data)
.attr("cx", d => d.x)
.attr("cy", d => d.y)
.attr("r", 5)
}
const json = await response.json();
return json.label === "pos";
}`
      .split('\n')
      .map(line => hljs.highlight(line, {language: 'javascript'}).value),
    highlighter: 'hljs',
  },
]

export const files: IDEEditorFile[] = [
  {
    name: 'sentiments.ts',
    suggestedLineStart: 10,
    code: `import { fetch } from "fetch-h2";
    
async function isPositive(text: string): Promise<boolean> {
  const response = await fetch(...)
  const drawScatterplot = (data, height, width) => {
    const svg = d3.select("#scatterplot")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 5)
  }
  const json = await response.json();
  return json.label === "pos";
}`
      .split('\n')
      .map(line => hljs.highlight(line, {language: 'javascript'}).value),
    highlighter: 'hljs',
  },
  {
    name: 'draw_scatterplot.js',
    code: `import d3 from "d3"
const drawScatterplot = (data, height, width) => {
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 5)
}`
      .split('\n')
      .map(line => hljs.highlight(line, {language: 'javascript'}).value),
    highlighter: 'hljs',
  },

  {
    name: 'parse_expenses.py',
    suggestedLineStart: 2,
    code: hljs.highlight(
      `import datetime
  
def parse_expenses(expenses_string):
"""Parse the list of expenses and return the list of triples (date, value, currency).
Ignore lines starting with #.
Parse the date using datetime.
Example expenses_string:
2016-01-02 -34.01 USD
2016-01-03 2.59 DKK
2016-01-03 -2.72 EUR
"""
expenses = []
for line in expenses_string.splitlines():
if line.startswith("#"):
continue
date, value, currency = line.split(" ")
expenses.append((datetime.datetime.strptime(date, "%Y-%m-%d"),
          float(value),
          currency))
return expenses`,
      {language: 'python'},
    ).value,
    highlighter: 'hljs',
  },
]
