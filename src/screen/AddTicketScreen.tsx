import React, { useCallback, useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { storage } from "../storage/storage";
import { TicketRepository } from "../storage/TicketRepository";

const repository = new TicketRepository(storage);

export const AddTicketScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const tailwind = useTailwind();
  const [price, setPrice] = useState<string>("");
  let ticketId: string | undefined;
  if (route.params) {
    ticketId = route.params["ticketId"];
  }

  useEffect(() => {
    if (!ticketId) {
      setPrice("0");
      return;
    }
    const ticket = repository.getTicketById(ticketId);
    if (ticket) {
      setPrice("" + ticket.price);
    }
  }, [ticketId]);

  const onSave = useCallback(
    (e) => {
      if (ticketId) {
        repository.editTicket(ticketId, parseFloat(price));
      } else {
        repository.addTicket(parseFloat(price));
      }
      navigation.navigate("Dashboard");
    },
    [price]
  );

  const onPriceChange = useCallback((e) => {
    setPrice((_) => e.target.value);
  }, []);

  return (
    <View style={tailwind("h-full flex-col m-auto p-5")}>
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
