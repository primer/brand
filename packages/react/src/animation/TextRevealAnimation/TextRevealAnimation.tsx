import React, {useEffect} from 'react'
import {clsx} from 'clsx'
import {useTextRevealAnimationLines} from './useTextRevealAnimationLines'

import styles from './TextRevealAnimation.module.css'
import {BaseProps} from '../../component-helpers'
import {useProvidedRefOrCreate} from '../../hooks/useRef'

export type TextRevealAnimationProps = BaseProps<HTMLSpanElement> &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    children: string
  }

export const TextRevealAnimation = React.forwardRef<HTMLSpanElement, TextRevealAnimationProps>(
  function TextRevealAnimation({children, ...rest}, forwardedRef) {
    const spanRef = useProvidedRefOrCreate<HTMLSpanElement>(
      forwardedRef as React.RefObject<HTMLSpanElement> | React.RefCallback<HTMLSpanElement> | null,
    )
    const {lines} = useTextRevealAnimationLines(children || '', spanRef)
    const [animationStarted, setAnimationStarted] = React.useState(false)
    const [hasAnimationCompleted, setHasAnimationCompleted] = React.useState(false)

    const onLineAnimationEnd = (i: number) => {
      if (lines && i === lines.length - 1) {
        setHasAnimationCompleted(true)
      }
    }

    useEffect(() => {
      const el = spanRef.current
      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setAnimationStarted(true)
              if (el) {
                observer.unobserve(el)
              }
            }
          }
        },
        {
          threshold: 1,
          rootMargin: '0px 0px -10% 0px',
        },
      )

      if (el) {
        observer.observe(el)
      }

      return () => {
        if (el) {
          observer.unobserve(el)
        }
      }
    }, [spanRef])

    if (typeof children !== 'string' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
      // eslint-disable-next-line no-console
      console.warn('Children passed to TextRevealAnimation must be a string')
      return null
    }

    return (
      <span ref={spanRef} {...rest}>
        {lines?.map((line, i) => (
          <React.Fragment key={line}>
            <span
              className={clsx(
                styles.TextRevealAnimation,
                animationStarted && styles['TextRevealAnimation--visible'],
                animationStarted &&
                  (hasAnimationCompleted ? styles['TextRevealAnimation'] : styles['TextRevealAnimation--animated']),
              )}
              style={{'--animation-delay': `${220 + i * 200}ms`} as React.CSSProperties}
              onAnimationEnd={() => onLineAnimationEnd(i)}
            >
              {line}
            </span>{' '}
            {/* The trailing space above is intentional. It prevents adjacent words at the start/end of lines from being rendered as a single word */}
          </React.Fragment>
        ))}
      </span>
    )
  },
)
