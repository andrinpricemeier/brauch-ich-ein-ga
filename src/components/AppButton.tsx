import React from "react";
import { Text, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";

export interface IButtonProps {
  title: string;
  onPress: (e: any) => void;
}

export const AppButton = (props: IButtonProps) => {
  const tailwind = useTailwind();
  return (
    <Pressable
      onPress={props.onPress}
      style={tailwind("bg-red p-5 rounded text-center")}
    >
      <Text style={tailwind("text-white font-semibold")}>{props.title}</Text>
    </Pressable>
  );
};
