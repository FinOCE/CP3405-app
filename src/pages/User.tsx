import { NativeStackScreenProps } from "@react-navigation/native-stack"
import User from "components/User"
import UserDisplay from "components/UserDisplay"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"
import Page from "components/lib/layouts/Page"
import useUser from "hooks/useUser"
import { ProfileStackParamList } from "navigation/AppStack"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Text from "components/lib/texts/Text"
import Center from "components/lib/layouts/Center"
import Heading from "components/lib/texts/Heading"

const Links = () => {
  return <View>{/* TEXT LINK AND QR CODE??? */}</View>
}

export default function Profile({
  route,
  navigation
}: NativeStackScreenProps<ProfileStackParamList, "Profile">) {
  const [loadingU, setLoadingU] = useState(true)
  const [users, setUsers] = useState<API.Vertex<User, "user">[]>([])

  useUser(user => {
    if (user !== null) {
      new RequestBuilder()
        .setMethod(HttpMethod.Get)
        .setRoute(`/users/${user?.userId}/children`)
        .on<undefined>(HttpStatus.Unauthorized, () => {})
        .on<undefined>(HttpStatus.Forbidden, () => {})
        .on<undefined>(HttpStatus.NotFound, () => {})
        .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
          setUsers(res.data)
        })
        .submit()
        .finally(() => setLoadingU(false))
    }
  })

  return (
    <Page>
      <UserDisplay></UserDisplay>
      <Heading>Your Connected Accounts</Heading>
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
          users.map(user => <User key={user.id} user={user} />)
        )}
      </View>
      <Links />
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
