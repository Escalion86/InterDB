import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import SwipeableCard from '../SwipeableCard'
import { fontSize } from '../../theme'

const FinanceCard = ({
  navigation,
  finance,
  onPress = null,
  listMode = false,
  onDelete = null,
  swipeable = true,
}) => {
  const theme = useTheme()
  const { colors } = theme
  const styles = stylesFactory(theme)

  if (!finance) {
    return (
      <TouchableHighlight
        // activeOpacity={1}
        delayPressIn={50}
        style={styles.card}
        onPress={onPress}
      >
        <View style={styles.middle}>
          <View style={styles.cardheader}>
            <Text style={styles.cardtitle}>
              Ошибка! Финансовая запись не найдена
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  } else {
    if (!onPress) {
      onPress = () => {
        navigation.navigate('Finance', { financeId: finance.id })
      }
    }

    if (finance.loading) {
      return (
        <View
          style={{
            ...styles.center,
            ...styles.card,
          }}
        >
          {finance.loading ? (
            <ActivityIndicator size="large" color={colors.text} />
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

    const CardDesc = ({ desc }) => (
      <View style={styles.carddesc}>
        <Text style={styles.carddesctext}>{desc}</Text>
      </View>
    )

    const Container = ({ children }) => {
      if (swipeable) {
        return (
          <SwipeableCard
            onLeftOpen={() => {
              navigation.navigate('CreateFinance', {
                financeId: finance.id,
              })
            }}
            onRightOpen={onDelete}
          >
            {children}
          </SwipeableCard>
        )
      } else {
        return <>{children}</>
      }
    }

    return (
      <Container>
        <TouchableHighlight
          // activeOpacity={1}
          delayPressIn={50}
          onPress={onPress}
        >
          <View style={styles.card}>
            <View style={styles.middle}>
              <View style={styles.cardheader}>
                <Text style={styles.cardtitle}>{finance.event}</Text>
              </View>
              <CardDesc
                desc={finance.type === 'income' ? 'Поступление' : 'Списание'}
              />
            </View>
            <View style={styles.right}>
              <View style={styles.carddate}>
                <Text style={styles.datetime}>{finance.sum} руб</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Container>
    )
  }
}

export default FinanceCard

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
      flex: 1,
      padding: 5,
      // borderRightColor: "black",
      flexDirection: 'row',
      borderRightWidth: 1,
      // justifyContent: "space-around",
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
      flex: 3,
    },
    right: {
      borderLeftWidth: 1,
      borderLeftColor: colors.border,
      width: 70,

      justifyContent: 'space-between',
    },
    cardheader: {
      flex: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 40,
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
      paddingHorizontal: 10,
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
      // flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      width: '100%',
      // borderColor: "#fff",
      // borderWidth: 2,
      // height: "100%",
      // alignItems: "center",
      // justifyContent: "center",
    },
    profit: {
      // flex: 1,
      fontSize: fontSize.small,
      width: '100%',
      height: 44,
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
      borderColor: colors.border,
      borderWidth: 1,
      // borderRadius: 20,
      backgroundColor: colors.card,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })