import { NativeStackScreenProps } from "@react-navigation/native-stack"
import User from "components/User"
import UserDisplay from "components/UserDisplay"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"
import Page from "components/lib/layouts/Page"
import useUser from "hooks/useUser"
import { ProfileStackParamList } from "navigation/AppStack"
import { SetStateAction, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Text from "components/lib/texts/Text"
import Center from "components/lib/layouts/Center"
import Heading from "components/lib/texts/Heading"
import TextInput from "components/lib/inputs/TextInput"
import ErrorDialogue from "components/lib/texts/ErrorDialogue"

/*User search TEXT LINK AND QR CODE??? */

export default function Profile({
  route,
  navigation
}: NativeStackScreenProps<ProfileStackParamList, "Profile">) {
  const [loadingU, setLoadingU] = useState(true)
  const [loadingE, setLoadingE] = useState(true)
  const [active, setactive] = useState(true)

  const [users, setUsers] = useState<API.Vertex<User, "user">[]>([])
  const [newusers, setNewUsers] = useState<API.Vertex<User, "user">[]>([])
  const [error, setError] = useState<string>()

  const [email, setSearchQuery] = useState<string>()

  useUser(user => {
    if (user !== null) {
      new RequestBuilder()
        .setMethod(HttpMethod.Get)
        .setRoute(`/users/${user?.userId}/parents`)
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

  const datasetuseremails = async () => {
    setactive(false)
    setLoadingE(true)
    new RequestBuilder()
      .setRoute(`/users?email=${email}`)
      .setMethod(HttpMethod.Get)
      .on<undefined>(HttpStatus.Unauthorized, () => {})
      .on<undefined>(HttpStatus.Forbidden, () => {})
      .on<undefined>(HttpStatus.NotFound, () => {
        setError("Could not find a user with given email and password")
      })
      .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
        setNewUsers(res.data)
      })
      .submit()
      .finally(() => addnewuser)
  }

  const addnewuser = async () => {
    useUser(user => {
      if (user !== null) {
        new RequestBuilder()
          .setRoute(`/users/${newusers[0].id}/invites/${user?.userId}`)
          .setMethod(HttpMethod.Get)
          .on<undefined>(HttpStatus.Unauthorized, () => {})
          .on<undefined>(HttpStatus.Forbidden, () => {})
          .on<undefined>(HttpStatus.NotFound, () => {})
          .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
            setNewUsers(res.data)
          })
          .submit()
          .finally(() => setLoadingE(false))
      }
    })
  }

  const UserSearchbar = () => {
    return (
      <View>
        <TextInput
          placeholder="Email"
          value={email}
          setValue={setSearchQuery}
        />
        <button onClick={datasetuseremails}></button>
      </View>
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
          users.map(user => <User key={user.id} user={user} />)
        )}
      </View>
      <br />
      <br />
      <Heading>Add New Accounts</Heading>
      <UserSearchbar />

      <View>
        {active ? (
          <></>
        ) : loadingE ? (
          <Center>
            <Text>Checking For Account...</Text>
          </Center>
        ) : error ? (
          <Center>{error && <ErrorDialogue message={error} />}</Center>
        ) : (
          <Text>Account Added</Text>
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
