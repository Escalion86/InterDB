import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import DropDownPicker from "react-native-dropdown-picker"
import { useTheme } from "@react-navigation/native"
import {
  statusIconDependencies,
  financeIconDependencies,
} from "../db/dependencies"
import { colors } from "react-native-elements"
import { StatusIcon, FinanceIcon } from "../components/icons"

const CreateEventScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  navigation.setOptions({
    title: `Создание события`,
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    //     <Item
    //       title="Edit Event"
    //       iconName="md-create"
    //       onPress={() => {
    //         console.log(event)
    //         alert(`Событие ${event.auditory}, ${event.event}`)
    //       }}
    //       // onPress={() => navigation.navigate("Create")}
    //     />
    //   </HeaderButtons>
    // ),
  })
  let statuses = []
  for (let status in statusIconDependencies) {
    statuses.push({
      label: "",
      value: status,
      icon: () => (
        <StatusIcon
          status={status}
          size={20}
          showtext={true}
          textcolor={colors.text}
        />
      ),
    })
  }

  let finance_statuses = []
  for (let finance_status in financeIconDependencies) {
    finance_statuses.push({
      label: "",
      value: finance_status,
      icon: () => (
        <FinanceIcon
          status={finance_status}
          size={20}
          showtext={true}
          textcolor={colors.text}
        />
      ),
    })
  }

  return (
    <>
      <View style={styles.row}>
        <Text style={{ ...styles.text, color: colors.text }}>Статус</Text>
        <DropDownPicker
          placeholder="Выберите статус"
          items={statuses}
          defaultValue={Object.keys(statusIconDependencies)[0]}
          // labelStyle={{
          //   fontSize: 16,
          //   textAlign: "left",
          //   color: colors.text,
          // }}
          containerStyle={{ height: 50, marginTop: 5, flex: 1 }}
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            marginTop: 5,
          }}
          dropDownMaxHeight={350}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
          activeItemStyle={{ backgroundColor: colors.border }}
          arrowColor={colors.text}
          onChangeItem={(item) => console.log("Item Changed")}
        />
      </View>
      <View style={styles.row}>
        <Text style={{ ...styles.text, color: colors.text }}>
          Статус оплаты
        </Text>
        <DropDownPicker
          placeholder="Выберите статус"
          items={finance_statuses}
          defaultValue={Object.keys(financeIconDependencies)[0]}
          // labelStyle={{
          //   fontSize: 16,
          //   textAlign: "left",
          //   color: colors.text,
          // }}
          containerStyle={{ height: 50, marginTop: 5, flex: 1 }}
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            marginTop: 5,
          }}
          dropDownMaxHeight={350}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
          activeItemStyle={{ backgroundColor: colors.border }}
          arrowColor={colors.text}
          onChangeItem={(item) => console.log("Item Changed")}
        />
      </View>
    </>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
})
