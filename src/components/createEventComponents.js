import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import DropDownPicker from "react-native-dropdown-picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate, formatTime } from "../helpers/date"

export const EventRowTextInput = ({
  title = "",
  value = "",
  theme = useTheme(),
  onChangeText = () => {},
}) => {
  const { colors } = theme
  return (
    <View style={styles.row}>
      <Text style={{ fontSize: 18, width: 170, color: colors.text }}>
        {title}
      </Text>
      <View
        style={{
          flex: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            color: colors.text,
          }}
          keyboardType="numeric"
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  )
}

export const EventRowDropDownPicker = ({
  dependencies,
  name,
  IconEventComponent,
  dafeultValue = null,
  placeholder = "Выберите пункт из списка",
  onChangeItem = null,
  theme = useTheme(),
}) => {
  const { colors } = theme
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

export const EventRowDateTimePicker = ({
  dateValue,
  onChangeStoreHook,
  theme = useTheme(),
}) => {
  const { colors } = theme
  const [dateTimePickerShow, setDateTimePickerShow] = useState(null)

  return (
    <View style={styles.row}>
      <Text style={{ ...styles.text, color: colors.text }}>
        Дата и время начала
      </Text>
      <View style={styles.datetimecontainer}>
        <TouchableOpacity
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
            {formatDate(dateValue, true, true)}
          </Text>
          {dateTimePickerShow === "eventDateStart" ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(dateValue)}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setDateTimePickerShow(null)
                if (selectedDate) {
                  onChangeStoreHook({ date: Date.parse(selectedDate) })
                }
              }}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
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
            {formatTime(dateValue, true, true)}
          </Text>
          {dateTimePickerShow === "eventTimeStart" ? (
            <DateTimePicker
              testID="timeTimePicker"
              value={new Date(dateValue)}
              mode={"time"}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setDateTimePickerShow(null)
                if (selectedDate)
                  onChangeStoreHook({
                    date: Date.parse(selectedDate),
                  })
              }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    width: 170,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    height: 45,
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
