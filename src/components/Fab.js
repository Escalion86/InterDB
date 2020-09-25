import React from "react"
import { FAB } from "react-native-paper"
import { StyleSheet } from "react-native"

const Fab = ({
	visible = true,
	onPress = () => {},
	style = {},
	label = "",
}) => (
	<FAB
		style={{ ...styles.fab, ...style }}
		icon="plus"
		animated={true}
		// color={colors.accent}
		visible={visible}
		onPress={onPress}
		label={label}
	/>
)

export default Fab

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		margin: 20,
		right: 0,
		bottom: 0,
	},
})
