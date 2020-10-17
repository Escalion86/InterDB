import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { dbDefault } from '../db/dbTemplate'
import { useTheme } from '@react-navigation/native'
import { addService, updateService } from '../store/actions/service'
import {
  TextInputBlock,
  ImagePickerBlock,
  TitleBlock,
} from '../components/createComponents'
import trimingArrayValues from '../helpers/trimingArrayValues'
import { HeaderBackButton } from '@react-navigation/stack'
import ModalBottomMenu from '../components/ModalBottomMenu'
import Button from '../components/Button'

const CreateServiceScreen = ({ navigation, route }) => {
  const service =
    route.params !== undefined && route.params.serviceId !== undefined
      ? useSelector((state) => state.service.services).find(
        (item) => item.id === route.params.serviceId
      )
      : dbDefault('services')

  const dispatch = useDispatch()
  const [newService, setNewService] = useState(service)
  const [modal, setModal] = useState(null)
  const nameFieldFilled = !!newService.name.trim()

  const { colors } = useTheme()

  const setServiceItem = (item) => {
    setNewService({ ...newService, ...item })
  }
  // TODO Сделать проверку на заполнение необходимых полей
  const saveHandler = () => {
    if (nameFieldFilled) {
      service.id
        ? dispatch(updateService(trimingArrayValues(newService)))
        : dispatch(addService(trimingArrayValues(newService)))
      navigation.goBack()
    } else {
      ToastAndroid.show(
        'Необходимо заполнить Название услуги',
        ToastAndroid.LONG
      )
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
    for (const key in newService) {
      if (newService[key] !== service[key]) {
        setModal(modalSaveChanges)
        return
      }
    }
    navigation.goBack()
  }

  useEffect(() => {
    navigation.setOptions({
      title: service.id ? 'Редактирование услуги' : 'Создание услуги',
      headerLeft: <HeaderBackButton onPress={() => checkChanges()} />,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Save Service"
            iconName="ios-save"
            onPress={saveHandler}
          />
        </HeaderButtons>
      ),
    })
  }, [service, newService])

  return (
    <ScrollView style={styles.container}>
      {/* <TitleBlock title="Финансы" /> */}
      <TitleBlock title="Основные" />
      <TextInputBlock
        title="Название"
        value={newService.name}
        onChangeText={(text) => setServiceItem({ name: text })}
        fieldStyle={!nameFieldFilled ? { borderColor: colors.abort } : null}
        multiline={true}
      />
      <TextInputBlock
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
      />
      {modal}
    </ScrollView>
  )
}

export default CreateServiceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
