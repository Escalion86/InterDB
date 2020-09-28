import React, { useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import Fab from "./Fab"

const MainFlatListWithFab = ({
	data,
	renderItem,
	onPressFab,
	containerStyle = {},
	fabStyle = {},
	fabVisible = true,
}) => {
	const [fabIsVisible, setFabIsVisible] = useState(fabVisible)
	const [scrollPosition, setScrollPosition] = useState(0)

	return (
		<View style={{ height: "100%", ...containerStyle }}>
			<View style={styles.wrapper}>
				<FlatList
					style={styles.list}
					data={data}
					keyExtractor={(item) => item.id.toString()}
					// scrollsToTop={false}
					// onMomentumScrollEnd={() => console.log("end")}
					// onEndReached={() => setFabVisible(false)}
					// onScrollBeginDrag={() => setFabVisible(true)}
					// onEndReachedThreshold={0.1}
					// onTouchMove={() => setFabVisible(true)}
					onScroll={({ nativeEvent }) => {
						if (fabVisible) {
							const currentOffset = nativeEvent.contentOffset.y
							setFabIsVisible(currentOffset < scrollPosition)
							// const direction = currentOffset > scrollPosition ? "down" : "up"
							setScrollPosition(currentOffset)
						}
					}}
					scrollEventThrottle={1000}
					renderItem={renderItem}
				/>
			</View>
			<Fab visible={fabIsVisible} onPress={onPressFab} style={fabStyle} />
		</View>
	)
}

export default MainFlatListWithFab

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 5,
		margin: 0,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	list: {
		width: "100%",
		padding: 0,
		margin: 0,
	},
})
