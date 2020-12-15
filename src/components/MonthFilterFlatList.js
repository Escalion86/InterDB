import React, {
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
  useEffect,
} from 'react'
import { useDispatch } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native'

import EventsPage from '../components/EventsPage'
import { months } from '../constants'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'

const width = Dimensions.get('screen').width - 10
// const height = Dimensions.get('screen').height
const scrollWidth = width - 100

const TAB_WIDTH = 62

const data = []
months.forEach((month, index) =>
  data.push({
    key: 'tabmonth' + index.toString(),
    title: month,
    ref: React.createRef(),
  })
)

const yearsPrepare = (years) => {
  return years
    .sort((a, b) => (a < b ? 1 : -1))
    .map((year) => {
      return { label: year + '', value: year }
    })
}

const YearsDropDownList = ({ onChangeYear, years, colors, value }) => {
  years = yearsPrepare(years)
  return (
    <View
      style={{
        width: 80,
        // borderBottomColor: colors.border,
        // borderBottomWidth: 1,
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
            fontSize: 18,
            fontWeight: 'bold',
            // paddingHorizontal: 10,
            height: 36,
            // paddingVertical: 8,
            // borderWidth: 0.5,
            // borderColor: 'purple',
            // borderRadius: 8,
            color: colors.text,
            paddingLeft: 8,
            paddingTop: 4,
            // paddingRight: 24, // to ensure the text is never behind the icon
            // maxWidth: 100,
            // borderColor: 'red',
            // borderWidth: 3,
          },
          iconContainer: {
            top: 11,
            right: 8,
          },
          // placeholder: {
          //   // color: 'purple',
          //   fontSize: 12,
          //   fontWeight: 'bold',
          // },
        }}
        value={value}
        // textInputProps={{ underlineColorAndroid: 'cyan' }}
      />
    </View>
  )
} /* , [year, years, colors]) */

const Tab = ({ item, badges, onItemPress, datas, colors }) => {
  const Badges = badges
    ? badges.map((badge, index) => {
      const number = datas.filter((data) =>
        badge.values.includes(data[badge.param])
      ).length
      if (number > 0) {
        return (
          <View
            key={'badge' + index + item.title}
            style={{
              borderRadius: 10,
              minWidth: 14,
              paddingHorizontal: 3,
              backgroundColor: badge.color,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 1,
            }}
          >
            <Text
              style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
            >
              {number}
            </Text>
          </View>
        )
      }
    })
    : null

  return (
    <TouchableOpacity onPress={onItemPress} style={{ zIndex: 99 }}>
      <View style={{ width: TAB_WIDTH }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
            height: 22,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            {item.title}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'row',
            marginTop: -2,
          }}
        >
          {Badges}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Indicator = ({ scrollX, colors }) => {
  const translateX = scrollX.interpolate({
    inputRange: data.map((_, i) => i * width),
    outputRange: [
      0,
      TAB_WIDTH,
      TAB_WIDTH * 2,
      TAB_WIDTH * 3,
      TAB_WIDTH * 4,
      TAB_WIDTH * 5,
      TAB_WIDTH * 6,
      TAB_WIDTH * 7,
      TAB_WIDTH * 8,
      TAB_WIDTH * 9,
      TAB_WIDTH * 10,
      TAB_WIDTH * 11,
    ],
  })

  return (
    <Animated.View
      // style={{
      //   position: 'absolute',
      //   height: 4,
      //   width: TAB_WIDTH,
      //   left: 0,
      //   backgroundColor: colors.accent,
      //   bottom: 7,
      //   transform: [
      //     {
      //       translateX,
      //     },
      //   ],
      // }}
      style={{
        position: 'absolute',
        height: 36,
        width: TAB_WIDTH,
        left: 0,
        // backgroundColor: colors.accent,
        borderColor: colors.accent,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderRadius: 10,
        top: 4,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  )
}

const scrollToIndex = (scrollRef, index, animated = true) => {
  scrollRef.current.scrollTo({
    x: TAB_WIDTH * index - scrollWidth / 2 + TAB_WIDTH / 2,
    y: 0,
    animated,
  })
}

const Tabs = ({
  data,
  badges,
  scrollX,
  onItemPress,
  startedMonth,
  datasInMonths,
  colors,
}) => {
  const containerRef = React.useRef()
  const scrollRef = React.useRef()

  useLayoutEffect(() => {
    setTimeout(() => scrollToIndex(scrollRef, startedMonth, false), 10)
  }, [])

  return (
    <ScrollView
      style={{ width: scrollWidth }}
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ height: 42 }}>
        <View
          ref={containerRef}
          style={{
            justifyContent: 'space-evenly',
            flex: 1,
            flexDirection: 'row',
          }}
        >
          {data.map((item, index) => (
            <Tab
              key={item.key}
              item={item}
              badges={badges}
              // ref={item.ref}
              colors={colors}
              datas={datasInMonths[index]}
              onItemPress={() => {
                scrollToIndex(scrollRef, index)
                onItemPress(index)
              }}
            />
          ))}
        </View>
        <Indicator scrollX={scrollX} colors={colors} />
      </View>
    </ScrollView>
  )
}

const updateLoadedPages = (pages, loadedPages = null, pageIndex) => {
  if (loadedPages === null) {
    return pages.map((item, index) => {
      if (index === pageIndex) {
        return item
      } else {
        if (pages[pageIndex] && pages[pageIndex].length === 0) {
          return []
        } else {
          return null
        }
      }
    })
  } else {
    return loadedPages.map((item, index) => {
      if (index === pageIndex) {
        return pages[pageIndex]
      } else {
        return item
      }
    })
  }
}

const refreshDatas = (year, datas) => {
  const tempDatas = [[], [], [], [], [], [], [], [], [], [], [], []]
  datas.forEach((data) => {
    if (new Date(data.date).getFullYear() === year) {
      tempDatas[new Date(data.date).getMonth()].push(data)
    }
  })
  return tempDatas
}

const MonthFilterFlatList = ({
  PageComponent = EventsPage,
  datas,
  badges = null,
  navigation,
  setModal,
  sorting,
  onDelete,
  onScroll,
  onMonthPress = () => {},
  onPressFab = () => {},
}) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { colors } = theme

  const monthFilter = useRef(new Date().getMonth())
  const yearFilter = useRef(new Date().getFullYear())

  const datasInMonths = useMemo(() => refreshDatas(yearFilter.current, datas), [
    yearFilter.current,
    datas,
  ])

  const [datasInMonthsLoaded, setDatasInMonthsLoaded] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ])

  const onChangeYear = (value) => {
    if (value !== yearFilter.current) {
      yearFilter.current = value
      setDatasInMonthsLoaded(
        updateLoadedPages(refreshDatas(value, datas), null, monthFilter.current)
      )
    }
  }

  const scrollX = React.useRef(new Animated.Value(0)).current
  const refFlatList = React.useRef()

  const fabBottom = new Animated.Value(20)

  useEffect(() => {
    setDatasInMonthsLoaded(
      updateLoadedPages(datasInMonths, null, monthFilter.current)
    )
  }, [datas])

  const showFab = () => {
    Animated.timing(fabBottom, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

  const hideFab = () => {
    console.log('hidefab')
    Animated.timing(fabBottom, {
      toValue: -60,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

  const years = useMemo(() => {
    const tempYears = [new Date().getFullYear()]
    datas.forEach((data) => {
      const year = new Date(data.date).getFullYear()
      if (!tempYears.includes(year)) {
        tempYears.push(year)
      }
    })
    return tempYears
  }, [datas])

  const onItemPress = (itemIndex) => {
    refFlatList?.current?.scrollToOffset({
      offset: itemIndex * width,
    })
    monthFilter.current = itemIndex
    if (
      !datasInMonthsLoaded[itemIndex] ||
      datasInMonthsLoaded[itemIndex].length !== datasInMonths[itemIndex].length
    ) {
      setDatasInMonthsLoaded(
        updateLoadedPages(datasInMonths, datasInMonthsLoaded, itemIndex)
      )
    }
    onMonthPress()
    showFab()
  }

  useLayoutEffect(() => showFab(), [yearFilter.current])

  const Fab = () => (
    <Animated.View
      style={{ position: 'absolute', right: 20, bottom: fabBottom }}
    >
      <TouchableOpacity onPress={onPressFab}>
        <View
          style={{
            backgroundColor: colors.accent,
            borderRadius: 60,
            width: 56,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="ios-add" size={30} color={'black'} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <Tabs
          scrollX={scrollX}
          data={data}
          badges={badges}
          onItemPress={onItemPress}
          startedMonth={monthFilter.current}
          datasInMonths={datasInMonths}
          colors={colors}
        />
        <YearsDropDownList
          onChangeYear={onChangeYear}
          years={years}
          colors={colors}
          value={yearFilter.current}
        />
      </View>
      <Animated.FlatList
        ref={refFlatList}
        scrollEnabled={false}
        data={datasInMonthsLoaded}
        // extraData={datasInMonthsLoaded}
        initialScrollIndex={monthFilter.current}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{ width: width }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        // refreshing={true}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        // windowSize={1}
        keyExtractor={(item, index) =>
          yearFilter.current.toString() + index.toString()
        }
        renderItem={({ item, index }) => {
          return (
            <PageComponent
              data={item}
              navigation={navigation}
              style={{ height: '100%', width: width }}
              onDelete={onDelete}
              setModal={setModal}
              dispatch={dispatch}
              theme={theme}
              sorting={sorting}
              onScroll={onScroll}
              onScrollUp={hideFab}
              onScrollDown={showFab}
              month={index}
            />
          )
        }}
      />
      <Fab />
    </View>
  )
}

export default MonthFilterFlatList
