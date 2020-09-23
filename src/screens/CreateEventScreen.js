import React, { useState } from "react"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import DropDownPicker from "react-native-dropdown-picker"
import { useTheme } from "@react-navigation/native"
import { addEvent, updateEvent } from "../store/actions/event"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate, formatTime } from "../helpers/date"
import {
	statusIconDependencies,
	financeIconDependencies,
	eventIconDependencies,
	auditoryIconDependencies,
} from "../db/dependencies"
import { dbDefault } from "../db/dbTemplate"
import {
	EventRowDropDownPicker,
	TextInputBlock,
	DateTimePickerBlock,
	TitleBlock,
	DropDownPickerBlock,
} from "../components/createComponents"

const CreateEventScreen = ({ navigation, route }) => {
	const event =
		route.params !== undefined && route.params.event !== undefined
			? route.params.event
			: { ...dbDefault("events"), date: new Date().setSeconds(0, 0) }

	const services = useSelector((state) => state.service.services)
	// const clients = useSelector((state) => state.client.clients)
	const clients = [
		{ id: 1, name: "Петя" },
		{ id: 2, name: "Иван" },
	]

	const dispatch = useDispatch()
	const [newEvent, setNewEvent] = useState(event)
	// const [dateTimePickerShow, setDateTimePickerShow] = useState(null)

	const { colors } = useTheme()

	const setEventItem = (item) => {
		setNewEvent({ ...newEvent, ...item })
	}

	const saveHandler = () => {
		event.id ? dispatch(updateEvent(newEvent)) : dispatch(addEvent(newEvent))
		navigation.navigate("Events")
	}

	navigation.setOptions({
		title: `Создание события`,
		headerRight: () => (
			<>
				<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
					<Item title="Save Event" iconName="ios-save" onPress={saveHandler} />
				</HeaderButtons>
			</>
		),
	})
	let statuses = []
	for (let status in statusIconDependencies) {
		statuses.push({
			label: "",
			value: status,
			icon: () => (
				<StatusIcon
					status={status}
					size={20}
					showtext={true}
					textcolor={colors.text}
				/>
			),
		})
	}

	let finance_statuses = []
	for (let finance_status in financeIconDependencies) {
		finance_statuses.push({
			label: "",
			value: finance_status,
			icon: () => (
				<FinanceIcon
					status={finance_status}
					size={20}
					showtext={true}
					textcolor={colors.text}
				/>
			),
		})
	}

	let event_types = []
	for (let event_type in eventIconDependencies) {
		event_types.push({
			label: "",
			value: event_type,
			icon: () => (
				<EventIcon
					status={event_type}
					size={20}
					showtext={true}
					textcolor={colors.text}
				/>
			),
		})
	}

	let auditories = []
	for (let auditory in auditoryIconDependencies) {
		auditories.push({
			label: "",
			value: auditory,
			icon: () => (
				<AuditoryIcon
					status={auditory}
					size={20}
					showtext={true}
					textcolor={colors.text}
				/>
			),
		})
	}

	return (
		<ScrollView style={styles.container}>
			<TitleBlock title="Описание" theme={useTheme()} />
			<EventRowDropDownPicker
				dependencies={statusIconDependencies}
				name="Статус события"
				// IconEventComponent={StatusIcon}
				defeultValue={newEvent.status}
				placeholder={"Выберите статус события"}
				onChangeItem={(item) => setEventItem({ status: item.value })}
				theme={useTheme()}
			/>
			{/* <EventRowDropDownPicker
        dependencies={eventIconDependencies}
        name="Услуга"
        // IconEventComponent={EventIcon}
        defeultValue={newEvent.event}
        placeholder={"Выберите услугу"}
        onChangeItem={(item) => setEventItem({ event: item.value })}
        theme={useTheme()}
      /> */}

			<EventRowDropDownPicker
				dependencies={financeIconDependencies}
				name="Статус оплаты"
				// IconEventComponent={FinanceIcon}
				defeultValue={newEvent.finance_status}
				placeholder={"Выберите статус оплаты"}
				onChangeItem={(item) => setEventItem({ finance_status: item.value })}
				theme={useTheme()}
			/>
			{/* <EventRowDropDownPicker
        dependencies={eventIconDependencies}
        name="Тип события"
        // IconEventComponent={EventIcon}
        defeultValue={newEvent.event}
        placeholder={"Выберите тип события"}
        onChangeItem={(item) => setEventItem({ event: item.value })}
        theme={useTheme()}
      />
      <EventRowDropDownPicker
        dependencies={auditoryIconDependencies}
        name="Аудитория"
        // IconEventComponent={AuditoryIcon}
        defeultValue={newEvent.auditory}
        placeholder={"Выберите аудиторию"}
        onChangeItem={(item) => setEventItem({ auditory: item.value })}
        theme={useTheme()}
      /> */}
			<DateTimePickerBlock
				dateValue={newEvent.date}
				onChangeStoreHook={setEventItem}
				theme={useTheme()}
			/>
			<TitleBlock title="Услуга" theme={useTheme()} />
			<DropDownPickerBlock
				name="Услуга"
				db={services}
				defeultValue={newEvent.service}
				placeholder={"[ Выберите услугу ]"}
				zeroItem={{ label: "Новая услуга", value: 0 }}
				onChangeItem={(item) => setEventItem({ service: item.value })}
				theme={useTheme()}
			/>
			<TitleBlock title="Клиент" theme={useTheme()} />
			<DropDownPickerBlock
				name="Клиент"
				db={clients}
				defeultValue={newEvent.client}
				placeholder={"[ Выберите клиента ]"}
				zeroItem={{ label: "Новый клиент", value: 0 }}
				onChangeItem={(item) => setEventItem({ client: item.value })}
				theme={useTheme()}
			/>
			<TitleBlock title="Финансы" theme={useTheme()} />
			<TextInputBlock
				title="Цена клиента"
				value={newEvent.finance_price}
				theme={useTheme()}
				onChangeText={(text) =>
					setEventItem({ finance_price: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				postfix="&#8381;"
			/>
			<TextInputBlock
				title="За дорогу"
				value={newEvent.finance_road}
				theme={useTheme()}
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
				theme={useTheme()}
				onChangeText={(text) =>
					setEventItem({ finance_organizator: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				postfix="&#8381;"
			/>
			<TextInputBlock
				title="Ассистентам"
				value={newEvent.finance_assistants}
				theme={useTheme()}
				onChangeText={(text) =>
					setEventItem({ finance_assistants: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				postfix="&#8381;"
			/>
			<TextInputBlock
				title="Чаевые"
				value={newEvent.finance_tips}
				theme={useTheme()}
				onChangeText={(text) =>
					setEventItem({ finance_tips: Math.floor(text) })
				}
				keyboardType="numeric"
				placeholder="0"
				postfix="&#8381;"
			/>
			<TitleBlock title="Адрес" theme={useTheme()} />
			<TextInputBlock
				title="Название заведения"
				value={newEvent.location_name}
				theme={useTheme()}
				onChangeText={(text) => setEventItem({ location_name: text })}
			/>
			<TextInputBlock
				title="Город"
				value={newEvent.location_town}
				theme={useTheme()}
				onChangeText={(text) => setEventItem({ location_town: text })}
			/>
			<TextInputBlock
				title="Улица"
				value={newEvent.location_street}
				theme={useTheme()}
				onChangeText={(text) => setEventItem({ location_street: text })}
			/>
			<TextInputBlock
				title="Дом"
				value={newEvent.location_house}
				theme={useTheme()}
				onChangeText={(text) => setEventItem({ location_house: text })}
			/>
			<TextInputBlock
				title="Квартира"
				value={newEvent.location_room}
				theme={useTheme()}
				onChangeText={(text) => setEventItem({ location_room: text })}
			/>
			<TextInputBlock
				title="Этаж"
				value={newEvent.location_floor}
				theme={useTheme()}
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
