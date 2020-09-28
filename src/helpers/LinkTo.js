import { Linking } from "react-native"

const LinkTo = (url) => {
	Linking.canOpenURL(url)
		.then((supported) => {
			if (!supported) {
				console.log("Невозможно открыть url: " + url)
			} else {
				return Linking.openURL(url)
			}
		})
		.catch((err) => console.error("Ошибка при открытии url", err))
}

export default LinkTo
