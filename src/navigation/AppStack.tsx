import { createStackNavigator } from "@react-navigation/stack"
import Home from "pages/Home"
import Share from "pages/Share"

export type AppStackParamList = {
  Home: undefined
  Share: { url: string }
}

const { Navigator, Screen } = createStackNavigator<AppStackParamList>()

export default function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Share" component={Share} initialParams={{ url: 'https://example.com' }} />
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}
