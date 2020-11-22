import React, { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'

import { TitleBlock, TextBlock } from '../components/createComponents'
import { LineChart } from 'react-native-chart-kit'
import { useTheme } from '@react-navigation/native'
import { months, monthsFull } from '../constants'

const chartConfigs = {
  light: {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 0,
  },
  dark: {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#000000',
    backgroundGradientTo: '#000000',
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
    decimalPlaces: 0,
    // style: {
    //   marginLeft: 0,
    //   paddingLeft: 0,
    // },
  },
}

const chartColors = [
  { r: 60, g: 90, b: 188 }, // #3C5ABC
  { r: 55, g: 189, b: 128 }, // #37BD80
  { r: 254, g: 194, b: 35 }, // #FEC223
  { r: 209, g: 2, b: 42 }, // ##D1022A
  { r: 76, g: 88, b: 102 }, // #4C5866
  { r: 32, g: 169, b: 63 }, // #20A93F
  { r: 112, g: 44, b: 20 }, // #702C14
  { r: 71, g: 133, b: 6 }, // #478506
  { r: 209, g: 136, b: 191 }, // #D188BF
  { r: 255, g: 109, b: 0 }, // #FF6D00
  { r: 135, g: 100, b: 133 }, // #8764DF
]

const ChartScreen = ({ navigation, route }) => {
  const theme = useTheme()

  const [selectedDot, setSelectedDot] = useState(null)

  let chartTheme
  if (theme.dark) {
    chartTheme = chartConfigs.dark
  } else {
    chartTheme = chartConfigs.light
  }

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height

  const labelStyle = {
    color: chartTheme.color(),
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16,
  }
  const graphStyle = {
    marginVertical: 8,
    // borderColor: theme.colors.active,
    // borderWidth: 2,
    ...chartTheme.style,
  }

  const allEvents = useSelector((state) => state.event.events)

  const datasets = {}
  let data = {}
  const maxValue = 0
  if (allEvents.length > 0) {
    for (let i = 0; i < allEvents.length; i++) {
      const year = new Date(allEvents[i].date).getFullYear()
      const month = new Date(allEvents[i].date).getMonth()
      const profit =
        +allEvents[i].finance_price -
        +allEvents[i].finance_road -
        +allEvents[i].finance_organizator -
        +allEvents[i].finance_assistants -
        +allEvents[i].finance_consumables

      if (!datasets[year]) {
        datasets[year] = {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
      }
      datasets[year].data[month] += profit
    }
    // datasets = datasets.sort((a, b) => (a < b ? 1 : -1))
    const years = Object.keys(datasets)
    // years = years.sort((a, b) => (a < b ? 1 : -1))

    for (let i = 0; i < years.length; i++) {
      const color = chartColors[i % 10]
      datasets[years[i]].color = (opacity = 1) =>
        `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
      datasets[years[i]].year = years[i]
    }

    data = {
      labels: months,
      datasets: Object.values(datasets),
      legend: years, // optional
    }
  }

  return (
    <View style={styles.container}>
      <Text style={labelStyle}>Чистая прибыль по месяцам</Text>
      {allEvents.length > 0 ? (
        <View
          style={{
            backgroundColor: chartTheme.backgroundColor,
            borderColor: theme.colors.active,
            borderBottomWidth: 2,
            borderTopWidth: 2,
            // maxHeight: 290,
            height: height * 0.65,
          }}
        >
          <ScrollView>
            <ReactNativeZoomableView
              maxZoom={1.5}
              minZoom={1}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}
              // onZoomAfter={logOutZoomState}
              // onDoubleTapAfter={(props) => logOutZoomState(props)}
              // onZoomAfter={this.logOutZoomState}
              // style={{
              //   padding: 10,
              //   backgroundColor: 'red',
              // }}
            >
              <LineChart
                data={data}
                width={width}
                height={height * 0.52}
                chartConfig={chartTheme}
                bezier
                style={graphStyle}
                fromZero
                onDataPointClick={({ index, value, x, y, dataset }) =>
                  setSelectedDot({
                    month: index,
                    profit: value,
                    x,
                    y,
                    year: dataset.year,
                  })
                }
                // renderDotContent={({ x, y, index, indexData }) => {
                //   console.log(
                //     'x:',
                //     x,
                //     'y:',
                //     y,
                //     'index:',
                //     index,
                //     'indexData:',
                //     indexData
                //   )
                // }}
                // yAxisLabel="Чистая прибыль"
                verticalLabelRotation={90}
                // horizontalLabelRotation={90}
              />
              {selectedDot ? (
                <View
                  style={{
                    height: 14,
                    width: 14,
                    position: 'absolute',
                    top: selectedDot.y + height * 0.079,
                    left: selectedDot.x - 7,
                    zIndex: 99,
                    borderColor: theme.colors.accent,
                    borderWidth: 4,
                    borderRadius: 10,
                  }}
                />
              ) : null}
            </ReactNativeZoomableView>
          </ScrollView>
        </View>
      ) : null}
      {selectedDot ? (
        <View style={{ flex: 1 }}>
          <TextBlock style={{ flex: null, height: 30 }}>{`Месяц, год: ${
            monthsFull[selectedDot.month]
          } ${selectedDot.year}`}</TextBlock>
          <TextBlock
            style={{ flex: null, height: 30 }}
          >{`Чистая прибыль: ${selectedDot.profit} руб`}</TextBlock>

          {/* <TextBlock>{`x: ${selectedDot.x}`}</TextBlock>
          <TextBlock>{`y: ${selectedDot.y}`}</TextBlock> */}
        </View>
      ) : null}
    </View>
  )
}

export default ChartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
