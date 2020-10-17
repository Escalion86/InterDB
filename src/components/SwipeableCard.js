import React, { useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

import { useTheme } from '@react-navigation/native'
import { fontSize } from '../theme'

const SwipeableCard = ({
  children,
  onLeftOpen = () => {},
  onRightOpen = () => {},
  leftText = 'Редактировать',
  rightText = 'Удалить',
  backgroundColorLeft = null,
  backgroundColorRight = null,
}) => {
  const { colors } = useTheme()
  const swipeableRef = useRef(null)
  const closeSwipeable = () => {
    swipeableRef.current.close()
  }

  if (!backgroundColorLeft) backgroundColorLeft = colors.success
  if (!backgroundColorRight) backgroundColorRight = colors.abort

  const LeftActions = (progress, dragX, leftText) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })

    return (
      <View
        style={[
          styles.leftAction,
          { borderColor: colors.border, backgroundColor: backgroundColorLeft },
        ]}
      >
        <Animated.Text
          style={[
            styles.actionText,
            { transform: [{ scale }], fontSize: fontSize.medium },
          ]}
        >
          {leftText}
        </Animated.Text>
      </View>
    )
  }

  const RightActions = (progress, dragX, rightText) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    return (
      <View
        style={[
          styles.rightAction,
          { borderColor: colors.border, backgroundColor: backgroundColorRight },
        ]}
      >
        <Animated.Text
          style={[
            styles.actionText,
            { transform: [{ scale }], fontSize: fontSize.medium },
          ]}
        >
          {rightText}
        </Animated.Text>
      </View>
    )
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={(progress, dragX) =>
        LeftActions(progress, dragX, leftText)
      }
      renderRightActions={(progress, dragX) =>
        RightActions(progress, dragX, rightText)
      }
      onSwipeableLeftOpen={() => {
        closeSwipeable()
        onLeftOpen()
        // setTimeout(() => {

        // }, 500)
      }}
      onSwipeableRightOpen={() => {
        closeSwipeable()
        onRightOpen()
      }}
    >
      {children}
    </Swipeable>
  )
}

export default SwipeableCard

const styles = StyleSheet.create({
  leftAction: {
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 2,
    alignItems: 'flex-start',
  },
  rightAction: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 2,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 20,
  },
})
