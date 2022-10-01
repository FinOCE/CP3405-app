import Notification from "components/Notification"
import { StyleSheet, Text, View } from "react-native"
import { Component } from "react"

export default class FlexDirectionBasics extends Component {
  render() {
    return (
      <>
        <Text style={styles.headingStyle}>Notifications</Text>

        <View style={styles.headingPadding}></View>

        <View>
          <div>
            {notifications.map(noti => (
              <Notification data={noti} />
            ))}
          </div>
        </View>
      </>
    )
  }
}

// Create example user to use in tests
const exampleUser: API.Vertex<User, "user"> = {
  id: "userId",
  label: "user",
  properties: {
    userId: [{ id: "idprop", value: "userId" }],
    dateOfBirth: [{ id: "dobprop", value: 0 }],
    firstName: [{ id: "firstprop", value: "First" }],
    lastName: [{ id: "lastprop", value: "Last" }],
    nickName: [{ id: "nickprop", value: "nick" }],
    role: [{ id: "roleprop", value: "Child" }]
  },
  type: "vertex"
}

// Create examples of different types of notifications
const childRequestAccept: Noti.InviteAccept = {
  type: "inviteAccept",
  parent: exampleUser,
  timestamp: 0,
  viewed: false
}
const childRequestDecline: Noti.InviteDecline = {
  type: "inviteDecline",
  parent: exampleUser,
  timestamp: 0,
  viewed: false
}
const newApp: Noti.AppAdd = {
  type: "appAdd",
  app: {
    id: "appId",
    label: "app",
    properties: {
      userId: [{ id: "userId", value: "NO_AFFILIATED_USER" }],
      appId: [{ id: "appId", value: "appId" }],
      name: [{ id: "name", value: "name" }],
      creator: [{ id: "creator", value: "creator" }],
      iconUrl: [{ id: "iconUrl", value: "iconUrl" }]
    },
    type: "vertex"
  },
  timestamp: 0,
  viewed: false
}
const childRequest: Noti.InviteAdd = {
  type: "inviteAdd",
  child: exampleUser,
  timestamp: 0,
  viewed: false
}

// Put all notifications into a single array of unknowns (since this is how the API will respond)
const notifications: Noti.Unknown[] = [
  childRequestAccept,
  childRequestDecline,
  newApp,
  childRequest
]

const styles = StyleSheet.create({
  headingStyle: {
    fontSize: 24,
    textAlign: "center"
  },
  headingPadding: {
    height: 50
  }
})
