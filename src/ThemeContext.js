import React, { createContext, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { darkTheme, lightTheme } from "./theme"
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

export const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(lightTheme)
	const [accent, setAccent] = useState(lightTheme.colors.accent)
	const { colors } = theme
	const resultTheme = { ...theme, colors: { ...colors, accent } }

	const setDark = async (bool) => {
		await _storeData("darkTheme", bool ? "1" : "0")
		setTheme(bool ? darkTheme : lightTheme)
	}

	const setAccentColor = async (color) => {
		await _storeData("accentColors", color)
		setAccent(color)
	}

	_retrieveData("darkTheme").then((data) => {
		setDark(data === "1")
	})

	_retrieveData("accentColors").then((data) => {
		if (data) setAccent(data)
	})

	return (
		<ThemeContext.Provider
			value={{ theme: resultTheme, setDark, setAccent: setAccentColor }}
		>
			{children}
		</ThemeContext.Provider>
	)
}
