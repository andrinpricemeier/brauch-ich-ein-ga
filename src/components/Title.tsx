import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useTailwind } from "tailwind-rn";

export interface ITitleProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export const Title = (props: ITitleProps) => {
  const tailwind = useTailwind();
  return (
    <Text style={[tailwind("text-blue text-3xl"), props.style]}>
      {props.text}
    </Text>
  );
};
