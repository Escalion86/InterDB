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
  status = null,
  size = 36,
  showtext = false,
  textcolor = null,
}) => {
  if (!status) {
    return null
  } else {
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
              fontSize: 12 + Math.floor(size / 3),
              color: textcolor,
            }}
          >
            {status}
          </Text>
        ) : null}
      </View>
    )
  }
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
