import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AppButton } from "../components/AppButton";
import { NumericInputBox } from "../components/NumericInputBox";
import { Title } from "../components/Title";
import { storage } from "../storage/storage";
import { TicketRepository } from "../storage/TicketRepository";
import { dinero, toUnit, down } from "dinero.js";
import { CHF } from "@dinero.js/currencies";

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
      const price = dinero({ amount: ticket.price, currency: CHF });
      const prettyPrice = toUnit(price, { digits: 2, round: down });
      setPrice("" + prettyPrice);
    }
  }, [ticketId]);

  const onSave = useCallback(
    (e) => {
      const intPrice = Math.floor(parseFloat(price) * 100);
      if (ticketId) {
        repository.editTicket(ticketId, intPrice);
      } else {
        repository.addTicket(intPrice);
      }
      navigation.navigate("Dashboard");
    },
    [price]
  );

  const onPriceChange = useCallback((e) => {
    setPrice((_) => e.target.value);
  }, []);

  return (
    <View style={tailwind("m-auto h-full flex-col p-5")}>
      <Title text="Billetpreis in CHF" style={tailwind("mb-3")} />
      <NumericInputBox
        onChange={onPriceChange}
        value={price}
        style={tailwind("mb-1")}
      />
      <AppButton onPress={onSave} title="Speichern" />
    </View>
  );
};
