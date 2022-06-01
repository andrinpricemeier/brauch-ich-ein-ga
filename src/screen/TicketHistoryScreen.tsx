import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
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

  const editTicket = useCallback((ticketId: string) => {
    navigation.navigate("Fahrbilletkauf erfassen", { ticketId: ticketId });
  }, []);

  const deleteTicket = useCallback((ticketId: string) => {
    repository.deleteTicket(ticketId);
    setTickets(repository.getTickets());
  }, []);

  return (
    <View style={tailwind("h-full flex-col m-auto p-5")}>
      <FlatList
        data={tickets}
        renderItem={({ item }: { item: any }) => (
          <View>
            <Text>
              CHF {item.price.toFixed(2)} (
              {new Date(item.dateAdded).toISOString()})
            </Text>
            <Button onPress={() => editTicket(item.id)} title="Ändern" />
            <Button onPress={() => deleteTicket(item.id)} title="Löschen" />
          </View>
        )}
      />
    </View>
  );
};
