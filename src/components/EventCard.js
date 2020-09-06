import React from "react"
import THEME from "../theme"
import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatTime } from "../helpers/date"
import { StatusIcon, FinanceIcon } from "./icons"
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu"
import {
  statusIconDependencies,
  financeIconDependencies,
} from "../db/dependencies"

const showEventLog = (event) => {
  console.log("event", event)
}

const menu = (
  IconComponent = StatusIcon,
  dependencies = statusIconDependencies,
  activeStatus
) => {
  let menu = []
  for (let key in dependencies) {
    menu.push(
      <MenuOption
        key={key}
        onSelect={() => (activeStatus === key ? null : alert(`Save`))}
        style={activeStatus === key ? styles.menuactive : null}
        children={<IconComponent status={key} size={20} showtext />}
      />
    )
  }
  return menu
}

export const EventCard = ({ event }) => {
  const date = new Date(event.date)

  return (
    <View style={styles.card} onPress={showEventLog(event)}>
      <View style={styles.left}>
        <Menu>
          <MenuTrigger
            children={<StatusIcon status={event.status} size={36} />}
          />
          <MenuOptions>
            {menu(StatusIcon, statusIconDependencies, event.status)}
          </MenuOptions>
        </Menu>
        <Menu>
          <MenuTrigger
            children={<FinanceIcon status={event.finance_status} size={36} />}
          />
          <MenuOptions>
            {menu(FinanceIcon, financeIconDependencies, event.finance_status)}
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.right}>
        <Text>ID: {event.id}</Text>
        <Text>Аудитория: {event.auditory}</Text>
        <Text>Событие: {event.event}</Text>
        <Text>Дата: {formatDate(date)}</Text>
        <Text>Время: {formatTime(date)}</Text>
        <Text>Продолжительность: {event.duration} мин</Text>
        <Text>Статус: {event.status}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginVertical: 5,
    backgroundColor: "#ddd",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
  },
  left: {
    padding: 5,
    borderRightColor: "black",
    borderRightWidth: 1,
    justifyContent: "space-around",
  },
  right: {
    padding: 5,
  },
  menuactive: {
    backgroundColor: "#ddffdd",
  },
})
