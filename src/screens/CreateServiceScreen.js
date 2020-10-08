import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { StyleSheet, ScrollView, ToastAndroid } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { dbDefault } from "../db/dbTemplate"
import { useTheme } from "@react-navigation/native"
import { addService, updateService } from "../store/actions/service"
import {
	TextInputBlock,
	ImagePickerBlock,
	TitleBlock,
} from "../components/createComponents"
import trimingArrayValues from "../helpers/trimingArrayValues"

const CreateServiceScreen = ({ navigation, route }) => {
	const service =
		route.params !== undefined && route.params.service !== undefined
			? route.params.service
			: dbDefault("services")

	const dispatch = useDispatch()
	const [newService, setNewService] = useState(service)
	const nameFieldFilled = newService.name.trim() ? true : false

	const { colors } = useTheme()

	const setServiceItem = (item) => {
		setNewService({ ...newService, ...item })
	}
	//TODO Сделать проверку на заполнение необходимых полей
	const saveHandler = () => {
		if (nameFieldFilled) {
			service.id
				? dispatch(updateService(trimingArrayValues(newService)))
				: dispatch(addService(trimingArrayValues(newService)))
			navigation.goBack()
		} else {
			ToastAndroid.show(
				`Необходимо заполнить Название услуги`,
				ToastAndroid.LONG
			)
		}
	}

	navigation.setOptions({
		title: service.id ? `Редактирование услуги` : `Создание услуги`,
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
			{/* <TitleBlock title="Финансы" /> */}
			<TitleBlock title="Основные" />
			<TextInputBlock
				title="Название"
				value={newService.name}
				onChangeText={(text) => setServiceItem({ name: text })}
				fieldStyle={!nameFieldFilled ? { borderColor: colors.abort } : null}
				multiline={true}
			/>
			<TextInputBlock
				title="Описание"
				value={newService.description}
				onChangeText={(text) => setServiceItem({ description: text })}
				multiline={true}
			/>
			<ImagePickerBlock
				title={"Картинка"}
				image={newService.image}
				onPick={(img) => setServiceItem({ image: img })}
			/>
			<TitleBlock title="Затраты времени" />
			<TextInputBlock
				title="Продолжительность"
				value={newService.length}
				keyboardType="numeric"
				onChangeText={(text) => setServiceItem({ length: text })}
				postfix="мин"
				placeholder="0"
			/>
			<TextInputBlock
				title="Время на подготовку"
				value={newService.preparetime}
				keyboardType="numeric"
				onChangeText={(text) => setServiceItem({ preparetime: text })}
				postfix="мин"
				placeholder="0"
			/>
			<TextInputBlock
				title="Время на сбор"
				value={newService.collecttime}
				keyboardType="numeric"
				onChangeText={(text) => setServiceItem({ collecttime: text })}
				postfix="мин"
				placeholder="0"
			/>
			<TitleBlock title="Финансы по умолчанию" />
			<TextInputBlock
				title="Стоимость"
				value={newService.finance_price}
				onChangeText={(text) => setServiceItem({ price: text })}
				keyboardType="numeric"
				postfix="&#8381;"
				placeholder="0"
			/>
			<TextInputBlock
				title="Затраты на расходники"
				value={newService.finance_consumables}
				onChangeText={(text) => setServiceItem({ price: text })}
				keyboardType="numeric"
				prefix="-"
				postfix="&#8381;"
				placeholder="0"
			/>
			<TextInputBlock
				title="Затраты на ассистентов"
				value={newService.finance_assistants}
				onChangeText={(text) => setServiceItem({ price: text })}
				keyboardType="numeric"
				prefix="-"
				postfix="&#8381;"
				placeholder="0"
			/>
		</ScrollView>
	)
}

export default CreateServiceScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5,
	},
})
