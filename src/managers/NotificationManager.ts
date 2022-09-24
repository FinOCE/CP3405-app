export default class NotificationManager {
  /**
   * Check if a notification is a new invite
   */
  public static isInviteAdd(
    notification: Noti.Unknown
  ): notification is Noti.InviteAdd {
    return notification.type === "inviteAdd"
  }

  /**
   * Check if a notification is an invite being accepted
   */
  public static isInviteAccept(
    notification: Noti.Unknown
  ): notification is Noti.InviteAccept {
    return notification.type === "inviteAccept"
  }

  /**
   * Check if a notification is an invite being declined
   */
  public static isInviteDecline(
    notification: Noti.Unknown
  ): notification is Noti.InviteDecline {
    return notification.type === "inviteDecline"
  }

  /**
   * Check if a notification is a new app
   */
  public static isAppAdd(
    notification: Noti.Unknown
  ): notification is Noti.AppAdd {
    return notification.type === "appAdd"
  }

  /**
   * Check if a notification is an app being removed
   */
  public static isAppRemove(
    notification: Noti.Unknown
  ): notification is Noti.AppRemove {
    return notification.type === "appRemove"
  }
}
