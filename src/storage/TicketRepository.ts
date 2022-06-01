import { MMKV } from "react-native-mmkv";
import { Ticket } from "../model/Ticket";
import { dinero, add, allocate, subtract, Dinero } from "dinero.js";
import { CHF } from "@dinero.js/currencies";

export class TicketRepository {
  constructor(private readonly storage: MMKV) {}

  clear(): void {
    this.storage.delete("tickets");
  }

  addTicket(price: number): void {
    let allTickets = [];
    if (this.storage.contains("tickets")) {
      allTickets = JSON.parse(this.storage.getString("tickets")!);
    }
    allTickets.push(new Ticket(price, new Date()));
    this.storage.set("tickets", JSON.stringify(allTickets));
  }

  editTicket(id: string, price: number): void {
    let allTickets = [];
    if (this.storage.contains("tickets")) {
      allTickets = JSON.parse(this.storage.getString("tickets")!);
    }
    const existing = allTickets.find((ticket: Ticket) => ticket.id === id);
    const index = allTickets.indexOf(existing, 0);
    if (index > -1) {
      allTickets.splice(index, 1);
    }
    allTickets.push(new Ticket(price, existing!.dateAdded));
    this.storage.set("tickets", JSON.stringify(allTickets));
  }

  deleteTicket(id: string): void {
    let allTickets = [];
    if (this.storage.contains("tickets")) {
      allTickets = JSON.parse(this.storage.getString("tickets")!);
    }
    const existing = allTickets.find((ticket: Ticket) => ticket.id === id);
    const index = allTickets.indexOf(existing, 0);
    if (index > -1) {
      allTickets.splice(index, 1);
    }
    this.storage.set("tickets", JSON.stringify(allTickets));
  }

  getTickets(): Ticket[] {
    if (!this.storage.contains("tickets")) {
      return [];
    }
    const tickets = JSON.parse(this.storage.getString("tickets")!);
    tickets.sort((a: Ticket, b: Ticket) => {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
    return tickets;
  }

  getTicketById(id: string): Ticket | undefined {
    return this.getTickets().find((ticket) => ticket.id === id);
  }

  getMonthlyAverage(): Dinero<number> {
    const tickets = this.getTickets();
    if (tickets.length === 0) {
      return dinero({ amount: 0.0, currency: CHF });
    }
    const yearMonths = tickets.map((ticket) => {
      const realDate = new Date(ticket.dateAdded);
      return `${realDate.getFullYear()}-${realDate.getMonth()}`;
    });
    const distinctMonths = yearMonths.filter((value, index, self) => {
      return self.indexOf(value) == index;
    });
    const numberOfMonths = distinctMonths.length;
    const total = tickets.reduce(
      (acc, { price }) => add(acc, dinero({ amount: price, currency: CHF })),
      dinero({ amount: 0, currency: CHF })
    );
    const [onePart, _] = allocate(total, [1, numberOfMonths - 1]);
    return onePart;
  }
}
