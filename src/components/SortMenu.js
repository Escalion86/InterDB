import React from 'react'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { fontSize } from '../theme'
import { Item } from 'react-navigation-header-buttons'

const SortMenu = ({
  sortList = [],
  onClickItem = () => {},
  activeValues = [],
}) => {
  // const { Popover } = renderers
  const { colors } = useTheme()

  let sortMenu = null
  const srtMenu = (r) => {
    sortMenu = r
  }

  const SortItem = ({ name, value }) => {
    return (
      <>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 30,
          }}
          onPress={() => {
            onClickItem(value)
            sortMenu.close()
          }}
        >
          {activeValues.includes(value) ? (
            <Ionicons
              style={{ marginHorizontal: 8 }}
              name="md-checkmark"
              size={24}
              color={colors.text}
            />
          ) : (
            <View style={{ width: 34 }} />
          )}
          <Text
            style={{
              fontSize: fontSize.medium,
              color: colors.text,
              paddingRight: 8,
              // width: 150,
            }}
          >
            {name}
          </Text>
        </TouchableOpacity>
      </>
    )
  }

  const Title = ({ children, style = {} }) => {
    return (
      <Text
        style={{
          ...styles.title,
          borderBottomColor: colors.border,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.active,
          color: colors.text,
          ...style,
        }}
      >
        {children}
      </Text>
    )
  }

  const SortBlocks = ({ sortList }) => {
    return sortList.map((sortListItem, index) => {
      const items = sortListItem.items.map((item, index) => (
        <SortItem
          key={'sortItem' + index}
          name={item.name}
          value={item.value}
        />
      ))

      return (
        <View key={'sortBlock' + index}>
          <Title
            style={{
              borderTopWidth: index > 0 ? 1 : 0,
            }}
          >
            {sortListItem.title}
          </Title>
          {items}
        </View>
      )
    })
  }

  return (
    <Menu
      // name="sorting"
      // style={styles.finance}
      ref={srtMenu}
      renderer={renderers.Popover}
      rendererProps={{ placement: 'bottom' }}
    >
      <MenuTrigger>
        <Item
          title="Sorting"
          iconName="md-funnel"
          // onPress={() => {
          //   alert("Сортировка")
          // }}
          onPress={() => sortMenu.open()}
        />
      </MenuTrigger>
      <MenuOptions
        style={{
          // padding: 5,
          borderColor: colors.border,
          borderWidth: 1,
          // borderRadius: 20,
          backgroundColor: colors.card,
        }}
      >
        <View>
          <Title
            style={{
              borderTopWidth: 0,
              // fontSize: fontSize.big,
              fontWeight: 'bold',
            }}
          >
            Сортировка
          </Title>
          <SortBlocks sortList={sortList} />
        </View>
      </MenuOptions>
    </Menu>
  )
}

export default SortMenu

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.medium,
    // fontWeight: 'bold',
    borderBottomWidth: 1,
    height: 30,
    paddingHorizontal: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})
