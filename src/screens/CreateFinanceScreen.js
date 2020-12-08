import React, { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { dbDefault } from '../db/dbTemplate'
import { addFinance, updateFinance } from '../store/actions/finance'
import {
  TextInputBlock,
  TitleBlock,
  RadioBlock,
  DateTimePickerBlock,
} from '../components/createComponents'
import trimingArrayValues from '../helpers/trimingArrayValues'
import { HeaderBackButton } from '@react-navigation/stack'
import { ModalExitSaveChanges } from '../components/Modals'
import arrayEqual from '../helpers/arrayEqual'

const CreateFinanceScreen = ({ navigation, route }) => {
  const finance =
    route.params !== undefined && route.params.financeId !== undefined
      ? useSelector((state) => state.finance.finances).find(
        (item) => item.id === route.params.financeId
      )
      : dbDefault('finances')

  const dispatch = useDispatch()
  const [newFinance, setNewFinance] = useState(finance)
  const [modal, setModal] = useState(null)

  const setFinanceItem = (item) => {
    setNewFinance({ ...newFinance, ...item })
  }
  // TODO Сделать проверку на заполнение необходимых полей
  const saveHandler = () => {
    if (newFinance.sum >= 0) {
      finance.id
        ? dispatch(updateFinance(trimingArrayValues(newFinance)))
        : dispatch(addFinance(trimingArrayValues(newFinance)))
      navigation.goBack()
    } else {
      ToastAndroid.show('Сумма должна быть больше нуля', ToastAndroid.LONG)
    }
  }

  const checkChanges = () => {
    if (arrayEqual(newFinance, finance)) {
      navigation.goBack()
    } else {
      setModal(
        <ModalExitSaveChanges
          onSave={() => {
            setModal(null)
            saveHandler()
          }}
          onNoSave={() => {
            setModal(null)
            navigation.goBack()
          }}
          onDecline={() => setModal(null)}
        />
      )
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: finance.id ? 'Редактирование транзакции' : 'Создание транзакции',
      headerLeft: () => <HeaderBackButton onPress={() => checkChanges()} />,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Save ServiFinance"
            iconName="ios-save"
            onPress={saveHandler}
          />
        </HeaderButtons>
      ),
    })
  }, [finance, newFinance])

  return (
    <ScrollView style={styles.container}>
      {/* <TitleBlock title="Финансы" /> */}
      <TitleBlock title="Основные" />
      <RadioBlock
        title="Тип"
        radios={[
          { label: 'Поступление', value: 'income' },
          { label: 'Списание', value: 'outcome' },
        ]}
        value={newFinance.type}
        onValueChange={(value) => setFinanceItem({ type: value })}
        // buttonsFlex={5}
      />
      <DateTimePickerBlock
        title="Дата и время"
        dateValue={newFinance.date}
        onChange={(value) => setFinanceItem({ date: value })}
      />
      <TextInputBlock
        title="Сумма"
        value={newFinance.sum}
        onChangeText={(text) =>
          setFinanceItem({ sum: text.replace(/[^\d]/g, '') })
        }
        keyboardType="numeric"
        postfix="&#8381;"
        placeholder="0"
      />
      <TextInputBlock
        title="Комментарий"
        value={newFinance.comment}
        onChangeText={(text) => setFinanceItem({ comment: text })}
        multiline={true}
        inputOnNextRow={true}
        textAlign="left"
      />
      {modal}
    </ScrollView>
  )
}

export default CreateFinanceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
