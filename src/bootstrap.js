import * as Font from "expo-font"
import { DB } from "./db/db"

export async function bootstrap() {
  try {
    await Font.loadAsync({
      "open-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
      "open-regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    })
    await DB.init()
    console.log("DB Started")
  } catch (e) {
    console.log("Error", e)
  }
}