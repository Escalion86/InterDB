import React from "react"
import { StyleSheet, Text, View, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatTime } from "../helpers/date"
import { StatusIcon, FinanceIcon } from "./icons"
import { useTheme } from "@react-navigation/native"
import { setEventStatus, setFinanceStatus } from "../store/actions/event"

import {
  statusIconDependencies,
  financeIconDependencies,
} from "../db/dependencies"
import IconMenu from "./IconMenu"

const showEventLog = (event) => {
  console.log("event", event)
}

export const EventCard = ({ event }) => {
  const theme = useTheme()
  const colors = theme.colors

  if (event.loading) {
    return (
      <View
        style={{
          ...styles.center,
          ...styles.card,
          backgroundColor: colors.card,
          minHeight: 90,
        }}
      >
        <ActivityIndicator color={colors.text} />
      </View>
    )
  }

  return (
    <View
      style={{ ...styles.card, backgroundColor: colors.card, minHeight: 90 }}
      onPress={showEventLog(event)}
    >
      <View style={{ ...styles.left, borderRightColor: colors.background }}>
        <IconMenu
          IconComponent={StatusIcon}
          dependencies={statusIconDependencies}
          activeStatus={event.status}
          themeStyle={theme}
          eventId={event.id}
          actionOnSelect={setEventStatus}
        />
        <IconMenu
          IconComponent={FinanceIcon}
          dependencies={financeIconDependencies}
          activeStatus={event.finance_status}
          themeStyle={theme}
          style={{ marginTop: 6 }}
          eventId={event.id}
          actionOnSelect={setFinanceStatus}
        />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
