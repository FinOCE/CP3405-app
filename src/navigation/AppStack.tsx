import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/FontAwesome"
import Home from "pages/Home"
import HomeChild from "pages/HomeChild"
import Share from "pages/Share"
import Settings from "pages/Settings"
import Notify from "pages/Notify"
import { useEffect, useState } from "react"
import StorageManager from "managers/StorageManager"
import UserChild from "pages/UserChild"
import User from "pages/User"
import { Buffer } from "buffer"

export type HomeStackParamList = {
  Home: undefined
  Share: Omit<App, "userId">
  User: undefined
}

function HomeStack() {
  const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

  const [user, setUser] = useState<User>()

  useEffect(() => {
    // Fetch user from storage
    StorageManager.get("@user").then(userDeserialized => {
      const buffer = Buffer.from(userDeserialized!.split(".")[1], "base64")
      setUser(JSON.parse(buffer.toString()))
    })
  }, [])

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Home"
        component={user?.role === "Child" ? HomeChild : Home}
      />
      <Screen name="Share" component={Share} />
      <Screen
        name="User"
        component={user?.role === "Child" ? UserChild : User}
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
          tabBarBadge: undefined // TODO: Fetch notification count to fill here (as a number)
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
    </Navigator>
  )
}
