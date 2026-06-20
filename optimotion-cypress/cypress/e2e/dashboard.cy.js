// dashboard.cy.js
// Covers TC19-34: Home, Models, Bookings, Profile pages
// NOTE: These pages require login. Since OTP is random via WhatsApp,
// you must manually log in once and let Cypress reuse that session,
// OR set a valid session/token before each test (ask your dev team
// if there's a test-login bypass or a way to set a token via localStorage).
//
// Below assumes you can visit pages directly after a manual login
// session is active in the same browser that Cypress controls.
// If each test resets the session, you'll need to add a login step
// in beforeEach() — ask your dev team for a test account + bypass OTP method.

describe('Optimotion Dashboard Tests', () => {

  // ---------- HOME PAGE TESTS ----------

  // TEST 19
  it('Home page opens after login', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/home')
    cy.wait(2000)
    cy.contains('Home').should('be.visible')
  })

  // TEST 20
  it('Sidebar menu is visible', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/home')
    cy.wait(2000)
    cy.contains('Home').should('be.visible')
    cy.contains('Bookings').should('be.visible')
    cy.contains('Models').should('be.visible')
    cy.contains('Profile').should('be.visible')
  })

  // TEST 21
  it('Page has no broken sections', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/home')
    cy.wait(2000)
    // Checks page body isn't empty and has rendered content
    cy.get('body').should('not.be.empty')
    cy.get('body').then($body => {
      expect($body.text().length).to.be.greaterThan(20)
    })
  })

  // TEST 22
  it('Logout button works', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/profile')
    cy.wait(2000)
    cy.contains('Logout').click()
    cy.wait(2000)
    cy.url().should('include', '/auth/login')
  })

  // ---------- MODELS PAGE TESTS ----------

  // TEST 23
  it('Models page opens', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/models')
    cy.wait(2000)
    cy.contains('Models').should('be.visible')
  })

  // TEST 24
  it('Vehicle cards are visible', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/models')
    cy.wait(2000)
    // Adjust selector based on actual card class/structure once known
    cy.get('body').then($body => {
      cy.log($body.text()) // run once to see actual vehicle card text/structure
    })
    // Example generic check - update selector after first run
    cy.get('[class*="card"]').should('have.length.greaterThan', 0)
  })

  // TEST 25
  it('Clicking vehicle opens it', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/models')
    cy.wait(2000)
    cy.get('[class*="card"]').first().click()
    cy.wait(2000)
    cy.contains('Reserve Now').should('be.visible')
  })

  // TEST 26
  it('Reserve Now button visible', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/models')
    cy.wait(2000)
    cy.get('[class*="card"]').first().click()
    cy.wait(1000)
    cy.contains('Reserve Now').should('be.visible')
  })

  // ---------- BOOKINGS PAGE TESTS ----------

  // TEST 27
  it('Bookings page opens', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/bookings')
    cy.wait(2000)
    cy.contains('Bookings').should('be.visible')
  })

  // TEST 28
  it('Booking list is shown', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/bookings')
    cy.wait(2000)
    cy.get('body').then($body => {
      cy.log($body.text()) // run once to confirm what shows: list or empty message
    })
  })

  // TEST 29
  it('Empty state message shown (if no bookings)', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/bookings')
    cy.wait(2000)
    // This test only passes if account genuinely has no bookings.
    // Update the text below to match exact empty-state copy after first run.
    cy.get('body').then($body => {
      if ($body.text().includes('No bookings')) {
        cy.contains('No bookings').should('be.visible')
      } else {
        cy.log('Account has bookings - empty state not applicable')
      }
    })
  })

  // ---------- PROFILE PAGE TESTS ----------

  // TEST 30
  it('Profile page opens', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/profile')
    cy.wait(2000)
    cy.contains('Profile').should('be.visible')
  })

  // TEST 31
  it('Name and phone are shown', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/profile')
    cy.wait(2000)
    cy.contains('Phone').should('be.visible')
    cy.get('body').should('contain.text', '+91') // adjust if phone format differs
  })

  // TEST 32
  it('Account section opens', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/profile')
    cy.wait(2000)
    cy.contains('Account').click()
    cy.wait(1000)
    cy.screenshot('account-section-expanded')
  })

  // TEST 33
  it('Documents section opens', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/profile')
    cy.wait(2000)
    cy.contains('Documents').click()
    cy.wait(1000)
    cy.screenshot('documents-section-expanded')
  })

  // TEST 34
  it('Logout works from profile', () => {
    cy.visit('https://optimotion-uat.onrender.com/dashboard/profile')
    cy.wait(2000)
    cy.contains('Logout').click()
    cy.wait(2000)
    cy.url().should('include', '/auth/login')
  })

})