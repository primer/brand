export type EditorialArticleContent = {
  navigation: {
    title: string
  }
  sidebar: {
    ariaLabel: string
  }
  secondarySidebar: {
    ariaLabel: string
  }
  breadcrumbs: {
    parent: {
      label: string
      href: string
    }
    current: string
  }
  article: {
    topics: string[]
    topicsAriaLabel: string
    copyMarkdownLabel: string
    copyMarkdownMenuLabel: string
    copyMarkdownOptions: Array<{
      label: string
      href: string
    }>
    heading: string
    description: string
    introSections: Array<{
      heading: string
      body: string
    }>
    steps: Array<{
      number: string
      beforeText?: string
      code?: string
      afterText?: string
      strongText?: string
      text?: string
      image?: {
        label: string
        caption: string
      }
      list?: string[]
    }>
    codeExample: {
      title: string
      tabs: {
        inline: string
        beside: string
      }
      lines: string[]
      aside: {
        description: string
        linkLabel: string
        linkHref: string
        continuation: string
        snippetLabel: string
        snippet: string
        footer: string
      }
    }
    proTip: {
      title: string
      dismissLabel: string
      snippetLabel: string
      snippet: string
      suffix: string
      body: string
      linkLabel: string
      linkHref: string
    }
    related: {
      heading: string
      cards: Array<{
        tokens: string[]
        heading: string
        description: string
        href: string
      }>
    }
  }
  footer: {
    links: string[]
  }
}

export const defaultEditorialArticleContent: EditorialArticleContent = {
  navigation: {
    title: 'Editorial',
  },
  sidebar: {
    ariaLabel: 'Editorial navigation',
  },
  secondarySidebar: {
    ariaLabel: 'Related article navigation',
  },
  breadcrumbs: {
    parent: {
      label: 'GitHub Docs',
      href: '#',
    },
    current: 'Changing a commit message',
  },
  article: {
    topics: ['Topic', 'Topic', '... +3'],
    topicsAriaLabel: 'Article topics',
    copyMarkdownLabel: 'Copy markdown',
    copyMarkdownMenuLabel: 'Copy options',
    copyMarkdownOptions: [
      {
        label: 'Copy as Markdown',
        href: '#copy-markdown',
      },
      {
        label: 'Copy as plain text',
        href: '#copy-plain-text',
      },
      {
        label: 'Copy link',
        href: '#copy-link',
      },
    ],
    heading: 'Changing a commit message',
    description:
      'If a commit message contains unclear, incorrect, or sensitive information, you can amend it locally and push a new commit with a new message to GitHub. You can also change a commit message to add missing information.',
    introSections: [
      {
        heading: 'Commit has not been pushed online',
        body: 'If the commit only exists in your local repository and has not been pushed to GitHub.com, you can amend the commit message with the command line.',
      },
      {
        heading: 'Amending older or multiple commit messages',
        body: 'If you have already pushed the commit to GitHub.com, you will have to force push a commit with an amended message.',
      },
    ],
    steps: [
      {
        number: '1',
        text: 'On the command line, navigate to the repository that contains the commit you want to amend.',
      },
      {
        number: '2',
        beforeText: 'Type',
        code: 'git commit --amend',
        afterText: 'and press',
        strongText: 'Enter',
        image: {
          label: 'OPTIONAL IMAGE',
          caption: 'Optional caption text for image',
        },
      },
      {
        number: '3',
        text: 'In your text editor, edit the commit message, and save the commit.',
        list: ['List item one', 'List item two', 'List item three'],
      },
    ],
    codeExample: {
      title: 'Title',
      tabs: {
        inline: 'Inline',
        beside: 'Beside',
      },
      lines: [
        'pick e499d89 Delete CNAME',
        'pick 0c39034 Better README',
        'pick f7fde4a Change the commit message but push the same commit.',
        '',
        '# Rebase 9fdb3bd..f7fde4a onto 9fdb3bd',
        '#',
        '# Commands:',
        '# p, pick = use commit',
        '# r, reword = use commit, but edit the commit message',
        '# e, edit = use commit, but stop for amending',
        '# s, squash = use commit, but meld into previous commit',
        '# f, fixup = like "squash", but discard this commit’s log message',
        '# x, exec = run command (the rest of the line) using shell',
        '#',
        '# These lines can be re-ordered; they are executed from top to bottom.',
        '#',
        '# If you remove a line here THAT COMMIT WILL BE LOST.',
        '#',
        '# However, if you remove everything, the rebase will be aborted.',
        '#',
        '# Note that empty commits are commented out',
      ],
      aside: {
        description: 'This workflow runs whenever a pull request in the repository is marked as "ready for review".',
        linkLabel: 'GitHub CLI',
        linkHref: 'https://cli.github.com/manual/',
        continuation:
          'to query the API for the ID of the project and return the name and ID of the first 20 fields in the project. Fields returns a union and the query uses inline fragment.',
        snippetLabel: 'Example snippet:',
        snippet: 'git commit --amend',
        footer: 'Fields returns a union.',
      },
    },
    proTip: {
      title: 'Pro tip',
      dismissLabel: 'Dismiss pro tip',
      snippetLabel: 'Example snippet',
      snippet: 'git commit --amend',
      suffix: 'here.',
      body: 'Long pro tip message here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      linkLabel: 'Optional link',
      linkHref: '#',
    },
    related: {
      heading: 'You might also like',
      cards: [
        {
          tokens: ['Topic', 'Topic', '... +3'],
          heading: 'Article page title',
          description:
            'Use one centralized control page to jump between agent sessions, check progress, and stay in control without losing your place.',
          href: '#',
        },
        {
          tokens: ['Topic', 'Topic', '... +3'],
          heading: 'Article page title',
          description:
            'Use one centralized control page to jump between agent sessions, check progress, and stay in control without losing your place.',
          href: '#',
        },
        {
          tokens: ['Topic', 'Topic', '... +3'],
          heading: 'Article page title',
          description:
            'Use one centralized control page to jump between agent sessions, check progress, and stay in control without losing your place.',
          href: '#',
        },
      ],
    },
  },
  footer: {
    links: ['Terms', 'Privacy', 'Status', 'Pricing'],
  },
}

type Translate = (key: string, options?: {defaultValue?: string}) => string

const getDefaultArticleContent = () => defaultEditorialArticleContent.article

export function getLocalizedEditorialArticleContent(t: Translate): EditorialArticleContent {
  const defaultArticleContent = getDefaultArticleContent()

  return {
    navigation: {
      title: t('navigation.title'),
    },
    sidebar: {
      ariaLabel: t('sidebar.ariaLabel'),
    },
    secondarySidebar: {
      ariaLabel: t('secondarySidebar.ariaLabel'),
    },
    breadcrumbs: {
      parent: {
        label: t('breadcrumbs.article.parent.label', {
          defaultValue: defaultEditorialArticleContent.breadcrumbs.parent.label,
        }),
        href: '#',
      },
      current: t('breadcrumbs.article.current', {defaultValue: defaultEditorialArticleContent.breadcrumbs.current}),
    },
    article: {
      ...defaultArticleContent,
      topics: [
        t('article.hero.topics.one', {defaultValue: defaultArticleContent.topics[0]}),
        t('article.hero.topics.two', {defaultValue: defaultArticleContent.topics[1]}),
        t('article.hero.topics.three', {defaultValue: defaultArticleContent.topics[2]}),
      ],
      topicsAriaLabel: t('article.topicsAriaLabel', {defaultValue: defaultArticleContent.topicsAriaLabel}),
      copyMarkdownLabel: t('article.copyMarkdownLabel', {defaultValue: defaultArticleContent.copyMarkdownLabel}),
      copyMarkdownMenuLabel: t('article.copyMarkdownMenuLabel', {
        defaultValue: defaultArticleContent.copyMarkdownMenuLabel,
      }),
      copyMarkdownOptions: defaultArticleContent.copyMarkdownOptions.map((option, index) => ({
        label: t(`article.copyMarkdownOptions.${index}.label`, {defaultValue: option.label}),
        href: option.href,
      })),
      heading: t('article.hero.heading', {defaultValue: defaultArticleContent.heading}),
      description: t('article.hero.description', {defaultValue: defaultArticleContent.description}),
      introSections: defaultArticleContent.introSections.map((section, index) => ({
        heading: t(`article.introSections.${index}.heading`, {defaultValue: section.heading}),
        body: t(`article.introSections.${index}.body`, {defaultValue: section.body}),
      })),
    },
    footer: {
      links: [t('footer.links.terms'), t('footer.links.privacy'), t('footer.links.status'), t('footer.links.pricing')],
    },
  }
}
