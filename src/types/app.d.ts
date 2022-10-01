type App = {
  userId: "NO_AFFILIATED_USER"
  appId: string
  name: string
  creator: string
  iconUrl: string
}

type AppEdge = {
  timestamp: number
  message?: string
}

type AppResponse = {
  app: API.Vertex<App, "app">
  edge: API.Edge<AppEdge, "hasApp">
}
