import { StyleSheet, Text, View } from "react-native"

export type ErrorDialogueProps = {
  message: string
}

/**
 * A component to render some kind of error
 */
export default function ErrorDialogue(props: ErrorDialogueProps) {
  return (
    <View style={styles.errorDialogue}>
      <View style={styles.errorDialogue__box} />
      <Text style={styles.errorDialogue__message}>{props.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorDialogue: {
    margin: 15,
    backgroundColor: "#ecf0f1",
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 50,
    shadowOpacity: 0.2,
    overflow: "hidden"
  },
  errorDialogue__box: {
    backgroundColor: "#e74c3c",
    height: 5
  },
  errorDialogue__message: {
    padding: 10,
    textAlign: "center"
  }
})
