import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { HomeStackParamList } from "navigation/AppStack"
import {
  SafeAreaView,
  Image,
  View,
  FlatList,
  StyleSheet,
  Text,
  ListRenderItem,
  ListRenderItemInfo,
  Button
} from "react-native"

// data sets temp
interface Apps {
  // any props that come into the component
  id: string
  title: string
  description: string
  usage: number
}

const DATA1: Apps[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First app",
    description: "this ia an app",
    usage: 12
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second app",
    description: "this ia an app",
    usage: 11
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third app",
    description: "this ia an app",
    usage: 10
  }
]

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

// app list
const Item = ({ title, description }: Apps) => (
  <View style={styles.item}>
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start"
      }}
    >
      <View style={{ width: "30%" }}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://imgs.search.brave.com/eJFTgf0voEVPLCVmiAGoWPlU79tkBEPb03Rx01U_ULQ/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5k/X2llYWJxQkVOZlh6/blhjRmhmMVFRSGFI/YSZwaWQ9QXBp"
          }}
        />
      </View>
      <View style={{ width: "70%" }}>
        '<Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{description}</Text>
      </View>
    </View>
  </View>
)

const AppList = () => {
  const renderItem = ({ item }: ListRenderItemInfo<Apps>) => <Item {...item} />

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA1.sort((a, b) => b.usage - a.usage)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}
// end of list code
// user list
const UserInfo = (user: User) => (
  <View style={styles.item}>
    <Text style={styles.title}>{user.userId}</Text>
    <Text style={styles.title}>{user.firstName}</Text>
  </View>
)

const UserInfoList = () => {
  const renderItem = ({ item }: ListRenderItemInfo<User>) => (
    <UserInfo {...item} />
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA2}
        renderItem={renderItem}
        keyExtractor={userInfo => userInfo.userId}
      />
    </SafeAreaView>
  )
}
//end of user list code

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

export default function Home({
  route,
  navigation
}: NativeStackScreenProps<HomeStackParamList, "Home">) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 5 }}>
        <UserInfoList />
        <AppList />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
