declare namespace API {
  /**
   * The format of a response from the API
   */
  type Response<T> = {
    data: T
    metadata: {
      "request-charge": number
      "server-time": number
    }
  }

  /**
   * The valid types of a value from the database
   */
  type Generic = boolean | number | string

  /**
   * The format of a response from the database
   */
  type GremlinResponse<T> = {
    _items: T
    length: number
    attributes: {
      "x-ms-status-code": number
      "x-ms-activity-id": string
      "x-ms-request-charge": number
      "x-ms-total-request-charge": number
      "x-ms-server-time-ms": number
      "x-ms-total-server-time-ms": number
    }
  }

  /**
   * The format of an edge from the database
   */
  type Edge<T = Record<string, Generic>, L = string> = {
    type: "edge"
    id: string
    label: L
    inVLabel: string
    outVLabel: string
    inV: string
    outV: string
    properties: T
  }

  /**
   * The format of properties within a vertex from the database
   */
  type VertexProperties<T> = {
    [K in keyof T]: {
      id: string
      value: T[K]
    }
  }

  /**
   * The format of a vertex from the database
   */
  type Vertex<T = Record<string, Generic>, L = string> = {
    type: "vertex"
    id: string
    label: L
    properties: VertexProperties<T>
  }

  /**
   * Response type for requests returning a user token
   */
  type Token = {
    token: string
  }

  /**
   * Response type for requests returning an error
   */
  type Error = {
    message: string
  }
}
