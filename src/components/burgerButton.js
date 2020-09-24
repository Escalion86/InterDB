import React from "react"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"

const burgerButton = (navigation) => (
	<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
		<Item
			title="Toggle Drawer"
			iconName="ios-menu"
			onPress={() => navigation.toggleDrawer()}
		/>
	</HeaderButtons>
)

export default burgerButton
