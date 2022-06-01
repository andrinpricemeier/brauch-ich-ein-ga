import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AppButton } from "../components/AppButton";
import { TicketEntry } from "../components/TicketEntry";
import { Ticket } from "../model/Ticket";
import { storage } from "../storage/storage";
import { TicketRepository } from "../storage/TicketRepository";

const repository = new TicketRepository(storage);

export const TicketHistoryScreen = ({ navigation }: { navigation: any }) => {
  const tailwind = useTailwind();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    setTickets(repository.getTickets());
  }, [isFocused]);

  const editTicket = useCallback((ticket: Ticket) => {
    navigation.navigate("Billet erfassen", { ticketId: ticket.id });
  }, []);

  const deleteTicket = useCallback((ticket: Ticket) => {
    repository.deleteTicket(ticket.id);
    setTickets(repository.getTickets());
  }, []);

  return (
    <View style={tailwind("h-full flex-col m-auto p-5")}>
      <FlatList
        data={tickets}
        renderItem={({ item }: { item: any }) => (
          <TicketEntry
            ticket={item}
            onEdit={editTicket}
            onDelete={deleteTicket}
          />
        )}
      />
    </View>
  );
};
