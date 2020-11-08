import React, { createContext, useState, useEffect } from 'react'
import { storeData, retrieveData } from './Storage'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [dev, setDev] = useState(false)
  const [tutorial, setTutorial] = useState(true)
  // const [
  //   notificationBeforeEventStart,
  //   setNotificationBeforeEventStart,
  // ] = useState(90)
  // const [notificationBirthday, setNotificationBirthday] = useState("9:00")

  const toggleDev = async () => {
    await storeData('dev', !dev ? '1' : '0')
    setDev(!dev)
  }

  const toggleTutorial = async (value = null) => {
    let newValue = !tutorial
    if (value === true || value === false) {
      newValue = value
    }
    await storeData('tutorial', newValue ? '1' : '0')
    setTutorial(newValue)
  }

  // const storeNotificationBeforeEventStart = async (min = 90) => {
  //   await storeData("notificationBeforeEventStart", min)
  //   setNotificationBeforeEventStart(min)
  // }

  // const storeNotificationBirthday = async (time = "9:00") => {
  //   await storeData("notificationBirthday", time)
  //   setNotificationBirthday(min)
  // }

  useEffect(() => {
    retrieveData('dev').then((data) => {
      setDev(data === '1')
    })
    retrieveData('tutorial').then((data) => {
      setTutorial(data === '1' || data === null)
    })
    // retrieveData("notificationBeforeEventStart").then((data) => {
    //   if (data) setNotificationBeforeEventStart(data)
    // })
    // retrieveData("notificationBirthday").then((data) => {
    //   if (data) setNotificationBirthday(data)
    // })
  }, [])

  return (
    <AppContext.Provider
      value={{
        dev,
        toggleDev,
        tutorial,
        toggleTutorial,
        // notificationBeforeEventStart,
        // storeNotificationBeforeEventStart,
        // notificationBirthday,
        // storeNotificationBirthday,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
