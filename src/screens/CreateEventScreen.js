import React, { useState } from "react"
import { StyleSheet, ScrollView, View, ToastAndroid, Text } from "react-native"
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
import ModalBottomMenu, {
	ModalBottomMenuYesNo,
} from "../components/ModalBottomMenu"
import MainFlatListWithFab from "../components/MainFlatListWithFab"
import ServiceCard from "../components/ServiceCard"
import ClientCard from "../components/ClientCard"
import { useTheme } from "@react-navigation/native"
import Button from "../components/Button"
import { Ionicons } from "@expo/vector-icons"
import {
	Menu,
	MenuOptions,
	MenuTrigger,
	renderers,
} from "react-native-popup-menu"

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

	const { Popover } = renderers

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
	const [modal, setModal] = useState(null)

	const modalUpdateFinance = (
		<ModalBottomMenuYesNo
			title="Обновить данные финансов"
			subtitle="Внести финансовые данные услуги в собитие?"
			visible={true}
			onAccept={() => {
				setEventItem({
					finance_price: serviceObj.finance_price,
					finance_consumables: serviceObj.finance_consumables,
					finance_assistants: serviceObj.finance_assistants,
				})
			}}
			closer={() => setModal(null)}
		/>
	)

	const modalClients = (
		<ModalBottomMenu
			title="Выберите клиента"
			visible={true}
			onOuterClick={() => setModal(null)}
		>
			<MainFlatListWithFab
				data={clients}
				renderItem={({ item }) => (
					<ClientCard
						navigation={navigation}
						client={item}
						onPress={() => {
							setEventItem({ client: item.id })
							setModal(null)
						}}
						listMode={true}
					/>
				)}
				fabVisible={false}
			/>
		</ModalBottomMenu>
	)

	const modalServices = (
		<ModalBottomMenu
			title="Выберите услугу"
			visible={true}
			onOuterClick={() => setModal(null)}
		>
			<MainFlatListWithFab
				data={services}
				renderItem={({ item }) => (
					<ServiceCard
						navigation={navigation}
						service={item}
						onPress={() => {
							//Если сервис был выбран, то нужно спросить об обновлении финансовых данных
							setModal(null)
							setEventItem({
								service: item.id,
							})
							if (servicePicked) setModal(modalUpdateFinance)
						}}
						listMode={true}
					/>
				)}
				fabVisible={false}
			/>
		</ModalBottomMenu>
	)

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
							setModal(modalServices)
						}}
						title={`Выберите услугу`}
					/>
				</View>
			) : (
				<ServiceCard
					navigation={navigation}
					service={serviceObj}
					onPress={() => {
						setModal(modalServices)
					}}
				/>
			)}

			<TitleBlock title="Клиент" />
			{!clientObj ? (
				<View style={{ zIndex: 0 }}>
					<Button
						onPress={() => {
							setModal(modalClients)
						}}
						title={`Выберите клиента`}
					/>
				</View>
			) : (
				<ClientCard
					navigation={navigation}
					client={clientObj}
					onPress={() => {
						setModal(modalClients)
					}}
				/>
			)}

			<View style={{ flexDirection: "row" }}>
				<TitleBlock title="Финансы" />
				<Menu
					style={{
						position: "absolute",
						right: 10,
						alignSelf: "center",
					}}
					renderer={Popover}
					rendererProps={{ preferredPlacement: "left" }}
				>
					<MenuTrigger>
						<Ionicons
							name="md-information-circle-outline"
							size={22}
							color={colors.text}
						/>
					</MenuTrigger>
					<MenuOptions
						style={{
							padding: 10,
							borderColor: colors.border,
							borderWidth: 1,
							// borderRadius: 20,
							backgroundColor: colors.card,
							width: 290,
							flexDirection: "row",
							flexWrap: "wrap",
							// display: "inline",
						}}
					>
						<Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>
							Если сумма выделена{" "}
						</Text>
						<Text
							style={{
								color: colors.success,
								fontSize: 14,
								padding: 0,
								margin: 0,
							}}
						>
							цветом
						</Text>
						<Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>
							, значит
						</Text>
						<Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>
							она совпадает со стандартным значением указанным в услуге
						</Text>
					</MenuOptions>
				</Menu>
			</View>

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
			{modal}
		</ScrollView>
	)
}

export default CreateEventScreen

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 5,
	},
})
