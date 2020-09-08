import React from "react"
import { Ionicons } from "@expo/vector-icons"
import {
  statusIconDependencies,
  financeIconDependencies,
  eventIconDependencies,
  auditoryIconDependencies,
} from "../db/dependencies"
import { IconButton } from "react-native-paper"
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native"
// import { Button, Icon } from "react-native-elements"

export const MainIcon = ({
  dependencies = statusIconDependencies,
  status,
  size = 36,
  showtext = false,
  textcolor = null,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.button,
          width: size + Math.floor(size / 2),
          height: size + Math.floor(size / 2),
          padding: Math.floor(size / 16),
          backgroundColor: dependencies[status].color,
        }}
      >
        <Ionicons
          name={
            dependencies[status].name ? dependencies[status].name : "ios-bug"
          }
          size={size}
          color={dependencies[status].color ? "white" : "black"}
        />
      </View>
      {showtext ? (
        <Text
          style={{
            ...styles.text,
            fontSize: 10 + Math.floor(size / 3),
            color: textcolor,
          }}
        >
          {status}
        </Text>
      ) : null}
    </View>
  )
}

export const StatusIcon = ({
  status,
  size = 36,
  showtext = false,
  textcolor = null,
}) => {
  return (
    <MainIcon
      dependencies={statusIconDependencies}
      status={status}
      size={size}
      showtext={showtext}
      textcolor={textcolor}
    />
  )
}

export const FinanceIcon = ({
  status,
  size = 36,
  showtext = false,
  textcolor = null,
}) => {
  return (
    <MainIcon
      dependencies={financeIconDependencies}
      status={status}
      size={size}
      showtext={showtext}
      textcolor={textcolor}
    />
  )
}

export const EventIcon = ({
  status,
  size = 36,
  showtext = false,
  textcolor = null,
}) => {
  return (
    <MainIcon
      dependencies={eventIconDependencies}
      status={status}
      size={size}
      showtext={showtext}
      textcolor={textcolor}
    />
  )
}

export const AuditoryIcon = ({
  status,
  size = 36,
  showtext = false,
  textcolor = null,
}) => {
  return (
    <MainIcon
      dependencies={auditoryIconDependencies}
      status={status}
      size={size}
      showtext={showtext}
      textcolor={textcolor}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "#666",
    // borderWidth: 1,
    borderRadius: 200,
    //Shadow settings
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  text: {
    marginLeft: 6,
  },
})
