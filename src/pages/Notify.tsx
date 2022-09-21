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
const childRequestAccept: Noti.ChildRequestAccept = {
  type: "childRequestAccept",
  parent: exampleUser
}
const childRequestDecline: Noti.ChildRequestDecline = {
  type: "childRequestDecline",
  parent: exampleUser
}
const newApp: Noti.NewApp = {
  type: "newApp",
  app: { id: "appId", label: "app", properties: {}, type: "vertex" }
}
const childRequest: Noti.ChildRequest = {
  type: "childRequest",
  child: exampleUser
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
