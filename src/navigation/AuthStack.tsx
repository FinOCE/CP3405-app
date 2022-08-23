import { createStackNavigator } from "@react-navigation/stack"
import Login from "pages/Login"
import Register from "pages/Register"

export type AuthStackParamList = {
  Register: undefined
  Login: undefined
}

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>()

export default function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Register" component={Register} />
      <Screen name="Login" component={Login} />
    </Navigator>
  )
}
