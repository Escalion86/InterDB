import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { dbDefault } from "../db/dbTemplate"

const CreateProgramScreen = ({ navigation, route }) => {
  const program =
    route.params !== undefined && route.params.program !== undefined
      ? route.params.program
      : dbDefault("programs")

  const saveHandler = () => {
    // event.id ? dispatch(updateEvent(newEvent)) : dispatch(addEvent(newEvent))
    navigation.navigate("Programs")
  }

  navigation.setOptions({
    title: `Создание программы`,
    headerRight: () => (
      <>
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Save Program"
            iconName="ios-save"
            onPress={saveHandler}
          />
        </HeaderButtons>
      </>
    ),
  })

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default CreateProgramScreen

const styles = StyleSheet.create({})
