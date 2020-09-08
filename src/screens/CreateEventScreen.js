import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import DropDownPicker from "react-native-dropdown-picker"
import { useTheme } from "@react-navigation/native"
import { addEvent } from "../store/actions/event"
import {
  statusIconDependencies,
  financeIconDependencies,
  eventIconDependencies,
  auditoryIconDependencies,
} from "../db/dependencies"
import { colors } from "react-native-elements"
import {
  StatusIcon,
  FinanceIcon,
  EventIcon,
  AuditoryIcon,
} from "../components/icons"
import { dbDefault } from "../db/dbTemplate"

const CreateEventScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [newEvent, setNewEvent] = useState(dbDefault)

  const { colors } = useTheme()

  const setEventItem = (item) => {
    setNewEvent({ ...newEvent, ...item })
  }

  const saveHandler = () => {
    dispatch(addEvent(newEvent))
    navigation.navigate("Events")
  }

  navigation.setOptions({
    title: `Создание события`,
    headerRight: () => (
      <>
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Save Event" iconName="ios-save" onPress={saveHandler} />
        </HeaderButtons>
      </>
    ),
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

  let event_types = []
  for (let event_type in eventIconDependencies) {
    event_types.push({
      label: "",
      value: event_type,
      icon: () => (
        <EventIcon
          status={event_type}
          size={20}
          showtext={true}
          textcolor={colors.text}
        />
      ),
    })
  }

  let auditories = []
  for (let auditory in auditoryIconDependencies) {
    auditories.push({
      label: "",
      value: auditory,
      icon: () => (
        <AuditoryIcon
          status={auditory}
          size={20}
          showtext={true}
          textcolor={colors.text}
        />
      ),
    })
  }

  const EventRowDropDownPicker = ({
    dependencies,
    name,
    IconEventComponent,
    dafeultValue = null,
    placeholder = "Выберите пункт из списка",
    onChangeItem = null,
  }) => {
    let arrayItems = []
    for (let item in dependencies) {
      arrayItems.push({
        label: "",
        value: item,
        icon: () => (
          <IconEventComponent
            status={item}
            size={20}
            showtext={true}
            textcolor={colors.text}
          />
        ),
      })
    }

    return (
      <View style={styles.row}>
        <Text style={{ ...styles.text, color: colors.text }}>{name}</Text>
        <DropDownPicker
          placeholder={placeholder}
          items={arrayItems}
          defaultValue={dafeultValue}
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
          onChangeItem={onChangeItem}
        />
      </View>
    )
  }

  return (
    <>
      <EventRowDropDownPicker
        dependencies={statusIconDependencies}
        name="Статус события"
        IconEventComponent={StatusIcon}
        dafeultValue={newEvent.status}
        placeholder={"Выберите статус события"}
        onChangeItem={(item) => setEventItem({ status: item.value })}
      />
      <EventRowDropDownPicker
        dependencies={financeIconDependencies}
        name="Статус оплаты"
        IconEventComponent={FinanceIcon}
        dafeultValue={newEvent.finance_status}
        placeholder={"Выберите статус оплаты"}
        onChangeItem={(item) => setEventItem({ finance_status: item.value })}
      />
      <EventRowDropDownPicker
        dependencies={eventIconDependencies}
        name="Тип события"
        IconEventComponent={EventIcon}
        dafeultValue={newEvent.event}
        placeholder={"Выберите тип события"}
        onChangeItem={(item) => setEventItem({ event: item.value })}
      />
      <EventRowDropDownPicker
        dependencies={auditoryIconDependencies}
        name="Аудитория"
        IconEventComponent={AuditoryIcon}
        dafeultValue={newEvent.auditory}
        placeholder={"Выберите аудиторию"}
        onChangeItem={(item) => setEventItem({ auditory: item.value })}
      />
    </>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    padding: 5,
    width: 170,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
})
