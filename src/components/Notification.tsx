import NotificationManager from "managers/NotificationManager"

export type NotificationProps = {
  data: Noti.Unknown
}

export default function Notification(props: NotificationProps) {
  // Render child request accept notifications
  if (NotificationManager.isChildRequestAccept(props.data))
    return <div>{props.data.parent.id} accepted your request</div>

  // Render child request decline notifications
  if (NotificationManager.isChildRequestDecline(props.data))
    return <div>{props.data.parent.id} declined your request</div>

  // Render new app notifications
  if (NotificationManager.isNewApp(props.data))
    // TODO: Implement app notification once type created
    return <div>New app: {props.data.app.id}</div>

  // Render child request notifications
  if (NotificationManager.isChildRequest(props.data))
    return <div>{props.data.child.id} requested to be your child</div>

  return <div>Error: Unknown notification received</div>
}

/**
 * This is an example of how this can be used. You can basically copy this on
 * the actual page for now. Once you understand and implement this to the
 * notification page, feel free to remove this function since it isn't actually
 * needed. I should mention I haven't actually tested running this, but vscode
 * isn't giving me any errors and I think it should work lol. If it doesn't let
 * me know on Discord.
 */
export function ExampleNotificationList() {
  // Create example user to use in tests
  const exampleUser: API.Vertex<User, "user"> = {
    id: "userId",
    label: "user",
    properties: {
      userId: [{ id: "idprop", value: "userId" }],
      dateOfBirth: [{ id: "dobprop", value: 0 }],
      firstName: [{ id: "firstprop", value: "First" }],
      lastName: [{ id: "lastprop", value: "Last" }],
      nickName: [{ id: "nickprop", value: "nick" }]
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

  // Map over all notifications and render them depending on their type
  return (
    <div>
      {notifications.map(noti => (
        <Notification data={noti} />
      ))}
    </div>
  )
}
