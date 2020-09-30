import React, { createContext, useState, useEffect } from "react"
import { AsyncStorage } from "react-native"

const _storeData = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value)
	} catch (error) {
		// Error saving data
	}
}

const _retrieveData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			// We have data!!
			// console.log("value", value)
			return value
		} else {
			// console.log("NO DATA")
			return false
		}
	} catch (error) {
		// Error retrieving data
		return false
	}
}

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
	const [dev, setDev] = useState(false)

	const toggleDev = async () => {
		await _storeData("dev", !dev ? "1" : "0")
		setDev(!dev)
	}

	useEffect(() => {
		_retrieveData("dev").then((data) => {
			setDev(data === "1")
		})
	}, [])

	return (
		<AppContext.Provider value={{ dev, toggleDev }}>
			{children}
		</AppContext.Provider>
	)
}
