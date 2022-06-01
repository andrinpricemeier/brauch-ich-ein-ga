import { Button, Text, View } from "react-native";
import { TicketRepository } from "../storage/TicketRepository";
import { GAPriceRepository } from "../storage/GAPriceRepository";
import { storage } from "../storage/storage";
import { useTailwind } from "tailwind-rn";
import React, { useCallback, useMemo } from "react";
import { ShouldIBuyAGASpecification } from "../model/ShouldIBuyAGASpecification";
import { NavigationHelpersContext } from "@react-navigation/native";

const gaPriceRepository = new GAPriceRepository(storage);
const ticketRepository = new TicketRepository(storage);

export const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const tailwind = useTailwind();

  const monthlyGAAverage = useMemo(() => {
    return gaPriceRepository.getMonthlyAverage();
  }, []);

  const monthlyTicketAverage = useMemo(() => {
    return ticketRepository.getMonthlyAverage();
  }, []);

  const shouldGABeBought = useMemo(() => {
    const spec = new ShouldIBuyAGASpecification();
    return spec.isSatisifiedBy(monthlyGAAverage, monthlyTicketAverage);
  }, [monthlyGAAverage, monthlyTicketAverage]);

  const addTicket = useCallback(() => {
    navigation.navigate("Fahrbilletkauf erfassen");
  }, []);

  return (
    <View style={tailwind("h-full flex-col m-auto p-5")}>
      <Text style={tailwind("text-3xl mb-12")}>Übersicht</Text>
      <Text>
        Brauchst du ein GA? {shouldGABeBought ? "Ja!" : "Nein, noch nicht."}
      </Text>
      <Text>Kosten pro Monat für GA: {monthlyGAAverage}</Text>
      <Text>Kosten pro Monat für Fahrbilletkauf: {monthlyTicketAverage}</Text>
      <Button onPress={addTicket} title="Fahrbilletkauf erfassen" />
    </View>
  );
};
