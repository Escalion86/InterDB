import React from "react"
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
	// renderers,
} from "react-native-popup-menu"
import { MainIcon } from "./icons"
import { useTheme } from "@react-navigation/native"

const FinanceMenu = ({ iconBackgroundColor = "green", style = {} }) => {
	const { colors } = useTheme()

	return (
		<Menu style={style}>
			<MenuTrigger
				children={
					<MainIcon
						iconName="ios-cash"
						iconBackgroundColor={iconBackgroundColor}
						size="small"
						iconBackgroundColor={iconBackgroundColor}
					/>
				}
			/>
			<MenuOptions
				customStyles={{
					optionsContainer: {
						width: 250,
					},
					optionWrapper: {
						padding: 5,
						backgroundColor: colors.background,
					},
				}}
			>
				<MenuOption
					key="income"
					onSelect={() => {}}
					children={
						<MainIcon
							iconName="ios-add"
							size="small"
							iconBackgroundColor="green"
							text="Поступление средств"
							textColor={colors.text}
						/>
					}
				/>
				<MenuOption
					key="outcome"
					onSelect={() => {}}
					children={
						<MainIcon
							iconName="ios-remove"
							size="small"
							iconBackgroundColor="red"
							text="Расходование средств"
							textColor={colors.text}
						/>
					}
				/>
			</MenuOptions>
		</Menu>
	)
}

export default FinanceMenu
