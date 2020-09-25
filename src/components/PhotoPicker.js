import React, { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { StyleSheet, View, Image, Button } from "react-native"

const PhotoPicker = ({ onPick, image = null }) => {
	const [newImage, setNewImage] = useState(image)

	const takePhoto = async () => {
		const img = await ImagePicker.launchCameraAsync({
			quality: 0.7,
			allowsEditing: false,
			aspect: [1, 1],
		})

		setImage(img.uri)
		onPick(img.uri)
	}

	return (
		<View style={styles.wrapper}>
			<Button title="Сделать фото" onPress={takePhoto} />
			{newImage && <Image style={styles.image} source={{ uri: newImage }} />}
		</View>
	)
}

export default PhotoPicker

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 10,
	},
	image: {
		width: "100%",
		height: 200,
		marginTop: 10,
	},
})
