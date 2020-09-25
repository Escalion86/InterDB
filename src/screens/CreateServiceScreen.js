import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { dbDefault } from "../db/dbTemplate"
import { useTheme } from "@react-navigation/native"
import { addService, updateService } from "../store/actions/service"
import {
	TextInputBlock,
	TitleBlock,
	ImagePickerBlock,
} from "../components/createComponents"
import PhotoPicker from "../components/PhotoPicker"

const CreateServiceScreen = ({ navigation, route }) => {
	const service =
		route.params !== undefined && route.params.service !== undefined
			? route.params.service
			: dbDefault("services")

	const dispatch = useDispatch()
	const [newService, setNewService] = useState(service)

	console.log(newService)

	const { colors } = useTheme()

	const setServiceItem = (item) => {
		setNewService({ ...newService, ...item })
	}

	const saveHandler = () => {
		service.id
			? dispatch(updateService(newService))
			: dispatch(addService(newService))
		navigation.navigate("Services")
	}

	navigation.setOptions({
		title: `Создание услуги`,
		headerRight: () => (
			<>
				<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
					<Item
						title="Save Service"
						iconName="ios-save"
						onPress={saveHandler}
					/>
				</HeaderButtons>
			</>
		),
	})

	return (
		<ScrollView style={styles.container}>
			{/* <TitleBlock title="Финансы" theme={useTheme()} /> */}
			<TextInputBlock
				title="Название"
				value={newService.name}
				theme={useTheme()}
				onChangeText={(text) => setServiceItem({ name: text })}
			/>
			<TextInputBlock
				title="Описание"
				value={newService.description}
				theme={useTheme()}
				onChangeText={(text) => setServiceItem({ description: text })}
				multiline={true}
			/>
			<TextInputBlock
				title="Продолжительность"
				value={newService.length}
				theme={useTheme()}
				keyboardType="numeric"
				onChangeText={(text) => setServiceItem({ length: text })}
				postfix="мин"
				placeholder="0"
			/>
			<TextInputBlock
				title="Время на подготовку"
				value={newService.preparetime}
				theme={useTheme()}
				keyboardType="numeric"
				onChangeText={(text) => setServiceItem({ preparetime: text })}
				postfix="мин"
				placeholder="0"
			/>
			<TextInputBlock
				title="Время на сбор"
				value={newService.collecttime}
				theme={useTheme()}
				keyboardType="numeric"
				onChangeText={(text) => setServiceItem({ collecttime: text })}
				postfix="мин"
				placeholder="0"
			/>
			<TextInputBlock
				title="Стоимость"
				value={newService.price}
				theme={useTheme()}
				onChangeText={(text) => setServiceItem({ price: text })}
				keyboardType="numeric"
				postfix="&#8381;"
				placeholder="0"
			/>
			<ImagePickerBlock
				title={"Картинка"}
				image={newService.image}
				onPick={(img) => setServiceItem({ image: img })}
			/>

			{/* <PhotoPicker
				image={newService.image}
				onPick={(image) => setServiceItem({ image: image })}
			/> */}
		</ScrollView>
	)
}

export default CreateServiceScreen

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 5,
	},
})
