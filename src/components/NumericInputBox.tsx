import React from "react";
import { StyleProp, TextInput, TextStyle } from "react-native";
import { useTailwind } from "tailwind-rn";

export interface INumericInputBoxProps {
  value: string;
  onChange: (text: string) => void;
  style?: StyleProp<TextStyle>;
}

export const NumericInputBox = (props: INumericInputBoxProps) => {
  const tailwind = useTailwind();
  return (
    <TextInput
      style={[
        tailwind("max-w-xs border-red text-black border-2 p-3 rounded"),
        props.style,
      ]}
      onChangeText={props.onChange}
      value={props.value}
      keyboardType="numeric"
    />
  );
};
