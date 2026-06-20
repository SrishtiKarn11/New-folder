describe('Optimotion KYC Flow Test', () => {

  it('Login, then complete full KYC flow', () => {

    // ---- LOGIN ----
    cy.visit('https://optimotion-uat.onrender.com/auth/login')
    cy.log('PAUSED: Manually log in now using OTP. Once dashboard loads, click Resume.')
    cy.pause()
    cy.url({ timeout: 20000 }).should('include', '/dashboard')

    // ---- NAVIGATE TO KYC ----
    cy.wait(1000)
    cy.get('a').contains('Home').click()
    cy.wait(2000)

    cy.url().then(url => {
      if (!url.includes('user-kyc')) {
        cy.contains('Complete your KYC', { timeout: 8000 }).should('be.visible').click()
        cy.wait(2000)
      }
    })

    cy.contains('User Verification (KYC)').should('be.visible')
    cy.screenshot('kyc-step1-personal-opened')

    // ============================================
    // STEP 1: PERSONAL DETAILS
    // ============================================
    cy.contains('PERSONAL DETAILS').should('be.visible')

    cy.get('input[placeholder="Enter your full name"]')
      .type('Test Rider Kumar')
      .blur()
    cy.wait(500)

    cy.contains('Select your date of birth').click()
    cy.wait(1000)

    cy.get('body').then($body => {
      if ($body.find('input[type="date"]').length > 0) {
        cy.get('input[type="date"]').type('2000-01-15', { force: true })
      } else if ($body.find('[role="gridcell"]').length > 0) {
        cy.get('[role="gridcell"]')
          .not('[aria-disabled="true"]')
          .contains('15')
          .first()
          .click({ force: true })
      }
    })
    cy.wait(500)

    cy.get('input[placeholder*="guardian"]', { timeout: 10000 })
      .first().should('be.visible').type('Test Father Kumar')

    cy.get('input[placeholder*="alternate"]', { timeout: 10000 })
      .should('be.visible').type('9876543210')

    cy.contains('Continue').click()
    cy.wait(6000)

    // ============================================
    // STEP 2: IDENTITY
    // ============================================
    cy.contains('Aadhaar Number', { timeout: 10000 }).should('be.visible')

    cy.get('input[placeholder="Enter your Aadhaar number"]').type('234567890123')
    cy.wait(500)

    cy.contains('Front').parent().find('input[type="file"]')
      .selectFile('cypress/fixtures/aadhar-front.jpeg', { force: true })
    cy.wait(2000)

    cy.contains('Back').parent().find('input[type="file"]')
      .selectFile('cypress/fixtures/aadhar-back.jpeg', { force: true })
    cy.wait(2000)

    cy.get('input[placeholder="Enter your PAN number"]').type('ABCDE1234F')
    cy.wait(500)

    cy.contains('PAN Card').parent().find('input[type="file"]')
      .selectFile('cypress/fixtures/pan.jpeg', { force: true })
    cy.wait(2000)

    cy.contains('Continue').click()
    cy.wait(6000)
    cy.screenshot('kyc-step3-address-opened')

    // ============================================
    // ============================================
// STEP 3: ADDRESS
// ============================================
// ============================================
// STEP 3: ADDRESS
// ============================================
cy.contains('RESIDENTIAL ADDRESS', { timeout: 10000 })
  .should('be.visible')

// Full Residential Address
cy.get('#residentialAddress')
  .should('be.visible')
  .clear()
  .type('Kokarna')

cy.wait(500)

// Pin Code
cy.get('#pinCode')
  .should('be.visible')
  .clear()
  .type('500075')

cy.wait(500)

// Select Document Type
cy.get('select')
  .should('be.visible')
  .select('Gas / LPG Bill')

cy.wait(1000)

// Upload Address Proof
cy.get('input[type="file"]')
  .last()
  .selectFile('cypress/fixtures/gas-bill.jpeg', {
    force: true
  })

cy.wait(3000)

cy.screenshot('kyc-step3-filled')

// Continue
cy.contains('Continue')
  .should('be.visible')
  .click()

cy.wait(6000)

// ============================================
// STEP 4: REVIEW
// ============================================
cy.get('body').then(($body) => {
  cy.log('REVIEW PAGE LOADED')
})

cy.screenshot('kyc-step4-review')

// Verify Review step is visible
cy.contains('Review', { timeout: 10000 })
  .should('be.visible')

cy.screenshot('kyc-review-final')

  })

})