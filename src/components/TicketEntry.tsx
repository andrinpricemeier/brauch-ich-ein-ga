import React from "react";
import { View } from "react-native";
import { Ticket } from "../model/Ticket";
import { useTailwind } from "tailwind-rn";
import { InlineButton } from "./InlineButton";
import { Price } from "./Price";
import { RelativeDate } from "./RelativeDate";

export interface ITicketEntryProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

export const TicketEntry = (props: ITicketEntryProps) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex flex-col mb-3")}>
      <Price
        style={tailwind("text-2xl align-middle")}
        price={props.ticket.price}
      />
      <RelativeDate date={new Date(props.ticket.dateAdded)} />
      <View style={tailwind("flex flex-row mt-1")}>
        <InlineButton
          title="Ändern"
          onPress={() => props.onEdit(props.ticket)}
        />
        <InlineButton
          buttonStyle={tailwind("ml-3")}
          title="Löschen"
          onPress={() => props.onDelete(props.ticket)}
        />
      </View>
    </View>
  );
};
