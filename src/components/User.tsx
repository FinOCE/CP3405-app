import { StyleSheet, TouchableOpacity, View } from "react-native"
import Heading from "./lib/texts/Heading"
import Text from "./lib/texts/Text"

export default function User(props: UserResponse) {
  // Open app
  function Open() {
    console.log("open app view to that related to selceted user")
  }

  // Render component
  return (
    <TouchableOpacity style={styles.appContainer} onPress={Open}>
      <View style={styles.appDetails}>
        <View>
          <Heading>{props.user.properties.nickName[0].value}</Heading>
          <Text>
            {props.user.properties.firstName[0].value +
              " " +
              props.user.properties.lastName[0].value}
          </Text>
        </View>
      </View>
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
