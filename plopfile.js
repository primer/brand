const HTMLInterfaces = [
  'HTMLAnchorElement',
  'HTMLButtonElement',
  'HTMLDivElement',
  'HTMLHeadingElement',
  'HTMLImageElement',
  'HTMLInputElement',
  'HTMLLabelElement',
  'HTMLParagraphElement',
  'HTMLSpanElement',
  'HTMLTableElement',
  'HTMLTableCellElement',
  'HTMLTableRowElement',
  'HTMLTableSectionElement',
  'HTMLTextAreaElement',
  'HTMLUListElement'
]

/* eslint-disable import/no-anonymous-default-export */
module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('component', {
    description: 'Create a new Primer Brand component',
    prompts: [
      {
        type: 'input',
        name: 'component',
        message: 'What is the name of the component?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of the component?'
      },
      {
        type: 'list',
        name: 'interface',
        message: 'What interface should the base HTML element be based on?',
        choices: HTMLInterfaces
      },
      {
        type: 'confirm',
        name: 'wantStories',
        message: 'Do you want to add a storybook documentation file?'
      },
      {
        type: 'confirm',
        name: 'wantMarkdown',
        message: 'Do you want to add a markdown documentation file?'
      }
    ],
    actions(data) {
      const actions = [
        {
          type: 'add',
          path: 'packages/react/src/{{properCase component}}/index.tsx',
          templateFile: 'templates/index.hbs'
        },
        {
          type: 'add',
          path: 'packages/react/src/{{properCase component}}/{{properCase component}}.tsx',
          templateFile: 'templates/component.hbs'
        },
        {
          type: 'add',
          path: 'packages/react/src/{{properCase component}}/{{properCase component}}.module.css',
          templateFile: 'templates/styles.hbs'
        },
        {
          type: 'add',
          path: 'packages/react/src/{{properCase component}}/{{properCase component}}.test.tsx',
          templateFile: 'templates/test.hbs'
        },
        {
          type: 'append',
          path: 'packages/react/src/index.ts',
          // eslint-disable-next-line no-useless-escape
          pattern: /'(?!.*')/g,
          template: "\nexport * from './{{properCase component}}';"
        }
      ]

      if (data.wantStories) {
        actions.push({
          type: 'add',
          path: 'packages/react/src/{{properCase component}}/{{properCase component}}.stories.tsx',
          templateFile: 'templates/story.hbs'
        })
      }

      if (data.wantMarkdown) {
        actions.push({
          type: 'add',
          path: 'apps/docs/content/components/{{properCase component}}.mdx',
          templateFile: 'templates/markdown.hbs'
        })
      }

      return actions
    }
  })
}
