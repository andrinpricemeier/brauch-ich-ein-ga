import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { InitialGAPriceScreen } from "./src/screen/InitialGAPriceScreen";
import { GAPriceRepository } from "./src/storage/GAPriceRepository";
import { storage } from "./src/storage/storage";
import { DashboardScreen } from "./src/screen/DashboardScreen";
import { AddTicketScreen } from "./src/screen/AddTicketScreen";
import { TicketRepository } from "./src/storage/TicketRepository";

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
      "Fahrbilletkauf erfassen": "addticket",
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
        <Stack.Navigator initialRouteName="GAPreis">
          <Stack.Screen name="GA-Preis" component={InitialGAPriceScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen
            name="Fahrbilletkauf erfassen"
            component={AddTicketScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
