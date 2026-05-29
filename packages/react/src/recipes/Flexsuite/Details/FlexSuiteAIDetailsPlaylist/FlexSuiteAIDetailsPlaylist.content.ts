type FlexSuiteAIDetailsPlaylistCardContent = {
  tag: string
  heading: string
  description: string
}

type FlexSuiteAIDetailsPlaylistVideoContent = {
  id: string
  title: string
  duration: string
  summary: string
}

type FlexSuiteAIDetailsPlaylistSectionContent = {
  heading: string
  playlistHeading: string
  videos: FlexSuiteAIDetailsPlaylistVideoContent[]
}

export type FlexSuiteAIDetailsPlaylistContent = {
  common: {
    learnMore: string
  }
  subNav: {
    heading: string
    links: string[]
  }
  hero: {
    headingPrefix: string
    headingEmphasis: string
    description: string
    primaryAction: string
    secondaryText: string
    secondaryLinkText: string
  }
  playlists: [FlexSuiteAIDetailsPlaylistSectionContent, FlexSuiteAIDetailsPlaylistSectionContent]
  resources: {
    heading: string
    cards: FlexSuiteAIDetailsPlaylistCardContent[]
  }
  cta: {
    headingPrefix: string
    headingEmphasis: string
    description: string
    primaryAction: string
  }
}

export const defaultFlexSuiteAIDetailsPlaylistContent: FlexSuiteAIDetailsPlaylistContent = {
  common: {
    learnMore: 'Learn more',
  },
  subNav: {
    heading: 'GitHub Copilot',
    links: ['Copilot in VS Code', 'Agents on GitHub', 'Copilot CLI', 'For Business', 'Tutorials', 'Plans & Pricing'],
  },
  hero: {
    headingPrefix: 'Tips for building with',
    headingEmphasis: 'GitHub Copilot',
    description: "Whether you're building in Visual Studio Code or Visual Studio, we've got you covered.",
    primaryAction: 'Open Copilot in VS Code',
    secondaryText: "Don't have VS Code yet?",
    secondaryLinkText: 'Download now',
  },
  playlists: [
    {
      heading: 'Get started in Visual Studio Code',
      playlistHeading: 'All lessons',
      videos: [
        {
          id: 'ITxzBiTBZW0',
          title: 'Lesson 1: GitHub Copilot 101',
          duration: '03:05',
          summary: 'Learn how to lay a strong foundation for writing exceptional code with ease.',
        },
        {
          id: 'CIgdAO8mbw0',
          title: 'Lesson 2: Mastering the basics',
          duration: '10:57',
          summary: 'Set up GitHub Copilot in your editor and practice the everyday workflows developers use most.',
        },
        {
          id: 'wS8CV85RTO8',
          title: 'Lesson 3: Best practices for success',
          duration: '08:31',
          summary: 'Turn better prompts, project context, and review loops into stronger results with Copilot.',
        },
      ],
    },
    {
      heading: 'Get started in Visual Studio',
      playlistHeading: 'All lessons',
      videos: [
        {
          id: 'WldXhauP024',
          title: 'Lesson 1: GitHub Copilot 101',
          duration: '10:57',
          summary: 'Get up to speed with GitHub Copilot and access everything your subscription offers.',
        },
        {
          id: '2IArMAhkJcE',
          title: 'Lesson 2: Mastering the basics',
          duration: '03:06',
          summary: 'Learn the Visual Studio workflows that help Copilot understand your project and next step.',
        },
        {
          id: 'ZlOwMiNWatQ',
          title: 'Lesson 3: Best practices for success',
          duration: '09:31',
          summary: 'Use Copilot to move from question to implementation with practical habits for larger codebases.',
        },
      ],
    },
  ],
  resources: {
    heading: 'Get the most out of GitHub Copilot in your IDE',
    cards: [
      {
        tag: 'Developer docs',
        heading: 'GitHub Copilot Practice',
        description: 'Discover the power of GitHub Copilot with sample problems and exercises crafted by Kirk Haines.',
      },
      {
        tag: 'Advisory',
        heading: 'GitHub Advisory Database',
        description: 'Boost your software security with access to GitHub comprehensive vulnerability database.',
      },
      {
        tag: 'Blog',
        heading: 'Quick start guides',
        description: 'Prefer a specific editor? Check out our tailored quick start guides to hit the ground running.',
      },
    ],
  },
  cta: {
    headingPrefix: 'Start unlocking',
    headingEmphasis: "GitHub Copilot's full potential",
    description: 'This is just the start. Explore how GitHub Copilot can transform the way you code.',
    primaryAction: 'Contribute on GitHub',
  },
}

type Translate = (key: string) => string

export function getLocalizedFlexSuiteAIDetailsPlaylistContent(t: Translate): FlexSuiteAIDetailsPlaylistContent {
  return {
    common: {
      learnMore: t('common.learnMore'),
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
      headingPrefix: t('hero.headingPrefix'),
      headingEmphasis: t('hero.headingEmphasis'),
      description: t('hero.description'),
      primaryAction: t('hero.primaryAction'),
      secondaryText: t('hero.secondaryText'),
      secondaryLinkText: t('hero.secondaryLinkText'),
    },
    playlists: [
      {
        heading: t('playlists.vscode.heading'),
        playlistHeading: t('playlists.vscode.playlistHeading'),
        videos: [
          {
            id: 'ITxzBiTBZW0',
            title: t('playlists.vscode.videos.one.title'),
            duration: t('playlists.vscode.videos.one.duration'),
            summary: t('playlists.vscode.videos.one.summary'),
          },
          {
            id: 'CIgdAO8mbw0',
            title: t('playlists.vscode.videos.two.title'),
            duration: t('playlists.vscode.videos.two.duration'),
            summary: t('playlists.vscode.videos.two.summary'),
          },
          {
            id: 'wS8CV85RTO8',
            title: t('playlists.vscode.videos.three.title'),
            duration: t('playlists.vscode.videos.three.duration'),
            summary: t('playlists.vscode.videos.three.summary'),
          },
        ],
      },
      {
        heading: t('playlists.visualStudio.heading'),
        playlistHeading: t('playlists.visualStudio.playlistHeading'),
        videos: [
          {
            id: 'WldXhauP024',
            title: t('playlists.visualStudio.videos.one.title'),
            duration: t('playlists.visualStudio.videos.one.duration'),
            summary: t('playlists.visualStudio.videos.one.summary'),
          },
          {
            id: '2IArMAhkJcE',
            title: t('playlists.visualStudio.videos.two.title'),
            duration: t('playlists.visualStudio.videos.two.duration'),
            summary: t('playlists.visualStudio.videos.two.summary'),
          },
          {
            id: 'ZlOwMiNWatQ',
            title: t('playlists.visualStudio.videos.three.title'),
            duration: t('playlists.visualStudio.videos.three.duration'),
            summary: t('playlists.visualStudio.videos.three.summary'),
          },
        ],
      },
    ],
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
      headingPrefix: t('cta.headingPrefix'),
      headingEmphasis: t('cta.headingEmphasis'),
      description: t('cta.description'),
      primaryAction: t('cta.primaryAction'),
    },
  }
}
