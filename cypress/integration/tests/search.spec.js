/// <reference types="cypress" />

describe('Navigation', () => {
    it('should complete visitor purchase flow', () => {

    cy.visit('http://localhost:3000/')

    // Search for punk
    cy.get('#searchBeer').type('punk')

    // Click on a search result
    cy.contains('Punk IPA 2007').click()
    // Check if the beer name is displayed
    cy.contains('Punk IPA 2007')

    // clear search input
    cy.get('#searchBeer').clear()
    cy.wait(3000)

    // Search for a different beer
    cy.get('#searchBeer').type('vladmir')

    // Click on a search result
    cy.contains('Hello My Name is Vladimir').click()
    // Check if the beer name is displayed
    cy.contains('Hello My Name is Vladimir')

    })
})