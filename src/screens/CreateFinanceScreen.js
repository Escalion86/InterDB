import React, { useState, useEffect } from 'react'
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
import ModalBottomMenu from '../components/Modals/ModalBottomMenu'
import Button from '../components/Button'

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

  const modalSaveChanges = (
    <ModalBottomMenu
      title="Отменить изменения"
      subtitle="Уверены что хотите выйти без сохранения?"
      onAccept={() => navigation.goBack()}
      visible={true}
      onOuterClick={() => setModal(null)}
    >
      <Button
        title="Выйти без сохранения"
        btnDecline={false}
        onPress={() => {
          setModal(null)
          navigation.goBack()
        }}
      />
      <Button
        title="Сохранить и выйти"
        btnDecline={false}
        onPress={() => {
          setModal(null)
          saveHandler()
          navigation.goBack()
        }}
      />
      <Button
        title="Не уходить"
        btnDecline={true}
        onPress={() => {
          setModal(null)
        }}
      />
    </ModalBottomMenu>
  )

  const checkChanges = () => {
    for (const key in newFinance) {
      if (newFinance[key] !== finance[key]) {
        setModal(modalSaveChanges)
        return
      }
    }
    navigation.goBack()
  }

  useEffect(() => {
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
        buttonsFlex={5}
      />
      <DateTimePickerBlock
        title="Дата и время"
        dateValue={newFinance.date}
        onChange={(value) => setFinanceItem({ date: value })}
      />
      <TextInputBlock
        title="Сумма"
        value={newFinance.sum}
        onChangeText={(text) => setFinanceItem({ sum: text })}
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
      {/* <TextInputBlock
        title="Описание"
        value={newService.description}
        onChangeText={(text) => setServiceItem({ description: text })}
        multiline={true}
      />
      <ImagePickerBlock
        title={'Картинка'}
        image={newService.image}
        onPick={(img) => setServiceItem({ image: img })}
      />
      <TitleBlock title="Затраты времени" />
      <TextInputBlock
        title="Продолжительность"
        value={newService.duration}
        keyboardType="numeric"
        onChangeText={(text) => setServiceItem({ duration: text })}
        postfix="мин"
        placeholder="0"
      />
      <TextInputBlock
        title="Время на подготовку"
        value={newService.preparetime}
        keyboardType="numeric"
        onChangeText={(text) => setServiceItem({ preparetime: text })}
        postfix="мин"
        placeholder="0"
      />
      <TextInputBlock
        title="Время на сбор"
        value={newService.collecttime}
        keyboardType="numeric"
        onChangeText={(text) => setServiceItem({ collecttime: text })}
        postfix="мин"
        placeholder="0"
      />
      <TitleBlock title="Финансы по умолчанию" />
      <TextInputBlock
        title="Стоимость"
        value={newService.finance_price}
        onChangeText={(text) => setServiceItem({ price: text })}
        keyboardType="numeric"
        postfix="&#8381;"
        placeholder="0"
      />
      <TextInputBlock
        title="Затраты на расходники"
        value={newService.finance_consumables}
        onChangeText={(text) => setServiceItem({ price: text })}
        keyboardType="numeric"
        prefix="-"
        postfix="&#8381;"
        placeholder="0"
      />
      <TextInputBlock
        title="Затраты на ассистентов"
        value={newService.finance_assistants}
        onChangeText={(text) => setServiceItem({ price: text })}
        keyboardType="numeric"
        prefix="-"
        postfix="&#8381;"
        placeholder="0"
      /> */}
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
