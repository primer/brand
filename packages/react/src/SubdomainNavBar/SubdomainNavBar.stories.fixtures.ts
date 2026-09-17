import type {SubdomainNavBarSearchResults} from '.'

export const navigationLinks = [
  'collections',
  'topics',
  'articles',
  'events',
  'video',
  'social',
  'podcasts',
  'books',
  'guides',
  'webcasts',
  'customer stories',
  'learning paths',
  'resources',
]

export const searchResults = [
  {
    title: 'How to transform your business in a digital world',
    description:
      'GitHub Enterprise empowers developers with tools they already know and love, accelerates high-quality software development and secure delivery, and enhances the speed and power of innovation.\n',
    url: 'https://resources.github.com/devops/github-enterprise-ebook',
    date: '2022-08-29T00:00+02:00',
  },
  {
    title: '6 DevOps tips to help engineering leaders deliver software at scale',
    description:
      'Learn how to deliver high-quality, secure software faster with six actionable DevOps tips drawn from high-performing enterprise companies. ',
    url: 'https://resources.github.com/devops/six-tips-faster-software-delivery',
    date: '2022-08-11T00:00-05:00',
  },
  {
    title: 'Integrating GitHub with Sentry to Increase Speed to Resolution ',
    description:
      'Whether you’re already using Sentry and GitHub separately, or building a deployment workflow for the first time, you can follow these steps to create an automated workflow for your team',
    url: 'https://resources.github.com/actions/integrating-with-sentry',
    date: '2022-08-08T16:40-06:00',
  },
  {
    title: 'DevOps fundamentals: Defining DevOps principles',
    description:
      'From headlines to job descriptions, DevOps has emerged as an outsized buzzword over the past decade—and for good reason. Organizations that successfully adopt DevOps often see big gains in software development speeds, improved reliability, faster product iterations, and have an easier time scaling their services. ',
    url: 'https://resources.github.com/devops/fundamentals',
    date: '2022-05-23T12:00+00:00',
  },
  {
    title: 'The fundamentals of continuous integration in DevOps',
    description:
      'What is continuous integration in DevOps?\n\nContinuous integration (CI) is a foundational DevOps practice where development teams integrate code changes from multiple contributors into a shared repository. Automation is used throughout this process to merge, build, and test code to facilitate a higher speed of software development. This process is often called a CI pipeline. When implemented properly, CI enables organizations to quickly identify defects and ship higher-quality software faster.',
    url: 'https://resources.github.com/devops/fundamentals/ci-cd/integration',
    date: '2022-05-23T12:00+00:00',
  },
  {
    title: 'A guide to DevOps tools and DevOps automation toolchains',
    description:
      'What are DevOps tools? \nAs an umbrella term, DevOps tools include any number of applications that automate processes within the software development lifecycle (SDLC), improve organizational collaboration, and implement monitoring and alerts. Organizations will often invest in building out a "DevOps toolchain," or collection of tools to use in its DevOps practice, to address each stage of the SDLC.',
    url: 'https://resources.github.com/devops/tools',
    date: '2022-05-23T12:00+00:00',
  },
  {
    title: 'What is containerization?',
    description:
      'When it’s successfully implemented, DevOps can transform software reliability by making the software development lifecycle (SDLC) more predictable through a combination of automation and cultural practices that favor deep collaboration and incremental releases. With less chance for variation, fewer code-related issues make it to production.',
    url: 'https://resources.github.com/devops/containerization',
    date: '2022-05-23T12:00+00:00',
  },
  {
    title: 'The fundamentals of continuous deployment in DevOps',
    description:
      'What is continuous deployment?\nContinuous deployment (CD) is an automated software release practice where code changes are deployed to different stages as they pass predefined tests. The goal of CD is to facilitate faster releases by using automation to help remove the need for human intervention as much as possible during the deployment process.',
    url: 'https://resources.github.com/devops/fundamentals/ci-cd/deployment',
    date: '2022-05-23T12:00+00:00',
  },
]

export const groupedSearchResults: SubdomainNavBarSearchResults = [
  {
    title: 'AI results',
    results: [
      {
        title: 'How do I connect to GitHub with my SSH?',
        description: 'Learn how to generate and add SSH keys for GitHub authentication.',
        url: '#ai-ssh',
        date: '2026-07-01T00:00+02:00',
      },
      {
        title: 'How do I sign commits?',
        description: 'Learn how to sign commits with GPG or SSH keys.',
        url: '#ai-sign-commits',
        date: '2026-07-01T00:00+02:00',
      },
      {
        title: 'How do I create webhooks?',
        description: 'Learn how to create and configure webhooks.',
        url: '#ai-webhooks',
        date: '2026-07-01T00:00+02:00',
      },
    ],
  },
  {
    title: 'Docs results',
    results: [
      {
        title: 'Frequently asked questions',
        description: 'Browse common GitHub Docs questions.',
        url: '#frequently-asked-questions',
        date: '2026-07-01T00:00+02:00',
        isExternal: true,
      },
      {
        title: 'How GitHub works',
        description: 'Understand GitHub concepts and platform workflows.',
        url: '#how-github-works',
        date: '2026-07-01T00:00+02:00',
        isExternal: true,
      },
      {
        title: 'Using the GitHub CLI across GitHub platforms',
        description: 'Use the GitHub CLI across GitHub products and workflows.',
        url: '#using-github-cli',
        date: '2026-07-01T00:00+02:00',
        isExternal: true,
      },
      {
        title: 'Long article name lorem ipsum dolor sit amet using the GitHub CLI across GitHub platforms',
        description: 'A longer docs result title that truncates in the search modal.',
        url: '#long-article-name',
        date: '2026-07-01T00:00+02:00',
        isExternal: true,
      },
    ],
  },
]
