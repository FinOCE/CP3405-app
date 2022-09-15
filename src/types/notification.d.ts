declare namespace Noti {
  /**
   * All different types of notifications
   */
  type Type =
    | "childRequestAccept"
    | "childRequestDecline"
    | "newApp"
    | "childRequest"

  /**
   * Base type for notifications
   */
  type Base = {
    type: Type
  }

  /**
   * Notification where you don't know what type it is yet
   */
  type Unknown = Base & Record<string, any>

  /**
   * Notification for someone being accepted as someone's child
   */
  type ChildRequestAccept = Base & {
    parent: API.Vertex<User, "user">
  }

  /**
   * Notification for someone being decliend as someone's child
   */
  type ChildRequestDecline = Base & {
    parent: API.Vertex<User, "user">
  }

  /**
   * Notification for a parent who has had a new app recommended to them
   */
  type NewApp = Base & {
    app: API.Vertex // TODO: Implement type for app
  }

  /**
   * Notification for a parent where someone wants to be saved as their child
   */
  type ChildRequest = Base & {
    child: API.Vertex<User, "user">
  }
}
