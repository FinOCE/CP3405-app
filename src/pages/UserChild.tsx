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
import Button from "components/lib/inputs/Button"
/*User search TEXT LINK AND QR CODE??? */

export default function Profile({
  route,
  navigation
}: NativeStackScreenProps<ProfileStackParamList, "Profile">) {
  const [active, setactive] = useState(true)
  const [loadingU, setLoadingU] = useState(true) // user
  const [loadingE, setLoadingE] = useState(true) // email
  const [loadingA, setLoadingA] = useState(true) // account

  const [user1, setuser] = useState<string>()
  const [users, setUsers] = useState<API.Vertex<User, "user">[]>([])
  const [newusers, setNewUsers] = useState<API.Vertex<User, "user">[]>([])
  const [error, setError] = useState<string>()

  const [email, setSearchQuery] = useState<string>()

  useUser(user => {
    if (user !== null) {
      setuser(user?.userId)
      new RequestBuilder()
        .setMethod(HttpMethod.Get)
        .setRoute(`/users/${user1}/parents`)
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
    setLoadingA(true)
    new RequestBuilder()
      .setRoute(`/users?email=${email}`)
      .setMethod(HttpMethod.Get)
      .on<undefined>(HttpStatus.Unauthorized, () => {})
      .on<undefined>(HttpStatus.Forbidden, () => {})
      .on<undefined>(HttpStatus.NotFound, () => {
        setError("Could not find a user with given email and password")
      })
      .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
        if (res.data[0].properties.role[0].value === "Child") {
          setError("This user doesn't need help with their device")
        } else {
          setNewUsers(res.data)
          setError(undefined)
        }
      })
      .submit()
      .finally(() => setLoadingE(false))
  }

  const addnewuser = async () => {
    new RequestBuilder()
      .setRoute(`/users/${newusers[0].id}/invites/${user1}`)
      .setMethod(HttpMethod.Put)
      .on<undefined>(HttpStatus.Unauthorized, () => {})
      .on<undefined>(HttpStatus.Forbidden, () => {})
      .on<undefined>(HttpStatus.NotFound, () => {})
      .on<Noti.InviteAdd[]>(HttpStatus.Ok, res => {})
      .submit()
      .finally(() => setLoadingA(false))
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
      <View>
        <TextInput
          placeholder="Email"
          value={email}
          setValue={setSearchQuery}
        />
        <br />
        <Center>
          <Button value="Search For Acount" onClick={datasetuseremails} />
        </Center>
      </View>
      <br />
      <View>
        {active ? (
          <></>
        ) : loadingE ? (
          <Center>
            <Text>Checking For Account...</Text>
          </Center>
        ) : error ? (
          <Center>{error && <ErrorDialogue message={error} />}</Center>
        ) : loadingA ? (
          <View style={styles.appContainer}>
            <View style={styles.personIcon} />
            <View style={styles.personDetails}>
              <Text>{newusers[0].properties.nickName[0].value}</Text>
              <Text>
                {newusers[0].properties.firstName[0].value +
                  " " +
                  newusers[0].properties.lastName[0].value}
              </Text>
            </View>
            <Button value="Send Invite" onClick={addnewuser} />
          </View>
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
  },
  appContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15
  },
  personDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1
  },
  personIcon: {
    height: 52,
    width: 52,
    borderRadius: 10,
    backgroundColor: "#bdc3c7"
  }
})
