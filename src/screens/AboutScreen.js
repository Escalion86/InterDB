import React, { useState /* , useContext */ } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Button from '../components/Button'
// import { AppContext } from '../AppContext'
import { ContactIcon } from '../components/infoComponents'
import { fontSize } from '../theme'
import { ModalChangeLog } from '../components/Modals'
import * as appJson from '../../app.json'
import { setSettings } from '../store/actions/app'

const AboutScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  // const { toggleDev, dev } = useContext(AppContext)

  const [startToOpenDev, setStartToOpenDev] = useState(null)
  const [modal, setModal] = useState(null)
  const dev = useSelector((state) => state.app.dev)

  const dispatch = useDispatch()

  const endToOpenDev = () => {
    if (Math.floor((new Date() - startToOpenDev) / 1000) >= 5) {
      ToastAndroid.show(
        `Режим разработчика ${dev ? 'деактивирован' : 'активирован'}`,
        ToastAndroid.SHORT
      )
      dispatch(setSettings({ dev: !dev }))
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text
          style={{
            ...styles.paragraph,
            fontSize: fontSize.big,
            color: colors.text,
          }}
        >
          {'\t\t\t\t'}Цель приложения - упрощение взаимодействия с клиентами при
          продаже своих услуг.
        </Text>
        <Text
          style={{
            ...styles.paragraph,
            fontSize: fontSize.big,
            color: colors.text,
          }}
        >
          {'\t\t\t\t'}Если у Вас появились предложения или замечания по
          приложению, то сообщите об этом разработчику напрямую:
        </Text>
        <View style={styles.contacts}>
          {/* <ContactIcon
            iconName="vk"
            backgroundColor="#597da3"
            url="https://vk.com/escalion"
          />
          <ContactIcon
            iconName="whatsapp"
            backgroundColor="#43d854"
            url="whatsapp://send?phone=79138370020"
          /> */}
          <ContactIcon
            iconName="telegram"
            backgroundColor="#0088cc"
            url="http://t.me/escalion"
            data="@Escalion"
          />
        </View>
        <View style={{ ...styles.developer, borderColor: colors.card }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...styles.paragraph,
                fontSize: fontSize.big,
                color: colors.text,
              }}
            >
              Разработчик:
            </Text>
            <Text
              style={{
                ...styles.paragraph,
                fontSize: fontSize.big,
                fontStyle: 'italic',
                color: colors.text,
              }}
            >
              Алексей Белинский
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://escalion.ru')}
            >
              <Text
                style={{
                  ...styles.paragraph,
                  fontStyle: 'italic',
                  fontSize: fontSize.big,
                  color: colors.accent,
                }}
              >
                https://Escalion.ru
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => setStartToOpenDev(new Date())}
            onPressOut={() => endToOpenDev()}
          >
            <Image
              style={{
                width: 96,
                height: 96,
              }}
              source={require('../../assets/logo-dev.png')}
              // resizeMethod="scale"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <Button
          title="Поблагодарить"
          style={{ marginBottom: 20 }}
          onPress={() =>
            Linking.openURL(
              'https://money.alfabank.ru/p2p/web/transfer/abelinskii3048'
            )
          }
        />
      </ScrollView>

      <TouchableOpacity
        style={{ ...styles.bottom, borderColor: colors.card }}
        onPressIn={() =>
          setModal(
            <ModalChangeLog
              visible={true}
              onOuterClick={() => {
                setModal(null)
              }}
            />
          )
        }
      >
        <Text style={{ fontSize: fontSize.small, color: colors.text }}>
          Версия: {appJson.expo.version}
        </Text>
      </TouchableOpacity>
      {modal}
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  developer: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  contacts: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  paragraph: {
    marginBottom: 6,
  },
  content: {
    flex: 1,
  },
  bottom: {
    height: 36,
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 1,
  },
})
