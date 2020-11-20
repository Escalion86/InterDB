import React, { useCallback } from 'react'
import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from 'react-native-underline-tabbar'

const months = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
]

const yearsPrepare = (years) => {
  return years
    .sort((a, b) => (a < b ? 1 : -1))
    .map((year) => {
      return { label: year + '', value: year }
    })
}

const Filter = ({ data, onChangeMonth, onChangeYear, month, year }) => {
  const { colors } = useTheme()

  let years = [new Date().getFullYear()]
  const monthBadges = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  for (let i = 0; i < data.length; i++) {
    const dataYear = new Date(data[i].date).getFullYear()
    const dataMonth = new Date(data[i].date).getMonth()
    if (!years.includes(dataYear)) {
      years.push(dataYear)
    }
    if (year === dataYear) {
      monthBadges[dataMonth] += 1
    }
  }

  years = yearsPrepare(years)

  const YearsDropDownList = useCallback(() => {
    return (
      <View
        style={{
          width: 80,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          borderLeftColor: colors.border,
          borderLeftWidth: 1,
          zIndex: 10,
          // elevation: 10,
        }}
      >
        <RNPickerSelect
          items={years}
          // style={{ width: 100, height: 30 }}
          useNativeAndroidPickerStyle={false}
          placeholder={{}}
          // InputAccessoryView={() => null}
          onValueChange={(value) => onChangeYear(value)}
          Icon={() => {
            return (
              <Ionicons name="ios-arrow-down" size={18} color={colors.text} />
            )
          }}
          style={{
            inputAndroid: {
              fontSize: 16,
              // paddingHorizontal: 10,
              height: 36,
              // paddingVertical: 8,
              // borderWidth: 0.5,
              // borderColor: 'purple',
              // borderRadius: 8,
              color: colors.text,
              paddingLeft: 8,
              paddingRight: 30, // to ensure the text is never behind the icon
              // maxWidth: 100,
              // borderColor: 'red',
              // borderWidth: 3,
            },
            iconContainer: {
              top: 11,
              right: 10,
            },
            // placeholder: {
            //   // color: 'purple',
            //   fontSize: 12,
            //   fontWeight: 'bold',
            // },
          }}
          value={year}
          // textInputProps={{ underlineColorAndroid: 'cyan' }}
        />
      </View>
    )
  }, [colors.border, colors.text, year]) /* , [year, years, colors]) */

  const Tabs = useCallback(() => {
    const monthTabs = []
    for (let i = 0; i < months.length; i++) {
      monthTabs.push(
        <View
          key={i}
          tabLabel={{
            label: months[i],
            badge: monthBadges[i],
            badgeColor: colors.accent,
          }}
        />
      )
    }

    const TabBarMonth = () => (
      <TabBar
        underlineColor={colors.accent}
        tabBarTextStyle={{
          color: colors.text,
          fontSize: fontSize.medium,
        }}
        tabBarStyle={{
          marginTop: 0,
          borderBottomColor: 'transparent',
          borderBottomWidth: 0,
          // zIndex: 0,
          // height: 200,
        }}
        // scrollContainerStyle={{ flex: 1 }}
        activeTabTextStyle={{
          // color: colors.accent,
          fontSize: fontSize.medium,
          fontWeight: 'bold',
        }}
        tabStyles={{
          tab: { paddingTop: 6, paddingBottom: 6 },
          badgeText: {
            color: colors.accentText,
            fontSize: fontSize.tiny - 2,
          },
        }}
        style={{ paddingTop: 0 }}
      />
    )

    const onChangeTab = ({ i }) => onChangeMonth(i)

    return (
      <View
        style={{
          height: 38,
          flex: 1,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        }}
      >
        <ScrollableTabView
          onChangeTab={onChangeTab}
          initialPage={month}
          locked={true}
          // prerenderingSiblingsNumber={Infinity}
          // style={{ borderColor: 'red', borderWidth: 2, paddingTop: 0, flex: 1 }}
          renderTabBar={TabBarMonth}
        >
          {monthTabs}
        </ScrollableTabView>
      </View>
    )
  }, [
    monthBadges[0],
    monthBadges[1],
    monthBadges[2],
    monthBadges[3],
    monthBadges[4],
    monthBadges[5],
    monthBadges[6],
    monthBadges[7],
    monthBadges[8],
    monthBadges[9],
    monthBadges[10],
    monthBadges[11],
    colors.border,
    colors.accentText,
    colors.accent,
  ])

  return (
    <View style={{ flexDirection: 'row' }}>
      <Tabs />
      <YearsDropDownList />
    </View>
  )
}

export default Filter
