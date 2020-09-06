import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatTime } from "../helpers/date"
import { StatusIcon, FinanceIcon } from "./icons"
import { useTheme } from "@react-navigation/native"
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
import { colors } from "react-native-elements"

const showEventLog = (event) => {
  console.log("event", event)
}

const menu = (
  IconComponent = StatusIcon,
  dependencies = statusIconDependencies,
  activeStatus
) => {
  const { colors } = useTheme()

  let menu = []
  for (let key in dependencies) {
    menu.push(
      <MenuOption
        key={key}
        onSelect={() => (activeStatus === key ? null : alert(`Save`))}
        style={activeStatus === key ? { backgroundColor: colors.border } : null}
        children={
          <IconComponent
            status={key}
            size={20}
            showtext={true}
            textcolor={colors.text}
          />
        }
      />
    )
  }
  return menu
}

export const EventCard = ({ event }) => {
  const { colors } = useTheme()

  return (
    <View
      style={{ ...styles.card, backgroundColor: colors.card }}
      onPress={showEventLog(event)}
    >
      <View style={{ ...styles.left, borderRightColor: colors.background }}>
        <Menu>
          <MenuTrigger
            children={<StatusIcon status={event.status} size={24} />}
          />
          <MenuOptions
            customStyles={{
              optionWrapper: { padding: 5, backgroundColor: colors.background },
            }}
          >
            {menu(StatusIcon, statusIconDependencies, event.status)}
          </MenuOptions>
        </Menu>
        <Menu style={{ marginTop: 5 }}>
          <MenuTrigger
            children={<FinanceIcon status={event.finance_status} size={24} />}
          />
          <MenuOptions
            customStyles={{
              optionWrapper: { padding: 5, backgroundColor: colors.background },
            }}
          >
            {menu(FinanceIcon, financeIconDependencies, event.finance_status)}
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.right}>
        <Text style={{ ...styles.cardtitle, color: colors.text }}>
          {event.auditory}, {event.event}
        </Text>
        <Text style={{ ...styles.carddesc, color: colors.text }}>
          {event.location_town}, {event.location_street}, {event.location_house}{" "}
          - {event.location_room}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginVertical: 2,
    // backgroundColor: THEME.SECONDARY_COLOR,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
  left: {
    padding: 5,
    //borderRightColor: "black",
    borderRightWidth: 1,
    justifyContent: "space-around",
  },
  right: {
    padding: 5,
  },
  cardtitle: {
    fontFamily: "open-bold",
    fontSize: 14,
  },
  carddesc: {
    fontFamily: "open-regular",
    fontSize: 12,
  },
})
