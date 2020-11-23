import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native'
import Button from '../components/Button'
import * as dataJson from '../../assets/mini.json'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// import { Button } from 'react-native-paper'
import { ProgressBar, Colors } from 'react-native-paper'
import { useTheme } from '@react-navigation/native'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'

import jsonToAllData from '../helpers/jsonToAllData'

import ModalSplash from '../components/Modals/ModalSplash'

import illusionistData from '../../assets/illusionist.json'

import {
  loadingEvents,
  addEvents,
  // prepareAndAddEventToDB,
} from '../store/actions/event'
import {
  loadingClients,
  addClients,
  // prepareAndAddClientToDB,
} from '../store/actions/client'
import {
  loadingServices,
  addServices,
  // prepareAndAddServiceToDB,
} from '../store/actions/service'
import {
  loadingFinances,
  addFinances,
  // prepareAndAddFinanceToDB,
} from '../store/actions/finance'

import { prepareAndSendCardDataToDB } from '../db/db'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [50, 20, 55, 86, 71, 100],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    },
    // {
    //   data: [20, 10, 4, 56, 87, 90],
    // },
    // {
    //   data: [30, 90, 67, 54, 10, 2],
    // },
  ],
}

// Mock data object used for Contribution Graph

const contributionData = [
  { date: '2016-01-02', count: 1 },
  { date: '2016-01-03', count: 2 },
  { date: '2016-01-04', count: 3 },
  { date: '2016-01-05', count: 4 },
  { date: '2016-01-06', count: 5 },
  { date: '2016-01-30', count: 2 },
  { date: '2016-01-31', count: 3 },
  { date: '2016-03-01', count: 2 },
  { date: '2016-04-02', count: 4 },
  { date: '2016-03-05', count: 2 },
  { date: '2016-02-30', count: 4 },
]

// Mock data object for Pie Chart

const pieChartData = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
]

// Mock data object for Progress

const progressChartData = [0.4, 0.6, 0.8]

const chartConfigs = [
  {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#022173',
    backgroundGradientFrom: '#022173',
    backgroundGradientTo: '#1b3fa0',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  },
  {
    backgroundColor: '#26872a',
    backgroundGradientFrom: '#43a047',
    backgroundGradientTo: '#66bb6a',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#111111',
    backgroundGradientTo: '#000000',
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
  },
  {
    backgroundColor: '#0091EA',
    backgroundGradientFrom: '#0091EA',
    backgroundGradientTo: '#0091EA',
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
  },
  {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#b90602',
    backgroundGradientFrom: '#e53935',
    backgroundGradientTo: '#ef5350',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
  {
    backgroundColor: '#ff3e03',
    backgroundGradientFrom: '#ff3e03',
    backgroundGradientTo: '#ff3e03',
    color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`,
  },
]

class Charts extends React.Component {
  renderTabBar () {
    return <StatusBar hidden />
  }

  render () {
    const width = Dimensions.get('window').width
    const height = 220
    return (
      <ScrollableTabView renderTabBar={this.renderTabBar}>
        {chartConfigs.map((chartConfig) => {
          const labelStyle = {
            color: chartConfig.color(),
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16,
          }
          const graphStyle = {
            marginVertical: 8,
            ...chartConfig.style,
          }
          return (
            <ScrollView
              key={Math.random()}
              style={{
                backgroundColor: chartConfig.backgroundColor,
              }}
            >
              <Text style={labelStyle}>Bezier Line Chart</Text>
              <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                bezier
                style={graphStyle}
                fromZero
              />
              <Text style={labelStyle}>Progress Chart</Text>
              <ProgressChart
                data={progressChartData}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              {/* <Text style={labelStyle}>Bar Graph</Text>
              <BarChart
                width={width}
                height={height}
                data={data}
                chartConfig={chartConfig}
                style={graphStyle}
              /> */}
              <Text style={labelStyle}>Pie Chart</Text>
              <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
              />
              <Text style={labelStyle}>Line Chart</Text>
              <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              <Text style={labelStyle}>Contribution Graph</Text>
              <ContributionGraph
                values={contributionData}
                width={width}
                height={height}
                endDate={new Date('2016-05-01')}
                numDays={105}
                chartConfig={chartConfig}
                style={graphStyle}
              />
            </ScrollView>
          )
        })}
      </ScrollableTabView>
    )
  }
}

const TestScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { dark, colors } = useTheme()

  const [modalProcessVisible, setModalProcessVisible] = useState(false)
  const [totalLength, setTotalLength] = useState(0)
  const [process, setProcess] = useState(0)

  const setEventsFromJSON = useCallback(
    async (json) => {
      const { events, services, clients, finances } = jsonToAllData(json)
      setTotalLength(
        events.length + services.length + clients.length + finances.length
      )
      setProcess(0)
      setModalProcessVisible(true)

      let process = 1

      await dispatch(loadingEvents())
      await dispatch(loadingServices())
      await dispatch(loadingClients())
      await dispatch(loadingFinances())

      for (let i = 0; i < clients.length; i++) {
        // if (modalProcessVisible) {
        const preperedClient = await prepareAndSendCardDataToDB(
          'clients',
          clients[i]
        )
        clients[i] = { ...clients[i], ...preperedClient }
        setProcess(++process)
        // } else {
        //   break
        // }
      }
      for (let i = 0; i < services.length; i++) {
        // if (modalProcessVisible) {
        const preparedService = await prepareAndSendCardDataToDB(
          'services',
          services[i]
        )
        services[i] = { ...services[i], ...preparedService }
        setProcess(++process)
        // } else {
        //   break
        // }
      }

      for (let i = 0; i < events.length; i++) {
        // if (modalProcessVisible) {
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
        const preparedEvent = await prepareAndSendCardDataToDB(
          'events',
          events[i]
        )
        events[i] = { ...events[i], ...preparedEvent }
        setProcess(++process)
        // } else {
        //   break
        // }
      }

      for (let i = 0; i < finances.length; i++) {
        // if (modalProcessVisible) {
        const event = events.find(
          (event) => event.tempId === finances[i].eventTempId
        )
        finances[i].event = event.id

        const preparedFinance = await prepareAndSendCardDataToDB(
          'finances',
          finances[i]
        )
        finances[i] = { ...finances[i], ...preparedFinance }
        setProcess(++process)
        // } else {
        //   break
        // }
      }

      dispatch(addEvents(events, true))
      dispatch(addServices(services, true))
      dispatch(addClients(clients, true))
      dispatch(addFinances(finances, true))
      setModalProcessVisible(false)
    },
    [dispatch]
  )
  // return (
  //   <Button
  //     icon="camera"
  //     mode="contained"
  //     onPress={() => console.log('Pressed')}
  //     dar
  //   >
  //     Press me
  //   </Button>
  // )
  // return <Charts />
  return (
    <>
      <ScrollView style={styles.container}>
        <Button
          title="Сформировать события из JSON"
          onPress={() => setEventsFromJSON(illusionistData /* dataJson */)}
        />
      </ScrollView>
      <ModalSplash
        visible={modalProcessVisible}
        subtitle={
          process === totalLength
            ? 'Завершение...'
            : `Процесс обработки... ${process}/${totalLength}`
        }
        onOuterClick={() => setModalProcessVisible(false)}
      >
        <ProgressBar
          style={{ marginTop: 6 }}
          progress={process / totalLength}
          color={colors.accent}
        />
      </ModalSplash>
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
