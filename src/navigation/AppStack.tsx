import { createStackNavigator } from "@react-navigation/stack"
import Home from "pages/Home"
import Settings from "pages/Settings"
import Notify from "pages/Notify"

export type AppStackParamList = {
  Home: undefined
  Settings: undefined
  Notify: undefined
}

const { Navigator, Screen } = createStackNavigator<AppStackParamList>()

export default function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Notify" component={Notify} />
      <Screen name="Home" component={Home} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  )
}
