import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppContext } from '../AppContext'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addFinance, deleteAllFinances } from '../store/actions/finance'
import { dbGenerator } from '../db/dbTemplate'
import FinanceCard from '../components/Cards/FinanceCard'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import Fab from '../components/Fab'
import MainFlatListWithFab from '../components/MainFlatListWithFab'
// import ModalDeleteService from '../components/ModalDeleteService'
import { fontSize } from '../theme'

const FinancesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { dev } = useContext(AppContext)

  const { colors } = useTheme()

  const { Popover } = renderers

  const finances = useSelector((state) => state.finance.finances)
  const loading = useSelector((state) => state.finance.loading)

  const [sorting, setSorting] = useState('dateDESC')

  let sortMenu = null
  const srtMenu = (r) => {
    sortMenu = r
  }

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
          <Menu
            // name="sorting"
            // style={styles.finance}
            ref={srtMenu}
            renderer={Popover}
            rendererProps={{ preferredPlacement: 'bottom' }}
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
                padding: 5,
                borderColor: colors.border,
                borderWidth: 1,
                // borderRadius: 20,
                backgroundColor: colors.card,
              }}
            >
              <View style={{ width: 180 }}>
                <Text
                  style={{
                    fontSize: fontSize.medium,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.text,
                    color: colors.text,
                    height: 30,
                    textAlign: 'center',
                  }}
                >
                  По дате
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 30,
                  }}
                  onPress={() => {
                    setSorting('dateDESC')
                    sortMenu.close()
                  }}
                >
                  {sorting === 'dateDESC' ? (
                    <Ionicons
                      style={{ flex: 1 }}
                      name="md-checkmark"
                      size={24}
                      color={colors.text}
                    />
                  ) : null}
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      color: colors.text,
                      width: 150,
                    }}
                  >
                    По возрастанию
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 30,
                  }}
                  onPress={() => {
                    setSorting('dateASC')
                    sortMenu.close()
                  }}
                >
                  {sorting === 'dateASC' ? (
                    <Ionicons
                      style={{ flex: 1 }}
                      name="md-checkmark"
                      size={24}
                      color={colors.text}
                    />
                  ) : null}
                  <Text
                    style={{
                      fontSize: fontSize.medium,
                      color: colors.text,
                      width: 150,
                    }}
                  >
                    По убыванию
                  </Text>
                </TouchableOpacity>
              </View>
            </MenuOptions>
          </Menu>
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
  }, [finances, dev, sorting])

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

  switch (sorting) {
    case 'dateDESC':
      finances.sort((a, b) => (a.date > b.date ? 1 : -1))
      break
    case 'dateASC':
      finances.sort((a, b) => (a.date < b.date ? 1 : -1))
      break
    default:
      finances.sort((a, b) => (a.date > b.date ? 1 : -1))
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
