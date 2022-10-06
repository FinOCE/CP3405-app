import { NativeStackScreenProps } from "@react-navigation/native-stack"
import App from "components/App"
import User from "components/User"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"
import Page from "components/lib/layouts/Page"
import useUser from "hooks/useUser"
import { HomeStackParamList } from "navigation/AppStack"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Text from "components/lib/texts/Text"
import Center from "components/lib/layouts/Center"
import Heading from "components/lib/texts/Heading"

export default function Home({
  route,
  navigation
}: NativeStackScreenProps<HomeStackParamList, "Home">) {
  const [loadingU, setLoadingU] = useState(true)
  const [apps, setApps] = useState<Record<string, AppResponse[]>>({})
  const [users, setUsers] = useState<API.Vertex<User, "user">[]>([])

  useUser(user => {
    if (user !== null) {
      new RequestBuilder()
        .setMethod(HttpMethod.Get)
        .setRoute(`/users/${user?.userId}/parents`) // get list of users
        .on<undefined>(HttpStatus.Unauthorized, () => {})
        .on<undefined>(HttpStatus.Forbidden, () => {})
        .on<undefined>(HttpStatus.NotFound, () => {})
        .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
          setUsers(res.data)
          console.log(res.data)

          for (const parent of res.data) {
            new RequestBuilder()
              .setMethod(HttpMethod.Get)
              .setRoute(`/users/${parent.id}/apps`) // gets list of app
              .on<undefined>(HttpStatus.Unauthorized, () => {})
              .on<undefined>(HttpStatus.Forbidden, () => {})
              .on<AppResponse[]>(HttpStatus.Ok, res => {
                setApps({ ...apps, [parent.id]: res.data })
                console.log(res.data)
              })
              .submit()
          }
        })
        .submit()
        .finally(() => setLoadingU(false))
    }
  })

  return (
    <Page>
      <Heading>Your Connected Accounts</Heading>
      <Text>
        These are your connected friends and familys Accounts. Tap on them to
        view there apps them.
      </Text>
      <br />
      <br />
      <View style={styles.appGroup}>
        {loadingU ? (
          <Center>
            <Text>Loading Users...</Text>
          </Center>
        ) : users.length === 0 ? (
          <Center>
            <Text>
              You haven't connected to any friends and familys Accounts yet!
            </Text>
          </Center>
        ) : (
          users.map(user => (
            <View key={user.id}>
              <User key={user.id} user={user} />
              <View>
                {apps[user.id] &&
                  apps[user.id].map(app => <App {...app} key={app.app.id} />)}
              </View>
            </View>
          ))
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
