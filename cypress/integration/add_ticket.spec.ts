describe("Add ticket", () => {
  it("stores ticket", () => {
    const price = 14.15;
    cy.visit("/addticket");
    cy.get("input").type("" + price);
    cy.contains("Speichern").click();
    cy.window()
      .its("ticketRepository")
      .invoke("getTickets")
      .should("have.length", 1);
    cy.window()
      .its("ticketRepository")
      .invoke("getTickets")
      .then((tickets) => {
        expect(tickets[0].price).to.eq(price);
      });
  });

  it("after adding ticket, should navigate to dashboard", () => {
    const price = 14.15;
    cy.visit("/addticket");
    cy.get("input").type("" + price);
    cy.contains("Speichern").click();
    cy.contains("Übersicht");
  });
});
