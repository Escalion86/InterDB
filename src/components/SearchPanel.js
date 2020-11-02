import React from 'react'
import { View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { fontSize } from '../theme'

const SearchPanel = ({ theme, setFilter, filter }) => {
  const { colors } = theme
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: colors.active,
        borderBottomWidth: 1,
        borderTopColor: colors.active,
        borderTopWidth: 1,
        marginBottom: 2,
      }}
    >
      <Ionicons name="md-search" size={28} color={colors.icon} />
      <TextInput
        style={{
          flex: 1,
          // textAlign: textAlign,
          fontSize: fontSize.medium,
          color: colors.text,
          paddingHorizontal: 5,
        }}
        // keyboardType={keyboardType}
        onChangeText={(text) => setFilter(text)}
        // placeholder={placeholder}
        // placeholderTextColor={textColor}
        value={filter}
      />
    </View>
  )
}

export default SearchPanel
