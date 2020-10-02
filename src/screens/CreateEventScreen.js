import React, { useState } from "react"
import { StyleSheet, ScrollView, View, ToastAndroid } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { addEvent, updateEvent } from "../store/actions/event"
import {
	statusIconDependencies,
	financeIconDependencies,
} from "../db/dependencies"
import { dbDefault } from "../db/dbTemplate"
import {
	EventRowDropDownPicker,
	TextInputBlock,
	DateTimePickerBlock,
	TitleBlock,
} from "../components/createComponents"
import ModalBottomMenu from "../components/ModalBottomMenu"
import MainFlatListWithFab from "../components/MainFlatListWithFab"
import ServiceCard from "../components/ServiceCard"
import ClientCard from "../components/ClientCard"
import { useTheme } from "@react-navigation/native"
import Button from "../components/Button"

const CreateEventScreen = ({ navigation, route }) => {
	const event =
		route.params !== undefined && route.params.event !== undefined
			? route.params.event
			: { ...dbDefault("events"), date: new Date().setSeconds(0, 0) }

	const { colors } = useTheme()

	const services = useSelector((state) => state.service.services).filter(
		(item) => !item.archive
	)
	const clients = useSelector((state) => state.client.clients)

	const dispatch = useDispatch()
	const [newEvent, setNewEvent] = useState(event)
	// const [dateTimePickerShow, setDateTimePickerShow] = useState(null)

	const serviceObj = services.find((item) => item.id == newEvent.service)
	const clientObj = clients.find((item) => item.id == newEvent.client)
	const servicePicked = serviceObj ? true : false
	const clientPicked = clientObj ? true : false

	const setEventItem = (item) => {
		setNewEvent({ ...newEvent, ...item })
	}
	//TODO Сделать проверку на заполнение необходимых полей
	const saveHandler = () => {
		if (servicePicked && clientPicked) {
			event.id ? dispatch(updateEvent(newEvent)) : dispatch(addEvent(newEvent))
			navigation.navigate("Events")
		} else {
			ToastAndroid.show(
				`Необходимо выбрать Услугу и Клиента`,
				ToastAndroid.LONG
			)
		}
	}

	navigation.setOptions({
		title: event.id ? `Редактирование события` : `Создание события`,
		headerRight: () => (
			<>
				<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
					<Item title="Save Event" iconName="ios-save" onPress={saveHandler} />
				</HeaderButtons>
			</>
		),
	})

	const [modalServicesVisible, setModalServicesVisible] = useState(false)
	const [modalClientsVisible, setModalClientsVisible] = useState(false)

	return (
		<ScrollView style={styles.container}>
			<TitleBlock title="Описание" />
			<EventRowDropDownPicker
				dependencies={statusIconDependencies}
				name="Статус события"
				// IconEventComponent={StatusIcon}
				defeultValue={newEvent.status}
				placeholder={"Выберите статус события"}
				onChangeItem={(item) => setEventItem({ status: item.value })}
			/>
			{/* <EventRowDropDownPicker
        dependencies={eventIconDependencies}
        name="Услуга"
        // IconEventComponent={EventIcon}
        defeultValue={newEvent.event}
        placeholder={"Выберите услугу"}
        onChangeItem={(item) => setEventItem({ event: item.value })}
      /> */}

			<EventRowDropDownPicker
				dependencies={financeIconDependencies}
				name="Статус оплаты"
				// IconEventComponent={FinanceIcon}
				defeultValue={newEvent.finance_status}
				placeholder={"Выберите статус оплаты"}
				onChangeItem={(item) => setEventItem({ finance_status: item.value })}
			/>
			{/* <EventRowDropDownPicker
        dependencies={eventIconDependencies}
        name="Тип события"
        // IconEventComponent={EventIcon}
        defeultValue={newEvent.event}
        placeholder={"Выберите тип события"}
        onChangeItem={(item) => setEventItem({ event: item.value })}
      />
      <EventRowDropDownPicker
        dependencies={auditoryIconDependencies}
        name="Аудитория"
        // IconEventComponent={AuditoryIcon}
        defeultValue={newEvent.auditory}
        placeholder={"Выберите аудиторию"}
        onChangeItem={(item) => setEventItem({ auditory: item.value })}
      /> */}
			<DateTimePickerBlock
				title="Дата и время начала"
				dateValue={newEvent.date}
				onChange={(value) => setEventItem({ date: value })}
			/>
			<TextInputBlock
				title="Комментарий"
				value={newEvent.comment}
				onChangeText={(text) => setEventItem({ comment: text })}
				multiline={true}
				keyboardType="numeric"
			/>
			<TitleBlock title="Услуга" />
			{/* <DropDownPickerBlock
				name="Услуга"
				db={services}
				defeultValue={newEvent.service}
				placeholder={"[ Выберите услугу ]"}
				zeroItem={{ label: "Новая услуга", value: 0 }}
				onChangeItem={(item) => setEventItem({ service: item.value })}
				searchable={services.length > 8}
			/> */}
			{!serviceObj ? (
				<View style={{ zIndex: 0 }}>
					<Button
						onPress={() => {
							setModalServicesVisible(true)
						}}
						title={`Выберите услугу`}
					/>
				</View>
			) : (
				<ServiceCard
					navigation={navigation}
					service={serviceObj}
					onPress={() => {
						setModalServicesVisible(true)
					}}
				/>
			)}

			<ModalBottomMenu
				title="Выберите услугу"
				visible={modalServicesVisible}
				onOuterClick={() => setModalServicesVisible(false)}
			>
				<MainFlatListWithFab
					data={services}
					renderItem={({ item }) => (
						<ServiceCard
							navigation={navigation}
							service={item}
							onPress={() => {
								setEventItem({
									service: item.id,
									finance_price: item.finance_price,
									finance_consumables: item.finance_consumables,
									finance_assistants: item.finance_assistants,
								})
								setModalServicesVisible(false)
							}}
							listMode={true}
						/>
					)}
					fabVisible={false}
				/>
			</ModalBottomMenu>

			<TitleBlock title="Клиент" />
			{!clientObj ? (
				<View style={{ zIndex: 0 }}>
					<Button
						onPress={() => {
							setModalClientsVisible(true)
						}}
						title={`Выберите клиента`}
					/>
				</View>
			) : (
				<ClientCard
					navigation={navigation}
					client={clientObj}
					onPress={() => {
						setModalClientsVisible(true)
					}}
				/>
			)}

			<ModalBottomMenu
				title="Выберите клиента"
				visible={modalClientsVisible}
				onOuterClick={() => setModalClientsVisible(false)}
			>
				<MainFlatListWithFab
					data={clients}
					renderItem={({ item }) => (
						<ClientCard
							navigation={navigation}
							client={item}
							onPress={() => {
								setEventItem({ client: item.id })
								setModalClientsVisible(false)
							}}
							listMode={true}
						/>
					)}
					fabVisible={false}
				/>
			</ModalBottomMenu>
			{/* <DropDownPickerBlock
				name="Клиент"
				db={clients}
				defeultValue={newEvent.client}
				placeholder={"[ Выберите клиента ]"}
				zeroItem={{ label: "Новый клиент", value: 0 }}
				onChangeItem={(item) => setEventItem({ client: item.value })}
				searchable={clients.length > 8}
			/> */}
			<TitleBlock title="Финансы" />
			<TextInputBlock
				title="Цена для клиента"
				value={newEvent.finance_price}
				onChangeText={(text) =>
					setEventItem({ finance_price: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				postfix="&#8381;"
				success={
					serviceObj && newEvent.finance_price == serviceObj.finance_price
				}
			/>
			<TextInputBlock
				title="Расходные материалы"
				value={newEvent.finance_consumables}
				onChangeText={(text) =>
					setEventItem({ finance_consumables: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				success={
					serviceObj &&
					newEvent.finance_consumables == serviceObj.finance_consumables
				}
				postfix="&#8381;"
			/>
			<TextInputBlock
				title="Ассистентам"
				value={newEvent.finance_assistants}
				onChangeText={(text) =>
					setEventItem({ finance_assistants: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				postfix="&#8381;"
				success={
					serviceObj &&
					newEvent.finance_assistants == serviceObj.finance_assistants
				}
			/>
			<TextInputBlock
				title="За дорогу"
				value={newEvent.finance_road}
				onChangeText={(text) =>
					setEventItem({ finance_road: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				postfix="&#8381;"
			/>
			<TextInputBlock
				title="Организатору"
				value={newEvent.finance_organizator}
				onChangeText={(text) =>
					setEventItem({ finance_organizator: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				postfix="&#8381;"
			/>

			<TextInputBlock
				title="Чаевые"
				value={newEvent.finance_tips}
				onChangeText={(text) =>
					setEventItem({ finance_tips: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				postfix="&#8381;"
			/>

			<TitleBlock title="Адрес" />
			<TextInputBlock
				title="Название заведения"
				value={newEvent.location_name}
				onChangeText={(text) => setEventItem({ location_name: text })}
			/>
			<TextInputBlock
				title="Город"
				value={newEvent.location_town}
				onChangeText={(text) => setEventItem({ location_town: text })}
			/>
			<TextInputBlock
				title="Улица"
				value={newEvent.location_street}
				onChangeText={(text) => setEventItem({ location_street: text })}
			/>
			<TextInputBlock
				title="Дом"
				value={newEvent.location_house}
				onChangeText={(text) => setEventItem({ location_house: text })}
			/>
			<TextInputBlock
				title="Квартира"
				value={newEvent.location_room}
				onChangeText={(text) => setEventItem({ location_room: text })}
			/>
			<TextInputBlock
				title="Этаж"
				value={newEvent.location_floor}
				keyboardType="numeric"
				onChangeText={(text) => setEventItem({ location_floor: text })}
			/>
		</ScrollView>
	)
}

export default CreateEventScreen

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 5,
	},
})
