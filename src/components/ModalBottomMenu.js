import React, { useState } from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Modal,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import { colors } from "react-native-elements"

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

export const ModalMenuButton = ({
	title = "",
	btnDecline = false,
	onPress = () => {},
}) => {
	const { colors } = useTheme()
	return (
		<TouchableOpacity
			style={{
				...styles.panelButton,
				backgroundColor: btnDecline ? colors.abort : colors.accent,
			}}
			onPress={onPress}
		>
			<Text
				style={{
					...styles.panelButtonTitle,
					color: btnDecline ? colors.abortText : colors.accentText,
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

export const ModalBottomMenuYesNo = ({
	title = "",
	subtitle = "",
	onAccept = () => {},
	children = null,
	btnTitleConfirm = "Да",
	btnTitleDecline = "Нет",
	visible = false,
	closer = null,
}) => {
	const withState = !children
	const [modalVisible, setModalVisible] = useState(visible)

	return (
		<View>
			{children ? (
				<TouchableOpacity
					onPress={() => {
						setModalVisible(true)
					}}
				>
					{children}
				</TouchableOpacity>
			) : null}
			<ModalBottomMenu
				title={title}
				subtitle={subtitle}
				visible={withState ? modalVisible : visible}
				onOuterClick={() => {
					withState ? setModalVisible(false) : closer()
				}}
			>
				<ModalMenuButton
					title={btnTitleConfirm}
					btnDecline={false}
					onPress={() => {
						withState ? setModalVisible(false) : closer()
						onAccept()
					}}
				/>
				<ModalMenuButton
					title={btnTitleDecline}
					btnDecline={true}
					onPress={() => {
						withState ? setModalVisible(false) : closer()
					}}
				/>
			</ModalBottomMenu>
		</View>
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
		textAlign: "center",
	},
})
