import { createStackNavigator } from "@react-navigation/stack"
import Home from "pages/Home"

export type AppStackParamList = {
  Home: undefined
}

const { Navigator, Screen } = createStackNavigator<AppStackParamList>()

export default function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}
