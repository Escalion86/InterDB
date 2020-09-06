import React from "react"
import THEME from "../theme"
import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate } from "../helpers/date"

export const EventCard = ({ event }) => {
  return (
    <View style={styles.card}>
      <Text>ID: {event.id}</Text>
      <Text>Аудитория: {event.auditory}</Text>
      <Text>Событие: {event.event}</Text>
      <Text>Дата: {formatDate(new Date(event.date))}</Text>
      <Text>Время: {event.time}</Text>
      <Text>Продолжительность: {event.duration} мин</Text>
      {/* <Text>Статус: {}</Text> */}
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
