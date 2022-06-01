import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { EditGAPriceScreen } from "./src/screen/EditGAPriceScreen";
import { GAPriceRepository } from "./src/storage/GAPriceRepository";
import { storage } from "./src/storage/storage";
import { DashboardScreen } from "./src/screen/DashboardScreen";
import { AddTicketScreen } from "./src/screen/AddTicketScreen";
import { TicketRepository } from "./src/storage/TicketRepository";
import { TicketHistoryScreen } from "./src/screen/TicketHistoryScreen";

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fbfbfa",
  },
};

const linking = {
  prefixes: [],
  config: {
    screens: {
      "GA-Preis": "gaprice",
      Dashboard: "dashboard",
      "Billet erfassen": "addticket",
      Billets: "tickets",
    },
  },
};

// expose store when run in Cypress
if ((window as any).Cypress) {
  (window as any).gaPriceRepository = new GAPriceRepository(storage);
  (window as any).ticketRepository = new TicketRepository(storage);
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer theme={AppTheme} linking={linking}>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="GA-Preis" component={EditGAPriceScreen} />
          <Stack.Screen name="Billet erfassen" component={AddTicketScreen} />
          <Stack.Screen name="Billets" component={TicketHistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
