describe('Debug Dashboard Page', () => {
  it('DEBUG - see what is actually on the home page', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/home')
    cy.wait(4000)
    cy.get('body').then($body => {
      cy.log($body.text())
    })
    cy.screenshot('home-page-debug')
  })
})