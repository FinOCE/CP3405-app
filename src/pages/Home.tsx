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
  im: string
  usage: number
}

const DATA: Props[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First app",
    description: "this ia an app",
    im: "https://imgs.search.brave.com/eJFTgf0voEVPLCVmiAGoWPlU79tkBEPb03Rx01U_ULQ/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5k/X2llYWJxQkVOZlh6/blhjRmhmMVFRSGFI/YSZwaWQ9QXBp",
    usage: 12
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second app",
    description: "this ia an app",
    im: "https://imgs.search.brave.com/eJFTgf0voEVPLCVmiAGoWPlU79tkBEPb03Rx01U_ULQ/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5k/X2llYWJxQkVOZlh6/blhjRmhmMVFRSGFI/YSZwaWQ9QXBp",
    usage: 11
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third app",
    description: "this ia an app",
    im: "https://imaging.nikon.com/lineup/coolpix/p/p7000/img/sample/img_01.jpg",
    usage: 10
  }
]

const Item = ({ title, description, im }: Props) => (
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
            uri: im
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
      <View style={{ flex: 5 }}>
        <AppList />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start"
          }}
        >
          <View style={{ width: "30%" }}>
            <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
              <Button
                title="HomeChild"
                onPress={() => navigation.navigate("HomeChild")}
              />
            </View>
          </View>
          <View style={{ width: "30%" }}>
            <View style={{ width: 100, height: 100, backgroundColor: "blue" }}>
              <Button
                title="Home"
                onPress={() => navigation.navigate("Home")}
              />
            </View>
          </View>
          <View style={{ width: "30%" }}>
            <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
              <Button
                title="Settings"
                onPress={() => navigation.navigate("Settings")}
              />
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
