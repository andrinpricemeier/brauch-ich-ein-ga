import { MMKV } from "react-native-mmkv";
import { GAPrice } from "./../model/GAPrice";

export class GAPriceRepository {
  constructor(private readonly storage: MMKV) {}

  setPrice(price: number): void {
    this.storage.set("ga.price", price);
  }

  getPrice(): GAPrice {
    const price = this.storage.getNumber("ga.price");
    if (price === undefined) {
      return new GAPrice(0.0);
    }
    return new GAPrice(price);
  }
}
