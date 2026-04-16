type FlexSuiteSecurityOverviewCardContent = {
  tag?: string
  heading: string
  description: string
}

type FlexSuiteSecurityOverviewTestimonialContent = {
  quoteLead: string
  quoteEmphasis: string
  quoteTrailing: string
  linkText: string
  avatarAlt: string
  name: string
  position: string
}

export type FlexSuiteSecurityOverviewContent = {
  common: {
    learnMore: string
    heroImageAlt: string
  }
  subNav: {
    heading: string
    links: string[]
  }
  hero: {
    label: string
    heading: string
    primaryAction: string
    secondaryAction: string
  }
  logoSuiteHeading: string
  highlights: FlexSuiteSecurityOverviewCardContent[]
  workflow: {
    label: string
    heading: string
  }
  capabilities: FlexSuiteSecurityOverviewCardContent[]
  customerStories: {
    label: string
    heading: string
    cards: FlexSuiteSecurityOverviewCardContent[]
  }
  testimonial: FlexSuiteSecurityOverviewTestimonialContent
  resources: {
    heading: string
    cards: FlexSuiteSecurityOverviewCardContent[]
  }
  cta: {
    label: string
    heading: string
    description: string
    primaryAction: string
    secondaryAction: string
  }
}

export const defaultFlexSuiteSecurityOverviewContent: FlexSuiteSecurityOverviewContent = {
  common: {
    learnMore: 'Learn more',
    heroImageAlt: 'Security overview hero illustration',
  },
  subNav: {
    heading: 'GitHub Security',
    links: ['Advanced Security', 'Secret Protection', 'Code Security', 'Supply Chain', 'Resources', 'Plans & pricing'],
  },
  hero: {
    label: 'GitHub Security',
    heading: 'Powerful security, designed for developers',
    primaryAction: 'Start free trial',
    secondaryAction: 'Contact sales',
  },
  logoSuiteHeading: 'GitHub Security customer logos',
  highlights: [
    {
      tag: 'Coverage',
      heading: 'Code scanning at scale',
      description:
        'Run detection across repositories with native workflows and security context built into the developer lifecycle.',
    },
    {
      tag: 'Speed',
      heading: 'Fix issues before they slow delivery',
      description: 'Bring remediation guidance closer to pull requests and code review so teams can act earlier.',
    },
    {
      tag: 'Platform',
      heading: 'Security where developers already work',
      description:
        'Keep visibility, governance, and action in GitHub rather than spreading ownership across disconnected tools.',
    },
  ],
  workflow: {
    label: 'Features',
    heading: 'Security seamlessly integrated into your workflow',
  },
  capabilities: [
    {
      heading: 'Prevent accidental secret exposure.',
      description:
        'Push protection automatically blocks secrets before they reach your repository, keeping code clean without disrupting workflows.',
    },
    {
      heading: 'Find and fix vulnerabilities.',
      description:
        'Address security debt in your GitHub workflow with static analysis, AI remediation, and proactive vulnerability management.',
    },
  ],
  customerStories: {
    label: 'Customer stories',
    heading: 'Securing the entire software supply chain',
    cards: [
      {
        tag: 'SECURITY LAB',
        heading: 'Scale strategy with GitHub Security Lab',
        description:
          'Secure open source by finding vulnerabilities, building tools like CodeQL, and advancing security research.',
      },
      {
        tag: 'SECURITY ADVISORY DATABASE',
        heading: 'Stay ahead with Security Advisory Database',
        description:
          'Access a vulnerability database of CVEs and GitHub-curated security advisories from the open source world.',
      },
      {
        tag: 'SUPPLY CHAIN SECURITY',
        heading: 'Secure software supply chains end-to-end',
        description:
          'Reduce risks with automated updates, dependency tracking, and build attestation for a secure lifecycle.',
      },
    ],
  },
  testimonial: {
    quoteLead: 'GitHub Advanced Security',
    quoteEmphasis: 'empowers our developers',
    quoteTrailing:
      'to detect and fix vulnerabilities earlier, accelerating our time to market and boosting developer satisfaction.',
    linkText: 'Read the full story',
    avatarAlt: "Circular avatar from Michael Spindler's GitHub profile",
    name: 'Michael Spindler',
    position: 'Head of development services and tools',
  },
  resources: {
    heading: 'Resources to get started',
    cards: [
      {
        tag: 'Docs',
        heading: 'GitHub Advanced Security',
        description: 'Implementation and rollout guidance for the core platform capabilities.',
      },
      {
        tag: 'Docs',
        heading: 'DevSecOps guidance',
        description:
          'Reference material for integrating security scanning and policy controls into engineering workflows.',
      },
      {
        tag: 'Docs',
        heading: 'Security campaign management',
        description: 'A placeholder resource block matching the upcoming page structure from the design.',
      },
    ],
  },
  cta: {
    label: 'Built-in security for developer workflows',
    heading: 'Security that meets developers where they work',
    description:
      'Stubbed CTA section for the new Security overview. We can replace this with the final built-in workflows band from the Figma design next.',
    primaryAction: 'Start free trial',
    secondaryAction: 'Contact sales',
  },
}

type Translate = (key: string) => string

export function getLocalizedFlexSuiteSecurityOverviewContent(t: Translate): FlexSuiteSecurityOverviewContent {
  return {
    common: {
      learnMore: t('common.learnMore'),
      heroImageAlt: t('common.heroImageAlt'),
    },
    subNav: {
      heading: t('subNav.heading'),
      links: [
        t('subNav.links.advancedSecurity'),
        t('subNav.links.secretProtection'),
        t('subNav.links.codeSecurity'),
        t('subNav.links.supplyChain'),
        t('subNav.links.resources'),
        t('subNav.links.pricing'),
      ],
    },
    hero: {
      label: t('hero.label'),
      heading: t('hero.heading'),
      primaryAction: t('hero.primaryAction'),
      secondaryAction: t('hero.secondaryAction'),
    },
    logoSuiteHeading: t('logoSuiteHeading'),
    highlights: [
      {
        tag: t('highlights.one.tag'),
        heading: t('highlights.one.heading'),
        description: t('highlights.one.description'),
      },
      {
        tag: t('highlights.two.tag'),
        heading: t('highlights.two.heading'),
        description: t('highlights.two.description'),
      },
      {
        tag: t('highlights.three.tag'),
        heading: t('highlights.three.heading'),
        description: t('highlights.three.description'),
      },
    ],
    workflow: {
      label: t('workflow.label'),
      heading: t('workflow.heading'),
    },
    capabilities: [
      {
        heading: t('capabilities.one.heading'),
        description: t('capabilities.one.description'),
      },
      {
        heading: t('capabilities.two.heading'),
        description: t('capabilities.two.description'),
      },
    ],
    customerStories: {
      label: t('customerStories.label'),
      heading: t('customerStories.heading'),
      cards: [
        {
          tag: t('customerStories.cards.one.tag'),
          heading: t('customerStories.cards.one.heading'),
          description: t('customerStories.cards.one.description'),
        },
        {
          tag: t('customerStories.cards.two.tag'),
          heading: t('customerStories.cards.two.heading'),
          description: t('customerStories.cards.two.description'),
        },
        {
          tag: t('customerStories.cards.three.tag'),
          heading: t('customerStories.cards.three.heading'),
          description: t('customerStories.cards.three.description'),
        },
      ],
    },
    testimonial: {
      quoteLead: t('testimonial.quoteLead'),
      quoteEmphasis: t('testimonial.quoteEmphasis'),
      quoteTrailing: t('testimonial.quoteTrailing'),
      linkText: t('testimonial.linkText'),
      avatarAlt: t('testimonial.avatarAlt'),
      name: t('testimonial.name'),
      position: t('testimonial.position'),
    },
    resources: {
      heading: t('resources.heading'),
      cards: [
        {
          tag: t('resources.cards.one.tag'),
          heading: t('resources.cards.one.heading'),
          description: t('resources.cards.one.description'),
        },
        {
          tag: t('resources.cards.two.tag'),
          heading: t('resources.cards.two.heading'),
          description: t('resources.cards.two.description'),
        },
        {
          tag: t('resources.cards.three.tag'),
          heading: t('resources.cards.three.heading'),
          description: t('resources.cards.three.description'),
        },
      ],
    },
    cta: {
      label: t('cta.label'),
      heading: t('cta.heading'),
      description: t('cta.description'),
      primaryAction: t('cta.primaryAction'),
      secondaryAction: t('cta.secondaryAction'),
    },
  }
}
