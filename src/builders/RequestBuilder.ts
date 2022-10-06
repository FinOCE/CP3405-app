import StorageManager from "managers/StorageManager"
import fetch from "node-fetch"

export default class RequestBuilder {
  public route: string = "/"
  public method: HttpMethod = HttpMethod.Get
  public body?: Record<any, any>
  private handlers: Handlers = {}

  public constructor() {}

  /**
   * Set the route of the request
   */
  public setRoute(route: string): this {
    this.route = route
    return this
  }

  /**
   * Set the method of the request
   */
  public setMethod(method: HttpMethod): this {
    this.method = method
    return this
  }

  /**
   * Set the body of the request
   */
  public setBody(body: Record<any, any>): this {
    this.body = body
    return this
  }

  /**
   * Add handler for given status
   */
  public on<T = any>(
    status: HttpStatus,
    callback: (body: API.Response<T>) => void
  ): this {
    this.handlers[status] = callback
    return this
  }

  /**
   * Submit the request to the API
   */
  public async submit(): Promise<void> {
    const auth = await StorageManager.get("@user")

    await fetch("https://cp3405-api.azurewebsites.net" + this.route, {
      method: HttpMethod[this.method].toUpperCase(),
      body: this.body ? JSON.stringify(this.body) : undefined,
      headers: auth ? { authorization: `Bearer ${auth}` } : undefined
    })
      .then(res => {
        console.log(res)
        return res
      })
      .then(async res => ({ status: res.status, body: await res.json() }))
      .then(({ status, body }) => {
        if (this.handlers[status as HttpStatus])
          this.handlers[status as HttpStatus]!(body)
        else throw `Unexpected response: ${status}\n${JSON.stringify(body)}`
      })
  }
}

export enum HttpMethod {
  Get,
  Post,
  Put,
  Patch,
  Delete
}

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
  NotImplemented = 501
}

export type Handlers = {
  [K in HttpStatus]?: (body: API.Response<any>) => void
}
