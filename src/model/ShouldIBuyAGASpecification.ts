import { Dinero, lessThan } from "dinero.js";

export class ShouldIBuyAGASpecification {
  isSatisifiedBy(
    monthlyGAAverage: Dinero<number>,
    monthlyTicketAverage: Dinero<number>
  ) {
    return lessThan(monthlyGAAverage, monthlyTicketAverage);
  }
}
