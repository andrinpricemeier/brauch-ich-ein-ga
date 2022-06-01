import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import { formatRelative } from "date-fns";
import { de } from "date-fns/locale";

export interface IRelativeDateProps {
  date: Date;
  style?: StyleProp<TextStyle>;
}

export const RelativeDate = (props: IRelativeDateProps) => {
  return (
    <Text style={props.style}>
      {formatRelative(new Date(props.date), new Date(), {
        locale: de,
      })}
    </Text>
  );
};
