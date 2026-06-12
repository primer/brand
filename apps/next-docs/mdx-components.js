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

const isInternalRoute = href =>
  typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/brand/')

export const Link = ({href = '', children, ...props}) =>
  isInternalRoute(href) ? (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  ) : (
    <a href={href} {...props}>
      {children}
    </a>
  )

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
