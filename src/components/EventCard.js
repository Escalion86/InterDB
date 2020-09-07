import React from "react"
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
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

export const EventCard = ({ navigation, event }) => {
  const theme = useTheme()
  const colors = theme.colors

  if (event.loading || event.deleting) {
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
    <TouchableOpacity
      style={{ ...styles.card, backgroundColor: colors.card, minHeight: 90 }}
      onPress={() => navigation.navigate("Event", { event: event })}
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
      <View style={styles.middle}>
        <Text style={{ ...styles.cardtitle, color: colors.text }}>
          {event.auditory}, {event.event}
        </Text>
        <Text style={{ ...styles.carddesc, color: colors.text }}>
          {event.location_town}, {event.location_street},{" "}
          {Math.trunc(event.location_house)} - {Math.trunc(event.location_room)}
        </Text>
      </View>
      <View style={styles.right}>
        <View style={{ height: 52, padding: 5 }}>
          <Text style={{ ...styles.datetime, color: colors.text }}>
            {formatDate(new Date(event.date))}
          </Text>
          <Text style={{ ...styles.datetime, color: colors.text }}>
            {formatTime(new Date(event.date))}
          </Text>
        </View>
        <View
          style={{
            ...styles.finance,
            borderTopColor: colors.background,
            borderLeftColor: colors.background,
            backgroundColor: colors.border,
          }}
        >
          <Text style={styles.profit}>{event.finance_price}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  middle: {
    padding: 5,
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
  },
  cardtitle: {
    fontFamily: "open-bold",
    fontSize: 17,
  },
  carddesc: {
    fontFamily: "open-regular",
    fontSize: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  datetime: {
    fontSize: 14,
    textAlign: "right",
  },
  finance: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  profit: {
    fontSize: 14,
    color: "#ffff99",
  },
})
