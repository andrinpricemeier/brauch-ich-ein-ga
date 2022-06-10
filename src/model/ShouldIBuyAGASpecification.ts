import { dinero, Dinero, lessThan } from "dinero.js";
import { CHF } from "@dinero.js/currencies";

export class ShouldIBuyAGASpecification {
  isSatisifiedBy(
    monthlyGAAverage: Dinero<number>,
    monthlyTicketAverage: Dinero<number>
  ) {
    return lessThan(monthlyGAAverage, monthlyTicketAverage);
  }
}
