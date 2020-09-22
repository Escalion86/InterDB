import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { dbDefault } from "../db/dbTemplate"
import { useTheme } from "@react-navigation/native"
import { addService, updateService } from "../store/actions/service"
import {
  TextInputBlock,
  DateTimePickerBlock,
  TitleBlock,
} from "../components/createComponents"

const CreateServiceScreen = ({ navigation, route }) => {
  const service =
    route.params !== undefined && route.params.service !== undefined
      ? route.params.service
      : dbDefault("services")

  const dispatch = useDispatch()
  const [newService, setNewService] = useState(service)

  const { colors } = useTheme()

  const setServiceItem = (item) => {
    setNewService({ ...newService, ...item })
  }

  const saveHandler = () => {
    service.id
      ? dispatch(updateService(newService))
      : dispatch(addService(newService))
    navigation.navigate("Services")
  }

  navigation.setOptions({
    title: `Создание услуги`,
    headerRight: () => (
      <>
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Save Service"
            iconName="ios-save"
            onPress={saveHandler}
          />
        </HeaderButtons>
      </>
    ),
  })

  return (
    <ScrollView style={styles.container}>
      <TitleBlock title="Финансы" theme={useTheme()} />
      <TextInputBlock
        title="Название"
        value={service.name}
        theme={useTheme()}
        onChangeText={(text) => setServiceItem({ name: text })}
      />
      {/* <TextInputBlock
        title="Дом"
        value={newEvent.location_house}
        theme={useTheme()}
        onChangeText={(text) => setEventItem({ location_house: text })}
      /> */}
    </ScrollView>
  )
}

export default CreateServiceScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
})
