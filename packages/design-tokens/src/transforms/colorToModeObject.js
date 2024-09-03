module.exports = {
  name: 'color/modeObject',
  transitive: true,
  type: `value`,
  matcher: token => {
    return token.dark
  },
  transformer: token => ({
    value: token.value,
    dark: token.dark,
  }),
}
