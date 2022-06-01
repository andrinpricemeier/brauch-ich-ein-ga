import { MMKV } from "react-native-mmkv";
import { GAPrice } from "./../model/GAPrice";

export class GAPriceRepository {
  constructor(private readonly storage: MMKV) {}

  clear() {
    this.storage.delete("ga.price");
  }

  setPrice(price: number): void {
    this.storage.set("ga.price", price);
  }

  getPrice(): GAPrice | null {
    const price = this.storage.getNumber("ga.price");
    if (price === undefined) {
      return null;
    }
    return new GAPrice(price);
  }

  hasPrice(): boolean {
    return this.getPrice() !== null;
  }
}
