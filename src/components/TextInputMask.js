import React, { useState } from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"
import { SafeAreaFrameContext } from "react-native-safe-area-context"

const TextInputMask = ({ value = "", mask = "(999)999-9999", style = {} }) => {
	const [text, setText] = useState(value)
	const [selection, setSelection] = useState({ start: 0, end: 0 })
	const [keyPress, setKeyPress] = useState(null)

	function inArray(needle, haystack) {
		var length = haystack.length
		for (var i = 0; i < length; i++) {
			if (haystack[i] == needle) return true
		}
		return false
	}

	const checkSelection = (event, forvard = true) => {
		// console.log("event", event)
		if (event.nativeEvent.selection) {
			const char = text[event.nativeEvent.selection.start]
			if (
				inArray(char, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "_"])
			) {
				// console.log("можно менять")

				setSelection({
					start: event.nativeEvent.selection.start,
					end: event.nativeEvent.selection.start + 1,
				})
			} else {
				// console.log("менять нельзя")
				forvard
					? setSelection({
							start: event.nativeEvent.selection.start + 1,
							end: event.nativeEvent.selection.start + 2,
					  })
					: setSelection({
							start: event.nativeEvent.selection.start - 1,
							end: event.nativeEvent.selection.start,
					  })
			}
		}
	}

	const checkMask = (event) => {
		let arrText = event.nativeEvent.text.split("")

		arrText = arrText.filter((char) => {
			return inArray(char, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
		})
		const arrMask = mask.split("")
		let maskedText = ""

		let i = 0
		arrMask.forEach((char, index) => {
			if (char === "9") {
				if (
					!inArray(arrText[i], [
						"0",
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
					])
				) {
					maskedText += "_"
				} else {
					maskedText += arrText[i]
				}
				i++
			} else {
				maskedText += char
			}
		})
		// console.log("maskedText", maskedText)
		// if (event.nativeEvent.selection.start) event.nativeEvent.selection.start++

		setText(maskedText)
	}

	return (
		<TextInput
			style={style}
			selection={selection}
			onChange={(event) => checkMask(event)}
			multiline={true}
			onSelectionChange={(event) => {
				// setSelection({
				// 	start: event.nativeEvent.selection.start,
				// 	end: event.nativeEvent.selection.start + 1,
				// })
				checkSelection(event, keyPress !== "Backspace")
			}}
			// onKeyPress={(event) => {
			// 	setKeyPress(event.nativeEvent.key)
			// }}
			value={text}
		/>
	)
}

export default TextInputMask

const styles = StyleSheet.create({})
