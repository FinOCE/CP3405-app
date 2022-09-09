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

interface Props {
  // any props that come into the component
  id: string
  title: string
  description: string
  usage: number
}

const DATA: Props[] = [
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

const Item = ({ title, description }: Props) => (
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

const App = () => {
  const renderItem = ({ item }: ListRenderItemInfo<Props>) => <Item {...item} />

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA.sort((a, b) => b.usage - a.usage)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const NavB = () => {
  return
}

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
      <App />
      <StatusBar style="auto" />
    </View>
  )
}
