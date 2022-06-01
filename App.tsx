import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { InitialGAPriceScreen } from "./src/screen/InitialGAPriceScreen";
import { GAPriceRepository } from "./src/storage/GAPriceRepository";
import { storage } from "./src/storage/storage";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fbfbfa",
  },
};

// expose store when run in Cypress
if ((window as any).Cypress) {
  (window as any).gaPriceRepository = new GAPriceRepository(storage);
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen name="GA Preis" component={InitialGAPriceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
