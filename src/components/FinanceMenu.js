import React from 'react'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  // renderers,
} from 'react-native-popup-menu'
import { Text, View } from 'react-native'
import { MainIcon } from './icons'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../theme'

const FinanceMenu = ({
  iconBackgroundColor = 'green',
  addIncome = () => {},
  addOutcome = () => {},
  incomePlanValue = 0,
  outcomePlanValue = 0,
  incomeFactValue = 0,
  outcomeFactValue = 0,
  style = {},
}) => {
  const { colors } = useTheme()

  return (
    <Menu style={style}>
      <MenuTrigger>
        <MainIcon
          iconName="ios-cash"
          iconBackgroundColor={iconBackgroundColor}
          size="small"
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: 280,
          },
          optionWrapper: {
            padding: 5,
            backgroundColor: colors.background,
          },
        }}
      >
        <View style={{ padding: 5, backgroundColor: colors.background }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 120 }}></View>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              План
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              Факт
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                width: 120,
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              Поступление:
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              {incomePlanValue}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              {incomeFactValue}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                width: 120,
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              Списание:
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              {outcomePlanValue}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              {outcomeFactValue}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                width: 120,
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              Остаток:
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              {incomePlanValue - outcomePlanValue}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: colors.text,
                fontSize: fontSize.medium,
              }}
            >
              {incomeFactValue - outcomeFactValue}
            </Text>
          </View>
        </View>
        <MenuOption key="income" onSelect={addIncome}>
          <MainIcon
            iconName="ios-add"
            size="small"
            iconBackgroundColor="green"
            text="Новое поступление"
            textColor={colors.text}
          />
        </MenuOption>
        <MenuOption key="outcome" onSelect={addOutcome}>
          <MainIcon
            iconName="ios-remove"
            size="small"
            iconBackgroundColor="red"
            text="Новые расходы"
            textColor={colors.text}
          />
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default FinanceMenu
