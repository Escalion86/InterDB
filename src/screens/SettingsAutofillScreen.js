import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import { TitleBlock, TextInputBlock } from '../components/createComponents'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { HeaderBackButton } from '@react-navigation/stack'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import Button from '../components/Button'
import { ModalBottomMenu } from '../components/Modals'
import { setSettings } from '../store/actions/app'

const ModalSaveChanges = ({
  navigation,
  setModal,
  newStateApp,
  saveNotificationSettings,
}) => (
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
        if (
          (!newStateApp.calendarEventTurnOn || newStateApp.calendarEventId) &&
          (!newStateApp.calendarBirthdayTurnOn ||
            newStateApp.calendarBirthdayId)
        ) {
          saveNotificationSettings()
          navigation.goBack()
        } else {
          ToastAndroid.show(
            'Настройки не сохранены. Выберите календарь!',
            ToastAndroid.LONG
          )
        }
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

const SettingsAutofillScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const [modal, setModal] = useState(null)
  const { autofillTown, autofillRoad } = useSelector((state) => state.app)
  const stateApp = { autofillTown, autofillRoad }
  const [newStateApp, setNewStateApp] = useState(stateApp)
  const setNewStateItem = (item) => {
    setNewStateApp({ ...newStateApp, ...item })
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            checkChanges()
              ? setModal(
                <ModalSaveChanges
                  navigation={navigation}
                  setModal={setModal}
                  newStateApp={newStateApp}
                  saveNotificationSettings={saveNotificationSettings}
                />
              )
              : navigation.goBack()
          }}
        />
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Save Settings"
            iconName="ios-save"
            onPress={saveNotificationSettings}
          />
        </HeaderButtons>
      ),
    })
  }, [newStateApp, stateApp])

  const saveNotificationSettings = () => {
    if (!checkChanges()) {
      navigation.goBack()
    } else {
      const autofillRoad = !newStateApp.autofillRoad
        ? 0
        : newStateApp.autofillRoad
      dispatch(setSettings({ ...newStateApp, autofillRoad }))
      navigation.goBack()
    }
  }

  const checkChanges = () => {
    for (const key in newStateApp) {
      if (newStateApp[key] !== stateApp[key]) {
        return true
      }
    }
    return false
  }

  return (
    <ScrollView style={styles.container}>
      <TitleBlock title="События" />
      <TextInputBlock
        title="Город"
        value={newStateApp.autofillTown}
        onChangeText={(text) => setNewStateItem({ autofillTown: text })}
      />
      <TextInputBlock
        title="На транспортировку в одну сторону"
        value={newStateApp.autofillRoad}
        onChangeText={(text) => setNewStateItem({ autofillRoad: text })}
        keyboardType="numeric"
        placeholder="0"
        postfix="мин"
        inputFlex={1}
      />
      {modal}
    </ScrollView>
  )
}

export default SettingsAutofillScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
