import React, { useCallback, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AppButton } from "../components/AppButton";
import { NumericInputBox } from "../components/NumericInputBox";
import { GAPriceRepository } from "../storage/GAPriceRepository";
import { storage } from "../storage/storage";
import { dinero, toUnit, down } from "dinero.js";
import { CHF } from "@dinero.js/currencies";
import { Title } from "../components/Title";

const repository = new GAPriceRepository(storage);

export const EditGAPriceScreen = ({ navigation }: { navigation: any }) => {
  const tailwind = useTailwind();
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    if (repository.hasPrice()) {
      const intPrice = repository.getPrice()!.price;
      const price = dinero({ amount: intPrice, currency: CHF });
      const prettyPrice = toUnit(price, { digits: 2, round: down });
      setPrice("" + prettyPrice);
    }
  }, []);

  const onSave = useCallback(
    (e) => {
      repository.setPrice(Math.floor(parseFloat(price) * 100));
      navigation.navigate("Dashboard");
    },
    [price]
  );

  const onPriceChange = useCallback((e) => {
    setPrice((_) => e.target.value);
  }, []);

  return (
    <View style={tailwind("h-full flex-col m-auto p-5")}>
      <Title text="GA-Preis" style={tailwind("mb-3")}></Title>
      <NumericInputBox
        onChange={onPriceChange}
        value={price}
        style={tailwind("mb-1")}
      />
      <AppButton onPress={onSave} title="Speichern" />
    </View>
  );
};
