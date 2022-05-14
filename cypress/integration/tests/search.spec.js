/// <reference types="cypress" />

describe('Navigation', () => {
    it('should complete visitor purchase flow', () => {

    cy.visit('http://localhost:3000/')

    // Check that cart is empty
    cy.get('#headerCartNumber').should('have.text', '0')

    // ADD SEARCH TESTS HERE

    // searchBeer

    cy.get('#searchBeer').type('punk')

    cy.contains('Punk IPA 2007').click()
    cy.contains('Punk IPA 2007')

    cy.get('#searchBeer').clear()
    cy.wait(3000)
    cy.get('#searchBeer').type('vladmir')

    cy.contains('Hello My Name is Vladimir').click()
    cy.contains('Hello My Name is Vladimir')



    })
})