/// <reference types="cypress" />

describe("Navigation", () => {
  it("should complete visitor purchase flow", () => {
    cy.visit("http://localhost:3000/");

    // Search for punk
    cy.get("#searchBeer").type("punk");

    // Click on a search result
    cy.contains("Punk IPA 2007").click();
    // Check if the beer name is displayed
    cy.contains("Punk IPA 2007");

    // clear search input
    cy.get("#searchBeer").clear();
    cy.wait(3000);

    // Search for a different beer
    cy.get("#searchBeer").type("vladimir");

    // Click on a search result
    cy.contains("Hello My Name is Vladimir").click();
    // Check if the beer name is displayed
    cy.contains("Hello My Name is Vladimir");

    // clear search input
    cy.get("#searchBeer").clear();
    cy.wait(3000);

    // Search for a different beer
    cy.get("#searchBeer").type("Bad Pixie");

    // Click on a search result
    cy.contains("Bad Pixie").click();
    // Check if the beer name is displayed
    cy.contains("Spiced Wheat Beer.");

    // clear search input
    cy.get("#searchBeer").clear();
    cy.wait(3000);

    // Search for a different beer
    cy.get("#searchBeer").type("Bad Pixie");

    cy.get("#searchBeer").clear();

    cy.get("#searchBeer").type("Goldings");

    // Click on a search result
    cy.contains("Goldings - IPA Is Dead").click();
    // Check if the beer name is displayed
    cy.contains("Single Hop India Pale Ale.");
  });
});
