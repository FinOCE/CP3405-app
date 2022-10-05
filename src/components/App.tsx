import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import Heading from "./lib/texts/Heading"
import Text from "./lib/texts/Text"
import Launcher from "react-native-open-application"

export default function App(props: AppResponse) {
  // Launch app
  function launch() {
    const id = props.app.properties.appId[0].value
    Launcher.openApplication(id)
  }

  // Render component
  return (
    <TouchableOpacity style={styles.appContainer} onPress={launch}>
      <View style={styles.appDetails}>
        <Image
          source={{ uri: props.app.properties.iconUrl[0].value }}
          style={styles.appIcon}
        />
        <View style={styles.appText}>
          <Heading level={2}>{props.app.properties.name[0].value}</Heading>
          <Text>{props.app.properties.creator[0].value}</Text>
        </View>
      </View>
      {props.edge.properties.message && (
        <View style={styles.appMessage}>
          <Text>{props.edge.properties.message}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 15
  },
  appDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  appIcon: {
    height: 100,
    width: 100,
    borderRadius: 10
  },
  appMessage: {
    paddingVertical: 10
  },
  appText: {
    paddingBottom: 15
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
