import { AsyncStorage } from 'react-native'

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (error) {
    // Error saving data
    return false
  }
}

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      // We have data!!
      // console.log("value", value)
      return value
    } else {
      // console.log("NO DATA")
      return null
    }
  } catch (error) {
    // Error retrieving data
    return null
  }
}
