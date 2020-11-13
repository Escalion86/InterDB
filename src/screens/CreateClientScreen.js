import React, { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { addClient, updateClient } from '../store/actions/client'
import { useTheme } from '@react-navigation/native'
import { dbDefault } from '../db/dbTemplate'
import {
  TextInputBlock,
  TitleBlock,
  ImagePickerBlock,
  // GenderSwitch,
  BirthdayPicker,
  RadioBlock,
} from '../components/createComponents'
import trimingArrayValues from '../helpers/trimingArrayValues'
import { HeaderBackButton } from '@react-navigation/stack'
import { ModalExitSaveChanges } from '../components/Modals'
import arrayEqual from '../helpers/arrayEqual'

const CreateClientScreen = ({ navigation, route }) => {
  const client =
    route.params !== undefined && route.params.clientId !== undefined
      ? useSelector((state) => state.client.clients).find(
        (item) => item.id === route.params.clientId
      )
      : route.params !== undefined && route.params.client !== undefined
        ? { ...route.params.client, id: null }
        : { ...dbDefault('clients'), birthday: null }

  const dispatch = useDispatch()
  const [newClient, setNewClient] = useState(client)
  const [modal, setModal] = useState(null)

  const nameFieldFilled =
    newClient.name.trim() ||
    newClient.surname.trim() ||
    newClient.thirdname.trim()
  const contactsFieldFilled =
    newClient.phone.trim() ||
    newClient.email.trim() ||
    newClient.whatsapp.trim() ||
    newClient.viber.trim() ||
    newClient.telegram.trim() ||
    newClient.instagram.trim() ||
    newClient.vk.trim() ||
    newClient.facebook.trim()

  const { dark, colors } = useTheme()

  const noImageUrl =
    newClient.gender === 0
      ? dark
        ? require('../../assets/avatar/famale_dark.jpg')
        : require('../../assets/avatar/famale.jpg')
      : dark
        ? require('../../assets/avatar/male_dark.jpg')
        : require('../../assets/avatar/male.jpg')

  const setClientItem = (item) => {
    setNewClient({ ...newClient, ...item })
  }
  // TODO Сделать проверку на заполнение необходимых полей
  const saveHandler = () => {
    if (nameFieldFilled && contactsFieldFilled) {
      client.id
        ? dispatch(updateClient(trimingArrayValues(newClient)))
        : dispatch(addClient(trimingArrayValues(newClient)))
      navigation.goBack()
    } else {
      ToastAndroid.show(
        'Необходимо заполнить хотябы одно поле Имени и хотябы одно поле Контакта',
        ToastAndroid.LONG
      )
    }
  }

  const checkChanges = () => {
    if (arrayEqual(newClient, client)) {
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
      title: client.id ? 'Редактирование клиента' : 'Создание клиента',
      headerLeft: () => <HeaderBackButton onPress={() => checkChanges()} />,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Save Client" iconName="ios-save" onPress={saveHandler} />
        </HeaderButtons>
      ),
    })
  }, [client, newClient])

  return (
    <ScrollView style={styles.container}>
      <TitleBlock title="Основные" />
      <TextInputBlock
        title="Фамилия"
        value={newClient.surname}
        onChangeText={(text) =>
          setClientItem({ surname: text.replace(/ +/g, '') })
        }
        fieldStyle={!nameFieldFilled ? { borderColor: colors.abort } : null}
        // keyboardType="numeric"
        // postfix="&#8381;"
        // placeholder="Иванов Иван Иванович"
      />
      <TextInputBlock
        title="Имя"
        value={newClient.name}
        onChangeText={(text) =>
          setClientItem({ name: text.replace(/ +/g, '') })
        }
        fieldStyle={!nameFieldFilled ? { borderColor: colors.abort } : null}
        // keyboardType="numeric"
        // postfix="&#8381;"
        // placeholder="Иванов Иван Иванович"
      />
      <TextInputBlock
        title="Отчество"
        value={newClient.thirdname}
        onChangeText={(text) =>
          setClientItem({ thirdname: text.replace(/ +/g, '') })
        }
        fieldStyle={!nameFieldFilled ? { borderColor: colors.abort } : null}
        // keyboardType="numeric"
        // postfix="&#8381;"
        // placeholder="Иванов Иван Иванович"
      />
      <ImagePickerBlock
        title={'Аватар'}
        image={newClient.avatar}
        noImageUrl={noImageUrl}
        onPick={(img) => setClientItem({ avatar: img })}
      />

      {/* <GenderSwitch
        title="Пол"
        value={newClient.gender === 1}
        onSwitch={(text) => {
          setClientItem({ gender: text ? 1 : 0 })
        }}
      /> */}
      <RadioBlock
        title="Пол"
        radios={[
          { label: 'Мужской', value: '1' },
          { label: 'Женский', value: '0' },
        ]}
        value={newClient.gender === 0 ? '0' : '1'}
        onValueChange={(value) =>
          setClientItem({ gender: value === '0' ? 0 : 1 })
        }
        // buttonsFlex={5}
      />
      <BirthdayPicker
        day={newClient.birthday_day}
        month={newClient.birthday_month}
        year={newClient.birthday_year}
        onDayChange={(value) => setClientItem({ birthday_day: value })}
        onMonthChange={(value) => setClientItem({ birthday_month: value })}
        onYearChange={(value) => setClientItem({ birthday_year: value })}
      />
      <TitleBlock title="Связь" />
      <TextInputBlock
        title="Телефон"
        value={newClient.phone}
        onChangeText={(text) =>
          setClientItem({ phone: text.replace(/ +/g, '') })
        }
        fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
        prefix="+7"
        phoneMask={true}
      />

      <TextInputBlock
        title="WhatsApp"
        value={newClient.whatsapp}
        onChangeText={(text) =>
          setClientItem({ whatsapp: text.replace(/ +/g, '') })
        }
        fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
        prefix="+7"
        phoneMask={true}
      />
      <TextInputBlock
        title="Viber"
        value={newClient.viber}
        onChangeText={(text) =>
          setClientItem({ viber: text.replace(/ +/g, '') })
        }
        fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
        prefix="+7"
        phoneMask={true}
      />
      <TextInputBlock
        title="Telegram"
        value={newClient.telegram}
        prefix="@"
        onChangeText={(text) =>
          setClientItem({ telegram: text.replace(/ +/g, '') })
        }
        fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
      />
      <TextInputBlock
        title="Email"
        value={newClient.email}
        onChangeText={(text) =>
          setClientItem({ email: text.replace(/ +/g, '') })
        }
        fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
      />
      <TextInputBlock
        title="Instagram"
        value={newClient.instagram}
        onChangeText={(text) =>
          setClientItem({ instagram: text.replace(/ +/g, '') })
        }
        fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
        prefix="@"
      />
      <TextInputBlock
        title="ВКонтакте"
        value={newClient.vk}
        onChangeText={(text) => setClientItem({ vk: text.replace(/ +/g, '') })}
        fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
        prefix="@"
      />
      <TextInputBlock
        title="FaceBook"
        value={newClient.facebook}
        onChangeText={(text) =>
          setClientItem({ facebook: text.replace(/ +/g, '') })
        }
        fieldStyle={!contactsFieldFilled ? { borderColor: colors.abort } : null}
        prefix="@"
      />
      {modal}
    </ScrollView>
  )
}

export default CreateClientScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
