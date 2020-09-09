import React from "react"
import { StyleSheet, Text, View, Linking } from "react-native"
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
          title="Open Yandex Navigator"
          iconName="md-navigate"
          onPress={() => {
            // fetch(
            //   "https://geocode-maps.yandex.ru/1.x/?format=json&apikey=224f268f-765e-49ec-a76b-9192418e4648&geocode=Красноярск+Линейная+109"
            // )
            //   .then((response) => response.json())
            //   .then((result) => {
            //     let geoObject =
            //       result.response.GeoObjectCollection.featureMember[0].GeoObject
            //         .Point.pos
            //     geoObject = geoObject.split(" ") //.join(",")
            //     console.log("geoObject :>> ", geoObject)
            //     // Linking.openURL(
            //     //   `https://geocode-maps.yandex.ru/1.x/?apikey=224f268f-765e-49ec-a76b-9192418e4648&geocode=${geoObject}`
            //     // )
            //     Linking.openURL(
            //       //`yandexnavi://show_point_on_map?lat=${geoObject[1]}&lon=${geoObject[0]}&zoom=12&no-balloon=0&desc=кафе с wi-fi`
            //       `yandexnavi://build_route_on_map?lat_to=${geoObject[1]}&lon_to=${geoObject[0]}`
            //     )
            //   })
            Linking.openURL(
              `yandexnavi://map_search?text=${event.location_town},%20${event.location_street}%20${event.location_house}`
            )
          }}
        />
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
            navigation.navigate("CreateEvent", { event: event })
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
