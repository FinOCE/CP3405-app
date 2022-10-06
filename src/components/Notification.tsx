import NotificationManager from "managers/NotificationManager"
import { StyleSheet, View, Image } from "react-native"
import Button, { ButtonTypes } from "./lib/inputs/Button"
import Text from "./lib/texts/Text"

export type NotificationProps = {
  data: Noti.Unknown
}

export default function Notification(props: NotificationProps) {
  /**
   * Humanize a unix timestamp
   */
  const timestamp = new Date(props.data.timestamp).toLocaleDateString("en", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  // Render new invite notifications
  if (NotificationManager.isInviteAdd(props.data)) {
    const { firstName, lastName } = props.data.child.properties
    const name = firstName[0].value + " " + lastName[0].value

    return (
      <View style={styles.notiContainer}>
        <View style={styles.notiDetails}>
          <View style={styles.userImagePreview} />
          <View>
            <Text>{name} has requested to help manage your apps.</Text>
            <Text small>{timestamp}</Text>
          </View>
        </View>
        <View style={styles.notiActions}>
          <Button onClick={() => {}} value="Accept" />
          <Button
            onClick={() => {}}
            value="Decline"
            type={ButtonTypes.Secondary}
          />
        </View>
      </View>
    )
  }

  // Render invite accept notifications
  if (NotificationManager.isInviteAccept(props.data)) {
    const { firstName, lastName } = props.data.parent.properties
    const name = firstName[0].value + " " + lastName[0].value

    return (
      <View style={styles.notiContainer}>
        <View style={styles.notiDetails}>
          <View style={styles.userImagePreview} />
          <View>
            <Text>{name} has accepted your request to help them.</Text>
            <Text small>{timestamp}</Text>
          </View>
        </View>
      </View>
    )
  }

  // Render invite decline notifications
  if (NotificationManager.isInviteDecline(props.data)) {
    const { firstName, lastName } = props.data.parent.properties
    const name = firstName[0].value + " " + lastName[0].value

    return (
      <View style={styles.notiContainer}>
        <View style={styles.notiDetails}>
          <View style={styles.userImagePreview} />
          <View>
            <Text>{name} has declined your request to help them.</Text>
            <Text small>{timestamp}</Text>
          </View>
        </View>
      </View>
    )
  }

  // Render new app notifications
  if (NotificationManager.isAppAdd(props.data)) {
    return (
      <View style={styles.notiContainer}>
        <View style={styles.notiDetails}>
          <Image
            source={{ uri: props.data.app.properties.iconUrl[0].value }}
            style={styles.appIcon}
          />
          <View style={styles.notiText}>
            <Text>
              You have a new app! Check your home page to launch{" "}
              {props.data.app.properties.name[0].value}
            </Text>

            {props.data.message && <Text italic>{props.data.message}</Text>}

            <Text small>{timestamp}</Text>
          </View>
        </View>
      </View>
    )
  }

  // Render app removed notifications
  if (NotificationManager.isAppRemove(props.data)) {
    // TODO: Not implemented
  }

  // Render child remove notifications
  if (NotificationManager.isChildRemove(props.data)) {
    const { firstName, lastName } = props.data.parent.properties
    const name = firstName[0].value + " " + lastName[0].value

    // TODO: Not implemented
  }

  // Render parent remove notifications
  if (NotificationManager.isParentRemove(props.data)) {
    const { firstName, lastName } = props.data.child.properties
    const name = firstName[0].value + " " + lastName[0].value

    // TODO: Not implemented
  }

  return <Text>Error: Unknown notification received</Text>
}

const styles = StyleSheet.create({
  notiContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 15
  },
  notiDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  notiText: {
    flex: 1,
    flexWrap: "wrap",
    gap: 5
  },
  userImagePreview: {
    height: 52,
    width: 52,
    backgroundColor: "#bdc3c7",
    borderRadius: 10
  },
  appIcon: {
    height: 52,
    width: 52,
    borderRadius: 10
  },
  notiActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15
  }
})
