import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppContext } from '../AppContext'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addFinance, deleteAllFinances } from '../store/actions/finance'
import { dbGenerator } from '../db/dbTemplate'
import FinanceCard from '../components/FinanceCard'
import { useTheme } from '@react-navigation/native'
import Fab from '../components/Fab'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
// import ModalDeleteService from '../components/ModalDeleteService'
import { fontSize } from '../theme'

const FinancesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { dev } = useContext(AppContext)

  const { colors } = useTheme()

  const finances = useSelector((state) => state.finance.finances)
  const loading = useSelector((state) => state.finance.loading)

  // const [modal, setModal] = useState(null)

  // const modalDelete = (service) => {
  //   setModal(
  //     <ModalDeleteService
  //       service={service}
  //       navigation={navigation}
  //       callbackToCloseModal={() => setModal(null)}
  //     />
  //   )
  // }

  useEffect(() => {
    navigation.setOptions({
      title: `Финансы (${finances.length})`,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          {dev ? (
            <Item
              title="Delete all finances"
              iconName="ios-trash"
              onPress={() => {
                dispatch(deleteAllFinances())
              }}
            />
          ) : null}
          {dev ? (
            <Item
              title="Add random finance"
              iconName="ios-add-circle-outline"
              onPress={() => {
                const tmp = dbGenerator('finance')
                dispatch(addFinance(tmp))
              }}
            />
          ) : null}
        </HeaderButtons>
      ),
    })
  }, [finances, dev])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    )
  }

  if (finances.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: fontSize.giant, color: colors.text }}>
          Финансовых записей нет
        </Text>

        <Fab
          visible={true}
          onPress={() => {
            navigation.navigate('CreateFinance')
          }}
          label="Добавить списание/поступление"
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MainFlatListWithFab
        data={finances}
        fabVisible={true}
        renderItem={({ item }) => (
          <FinanceCard
            navigation={navigation}
            finance={item}
            onDelete={() => {
              // modalDelete(item)
            }}
          />
        )}
        onPressFab={() => {
          navigation.navigate('CreateService')
        }}
      />
      {/* {modal} */}
    </View>
  )
}

export default FinancesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
