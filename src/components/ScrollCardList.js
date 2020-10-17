import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

const ScrollCardList = ({ data, renderItem, containerStyle = {} }) => {
  const items = data.map((item, index) => renderItem(item, index))

  return (
    <View style={containerStyle}>
      <ScrollView style={styles.list}>{items}</ScrollView>
    </View>
  )
}

export default ScrollCardList

const styles = StyleSheet.create({
  list: {
    width: '100%',
    padding: 0,
    margin: 0,
    height: '100%',
  },
})
