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
import Button from "./Button"

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
				<Button
					title={btnTitleConfirm}
					btnDecline={false}
					onPress={() => {
						withState ? setModalVisible(false) : closer()
						onAccept()
					}}
				/>
				<Button
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
	panelTitle: {
		fontSize: 27,
		// height: 35,
		textAlign: "center",
	},
	panelSubtitle: {
		fontSize: 14,
		// color: "gray",
		textAlign: "center",
		// marginBottom: 10,
	},
})
