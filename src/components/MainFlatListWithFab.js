import React, { useRef } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native'
import { EventCard, ServiceCard, ClientCard, FinanceCard } from './Cards'
import {
  EVENT_CARD_HEIGHT,
  EVENT_CARD_HEIGHT_FULL,
  SERVICE_CARD_HEIGHT,
  CLIENT_CARD_HEIGHT,
  FINANCE_CARD_HEIGHT,
} from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../theme'

const MainFlatListWithFab = ({
  data,
  renderItem = null,
  onPressFab,
  navigation,
  type,
  containerStyle = {},
  // fabStyle = {},
  fabVisible = true,
  ListEmptyComponent = null,
  getItemLayout = null,
  initialNumToRender = null,
  windowSize = 5,
  maxToRenderPerBatch = null,
  swipeableCards = true,
  onChoose = null,
  onDelete = () => {},
  showContacts = true, // для type = 'client'
  cardsHavePopupMenu,
  onScroll = () => {},
  onScrollUp = () => {},
  onScrollDown = () => {},
  textIfNoData = '',
}) => {
  const scrollPosition = useRef(0)

  const { colors } = useTheme()
  // const [fabIsVisible, setFabIsVisible] = useState(fabVisible)

  const fabBottom = new Animated.Value(20)

  const showFab = () => {
    Animated.timing(fabBottom, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

  const hideFab = () => {
    Animated.timing(fabBottom, {
      toValue: -60,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

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

  if (data.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
          {textIfNoData}
        </Text>
        {fabVisible ? <Fab /> : null}
      </View>
    )
  }

  switch (type) {
    case 'events': {
      getItemLayout = (data, index) => {
        const height = data[index].location_town
          ? EVENT_CARD_HEIGHT_FULL + 4
          : EVENT_CARD_HEIGHT + 4
        return {
          length: height,
          offset: height * index,
          index,
        }
      }
      if (!renderItem) {
        renderItem = ({ item, index }) => (
          <EventCard
            navigation={navigation}
            event={item}
            onPress={onChoose ? () => onChoose(item) : null}
            swipeable={swipeableCards}
            onDelete={() => onDelete(item)}
          />
        )
      }
      initialNumToRender = initialNumToRender || 6
      maxToRenderPerBatch = maxToRenderPerBatch || 2
      break
    }
    case 'clients': {
      getItemLayout = (data, index) => ({
        length: CLIENT_CARD_HEIGHT + 4,
        offset: (CLIENT_CARD_HEIGHT + 4) * index,
        index,
      })
      if (!renderItem) {
        renderItem = ({ item, index }) => (
          <ClientCard
            navigation={navigation}
            client={item}
            onPress={onChoose ? () => onChoose(item) : null}
            showContacts={showContacts}
            swipeable={swipeableCards}
            onDelete={() => onDelete(item)}
          />
        )
      }
      initialNumToRender = initialNumToRender || 8
      maxToRenderPerBatch = maxToRenderPerBatch || 3
      break
    }
    case 'services': {
      getItemLayout = (data, index) => ({
        length: SERVICE_CARD_HEIGHT + 4,
        offset: (SERVICE_CARD_HEIGHT + 4) * index,
        index,
      })
      if (!renderItem) {
        renderItem = ({ item, index }) => (
          <ServiceCard
            navigation={navigation}
            service={item}
            onPress={onChoose ? () => onChoose(item) : null}
            swipeable={swipeableCards}
            onDelete={() => onDelete(item)}
            havePopupMenu={cardsHavePopupMenu}
          />
        )
      }
      initialNumToRender = initialNumToRender || 7
      maxToRenderPerBatch = maxToRenderPerBatch || 3
      break
    }
    case 'finances': {
      getItemLayout = (data, index) => ({
        length: FINANCE_CARD_HEIGHT + 4,
        offset: (FINANCE_CARD_HEIGHT + 4) * index,
        index,
      })
      if (!renderItem) {
        renderItem = ({ item, index }) => (
          <FinanceCard
            navigation={navigation}
            finance={item}
            onPress={onChoose ? () => onChoose(item) : null}
            swipeable={swipeableCards}
            onDelete={() => onDelete(item)}
          />
        )
      }
      initialNumToRender = initialNumToRender || 16
      maxToRenderPerBatch = maxToRenderPerBatch || 5
      break
    }
    default: {
      break
    }
  }

  return (
    <View style={{ flex: 1, ...containerStyle }}>
      <FlatList
        style={styles.list}
        data={data}
        // removeClippedSubviews={true}
        initialNumToRender={initialNumToRender}
        windowSize={windowSize}
        maxToRenderPerBatch={maxToRenderPerBatch}
        updateCellsBatchingPeriod={1000}
        getItemLayout={getItemLayout}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item) => type + item.id.toString()}
        // scrollsToTop={false}
        // onMomentumScrollEnd={() => console.log("end")}
        // onEndReached={() => setFabVisible(false)}
        // onScrollBeginDrag={() => setFabVisible(true)}
        // onEndReachedThreshold={0.1}
        // onTouchMove={() => setFabVisible(true)}
        onScroll={onScroll}
        scrollEventThrottle={1000}
        renderItem={renderItem}
        onScrollBeginDrag={({ nativeEvent }) => {
          scrollPosition.current = nativeEvent.contentOffset.y
        }}
        onScrollEndDrag={({ nativeEvent }) => {
          const currentOffset = nativeEvent.contentOffset.y
          if (currentOffset < scrollPosition.current) {
            if (onScrollDown) onScrollDown()
            if (fabVisible) showFab()
          } else {
            if (onScrollUp) onScrollUp()
            if (fabVisible) hideFab()
          }
        }}
      />
      {fabVisible ? <Fab /> : null}
    </View>
  )
}

export default MainFlatListWithFab

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
})
