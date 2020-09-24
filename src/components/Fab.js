import React from "react"
import { FAB } from "react-native-paper"
import { StyleSheet } from "react-native"

const Fab = ({ color = "#fff", visible = true, onPress = () => {} }) => (
	<FAB
		style={{ ...styles.fab, backgroundColor: color }}
		icon="plus"
		animated={true}
		// color={colors.accent}
		visible={visible}
		onPress={onPress}
	/>
)

export default Fab

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
})
