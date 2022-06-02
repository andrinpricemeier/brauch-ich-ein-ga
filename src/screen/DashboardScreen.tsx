import { Text, View } from "react-native";
import { TicketRepository } from "../storage/TicketRepository";
import { GAPriceRepository } from "../storage/GAPriceRepository";
import { storage } from "../storage/storage";
import { useTailwind } from "tailwind-rn";
import React, { useCallback, useEffect } from "react";
import { ShouldIBuyAGASpecification } from "../model/ShouldIBuyAGASpecification";
import { useIsFocused } from "@react-navigation/native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Title } from "../components/Title";
import { toUnit, down } from "dinero.js";
import { SecondaryButton } from "../components/SecondaryButton";

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
    navigation.navigate("Billet erfassen");
  }, []);

  const viewTickets = useCallback(() => {
    navigation.navigate("Billets");
  }, []);

  const changeGAPrice = useCallback(() => {
    navigation.navigate("GA-Preis");
  }, []);

  const suggestion = shouldGABeBought() ? "Ja!" : "Nein, noch nicht.";
  return (
    <View style={tailwind("h-full flex-col m-auto p-5")}>
      <View style={tailwind("mb-12")}>
        <Text style={tailwind("text-center")}>Brauchst du ein GA?</Text>
        <Title style={tailwind("text-center")} text={suggestion} />
      </View>
      <View style={tailwind("flex flex-row mb-8")}>
        <View style={tailwind("w-2/3")}>
          <Text>CHF GA</Text>
          <Text style={tailwind("font-semibold text-lg")}>
            {toUnit(gaPriceRepository.getMonthlyAverage(), {
              digits: 2,
              round: down,
            })}
          </Text>
        </View>
        <View>
          <Text>CHF Billets</Text>
          <Text style={tailwind("font-semibold text-lg")}>
            {toUnit(ticketRepository.getMonthlyAverage(), {
              digits: 2,
              round: down,
            })}
          </Text>
        </View>
      </View>
      <View style={tailwind("flex flex-row")}>
        <PrimaryButton
          onPress={addTicket}
          title="Billet erfassen"
          buttonStyle={tailwind("w-full")}
        />
      </View>
      <View style={tailwind("flex flex-row mt-3")}>
        <SecondaryButton
          onPress={viewTickets}
          title="Billets anzeigen"
          buttonStyle={tailwind("grow mr-4")}
        />
        <SecondaryButton
          onPress={changeGAPrice}
          title="GA-Preis ändern"
          buttonStyle={tailwind("ml-auto grow")}
        />
      </View>
    </View>
  );
};
