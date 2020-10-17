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
  incomeValue = 0,
  outcomeValue = 0,
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
            width: 250,
          },
          optionWrapper: {
            padding: 5,
            backgroundColor: colors.background,
          },
        }}
      >
        <View style={{ padding: 5, backgroundColor: colors.background }}>
          <Text style={{ color: colors.text, fontSize: fontSize.medium }}>
            Поступление: {incomeValue}
          </Text>
          <Text style={{ color: colors.text, fontSize: fontSize.medium }}>
            Списание: {outcomeValue}
          </Text>
          <Text style={{ color: colors.text, fontSize: fontSize.medium }}>
            Остаток: {incomeValue - outcomeValue}
          </Text>
        </View>
        <MenuOption key="income" onSelect={addIncome}>
          <MainIcon
            iconName="ios-add"
            size="small"
            iconBackgroundColor="green"
            text="Поступление средств"
            textColor={colors.text}
          />
        </MenuOption>
        <MenuOption key="outcome" onSelect={addOutcome}>
          <MainIcon
            iconName="ios-remove"
            size="small"
            iconBackgroundColor="red"
            text="Расходование средств"
            textColor={colors.text}
          />
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

export default FinanceMenu
