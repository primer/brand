import React, {forwardRef, PropsWithChildren, type Ref} from 'react'
import {useId} from '@reach/auto-id' // TODO: Replace with useId from React v18 after upgrade

import clsx from 'clsx'
import {Heading, HeadingTags, LinkProps, HeadingProps, TextProps, Text, TextInput, TextInputProps, Link} from '../..'

import type {BaseProps} from '../../component-helpers'

import styles from './FormControl.module.css'
import {AlertFillIcon, AlertIcon, CheckCircleFillIcon} from '@primer/octicons-react'

export type FormControlProps = BaseProps<HTMLElement> & {
  /**
   * Only specific children are valid.
   * These include: `FormControl.Visual` and `FormControl.Content`.
   * The declarative order of the children will be ignored in the rendered output
   * to enforce correct HTML semantics.
   */
  children?: React.ReactElement

  fullWidth?: boolean
  /**
   * Unique identifier for the form control. This is used to associate the form control with the form control label.
   */
  id?: string

  required?: boolean

  validationStatus?: 'error' | 'success'

  size?: 'medium' | 'large'
}

const Root = ({
  children,
  className,
  fullWidth,
  id,
  required,
  size = 'medium',
  validationStatus,
  ...rest
}: FormControlProps) => {
  const uniqueId = useId(id)

  return (
    <section
      id={`FormControl--${id}`}
      className={clsx(styles.FormControl, fullWidth && styles[`FormControl--fullWidth`], className)}
      {...rest}
    >
      {React.Children.map(children, child => {
        if (child) {
          if (child.type === FormControlTextInput) {
            return React.cloneElement(child, {
              className: clsx(child.props.className),
              id: uniqueId,
              name: uniqueId,
              required: child.props.required || required,
              validationStatus: child.props.validationStatus || validationStatus,
              fullWidth,
              size
            })
          } else if (child.type === FormControlLabel) {
            return React.cloneElement(child, {
              className: clsx(child.props.className),
              htmlFor: uniqueId,
              children: child.props.children,
              required,
              validationStatus,
              size
            })
          } else if (child.type === FormControlValidation) {
            return React.cloneElement(child, {
              validationStatus
            })
          } else {
            return child
          }
        }
      })}
    </section>
  )
}

type FormControlTextInputProps = TextInputProps

const FormControlTextInput = ({id, ...rest}: FormControlTextInputProps) => {
  return <TextInput id={id} {...rest} />
}

type FormControlLabelProps = {
  children: string
  htmlFor: string
  required?: boolean
  validationStatus?: 'error' | 'success'
  size?: 'medium' | 'large'
} & BaseProps<HTMLLabelElement>

const FormControlLabel = ({
  children,
  className,
  htmlFor,
  required,
  size = 'medium',
  validationStatus,
  ...rest
}: FormControlLabelProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      id={`FormControl-label--${htmlFor}`}
      htmlFor={htmlFor}
      className={clsx(
        styles['FormControl-label'],
        validationStatus && styles[`FormControl-label--${validationStatus}`],
        styles[`FormControl-label--${size}`],
        className
      )}
      {...rest}
    >
      {children}
      {required && (
        <span className={styles['FormControl-label-required']} aria-hidden>
          {' '}
          *
        </span>
      )}
    </label>
  )
}

type FormControlValidationProps = {
  children: string
  validationStatus?: 'error' | 'success'
} & BaseProps<HTMLSpanElement>

const FormControlValidation = ({children, validationStatus}: FormControlValidationProps) => {
  return (
    <span
      className={clsx(
        styles['FormControl-validation'],
        validationStatus && styles['FormControl-validation--animate-in'],
        validationStatus && styles[`FormControl-validation--${validationStatus}`]
      )}
    >
      {validationStatus === 'error' && (
        <span className={styles['FormControl-validation-icon']}>
          <AlertFillIcon />
        </span>
      )}
      {validationStatus === 'success' && (
        <span className={styles['FormControl-validation-icon']}>
          <CheckCircleFillIcon />
        </span>
      )}
      {children}
    </span>
  )
}

// type FormControlContentProps = BaseProps<HTMLDivElement> & {
//   /**
//    * Escape-hatch for inserting custom React components.
//    * Warning:
//    *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
//    *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
//    */
//   trailingComponent?: React.FunctionComponent
//   /**
//    * Escape-hatch for inserting custom React components.
//    * Warning:
//    *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
//    *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
//    */
//   leadingComponent?: React.FunctionComponent
//   /**
//    * Only valid children are allowed.
//    * These include: `Heading`, `Text` and `Link`.
//    * The declarative order of the children will be ignored in the rendered output
//    * to enforce correct HTML semantics.
//    */
//   children: React.ReactElement<TextProps> | React.ReactElement<HeadingProps | TextProps | LinkProps>[]
// }

// export const getHeadingWarning = (size: typeof HeadingTags[number]) =>
//   `FormControl.Content does not accept a Heading with as="${size}". FormControl automatically applies as="h3" by default.`

// const Content = forwardRef(
//   (
//     {
//       children,
//       leadingComponent: LeadingComponent,
//       trailingComponent: TrailingComponent,
//       ...rest
//     }: FormControlContentProps,
//     ref: Ref<HTMLDivElement>
//   ) => {
//     const HeadingChild = React.Children.toArray(children).find(
//       child => React.isValidElement(child) && child.type === Heading
//     )

//     const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)

//     const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)

//     const applyHeadingSize = (Component: React.ReactElement) => {
//       const {as}: {as: typeof HeadingTags[number] | undefined} = Component.props
//       if (as) {
//         if (HeadingTags.includes(as) && as !== 'h3') {
//           // eslint-disable-next-line no-console
//           console.warn(getHeadingWarning(as))
//         }
//       }

//       return 'h3'
//     }

//     return (
//       <div className={styles.FormControl__content} {...rest} ref={ref}>
//         {LeadingComponent && (
//           <div>
//             <LeadingComponent />
//           </div>
//         )}
//         {React.isValidElement(HeadingChild) && (
//           <div className={styles.FormControl__heading}>
//             {React.cloneElement(HeadingChild, {as: applyHeadingSize(HeadingChild)})}
//           </div>
//         )}

//         {React.isValidElement(TextChild) && (
//           <div className={styles['FormControl__body-text']}>
//             {React.cloneElement(TextChild, {
//               variant: 'muted',
//               as: 'p',
//               className: clsx(styles.FormControl__text, TextChild.props.className)
//             })}
//           </div>
//         )}
//         {React.isValidElement(LinkChild) && (
//           <div className={styles['FormControl__call-to-action']}>{React.cloneElement(LinkChild, {size: 'large'})}</div>
//         )}
//         {TrailingComponent && (
//           <div>
//             <TrailingComponent />
//           </div>
//         )}
//       </div>
//     )
//   }
// )

// type FormControlVisualProps = BaseProps<HTMLDivElement> &
//   PropsWithChildren<{
//     /**
//      * Applies automatic size constraints to child images and video.
//      * This can be disabled by setting this prop to `false`.
//      */
//     fillMedia?: boolean
//     /**
//      * `img` and `video` elements will apply a shadow by default.
//      * This can be disabled by setting this prop to `false`.
//      */
//     hasShadow?: boolean
//   }>

// const Visual = forwardRef(
//   (
//     {fillMedia = true, children, className, hasShadow = true, ...rest}: PropsWithChildren<FormControlVisualProps>,
//     ref: Ref<HTMLDivElement>
//   ) => {
//     return (
//       <div
//         className={clsx(
//           styles.FormControl__visual,
//           hasShadow && styles['FormControl__visual--has-shadow'],
//           fillMedia && styles['FormControl__visual--fill-media'],
//           className
//         )}
//         {...rest}
//         ref={ref}
//       >
//         {children}
//       </div>
//     )
//   }
// )

/**
 * Alternating text and image pairs.
 */
export const FormControl = Object.assign(Root, {
  Label: FormControlLabel,
  TextInput: FormControlTextInput,
  Validation: FormControlValidation
})
