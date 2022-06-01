import React from "react";
import { Text, Pressable, StyleProp } from "react-native";
import { screensEnabled } from "react-native-screens";
import { useTailwind } from "tailwind-rn";

export interface IPrimaryButtonProps {
  title: string;
  onPress: (e: any) => void;
  buttonStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  enabled?: boolean;
}

export const PrimaryButton = (props: IPrimaryButtonProps) => {
  const tailwind = useTailwind();
  const disabled = props.enabled !== undefined && !props.enabled;
  let style = tailwind("max-w-xs bg-red p-3 rounded");
  if (disabled) {
    style = tailwind("max-w-xs bg-gray p-3 rounded");
  }
  return (
    <Pressable
      disabled={disabled}
      onPress={props.onPress}
      style={[style, props.buttonStyle]}
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
