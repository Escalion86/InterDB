import React from 'react'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  // renderers,
} from 'react-native-popup-menu'
import { MainIcon } from './icons'
import { useTheme } from '@react-navigation/native'

const FinanceMenu = ({
  iconBackgroundColor = 'green',
  financeIncome = () => {},
  financeOutcome = () => {},
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
        <MenuOption key="income" onSelect={financeIncome}>
          <MainIcon
            iconName="ios-add"
            size="small"
            iconBackgroundColor="green"
            text="Поступление средств"
            textColor={colors.text}
          />
        </MenuOption>
        <MenuOption key="outcome" onSelect={financeOutcome}>
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
