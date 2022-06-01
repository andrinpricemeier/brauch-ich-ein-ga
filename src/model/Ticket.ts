import { v4 as uuidv4 } from "uuid";

export class Ticket {
  constructor(
    readonly price: number,
    readonly dateAdded: Date,
    readonly id: string = uuidv4()
  ) {}
}
