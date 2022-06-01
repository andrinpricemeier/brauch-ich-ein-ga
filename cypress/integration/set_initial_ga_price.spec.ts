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
});
