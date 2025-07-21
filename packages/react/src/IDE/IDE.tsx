import {CopilotIcon, PaperAirplaneIcon} from '@primer/octicons-react'
import clsx from 'clsx'
import React, {
  Children,
  forwardRef,
  isValidElement,
  memo,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {Avatar, Text, TextInput} from '..'
import type {BaseProps} from '../component-helpers'
import {useTabs} from '../hooks/useTabs'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/ide/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/ide/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import animationStyles from '../animation/Animation.module.css'
import styles from './IDE.module.css'
import {useProvidedRefOrCreate} from '../hooks/useRef'

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
    const [animationIsPaused, setAnimationIsPaused] = useState(false)
    const [chatAnimationIsDone, setChatAnimationIsDone] = useState(false)
    const [editorAnimationIsDone, setEditorAnimationIsDone] = useState(false)
    const chatRef = useRef<IDEChatHandle>(null)
    const editorRef = useRef<IDEEditorHandle>(null)

    useEffect(() => {
      if (chatAnimationIsDone && editorAnimationIsDone) {
        setAnimationIsPaused(false)
      }
    }, [chatAnimationIsDone, editorAnimationIsDone])

    const childrenArray = useMemo(() => Children.toArray(children), [children])

    const ChatChild = childrenArray.find(child => isValidElement(child) && child.type === IDE.Chat)
    const hasChatChild = !!ChatChild
    const ClonedChatChild = hasChatChild
      ? React.cloneElement(ChatChild as React.ReactElement, {
          ref: chatRef,
          'data-testid': testId || testIds.chat,
          animationIsPaused,
          setAnimationIsDone: setChatAnimationIsDone,
        })
      : null

    const EditorChild = childrenArray.find(child => isValidElement(child) && child.type === IDE.Editor)
    const hasEditorChild = !!EditorChild
    const ClonedEditorChild = hasEditorChild
      ? React.cloneElement(EditorChild as React.ReactElement, {
          ref: editorRef,
          'data-testid': testId || testIds.editor,
          animationIsPaused,
          setAnimationIsDone: setEditorAnimationIsDone,
        })
      : null

    // If a child exists, we need to account for its animation state
    const allAnimationsAreDone = (!hasChatChild || chatAnimationIsDone) && (!hasEditorChild || editorAnimationIsDone)

    const onPlayPause = useCallback(
      isPlaying => {
        if (allAnimationsAreDone) {
          setChatAnimationIsDone(false)
          setEditorAnimationIsDone(false)
          chatRef.current?.resetAnimation()
          editorRef.current?.resetAnimation()
        } else {
          setAnimationIsPaused(!isPlaying)
        }
      },
      [allAnimationsAreDone],
    )

    return (
      <section
        data-testid={testId || testIds.root}
        className={clsx(
          styles[`IDE--${variant}`],
          hasChatChild && hasEditorChild && styles['IDE--full-exp'],
          hasChatChild && !hasEditorChild && styles['IDE--chat-only'],
          className,
        )}
      >
        <div {...rest}>
          <div
            className={styles['IDE__inner']}
            style={{['--brand-IDE-height' as string]: height ? `${height}px` : undefined}}
          >
            <div className={styles.IDE__main}>
              {ClonedChatChild}
              {ClonedEditorChild}
            </div>
            <PlayPauseButton isPlaying={!animationIsPaused && !allAnimationsAreDone} onPlayPause={onPlayPause} />
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
  /**
   * Internal prop used for controlling the animation state
   */
  animationIsPaused?: boolean
  /**
   * Internal prop used for controlling the animation state
   */
  setAnimationIsDone?: (isDone: boolean) => void
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

type IDEChatHandle = HTMLElement & {
  resetAnimation: () => void
}

const _Chat = memo(
  forwardRef<IDEChatHandle, IDEChatProps>(
    (
      {
        'data-testid': testId,
        script,
        animationDelay = 3000,
        alternativeText,
        animationIsPaused,
        setAnimationIsDone,
        ...rest
      },
      forwardedRef,
    ) => {
      const ref = useProvidedRefOrCreate(forwardedRef)
      const delay = animationDelay
      const messagesRef = useRef<HTMLDivElement>(null)
      const [scheduledAnimations, setScheduledAnimations] = useState<IDEChatAnimation[]>([])

      const scrollIntoParentView = useCallback((element: Element | null) => {
        if (!element || !messagesRef.current) return
        const container = messagesRef.current
        const elementRect = element.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
          container.scrollTop += elementRect.top - containerRect.top
        }
      }, [])

      const scheduleAnimations = useCallback(() => {
        if (!script.length) return

        const allMessages = document.querySelectorAll(`.${styles['IDE__Chat-message']}`)
        const defaultMessages = Array.from(allMessages).slice(0, 1)
        const newerMessages = Array.from(allMessages).slice(1)

        const animations: IDEChatAnimation[] = []

        if (defaultMessages[0]) {
          animations.push({
            delay: 0,
            action: 'show',
            element: defaultMessages[0] as HTMLElement,
          })
        }

        animations.push({
          delay: delay / 4,
          action: 'delay',
        })

        for (const [index, message] of newerMessages.entries()) {
          animations.push({
            delay,
            action: 'show',
            element: message as HTMLElement,
            shouldScroll: index % 2 === 0,
            shouldFadePrevious: true,
            messageIndex: index,
            isLast: index === newerMessages.length - 1,
          })
        }

        animations.push({
          delay: 100,
          isDone: true,
        })

        setScheduledAnimations(animations)
      }, [script, delay])

      const resetAnimation = useCallback(() => {
        setAnimationIsDone?.(false)

        const allMessages = document.querySelectorAll(`.${styles['IDE__Chat-message']}`)
        for (const message of allMessages) {
          message.classList.remove(styles['IDE__Chat-message--visible'], styles['IDE__Chat-message--faded'])
        }

        if (messagesRef.current) {
          messagesRef.current.scrollTop = 0
        }

        scheduleAnimations()
      }, [scheduleAnimations, setAnimationIsDone])

      useImperativeHandle(ref, () => {
        if (!ref.current) {
          return {
            resetAnimation,
          } as IDEChatHandle
        }

        return {
          ...ref.current,
          resetAnimation,
        }
      })

      useEffect(() => {
        scheduleAnimations()
      }, [scheduleAnimations])

      useEffect(() => {
        let prevTimestamp = -1
        let animationId: number

        const animate: FrameRequestCallback = timestamp => {
          if (scheduledAnimations.length === 0 || animationIsPaused) {
            if (animationIsPaused) {
              // Reset timestamp when paused so we don't accumulate time
              prevTimestamp = -1
            }
            animationId = requestAnimationFrame(animate)
            return
          }

          const diff = prevTimestamp === -1 ? 0 : timestamp - prevTimestamp
          prevTimestamp = timestamp

          const nextAnimation = scheduledAnimations[0]

          if (nextAnimation.isDone) {
            setAnimationIsDone?.(true)
            return
          }

          nextAnimation.delay -= diff

          if (nextAnimation.delay <= 0) {
            if (nextAnimation.action === 'delay') {
              // Just a delay, no visual action needed
              setScheduledAnimations(current => current.slice(1))
            } else {
              const animation = nextAnimation as IDEChatAnimationWithElement

              if (animation.shouldScroll) {
                scrollIntoParentView(animation.element)
              }

              if (animation.shouldFadePrevious) {
                // Fade previous messages
                const allMessages = document.querySelectorAll(`.${styles['IDE__Chat-message']}`)
                const defaultMessages = Array.from(allMessages).slice(0, 1)
                const newerMessages = Array.from(allMessages).slice(1)

                for (const defaultMessage of defaultMessages) {
                  defaultMessage.classList.add(styles['IDE__Chat-message--faded'])
                }

                const filteredNewerMessage = newerMessages.filter((_, i) => i < (animation.messageIndex ?? 0))
                for (const filteredMessage of filteredNewerMessage) {
                  filteredMessage.classList.add(styles['IDE__Chat-message--faded'])
                }

                // Remove faded class from all messages at the end
                if (animation.isLast) {
                  setTimeout(() => {
                    for (const defaultMessage of defaultMessages) {
                      defaultMessage.classList.remove(styles['IDE__Chat-message--faded'])
                    }
                    for (const newerMessage of newerMessages) {
                      newerMessage.classList.remove(styles['IDE__Chat-message--faded'])
                    }
                  }, 100)
                }
              }

              animation.element.classList.add(styles['IDE__Chat-message--visible'])
              setScheduledAnimations(current => current.slice(1))
            }
          }

          animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)

        return () => {
          if (animationId) {
            cancelAnimationFrame(animationId)
          }
        }
      }, [scheduledAnimations, scrollIntoParentView, animationIsPaused, setAnimationIsDone])

      return (
        <section className={styles.IDE__Chat} data-testid={testId || testIds.chat} {...rest} ref={ref}>
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
    },
  ),
)

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
   * Test id for the IDE.
   */
  'data-testid'?: string
  /**
   * Enable user customisation of the icons used in file tabs.
   */
  tabIcons?: IDEEditorTabIcon
  /**
   * Internal prop used for controlling the animation state
   */
  animationIsPaused?: boolean
  /**
   * Internal prop used for controlling the animation state
   */
  setAnimationIsDone?: (isDone: boolean) => void
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

type IDEAnimation = {
  delay: number
  isDone?: boolean
  tab: string | null
} & ({elements: HTMLElement[]} | {isDone: true})

type IDEChatAnimation = {
  delay: number
  isDone?: boolean
} & (
  | {
      action: 'show'
      element: HTMLElement
      shouldScroll?: boolean
      shouldFadePrevious?: boolean
      messageIndex?: number
      isLast?: boolean
    }
  | {action: 'delay'}
  | {isDone: true}
)

type IDEChatAnimationWithElement = {
  delay: number
  action: 'show'
  element: HTMLElement
  shouldScroll?: boolean
  shouldFadePrevious?: boolean
  messageIndex?: number
  isLast?: boolean
}

type IDEEditorHandle = HTMLElement & {
  resetAnimation: () => void
}

const _Editor = memo(
  forwardRef<IDEEditorHandle, IDEEditorProps>(
    (
      {
        activeTab = 0,
        'data-testid': testId,
        files,
        triggerAnimation = false,
        showLineNumbers = true,
        size = 'medium',
        tabIcons = IDEDefaultIconMap,
        animationIsPaused,
        setAnimationIsDone,
        ...rest
      },
      forwardedRef,
    ) => {
      const ref = useProvidedRefOrCreate(forwardedRef)
      const presRef = useRef<HTMLDivElement>(null)
      const [scheduledAnimations, setScheduledAnimations] = useState<IDEAnimation[]>([])

      const tabs = useTabs({
        defaultTab: activeTab.toString(),
        autoActivate: true,
        onTabActivate: (_, activeTabRef) => {
          activeTabRef?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'})
          resetAnimation()
        },
      })

      const scheduleAnimations = useCallback(() => {
        if (!presRef.current) return

        const pres = presRef.current.querySelectorAll<HTMLPreElement>('pre:not([data-has-suggestion="true"])')
        const copilotSuggestions = presRef.current.querySelectorAll<HTMLPreElement>('pre[data-has-suggestion="true"]')

        const animations: IDEAnimation[] = []

        for (const pre of pres) {
          animations.push({
            delay: 200,
            elements: [pre],
            tab: tabs.activeTab,
          })
        }

        animations.push({
          delay: 1000,
          elements: Array.from(copilotSuggestions),
          tab: tabs.activeTab,
        })

        animations.push({
          delay: 200,
          isDone: true,
          tab: tabs.activeTab,
        })

        setScheduledAnimations(animations)
      }, [tabs.activeTab])

      const resetAnimation = useCallback(() => {
        setScheduledAnimations([])
        setAnimationIsDone?.(false)

        const pres = presRef.current?.querySelectorAll('pre')
        if (pres) {
          for (const pre of pres) {
            pre.classList.remove(animationStyles['Animation--active'])
          }
        }

        scheduleAnimations()
      }, [scheduleAnimations, setAnimationIsDone])

      useImperativeHandle(ref, () => {
        if (!ref.current) {
          return {
            resetAnimation,
          } as IDEEditorHandle
        }

        return {
          ...ref.current,
          resetAnimation,
        }
      })

      useEffect(() => {
        scheduleAnimations()
      }, [scheduleAnimations, triggerAnimation])

      useEffect(() => {
        let prevTimestamp = -1
        let animationId: number

        const animate: FrameRequestCallback = timestamp => {
          if (scheduledAnimations.length === 0 || tabs.activeTab === null) {
            return
          }

          if (animationIsPaused) {
            // Reset timestamp when paused so we don't accumulate time
            prevTimestamp = -1
            animationId = requestAnimationFrame(animate)
            return
          }

          const diff = prevTimestamp === -1 ? 0 : timestamp - prevTimestamp
          prevTimestamp = timestamp

          const nextAnimation = scheduledAnimations[0]

          if (nextAnimation.isDone) {
            setAnimationIsDone?.(true)
            return
          }

          if (nextAnimation.tab !== tabs.activeTab) {
            return
          }

          nextAnimation.delay -= diff

          if (nextAnimation.delay <= 0) {
            for (const element of nextAnimation.elements) {
              element.classList.add(animationStyles['Animation--active'])
            }
            setScheduledAnimations(current => current.slice(1))
          }

          animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)

        return () => {
          if (animationId) {
            cancelAnimationFrame(animationId)
          }
        }
      }, [scheduledAnimations, animationIsPaused, setAnimationIsDone, tabs.activeTab])

      return (
        <div
          className={clsx(styles.IDE__Editor, styles[`IDE__Editor--${size}`])}
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
        </div>
      )
    },
  ),
)

const PauseIcon = () => (
  <svg fill="none" role="presentation" aria-hidden="true" viewBox="3.17 2.28 13.7 15.42">
    <path
      d="M4.66148 2.3125C3.83593 2.3125 3.16669 2.98174 3.16669 3.80729V16.1927C3.16669 17.0183 3.83593 17.6875 4.66148 17.6875H7.65106C8.47662 17.6875 9.14586 17.0183 9.14586 16.1927V3.80729C9.14586 2.98174 8.47662 2.3125 7.65106 2.3125H4.66148ZM4.44794 3.80729C4.44794 3.68936 4.54355 3.59375 4.66148 3.59375H7.65106C7.769 3.59375 7.86461 3.68936 7.86461 3.80729V16.1927C7.86461 16.3106 7.769 16.4062 7.65106 16.4062H4.66148C4.54355 16.4062 4.44794 16.3106 4.44794 16.1927V3.80729ZM12.349 2.3125C11.5235 2.3125 10.8542 2.98174 10.8542 3.80729V16.1927C10.8542 17.0183 11.5235 17.6875 12.349 17.6875H15.3386C16.1642 17.6875 16.8334 17.0183 16.8334 16.1927V3.80729C16.8334 2.98174 16.1642 2.3125 15.3386 2.3125H12.349ZM12.1355 3.80729C12.1355 3.68936 12.2311 3.59375 12.349 3.59375H15.3386C15.4565 3.59375 15.5521 3.68936 15.5521 3.80729V16.1927C15.5521 16.3106 15.4565 16.4062 15.3386 16.4062H12.349C12.2311 16.4062 12.1355 16.3106 12.1355 16.1927V3.80729Z"
      fill="currentColor"
    ></path>
  </svg>
)
const PlayIcon = () => (
  <svg fill="none" role="presentation" aria-hidden="true" viewBox="4.02 2.3 14.43 15.4">
    <path
      d="M6.24905 3.69194C5.82218 3.45967 5.30225 3.76868 5.30225 4.25466V15.7452C5.30225 16.2312 5.82218 16.5402 6.24906 16.3079L16.8079 10.5626C17.2538 10.32 17.2538 9.67983 16.8079 9.4372L6.24905 3.69194ZM4.021 4.25466C4.021 2.79672 5.58078 1.86969 6.86142 2.56651L17.4203 8.31176C18.758 9.03966 18.758 10.9602 17.4203 11.6881L6.86143 17.4333C5.58079 18.1301 4.021 17.2031 4.021 15.7452V4.25466Z"
      fill="currentColor"
    ></path>
  </svg>
)

type PlayPauseButtonProps = {
  isPlaying?: boolean
  onPlayPause?: (isPlaying: boolean) => void
}

const PlayPauseButton = ({isPlaying = true, onPlayPause}: PlayPauseButtonProps) => {
  const onClick = useCallback(() => {
    onPlayPause?.(!isPlaying)
  }, [onPlayPause, isPlaying])

  /**
   * aria-pressed is intentionally not used here to prevent potentially confusing screen reader announcements
   * eg "Play animation on" or "Pause animation off"
   */
  return (
    <button
      className={styles['IDE__play-pause-button']}
      type="button"
      onClick={onClick}
      aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}

/**
 * Use IDE to display a decorative editor component
 * @see https://primer.style/brand/components/IDE
 */
export const IDE = Object.assign(_IDERoot, {
  testIds,
  Chat: _Chat,
  Editor: _Editor,
})
