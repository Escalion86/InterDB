import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, View, ScrollView, Image } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
// import { deleteClient } from "../store/actions/client"
// import ModalBottomMenu, {
// 	ModalBottomMenuYesNo,
// } from "../components/ModalBottomMenu"
// import MainFlatListWithFab from "../components/MainFlatListWithFab"
// import EventCard from "../components/EventCard"
import { TitleBlock } from "../components/createComponents"
import { useTheme } from "@react-navigation/native"
import { TextBlock, ContactIcon } from "../components/infoComponents"
import { contactsIcons } from "../db/dependencies"
import wordForm from "../helpers/wordForm"
import { formatDate, calculateAge } from "../helpers/date"
import ModalDeleteClient from "../components/ModalDeleteClient"
import ModalDeleteEvent from "../components/ModalDeleteEvent"
import EventCard from "../components/EventCard"

const ClientScreen = ({ navigation, route }) => {
	const client =
		route.params !== undefined && route.params.client !== undefined
			? route.params.client
			: navigation.navigate("Clients")

	const age = calculateAge(client.birthday)

	const { dark, colors } = useTheme()

	const [modal, setModal] = useState(null)

	const modalDeleteClient = (client) => {
		setModal(
			<ModalDeleteClient
				client={client}
				// navigation={navigation}
				callbackToCloseModal={() => setModal(null)}
				callbackAfterAccept={() => navigation.goBack()}
			/>
		)
	}

	const modalDeleteEvent = (event) => {
		setModal(
			<ModalDeleteEvent
				event={event}
				// navigation={navigation}
				callbackToCloseModal={() => setModal(null)}
				callbackAfterAccept={() => {}}
			/>
		)
	}

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

	const eventCards = eventsDependency.map((event) => (
		<EventCard
			key={event.id}
			navigation={navigation}
			event={event}
			onPress={() => {
				navigation.navigate("Event", { event: event })
			}}
			// listMode={true}
			showClient={false}
			onDelete={() => modalDeleteEvent(event)}
		/>
	))

	// const wordEventsDependency =
	// 	eventsDependency.length === 0
	// 		? "Нет связанных с клиентом событий"
	// 		: `С клиентом связано ${wordForm(eventsDependency.length, [
	// 				"событие",
	// 				"события",
	// 				"событий",
	// 		  ])}`

	navigation.setOptions({
		title: `Клиент`,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Delete Client"
					iconName="ios-trash"
					onPress={() => modalDeleteClient(client)}
				/>
				<Item
					title="Edit Client"
					iconName="md-create"
					onPress={() => {
						navigation.navigate("CreateClient", { client: client })
					}}
				/>
				{/* <ModalDeleteConfirm />
				<ModalEventsDependency />
				<ModalDeclineDelete /> */}
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
			<TitleBlock title={`События (${eventsDependency.length})`} />
			{
				eventsDependency.length === 0 ? (
					<TextBlock text="Нет связанных с клиентом событий" center />
				) : (
					eventCards
				)
				// <MainFlatListWithFab
				// 	data={eventsDependency}
				// 	renderItem={({ item }) => (
				// 		<EventCard
				// 			navigation={navigation}
				// 			event={item}
				// 			onPress={() => {
				// 				navigation.navigate("Event", { event: item })
				// 			}}
				// 			listMode={true}
				// 			showClient={false}
				// 		/>
				// 	)}
				// 	fabVisible={false}
				// />
			}
			{modal}
		</ScrollView>
	)
}

export default ClientScreen

const styles = StyleSheet.create({})
