import { Searchbar } from "react-native-paper"
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

/*User search TEXT LINK AND QR CODE??? */

export default function Profile({
  route,
  navigation
}: NativeStackScreenProps<ProfileStackParamList, "Profile">) {
  const [loadingU, setLoadingU] = useState(true)
  const [loadingE, setLoadingE] = useState(false)
  const [users, setUsers] = useState<UserResponse[]>([])
  const [newusers, setNewUsers] = useState<UserResponse[]>([])

  const [email, setSearchQuery] = useState("")

  useUser(user => {
    if (user !== null) {
      new RequestBuilder()
        .setMethod(HttpMethod.Get)
        .setRoute(`/users/${user?.userId}/parents`)
        .on<undefined>(HttpStatus.Unauthorized, () => {})
        .on<undefined>(HttpStatus.Forbidden, () => {})
        .on<undefined>(HttpStatus.NotFound, () => {})
        .on<UserResponse[]>(HttpStatus.Ok, res => {
          setUsers(res.data)
        })
        .submit()
        .finally(() => setLoadingU(false))
    }
  })

  const datasetuseremails = async () => {
    new RequestBuilder()
      .setRoute(`/users?email=${email}`)
      .setMethod(HttpMethod.Get)
      .on<undefined>(HttpStatus.Unauthorized, () => {})
      .on<undefined>(HttpStatus.Forbidden, () => {})
      .on<undefined>(HttpStatus.NotFound, () => {})
      .on<UserResponse[]>(HttpStatus.Ok, res => {
        setNewUsers(res.data)
      })
      .submit()
      .finally(() => setLoadingE(true))
  }

  const UserSearchbar = () => {
    const onChangeSearch = (query: React.SetStateAction<string>) =>
      setSearchQuery(query)

    return (
      <Searchbar
        placeholder="Email"
        onChangeText={onChangeSearch}
        value={email}
      />
    )
  }

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
          users.map(user => <User key={user.user.id} {...user} />)
        )}
      </View>
      <br />
      <br />
      <Heading>Add New Accounts</Heading>
      <UserSearchbar />
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
