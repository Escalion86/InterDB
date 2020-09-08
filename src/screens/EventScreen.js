import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { formatDateTime } from "../helpers/date"
import { deleteEvent } from "../store/actions/event"

const EventScreen = ({ navigation, route }) => {
  const event =
    route.params !== undefined && route.params.event !== undefined
      ? route.params.event
      : navigation.navigate("Events")

  const dispatch = useDispatch()

  navigation.setOptions({
    title: `Событие ${formatDateTime(new Date(event.date))}`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="Delete Event"
          iconName="ios-trash"
          onPress={() => {
            dispatch(deleteEvent(event.id))
            navigation.navigate("Events")
          }}
          // onPress={() => navigation.navigate("Create")}
        />
        <Item
          title="Edit Event"
          iconName="md-create"
          onPress={() => {
            console.log(event)
            alert(`Событие ${event.auditory}, ${event.event}`)
          }}
          // onPress={() => navigation.navigate("Create")}
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

export default EventScreen

const styles = StyleSheet.create({})
