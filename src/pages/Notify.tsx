import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"
import Center from "components/lib/layouts/Center"
import Page from "components/lib/layouts/Page"
import Heading from "components/lib/texts/Heading"
import Text from "components/lib/texts/Text"
import Notification from "components/Notification"
import useUser from "hooks/useUser"
import { useState } from "react"
import { StyleSheet, View } from "react-native"

export default function Notify() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<Noti.Unknown[]>([])

  useUser(user => {
    if (user !== null) {
      new RequestBuilder()
        .setRoute(`/users/${user.userId}/notifications`)
        .setMethod(HttpMethod.Get)
        .on<undefined>(HttpStatus.Unauthorized, () => {})
        .on<undefined>(HttpStatus.Forbidden, () => {})
        .on<Noti.Unknown[]>(HttpStatus.Ok, res => {
          setNotifications(res.data.sort((a, b) => b.timestamp - a.timestamp))
        })
        .submit()
        .finally(() => setLoading(false))
    }
  })

  return (
    <Page>
      <Heading>Notifications</Heading>

      {/* Notifications */}
      <View style={styles.notiList}>
        {loading ? (
          <Center>
            <Text>Loading notifications...</Text>
          </Center>
        ) : notifications.length === 0 ? (
          <Center>
            <Text>You have no notifications</Text>
          </Center>
        ) : (
          notifications.map(notification => (
            <Notification key={notification.timestamp} data={notification} />
          ))
        )}
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  notiList: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
    maxWidth: "100%"
  }
})
