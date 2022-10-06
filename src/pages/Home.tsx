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
