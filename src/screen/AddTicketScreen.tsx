import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { PrimaryButton } from "../components/PrimaryButton";
import { NumericInputBox } from "../components/NumericInputBox";
import { Title } from "../components/Title";
import { storage } from "../storage/storage";
import { TicketRepository } from "../storage/TicketRepository";
import { dinero, toUnit, down } from "dinero.js";
import { CHF } from "@dinero.js/currencies";
import { isValidNumber } from "../model/Validation";

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
      setPrice("");
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
      if (!isValidNumber(price)) {
        return;
      }
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

  const onPriceChange = useCallback((text: string) => {
    setPrice((_) => text);
  }, []);

  return (
    <View style={tailwind("m-auto h-full flex-col p-5")}>
      <Title text="Billetpreis in CHF" style={tailwind("mb-3")} />
      <NumericInputBox
        onChange={onPriceChange}
        value={price}
        style={tailwind("mb-1")}
      />
      <PrimaryButton
        enabled={isValidNumber(price)}
        onPress={onSave}
        title="Speichern"
      />
    </View>
  );
};
