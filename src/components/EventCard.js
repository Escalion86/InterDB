import React from "react"
import THEME from "../theme"
import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatTime } from "../helpers/date"
import { StatusIcon } from "./icons"

const showEventLog = (event) => {
  console.log("event", event)
}

export const EventCard = ({ event }) => {
  const date = new Date(event.date)
  return (
    <View style={styles.card} onPress={showEventLog(event)}>
      <Text>ID: {event.id}</Text>
      <Text>Аудитория: {event.auditory}</Text>
      <Text>Событие: {event.event}</Text>
      <Text>Дата: {formatDate(date)}</Text>
      <Text>Время: {formatTime(date)}</Text>
      <Text>Продолжительность: {event.duration} мин</Text>
      <Text>Статус: {event.status}</Text>
      <StatusIcon status={event.status} size={200} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginVertical: 5,
    padding: 5,
    backgroundColor: "#ddd",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
})
