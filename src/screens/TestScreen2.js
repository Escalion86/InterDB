import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'

import EventsPage from '../components/EventsPage'

import MonthFilterFlatList from '../components/MonthFilterFlatList'

const TestScreen2 = ({ navigation, route }) => {
  const [sorting, setSorting] = useState('dateASC')
  const [modal, setModal] = useState(null)

  const events = useSelector((state) => state.event.events)

  return (
    <View style={styles.container}>
      <MonthFilterFlatList
        PageComponent={EventsPage}
        datas={events}
        setModal={setModal}
        sorting={sorting}
        navigation={navigation}
        onDelete={() => {}}
      />
    </View>
  )
}

export default TestScreen2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
