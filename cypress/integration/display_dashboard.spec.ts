describe("Display dashboard", () => {
  beforeEach(() => {
    cy.visit("/dashboard");
    cy.window().its("gaPriceRepository").invoke("clear");
    cy.window().its("ticketRepository").invoke("clear");
  });

  it("shows average ga price", () => {
    cy.visit("/dashboard");
    cy.window().its("gaPriceRepository").invoke("setPrice", 120);
    cy.reload(true);
    cy.contains("Kosten pro Monat für GA: 10");
  });

  it("shows average bought tickets price", () => {
    cy.visit("/dashboard");
    cy.window().its("ticketRepository").invoke("addTicket", 5);
    cy.window().its("ticketRepository").invoke("addTicket", 10);
    cy.reload(true);
    cy.contains("Kosten pro Monat für Fahrbilletkauf: 15");
  });

  it("shows yes when GA should be bought", () => {
    cy.visit("/dashboard");
    cy.window().its("gaPriceRepository").invoke("setPrice", 120);
    cy.window().its("ticketRepository").invoke("addTicket", 100);
    cy.window().its("ticketRepository").invoke("addTicket", 200);
    cy.reload(true);
    cy.contains("Brauchst du ein GA? Ja!");
  });

  it("shows no when GA should not be bought", () => {
    cy.visit("/dashboard");
    cy.window().its("gaPriceRepository").invoke("setPrice", 120);
    cy.window().its("ticketRepository").invoke("addTicket", 2);
    cy.window().its("ticketRepository").invoke("addTicket", 5);
    cy.reload(true);
    cy.contains("Brauchst du ein GA? Nein, noch nicht.");
  });

  it("should allow user to add new ticket", () => {
    cy.visit("/dashboard");
    cy.contains("Fahrbilletkauf erfassen").click();
    cy.contains("Preis des Fahrbillets");
  });
});
