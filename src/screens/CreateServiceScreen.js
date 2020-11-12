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
import ModalExitSaveChanges from '../components/Modals/ModalExitSaveChanges'
import arrayEqual from '../helpers/arrayEqual'

const CreateServiceScreen = ({ navigation, route }) => {
  const service =
    route.params !== undefined && route.params.serviceId !== undefined
      ? useSelector((state) => state.service.services).find(
        (item) => item.id === route.params.serviceId
      )
      : route.params !== undefined && route.params.service !== undefined
        ? { ...route.params.service, id: null }
        : { ...dbDefault('services'), date: new Date().setSeconds(0, 0) }

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

  const checkChanges = () => {
    if (arrayEqual(newService, service)) {
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

  useEffect(() => {
    navigation.setOptions({
      title: service.id ? 'Редактирование услуги' : 'Создание услуги',
      headerLeft: () => <HeaderBackButton onPress={() => checkChanges()} />,
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
        inputOnNextRow={true}
        textAlign="left"
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
        onChangeText={(text) => setServiceItem({ duration: Math.floor(text) })}
        postfix="мин"
        placeholder="0"
      />
      <TextInputBlock
        title="Время на подготовку"
        value={newService.preparetime}
        keyboardType="numeric"
        onChangeText={(text) =>
          setServiceItem({ preparetime: Math.floor(text) })
        }
        postfix="мин"
        placeholder="0"
      />
      <TextInputBlock
        title="Время на сбор"
        value={newService.collecttime}
        keyboardType="numeric"
        onChangeText={(text) =>
          setServiceItem({ collecttime: Math.floor(text) })
        }
        postfix="мин"
        placeholder="0"
      />
      <TitleBlock title="Финансы по умолчанию" />
      <TextInputBlock
        title="Стоимость"
        value={newService.finance_price}
        onChangeText={(text) => setServiceItem({ finance_price: text.trim() })}
        keyboardType="numeric"
        postfix="&#8381;"
        placeholder="0"
      />
      <TextInputBlock
        title="Затраты на расходники"
        value={newService.finance_consumables}
        onChangeText={(text) =>
          setServiceItem({ finance_consumables: text.trim() })
        }
        keyboardType="numeric"
        prefix="-"
        postfix="&#8381;"
        placeholder="0"
      />
      <TextInputBlock
        title="Затраты на ассистентов"
        value={newService.finance_assistants}
        onChangeText={(text) =>
          setServiceItem({ finance_assistants: text.trim() })
        }
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
