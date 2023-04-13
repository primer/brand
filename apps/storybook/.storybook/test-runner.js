const fs = require('fs')
const {injectAxe, checkA11y} = require('axe-playwright')

module.exports = {
  async preRender(page, context) {
    await injectAxe(page)
    const configSrc = fs.readFileSync(
      require.resolve('@github/axe-github/dist/configure-browser/configure-browser.js'),
      'utf8'
    )

    page.evaluate(configSrc => {
      window.eval(configSrc)
    }, configSrc)
  },
  async postRender(page, context) {
    await checkA11y(page, '#root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    })
  }
}
