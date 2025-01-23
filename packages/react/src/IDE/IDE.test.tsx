import React, {render, cleanup, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {IDE, IDEChatMessage, IDEEditorFile} from './IDE'

expect.extend(toHaveNoViolations)

describe('IDE', () => {
  const chatScript: IDEChatMessage[] = [
    {
      role: 'user',
      handle: 'monalisa',
      avatar: 'https://github.com/mona.png',
      message: 'How do I concatenate two arrays in JavaScript?',
    },
    {
      role: 'assistant',
      handle: 'GitHub Copilot',
      message: "To concatenate two arrays in JavaScript, you can use the `concat` method. Here's an example:",
      codeSnippet:
        'const array1 = [1, 2, 3];\nconst array2 = [4, 5, 6];\nconst resultArray = array1.concat(array2);\nconsole.log(resultArray); // Output: [1, 2, 3, 4, 5, 6]',
    },
    {
      role: 'user',
      handle: 'monalisa',
      avatar: 'https://github.com/mona.png',
      message: 'Thanks! How do I check if a variable is an array?',
    },
  ]

  const chatScriptAlt = 'A conversation about JavaScript arrays between a user and GitHub Copilot.'

  const files: IDEEditorFile[] = [
    {name: 'File 1', alternativeText: 'Alt for File 1', code: 'Code for File 1'},
    {name: 'File 2', alternativeText: 'Alt for File 2', code: 'Code for File 2'},
    {name: 'File 3', alternativeText: 'Alt for File 3', code: 'Code for File 3'},
  ]

  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn()
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders main elements correctly into the document', () => {
    const {getByTestId} = render(
      <IDE>
        <IDE.Chat script={chatScript} alternativeText={chatScriptAlt}></IDE.Chat>
        <IDE.Editor size="large" activeTab={0} files={files} />
      </IDE>,
    )

    const rootEl = getByTestId(IDE.testIds.root)
    const editorEl = getByTestId(IDE.testIds.editor)
    const chatEl = getByTestId(IDE.testIds.chat)

    expect(rootEl).toBeInTheDocument()
    expect(editorEl).toBeInTheDocument()
    expect(chatEl).toBeInTheDocument()
  })

  it('has no a11y violations by default', async () => {
    const {container} = render(
      <IDE>
        <IDE.Chat script={chatScript} alternativeText={chatScriptAlt}></IDE.Chat>
        <IDE.Editor size="large" activeTab={0} files={files} />
      </IDE>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('sets the default variant correctly', async () => {
    const expectedVariant = 'default'

    const {getByTestId} = render(
      <IDE>
        <IDE.Chat script={chatScript} alternativeText={chatScriptAlt}></IDE.Chat>
        <IDE.Editor size="large" activeTab={0} files={files} />
      </IDE>,
    )
    const rootEl = getByTestId(IDE.testIds.root)

    expect(rootEl).toHaveClass(`IDE--${expectedVariant}`)
  })

  it('shows the correct number of chat messages', () => {
    const {getByTestId} = render(
      <IDE>
        <IDE.Chat script={chatScript} alternativeText={chatScriptAlt} />
      </IDE>,
    )

    const chatEl = getByTestId(IDE.testIds.chat)
    const messagesEl = chatEl.querySelector('.IDE__Chat-messages')

    act(() => {
      expect(messagesEl?.children.length).toBe(chatScript.length)
    })
  })

  it(`shows the correct number of editor files`, () => {
    const {getByTestId} = render(
      <IDE>
        <IDE.Editor size="large" activeTab={0} files={files} />
      </IDE>,
    )

    const editorEl = getByTestId(IDE.testIds.editor)
    const tabsEl = editorEl.querySelector('.IDE__Editor-tabs')

    act(() => {
      expect(tabsEl?.children.length).toBe(files.length)
    })
  })

  it('renders the correct editor file content in a single block', () => {
    const {getAllByTestId} = render(
      <IDE>
        <IDE.Editor size="large" activeTab={0} files={files} />
      </IDE>,
    )

    const editorContent = getAllByTestId(IDE.testIds.editorContent)[0]

    // check direct child is a single <pre>
    expect(editorContent.children.length).toBe(1)
    expect(editorContent.children[0].tagName).toBe('PRE')

    // check the code snippet is rendered all on the same line, and showed verbatim
    expect(editorContent.children[0].textContent).toBe(files[0].code)
  })

  it('renders the correct editor file content line-by-line', () => {
    const mockFileData: IDEEditorFile[] = [
      {
        ...files[0],
        code: `async function isPositive(text: string): Promise {
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
          .map(line => line),
      },
    ]

    const {getByTestId} = render(
      <IDE>
        <IDE.Editor size="large" activeTab={0} files={mockFileData} />
      </IDE>,
    )

    const editorContent = getByTestId(IDE.testIds.editorContent)

    // check direct child is a more than 1 <pre> tags
    expect(editorContent.children.length).toBe(12)
    expect(editorContent.children[0].tagName).toBe('PRE')
    // check each line is rendered correctly in its own <pre> tag
    expect(editorContent.children[0].textContent).toBe(mockFileData[0].code[0])
  })

  it('changes the editor content when clicking on tabs', async () => {
    const mockFiles: IDEEditorFile[] = [
      {name: 'File 1', alternativeText: 'Alt for File 1', code: 'Code for File 1'},
      {name: 'File 2', alternativeText: 'Alt for File 2', code: 'Code for File 2'},
      {name: 'File 3', alternativeText: 'Alt for File 3', code: 'Code for File 3'},
    ]

    const {getByRole} = render(
      <IDE>
        <IDE.Editor size="large" activeTab={0} files={mockFiles} />
      </IDE>,
    )

    expect(getByRole('tabpanel')).toHaveTextContent('Alt for File 1')

    await userEvent.click(getByRole('tab', {name: 'File 2'}))

    expect(getByRole('tabpanel')).toHaveTextContent('Alt for File 2')
  })

  it('shows copilot suggestion when suggestedLineStart is used', () => {
    const codeAsArr = ['First line', 'Second line', 'Third line', 'Fourth line', 'Fifth line']
    const mockFiles: IDEEditorFile[] = [
      {
        name: 'File 1',
        alternativeText: 'Alt for File 1',
        code: codeAsArr,
        suggestedLineStart: 2,
      },
      {
        name: 'File 2',
        alternativeText: 'Alt for File 2',
        code: codeAsArr,
        suggestedLineStart: 2,
      },
      {
        name: 'File 3',
        alternativeText: 'Alt for File 3',
        code: codeAsArr,
        suggestedLineStart: 2,
      },
    ]

    const {getAllByTestId} = render(
      <IDE>
        <IDE.Editor size="large" activeTab={0} files={mockFiles} />
      </IDE>,
    )

    const editorContent = getAllByTestId(IDE.testIds.editorContent)[0]

    expect(editorContent.children.length).toBe(codeAsArr.length + 1) // to account for additional copilot <pre>
    expect(editorContent.children[0].tagName).toBe('PRE')

    // check each line has the correct the data-has-suggestion attribute
    expect(editorContent.children[0]).toHaveAttribute('data-has-suggestion', 'false')
    expect(editorContent.children[1]).toHaveAttribute('data-has-suggestion', 'true')

    // final <pre> contains the text Copilot
    expect(editorContent.children[codeAsArr.length].textContent).toBe('Copilot')
  })
})
