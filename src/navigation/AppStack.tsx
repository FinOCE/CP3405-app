import { createStackNavigator } from "@react-navigation/stack"
import Home from "pages/Home"

const { Navigator, Screen } = createStackNavigator()

export default function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}
