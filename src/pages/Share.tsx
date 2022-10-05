import { useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "navigation/AppStack"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"
import useUser from "hooks/useUser"
import Heading from "components/lib/texts/Heading"
import Text from "components/lib/texts/Text"
import Page from "components/lib/layouts/Page"
import TextInput from "components/lib/inputs/TextInput"
import Center from "components/lib/layouts/Center"
import { Image, StyleSheet, View } from "react-native"
import Button, { ButtonTypes } from "components/lib/inputs/Button"

export default function Share({
  route,
  navigation
}: NativeStackScreenProps<HomeStackParamList, "Share">) {
  const [parents, setParents] = useState<API.Vertex<User, "user">[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string>()
  const [sent, setSent] = useState<Record<string, true>>({})

  useUser(user => {
    if (user !== null) {
      // Fetch parents from API
      new RequestBuilder()
        .setRoute(`/users/${user.userId}/parents`)
        .setMethod(HttpMethod.Get)
        .on<undefined>(HttpStatus.Unauthorized, () => {})
        .on<undefined>(HttpStatus.Forbidden, () => {})
        .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
          setParents(res.data)
          setLoading(false)
        })
        .submit()
    }
  })

  return (
    <Page>
      {/* Heading and description */}
      <Heading>Share App</Heading>
      <Text>
        You can share this app with anyone you have connected to. This app will
        show on their home page for easy access and installation.
      </Text>

      {/* App preview */}
      <View style={styles.appContainer}>
        <Image source={{ uri: route.params.iconUrl }} style={styles.appIcon} />
        <View style={styles.appDetails}>
          <Heading level={2}>{route.params.name}</Heading>
          <Text>{route.params.creator}</Text>
        </View>
      </View>

      {/* Message */}
      <TextInput
        value={message}
        setValue={setMessage}
        placeholder="Describe what the app is for (Optional)"
        label="Message"
      />

      {/* Connections */}
      <Heading level={2}>Connections</Heading>
      {loading ? (
        <Center>
          <Text>Loading users...</Text>
        </Center>
      ) : parents.length === 0 ? (
        <Center>
          <Text>You haven't connected with anyone who needs help!</Text>
        </Center>
      ) : (
        parents.map(parent => {
          const { firstName, lastName } = parent.properties
          const name = firstName[0].value + " " + lastName[0].value

          return (
            <View style={styles.appContainer} key={parent.id}>
              <View style={styles.personIcon} />
              <View style={styles.personDetails}>
                <Text bold>{parent.properties.nickName[0].value}</Text>
                <Text>{name}</Text>
              </View>
              {sent[parent.id] ? (
                <Button
                  value="Send"
                  type={ButtonTypes.Disabled}
                  onClick={() => {}}
                />
              ) : (
                <Button
                  value="Send"
                  onClick={() => {
                    new RequestBuilder()
                      .setRoute(
                        `/users/${parent.id}/apps/${route.params.appId}`
                      )
                      .setMethod(HttpMethod.Put)
                      .setBody({
                        message,
                        name: route.params.name,
                        creator: route.params.creator,
                        iconUrl: route.params.iconUrl
                      })
                      .on<undefined>(HttpStatus.Unauthorized, () => {})
                      .on<undefined>(HttpStatus.Forbidden, () => {})
                      .on<undefined>(HttpStatus.BadRequest, () => {})
                      .on<undefined>(HttpStatus.Ok, () => {
                        setSent({ ...sent, [parent.id]: true })
                      })
                      .submit()
                  }}
                />
              )}
            </View>
          )
        })
      )}
    </Page>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15
  },
  appIcon: {
    height: 100,
    width: 100,
    borderRadius: 10
  },
  appDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 10
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
