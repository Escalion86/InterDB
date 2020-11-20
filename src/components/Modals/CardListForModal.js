import React from 'react'
import { View } from 'react-native'
import MainFlatListWithFab from '../MainFlatListWithFab'
import { MODAL_BOTTOM_CONTAINER_MAX_HEIGHT } from '../../constants'

const CardListForModal = ({
  data,
  renderItem,
  navigation,
  getItemLayout = null,
  containerStyle = {},
  type = null,
  onChoose = null,
}) => (
  <View
    style={{ height: MODAL_BOTTOM_CONTAINER_MAX_HEIGHT, ...containerStyle }}
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

export default CardListForModal
