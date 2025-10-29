// Custom rule to enforce i18n (replaces i18n-text/no-en from github plugin)
// The OSS rule is not compatible with ESLint flat config
// Vendored from https://github.com/dgraham/eslint-plugin-i18n-text
export const noEnglishTextRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow English text in string literals',
      recommended: false,
    },
    messages: {
      noEnglishText: 'English text in string literals is not allowed',
    },
    schema: [],
  },
  create(context) {
    function isEnglish(value) {
      return typeof value === 'string' && /^[A-Z][a-z]+\s/.test(value)
    }

    function isConsole(node) {
      return node.callee.type === 'MemberExpression' && node.callee.object && node.callee.object.name === 'console'
    }

    function isInvariant(node) {
      return node.callee.type === 'Identifier' && node.callee.name === 'invariant'
    }

    function isSuite(node) {
      return node.callee.type === 'Identifier' && node.callee.name === 'suite'
    }

    function isTest(node) {
      return node.callee.type === 'Identifier' && node.callee.name === 'test'
    }

    function isAssert(node) {
      const direct = node.callee.type === 'Identifier' && node.callee.name === 'assert'
      const member =
        node.callee.type === 'MemberExpression' && node.callee.object && node.callee.object.name === 'assert'
      return direct || member
    }

    return {
      LogicalExpression(node) {
        if (node.right.type === 'Literal' && isEnglish(node.right.value)) {
          context.report({node: node.right, messageId: 'noEnglishText'})
        } else if (node.right.type === 'TemplateLiteral') {
          if (node.right.quasis.some(el => isEnglish(el.value.raw))) {
            context.report({node: node.right, messageId: 'noEnglishText'})
          }
        }
      },
      AssignmentExpression(node) {
        if (node.right.type === 'Literal' && isEnglish(node.right.value)) {
          context.report({node: node.right, messageId: 'noEnglishText'})
        } else if (node.right.type === 'TemplateLiteral') {
          if (node.right.quasis.some(el => isEnglish(el.value.raw))) {
            context.report({node: node.right, messageId: 'noEnglishText'})
          }
        }
      },
      CallExpression(node) {
        if (isConsole(node) || isInvariant(node)) return
        if (isSuite(node) || isTest(node) || isAssert(node)) return

        for (const arg of node.arguments) {
          if (arg.type === 'Literal' && isEnglish(arg.value)) {
            context.report({node: arg, messageId: 'noEnglishText'})
          } else if (arg.type === 'TemplateLiteral') {
            if (arg.quasis.some(el => isEnglish(el.value.raw))) {
              context.report({node: arg, messageId: 'noEnglishText'})
            }
          }
        }
      },
      ReturnStatement(node) {
        if (!node.argument) return

        if (node.argument.type === 'Literal' && isEnglish(node.argument.value)) {
          context.report({node: node.argument, messageId: 'noEnglishText'})
        } else if (node.argument.type === 'TemplateLiteral') {
          if (node.argument.quasis.some(el => isEnglish(el.value.raw))) {
            context.report({node: node.argument, messageId: 'noEnglishText'})
          }
        }
      },
      VariableDeclarator(node) {
        if (!node.init) return

        if (node.init.type === 'Literal' && isEnglish(node.init.value)) {
          context.report({node: node.init, messageId: 'noEnglishText'})
        } else if (node.init.type === 'TemplateLiteral') {
          if (node.init.quasis.some(el => isEnglish(el.value.raw))) {
            context.report({node: node.init, messageId: 'noEnglishText'})
          }
        }
      },
    }
  },
  // TODO: Add JSX support
}
