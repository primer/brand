import React from 'react'
import styles from './River.module.css'
import {Heading, HeadingTags, Text, Link} from '../'
import clsx from 'clsx'

export type RiverProps = {
  className?: string
  imageTextRatio?: '60:40' | '50:50'
  align?: 'left' | 'right' | 'center'
}

function Root({imageTextRatio = '50:50', align = 'left', className, children}: React.PropsWithChildren<RiverProps>) {
  return (
    <div
      className={clsx(
        styles.river,
        styles[`river--${imageTextRatio.replace(':', '-')}`],
        styles[`river--align-${align}`],
        className
      )}
    >
      {children}
    </div>
  )
}

function Content({children}) {
  const HeadingChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === Heading
  )

  const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)

  const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)

  const inferCorrectHeadingSize = (Component: React.ReactElement) => {
    const {as}: {as: typeof HeadingTags[number] | undefined} = Component.props
    if (as) {
      if (HeadingTags.includes(as)) {
        return as
      }
    }
    return 'h3'
  }

  return (
    <div className={styles.content}>
      {React.isValidElement(HeadingChild) && (
        <div className={styles.heading}>
          {React.cloneElement(HeadingChild, {as: inferCorrectHeadingSize(HeadingChild)})}
        </div>
      )}
      <div className={styles.bodyText}>
        {React.isValidElement(TextChild) &&
          React.cloneElement(TextChild, {
            variant: 'muted',
            as: 'p',
            className: clsx(styles.text, TextChild.props.className)
          })}
      </div>

      <div className={styles['call-to-action']}>
        {React.isValidElement(LinkChild) && React.cloneElement(LinkChild, {size: 'large'})}
      </div>
    </div>
  )
}

function Visual({children}) {
  return <div className={styles.visual}>{children}</div>
}

/**
 * Alternating text and image pairs.
 */
export const River = Object.assign(Root, {Visual, Content})
