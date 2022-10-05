import { Image, StyleSheet, Text, TouchableOpacity } from "react-native"
import Launcher from "react-native-open-application"

export type AppProps = {
  app: API.Vertex<App, "app">
  edge: API.Edge<AppEdge, "hasApp">
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        const id = props.app.properties.appId[0].value
        Launcher.openApplication(id)
      }}
    >
      <Image
        source={{ uri: props.app.properties.iconUrl[0].value }}
        style={styles.appIcon}
      />
      <Text>{props.app.properties.name[0].value}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appIcon: {
    width: 100,
    height: 100
  }
})

/**
 * Display an example app using existing data (for testing only)
 */
export function ExampleApp() {
  const data: {
    app: API.Vertex<App, "app">
    edge: API.Edge<AppEdge, "hasApp">
  } = {
    app: {
      type: "vertex",
      id: "com.psyonix.RL2D",
      label: "app",
      properties: {
        userId: [{ id: "userId", value: "NO_AFFILIATED_USER" }],
        appId: [{ id: "appId", value: "com.Psyonix.RL2D" }],
        name: [{ id: "name", value: "Rocket League Sideswipe" }],
        creator: [{ id: "creator", value: "Psyonix Studios" }],
        iconUrl: [
          {
            id: "iconUrl",
            value:
              "https://play-lh.googleusercontent.com/ski1s0myO8SMx7hskLG-3s_mjw478BUPbBNZFhMZcGz0eeAt8mxm0DtQz6fpvmUnVLA=w240-h480-rw"
          }
        ]
      }
    },
    edge: {
      type: "edge",
      id: "edge",
      label: "hasApp",
      inVLabel: "app",
      outVLabel: "user",
      inV: "app",
      outV: "user",
      properties: {
        message: "hello world",
        timestamp: 0
      }
    }
  }

  return <App {...data} />
}
