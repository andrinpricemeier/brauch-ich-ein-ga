import { MMKV } from "react-native-mmkv";
import { Ticket } from "../model/Ticket";

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
    return JSON.parse(this.storage.getString("tickets")!);
  }

  getTicketById(id: string): Ticket | undefined {
    return this.getTickets().find((ticket) => ticket.id === id);
  }

  getMonthlyAverage(): number {
    const tickets = this.getTickets();
    const yearMonths = tickets.map((ticket) => {
      const realDate = new Date(ticket.dateAdded);
      return `${realDate.getFullYear()}-${realDate.getMonth()}`;
    });
    const distinctMonths = yearMonths.filter((value, index, self) => {
      return self.indexOf(value) == index;
    });
    const numberOfMonths = distinctMonths.length;
    return (
      tickets.reduce((acc, current) => acc + current.price, 0) / numberOfMonths
    );
  }
}
