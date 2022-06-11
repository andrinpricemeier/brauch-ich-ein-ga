import { expect, describe, it } from "vitest";
import { ShouldIBuyAGASpecification } from "../../src/model/ShouldIBuyAGASpecification";
import { dinero } from "dinero.js";
import { CHF } from "@dinero.js/currencies";
import * as fc from "fast-check";

describe("Given the 'Should I buy a GA' specification", () => {
  it("When the GA average is lower than the ticket average, should signal user to buy a GA", () => {
    const minMax = fc.tuple(fc.nat(), fc.nat()).filter((t) => t[0] < t[1]);
    fc.assert(
      fc.property(minMax, (a: number[]) => {
        const gaAverage = a[0];
        const ticketAverage = a[1];
        expect(
          new ShouldIBuyAGASpecification().isSatisifiedBy(
            dinero({ amount: gaAverage, currency: CHF }),
            dinero({ amount: ticketAverage, currency: CHF })
          )
        ).toBeTruthy();
      })
    );
  });
  it("When the GA average is higher or equal to the ticket average, should signal user to NOT buy a GA", () => {
    const minMax = fc.tuple(fc.nat(), fc.nat()).filter((t) => t[0] >= t[1]);
    fc.assert(
      fc.property(minMax, (a: number[]) => {
        const gaAverage = a[0];
        const ticketAverage = a[1];
        expect(
          new ShouldIBuyAGASpecification().isSatisifiedBy(
            dinero({ amount: gaAverage, currency: CHF }),
            dinero({ amount: ticketAverage, currency: CHF })
          )
        ).toBeFalsy();
      })
    );
  });
});
