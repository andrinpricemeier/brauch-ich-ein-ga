it("works", () => {
  cy.visit("/");
  cy.contains("Hello").should("be.visible");
});
