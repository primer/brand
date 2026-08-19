describe('Size token integration tests', () => {
  it('loads shared size tokens without Stack on the page', () => {
    cy.visit('http://localhost:3000/button-only')

    cy.get('[data-testid="button-only"]').should(button => {
      const ownerWindow = button[0].ownerDocument.defaultView

      if (!ownerWindow) throw new Error('Expected the Button document to have a window')

      const controlSize = ownerWindow.getComputedStyle(button[0]).getPropertyValue('--brand-control-medium-size').trim()

      expect(controlSize).not.to.equal('')
    })
  })
})
