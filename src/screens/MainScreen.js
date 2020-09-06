import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { loadEvents, addEvent, deleteAllEvents } from "../store/actions/event"
import THEME from "../theme"
import { EventCard } from "../components/EventCard"
import { dbGenerator } from "../db/dbTemplate"

export const MainScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadEvents())
  }, [dispatch])

  const events = useSelector((state) => state.event.events)
  const loading = useSelector((state) => state.event.loading)

  navigation.setOptions({
    title: `Заявки (${events.length})`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="Delete all events"
          iconName="ios-trash"
          onPress={() => {
            dispatch(deleteAllEvents())
          }}
          // onPress={() => navigation.navigate("Create")}
        />
        <Item
          title="Add rondom event"
          iconName="ios-add-circle-outline"
          onPress={() => {
            dispatch(addEvent(dbGenerator("events")))
          }}
          // onPress={() => navigation.navigate("Create")}
        />
      </HeaderButtons>
    ),
  })

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR} />
      </View>
    )
  }

  if (!events.length) {
    return (
      <View style={styles.wrapper}>
        <Text>Заявок пока нет</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.list}
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  noItems: {
    fontFamily: "open-regular",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
  },
})
