type FlexSuiteAIOverviewCardContent = {
  heading: string
  description: string
}

type FlexSuiteAIOverviewTaggedCardContent = FlexSuiteAIOverviewCardContent & {
  tag: string
}

type FlexSuiteAIOverviewRiverContent = {
  eyebrow: string
  heading: string
  description: string
  linkText: string
  imageAlt: string
}

type FlexSuiteAIOverviewPricingPlanContent = {
  heading: string
  label?: string
  description: string
  price: string
  trailingText?: string
  primaryAction: string
  secondaryAction?: string
  featureListHeading?: string
  features: string[]
  footnote?: string
  footnoteLinkText?: string
}

type FlexSuiteAIOverviewFAQItemContent = {
  question: string
  answer: string
}

type FlexSuiteAIOverviewFAQGroupContent = {
  heading: string
  items: FlexSuiteAIOverviewFAQItemContent[]
}

export type FlexSuiteAIOverviewContent = {
  common: {
    learnMore: string
    brandDividerAlt: string
  }
  subNav: {
    heading: string
    links: string[]
  }
  hero: {
    label: string
    headingLine1: string
    headingLine2: string
    description: string
    primaryAction: string
    secondaryAction: string
    trailingText: string
    trailingLinkText: string
    peekAlt: string
    imageAlt: string
  }
  logoSuiteHeading: string
  resourceCards: FlexSuiteAIOverviewCardContent[]
  workflow: {
    label: string
    heading: string
    description: string
  }
  rivers: FlexSuiteAIOverviewRiverContent[]
  bento: {
    heading: string
    linkText: string
    imageAlt: string
  }
  organization: {
    heading: string
    description: string
    cards: FlexSuiteAIOverviewTaggedCardContent[]
  }
  plans: {
    label: string
    heading: string
    tabsAriaLabel: string
    tabs: string[]
  }
  pricing: {
    free: FlexSuiteAIOverviewPricingPlanContent
    pro: FlexSuiteAIOverviewPricingPlanContent
    proPlus: FlexSuiteAIOverviewPricingPlanContent
  }
  resources: {
    heading: string
    cards: FlexSuiteAIOverviewTaggedCardContent[]
  }
  faq: {
    headingLine1: string
    headingLine2: string
    groups: FlexSuiteAIOverviewFAQGroupContent[]
  }
}

export const defaultFlexSuiteAIOverviewContent: FlexSuiteAIOverviewContent = {
  common: {
    learnMore: 'Learn more',
    brandDividerAlt: 'Brand divider',
  },
  subNav: {
    heading: 'GitHub Copilot',
    links: ['Copilot in VS Code', 'Agents on GitHub', 'Copilot CLI', 'For Business', 'Tutorials', 'Plans & Pricing'],
  },
  hero: {
    label: 'GitHub Copilot',
    headingLine1: 'Command',
    headingLine2: 'your craft',
    description: 'Your AI accelerator for every workflow, from the editor to the enterprise.',
    primaryAction: 'Try Copilot now',
    secondaryAction: 'See plans & pricing',
    trailingText: 'Already have Visual Studio Code?',
    trailingLinkText: 'Open now',
    peekAlt: 'GitHub Copilot mascot peeking from the bottom of the grid area',
    imageAlt: 'GitHub Copilot agent mode in VS Code',
  },
  logoSuiteHeading: 'GitHub Copilot partner logos',
  resourceCards: [
    {
      heading: 'Go beyond one-size-fits-all',
      description: 'Choose from leading LLMs optimized for speed, accuracy, or cost.',
    },
    {
      heading: 'Use your agents, your way',
      description: 'Use GitHub Copilot, your own custom agents, or the third-party ones you already rely on.',
    },
    {
      heading: 'Stay in your flow',
      description: 'Copilot works where you do: in GitHub, your IDE, project tools, chat apps, and custom MCP servers.',
    },
  ],
  workflow: {
    label: 'Workflow',
    heading: 'Code, command, and collaborate',
    description: 'AI that works where you do, whether in your editor, on the command line, or across GitHub.',
  },
  rivers: [
    {
      eyebrow: 'Feature',
      heading: 'Make your editor your most powerful accelerator',
      description:
        'Copilot in your editor does it all, from explaining concepts and completing code, to proposing edits and validating files with agent mode.',
      linkText: 'Explore Copilot in the IDE',
      imageAlt: 'GitHub Copilot agent mode in VS Code',
    },
    {
      eyebrow: 'Feature',
      heading: 'Ship faster with AI that codes with you',
      description:
        'Assign issues directly to Copilot and let it autonomously write code, create pull requests, and respond to feedback in the background.',
      linkText: 'Explore Copilot coding agent',
      imageAlt: 'GitHub Copilot coding agent working on a GitHub issue',
    },
    {
      eyebrow: 'Feature',
      heading: 'Bring AI to your terminal workflow',
      description:
        'Direct Copilot in the terminal using natural language and watch it plan, build, and execute complex workflows powered by your GitHub context.',
      linkText: 'Explore GitHub Copilot CLI',
      imageAlt: 'GitHub Copilot CLI working in the terminal',
    },
  ],
  bento: {
    heading: 'Grupo Boticario increases developer productivity by 94% with Copilot.',
    linkText: 'Read customer story',
    imageAlt: 'Grupo Boticario team members collaborating in an office setting',
  },
  organization: {
    heading: 'Tailor-made for your organization',
    description: 'Shape Copilot to your business needs. Customize what it knows, how it acts, and where it connects.',
    cards: [
      {
        tag: 'Tool',
        heading: 'Turn Copilot into a project expert',
        description:
          'Scale knowledge and keep teams consistent by creating a shared source of truth that includes context from your docs and repositories.',
      },
      {
        tag: 'Developer docs',
        heading: 'Manage agent usage with enterprise-grade controls',
        description:
          'Track activity with detailed audit logs and enforce governance by managing agents from a single control plane.',
      },
      {
        tag: 'Developer docs',
        heading: 'Secure your MCP integrations',
        description:
          'Control which MCP servers developers can access from their IDEs, and use allow lists to prevent unauthorized access.',
      },
    ],
  },
  plans: {
    label: 'Plans',
    heading: 'Take flight with GitHub Copilot',
    tabsAriaLabel: 'GitHub Copilot plan categories',
    tabs: ['For individuals', 'For businesses'],
  },
  pricing: {
    free: {
      heading: 'Free',
      description: 'A fast way to get started with GitHub Copilot.',
      price: '0',
      primaryAction: 'Get started',
      secondaryAction: 'Open in your IDE',
      features: [
        '50 agent mode or chat requests per month',
        '2,000 completions /mo',
        'Access to Haiku 4.5, GPT-4.1, and more',
      ],
    },
    pro: {
      heading: 'Pro',
      label: 'Most popular',
      description: 'Accelerate workflows with GitHub Copilot.',
      price: '10',
      trailingText: 'per month or $100 per year',
      primaryAction: 'Try for 30 days free',
      featureListHeading: 'Everything in Free and:',
      features: [
        'Coding agent',
        'Unlimited agent mode and chats with GPT-5 mini',
        'Access to code review, Claude Sonnet 4/4.5, GPT-5, Gemini 2.5 Pro, and more',
        '300 premium requests to use latest models, with the option to buy more',
      ],
      footnote: 'Free for verified students, teachers, and maintainers of popular open source projects.',
      footnoteLinkText: 'Learn more',
    },
    proPlus: {
      heading: 'Pro+',
      description: 'Scale with agents and more models.',
      price: '39',
      trailingText: 'per month or $390 per year',
      primaryAction: 'Get started',
      featureListHeading: 'Everything in Pro and:',
      features: [
        'Access to all models, including Claude Opus 4.1 and more',
        '5x more premium requests than Pro to use the latest models, with the option to buy more',
        'Access to GitHub Spark',
        'Codex IDE extension support in VS Code',
      ],
    },
  },
  resources: {
    heading: 'Get the most out of GitHub Copilot',
    cards: [
      {
        tag: 'CHANGELOG',
        heading: 'Preview the latest features',
        description: "Be the first to explore what's next for GitHub Copilot.",
      },
      {
        tag: 'BLOG',
        heading: 'Explore the GitHub blog',
        description: 'Discover the latest in software development with insights and more.',
      },
      {
        tag: 'DEVELOPER DOCS',
        heading: 'Visit the Trust Center',
        description: 'Gain peace of mind with our security, privacy, and responsible AI policies.',
      },
    ],
  },
  faq: {
    headingLine1: 'Frequently',
    headingLine2: 'asked questions',
    groups: [
      {
        heading: 'General',
        items: [
          {
            question: 'What is GitHub Copilot?',
            answer:
              "GitHub Copilot is GitHub's AI developer toolset for code completion, chat, agent workflows, and assistance across the software development lifecycle.",
          },
        ],
      },
      {
        heading: 'Plans & pricing',
        items: [
          {
            question: 'What are the differences between the Free, Pro, Business, and Enterprise plans?',
            answer:
              'Free is a limited entry point for trying Copilot. Pro adds coding agent access, broader model choice, and premium requests for individual developers. Business and Enterprise add organization-wide controls, governance, and admin capabilities for teams operating at scale.',
          },
          {
            question: 'How can I upgrade my GitHub Copilot Free license to Copilot Pro?',
            answer:
              'You can upgrade from your GitHub account billing settings by choosing Copilot Pro or Pro+. That keeps your Copilot setup intact while expanding the models, requests, and features available to you.',
          },
          {
            question: 'What is included in GitHub Copilot Free?',
            answer:
              'GitHub Copilot Free includes 50 agent mode or chat requests per month, 2,000 code completions per month, and access to a starter set of supported models.',
          },
          {
            question: 'Which plan includes GitHub Copilot Autofix?',
            answer:
              'Autofix availability depends on the GitHub plan and security products attached to your organization. Use the compare page or plan documentation for the latest eligibility details.',
          },
        ],
      },
      {
        heading: 'Privacy',
        items: [
          {
            question: 'How does GitHub Copilot handle my code and data?',
            answer:
              'GitHub publishes plan-specific privacy details so teams can understand how prompts, suggestions, and related telemetry are handled for their chosen deployment model.',
          },
        ],
      },
      {
        heading: 'Responsible AI',
        items: [
          {
            question: 'How does GitHub approach responsible AI?',
            answer:
              'GitHub documents its approach to responsible AI through model policies, safeguards, transparency guidance, and product controls designed to support safe adoption.',
          },
        ],
      },
    ],
  },
}

type Translate = (key: string) => string

export function getLocalizedFlexSuiteAIOverviewContent(t: Translate): FlexSuiteAIOverviewContent {
  return {
    common: {
      learnMore: t('common.learnMore'),
      brandDividerAlt: t('common.brandDividerAlt'),
    },
    subNav: {
      heading: t('subNav.heading'),
      links: [
        t('subNav.links.vscode'),
        t('subNav.links.agents'),
        t('subNav.links.cli'),
        t('subNav.links.business'),
        t('subNav.links.tutorials'),
        t('subNav.links.pricing'),
      ],
    },
    hero: {
      label: t('hero.label'),
      headingLine1: t('hero.headingLine1'),
      headingLine2: t('hero.headingLine2'),
      description: t('hero.description'),
      primaryAction: t('hero.primaryAction'),
      secondaryAction: t('hero.secondaryAction'),
      trailingText: t('hero.trailingText'),
      trailingLinkText: t('hero.trailingLinkText'),
      peekAlt: t('hero.peekAlt'),
      imageAlt: t('hero.imageAlt'),
    },
    logoSuiteHeading: t('logoSuiteHeading'),
    resourceCards: [
      {
        heading: t('resourceCards.one.heading'),
        description: t('resourceCards.one.description'),
      },
      {
        heading: t('resourceCards.two.heading'),
        description: t('resourceCards.two.description'),
      },
      {
        heading: t('resourceCards.three.heading'),
        description: t('resourceCards.three.description'),
      },
    ],
    workflow: {
      label: t('workflow.label'),
      heading: t('workflow.heading'),
      description: t('workflow.description'),
    },
    rivers: [
      {
        eyebrow: t('rivers.one.eyebrow'),
        heading: t('rivers.one.heading'),
        description: t('rivers.one.description'),
        linkText: t('rivers.one.linkText'),
        imageAlt: t('rivers.one.imageAlt'),
      },
      {
        eyebrow: t('rivers.two.eyebrow'),
        heading: t('rivers.two.heading'),
        description: t('rivers.two.description'),
        linkText: t('rivers.two.linkText'),
        imageAlt: t('rivers.two.imageAlt'),
      },
      {
        eyebrow: t('rivers.three.eyebrow'),
        heading: t('rivers.three.heading'),
        description: t('rivers.three.description'),
        linkText: t('rivers.three.linkText'),
        imageAlt: t('rivers.three.imageAlt'),
      },
    ],
    bento: {
      heading: t('bento.heading'),
      linkText: t('bento.linkText'),
      imageAlt: t('bento.imageAlt'),
    },
    organization: {
      heading: t('organization.heading'),
      description: t('organization.description'),
      cards: [
        {
          tag: t('organization.cards.one.tag'),
          heading: t('organization.cards.one.heading'),
          description: t('organization.cards.one.description'),
        },
        {
          tag: t('organization.cards.two.tag'),
          heading: t('organization.cards.two.heading'),
          description: t('organization.cards.two.description'),
        },
        {
          tag: t('organization.cards.three.tag'),
          heading: t('organization.cards.three.heading'),
          description: t('organization.cards.three.description'),
        },
      ],
    },
    plans: {
      label: t('plans.label'),
      heading: t('plans.heading'),
      tabsAriaLabel: t('plans.tabsAriaLabel'),
      tabs: [t('plans.tabs.individuals'), t('plans.tabs.businesses')],
    },
    pricing: {
      free: {
        heading: t('pricing.free.heading'),
        description: t('pricing.free.description'),
        price: t('pricing.free.price'),
        primaryAction: t('pricing.free.primaryAction'),
        secondaryAction: t('pricing.free.secondaryAction'),
        features: [t('pricing.free.features.one'), t('pricing.free.features.two'), t('pricing.free.features.three')],
      },
      pro: {
        heading: t('pricing.pro.heading'),
        label: t('pricing.pro.label'),
        description: t('pricing.pro.description'),
        price: t('pricing.pro.price'),
        trailingText: t('pricing.pro.trailingText'),
        primaryAction: t('pricing.pro.primaryAction'),
        featureListHeading: t('pricing.pro.featureListHeading'),
        features: [
          t('pricing.pro.features.one'),
          t('pricing.pro.features.two'),
          t('pricing.pro.features.three'),
          t('pricing.pro.features.four'),
        ],
        footnote: t('pricing.pro.footnote'),
        footnoteLinkText: t('pricing.pro.footnoteLinkText'),
      },
      proPlus: {
        heading: t('pricing.proPlus.heading'),
        description: t('pricing.proPlus.description'),
        price: t('pricing.proPlus.price'),
        trailingText: t('pricing.proPlus.trailingText'),
        primaryAction: t('pricing.proPlus.primaryAction'),
        featureListHeading: t('pricing.proPlus.featureListHeading'),
        features: [
          t('pricing.proPlus.features.one'),
          t('pricing.proPlus.features.two'),
          t('pricing.proPlus.features.three'),
          t('pricing.proPlus.features.four'),
        ],
      },
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
    faq: {
      headingLine1: t('faq.headingLine1'),
      headingLine2: t('faq.headingLine2'),
      groups: [
        {
          heading: t('faq.groups.general.heading'),
          items: [
            {
              question: t('faq.groups.general.items.one.question'),
              answer: t('faq.groups.general.items.one.answer'),
            },
          ],
        },
        {
          heading: t('faq.groups.pricing.heading'),
          items: [
            {
              question: t('faq.groups.pricing.items.one.question'),
              answer: t('faq.groups.pricing.items.one.answer'),
            },
            {
              question: t('faq.groups.pricing.items.two.question'),
              answer: t('faq.groups.pricing.items.two.answer'),
            },
            {
              question: t('faq.groups.pricing.items.three.question'),
              answer: t('faq.groups.pricing.items.three.answer'),
            },
            {
              question: t('faq.groups.pricing.items.four.question'),
              answer: t('faq.groups.pricing.items.four.answer'),
            },
          ],
        },
        {
          heading: t('faq.groups.privacy.heading'),
          items: [
            {
              question: t('faq.groups.privacy.items.one.question'),
              answer: t('faq.groups.privacy.items.one.answer'),
            },
          ],
        },
        {
          heading: t('faq.groups.responsibleAi.heading'),
          items: [
            {
              question: t('faq.groups.responsibleAi.items.one.question'),
              answer: t('faq.groups.responsibleAi.items.one.answer'),
            },
          ],
        },
      ],
    },
  }
}
