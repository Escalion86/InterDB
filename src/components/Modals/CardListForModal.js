import React from 'react'
import { View } from 'react-native'
import MainFlatListWithFab from '../MainFlatListWithFab'
import {
  MODAL_BOTTOM_CONTAINER_MAX_HEIGHT,
  EVENT_CARD_HEIGHT_FULL,
  SERVICE_CARD_HEIGHT,
  CLIENT_CARD_HEIGHT,
  FINANCE_CARD_HEIGHT,
} from '../../constants'

const CardListForModal = ({
  data,
  renderItem,
  navigation,
  getItemLayout = null,
  containerStyle = {},
  type = null,
  onChoose = null,
}) => {
  let height = 0
  switch (type) {
    case 'events': {
      height = (EVENT_CARD_HEIGHT_FULL + 4) * data.length
      break
    }
    case 'services': {
      height = (SERVICE_CARD_HEIGHT + 4) * data.length
      break
    }
    case 'clients': {
      height = (CLIENT_CARD_HEIGHT + 4) * data.length
      break
    }
    case 'finances': {
      height = (FINANCE_CARD_HEIGHT + 4) * data.length
      break
    }
    default:
      break
  }

  return (
    <View
      style={{
        height:
          height > MODAL_BOTTOM_CONTAINER_MAX_HEIGHT
            ? MODAL_BOTTOM_CONTAINER_MAX_HEIGHT
            : height,
        ...containerStyle,
      }}
    >
      <MainFlatListWithFab
        data={data}
        type={type}
        navigation={navigation}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        fabVisible={false}
        onChoose={onChoose}
      />
    </View>
  )
}

export default CardListForModal
