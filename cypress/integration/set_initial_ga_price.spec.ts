describe("Set initial GA price", () => {
  it("stores price", () => {
    const price = 4523.52;
    cy.visit("/");
    cy.get("input").type("" + price);
    cy.contains("Speichern").click();
    cy.window()
      .its("gaPriceRepository")
      .invoke("getPrice")
      .its("price")
      .should("eq", price);
  });

  it("after initial GA price set, should navigate to dashboard", () => {
    const price = 4523.52;
    cy.visit("/");
    cy.get("input").type("" + price);
    cy.contains("Speichern").click();
    cy.contains("Dashboard");
  });

  it("initial GA price screen is only shown once", () => {
    const price = 4523.52;
    cy.visit("/");
    cy.get("input").type("" + price);
    cy.contains("Speichern").click();
    cy.reload();
    cy.contains("Dashboard");
  });
});
