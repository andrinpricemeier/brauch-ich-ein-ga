import { MMKV } from "react-native-mmkv";
import { GAPrice } from "./../model/GAPrice";
import { dinero, allocate, Dinero } from "dinero.js";
import { CHF } from "@dinero.js/currencies";

export class GAPriceRepository {
  constructor(private readonly storage: MMKV) {}

  clear(): void {
    this.storage.delete("ga.price");
  }

  setPrice(price: number): void {
    this.storage.set("ga.price", price);
  }

  getPrice(): GAPrice | undefined {
    const price = this.storage.getNumber("ga.price");
    if (price === undefined) {
      return undefined;
    }
    return new GAPrice(price);
  }

  hasPrice(): boolean {
    return this.getPrice() !== undefined;
  }

  getMonthlyAverage(): Dinero<number> {
    if (!this.hasPrice()) {
      return dinero({ amount: 0.0, currency: CHF });
    }
    const price = this.getPrice()!.price;
    const d = dinero({ amount: price, currency: CHF });
    const [oneTwelth, _] = allocate(d, [1, 11]);
    return oneTwelth;
  }
}
