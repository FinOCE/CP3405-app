import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/FontAwesome"
import Home from "pages/Home"
import Notify from "pages/Notify"
import Share from "pages/Share"
import Settings from "pages/Settings"
import User from "pages/user"

export type HomeStackParamList = {
  Home: undefined
  Share: { url: string }
  User: undefined
  UserChild: undefined
  HomeChild: undefined
}

function HomeStack() {
  const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="User" component={User} />
      <Screen name="Home" component={Home} />
      <Screen
        name="Share"
        component={Share}
        initialParams={{ url: "https://example.com" }}
      />
    </Navigator>
  )
}

export type NotificationsStackParamList = {
  Notify: undefined
}

function NotificationsStack() {
  const { Navigator, Screen } =
    createStackNavigator<NotificationsStackParamList>()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Notify" component={Notify} />
    </Navigator>
  )
}

export type SettingsStackParamList = {
  Settings: undefined
}

function SettingsStack() {
  const { Navigator, Screen } = createStackNavigator<SettingsStackParamList>()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Settings" component={Settings} />
    </Navigator>
  )
}

export type AppStackProps = {
  user: User
}

export type AppStackParamList = {
  HomeStack: undefined
  NotificationsStack: undefined
  SettingsStack: undefined
}

export default function AppStack({ user }: AppStackProps) {
  const { Navigator, Screen } = createBottomTabNavigator<AppStackParamList>()
  // TODO: Switch between parent and child page stacks depending on role of user (not available in this branch yet)
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <Icon color={color} size={size} name={"home"} />
          )
        }}
      />
      <Screen
        name="NotificationsStack"
        component={NotificationsStack}
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <Icon color={color} size={size} name={"bell"} />
          ),
          tabBarBadge: undefined // Fetch notification count to fill here (as a number)
        }}
      />
      <Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <Icon color={color} size={size} name={"gear"} />
          )
        }}
      />
      {/* Icons may not work, if so follow guide on https://github.com/oblador/react-native-vector-icons to implement natively */}
    </Navigator>
  )
}
