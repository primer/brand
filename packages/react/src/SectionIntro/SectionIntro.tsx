import React, {forwardRef} from 'react'
import clsx from 'clsx'
import {Button} from '../Button'
import {Heading} from '../Heading'
import {Stack} from '../Stack'
import {Text} from '../Text'
import styles from './SectionIntro.module.css'

import type {BaseProps} from '../component-helpers'

type Action = {
  text: string
  href: string
  subtle?: boolean
}

export type SectionIntroProps = BaseProps<HTMLDivElement> & {
  heading: string | React.ReactElement
  description?: string | React.ReactElement
  action?: Action
  align?: 'start' | 'center'
}

export const SectionIntro = forwardRef<HTMLDivElement, SectionIntroProps>(
  ({className, heading, description, action, align = 'start', ...props}, ref) => {
    const stackAlignment = align === 'start' ? 'flex-start' : 'center'
    const classNames = clsx(styles.SectionIntro, styles[`SectionIntro--align-${align}`], className)

    return (
      <Stack className={classNames} alignItems={stackAlignment} ref={ref} {...props}>
        <Stack alignItems={stackAlignment} padding="none">
          <Heading className={styles['SectionIntro-heading']} as="h2">
            {heading}
          </Heading>

          <>
            {description ? (
              <Text className={styles['SectionIntro-description']} as="p" size="400" variant="muted">
                {description}
              </Text>
            ) : null}
          </>
        </Stack>

        <>
          {action ? (
            <Button as="a" variant={action.subtle ? 'subtle' : 'secondary'} href={action.href}>
              {action.text}
            </Button>
          ) : null}
        </>
      </Stack>
    )
  }
)
