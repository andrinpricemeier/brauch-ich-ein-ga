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

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("given a lower monthly GA average than ticket average, should tell user to buy a GA", () => {
    expect(
      new ShouldIBuyAGASpecification().isSatisifiedBy(
        dinero({ amount: 200, currency: CHF }),
        dinero({ amount: 300, currency: CHF })
      )
    ).toBeTruthy();
  });
  it("given a higher monthly GA average than ticket average, should tell user NOT to buy a GA", () => {
    expect(
      new ShouldIBuyAGASpecification().isSatisifiedBy(
        dinero({ amount: 300, currency: CHF }),
        dinero({ amount: 200, currency: CHF })
      )
    ).toBeFalsy();
  });
  it("given the same monthly GA average as ticket average, should tell user NOT to buy a GA", () => {
    expect(
      new ShouldIBuyAGASpecification().isSatisifiedBy(
        dinero({ amount: 300, currency: CHF }),
        dinero({ amount: 300, currency: CHF })
      )
    ).toBeFalsy();
  });
}
