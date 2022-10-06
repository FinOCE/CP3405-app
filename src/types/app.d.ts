type App = {
  userId: "NO_AFFILIATED_USER"
  appId: string
  name: string
  creator: string
  iconUrl: string
  // usage: number
}

type AppEdge = {
  message: string
  timestamp: number
}

type AppEdge = {
  timestamp: number
  message?: string
}

type AppResponse = {
  app: API.Vertex<App, "app">
  edge: API.Edge<AppEdge, "hasApp">
}
