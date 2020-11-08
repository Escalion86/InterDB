import React from 'react'
import { TouchableHighlight } from 'react-native'

import SwipeableCard from './SwipeableCard'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../theme'

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'

const SwipeContainer = ({
  swipeable = true,
  children = null,
  onLeftOpen = () => {},
  onRightOpen = () => {},
}) => {
  if (swipeable) {
    return (
      <SwipeableCard onLeftOpen={onLeftOpen} onRightOpen={onRightOpen}>
        {children}
      </SwipeableCard>
    )
  } else {
    return <>{children}</>
  }
}

const PopupMenuCardContainer = ({
  children = null,
  options = [],
  onPress = () => {},
  onCreateCopySelect = () => {},
}) => {
  if (options.length > 0) {
    const { colors } = useTheme()

    return (
      <Menu
        renderer={renderers.Popover}
        rendererProps={{ preferredPlacement: 'top' }}
      >
        <MenuTrigger
          triggerOnLongPress
          onAlternativeAction={onPress}
          customStyles={{
            TriggerTouchableComponent: TouchableHighlight,
            // triggerTouchable: { title: 'Select (Custom Touchables)' },
          }}
        >
          {children}
        </MenuTrigger>
        <MenuOptions
          style={{
            padding: 10,
            borderColor: colors.border,
            borderWidth: 3,
            // borderRadius: 20,
            backgroundColor: colors.card,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {options.map((option, index) => (
            <MenuOption
              key={index}
              onSelect={option.onSelect}
              customStyles={{
                optionText: {
                  color: colors.text,
                  fontSize: fontSize.big,
                },
              }}
              text={option.text}
            />
          ))}
        </MenuOptions>
      </Menu>
    )
  } else {
    return (
      <TouchableHighlight
        // activeOpacity={1}
        delayPressIn={50}
        onPress={onPress}
      >
        {children}
      </TouchableHighlight>
    )
  }
}

const CardContainer = ({
  children,
  swipeable,
  onPress,
  onCreateCopySelect,
  onLeftOpen,
  onRightOpen,
  popupMenuOptions = [],
}) => (
  <SwipeContainer
    swipeable={swipeable}
    onLeftOpen={onLeftOpen}
    onRightOpen={onRightOpen}
  >
    <PopupMenuCardContainer
      options={popupMenuOptions}
      onPress={onPress}
      onCreateCopySelect={onCreateCopySelect}
    >
      {children}
    </PopupMenuCardContainer>
  </SwipeContainer>
)

export default CardContainer
