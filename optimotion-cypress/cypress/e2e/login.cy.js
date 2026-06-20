describe('Optimotion Login Tests', () => {

  beforeEach(() => {
    cy.visit('https://optimotion-uat.onrender.com/auth/login')
    cy.wait(2000)
  })

  // TEST 1
  it('Login page opens', () => {
    cy.contains('Login Form').should('be.visible')
  })

  // TEST 2
  it('Phone number field is visible', () => {
    cy.get('input[placeholder="Enter your phone number"]').should('be.visible')
  })

  // TEST 3
  it('OTP button is visible', () => {
    cy.contains('Get OTP on Whatsapp').should('be.visible')
  })

  // TEST 4 - FIXED: increased wait + added timeout on the assertion
  it('Valid phone number triggers OTP popup', () => {
    cy.get('input[placeholder="Enter your phone number"]').type('9407984243')
    cy.contains('Get OTP on Whatsapp').click()
    cy.wait(4000) // give backend more time to send OTP and render popup
    cy.contains('Verify', { timeout: 8000 }).should('be.visible')
  })

  // TEST 5
  it('Empty phone number stays on login page', () => {
    cy.contains('Get OTP on Whatsapp').click()
    cy.wait(1000)
    cy.url().should('include', '/auth/login')
  })

  // TEST 6
  it('Short phone number stays on login page', () => {
    cy.get('input[placeholder="Enter your phone number"]').type('12345')
    cy.contains('Get OTP on Whatsapp').click({force: true})
    cy.wait(1000)
    cy.url().should('include', '/auth/login')
  })

  // TEST 7 & 8 - Cannot automate (OTP changes every time via WhatsApp)
  it.skip('Wrong OTP shows error - SKIPPED (manual test needed)', () => {})
  it.skip('Correct OTP opens dashboard - SKIPPED (manual test needed)', () => {})

})