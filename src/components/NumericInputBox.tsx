import React from "react";
import { StyleProp, TextInput, TextStyle } from "react-native";
import { useTailwind } from "tailwind-rn";

export interface INumericInputBoxProps {
  value: string;
  onChange: (e: any) => void;
  style?: StyleProp<TextStyle>;
}

export const NumericInputBox = (props: INumericInputBoxProps) => {
  const tailwind = useTailwind();
  return (
    <TextInput
      style={[
        tailwind(
          "max-w-xs border-red text-black h-10 border-2 py-5 px-2 rounded"
        ),
        props.style,
      ]}
      onChange={props.onChange}
      value={props.value}
      keyboardType="numeric"
    />
  );
};
