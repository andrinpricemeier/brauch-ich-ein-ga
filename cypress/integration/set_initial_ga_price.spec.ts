describe("Set initial GA price", () => {
  it("stores price", () => {
    const price = 4523;
    cy.visit("/gaprice");
    cy.get("input").type("" + price);
    cy.contains("Speichern").click();
    cy.window()
      .its("gaPriceRepository")
      .invoke("getPrice")
      .its("price")
      .should("eq", price * 100);
  });

  it("after initial GA price set, should navigate to dashboard", () => {
    const price = 4523.52;
    cy.visit("/gaprice");
    cy.get("input").type("" + price);
    cy.contains("Speichern").click();
    cy.contains("Brauchst du ein GA?");
  });
});
