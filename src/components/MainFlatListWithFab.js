import React, { useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Fab from './Fab'
import { EventCard, ServiceCard, ClientCard, FinanceCard } from './Cards'
import {
  EVENT_CARD_HEIGHT,
  EVENT_CARD_HEIGHT_FULL,
  SERVICE_CARD_HEIGHT,
  CLIENT_CARD_HEIGHT,
  FINANCE_CARD_HEIGHT,
} from '../constants'

const MainFlatListWithFab = ({
  data,
  renderItem = null,
  onPressFab,
  navigation,
  type,
  containerStyle = {},
  fabStyle = {},
  fabVisible = true,
  ListEmptyComponent = null,
  getItemLayout = null,
  initialNumToRender = 10,
  windowSize = 5,
  maxToRenderPerBatch = 5,
  swipeableCards = true,
  onChoose = null,
  onDelete = () => {},
  showContacts = true, // для type = 'client'
  cardsHavePopupMenu,
}) => {
  const [fabIsVisible, setFabIsVisible] = useState(fabVisible)
  const [scrollPosition, setScrollPosition] = useState(0)

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
        keyExtractor={(item) => item.id.toString()}
        // scrollsToTop={false}
        // onMomentumScrollEnd={() => console.log("end")}
        // onEndReached={() => setFabVisible(false)}
        // onScrollBeginDrag={() => setFabVisible(true)}
        // onEndReachedThreshold={0.1}
        // onTouchMove={() => setFabVisible(true)}
        onScroll={({ nativeEvent }) => {
          if (fabVisible) {
            const currentOffset = nativeEvent.contentOffset.y
            setFabIsVisible(currentOffset < scrollPosition)
            // const direction = currentOffset > scrollPosition ? "down" : "up"
            setScrollPosition(currentOffset)
          }
        }}
        scrollEventThrottle={1000}
        renderItem={renderItem}
      />
      <Fab visible={fabIsVisible} onPress={onPressFab} style={fabStyle} />
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
