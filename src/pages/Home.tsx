// import { NativeStackScreenProps } from "@react-navigation/native-stack"
// import { StatusBar } from "expo-status-bar"
// import { HomeStackParamList } from "navigation/AppStack"
// import {
//   SafeAreaView,
//   Image,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   ListRenderItem,
//   ListRenderItemInfo,
//   Button
// } from "react-native"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import App from "components/App"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"
import Page from "components/lib/layouts/Page"
import useUser from "hooks/useUser"
import { HomeStackParamList } from "navigation/AppStack"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Text from "components/lib/texts/Text"
import Center from "components/lib/layouts/Center"
import Heading from "components/lib/texts/Heading"

// interface Props {
//   // any props that come into the component
//   id: string
//   title: string
//   description: string
//   im: string
//   usage: number
// }

// const DATA: Props[] = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First app",
//     description: "this ia an app",
//     im: "https://imgs.search.brave.com/eJFTgf0voEVPLCVmiAGoWPlU79tkBEPb03Rx01U_ULQ/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5k/X2llYWJxQkVOZlh6/blhjRmhmMVFRSGFI/YSZwaWQ9QXBp",
//     usage: 12
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second app",
//     description: "this ia an app",
//     im: "https://imgs.search.brave.com/eJFTgf0voEVPLCVmiAGoWPlU79tkBEPb03Rx01U_ULQ/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5k/X2llYWJxQkVOZlh6/blhjRmhmMVFRSGFI/YSZwaWQ9QXBp",
//     usage: 11
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third app",
//     description: "this ia an app",
//     im: "https://imaging.nikon.com/lineup/coolpix/p/p7000/img/sample/img_01.jpg",
//     usage: 10
//   }
// ]

// const Item = ({ title, description, im }: Props) => (
//   <View style={styles.item}>
//     <View
//       style={{
//         flex: 1,
//         flexDirection: "row",
//         flexWrap: "wrap",
//         alignItems: "flex-start"
//       }}
//     >
//       <View style={{ width: "30%" }}>
//         <Image
//           style={styles.logo}
//           source={{
//             uri: im
//           }}
//         />
//       </View>
//       <View style={{ width: "70%" }}>
//         '<Text style={styles.title}>{title}</Text>
//         <Text style={styles.title}>{description}</Text>
//       </View>
//     </View>
//   </View>
// )

// const AppList = () => {
//   const renderItem = ({ item }: ListRenderItemInfo<Props>) => <Item {...item} />

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA.sort((a, b) => b.usage - a.usage)}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   )
// }

// const NavB = () => {
//   return
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16
//   },
//   title: {
//     fontSize: 30
//   },
//   logo: {
//     width: 100,
//     height: 100
//   }
// })

// export default function Home({
//   route,
//   navigation
// }: NativeStackScreenProps<HomeStackParamList, "Home">) {
//   return (
//     <View style={styles.container}>
//       <View>
//         <AppList />
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   )
// }

export default function Home({
  route,
  navigation
}: NativeStackScreenProps<HomeStackParamList, "Home">) {
  const [loading, setLoading] = useState(true)
  const [apps, setApps] = useState<AppResponse[]>([])

  useUser(user => {
    if (user !== null) {
      new RequestBuilder()
        .setMethod(HttpMethod.Get)
        .setRoute(`/users/${user.userId}/apps`)
        .on<undefined>(HttpStatus.Unauthorized, () => {})
        .on<undefined>(HttpStatus.Forbidden, () => {})
        .on<AppResponse[]>(HttpStatus.Ok, res => {
          setApps(res.data)
        })
        .submit()
        .finally(() => setLoading(false))
    }
  })

  return (
    <Page>
      <Heading>Your Apps</Heading>
      <Text>
        These apps have been recommended to you by your connected friends and
        family. Tap on them to launch them.
      </Text>
      <br />
      <br />
      <View style={styles.appGroup}>
        {loading ? (
          <Center>
            <Text>Loading apps...</Text>
          </Center>
        ) : apps.length === 0 ? (
          <Center>
            <Text>You haven't been recommended any apps yet!</Text>
          </Center>
        ) : (
          apps.map(app => <App key={app.app.id} {...app} />)
        )}
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  appGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 15
  }
})
