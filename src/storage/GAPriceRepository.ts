import { MMKV } from "react-native-mmkv";
import { GAPrice } from "./../model/GAPrice";

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

  getMonthlyAverage(): number {
    if (!this.hasPrice()) {
      return 0.0;
    }
    return this.getPrice()!.price / 12;
  }
}
