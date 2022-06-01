import React, { useCallback, useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { GAPriceRepository } from "../storage/GAPriceRepository";
import { storage } from "../storage/storage";

const repository = new GAPriceRepository(storage);

export const InitialGAPriceScreen = ({ navigation }: { navigation: any }) => {
  const tailwind = useTailwind();
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    if (repository.hasPrice()) {
      navigation.navigate("Dashboard");
    }
  }, []);

  const onSave = useCallback(
    (e) => {
      repository.setPrice(parseFloat(price));
      navigation.navigate("Dashboard");
    },
    [price]
  );

  const onPriceChange = useCallback((e) => {
    setPrice((_) => e.target.value);
  }, []);

  return (
    <View style={tailwind("h-full flex-col m-auto p-5")}>
      <Text style={tailwind("text-3xl mb-12")}>
        Willkommen zu{" "}
        <Text style={tailwind("font-bold text-blue")}>Brauch ich ein GA?</Text>
      </Text>
      <Text>
        Bitte gib als Erstes den Preis ein, den du normalerweise für dein GA
        bezahlst:
      </Text>
      <TextInput
        style={tailwind(
          "border-black text-black h-10 border-2 py-5 px-2 rounded my-2"
        )}
        onChange={onPriceChange}
        value={price}
        keyboardType="numeric"
      />
      <Button onPress={onSave} title="Speichern" />
    </View>
  );
};
