import NotificationManager from "managers/NotificationManager"
import { StyleSheet, Text, Button, View } from "react-native"

export type NotificationProps = {
  data: Noti.Unknown
}

const date = new Date(),
    options: any = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    const time = date.toLocaleDateString("en", options);

export default function Notification(props: NotificationProps) {
  // Render child request accept notifications
  if (NotificationManager.isChildRequestAccept(props.data))
    return (
      <>
        <View style={styles.parentContainer}>
          <View style={styles.containerLeft}>
            <View style={styles.powderblue} />
            <Text style={styles.contactsName}>
              {props.data.parent.id} accepted your request<br></br>
              {time}
            </Text>
          </View>
        </View>
        <View style={styles.contactsPadding}></View>
      </>
    )

  // Render child request decline notifications
  if (NotificationManager.isChildRequestDecline(props.data))
    return (
      <div>
        <View style={styles.parentContainer}>
          <View style={styles.containerLeft}>
            <View style={styles.powderblue} />
            <Text style={styles.contactsName}>
              {props.data.parent.id} declined your request<br></br>
              {time}
            </Text>
          </View>
        </View>
        <View style={styles.contactsPadding}></View>
      </div>
    )

  // Render new app notifications
  if (NotificationManager.isNewApp(props.data))
    // TODO: Implement app notification once type created
    return (
      <>
        <View style={styles.parentContainer}>
          <View style={styles.containerLeft}>
            <View style={styles.powderblue} />
            <Text style={styles.contactsName}>
              You have a new app request: {props.data.app.id}<br></br>
              {time}
            </Text>
          </View>
        </View>
        <View style={styles.contactsPadding}></View>
      </>
    )

  // Render child request notifications
  if (NotificationManager.isChildRequest(props.data))
    return (
      <>
        <View style={styles.parentContainer}>
          <View style={styles.containerLeft}>
            <View style={styles.powderblue} />
            <Text style={styles.contactsName}>
              {props.data.child.id} requested to be your child<br></br>
              {time}
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
