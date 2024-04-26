import {CopilotIcon, PaperAirplaneIcon, SyncIcon} from '@primer/octicons-react'
import {default as clsx} from 'clsx'
import React, {
  Children,
  forwardRef,
  isValidElement,
  memo,
  PropsWithChildren,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {useId} from '@reach/auto-id'

import {Avatar, Button, Text, TextInput} from '..'
import type {BaseProps} from '../component-helpers'
import {useProvidedRefOrCreate} from '../hooks/useRef'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/ide/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/ide/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import animationStyles from '../animation/Animation.module.css'
import styles from './IDE.module.css'

const testIds = {
  root: 'IDE',
  get chat() {
    return `${this.root}-chat`
  },
  get editor() {
    return `${this.root}-editor`
  },
  get editorContent() {
    return `${this.editor}-content`
  },
  get editorTabs() {
    return `${this.editor}-tab`
  },
  get altText() {
    return `${this.root}-sr-only-message`
  },
}

export type IDEProps = {
  /**
   * Alternative description of the IDE for users of assistive technologies.
   * IDE is considered a decorative element, so this description is important
   * for accurately describing what the user is being presented.
   * This text will be visually hidden.
   */
  alternativeText: string
  /**
   * Test id for the IDE
   */
  'data-testid'?: string
  /**
   * The optionally configurable height of the IDE
   */
  height?: number
  /**
   * Alternative presentation of the IDE
   */
  variant?: 'default' | 'glass'
} & BaseProps<HTMLDivElement>

const _IDERoot = memo(
  ({
    alternativeText,
    children,
    className,
    'data-testid': testId,
    height,
    variant = 'default',
    ...rest
  }: PropsWithChildren<IDEProps>) => {
    const uniqueId = useId()

    const childrenArray = useMemo(() => Children.toArray(children), [children])

    const ChatChild = childrenArray.find(child => isValidElement(child) && child.type === IDE.Chat)

    const EditorChild = childrenArray.find(child => isValidElement(child) && child.type === IDE.Editor)
    return (
      <section
        aria-labelledby={`${uniqueId}-IDE-sr-only-message`}
        role="application"
        data-testid={testId || testIds.root}
        className={clsx(styles[`IDE--${variant}`], ChatChild && EditorChild && styles['IDE--full-exp'], className)}
      >
        <div aria-hidden {...rest}>
          <div
            className={styles['IDE__inner']}
            style={{['--brand-IDE-height' as string]: height ? `${height}px` : undefined}}
          >
            <div className={styles.IDE__main}>
              {ChatChild && <>{ChatChild}</>}
              {EditorChild && <>{EditorChild}</>}
            </div>
          </div>
        </div>
        <div id={`${uniqueId}-IDE-sr-only-message`} className="visually-hidden" data-testid={testIds.altText}>
          {alternativeText}
        </div>
      </section>
    )
  },
)

type IDEChatProps = {
  /**
   * The chat script
   */
  script: IDEChatMessage[]
  /**
   * The delay between messages
   */
  animationDelay?: number
  /**
   * Test id for the IDE
   */
  'data-testid'?: string
} & BaseProps<HTMLElement>

type MessageRole = 'user' | 'assistant'

export type IDEChatMessage = {
  role: MessageRole
  handle: string
  avatar: string
  message: string
  codeSnippet?: string
  highlighter?: 'hljs' // add additional highlighters as needed
}

const _Chat = memo(({'data-testid': testId, script, animationDelay = 3000, ...rest}: IDEChatProps) => {
  const delay = animationDelay
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!script.length) return

    const scrollIntoParentView = element => {
      if (!element || !messagesRef.current) return
      const container = messagesRef.current
      const elementRect = element.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
        container.scrollTop += elementRect.top - containerRect.top
      }
    }

    const allMessages = document.querySelectorAll(`.${styles['IDE__Chat-message']}`)
    const defaultMessages = Array.from(allMessages).slice(0, 1)
    defaultMessages[0].classList.add(styles['IDE__Chat-message--visible'])

    let messagesIndex = 0
    for (const message of defaultMessages) {
      setTimeout(() => {
        message.classList.add(styles['IDE__Chat-message--visible'])
      }, 0 * (messagesIndex + 1))
      messagesIndex++
    }

    const newerMessages = Array.from(allMessages).slice(1)

    setTimeout(() => {
      // eslint-disable-next-line github/array-foreach
      newerMessages.forEach((message, index) => {
        setTimeout(() => {
          if (index % 2 === 0) {
            scrollIntoParentView(message)
          }
          for (const defaultMessage of defaultMessages) {
            defaultMessage.classList.add(styles['IDE__Chat-message--faded'])
          }

          const filteredNewerMessage = newerMessages.filter((_, i) => i < index)

          for (const filteredMessage of filteredNewerMessage) {
            filteredMessage.classList.add(styles['IDE__Chat-message--faded'])
          }
          message.classList.add(styles['IDE__Chat-message--visible'])

          // remove faded class from all messages at the end
          if (index === newerMessages.length - 1) {
            for (const defaultMessage of defaultMessages) {
              defaultMessage.classList.remove(styles['IDE__Chat-message--faded'])
            }
            for (const newerMessage of newerMessages) {
              newerMessage.classList.remove(styles['IDE__Chat-message--faded'])
            }
          }
        }, delay * (index + 1))
      })
    }, delay / 4)
  }, [script, delay])

  return (
    <section className={styles.IDE__Chat} data-testid={testId || testIds.chat} {...rest}>
      <div ref={messagesRef} className={styles['IDE__Chat-messages']}>
        {script.length &&
          script.map((message, index) => (
            <div
              id={`IDE__Chat-message-${index}`}
              key={index}
              className={clsx(
                styles['IDE__Chat-message'],
                message.role === 'user' && styles['IDE__Chat-message--user'],
              )}
            >
              <div className={styles['IDE__Chat-message-user']}>
                {message.role === 'user' ? (
                  <Avatar src={message.avatar} alt={message.handle} />
                ) : (
                  <CopilotIcon size={24} />
                )}
                <Text as="p" size="100" weight="bold" className={styles['IDE__Chat-message-handle']}>
                  {message.handle}
                </Text>
              </div>
              <div className={styles['IDE__Chat-message-content']}>
                <div className={styles['IDE__Chat-message-text']}>{message.message}</div>

                {message.highlighter && message.codeSnippet && (
                  <pre
                    className={styles['IDE__Chat-message-snippet']}
                    dangerouslySetInnerHTML={{__html: message.codeSnippet}}
                  />
                )}

                {!message.highlighter && message.codeSnippet && (
                  <pre className={styles['IDE__Chat-message-snippet']}>{message.codeSnippet}</pre>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className={styles['IDE__Chat-input-area']}>
        <TextInput
          disabled
          className={styles['IDE__Chat-input']}
          fullWidth
          placeholder="Ask a question or type '/' for commands."
          trailingVisual={<PaperAirplaneIcon className={styles['IDE__Chat-input-icon']} />}
        />
      </div>
    </section>
  )
})

type IDEEditorProps = {
  /**
   * The index of the active tab.
   */
  activeTab?: number

  /**
   * An array of IDE editor files.
   */
  files: IDEEditorFile[]

  /**
   * Determines whether line numbers should be shown in the editor.
   */
  showLineNumbers?: boolean

  /**
   * Controls the size of the editor text.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Used for triggering animation externally.
   */
  triggerAnimation?: boolean

  /**
   * Determines whether the replay button should be shown.
   */
  showReplayButton?: boolean

  /**
   * Test id for the IDE.
   */
  'data-testid'?: string
  /**
   * Enable user customisation of the icons used in file tabs.
   */
  tabIcons?: IDEEditorTabIcon
} & BaseProps<HTMLDivElement>

export type IDEEditorFile = {
  name: string
  /**
   * Controls line at which the Copilot suggestion begins
   */
  suggestedLineStart?: number
  code: string | string[]
  highlighter?: 'hljs' // add additional highlighters as needed
}

type IDEEditorTabIcon = Record<string, string>

const iconBaseUrl = 'https://github.com/primer/brand/assets'

export const IDEDefaultIconMap: IDEEditorTabIcon = {
  py: `${iconBaseUrl}/13340707/7ca66487-d958-4c30-acbc-397f7a6169b7`,
  ts: `${iconBaseUrl}/13340707/2a7b87cf-b522-4ab5-a127-5a2c69bd0a89`,
  js: `${iconBaseUrl}/13340707/5a7bfffa-af38-4e32-ab39-a9e7efbcc7c6`,
  jsx: `${iconBaseUrl}/13340707/d975a978-dbc7-4626-b995-c00cac9bc132`,
  hs: `${iconBaseUrl}/13340707/826843ce-424b-4693-84d3-a43e4b7f1280`,
  html: `${iconBaseUrl}/13340707/f5b03413-b8f4-4cd5-9d91-6b574ada14ed`,
  css: `${iconBaseUrl}/13340707/3df2f0ba-daff-4b76-8492-f5773c515369`,
  scss: `${iconBaseUrl}/13340707/a1d21f2e-c813-4211-8d9a-2869c1968e9a`,
  json: `${iconBaseUrl}/13340707/ca21068e-8c27-4b84-9a1d-b965b49b3568`,
  md: `${iconBaseUrl}/13340707/39e7ff2b-9d0a-47e9-9686-bed51800084c`,
  yml: `${iconBaseUrl}/13340707/afb28101-1352-444f-8a8e-419b6883132f`,
  yaml: `${iconBaseUrl}/13340707/afb28101-1352-444f-8a8e-419b6883132f`,
  txt: `${iconBaseUrl}/13340707/7c52da20-1fe2-496c-b4bb-6ea61d0fe3dd`,
  sh: `${iconBaseUrl}/13340707/549ce181-4541-4811-8712-a9c5abd8eeae`,
  sql: `${iconBaseUrl}/13340707/b2b73a2e-e4e1-47c8-aabc-c204836244b8`,
  // Add additional default icons as needed
  // Note: These can also be customised and extended by end user using the tabIcons prop
}

export const IDEFileExtensions = Object.keys(IDEDefaultIconMap)

const _Editor = memo(
  forwardRef(
    (
      {
        activeTab = 0,
        'data-testid': testId,
        files,
        triggerAnimation,
        showLineNumbers = true,
        showReplayButton = true,
        size = 'medium',
        tabIcons = IDEDefaultIconMap,
        ...rest
      }: IDEEditorProps,
      ref: Ref<HTMLDivElement>,
    ) => {
      const rootRef = useProvidedRefOrCreate(ref as RefObject<HTMLDivElement>)
      const [localAnimationCouner, setLocalAnimationCounter] = useState(0)
      const presRef = useRef<HTMLDivElement>(null)
      const buttonRef = useRef<HTMLButtonElement>(null)
      const tabsRef = useRef<HTMLDivElement>(null)
      const [activeFile, setActiveFile] = useState(activeTab)
      const [animationIsActive, setAnimationIsActive] = useState(triggerAnimation)

      const handlePress = useCallback(
        (index: number) => {
          setActiveFile(index)
        },
        [setActiveFile],
      )

      const resetAnimation = useCallback(() => {
        const pres = presRef.current?.querySelectorAll('pre')
        if (pres) {
          for (const pre of Array.from(pres)) {
            pre.classList.remove(animationStyles['Animation--active'])
          }
        }
      }, [])

      const handleReplayButton = useCallback(() => {
        resetAnimation()
        setLocalAnimationCounter(prev => prev + 1)
      }, [setLocalAnimationCounter, resetAnimation])

      useEffect(() => {
        if (animationIsActive) return

        setAnimationIsActive(true)
        rootRef.current?.setAttribute('data-animation-active', 'true')
        const pres = presRef.current?.querySelectorAll('pre')

        let fixedDelay = 0
        let totalDelay = 0

        // disable button
        if (showReplayButton) {
          if (buttonRef.current) {
            buttonRef.current.disabled = true
          }
        }

        // disable other tabs
        if (tabsRef.current) {
          const tabs = tabsRef.current.querySelectorAll('button')
          let tabIndex = 0
          for (const tab of Array.from(tabs)) {
            if (tabIndex !== activeFile) {
              tab.disabled = true
            }
            tabIndex++
          }
        }

        // incrementally make each line visible
        if (pres) {
          let index = 0
          let delay = 0
          const presArray = Array.from(pres)
          for (const pre of presArray) {
            if (pre.getAttribute('data-has-suggestion') === 'true' && fixedDelay === 0) {
              delay = 200 * index * 1.5
              fixedDelay = delay
              setTimeout(() => {
                pre.classList.add(animationStyles['Animation--active'])
              }, fixedDelay)
            } else if (pre.getAttribute('data-has-suggestion') === 'true' && fixedDelay > 0) {
              setTimeout(() => {
                pre.classList.add(animationStyles['Animation--active'])
              }, fixedDelay)
              delay = fixedDelay
            } else {
              setTimeout(() => {
                pre.classList.add(animationStyles['Animation--active'])
              }, 200 * index)
              delay = 200 * index
            }
            index++
          }
          totalDelay += delay
        }
        setAnimationIsActive(false)

        setTimeout(() => {
          rootRef.current?.setAttribute('data-animation-active', 'false')
          // reenable button
          if (showReplayButton) {
            if (buttonRef.current) {
              buttonRef.current.disabled = false
            }
          }
          // reenable other tabs
          if (tabsRef.current) {
            const tabs = tabsRef.current.querySelectorAll('button')
            for (const tab of Array.from(tabs)) {
              tab.disabled = false
            }
          }
        }, totalDelay)

        return () => {
          if (pres) {
            for (const pre of Array.from(pres)) {
              pre.classList.remove(animationStyles['Animation--active'])
            }
          }
        }
      }, [
        activeFile,
        activeTab,
        triggerAnimation,
        animationIsActive,
        localAnimationCouner,
        buttonRef,
        showReplayButton,
        rootRef,
      ])

      return (
        <div
          className={clsx(styles.IDE__Editor, styles[`IDE__Editor--${size}`])}
          ref={rootRef}
          data-testid={testId || testIds.editor}
          {...rest}
        >
          <div className={styles['IDE__Editor-tabs']} ref={tabsRef} data-testid={testIds.editorTabs}>
            {files.map((file, index) => {
              const language = file.name.split('.').pop()

              return (
                <button
                  tabIndex={-1}
                  key={index}
                  className={clsx(styles['IDE__Editor-tab'], activeFile === index && styles.active)}
                  onClick={() => handlePress(index)}
                >
                  {language && (
                    <img
                      className={styles['IDE__Editor-tab-icon']}
                      alt={`Logo for ${language}`}
                      width={16}
                      height={16}
                      src={tabIcons[language]}
                    />
                  )}{' '}
                  {file.name}
                </button>
              )
            })}
          </div>
          <div className={styles['IDE__Editor-content']}>
            {showLineNumbers && (
              <div className={styles['IDE__Editor-lineNumbers']}>
                {Array.isArray(files[activeFile].code) &&
                  (files[activeFile].code as string[]).map((_, index) => (
                    <div key={index} className={styles['IDE__Editor-lineNumber']}>
                      {index + 1}
                    </div>
                  ))}
                {typeof files[activeFile].code === 'string' &&
                  (files[activeFile].code as string).split('\n').map((_, index) => (
                    <div key={index} className={styles['IDE__Editor-lineNumber']}>
                      {index + 1}
                    </div>
                  ))}
              </div>
            )}
            {Array.isArray(files[activeFile].code) && (
              <div ref={presRef} data-testid={testIds.editorContent}>
                {(files[activeFile].code as string[]).map((line, index) => {
                  const hasSuggestion = index + 1 >= (files[activeFile].suggestedLineStart ?? Infinity)
                  return (
                    <React.Fragment key={line + index}>
                      <pre
                        key={index}
                        className={clsx(
                          styles['IDE__Editor-pane'],
                          index + 1 < (files[activeFile].suggestedLineStart ?? Infinity) &&
                            animationStyles['Animation--slide-in-right'],
                          hasSuggestion && animationStyles['Animation--slide-in-down'],
                          hasSuggestion && styles['IDE__Editor-pane--suggested'],
                        )}
                        dangerouslySetInnerHTML={{__html: line}}
                        data-has-suggestion={hasSuggestion}
                      />
                      {hasSuggestion && index === files[activeFile].code.length - 1 && (
                        <pre
                          className={clsx(
                            animationStyles['Animation--slide-in-down'],
                            styles['IDE__Chat-copilot-indicator'],
                          )}
                          data-has-suggestion={hasSuggestion}
                        >
                          <CopilotIcon size={24} className={styles['IDE__Chat-copilot-indicator-label']} />
                          <Text as="span" className={styles['IDE__Chat-copilot-indicator-label']}>
                            Copilot
                          </Text>
                        </pre>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            )}

            {typeof files[activeFile].code === 'string' && (
              <div ref={presRef} data-testid={testIds.editorContent}>
                <pre
                  className={clsx(styles['IDE__Editor-pane'], animationStyles['Animation--slide-in-right'])}
                  dangerouslySetInnerHTML={{__html: files[activeFile].code}}
                />
              </div>
            )}
          </div>
          {showReplayButton && (
            <Button
              tabIndex={-1}
              ref={buttonRef}
              variant="subtle"
              hasArrow={false}
              className={styles['IDE__Editor-replay']}
              onClick={handleReplayButton}
              leadingVisual={<SyncIcon size={24} />}
              size="small"
            >
              Replay
            </Button>
          )}
        </div>
      )
    },
  ),
)

/**
 * Use IDE to display a decorative editor component
 * @see https://primer.style/brand/components/IDE
 */
export const IDE = Object.assign(_IDERoot, {
  testIds,
  Chat: _Chat,
  Editor: _Editor,
})
