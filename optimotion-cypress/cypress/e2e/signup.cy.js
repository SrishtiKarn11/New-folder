describe('Optimotion Signup Tests', () => {

  beforeEach(() => {
    cy.visit('https://optimotion-uat.onrender.com/auth/signup')
    cy.wait(2000)
  })

  // TEST 1
  it('Signup page opens', () => {
    cy.contains('Signup Form').should('be.visible')
    cy.contains('Join us and start your journey!').should('be.visible')
  })

  // TEST 2
  it('Empty form is blocked', () => {
    cy.contains('Signup').click()
    cy.url().should('include', '/auth/signup')
  })

  // TEST 3
  it('All fields are visible', () => {
    cy.get('input[placeholder="Enter your full name"]').should('be.visible')
    cy.get('input[name="dateOfBirth"]').should('be.visible')
    cy.get('input[placeholder="Enter your email (optional)"]').should('be.visible')
    cy.get('input[placeholder="Enter your phone number"]').should('be.visible')
    cy.get('input[type="checkbox"]').should('exist')
    cy.contains('Signup').should('be.visible')
  })

  // TEST 4
  it('Can fill and submit form', () => {
    cy.get('input[placeholder="Enter your full name"]').type('Test User')
    cy.get('input[name="dateOfBirth"]').type('2000-01-01')
    cy.get('input[placeholder="Enter your email (optional)"]').type('test@gmail.com')
    cy.get('input[placeholder="Enter your phone number"]').type('9999999999')
    cy.get('input[type="checkbox"]').check()
    cy.contains('Signup').click()
    cy.wait(2000)
    cy.screenshot('after-signup')
  })

  // TEST 5
  it('Numbers in name are blocked', () => {
    cy.get('input[placeholder="Enter your full name"]').type('123')
    cy.contains('Signup').click()
    cy.wait(1000)
    cy.url().should('include', '/auth/signup')
  })

  // TEST 6
  it('Invalid email is blocked', () => {
    cy.get('input[placeholder="Enter your full name"]').type('Test User')
    cy.get('input[name="dateOfBirth"]').type('2000-01-01')
    cy.get('input[placeholder="Enter your email (optional)"]').type('notanemail')
    cy.get('input[placeholder="Enter your phone number"]').type('9999999999')
    cy.get('input[type="checkbox"]').check()
    cy.contains('Signup').click()
    cy.wait(1000)
    cy.url().should('include', '/auth/signup')
  })

  // TEST 7
  it('Short phone number is blocked', () => {
    cy.get('input[placeholder="Enter your full name"]').type('Test User')
    cy.get('input[name="dateOfBirth"]').type('2000-01-01')
    cy.get('input[placeholder="Enter your phone number"]').type('12345')
    cy.get('input[type="checkbox"]').check()
    cy.contains('Signup').click()
    cy.wait(1000)
    cy.url().should('include', '/auth/signup')
  })

  // TEST 8
  it('Unchecked box blocks submit', () => {
    cy.get('input[placeholder="Enter your full name"]').type('Test User')
    cy.get('input[name="dateOfBirth"]').type('2000-01-01')
    cy.get('input[placeholder="Enter your phone number"]').type('9999999999')
    cy.contains('Signup').click()
    cy.wait(1000)
    cy.url().should('include', '/auth/signup')
  })

  // TEST 9 - Already have account link
  it('Login link is visible on signup page', () => {
    cy.contains('Already have an account?').should('be.visible')
    cy.contains('Login').should('be.visible')
  })

  // TEST 10 - Navigate to login from signup
  it('Login link navigates to login page', () => {
    cy.contains('Login').click()
    cy.wait(1000)
    cy.url().should('include', '/auth/login')
  })

})