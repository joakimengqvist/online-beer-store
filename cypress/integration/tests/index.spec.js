/// <reference types="cypress" />

describe("Navigation", () => {
  it("should complete visitor purchase flow", () => {
    cy.visit("http://localhost:3000/");

    // Check that cart is empty
    cy.get("#headerCartNumber").should("have.text", "0");

    // Go to beer page 1
    cy.get("#beer-header-link").click();

    // Check that beers are displayed
    cy.contains("A Real Bitter Experience");
    cy.contains("Moustache-Worthy Beer");

    // Go to single beer page by ID
    cy.get("#moreAboutThisBeer25").click();

    // Check that beer is displayed
    cy.contains("Bad Pixie");

    // Add beer to cart
    cy.get("#addToCartSinglePage").click();

    // Check that toast is triggered with name of beer
    cy.contains("Added Bad Pixie to cart");

    // Check that cart quantity is increased
    cy.get("#headerCartNumber").should("have.text", "1");

    // Go to beer page 2
    cy.visit("http://localhost:3000/beers/2");

    // Check that beers are displayed
    cy.contains("Single Hop India Pale Ale");

    // Add several beers to cart
    cy.get("#addToCartBeerCart43").click();
    // Check that toast is triggered with name of beer
    cy.contains("Added American Wheat to cart");

    cy.get("#addToCartBeerCart44").click();
    // Check that toast is triggered with name of beer
    cy.contains("Added Dog Wired (w/8 Wired) to cart");

    cy.get("#addToCartBeerCart45").click();
    // Check that toast is triggered with name of beer
    cy.contains("Added The Physics to cart");

    cy.get("#addToCartBeerCart46").click();
    cy.get("#addToCartBeerCart46").click();
    cy.get("#addToCartBeerCart46").click();
    // Check that toast is triggered with name of beer
    cy.contains("Added Anarchist Alchemist to cart");

    cy.get("#addToCartBeerCart47").click();
    // Check that toast is triggered with name of beer
    cy.contains("Added AB:15 to cart");

    cy.get("#addToCartBeerCart48").click();
    // Check that toast is triggered with name of beer
    cy.contains("Added Goldings - IPA Is Dead to cart");

    // Go to checkout page
    cy.visit("http://localhost:3000/checkout");

    // Check that checkout page is displayed with selected beers
    cy.contains("The Physics");
    cy.contains("American Wheat");

    // Go to home page
    cy.visit("http://localhost:3000/");

    // Check that quantity in cart is updated
    cy.get("#headerCartNumber").should("have.text", "7");

    // Open small cart
    cy.get("#openCart").click();

    // Check that Cart is displaying selected beers
    cy.contains("The Physics");
    cy.contains("American Wheat");

    // increment a single beer quantity in cart
    cy.get("#incrementBeer47SmallCart").click();
    cy.get("#incrementBeer47SmallCart").click();
    cy.get("#incrementBeer47SmallCart").click();
    cy.get("#incrementBeer47SmallCart").click();

    cy.get("#quantityInCart47SmallCart").should("have.value", "5");

    // Decrement single beer quantity in cart
    cy.get("#derementBeer47SmallCart").click();

    // Check that quantity of single beer in cart is updated
    cy.get("#quantityInCart47SmallCart").should("have.value", "4");

    // Change value of item in cart by typing
    cy.get("#quantityInCart47SmallCart").type("2");

    // Check that quantity of single beer in cart is updated
    cy.get("#quantityInCart47SmallCart").should("have.value", "42");

    cy.get("#quantityInCart47SmallCart").type("{selectall}{backspace}");
    cy.get("#quantityInCart46SmallCart").click();

    // Check that the header cart is updated with -1
    cy.get("#headerCartNumber").should("have.text", "6");

    // Decrement a single beer quantity in cart from 1 to 0
    cy.get("#derementBeer43SmallCart").click();

    // Check that the header cart is updated with -1
    cy.get("#headerCartNumber").should("have.text", "5");
    cy.wait(3000);

    // Go to checkout page
    cy.get("#checkoutSmallCart").click();

    // Checkout
    cy.get("#checkoutBigCart").click();

    // Check that payment modal is showing
    cy.contains("Payment");

    // Check payment process
    cy.contains("Pending purchase");
    cy.contains("Pending Payment");
    cy.contains("Purchase completed");

    cy.contains("Cleared cart");

    cy.wait(3000);

    // Check that cart is emtied
    cy.get("#headerCartNumber").should("have.text", "0");

    // Check that cart is updated as empty
    cy.contains("Cart is empty");
  });
});
