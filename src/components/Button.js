import React from 'react'
import { /* Text, TouchableOpacity,  */ StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { fontSize } from '../theme'
import { Button as PaperButton } from 'react-native-paper'

const Button = ({
  title = '',
  btnDecline = false,
  onPress = () => {},
  onLongPress = () => {},
  style = {},
  disabled = false,
  textFontSize = 'small',
  textColor = null,
  size = 'medium',
  outline = false,
  theme = null,
  compact = false,
  mode = 'contained',
}) => {
  if (!theme) theme = useTheme()
  const { colors } = theme

  return (
    <PaperButton
      mode={mode} // 'outlined' / 'text'
      color={btnDecline ? colors.abort : colors.accent}
      style={{
        ...styles.button,
        // backgroundColor: outline
        //   ? 'transparent'
        //   : btnDecline
        //     ? colors.abort
        //     : colors.accent,
        // borderColor: !outline
        //   ? btnDecline
        //     ? colors.abort
        //     : colors.accent
        //   : 'transparent',
        // minHeight: size === 'small' ? 32 : size === 'big' ? 56 : 44,
        // paddingHorizontal: size === 'small' ? 10 : size === 'big' ? 14 : 12,
        ...style,
      }}
      contentStyle={{
        // borderColor: 'red',
        // borderWidth: 1,
        width: '100%',
        // minWidth: 20,
      }}
      onPress={!disabled ? onPress : null}
      onLongPress={!disabled ? onLongPress : null}
      labelStyle={{
        ...styles.buttonTitle,
        fontSize: fontSize[textFontSize],
        color:
          textColor ||
          (mode !== 'contained'
            ? btnDecline
              ? colors.abort
              : colors.accent
            : disabled
              ? colors.disabled
              : btnDecline
                ? colors.abortText
                : colors.accentText),
      }}
      compact={compact}
    >
      {title}
    </PaperButton>
  )
  // return (
  //   <TouchableOpacity
  //     style={{
  //       ...styles.button,
  //       backgroundColor: outline
  //         ? 'transparent'
  //         : btnDecline
  //           ? colors.abort
  //           : colors.accent,
  //       borderColor: outline
  //         ? btnDecline
  //           ? colors.abort
  //           : colors.accent
  //         : 'transparent',
  //       minHeight: size === 'small' ? 32 : size === 'big' ? 56 : 44,
  //       paddingHorizontal: size === 'small' ? 10 : size === 'big' ? 14 : 12,
  //       ...style,
  //     }}
  //     onPress={!disabled ? onPress : null}
  //     onLongPress={!disabled ? onLongPress : null}
  //     delayPressIn={10}
  //   >
  //     <Text
  //       style={{
  //         ...styles.buttonTitle,
  //         fontSize: fontSize[textFontSize],
  //         color:
  //           textColor ||
  //           (outline
  //             ? btnDecline
  //               ? colors.abort
  //               : colors.accent
  //             : disabled
  //               ? colors.disabled
  //               : btnDecline
  //                 ? colors.abortText
  //                 : colors.accentText),
  //       }}
  //     >
  //       {title}
  //     </Text>
  //   </TouchableOpacity>
  // )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 7,
    // // width: '100%',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,

    // elevation: 4,
  },
  buttonTitle: {
    // fontWeight: 'bold',
    // width: '100%',
    flex: 1,
    color: 'white',
    textAlign: 'center',
  },
})

export default Button
