import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import Heading from "./lib/texts/Heading"
import Text from "./lib/texts/Text"

export default function App(props: AppResponse) {
  // Launch app
  function launch() {
    console.log("Launch app or open play store!")
  }

  // Render component
  return (
    <TouchableOpacity style={styles.appContainer} onPress={launch}>
      <View style={styles.appDetails}>
        <Image
          source={{ uri: props.app.properties.iconUrl[0].value }}
          style={styles.appIcon}
        />
        <View>
          <Heading>{props.app.properties.name[0].value}</Heading>
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
    width: 100
  },
  appMessage: {
    paddingVertical: 10
  }
})
