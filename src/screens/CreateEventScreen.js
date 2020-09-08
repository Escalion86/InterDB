import React, { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import DropDownPicker from "react-native-dropdown-picker"
import { useTheme } from "@react-navigation/native"
import { addEvent } from "../store/actions/event"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate, formatTime } from "../helpers/date"
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
  const [dateTimePickerShow, setDateTimePickerShow] = useState(null)

  const { colors } = useTheme()

  const setEventItem = (item) => {
    setNewEvent({ ...newEvent, ...item })
  }

  const saveHandler = () => {
    dispatch(addEvent(newEvent))
    // navigation.navigate("Events")
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
          containerStyle={{ height: 44, flex: 1 }}
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
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
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={{ ...styles.text, color: colors.text }}>
          Дата и время начала
        </Text>
        <View style={styles.datetimecontainer}>
          <TouchableOpacity
            // activeOpacity={1}
            delayPressIn={50}
            onPress={() => setDateTimePickerShow("eventDateStart")}
          >
            <Text
              style={{
                ...styles.datetime,
                color: colors.text,
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              {formatDate(newEvent.date, true, true)}
            </Text>
            {dateTimePickerShow === "eventDateStart" ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(newEvent.date)}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setDateTimePickerShow(null)
                  if (selectedDate) {
                    setEventItem({ date: Date.parse(selectedDate) })
                  }
                }}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            // activeOpacity={1}

            delayPressIn={50}
            onPress={() => setDateTimePickerShow("eventTimeStart")}
          >
            <Text
              style={{
                ...styles.datetime,
                color: colors.text,
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              {formatTime(newEvent.date, true, true)}
            </Text>
            {dateTimePickerShow === "eventTimeStart" ? (
              <DateTimePicker
                testID="timeTimePicker"
                value={new Date(newEvent.date)}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setDateTimePickerShow(null)
                  if (selectedDate)
                    setEventItem({
                      date: Date.parse(selectedDate),
                    })
                }}
              />
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

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
    </View>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 18,
    width: 170,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  datetime: {
    fontSize: 18,
    // flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  datetimecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingLeft: 5,
    height: 44,
    flex: 1,
  },
})
