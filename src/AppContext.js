import React, { createContext, useState, useEffect } from 'react'
import { storeData, retrieveData } from './Storage'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [dev, setDev] = useState(false)
  // const [
  //   notificationBeforeEventStart,
  //   setNotificationBeforeEventStart,
  // ] = useState(90)
  // const [notificationBirthday, setNotificationBirthday] = useState("9:00")

  const toggleDev = async () => {
    await storeData('dev', !dev ? '1' : '0')
    setDev(!dev)
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
