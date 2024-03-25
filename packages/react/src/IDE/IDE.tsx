import React, {
  Children,
  forwardRef,
  isValidElement,
  memo,
  PropsWithChildren,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {Avatar, ColorModesEnum, Text, TextInput, ThemeProvider} from '..'

import {CommentIcon, CopilotIcon, FileIcon, GitBranchIcon, PaperAirplaneIcon, SearchIcon} from '@primer/octicons-react'
import {default as clsx} from 'clsx'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/action-menu/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import animationStyles from '../animation/Animation.module.css'
import styles from './IDE.module.css'

const testIds = {
  root: 'IDE',
  get chat() {
    return `${this.root}-chat`
  },
}

export type IDEProps = {
  /**
   * Description of the IDE for users of assistive technologies.
   * IDE is considered a decorative element, so this description is important
   * for accurately describing what the user is being presented.
   */
  'aria-label': string
  /**
   * Test id for the IDE
   */
  'data-testid'?: string
  /**
   * Color mode
   */
  mode?: ColorModesEnum.LIGHT | ColorModesEnum.DARK
} & BaseProps<HTMLDivElement>

const _IDERoot = memo(
  ({'aria-label': ariaLabel, children, 'data-testid': mode = ColorModesEnum.DARK}: PropsWithChildren<IDEProps>) => {
    // const ActivityBarChild = Children.toArray(children).find(
    //   child => isValidElement(child) && child.type === IDE.ActivityBar,
    // )

    const ChatChild = Children.toArray(children).find(child => isValidElement(child) && child.type === IDE.Chat)

    const EditorChild = Children.toArray(children).find(child => isValidElement(child) && child.type === IDE.Editor)

    return (
      <ThemeProvider
        colorMode={mode as ColorModesEnum.LIGHT | ColorModesEnum.DARK | undefined}
        role="presentation"
        aria-label={ariaLabel}
      >
        <div className={clsx(styles[`IDE--color-mode-${mode}`], ChatChild && EditorChild && styles['IDE--full-exp'])}>
          <div className={styles['IDE__inner']}>
            {/* <div className={styles.IDE__dots}>
            <div className={clsx(styles['IDE__dot'], styles['IDE__dot--red'])}></div>
            <div className={clsx(styles['IDE__dot'], styles['IDE__dot--amber'])}></div>
            <div className={clsx(styles['IDE__dot'], styles['IDE__dot--green'])}></div>
          </div> */}
            <div className={styles.IDE__main}>
              {/* <div>{ActivityBarChild}</div> */}
              {ChatChild && <>{ChatChild}</>}
              {EditorChild && <>{EditorChild}</>}
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
  },
)

type IDEActivityBarProps = {
  active?: 'explorer' | 'search' | 'source control' | 'run and debug' | 'extensions' | 'chat'
} & BaseProps<HTMLDivElement>

const _ActivityBar = memo(({active}: IDEActivityBarProps) => {
  const [activeTab, setActiveTab] = useState(active || 'chat')

  const handlePress = useCallback(
    newTab => {
      setActiveTab(newTab)
    },
    [setActiveTab],
  )

  return (
    <div className={styles.IDE__ActivityBar}>
      <button className={clsx(activeTab === 'explorer' && styles.active)} onClick={() => handlePress('explorer')}>
        <FileIcon size={24} />
      </button>

      <button className={clsx(activeTab === 'search' && styles.active)} onClick={() => handlePress('search')}>
        <SearchIcon size={24} />
      </button>

      <button
        className={clsx(activeTab === 'source control' && styles.active)}
        onClick={() => handlePress('source control')}
      >
        <GitBranchIcon size={24} />
      </button>

      <button className={clsx(activeTab === 'chat' && styles.active)} onClick={() => handlePress('chat')}>
        <CommentIcon size={24} />
      </button>
    </div>
  )
})

type IDEChatProps = {
  script: IDEChatMessage[]
} & BaseProps<HTMLElement>

type MessageRole = 'user' | 'assistant'

export type IDEChatMessage = {
  role: MessageRole
  handle: string
  avatar: string
  message: string
  codeSnippet?: string
  highlighter?: 'hljs'
}

const _Chat = memo(({script}: IDEChatProps) => {
  const delay = 2000
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollIntoParentView = element => {
      if (!element || !messagesRef?.current) return
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
      newerMessages.forEach((message, index) => {
        setTimeout(() => {
          if (index % 2 === 0) {
            scrollIntoParentView(message)
          }

          defaultMessages.forEach((message, i) => {
            message.classList.add(styles['IDE__Chat-message--faded'])
          })
          newerMessages
            .filter((_, i) => i < index)
            .forEach((message, i) => {
              message.classList.add(styles['IDE__Chat-message--faded'])
            })

          message.classList.add(styles['IDE__Chat-message--visible'])

          // remove faded class from all messages at the end
          if (index === newerMessages.length - 1) {
            defaultMessages.forEach(message => {
              message.classList.remove(styles['IDE__Chat-message--faded'])
            })
            newerMessages.forEach(message => {
              message.classList.remove(styles['IDE__Chat-message--faded'])
            })
          }
        }, delay * (index + 1))
      })
    }, delay / 4)
  }, [script])

  return (
    <section className={styles.IDE__Chat}>
      {/* <h3 className={styles['IDE__Chat-title']}>Chat: GitHub Copilot</h3> */}
      <div ref={messagesRef} className={styles['IDE__Chat-messages']}>
        {script && script.length > 0 ? (
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

                {message.highlighter === 'hljs' && message.codeSnippet && (
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
          ))
        ) : (
          <div className={styles['IDE__Chat-message']}>
            <div className={styles['IDE__Chat-message-content']}>
              <div className={styles['IDE__Chat-message-text']}>No messages</div>
            </div>
          </div>
        )}
      </div>
      <div className={styles['IDE__Chat-input-area']}>
        <TextInput
          disabled
          className={styles['IDE__Chat-input']}
          fullWidth
          placeholder="Ask a question or type '/' for commands."
          trailingVisual={<PaperAirplaneIcon />}
        />
      </div>
    </section>
  )
})

type IDEEditorProps = {
  activeTab?: number
  files: IDEEditorFile[]
  showLineNumbers?: boolean
  /**
   * Controls editor text size
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Used for triggering animation externally
   */
  triggerAnimation?: boolean
} & BaseProps<HTMLDivElement>

export type IDEEditorFile = {
  name: string
  /**
   * Controls line at which the Copilot suggestion begins
   */
  suggestedLineStart?: number
  animatedLineStart?: number // where animation begins
  code: string | string[]
  highlighter?: 'hljs'
}

const _Editor = memo(
  forwardRef(
    (
      {activeTab = 0, files, triggerAnimation, showLineNumbers = true, size = 'small', ...props}: IDEEditorProps,
      ref: Ref<HTMLDivElement>,
    ) => {
      const presRef = useRef<HTMLDivElement>(null)
      const [activeFile, setActiveFile] = useState(activeTab)
      const [animationIsActive, setAnimationIsActive] = useState(triggerAnimation)

      const handlePress = useCallback(
        (index: number) => {
          setActiveFile(index)
        },
        [setActiveFile],
      )

      useEffect(() => {
        setAnimationIsActive(true)
        const pres = presRef.current?.querySelectorAll('pre')

        let fixedDelay = 0
        // incrementally make visible
        pres?.forEach((pre, index) => {
          if (pre.getAttribute('data-has-suggestion') === 'true' && fixedDelay === 0) {
            fixedDelay = 200 * index * 1.5
            setTimeout(() => {
              pre.classList.add(animationStyles['Animation--active'])
            }, fixedDelay)
          } else if (pre.getAttribute('data-has-suggestion') === 'true' && fixedDelay > 0) {
            setTimeout(() => {
              pre.classList.add(animationStyles['Animation--active'])
            }, fixedDelay)
          } else {
            setTimeout(() => {
              pre.classList.add(animationStyles['Animation--active'])
            }, 200 * index)
          }
        })

        if (animationIsActive) {
          setAnimationIsActive(false)
        }

        return () => {
          pres?.forEach(pre => {
            pre.classList.remove(animationStyles['Animation--active'])
          })
        }
      }, [activeFile, activeTab, triggerAnimation])
      return (
        <div className={clsx(styles.IDE__Editor, styles[`IDE__Editor--${size}`])} ref={ref} {...props}>
          <div className={styles['IDE__Editor-tabs']}>
            {files.map((file, index) => (
              <button
                key={index}
                className={clsx(styles['IDE__Editor-tab'], activeFile === index && styles.active)}
                onClick={() => handlePress(index)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path
                    d="M7.76475 8.20451H6.58238C5.75472 8.20451 5.22266 8.73658 5.22266 9.56423V10.6284C5.22266 10.7466 5.16354 10.8057 5.0453 10.8057H4.51324C3.98117 10.8057 3.56734 10.5692 3.33087 10.0963C3.15351 9.74159 3.03528 9.38688 3.03528 9.03217C2.97616 8.38187 2.97616 7.73156 3.21263 7.08126C3.38999 6.5492 3.7447 6.13537 4.33588 6.01713H7.76475C7.82386 6.01713 7.9421 6.01713 7.9421 5.95801V5.66242C7.9421 5.66242 7.82386 5.6033 7.76475 5.6033H5.75472C5.57737 5.6033 5.51825 5.54418 5.51825 5.36683V4.59829C5.51825 4.18446 5.6956 3.88887 6.05031 3.77063C6.3459 3.6524 6.6415 3.53416 6.93709 3.47504C7.64651 3.35681 8.35593 3.35681 9.06535 3.53416C9.36094 3.59328 9.65653 3.71152 9.89301 3.88887C10.1295 4.12534 10.3068 4.36182 10.2477 4.71653V6.84479C10.2477 7.67244 9.77477 8.14539 8.94711 8.14539C8.53328 8.20451 8.11946 8.20451 7.76475 8.20451ZM6.10943 4.65741C6.10943 4.89388 6.28679 5.13036 6.58238 5.13036C6.81885 5.13036 7.05532 4.89388 7.05532 4.65741C7.05532 4.42094 6.81885 4.24358 6.58238 4.18446C6.28679 4.18446 6.10943 4.42094 6.10943 4.65741ZM8.23769 8.79569H9.42006C10.2477 8.79569 10.7798 8.26363 10.7798 7.43597V6.37184C10.7798 6.2536 10.8389 6.19449 10.9571 6.19449H11.4892C12.0213 6.19449 12.4351 6.43096 12.6716 6.90391C12.8489 7.25862 12.9672 7.61333 12.9672 7.96804C13.0263 8.61834 13.0263 9.26864 12.7898 9.91894C12.6124 10.451 12.2577 10.8648 11.6666 10.9831H8.23769C8.17857 10.9831 8.06034 10.9831 8.06034 11.0422V11.3378C8.06034 11.3378 8.17857 11.3969 8.23769 11.3969H10.2477C10.4251 11.3969 10.4842 11.456 10.4842 11.6334V12.4019C10.4842 12.8157 10.3068 13.1113 9.95212 13.2296C9.65653 13.3478 9.36094 13.466 9.06535 13.5252C8.35593 13.6434 7.64651 13.6434 6.93709 13.466C6.6415 13.4069 6.3459 13.2887 6.10943 13.1113C5.87296 12.8749 5.6956 12.6384 5.75472 12.2837V10.1554C5.75472 9.32776 6.22767 8.85481 7.05532 8.85481C7.46915 8.79569 7.88298 8.79569 8.23769 8.79569ZM9.89301 12.3428C9.89301 12.1063 9.71565 11.8698 9.42006 11.8698C9.18358 11.8698 8.94711 12.1063 8.94711 12.3428C8.94711 12.5793 9.18358 12.7566 9.42006 12.8157C9.71565 12.8157 9.89301 12.5793 9.89301 12.3428Z"
                    fill="#519ABA"
                  />
                </svg>{' '}
                {file.name}
              </button>
            ))}
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
            {files[activeFile].highlighter === 'hljs' && Array.isArray(files[activeFile].code) && (
              <div ref={presRef}>
                {(files[activeFile].code as string[]).map((line, index) => {
                  const hasSuggestion = index + 1 >= (files[activeFile].suggestedLineStart ?? Infinity)
                  return (
                    <>
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
                          <CopilotIcon size={24} />
                          <Text as="span">Copilot</Text>
                        </pre>
                      )}
                    </>
                  )
                })}
              </div>
            )}

            {files[activeFile].highlighter === 'hljs' && typeof files[activeFile].code === 'string' && (
              <div ref={presRef}>
                <pre
                  className={clsx(styles['IDE__Editor-pane'], animationStyles['Animation--slide-in-right'])}
                  dangerouslySetInnerHTML={{__html: files[activeFile].code}}
                />
              </div>
            )}

            {!files[activeFile].highlighter && (
              <div ref={presRef}>
                <pre className={clsx(styles['IDE__Editor-pane'], animationStyles['Animation--slide-in-right'])}>
                  {files[activeFile].code}
                </pre>
              </div>
            )}
          </div>
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
  ActivityBar: _ActivityBar,
  Chat: _Chat,
  Editor: _Editor,
})
