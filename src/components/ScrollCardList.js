import React from 'react'
import { View } from 'react-native'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import { EventCard, ServiceCard, ClientCard, FinanceCard } from './Cards'

const ScrollCardList = ({
  data,
  renderItem,
  navigation,
  getItemLayout = null,
  containerStyle = {},
  type = null,
  onChoose = () => {},
}) => {
  switch (type) {
    case 'event': {
      getItemLayout = (data, index) => {
        const height = data[index].location_town ? 156 : 126
        return {
          length: height,
          offset: height * index,
          index,
        }
      }
      renderItem = ({ item, index }) => (
        <EventCard
          navigation={navigation}
          event={item}
          onPress={() => onChoose(item)}
          swipeable={false}
        />
      )
      break
    }
    case 'client': {
      getItemLayout = (data, index) => ({
        length: 92,
        offset: 92 * index,
        index,
      })
      renderItem = ({ item, index }) => (
        <ClientCard
          navigation={navigation}
          client={item}
          onPress={() => onChoose(item)}
          showContacts={false}
          swipeable={false}
        />
      )
      break
    }
    case 'service': {
      getItemLayout = (data, index) => ({
        length: 100,
        offset: 100 * index,
        index,
      })
      renderItem = ({ item, index }) => (
        <ServiceCard
          navigation={navigation}
          service={item}
          onPress={() => onChoose(item)}
          swipeable={false}
        />
      )
      break
    }
    case 'finance': {
      getItemLayout = (data, index) => ({
        length: 42,
        offset: 42 * index,
        index,
      })
      renderItem = ({ item, index }) => (
        <FinanceCard
          navigation={navigation}
          finance={item}
          onPress={() => onChoose(item)}
          swipeable={false}
        />
      )
      break
    }
    default: {
      break
    }
  }

  return (
    <View style={containerStyle}>
      <MainFlatListWithFab
        data={data}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        containerStyle={containerStyle}
        fabVisible={false}
      />
    </View>
  )
}

export default ScrollCardList
