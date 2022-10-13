let windowErrorSpy
let windowLogSpy
let windowWarningSpy

Cypress.on('window:before:load', win => {
  windowErrorSpy = cy.spy(win.console, 'error')
  windowLogSpy = cy.spy(win.console, 'log')
  windowWarningSpy = cy.spy(win.console, 'warn')
})

const DELAY = 1000

describe('Integration tests', () => {
  it('Renders successfully without console errors, warnings or logs at runtime', () => {
    cy.visit('http://localhost:3000')

    // correct fixture is rendered
    cy.contains('This is my super sweet hero heading')

    // no console logs or warnings
    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.not.be.called
      expect(windowLogSpy).to.not.be.called
      expect(windowWarningSpy).to.not.be.called
    })
  })
})
