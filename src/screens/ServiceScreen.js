import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	ScrollView,
	Image,
	ActivityIndicator,
} from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"
import { updateServicePartially } from "../store/actions/service"
// import ModalBottomMenu, {
// 	ModalBottomMenuYesNo,
// } from "../components/ModalBottomMenu"
import { useTheme } from "@react-navigation/native"
// import MainFlatListWithFab from "../components/MainFlatListWithFab"
// import EventCard from "../components/EventCard"
import ModalDeleteService from "../components/ModalDeleteService"
import ModalDeleteEvent from "../components/ModalDeleteEvent"
import { TextBlock } from "../components/infoComponents"
import EventCard from "../components/EventCard"
import { TitleBlock } from "../components/createComponents"

const ServiceScreen = ({ navigation, route }) => {
	const service =
		route.params !== undefined && route.params.serviceId !== undefined
			? useSelector((state) => state.service.services).find(
					(item) => item.id == route.params.serviceId
			  )
			: navigation.navigate("Services")

	const { dark, colors } = useTheme()

	const [archive, setArchive] = useState(service.archive)
	const [modal, setModal] = useState(null)

	const modalDeleteService = (service) => {
		setModal(
			<ModalDeleteService
				service={service}
				navigation={navigation}
				callbackToCloseModal={() => setModal(null)}
				callbackAfterAccept={() => navigation.goBack()}
			/>
		)
	}

	const modalDeleteEvent = (event) => {
		setModal(
			<ModalDeleteEvent
				event={event}
				navigation={navigation}
				callbackToCloseModal={() => setModal(null)}
				callbackAfterAccept={() => {}}
			/>
		)
	}

	const toggleArchive = () => {
		dispatch(updateServicePartially(service.id, { archive: !archive }))
		ToastAndroid.show(
			!archive ? "Услуга архивирована" : "Услуга восстановлена из архива",
			ToastAndroid.SHORT
		)
		setArchive(!archive)
	}

	const dispatch = useDispatch()

	const noImageUrl = dark
		? require("../../assets/no_image_dark.jpg")
		: require("../../assets/no_image.jpg")

	const events = useSelector((state) => state.event.events)

	const eventsDependency = events.filter((event) => {
		return event.service === service.id
	})

	const eventCards = eventsDependency.map((event) => (
		<EventCard
			key={event.id}
			navigation={navigation}
			event={event}
			onPress={() => {
				navigation.navigate("Event", { eventId: event.id })
			}}
			// listMode={true}
			showService={false}
			onDelete={() => modalDeleteEvent(event)}
		/>
	))

	useEffect(() => {
		navigation.setOptions({
			title: `Услуга`,
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
					<Item
						title="Archiving Service"
						iconName="md-archive"
						buttonStyle={archive ? { color: "red" } : null}
						onPress={() => {
							toggleArchive()
						}}
					/>
					<Item
						title="Delete Service"
						iconName="ios-trash"
						onPress={() => {
							modalDeleteService(service)
						}}
					/>
					<Item
						title="Edit Service"
						iconName="md-create"
						onPress={() => {
							navigation.navigate("CreateService", { serviceId: service.id })
						}}
					/>
					{modal}
				</HeaderButtons>
			),
		})
	}, [service, archive])

	if (service.loading || service.deleting) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color={colors.text} />
			</View>
		)
	}

	return (
		<ScrollView style={styles.container}>
			<TitleBlock title="Основные" />
			<View style={{ flexDirection: "row", height: 120, marginBottom: 10 }}>
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
					source={!service.image ? noImageUrl : { uri: service.image }}
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
					<TextBlock text={service.name} center big />
				</View>
			</View>
			<TextBlock text={service.description} />
			<TitleBlock title="Затраты времени" />
			<TextBlock text={`Продолжительность: ${service.duration} мин`} />
			<TextBlock text={`Время на подготовку: ${service.preparetime} мин`} />
			<TextBlock
				text={`Время на сбор: ${service.collecttime} мин`}
				style={{ marginBottom: 5 }}
			/>
			<TextBlock
				text={`ИТОГО: ${
					service.duration + service.preparetime + service.collecttime
				} мин`}
				style={{
					borderTopColor: colors.text,
					borderTopWidth: 1,
					paddingTop: 5,
				}}
			/>
			<TitleBlock title="Финансы по умолчанию" />
			<TextBlock text={`Стоимость: ${service.finance_price} руб`} />
			<TextBlock
				text={`Затраты на расходные материалы: ${service.finance_consumables} руб`}
			/>
			<TextBlock
				text={`Затраты на ассистентов: ${service.finance_assistants} руб`}
				style={{ marginBottom: 5 }}
			/>
			<TextBlock
				text={`ИТОГО: ${
					service.finance_price -
					service.finance_consumables -
					service.finance_assistants
				} руб`}
				style={{
					borderTopColor: colors.text,
					borderTopWidth: 1,
					paddingTop: 5,
				}}
			/>
			<TitleBlock title={`События (${eventsDependency.length})`} />
			{eventsDependency.length === 0 ? (
				<TextBlock text="Нет связанных с услугой событий" center />
			) : (
				eventCards
			)}
			{modal}
		</ScrollView>
	)
}

export default ServiceScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
