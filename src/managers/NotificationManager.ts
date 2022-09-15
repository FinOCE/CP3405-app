import EventEmitter from "events"

export default class NotificationManager extends EventEmitter {
  private static instance?: NotificationManager

  /**
   * Get the singleton instance of the notification manager
   */
  public static getInstance(): NotificationManager {
    if (!NotificationManager.instance)
      NotificationManager.instance = new NotificationManager()
    return NotificationManager.instance
  }

  /**
   * Check if a notification is a child request accept
   */
  public static isChildRequestAccept(
    notification: Noti.Unknown
  ): notification is Noti.ChildRequestAccept {
    return notification.type === "childRequestAccept"
  }

  /**
   * Check if a notification is a child request decline
   */
  public static isChildRequestDecline(
    notification: Noti.Unknown
  ): notification is Noti.ChildRequestDecline {
    return notification.type === "childRequestDecline"
  }

  /**
   * Check if a notification is a new app
   */
  public static isNewApp(
    notification: Noti.Unknown
  ): notification is Noti.NewApp {
    return notification.type === "newApp"
  }

  /**
   * Check if a notification is a child request
   */
  public static isChildRequest(
    notification: Noti.Unknown
  ): notification is Noti.ChildRequest {
    return notification.type === "childRequest"
  }
}
