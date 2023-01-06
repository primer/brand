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
        name: 'interface',
        message: 'What interface should the base HTML element be based on?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/react/src/{{component}}/index.tsx',
        templateFile: 'templates/index.hbs'
      },
      {
        type: 'add',
        path: 'packages/react/src/{{component}}/{{component}}.tsx',
        templateFile: 'templates/component.hbs'
      },
      {
        type: 'add',
        path: 'packages/react/src/{{component}}/{{component}}.module.css',
        templateFile: 'templates/styles.hbs'
      },
      {
        type: 'add',
        path: 'packages/react/src/{{component}}/{{component}}.test.tsx',
        templateFile: 'templates/test.hbs'
      },
      {
        type: 'add',
        path: 'packages/react/src/{{component}}/{{component}}.stories.tsx',
        templateFile: 'templates/story.hbs'
      }
    ]
  })
}
