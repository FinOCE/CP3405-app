import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import StorageManager from "managers/StorageManager"
import { HomeStackParamList } from "navigation/AppStack"
import { useEffect, useState } from "react"
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ListRenderItemInfo
} from "react-native"
// display current user

const UserDisplay = () => {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    StorageManager.get("@user").then(jwt => {
      const buffer = Buffer.from(jwt!.split(".")[1], "base64")
      console.log(buffer.toString())
      setUser(JSON.parse(buffer.toString()))
    })
  }, [])
  return (
    <View>
      {/* ADD USER IMAGE?? */}
      <Text>
        {user?.firstName} {user?.lastName}
      </Text>
    </View>
  )
}

// start of data sets
const DATA2: User[] = [
  {
    userId: "1",
    firstName: "First",
    lastName: "Last",
    nickName: "Nickname",
    dateOfBirth: 0
  },
  {
    userId: "2",
    firstName: "First",
    lastName: "Last",
    nickName: "Nickname",
    dateOfBirth: 0
  },
  {
    userId: "3",
    firstName: "First",
    lastName: "Last",
    nickName: "Nickname",
    dateOfBirth: 0
  }
]
// end of data sets
// user list
const UserInfo = (user: User) => (
  <View style={styles.item}>
    <Text style={styles.title}>
      {user.firstName} {user.lastName}
    </Text>
  </View>
)

const UserInfoList = () => {
  const renderItem = ({ item }: ListRenderItemInfo<User>) => (
    <UserInfo {...item} />
  )

  return (
    <FlatList
      data={DATA2}
      renderItem={renderItem}
      keyExtractor={userInfo => userInfo.userId}
    />
  )
}
//end of user list code

const Links = () => {
  return <View>{/* TEXT LINK AND QR CODE??? */}</View>
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 30
  },
  logo: {
    width: 100,
    height: 100
  }
})

export default function User({
  route,
  navigation
}: NativeStackScreenProps<HomeStackParamList, "Home">) {
  return (
    <View style={styles.container}>
      <View>
        <UserDisplay />
        <UserInfoList />
        <Links />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
