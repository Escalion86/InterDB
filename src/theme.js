import { Dimensions, PixelRatio } from 'react-native'

const screenWidth = Dimensions.get('window').width * PixelRatio.get()

let fontSizeCorrection = 0
let iconSizeCorrection = 0
if (screenWidth < 800) {
  fontSizeCorrection = -2
  iconSizeCorrection = -2
}

export const fontSize = {
  tiny: 12 + fontSizeCorrection,
  small: 14 + fontSizeCorrection,
  medium: 16 + fontSizeCorrection,
  big: 18 + fontSizeCorrection,
  giant: 20 + fontSizeCorrection,
}

export const iconSize = {
  tiny: 20 + iconSizeCorrection,
  small: 24 + iconSizeCorrection,
  medium: 28 + iconSizeCorrection,
  big: 32 + iconSizeCorrection,
  giant: 36 + iconSizeCorrection,
}

export const fonts = {
  light: {
    fontFamily: 'sans-serif-light',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'sans-serif-medium',
    fontWeight: 'normal',
  },
  regular: {
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'sans-serif-thin',
    fontWeight: 'normal',
  },
}

export const darkTheme = {
  animation: {
    scale: 1,
  },
  colors: {
    abort: '#ff3223',
    abortText: '#ffffff',
    accent: '#03dac4', // Переключатель
    accentText: '#ffffff',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    background: 'rgb(1, 1, 1)',
    border: 'rgb(15, 4, 15)',
    card: 'rgb(40, 40, 40)',
    active: 'rgb(55, 55, 55)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    error: '#B00020',
    icon: '#efefef',
    notification: 'rgb(255, 69, 58)',
    onBackground: '#000000',
    onSurface: '#000000',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    primary: 'rgb(229, 229, 231)',
    surface: '#ffffff',
    success: '#55ce55',
    text: 'rgb(229, 229, 231)',
    money: '#ffff99',
  },
  dark: true,
  fonts: fonts,
  roundness: 2,
}

export const lightTheme = {
  animation: {
    scale: 1,
  },
  colors: {
    abort: '#ff3223',
    abortText: '#ffffff',
    accent: '#03dac4',
    accentText: '#ffffff',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    background: '#f6f6f6',
    border: 'rgb(60, 60, 60)',
    card: 'rgb(230, 230, 230)',
    active: 'rgb(170, 170, 170)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    error: '#B00020',
    icon: '#101010',
    notification: '#f50057',
    onBackground: '#000000',
    onSurface: '#000000',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    primary: '#6200ee',
    surface: '#ffffff',
    success: '#55ce55',
    text: '#000000',
    money: '#ffff66',
  },
  dark: false,
  fonts: fonts,
  roundness: 2,
}
