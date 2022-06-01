import React from "react";
import { Text, Pressable, StyleProp } from "react-native";
import { useTailwind } from "tailwind-rn";

export interface ISecondaryButtonProps {
  title: string;
  onPress: (e: any) => void;
  buttonStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
}

export const SecondaryButton = (props: ISecondaryButtonProps) => {
  const tailwind = useTailwind();
  return (
    <Pressable
      onPress={props.onPress}
      style={[tailwind("max-w-xs bg-blue p-3 rounded"), props.buttonStyle]}
    >
      <Text
        style={[
          tailwind("text-white font-semibold text-center"),
          props.textStyle,
        ]}
      >
        {props.title}
      </Text>
    </Pressable>
  );
};
