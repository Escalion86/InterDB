import React from "react"
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
	// renderers,
} from "react-native-popup-menu"
import { EventIcon } from "./icons"
import { iconDependencies } from "../db/dependencies"
import { useDispatch } from "react-redux"
import { updateEventPartially } from "../store/actions/event"
import { useTheme } from "@react-navigation/native"

const IconMenu = ({ event, eventPartName = null, style = {} }) => {
	const eventId = event.id
	const activeValue = event[eventPartName]
	const { colors } = useTheme()
	const dependencies = iconDependencies[eventPartName]
	const dispatch = useDispatch()
	let menu = []
	for (let key in dependencies) {
		menu.push(
			<MenuOption
				key={key}
				onSelect={() => {
					if (eventPartName && activeValue !== key) {
						const part = {}
						part[eventPartName] = key
						dispatch(updateEventPartially(eventId, part))
					}
				}}
				style={activeValue === key ? { backgroundColor: colors.active } : null}
				children={
					<EventIcon
						dependencies={dependencies}
						status={key}
						size="small"
						showtext={true}
						textcolor={colors.text}
					/>
				}
			/>
		)
	}

	return (
		<Menu
			style={style}

			// renderer={SlideInMenu}
			// rendererProps={{ preferredPlacement: "bottom" }}
		>
			<MenuTrigger
				// style={{ marginLeft: 20 }}
				children={
					<EventIcon
						dependencies={dependencies}
						status={activeValue}
						size="small"
					/>
				}
			/>
			<MenuOptions
				customStyles={{
					optionsContainer: {
						// marginLeft: 40,
						width: 220,
					},
					optionWrapper: {
						padding: 5,
						backgroundColor: colors.background,
					},
				}}
			>
				{menu}
			</MenuOptions>
		</Menu>
	)
}

export default IconMenu
