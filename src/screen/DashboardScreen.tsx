import { Button, Text, View } from "react-native";
import { TicketRepository } from "../storage/TicketRepository";
import { GAPriceRepository } from "../storage/GAPriceRepository";
import { storage } from "../storage/storage";
import { useTailwind } from "tailwind-rn";
import React, { useCallback, useEffect } from "react";
import { ShouldIBuyAGASpecification } from "../model/ShouldIBuyAGASpecification";
import { useIsFocused } from "@react-navigation/native";
import { AppButton } from "../components/AppButton";

const gaPriceRepository = new GAPriceRepository(storage);
const ticketRepository = new TicketRepository(storage);

export const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const tailwind = useTailwind();
  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

  const shouldGABeBought = () => {
    const spec = new ShouldIBuyAGASpecification();
    return spec.isSatisifiedBy(
      gaPriceRepository.getMonthlyAverage(),
      ticketRepository.getMonthlyAverage()
    );
  };

  const addTicket = useCallback(() => {
    navigation.navigate("Fahrbilletkauf erfassen");
  }, []);

  const viewTickets = useCallback(() => {
    navigation.navigate("Fahrbillets");
  }, []);

  const changeGAPrice = useCallback(() => {
    navigation.navigate("GA-Preis");
  }, []);

  return (
    <View style={tailwind("h-full flex-col m-auto p-5")}>
      <Text style={tailwind("text-3xl mb-12")}>Übersicht</Text>
      <Text>
        Brauchst du ein GA? {shouldGABeBought() ? "Ja!" : "Nein, noch nicht."}
      </Text>
      <Text>
        Kosten pro Monat für GA: {gaPriceRepository.getMonthlyAverage()}
      </Text>
      <Text>
        Kosten pro Monat für Fahrbilletkauf:{" "}
        {ticketRepository.getMonthlyAverage()}
      </Text>
      <AppButton onPress={addTicket} title="Fahrbilletkauf erfassen" />
      <AppButton onPress={viewTickets} title="Fahrbillets anschauen" />
      <AppButton onPress={changeGAPrice} title="GA-Preis ändern" />
    </View>
  );
};
