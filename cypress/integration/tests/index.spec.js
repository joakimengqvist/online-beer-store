/// <reference types="cypress" />

describe('Navigation', () => {
    it('should complete visitor purchase flow', () => {

    cy.visit('http://localhost:3000/')

    // Check that cart is empty
    cy.get('#headerCartNumber').should('have.text', '0')

    // Go to beer page 1
    cy.get('#beer-header-link').click()

    // Check that beers are displayed
    cy.contains('A Real Bitter Experience')
    cy.contains('Moustache-Worthy Beer')

    // Go to single beer page by ID
    cy.get('#moreAboutThisBeer25').click()

    // Check that beer is displayed
    cy.contains('Bad Pixie')

    // Add beer to cart
    cy.get('#addToCartSinglePage').click();

    // Check that cart quantity is increased
    cy.get('#headerCartNumber').should('have.text', '1')

    // Go to beer page 2
    cy.visit('http://localhost:3000/beers/2')

    // Check that beers are displayed
    cy.contains('Single Hop India Pale Ale');
        
    // Add several beers to cart
    cy.get('#addToCartBeerCart43').click();
    cy.get('#addToCartBeerCart44').click();
    cy.get('#addToCartBeerCart45').click();
    cy.get('#addToCartBeerCart46').click();
    cy.get('#addToCartBeerCart47').click();
    cy.get('#addToCartBeerCart48').click();

    // Go to checkout page
    cy.visit('http://localhost:3000/checkout')

    // Check that quantity in cart is updated
    cy.get('#headerCartNumber').should('have.text', '7')

    // Check that checkout page is displayed with selected beers
    cy.contains('The Physics')
    cy.contains('American Wheat')

    // Go to home page
    cy.visit('http://localhost:3000/')

    // Check that quantity in cart is updated
    cy.get('#headerCartNumber').should('have.text', '7')

    // Open small cart
    cy.get('#openCart').click()

    // Check that Cart is displaying selected beers
    cy.contains('The Physics')
    cy.contains('American Wheat');

    // increment a single beer quantity in cart
    cy.get('#incrementBeer47SmallCart').click()
    cy.get('#incrementBeer47SmallCart').click()
    cy.get('#incrementBeer47SmallCart').click()
    cy.get('#incrementBeer47SmallCart').click()

    // Check that quantity of single beer in cart is updated
    cy.get('#quantityInCart47SmallCart').should('have.text', '5')

    // Decrement single beer quantity in cart
    cy.get('#derementBeer47SmallCart').click();

    // Check that quantity of single beer in cart is updated
    cy.get('#quantityInCart47SmallCart').should('have.text', '4')

    // Decrement a single beer quantity in cart from 1 to 0
    cy.get('#derementBeer46SmallCart').click()

    // Check that the beer is removed is decremented from 1 to 0
    cy.get('#headerCartNumber').should('have.text', '6')

    // Go to checkout page
    cy.get('#checkoutSmallCart').click()

    // Checkout
    cy.get('#checkoutBigCart').click()

    // Check that payment modal is showing
    cy.contains('Payment')

    // Check payment process
    cy.contains('Pending purchase')
    cy.contains('Pending Payment')
    cy.contains('Purchase completed')

    cy.wait(3000)

    // Check that cart is emtied
    cy.get('#headerCartNumber').should('have.text', '0')

    // Check that cart is updated as empty
    cy.contains('Cart is empty')

    })
  })