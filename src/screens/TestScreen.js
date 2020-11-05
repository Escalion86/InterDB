import React from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import Button from '../components/Button'
import * as dataJson from '../../assets/mini.json'
import { addEvent } from '../store/actions/event'
import dbTemplate from '../db/dbTemplate'
import { DB } from '../db/db'

const JsonToEvent = async (json) => {
  const event = {
    client: null,
    comment: '',
    create_date: '',
    date: '',
    finance_organizator: 0,
    finance_price: 0,
    finance_road: 0,
    location_town: '',
    service: null,
    status: '',
    timing_duration: '',
  }

  return await DB.tableToTemplate('events')
  // return Number.parseFloat(json[3]['Аванс'])

  // return { ...dbDefault('events'), ...event }
}

const TestScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const saveHandler = async (event) => {
    dispatch(addEvent(event))
  }

  return (
    <View style={styles.container}>
      <Button
        title="Загрузить данные с CSV"
        // onPress={() => saveHandler(JsonToEvent(dataJson))}
        onPress={async () => console.log(await JsonToEvent(dataJson))}
      />
    </View>
  )
}

export default TestScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
