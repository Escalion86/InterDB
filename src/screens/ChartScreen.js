import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'

import { TextBlock } from '../components/createComponents'
import { LineChart } from 'react-native-chart-kit'
import { useTheme } from '@react-navigation/native'
import { months, monthsFull } from '../constants'
import { fontSize } from '../theme'
import { Ionicons } from '@expo/vector-icons'

import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'

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

const InfoMenu = () => {
  const { Popover } = renderers
  const { colors } = useTheme()
  return (
    <Menu
      style={{
        position: 'absolute',
        right: 10,
        alignSelf: 'center',
      }}
      renderer={Popover}
      rendererProps={{ preferredPlacement: 'left' }}
    >
      <MenuTrigger>
        <Ionicons
          name="md-information-circle-outline"
          size={22}
          color={colors.text}
        />
      </MenuTrigger>
      <MenuOptions
        style={{
          padding: 10,
          borderColor: colors.border,
          borderWidth: 1,
          // borderRadius: 20,
          backgroundColor: colors.card,
          width: 290,
          // flexDirection: 'row',
          flexWrap: 'wrap',
          // marginTop: 4,
          // display: "inline",
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: `rgb(${chartColors[0].r}, ${chartColors[0].g}, ${chartColors[0].b})`,
              width: 12,
              height: 12,
              borderRadius: 7,
              marginTop: 4,
              marginHorizontal: 1,
            }}
          />
          <Text
            style={{
              color: colors.text,
              fontSize: fontSize.small,
              marginLeft: 6,
              textAlign: 'center',
              // lineHeight: 20,
              // flex: 1,
            }}
          >
            Месяц закрыт
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              // backgroundColor: '#fff',
              width: 14,
              height: 14,
              borderRadius: 7,
              borderColor: `rgb(${chartColors[0].r}, ${chartColors[0].g}, ${chartColors[0].b})`,
              borderWidth: 3,
              marginTop: 3,
            }}
          />
          <Text
            style={{
              color: colors.text,
              fontSize: fontSize.small,
              marginLeft: 6,
              textAlign: 'center',
              // lineHeight: 20,
              // flex: 1,
            }}
          >
            Есть незакрытые события
          </Text>
        </View>
      </MenuOptions>
    </Menu>
  )
}

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

const tooltipWidth = 120

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

  let tooltipLeft = selectedDot ? selectedDot.x - 6 - 53 : 0
  if (tooltipLeft + tooltipWidth + 12 > width) {
    tooltipLeft = width - tooltipWidth - 12
  }
  if (tooltipLeft < 2) tooltipLeft = 2

  const labelStyle = {
    color: theme.colors.text,
    height: 32,
    textAlign: 'center',
    fontSize: fontSize.medium,
    textAlignVertical: 'center',
  }
  const graphStyle = {
    // marginVertical: 8,
    // borderColor: theme.colors.active,
    // borderWidth: 2,
    ...chartTheme.style,
  }

  const allEvents = useSelector((state) => state.event.events)
  const allFinances = useSelector((state) => state.finance.finances)

  const datasets = {}
  let data = {}
  const closedMonths = {}
  if (allEvents.length > 0) {
    for (let i = 0; i < allEvents.length; i++) {
      const year = new Date(allEvents[i].date).getFullYear()
      const month = new Date(allEvents[i].date).getMonth()

      let profit = 0
      let eventClosed = false
      if (
        allEvents[i].status === 'Выполнено' ||
        allEvents[i].status === 'Отменено'
      ) {
        eventClosed = true
        const eventId = allEvents[i].id
        const eventsFinances = allFinances.filter(
          (finance) => finance.event === eventId
        )
        if (eventsFinances.length > 0) {
          let financesSum = 0
          for (let j = 0; j < eventsFinances.length; j++) {
            if (eventsFinances[j].type === 'income') {
              financesSum += eventsFinances[j].sum
            } else {
              financesSum -= eventsFinances[j].sum
            }
          }
          profit = financesSum
        } else {
          profit =
            +allEvents[i].finance_price -
            +allEvents[i].finance_road -
            +allEvents[i].finance_organizator -
            +allEvents[i].finance_assistants -
            +allEvents[i].finance_consumables
        }
      } else {
        profit =
          +allEvents[i].finance_price -
          +allEvents[i].finance_road -
          +allEvents[i].finance_organizator -
          +allEvents[i].finance_assistants -
          +allEvents[i].finance_consumables
      }

      if (!datasets[year]) {
        datasets[year] = {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
      }
      if (closedMonths[year] === undefined) {
        closedMonths[year] = [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ]
      }
      if (closedMonths[year][month] === true && eventClosed === false) {
        closedMonths[year][month] = false
      }
      datasets[year].data[month] += profit
    }
    // console.log('object', closedMonths)
    // datasets = datasets.sort((a, b) => (a < b ? 1 : -1))
    const years = Object.keys(datasets)
    // years = years.sort((a, b) => (a < b ? 1 : -1))

    for (let i = 0; i < years.length; i++) {
      const color = chartColors[i % 10]
      // datasets[years[i]].color = (opacity = 1) =>
      //   `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
      datasets[years[i]].color = (opacity = 1, index = null) => {
        if (!index || closedMonths[years[i]][index]) {
          return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
        } else {
          // return 'rgba(255,255,255, 1)'
          return 'transparent'
        }
      }
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
      {allEvents.length > 0 ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={labelStyle}>Чистая прибыль по месяцам</Text>
            <InfoMenu />
          </View>

          <View
            style={{
              backgroundColor: chartTheme.backgroundColor,
              borderColor: theme.colors.active,
              // borderBottomWidth: 2,
              borderTopWidth: 2,
              // maxHeight: 290,
              // height: height * 0.75,
              flex: 1,
            }}
          >
            <ScrollView style={{ height: '100%' }}>
              <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={1}
                // zoomStep={0.5}
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
                  height={height * 0.68}
                  chartConfig={chartTheme}
                  bezier
                  style={graphStyle}
                  fromZero
                  // yAxisInterval={2}
                  segments={5}
                  onDataPointClick={(props) => {
                    // console.log('props', props)
                    const { index, value, x, y, dataset } = props
                    if (
                      selectedDot &&
                      x === selectedDot.x &&
                      y === selectedDot.y
                    ) {
                      setSelectedDot(null)
                    } else {
                      setSelectedDot({
                        month: index,
                        profit: value,
                        x,
                        y,
                        year: dataset.year,
                      })
                    }
                  }}
                  // getDotProps={(value, index) => {
                  //   console.log('getDotColor', value, index)
                  // }}
                  renderDotContent={(props) => {
                    if (
                      closedMonths &&
                      closedMonths[props.dataset.year][props.index] === false
                    ) {
                      return (
                        <View
                          key={props.dataset.year + props.index}
                          style={{
                            // backgroundColor: '#fff',
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            borderColor: props.dataset.color(1),
                            borderWidth: 2,
                            position: 'absolute',
                            top: props.y + height * 0.102 - 5,
                            left: props.x - 5,
                          }}
                        />
                      )
                    }
                    return null
                  }}
                  // yAxisLabel="Чистая прибыль"
                  verticalLabelRotation={90}
                  // horizontalLabelRotation={90}
                />
                {selectedDot ? (
                  <>
                    {/* <View
                      style={{
                        height: 10,
                        width: 10,
                        position: 'absolute',
                        top: selectedDot.y + height * 0.102 - 5,
                        left: selectedDot.x - 5,
                        zIndex: 99,
                        borderColor: theme.colors.accent,
                        borderWidth: 2,
                        borderRadius: 10,
                      }}
                    /> */}
                    <View
                      style={{
                        position: 'absolute',
                        top: selectedDot.y + height * 0.102 + 4,
                        left: selectedDot.x - 5,
                        width: 0,
                        height: 0,
                        backgroundColor: 'transparent',
                        borderStyle: 'solid',
                        borderLeftWidth: 5,
                        borderRightWidth: 5,
                        borderBottomWidth: 10,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: 'white',
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: selectedDot.y + height * 0.1 + 15,
                        left: tooltipLeft,
                        width: tooltipWidth,
                        padding: 5,
                        borderColor: theme.colors.border,
                        borderWidth: 1,
                        // borderRadius: 20,
                        backgroundColor: theme.colors.card,
                        borderRadius: 5,
                      }}
                      onPress={() => setSelectedDot(null)}
                    >
                      <TextBlock
                        style={{
                          height: 24,
                          fontSize: fontSize.small,
                          textAlign: 'center',
                        }}
                      >{`${
                        monthsFull[selectedDot.month].charAt(0).toUpperCase() +
                        monthsFull[selectedDot.month].slice(1)
                      } ${selectedDot.year}`}</TextBlock>
                      <TextBlock
                        style={{
                          height: 24,
                          textAlign: 'center',
                          fontSize: fontSize.small,
                        }}
                      >{`${selectedDot.profit} руб`}</TextBlock>
                    </TouchableOpacity>
                  </>
                ) : null}
              </ReactNativeZoomableView>
            </ScrollView>
          </View>
        </>
      ) : (
        <Text style={labelStyle}>Нет данных для формирования графика</Text>
      )}
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
