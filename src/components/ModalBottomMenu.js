import React from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Modal,
} from "react-native"
import { useTheme } from "@react-navigation/native"

const ModalBottomMenu = ({
	children,
	title = "",
	subtitle = "",
	visible = false,
	onOuterClick = () => {},
}) => {
	const { colors } = useTheme()

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			// onRequestClose={() => {
			// 	Alert.alert("Modal has been closed.")
			// }}
		>
			<TouchableOpacity
				style={styles.modal}
				onPressOut={() => {
					onOuterClick()
				}}
			>
				<TouchableWithoutFeedback>
					<View
						style={{
							...styles.panel,
							backgroundColor: colors.card,
							borderColor: colors.border,
						}}
					>
						{title || subtitle ? (
							<View style={{ alignItems: "center", marginBottom: 10 }}>
								{title ? (
									<Text style={{ ...styles.panelTitle, color: colors.text }}>
										{title}
									</Text>
								) : null}
								{subtitle ? (
									<Text style={{ ...styles.panelSubtitle, color: colors.text }}>
										{subtitle}
									</Text>
								) : null}
							</View>
						) : null}
						{children}
					</View>
				</TouchableWithoutFeedback>
			</TouchableOpacity>
		</Modal>
	)
}

export default ModalBottomMenu

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-end",
		height: "100%",
	},
	panel: {
		padding: 5,
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderLeftWidth: 1,
		borderTopWidth: 1,
		borderRightWidth: 1,
		maxHeight: 500,
		// shadowColor: '#000000',
		// shadowOffset: {width: 0, height: 0},
		// shadowRadius: 5,
		// shadowOpacity: 0.4,
	},
	header: {
		shadowColor: "#333333",
		shadowOffset: { width: -1, height: -3 },
		shadowRadius: 2,
		shadowOpacity: 0.4,
		// elevation: 5,
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	panelHeader: {
		alignItems: "center",
	},
	panelHandle: {
		width: 40,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#00000040",
		marginBottom: 10,
	},
	panelTitle: {
		fontSize: 27,
		height: 35,
	},
	panelSubtitle: {
		fontSize: 14,
		color: "gray",
		// marginBottom: 10,
	},
	panelButton: {
		padding: 13,
		borderRadius: 10,
		alignItems: "center",
		marginVertical: 7,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: "bold",
		color: "white",
	},
})
