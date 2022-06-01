import { MMKV } from "react-native-mmkv";
import { Ticket } from "../model/Ticket";

export class TicketRepository {
  constructor(private readonly storage: MMKV) {}

  clear() {
    this.storage.delete("tickets");
  }

  addTicket(ticket: Ticket): void {
    let allTickets = [];
    if (this.storage.contains("tickets")) {
      allTickets = JSON.parse(this.storage.getString("tickets")!);
    }
    allTickets.push(ticket);
    this.storage.set("tickets", JSON.stringify(allTickets));
  }

  getTickets(): Ticket[] {
    if (!this.storage.contains("tickets")) {
      return [];
    }
    return JSON.parse(this.storage.getString("tickets")!);
  }
}
