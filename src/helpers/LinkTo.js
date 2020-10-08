import { Linking, ToastAndroid } from "react-native"

const linkTo = (url, onCantOpenUrl = null) => {
	Linking.canOpenURL(url)
		.then((supported) => {
			if (!supported) {
				onCantOpenUrl
					? onCantOpenUrl()
					: ToastAndroid.show(
							`Невозможно открыть url:  ${url}`,
							ToastAndroid.LONG
					  )
			} else {
				return Linking.openURL(url)
			}
		})
		.catch((err) =>
			ToastAndroid.show(`Ошибка при открытии url "${err}"`, ToastAndroid.LONG)
		)
}

export default linkTo
