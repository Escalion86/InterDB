import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, View, ScrollView, Image } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { deleteClient } from "../store/actions/client"
import ModalBottomMenu, {
	ModalBottomMenuYesNo,
} from "../components/ModalBottomMenu"
import MainFlatListWithFab from "../components/MainFlatListWithFab"
import EventCard from "../components/EventCard"
import { TitleBlock } from "../components/createComponents"
import { useTheme } from "@react-navigation/native"
import { TextBlock, ContactIcon } from "../components/infoComponents"
import { contactsIcons } from "../db/dependencies"
import wordForm from "../helpers/wordForm"
import { formatDate, calculateAge } from "../helpers/date"

const ClientScreen = ({ navigation, route }) => {
	const client =
		route.params !== undefined && route.params.client !== undefined
			? route.params.client
			: navigation.navigate("Clients")

	const age = calculateAge(client.birthday)

	const { dark, colors } = useTheme()

	const noImageUrl =
		client.gender === 0
			? dark
				? require("../../assets/avatar/famale_dark.jpg")
				: require("../../assets/avatar/famale.jpg")
			: dark
			? require("../../assets/avatar/male_dark.jpg")
			: require("../../assets/avatar/male.jpg")

	const events = useSelector((state) => state.event.events)

	const eventsDependency = events.filter((event) => {
		return event.client === client.id
	})

	const wordEventsDependency = `Клиент зависим от ${wordForm(
		eventsDependency.length,
		["события", "событий", "событий"]
	)}`

	const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
	const [modalEventsVisible, setModalEventsVisible] = useState(false)
	const [modalDeclineDeleteVisible, setModalDeclineDeleteVisible] = useState(
		false
	)

	const dispatch = useDispatch()

	const ModalDeleteConfirm = () => (
		<ModalBottomMenuYesNo
			title="Удаление клиента"
			subtitle="Вы уверены что хотите удалить клиента?"
			onAccept={() => {
				dispatch(deleteClient(client.id))
				navigation.goBack()
			}}
			visible={modalDeleteVisible}
			// opener={() => setModalDeleteVisible(true)}
			closer={() => setModalDeleteVisible(false)}
		/>
	)

	const ModalEventsDependency = (
		title = "События клиента",
		subtitle = wordEventsDependency,
		visible = modalEventsVisible,
		onOuterClick = () => setModalEventsVisible(false)
	) => (
		<ModalBottomMenu
			title={title}
			subtitle={subtitle}
			visible={visible}
			onOuterClick={onOuterClick}
		>
			<MainFlatListWithFab
				data={eventsDependency}
				renderItem={({ item }) => (
					<EventCard
						navigation={navigation}
						event={item}
						onPress={() => {
							// setEventItem({ service: item.id })
							setModalEventsVisible(false)
							navigation.navigate("Event", { event: item })
						}}
						listMode={true}
					/>
				)}
				fabVisible={false}
			/>
		</ModalBottomMenu>
	)

	const ModalDeclineDelete = () =>
		ModalEventsDependency(
			"Удаление клиента невозможно",
			wordEventsDependency,
			modalDeclineDeleteVisible,
			() => setModalDeclineDeleteVisible(false)
		)

	navigation.setOptions({
		title: `Клиент`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Delete Client"
					iconName="ios-trash"
					onPress={() => {
						eventsDependency.length > 0
							? setModalDeclineDeleteVisible(true)
							: setModalDeleteVisible(true)
					}}
				/>
				<Item
					title="Edit Client"
					iconName="md-create"
					onPress={() => {
						navigation.navigate("CreateClient", { client: client })
					}}
				/>
				<ModalDeleteConfirm />
				<ModalEventsDependency />
				<ModalDeclineDelete />
			</HeaderButtons>
		),
	})

	return (
		<ScrollView style={styles.container}>
			<TitleBlock title="Основные" />
			<View style={{ flexDirection: "row", height: 120 }}>
				<Image
					style={{
						// flex: 1,
						borderRadius: 5,
						borderWidth: 1,
						borderColor: colors.card,
						// backgroundColor: colors.card,
						width: "30%",
						height: "100%",
					}}
					source={!client.avatar ? noImageUrl : { uri: client.avatar }}
					// resizeMethod="scale"
					resizeMode="cover"
				/>
				<View
					style={{
						marginLeft: 10,
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<TextBlock
						text={`${client.surname} ${client.name} ${client.thirdname}`.trim()}
						center
						big
					/>
					{client.birthday ? (
						<TextBlock
							text={`${formatDate(client.birthday, true)} (${wordForm(age, [
								"год",
								"года",
								"лет",
							])})`}
							center
						/>
					) : null}
				</View>
			</View>
			<TitleBlock title="Связь" />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					flexWrap: "wrap",
				}}
			>
				{contactsIcons(client).map((contact) => {
					return contact.exist ? (
						<ContactIcon
							key={contact.name}
							iconName={contact.icon}
							backgroundColor={contact.color}
							url={contact.url}
							style={{ marginHorizontal: 10, marginBottom: 10 }}
						/>
					) : null
				})}
				{/* {client.phone ?
				<ContactIcon
					iconName="telegram"
					backgroundColor="#0088cc"
					url="http://t.me/escalion"
				/>
				: null}
				{client.phone ?
				<ContactIcon
					iconName="telegram"
					backgroundColor="#0088cc"
					url="http://t.me/escalion"
				/>
				: null} */}
			</View>
		</ScrollView>
	)
}

export default ClientScreen

const styles = StyleSheet.create({})
