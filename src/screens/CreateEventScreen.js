import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native"
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
import {
  StatusIcon,
  FinanceIcon,
  EventIcon,
  AuditoryIcon,
} from "../components/icons"
import { dbDefault } from "../db/dbTemplate"
import {
  EventRowDropDownPicker,
  EventRowTextInput,
  EventRowDateTimePicker,
  EventRowTitleBlock,
} from "../components/createEventComponents"

const CreateEventScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [newEvent, setNewEvent] = useState(dbDefault)
  // const [dateTimePickerShow, setDateTimePickerShow] = useState(null)

  const { colors } = useTheme()

  const setEventItem = (item) => {
    setNewEvent({ ...newEvent, ...item })
  }

  const saveHandler = () => {
    dispatch(addEvent(newEvent))
    setNewEvent(dbDefault)
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

  return (
    <View style={styles.container}>
      <EventRowTitleBlock title="Описание" theme={useTheme()} />
      <EventRowDropDownPicker
        dependencies={statusIconDependencies}
        name="Статус события"
        IconEventComponent={StatusIcon}
        dafeultValue={newEvent.status}
        placeholder={"Выберите статус события"}
        onChangeItem={(item) => setEventItem({ status: item.value })}
        theme={useTheme()}
      />
      <EventRowDropDownPicker
        dependencies={financeIconDependencies}
        name="Статус оплаты"
        IconEventComponent={FinanceIcon}
        dafeultValue={newEvent.finance_status}
        placeholder={"Выберите статус оплаты"}
        onChangeItem={(item) => setEventItem({ finance_status: item.value })}
        theme={useTheme()}
      />
      <EventRowDropDownPicker
        dependencies={eventIconDependencies}
        name="Тип события"
        IconEventComponent={EventIcon}
        dafeultValue={newEvent.event}
        placeholder={"Выберите тип события"}
        onChangeItem={(item) => setEventItem({ event: item.value })}
        theme={useTheme()}
      />
      <EventRowDropDownPicker
        dependencies={auditoryIconDependencies}
        name="Аудитория"
        IconEventComponent={AuditoryIcon}
        dafeultValue={newEvent.auditory}
        placeholder={"Выберите аудиторию"}
        onChangeItem={(item) => setEventItem({ auditory: item.value })}
        theme={useTheme()}
      />
      <EventRowDateTimePicker
        dateValue={newEvent.date}
        onChangeStoreHook={setEventItem}
        theme={useTheme()}
      />
      <EventRowTitleBlock title="Финансы" theme={useTheme()} />
      <EventRowTextInput
        title="Цена клиента"
        value={newEvent.finance_price.toString()}
        theme={useTheme()}
        onChangeText={(text) => setEventItem({ finance_price: text })}
        postfix="&#8381;"
      />
      <EventRowTextInput
        title="За дорогу"
        value={newEvent.finance_road.toString()}
        theme={useTheme()}
        onChangeText={(text) => setEventItem({ finance_road: text })}
        postfix="&#8381;"
      />
      <EventRowTextInput
        title="Организатору"
        value={newEvent.finance_organizator.toString()}
        theme={useTheme()}
        onChangeText={(text) => setEventItem({ finance_organizator: text })}
        postfix="&#8381;"
      />
      <EventRowTextInput
        title="Ассистентам"
        value={newEvent.finance_assistants.toString()}
        theme={useTheme()}
        onChangeText={(text) => setEventItem({ finance_assistants: text })}
        postfix="&#8381;"
      />
    </View>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
})
