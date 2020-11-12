import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import ContactsMenu from '../ContactsMenu'
import { formatBirthday } from '../../helpers/date'
import { fontSize } from '../../theme'
import CardContainer from '../CardContainer'

const ClientCard = ({
  navigation,
  client,
  onPress = null,
  listMode = false,
  onDelete = null,
  swipeable = true,
  havePopupMenu = false,
}) => {
  const theme = useTheme()
  const { colors, dark } = theme
  const styles = stylesFactory(theme)

  if (!client) {
    return (
      <View style={styles.card}>
        <View style={styles.middle}>
          <View style={styles.cardheader}>
            <Text style={styles.cardtitle}>Ошибка! Клиент не найден</Text>
          </View>
        </View>
      </View>
    )
  } else {
    if (!onPress) {
      onPress = () => {
        navigation.navigate('Client', { clientId: client.id })
      }
    }
    const birthday = formatBirthday(
      client.birthday_year,
      client.birthday_month,
      client.birthday_day
    )

    const noImageUrl =
      client.gender === 0
        ? dark
          ? require('../../../assets/avatar/famale_dark.jpg')
          : require('../../../assets/avatar/famale.jpg')
        : dark
          ? require('../../../assets/avatar/male_dark.jpg')
          : require('../../../assets/avatar/male.jpg')

    if (client.loading || client.deleting) {
      return (
        <View
          style={{
            ...styles.center,
            ...styles.card,
          }}
        >
          {client.loading ? (
            <ActivityIndicator size="large" color={colors.accent} />
          ) : (
            <Ionicons
              name={'ios-trash'}
              size={32}
              color={colors.notification}
            />
          )}
        </View>
      )
    }

    return (
      <CardContainer
        swipeable={swipeable}
        onPress={onPress}
        popupMenuOptions={
          havePopupMenu
            ? [
              {
                text: 'Создать клиента на основе этого',
                onSelect: () =>
                  navigation.navigate('CreateClient', { client: client }),
              },
            ]
            : []
        }
        onLeftOpen={() =>
          navigation.navigate('CreateClient', {
            clientId: client.id,
          })
        }
        onRightOpen={onDelete}
      >
        <View style={styles.card}>
          <View style={styles.left}>
            <Image
              style={{
                // flex: 1,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: colors.border,
                width: 80,
                height: 80,
              }}
              source={!client.avatar ? noImageUrl : { uri: client.avatar }}
              // resizeMethod="scale"
              resizeMode="cover"
            />
          </View>
          <View style={styles.middle}>
            <View style={styles.cardheader}>
              <Text style={styles.cardtitle}>
                {`${client.surname} ${client.name} ${client.thirdname}`.trim()}
              </Text>
            </View>
            {birthday ? (
              <View style={styles.carddesc}>
                <Text style={{ ...styles.carddesctext, textAlign: 'center' }}>
                  {birthday}
                </Text>
              </View>
            ) : null}
          </View>
          {listMode ? null : (
            <View style={styles.right}>
              <ContactsMenu client={client} />
            </View>
          )}
        </View>
      </CardContainer>
    )
  }
}

export default ClientCard

const stylesFactory = ({ colors }) =>
  StyleSheet.create({
    card: {
      width: '100%',
      marginVertical: 2,
      // backgroundColor: THEME.SECONDARY_COLOR,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 10,
      flexDirection: 'row',
      backgroundColor: colors.card,
      minHeight: 80,
    },
    left: {
      padding: 5,
      // borderRightColor: "black",
      borderRightWidth: 1,
      justifyContent: 'space-around',
      borderRightColor: colors.border,
    },
    carddate: {
      height: 50,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    middle: {
      // padding: 10,
      flex: 1,
    },
    right: {
      borderLeftWidth: 1,
      borderLeftColor: colors.border,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardheader: {
      flex: 1,
      padding: 5,
      minHeight: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardtitle: {
      fontFamily: 'open-bold',
      fontSize: fontSize.medium,
      textAlign: 'center',
      color: colors.text,
    },
    carddesctext: {
      flex: 1,
      fontFamily: 'open-regular',
      fontSize: fontSize.small,
      color: colors.text,
    },
    carddesc: {
      flexDirection: 'row',
      minHeight: 40,
      // borderColor: "red",
      // borderWidth: 1,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    datetime: {
      fontSize: fontSize.small,
      textAlign: 'center',
      color: colors.text,
    },
    finance: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      width: '100%',
      // borderColor: "#fff",
      // borderWidth: 2,
      // height: "100%",
      // alignItems: "center",
      // justifyContent: "center",
    },
    price: {
      // flex: 1,
      fontSize: fontSize.small,
      width: '100%',
      height: 46,
      textAlignVertical: 'center',
      textAlign: 'center',
      color: '#ffff99',
      borderTopWidth: 1,
      // borderLeftWidth: 1,
      // borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderTopColor: colors.border,
      borderLeftColor: colors.border,
      backgroundColor: colors.active,
    },
    menuOptions: {
      padding: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
