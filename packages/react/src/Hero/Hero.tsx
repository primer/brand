import React, {forwardRef} from 'react'
import clsx from 'clsx'
import styles from './Hero.module.css'
import {Button} from '../Button'
import {Heading, HeadingTags} from '../Heading'
import {Text} from '../Text'

import type {BaseProps} from '../component-helpers'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/hero/base.css'

export type HeroProps = BaseProps<HTMLDivElement> & {
  align?: 'start' | 'center'
  children: React.ReactNode | React.ReactNode[] // Maybe use this from `FAQ`? type FAQRootProps = PropsWithChildren<BaseProps<HTMLElement>>
}

const Root = forwardRef<HTMLDivElement, HeroProps>(({className, align = 'start', children, ...rest}, ref) => {
  return (
    <section className={clsx(styles.Hero, styles[`Hero--align-${align}`], className)} ref={ref} {...rest}>
      {children}
    </section>
  )
})

type HeroHeadingProps = {
  as?: HeadingTags['as']
  children: React.ReactNode | React.ReactNode[]
}

const HeroHeading = forwardRef<HTMLHeadingElement, HeroHeadingProps>(({as = 'h1', children, ...rest}, ref) => {
  return (
    <Heading className={styles['Hero-heading']} as={as} ref={ref} {...rest}>
      {children}
    </Heading>
  )
})

type HeroDescriptionProps = {
  children: React.ReactNode | React.ReactNode[]
}

const HeroDescription = forwardRef<HTMLParagraphElement, HeroDescriptionProps>(({children}, ref) => {
  return (
    <Text className={styles['Hero-description']} as="p" size="400" variant="muted">
      {children}
    </Text>
  )
})

type HeroActions = {
  href: string
  children: React.ReactNode | React.ReactNode[]
}

const HeroPrimaryAction = forwardRef<HTMLAnchorElement, HeroActions>(({href, children}, ref) => {
  return (
    <Button as="a" variant="primary" size="large" href={href}>
      {children}
    </Button>
  )
})

const HeroSecondaryAction = forwardRef<HTMLAnchorElement, HeroActions>(({href, children}, ref) => {
  return (
    <Button as="a" variant="secondary" size="large" href={href}>
      {children}
    </Button>
  )
})

// export const Hero = forwardRef<HTMLDivElement, HeroProps>(
//   ({className, heading, description, primaryAction, secondaryAction, align = 'start', ...rest}, ref) => {
//     return (
//       <div className={clsx(styles.Hero, styles[`Hero--align-${align}`], className)} ref={ref} {...rest}>
//         <Heading className={styles['Hero-heading']} as="h1">
//           {heading}
//         </Heading>
//         {description ? (
//           <Text className={styles['Hero-description']} as="p" size="400" variant="muted">
//             {description}
//           </Text>
//         ) : null}
//         <div className={styles['Hero-actions']}>
//           <Button as="a" variant="primary" size="large" href={primaryAction.href}>
//             {primaryAction.text}
//           </Button>
//           {secondaryAction ? (
//             <Button as="a" variant="secondary" size="large" href={secondaryAction.href}>
//               {secondaryAction.text}
//             </Button>
//           ) : null}
//         </div>
//       </div>
//     )
//   }
// )

export const Hero = Object.assign(Root, {
  Heading: HeroHeading,
  Description: HeroDescription,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction
})
