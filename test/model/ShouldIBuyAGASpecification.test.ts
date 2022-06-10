import { expect, describe, it } from "vitest";
import { ShouldIBuyAGASpecification } from "../../src/model/ShouldIBuyAGASpecification";
import { dinero } from "dinero.js";
import { CHF } from "@dinero.js/currencies";

describe("Given the 'Should I buy a GA' specification", () => {
  it("When the GA average is higher than the ticket average, should signal user to NOT buy a GA", () => {
    expect(
      new ShouldIBuyAGASpecification().isSatisifiedBy(
        dinero({ amount: 300, currency: CHF }),
        dinero({ amount: 200, currency: CHF })
      )
    ).toBeFalsy();
  });
  it("When the GA average is lower than the ticket average, should signal user to buy a GA", () => {
    expect(
      new ShouldIBuyAGASpecification().isSatisifiedBy(
        dinero({ amount: 200, currency: CHF }),
        dinero({ amount: 300, currency: CHF })
      )
    ).toBeTruthy();
  });
  it("When the GA average is equal to the ticket average, should signal user to NOT buy a GA", () => {
    expect(
      new ShouldIBuyAGASpecification().isSatisifiedBy(
        dinero({ amount: 300, currency: CHF }),
        dinero({ amount: 300, currency: CHF })
      )
    ).toBeFalsy();
  });
});
