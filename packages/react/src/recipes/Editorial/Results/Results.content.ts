export type EditorialResultContent = {
  tokens: string[]
  heading: string
  description: string
  href: string
}

export type EditorialResultsContent = {
  navigation: {
    title: string
  }
  sidebar: {
    ariaLabel: string
  }
  results: {
    heading: string
    ariaLabel: string
    items: EditorialResultContent[]
  }
  footer: {
    links: string[]
  }
}

const defaultResultDescription =
  // eslint-disable-next-line i18n-text/no-en
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn ...'

const defaultResultPatterns: Array<Pick<EditorialResultContent, 'tokens'>> = [
  {tokens: ['CI/CD', '... +3']},
  {tokens: ['Learn about Copilot']},
  {tokens: ['CI/CD', '... +3']},
  {tokens: ['Learn about Copilot']},
  {tokens: ['Copilot', '... +3']},
  {tokens: ['CI/CD', '... +3']},
  {tokens: ['Learn about Copilot']},
  {tokens: ['CI/CD', '... +3']},
  {tokens: ['Learn about Copilot']},
  {tokens: ['Copilot', '... +3']},
  {tokens: ['CI/CD', '... +3']},
  {tokens: ['Learn about Copilot']},
  {tokens: ['CI/CD', '... +3']},
  {tokens: ['Learn about Copilot']},
  {tokens: ['Copilot', '... +3']},
]

export const defaultEditorialResultsContent: EditorialResultsContent = {
  navigation: {
    title: 'Editorial',
  },
  sidebar: {
    ariaLabel: 'Editorial filters',
  },
  results: {
    heading: '662 results for “Copilot”',
    ariaLabel: 'Search results for Copilot',
    items: defaultResultPatterns.map(pattern => ({
      ...pattern,
      heading: 'Article title',
      description: defaultResultDescription,
      href: '#',
    })),
  },
  footer: {
    links: ['Terms', 'Privacy', 'Status', 'Pricing'],
  },
}

type Translate = (key: string, options?: {defaultValue?: string}) => string

const resultKeys = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
] as const

const getResultContent = (t: Translate, key: string): EditorialResultContent => {
  const secondToken = t(`${key}.tokens.two`, {defaultValue: ''})

  return {
    tokens: secondToken ? [t(`${key}.tokens.one`), secondToken] : [t(`${key}.tokens.one`)],
    heading: t(`${key}.heading`),
    description: t(`${key}.description`),
    href: '#',
  }
}

export function getLocalizedEditorialResultsContent(t: Translate): EditorialResultsContent {
  return {
    navigation: {
      title: t('navigation.title'),
    },
    sidebar: {
      ariaLabel: t('sidebar.ariaLabel'),
    },
    results: {
      heading: t('results.heading'),
      ariaLabel: t('results.ariaLabel'),
      items: resultKeys.map(resultKey => getResultContent(t, `results.items.${resultKey}`)),
    },
    footer: {
      links: [t('footer.links.terms'), t('footer.links.privacy'), t('footer.links.status'), t('footer.links.pricing')],
    },
  }
}
