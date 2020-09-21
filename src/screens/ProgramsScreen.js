import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, View, FlatList } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import {
  loadPrograms,
  addProgram,
  deleteAllPrograms,
} from "../store/actions/program"
import { dbGenerator } from "../db/dbTemplate"
import { ProgramCard } from "../components/ProgramCard"

const ProgramsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPrograms())
  }, [dispatch])

  const programs = useSelector((state) => state.program.programs)
  const loading = useSelector((state) => state.program.loading)

  console.log("programs :>> ", programs)

  navigation.setOptions({
    title: `Программы`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="Add rondom program"
          iconName="ios-add-circle-outline"
          onPress={() => {
            const tmp = dbGenerator("program")
            dispatch(addProgram(tmp))
          }}
          // onPress={() => navigation.navigate("Create")}
        />
        <Item
          title="Add Program"
          iconName="ios-add-circle"
          onPress={() => navigation.navigate("CreateProgram")}
        />
      </HeaderButtons>
    ),
  })

  if (programs.length == 0) {
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
        data={programs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProgramCard navigation={navigation} program={item} />
        )}
      />
    </View>
  )
}

export default ProgramsScreen

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
    margin: 0,
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
    padding: 0,
    margin: 0,
  },
})
