import React from "react"
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native"
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu"
import { Ionicons } from "@expo/vector-icons"
import { formatDate, formatTime, getWeekDay } from "../helpers/date"
import { StatusIcon, FinanceIcon } from "./icons"
import { useTheme } from "@react-navigation/native"
import { setEventStatus, setFinanceStatus } from "../store/actions/event"
import { Root, Toast } from "popup-ui"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import {
  statusIconDependencies,
  financeIconDependencies,
} from "../db/dependencies"
import IconMenu from "./IconMenu"

export const ProgramCard = ({ navigation, program }) => {
  const { Popover } = renderers
  const theme = useTheme()
  const colors = theme.colors

  if (program.loading || program.deleting) {
    return (
      <View
        style={{
          ...styles.center,
          ...styles.card,
          backgroundColor: colors.card,
          minHeight: 94,
        }}
      >
        {program.loading ? (
          <ActivityIndicator size="large" color={colors.text} />
        ) : (
          <Ionicons name={"ios-trash"} size={32} color={colors.notification} />
        )}
      </View>
    )
  }

  return (
    <TouchableOpacity
      // activeOpacity={1}
      delayPressIn={50}
      style={{ ...styles.card, backgroundColor: colors.card, minHeight: 94 }}
      onPress={() => {
        navigation.navigate("Program", { program: program })
      }}
    >
      <View
        style={{ ...styles.left, borderRightColor: colors.background }}
      ></View>
      <View style={styles.middle}>
        <View style={styles.cardheader}>
          <Text style={{ ...styles.cardtitle, color: colors.text }}>
            {program.name}
          </Text>
        </View>
        <View style={styles.carddesc}>
          <Text style={{ ...styles.cardtitle, color: colors.text }}>
            {program.description}
          </Text>
        </View>
      </View>
      <View style={styles.right}></View>
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
  carddate: { height: 50, padding: 5 },
  middle: {
    // padding: 10,
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
    borderLeftWidth: 1,
  },
  cardheader: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardtitle: {
    fontFamily: "open-bold",
    fontSize: 16,
  },
  carddesctext: {
    flex: 1,
    fontFamily: "open-regular",
    fontSize: 14,
  },
  carddesc: {
    flexDirection: "row",
    height: 42,
    // borderColor: "red",
    // borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
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
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "100%",
    // borderColor: "#fff",
    // borderWidth: 2,
    // height: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  profit: {
    // flex: 1,
    fontSize: 14,
    width: "100%",
    height: 42,
    textAlignVertical: "center",
    textAlign: "center",
    color: "#ffff99",
    borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  menuOptions: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
