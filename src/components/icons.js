import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { statusIcon } from "../db/dependencies"
import { IconButton } from "react-native-paper"
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native"
// import { Button, Icon } from "react-native-elements"

export const StatusIcon = ({ status, size = 36 }) => {
  return (
    <View
      style={{
        ...styles.button,
        width: size + Math.floor(size / 4),
        height: size + Math.floor(size / 4),
        padding: Math.floor(size / 16),
      }}
    >
      <Ionicons
        name={statusIcon[status].name}
        size={size}
        color={statusIcon[status].color}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
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
})
