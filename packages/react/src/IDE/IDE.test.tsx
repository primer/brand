import React, {render, cleanup, act, waitFor, prettyDOM} from '@testing-library/react'
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
    {
      name: 'File 3',
      alternativeText: 'Alt for File 3',
      code: ['Code for File 3 line 1', 'Code for File 3 line 2', 'Code for File 3 line 3'],
    },
  ]

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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

    await act(async () => {
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
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

  it('plays the chat animation by default', async () => {
    const {getByText} = render(
      <IDE>
        <IDE.Chat script={chatScript} alternativeText={chatScriptAlt} animationDelay={300} />
      </IDE>,
    )

    const message1Parent = getByText(chatScript[0].message).closest('.IDE__Chat-message')
    const message2Parent = getByText(chatScript[1].message).closest('.IDE__Chat-message')
    const message3Parent = getByText(chatScript[2].message).closest('.IDE__Chat-message')

    expect(message1Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message2Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message3Parent).not.toHaveClass('IDE__Chat-message--visible')

    await waitFor(() => expect(message1Parent).toHaveClass('IDE__Chat-message--visible'))
    await waitFor(() => expect(message2Parent).toHaveClass('IDE__Chat-message--visible'))
    await waitFor(() => expect(message3Parent).toHaveClass('IDE__Chat-message--visible'))
  })

  it('allows the chat animation to be paused', async () => {
    const user = userEvent.setup()

    const {getByText, getByRole} = render(
      <IDE>
        <IDE.Chat script={chatScript} alternativeText={chatScriptAlt} animationDelay={300} />
      </IDE>,
    )

    const pauseButton = getByRole('button', {name: 'Pause animation'})
    expect(pauseButton).toBeInTheDocument()

    const message1Parent = getByText(chatScript[0].message).closest('.IDE__Chat-message')
    const message2Parent = getByText(chatScript[1].message).closest('.IDE__Chat-message')
    const message3Parent = getByText(chatScript[2].message).closest('.IDE__Chat-message')

    expect(message1Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message2Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message3Parent).not.toHaveClass('IDE__Chat-message--visible')

    await waitFor(() => expect(message1Parent).toHaveClass('IDE__Chat-message--visible'))

    await user.click(pauseButton)

    await act(async () => {
      await wait(1000)
    })

    expect(message2Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message3Parent).not.toHaveClass('IDE__Chat-message--visible')

    const playButton = getByRole('button', {name: 'Play animation'})
    expect(playButton).toBeInTheDocument()
  })

  it('plays the editor animation by default', async () => {
    const {getByText} = render(
      <IDE>
        <IDE.Editor size="large" activeTab={2} files={files} />
      </IDE>,
    )

    const code = files[2].code as string[]

    const line1 = getByText(code[0])
    const line2 = getByText(code[1])
    const line3 = getByText(code[2])

    expect(line1).not.toHaveClass('Animation--active')
    expect(line2).not.toHaveClass('Animation--active')
    expect(line3).not.toHaveClass('Animation--active')

    await waitFor(() => expect(line1).toHaveClass('Animation--active'))
    await waitFor(() => expect(line2).toHaveClass('Animation--active'))
    await waitFor(() => expect(line3).toHaveClass('Animation--active'))
  })

  it('allows the editor animation to be paused', async () => {
    const user = userEvent.setup()

    const {getByRole, getByText} = render(
      <IDE>
        <IDE.Editor size="large" activeTab={2} files={files} />
      </IDE>,
    )

    const code = files[2].code as string[]

    const pauseButton = getByRole('button', {name: 'Pause animation'})
    expect(pauseButton).toBeInTheDocument()

    const line1 = getByText(code[0])
    const line2 = getByText(code[1])
    const line3 = getByText(code[2])

    expect(line1).not.toHaveClass('Animation--active')
    expect(line2).not.toHaveClass('Animation--active')
    expect(line3).not.toHaveClass('Animation--active')

    await waitFor(() => expect(line1).toHaveClass('Animation--active'))

    await user.click(pauseButton)

    await act(async () => {
      await wait(1000)
    })

    expect(line2).not.toHaveClass('Animation--active')
    expect(line3).not.toHaveClass('Animation--active')

    const playButton = getByRole('button', {name: 'Play animation'})
    expect(playButton).toBeInTheDocument()
  })

  it('plays the chat animation when both the chat and editor are present', async () => {
    const {getByText} = render(
      <IDE>
        <IDE.Chat script={chatScript} alternativeText={chatScriptAlt} animationDelay={300} />
        <IDE.Editor size="large" activeTab={2} files={files} />
      </IDE>,
    )

    const message1Parent = getByText(chatScript[0].message).closest('.IDE__Chat-message')
    const message2Parent = getByText(chatScript[1].message).closest('.IDE__Chat-message')
    const message3Parent = getByText(chatScript[2].message).closest('.IDE__Chat-message')

    expect(message1Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message2Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message3Parent).not.toHaveClass('IDE__Chat-message--visible')

    await waitFor(() => expect(message1Parent).toHaveClass('IDE__Chat-message--visible'))
    await waitFor(() => expect(message2Parent).toHaveClass('IDE__Chat-message--visible'))
    await waitFor(() => expect(message3Parent).toHaveClass('IDE__Chat-message--visible'))
  })

  it('plays editor animation when both the chat and editor are present', async () => {
    const {getByText} = render(
      <IDE>
        <IDE.Chat script={chatScript} alternativeText={chatScriptAlt} animationDelay={300} />
        <IDE.Editor size="large" activeTab={2} files={files} />
      </IDE>,
    )

    const code = files[2].code as string[]

    const line1 = getByText(code[0])
    const line2 = getByText(code[1])
    const line3 = getByText(code[2])

    expect(line1).not.toHaveClass('Animation--active')
    expect(line2).not.toHaveClass('Animation--active')
    expect(line3).not.toHaveClass('Animation--active')

    await waitFor(() => expect(line1).toHaveClass('Animation--active'))
    await waitFor(() => expect(line2).toHaveClass('Animation--active'))
    await waitFor(() => expect(line3).toHaveClass('Animation--active'))
  })

  it('allows the chat and editor animations to be paused when both the chat and editor are present', async () => {
    const user = userEvent.setup()

    const {getByRole, getByText} = render(
      <IDE>
        <IDE.Chat script={chatScript} alternativeText={chatScriptAlt} animationDelay={300} />
        <IDE.Editor size="large" activeTab={2} files={files} />
      </IDE>,
    )

    const code = files[2].code as string[]

    const pauseButton = getByRole('button', {name: 'Pause animation'})
    expect(pauseButton).toBeInTheDocument()

    const line1 = getByText(code[0])
    const line2 = getByText(code[1])
    const line3 = getByText(code[2])

    expect(line1).not.toHaveClass('Animation--active')
    expect(line2).not.toHaveClass('Animation--active')
    expect(line3).not.toHaveClass('Animation--active')

    const message1Parent = getByText(chatScript[0].message).closest('.IDE__Chat-message')
    const message2Parent = getByText(chatScript[1].message).closest('.IDE__Chat-message')
    const message3Parent = getByText(chatScript[2].message).closest('.IDE__Chat-message')

    expect(message1Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message2Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message3Parent).not.toHaveClass('IDE__Chat-message--visible')

    await waitFor(() => expect(message1Parent).toHaveClass('IDE__Chat-message--visible'))
    await waitFor(() => expect(line1).toHaveClass('Animation--active'))

    await user.click(pauseButton)

    await act(async () => {
      await wait(1000)
    })

    expect(line2).not.toHaveClass('Animation--active')
    expect(line3).not.toHaveClass('Animation--active')
    expect(message2Parent).not.toHaveClass('IDE__Chat-message--visible')
    expect(message3Parent).not.toHaveClass('IDE__Chat-message--visible')

    const playButton = getByRole('button', {name: 'Play animation'})
    expect(playButton).toBeInTheDocument()
  })
})
