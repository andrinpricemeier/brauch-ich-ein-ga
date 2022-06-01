import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import { dinero, toUnit, down } from "dinero.js";
import { CHF } from "@dinero.js/currencies";

export interface IPriceProps {
  price: number;
  style?: StyleProp<TextStyle>;
}

export const Price = (props: IPriceProps) => {
  const price = dinero({ amount: props.price, currency: CHF });
  const prettyPrice = toUnit(price, { digits: 2, round: down });
  return <Text style={props.style}>CHF {prettyPrice}</Text>;
};
