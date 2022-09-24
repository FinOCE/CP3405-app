import NotificationManager from "managers/NotificationManager"
import { StyleSheet, Text, Button, View } from "react-native"

export type NotificationProps = {
  data: Noti.Unknown
}

export default function Notification(props: NotificationProps) {
  /**
   * Humanize a unix timestamp
   */
  const timestamp = new Date(props.data.timestamp).toLocaleDateString("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  // Render new invite notifications
  if (NotificationManager.isInviteAdd(props.data)) {
    const { firstName, lastName } = props.data.child.properties
    const name = firstName[0].value + " " + lastName[0].value

    return (
      <>
        <View style={styles.parentContainer}>
          <View style={styles.containerLeft}>
            <View style={styles.powderblue} />
            <Text style={styles.contactsName}>
              {name} requested to be your child<br></br>
              {timestamp}
            </Text>
          </View>
        </View>

        <View style={styles.parentContainer}>
          <View style={styles.acceptContainer}>
            <Button title="Accept" />
          </View>

          <View style={styles.declineContainer}>
            <Button title="Decline" />
          </View>
        </View>
      </>
    )
  }

  // Render invite accept notifications
  if (NotificationManager.isInviteAccept(props.data)) {
    const { firstName, lastName } = props.data.parent.properties
    const name = firstName[0].value + " " + lastName[0].value

    return (
      <>
        <View style={styles.parentContainer}>
          <View style={styles.containerLeft}>
            <View style={styles.powderblue} />
            <Text style={styles.contactsName}>
              {name} accepted your request<br></br>
              {timestamp}
            </Text>
          </View>
        </View>
        <View style={styles.contactsPadding}></View>
      </>
    )
  }

  // Render invite decline notifications
  if (NotificationManager.isInviteDecline(props.data)) {
    const { firstName, lastName } = props.data.parent.properties
    const name = firstName[0].value + " " + lastName[0].value

    return (
      <div>
        <View style={styles.parentContainer}>
          <View style={styles.containerLeft}>
            <View style={styles.powderblue} />
            <Text style={styles.contactsName}>
              {name} declined your request<br></br>
              {timestamp}
            </Text>
          </View>
        </View>
        <View style={styles.contactsPadding}></View>
      </div>
    )
  }

  // Render new app notifications
  if (NotificationManager.isAppAdd(props.data))
    return (
      <>
        <View style={styles.parentContainer}>
          <View style={styles.containerLeft}>
            <View style={styles.powderblue} />
            <Text style={styles.contactsName}>
              You have a new app request:{" "}
              {props.data.app.properties.name[0].value}
              <br></br>
              {timestamp}
            </Text>
          </View>
        </View>
        <View style={styles.contactsPadding}></View>
      </>
    )

  // Render app removed notifications
  if (NotificationManager.isAppRemove(props.data))
    return (
      <>
        <View style={styles.parentContainer}>
          <View style={styles.containerLeft}>
            <View style={styles.powderblue} />
            <Text style={styles.contactsName}>
              The app {props.data.app.properties.name[0].value} was removed from
              your list
              <br></br>
              {timestamp}
            </Text>
          </View>
        </View>
        <View style={styles.contactsPadding}></View>
      </>
    )

  return <Text>Error: Unknown notification received</Text>
}

const styles = StyleSheet.create({
  acceptContainer: {
    width: "30%",
    marginTop: "10px",
    marginLeft: "10%",
    marginRight: "10%"
  },
  declineContainer: {
    width: "30%",
    marginTop: "10px",
    marginLeft: "10%",
    marginRight: "10%"
  },
  parentContainer: {
    flexDirection: "row"
  },
  containerLeft: {
    flexDirection: "row",
    width: "75%"
  },
  containerRight: {
    width: "25%"
  },
  contactsName: {
    paddingLeft: 10,
    paddingTop: 12.5
  },
  sendButton: {
    fontWeight: "bold",
    paddingTop: 12.5
  },
  contactsPadding: {
    height: 15
  },
  powderblue: {
    height: 50,
    width: 50,
    backgroundColor: "powderblue",
    marginLeft: 10
  }
})
