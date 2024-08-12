import React, {useCallback, useEffect} from 'react'
import clsx from 'clsx'
import {useTextRevealAnimation} from './useTextRevealAnimation'

import styles from './TextRevealAnimation.module.css'
import {BaseProps} from '../../component-helpers'

export type TextRevealAnimationProps = BaseProps<HTMLSpanElement> &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    children: React.ReactChild
  }

export function TextRevealAnimation({children, ...rest}: TextRevealAnimationProps) {
  const [animationStarted, setAnimationStarted] = React.useState(false)
  const [hasHeroWipeAnimated, setHasHeroWipeAnimated] = React.useState(false)
  const {ref, lines} = useTextRevealAnimation(children.toString() || '')

  const onLineAnimationEnd = useCallback(
    (i: number) => {
      if (lines && i === lines.length - 1) {
        setHasHeroWipeAnimated(true)
      }
    },
    [lines],
  )

  useEffect(() => {
    const el = ref.current
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
  }, [ref])

  if (typeof children !== 'string' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
    // eslint-disable-next-line no-console
    console.warn('Children passed to TextRevealAnimation must be a string')
    return null
  }

  return (
    <span ref={ref} {...rest}>
      {lines?.map((line, i) => (
        <React.Fragment key={line}>
          <span
            className={clsx(
              styles.TextRevealAnimation,
              animationStarted && styles['TextRevealAnimation--visible'],
              animationStarted &&
                (hasHeroWipeAnimated ? styles['TextRevealAnimation'] : styles['TextRevealAnimation--animated']),
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
}
