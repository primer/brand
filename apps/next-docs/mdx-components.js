import {
  DoDontContainer,
  Do,
  Dont,
  Caption,
  Note,
  Box,
  Button,
  Heading,
  Text,
  Label,
  Stack,
  TableOfContents,
  Article,
  HeadingLink,
  CodeBlock,
  PropTableValues,
  TableWrapper,
} from '@primer/doctocat-nextjs/components'
import NextLink from 'next/link'

// eslint-disable-next-line import/extensions
import {Pre} from './src/components/Pre/Pre.tsx'

const isInternalPath = href => href.startsWith('/') && !href.startsWith('//')

const hasFileExtension = pathname => /\/[^/]+\.[^/]+$/.test(pathname)

const withTrailingSlash = href => {
  const [, pathname, suffix = ''] = href.match(/^([^?#]*)([?#].*)?$/)

  if (!pathname || pathname === '/' || pathname.endsWith('/') || hasFileExtension(pathname)) {
    return href
  }

  return `${pathname}/${suffix}`
}

export const Link = ({href = '', children, ...props}) => {
  const normalizedHref = isInternalPath(href) ? withTrailingSlash(href) : href

  return isInternalPath(href) ? (
    <NextLink href={normalizedHref} {...props}>
      {children}
    </NextLink>
  ) : (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

export function useMDXComponents(customComponents) {
  return {
    ...customComponents,
    DoDontContainer,
    Do,
    Dont,
    Caption,
    Note,
    Box,
    Button,
    Heading,
    Text,
    Label,
    Stack,
    TableOfContents,
    Article,
    HeadingLink,
    CodeBlock,
    PropTableValues,
    TableWrapper,
    Link,
    a: Link,
    h2: props => <HeadingLink tag="h2" {...props} />,
    h3: props => <HeadingLink tag="h3" {...props} />,
    h4: props => <HeadingLink tag="h4" {...props} />,
    h5: props => <HeadingLink tag="h5" {...props} />,
    h6: props => <HeadingLink tag="h6" {...props} />,
    pre: props => <Pre {...props} />,
    table: props => (
      <TableWrapper>
        <table {...props} />
      </TableWrapper>
    ),
  }
}
