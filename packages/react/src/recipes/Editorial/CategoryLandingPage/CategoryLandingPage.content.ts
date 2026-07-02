type EditorialCategoryLandingPageCardContent = {
  tokens: string[]
  heading: string
  description: string
  href: string
}

export type EditorialCategoryLandingPageContent = {
  navigation: {
    title: string
  }
  sidebar: {
    ariaLabel: string
  }
  hero: {
    heading: string
    description: string
    primaryAction: string
    secondaryAction: string
  }
  featured: {
    heading: string
    ariaLabel: string
    cards: EditorialCategoryLandingPageCardContent[]
  }
  resources: {
    heading: string
    sortLabel: string
    cards: EditorialCategoryLandingPageCardContent[]
  }
  pagination: {
    ariaLabel: string
  }
  footer: {
    links: string[]
  }
}

export const defaultEditorialCategoryLandingPageContent: EditorialCategoryLandingPageContent = {
  navigation: {
    title: 'Editorial',
  },
  sidebar: {
    ariaLabel: 'Editorial filters',
  },
  hero: {
    heading: 'GitHub Copilot Docs',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    primaryAction: 'Primary',
    secondaryAction: 'Secondary',
  },
  featured: {
    heading: 'Featured',
    ariaLabel: 'Featured editorial resources',
    cards: [
      {
        tokens: ['Topic', 'Topic'],
        heading: 'Set up Git',
        description:
          'Use one centralized control page to jump between agent sessions, check progress, and stay in control without losing your place.',
        href: '#',
      },
      {
        tokens: ['Topic', 'Topic'],
        heading: 'Choose a workflow',
        description:
          'Find the path that fits your team, from quick starts to deeper guidance for planning, building, and shipping.',
        href: '#',
      },
      {
        tokens: ['Topic', 'Topic'],
        heading: 'Start collaborating',
        description:
          'Explore practical resources for keeping work visible, connected, and moving across every stage of development.',
        href: '#',
      },
    ],
  },
  resources: {
    heading: 'Latest',
    sortLabel: 'Sort by : Newest',
    cards: [
      {
        tokens: ['Topic', 'Topic'],
        heading: 'Set up Git',
        description:
          'Use one centralized control page to jump between agent sessions, check progress, and stay in control without losing your place.',
        href: '#',
      },
      {
        tokens: ['Guide', 'Topic'],
        heading: 'Plan your first project',
        description:
          'Create the right structure before work starts so teams can find tasks, decisions, and context quickly.',
        href: '#',
      },
      {
        tokens: ['Article', 'Topic'],
        heading: 'Understand pull requests',
        description:
          'Review the building blocks of pull request collaboration and learn how changes move safely through review.',
        href: '#',
      },
      {
        tokens: ['Tutorial', 'Topic'],
        heading: 'Automate routine work',
        description:
          'Use workflow automation to reduce repetitive steps and keep teams focused on higher-value decisions.',
        href: '#',
      },
      {
        tokens: ['Guide', 'Topic'],
        heading: 'Secure your workflow',
        description:
          'Discover practices for keeping secrets, dependencies, and code changes protected across the development lifecycle.',
        href: '#',
      },
      {
        tokens: ['Article', 'Topic'],
        heading: 'Manage repository settings',
        description:
          'Tune project access, collaboration rules, and repository defaults to support the way your team works.',
        href: '#',
      },
      {
        tokens: ['Tutorial', 'Topic'],
        heading: 'Review code effectively',
        description:
          'Learn how to give useful feedback, keep reviews moving, and build shared confidence before changes ship.',
        href: '#',
      },
      {
        tokens: ['Guide', 'Topic'],
        heading: 'Document team knowledge',
        description:
          'Capture decisions and reusable guidance where contributors can find them before questions become blockers.',
        href: '#',
      },
      {
        tokens: ['Article', 'Topic'],
        heading: 'Track delivery progress',
        description: 'Follow work from idea to release with views that clarify ownership, priority, and next steps.',
        href: '#',
      },
      {
        tokens: ['Tutorial', 'Topic'],
        heading: 'Connect your tools',
        description:
          'Bring important signals into your development workflow so the right context appears where work happens.',
        href: '#',
      },
      {
        tokens: ['Guide', 'Topic'],
        heading: 'Scale best practices',
        description:
          'Create repeatable patterns that help teams adopt consistent workflows without slowing down delivery.',
        href: '#',
      },
      {
        tokens: ['Article', 'Topic'],
        heading: 'Keep learning',
        description:
          'Explore new concepts, product updates, and practical examples for building better software with GitHub.',
        href: '#',
      },
    ],
  },
  pagination: {
    ariaLabel: 'Editorial resource pagination',
  },
  footer: {
    links: ['Terms', 'Privacy', 'Status', 'Pricing'],
  },
}

type Translate = (key: string) => string

const getCardContent = (t: Translate, key: string): EditorialCategoryLandingPageCardContent => ({
  tokens: [t(`${key}.tokens.one`), t(`${key}.tokens.two`)],
  heading: t(`${key}.heading`),
  description: t(`${key}.description`),
  href: '#',
})

export function getLocalizedEditorialCategoryLandingPageContent(t: Translate): EditorialCategoryLandingPageContent {
  return {
    navigation: {
      title: t('navigation.title'),
    },
    sidebar: {
      ariaLabel: t('sidebar.ariaLabel'),
    },
    hero: {
      heading: t('hero.heading'),
      description: t('hero.description'),
      primaryAction: t('hero.primaryAction'),
      secondaryAction: t('hero.secondaryAction'),
    },
    featured: {
      heading: t('featured.heading'),
      ariaLabel: t('featured.ariaLabel'),
      cards: [
        getCardContent(t, 'featured.cards.one'),
        getCardContent(t, 'featured.cards.two'),
        getCardContent(t, 'featured.cards.three'),
      ],
    },
    resources: {
      heading: t('resources.heading'),
      sortLabel: t('resources.sortLabel'),
      cards: [
        getCardContent(t, 'resources.cards.one'),
        getCardContent(t, 'resources.cards.two'),
        getCardContent(t, 'resources.cards.three'),
        getCardContent(t, 'resources.cards.four'),
        getCardContent(t, 'resources.cards.five'),
        getCardContent(t, 'resources.cards.six'),
        getCardContent(t, 'resources.cards.seven'),
        getCardContent(t, 'resources.cards.eight'),
        getCardContent(t, 'resources.cards.nine'),
        getCardContent(t, 'resources.cards.ten'),
        getCardContent(t, 'resources.cards.eleven'),
        getCardContent(t, 'resources.cards.twelve'),
      ],
    },
    pagination: {
      ariaLabel: t('pagination.ariaLabel'),
    },
    footer: {
      links: [t('footer.links.terms'), t('footer.links.privacy'), t('footer.links.status'), t('footer.links.pricing')],
    },
  }
}
