import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"

const ProgramsScreen = ({ navigation, route }) => {
  navigation.setOptions({
    title: `Программы`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="Add Program"
          iconName="ios-add-circle"
          onPress={() => navigation.navigate("CreateProgram")}
        />
      </HeaderButtons>
    ),
  })

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default ProgramsScreen

const styles = StyleSheet.create({})
