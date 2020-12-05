import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
import { fontSize } from '../theme'
import areEqual from '../helpers/areEqual'

const FinancesPage = ({
  data,
  navigation,
  onDelete,
  theme,
  sorting,
  onScroll,
  onScrollUp,
  onScrollDown,
  month = '',
}) => {
  const { colors } = theme

  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={{ color: colors.text }}>{month}</Text>
      </View>
    )
  }

  const finances = data

  switch (sorting) {
    case 'dateASC':
      finances.sort((a, b) => (a.date > b.date ? 1 : -1))
      break
    case 'dateDESC':
      finances.sort((a, b) => (a.date < b.date ? 1 : -1))
      break
    default:
      finances.sort((a, b) => (a.date > b.date ? 1 : -1))
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {finances.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
            Транзакций нет
          </Text>
        </View>
      ) : (
        <MainFlatListWithFab
          data={finances}
          type="finances"
          onScroll={onScroll}
          navigation={navigation}
          onScrollUp={onScrollUp}
          onScrollDown={onScrollDown}
          onDelete={onDelete}
          fabVisible={false}
        />
      )}
    </View>
  )
}

export default React.memo(FinancesPage, areEqual)

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
