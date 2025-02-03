import {CopilotIcon, PaperAirplaneIcon, SyncIcon} from '@primer/octicons-react'
import clsx from 'clsx'
import React, {
  Children,
  forwardRef,
  isValidElement,
  memo,
  type PropsWithChildren,
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {Avatar, Button, Text, TextInput} from '..'
import type {BaseProps} from '../component-helpers'
import {useTabs, type OnTabActivate} from '../hooks/useTabs'

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
}

export type IDEProps = {
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
  ({children, className, 'data-testid': testId, height, variant = 'default', ...rest}: PropsWithChildren<IDEProps>) => {
    const childrenArray = useMemo(() => Children.toArray(children), [children])

    const ChatChild = childrenArray.find(child => isValidElement(child) && child.type === IDE.Chat)

    const EditorChild = childrenArray.find(child => isValidElement(child) && child.type === IDE.Editor)
    return (
      <section
        data-testid={testId || testIds.root}
        className={clsx(styles[`IDE--${variant}`], ChatChild && EditorChild && styles['IDE--full-exp'], className)}
      >
        <div {...rest}>
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
   * Alternative description of the chat script for users of assistive technologies.
   */
  alternativeText: string
  /**
   * The delay between messages
   */
  animationDelay?: number
  /**
   * Test id for the IDE
   */
  'data-testid'?: string
} & BaseProps<HTMLElement>

type IDEChatMessageUser = {
  role: 'user'
  avatar: string
}

type IDEChatMessageAssistant = {
  role: 'assistant'
}

export type IDEChatMessage = {handle: string; message: string; codeSnippet?: string; highlighter?: 'hljs'} & (
  | IDEChatMessageUser
  | IDEChatMessageAssistant
)

const _Chat = memo(({'data-testid': testId, script, animationDelay = 3000, alternativeText, ...rest}: IDEChatProps) => {
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
      <span className="visually-hidden">{alternativeText}</span>
      <div className={styles['IDE__Chat-wrapper']} aria-hidden>
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
   * Alternative description of the code for users of assistive technologies.
   */
  alternativeText: string
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
        triggerAnimation = false,
        showLineNumbers = true,
        showReplayButton = true,
        size = 'medium',
        tabIcons = IDEDefaultIconMap,
        ...rest
      }: IDEEditorProps,
      ref: Ref<HTMLDivElement>,
    ) => {
      const presRef = useRef<HTMLDivElement>(null)
      const [isAnimating, setIsAnimating] = useState(false)
      const [hasAnimated, setHasAnimated] = useState(false)
      const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([])

      const clearAllTimeouts = useCallback(() => {
        for (const timeout of timeouts) {
          clearTimeout(timeout)
        }
      }, [timeouts])

      useEffect(() => {
        return () => {
          clearAllTimeouts()
        }
      }, [clearAllTimeouts])

      const resetAnimation = useCallback(() => {
        setHasAnimated(false)
        setIsAnimating(false)
        clearAllTimeouts()

        const pres = presRef.current?.querySelectorAll('pre')
        if (pres) {
          for (const pre of pres) {
            pre.classList.remove(animationStyles['Animation--active'])
          }
        }
      }, [clearAllTimeouts])

      const runAnimation = useCallback(() => {
        if (isAnimating || hasAnimated || !presRef.current) return

        setIsAnimating(true)
        const pres = presRef.current.querySelectorAll('pre')

        let delay = 0
        let copilotSuggestionDelay = 0

        for (const pre of pres) {
          const isCopilotSuggestion = pre.getAttribute('data-has-suggestion') === 'true'

          if (isCopilotSuggestion) {
            if (copilotSuggestionDelay === 0) {
              copilotSuggestionDelay = delay * 1.5
            }

            delay = copilotSuggestionDelay
          }

          const timeout = setTimeout(() => {
            pre.classList.add(animationStyles['Animation--active'])
          }, delay)

          setTimeouts(prev => [...prev, timeout])

          delay += 200
        }

        const animationEndTimeout = setTimeout(() => {
          setHasAnimated(true)
          setIsAnimating(false)
        }, delay)

        setTimeouts(prev => [...prev, animationEndTimeout])
      }, [hasAnimated, isAnimating])

      const onTabActivate = useCallback<OnTabActivate>(
        (_, activeTabRef) => {
          activeTabRef?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'})
          resetAnimation()
        },
        [resetAnimation],
      )

      const tabs = useTabs({
        defaultTab: activeTab.toString(),
        autoActivate: true,
        onTabActivate,
      })

      useEffect(() => {
        runAnimation()
      }, [runAnimation, triggerAnimation])

      return (
        <div
          className={clsx(styles.IDE__Editor, styles[`IDE__Editor--${size}`])}
          ref={ref}
          data-testid={testId || testIds.editor}
          {...rest}
        >
          <div className={styles['IDE__Editor-tabs']} data-testid={testIds.editorTabs} {...tabs.getTabListProps()}>
            {files.map((file, index) => {
              const language = file.name.split('.').pop()
              const isActiveTab = tabs.activeTab === index.toString()

              return (
                <button
                  {...tabs.getTabProps(index.toString())}
                  key={file.name}
                  className={clsx(styles['IDE__Editor-tab'], isActiveTab && styles['IDE__Editor-tab--active'])}
                >
                  {language && (
                    <img
                      className={styles['IDE__Editor-tab-icon']}
                      alt=""
                      width={16}
                      height={16}
                      src={tabIcons[language]}
                    />
                  )}
                  {file.name}
                </button>
              )
            })}
          </div>
          <div className={styles['IDE__Editor-content']}>
            {files.map((file, fileIndex) => (
              <div {...tabs.getTabPanelProps(fileIndex.toString())} key={file.name}>
                <span className="visually-hidden">{file.alternativeText}</span>
                <div className={styles['IDE__Editor-content-wrapper']} aria-hidden="true">
                  {showLineNumbers && (
                    <div className={styles['IDE__Editor-lineNumbers']}>
                      {(Array.isArray(file.code) ? file.code : file.code.split('\n')).map((_, index) => (
                        <div key={index} className={styles['IDE__Editor-lineNumber']}>
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    ref={tabs.activeTab === fileIndex.toString() ? presRef : null}
                    data-testid={testIds.editorContent}
                    className={styles['IDE__Editor-content-inner']}
                  >
                    {Array.isArray(file.code) ? (
                      (file.code as string[]).map((line, index) => {
                        const isSuggestion = index + 1 >= (file.suggestedLineStart ?? Infinity)
                        return (
                          <React.Fragment key={line + index}>
                            <pre
                              key={index}
                              className={clsx(
                                styles['IDE__Editor-pane'],
                                index + 1 < (file.suggestedLineStart ?? Infinity) &&
                                  animationStyles['Animation--slide-in-right'],
                                isSuggestion && animationStyles['Animation--slide-in-down'],
                                isSuggestion && styles['IDE__Editor-pane--suggested'],
                              )}
                              dangerouslySetInnerHTML={{__html: line === '' ? '&nbsp;' : line}}
                              data-has-suggestion={isSuggestion}
                            />
                            {isSuggestion && index === file.code.length - 1 && (
                              <pre
                                className={clsx(
                                  animationStyles['Animation--slide-in-down'],
                                  styles['IDE__Chat-copilot-indicator'],
                                )}
                                data-has-suggestion={isSuggestion}
                              >
                                <CopilotIcon size={24} className={styles['IDE__Chat-copilot-indicator-label']} />
                                <Text as="span" className={styles['IDE__Chat-copilot-indicator-label']}>
                                  Copilot
                                </Text>
                              </pre>
                            )}
                          </React.Fragment>
                        )
                      })
                    ) : (
                      <pre
                        className={clsx(styles['IDE__Editor-pane'], animationStyles['Animation--slide-in-right'])}
                        dangerouslySetInnerHTML={{__html: file.code}}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showReplayButton && (
            <Button
              variant="subtle"
              hasArrow={false}
              className={styles['IDE__Editor-replay']}
              onClick={resetAnimation}
              leadingVisual={<SyncIcon size={24} />}
              size="small"
              disabled={!hasAnimated}
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
