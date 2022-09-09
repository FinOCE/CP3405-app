import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/FontAwesome"
import Home from "pages/Home"
import Settings from "pages/Settings"

export type HomeStackParamList = {
  Home: undefined
}

function HomeStack() {
  const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}

// TODO: Remove comments on notification-related items once that page is created (not in this branch)

// export type NotificationsStackParamList = {
//   Notifications: undefined
// }

// function NotificationsStack() {
//   const { Navigator, Screen } =
//     createStackNavigator<NotificationsStackParamList>()
//   return (
//     <Navigator screenOptions={{ headerShown: false }}>
//       <Screen name="Notifications" component={Notifications} />
//     </Navigator>
//   )
// }

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
  // NotificationsStack: undefined
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
      {/* <Screen
        name="NotificationsStack"
        component={NotificationsStack}
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <Icon color={color} size={size} name={"bell"} />
          ),
          tabBarBadge: undefined // Fetch notification count to fill here (as a number)
        }}
      /> */}
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
      {/* For notifications, we can use options={{  }} to show unseen notification count */}
      {/* Icons may not work, if so follow guide on https://github.com/oblador/react-native-vector-icons to implement natively */}
    </Navigator>
  )
}
