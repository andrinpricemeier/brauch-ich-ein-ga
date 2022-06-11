import { expect, test } from "vitest";
import * as fc from "fast-check";
import { isValidNumber } from "./../../src/model/Validation";

test("should mark natural numbers as valid number", () => {
  fc.assert(
    fc.property(fc.nat(), (a: number) => {
      expect(isValidNumber("" + a)).toBeTruthy();
    })
  );
});
