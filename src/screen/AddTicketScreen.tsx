import React, { useCallback, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Ticket } from "../model/Ticket";
import { storage } from "../storage/storage";
import { TicketRepository } from "../storage/TicketRepository";

const repository = new TicketRepository(storage);

export const AddTicketScreen = ({ navigation }: { navigation: any }) => {
  const tailwind = useTailwind();
  const [price, setPrice] = useState<string>("");

  const onSave = useCallback(
    (e) => {
      const ticket = new Ticket(parseFloat(price), new Date());
      repository.addTicket(ticket);
      navigation.navigate("Dashboard");
    },
    [price]
  );

  const onPriceChange = useCallback((e) => {
    setPrice((_) => e.target.value);
  }, []);

  return (
    <View style={tailwind("h-full flex-col m-auto justify-center p-5")}>
      <Text style={tailwind("text-3xl mb-12")}>Fahrbilletkauf erfassen</Text>
      <Text>Preis des Fahrbillets</Text>
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
