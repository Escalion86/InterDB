import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Button from '../components/Button'
import * as dataJson from '../../assets/mini.json'

import jsonToAllData from '../helpers/jsonToAllData'

import ModalSplash from '../components/Modals/ModalSplash'

import illusionistData from '../../assets/illusionist.json'

import {
  loadingEvents,
  addEvents,
  prepareAndAddEventToDB,
} from '../store/actions/event'
import {
  loadingClients,
  addClients,
  prepareAndAddClientToDB,
} from '../store/actions/client'
import {
  loadingServices,
  addServices,
  prepareAndAddServiceToDB,
} from '../store/actions/service'
import {
  loadingFinances,
  addFinances,
  prepareAndAddFinanceToDB,
} from '../store/actions/finance'

import { dbDefault } from '../db/dbTemplate'

const TestScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const [modalProcessVisible, setModalProcessVisible] = useState(false)
  const [totalLength, setTotalLength] = useState(0)
  const [process, setProcess] = useState(0)

  const setEventsFromJSON = useCallback(
    async (json) => {
      const { events, services, clients, finances } = jsonToAllData(json)
      setTotalLength(
        events.length + services.length + clients.length + finances.length
      )
      let process = 0
      setProcess(0)
      setModalProcessVisible(true)

      await dispatch(loadingEvents())
      await dispatch(loadingServices())
      await dispatch(loadingClients())
      await dispatch(loadingFinances())
      for (let i = 0; i < services.length; i++) {
        services[i] = await prepareAndAddServiceToDB(services[i])
        setProcess(++process)
      }
      for (let i = 0; i < clients.length; i++) {
        clients[i] = await prepareAndAddClientToDB(clients[i])
        setProcess(++process)
      }

      for (let i = 0; i < events.length; i++) {
        // Находим нужную услугу и подставляем ID
        const service = services.find(
          (service) => service.tempId === events[i].serviceTempId
        )
        events[i].service = service.id

        // Находим нужного клиента и подставляем ID
        const client = clients.find(
          (client) => client.tempId === events[i].clientTempId
        )
        events[i].client = client.id
        // Формируем событие
        events[i] = await prepareAndAddEventToDB(events[i])
        setProcess(++process)
      }

      for (let i = 0; i < finances.length; i++) {
        const event = events.find(
          (event) => event.tempId === finances[i].eventTempId
        )
        finances[i].event = event.id

        finances[i] = await prepareAndAddFinanceToDB(finances[i])
        setProcess(++process)
      }
      dispatch(addEvents(events, true))
      dispatch(addServices(services, true))
      dispatch(addClients(clients, true))
      dispatch(addFinances(finances, true))
      setModalProcessVisible(false)
    },
    [dispatch]
  )

  return (
    <>
      <ScrollView style={styles.container}>
        <Button
          title="Сформировать события из JSON"
          onPress={() => setEventsFromJSON(illusionistData)}
        />
      </ScrollView>
      <ModalSplash
        visible={modalProcessVisible}
        subtitle={`Процесс обработки... ${process}/${totalLength}`}
      />
    </>
  )
}

export default TestScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
