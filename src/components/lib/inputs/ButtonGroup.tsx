import { Dispatch, SetStateAction } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export type ButtonGroupOption<T> = {
  label: string
  value: T
}

export type ButtonGroupProps<T> = {
  options: ButtonGroupOption<T>[]
  value: T
  setValue: Dispatch<SetStateAction<T>>
  vertical?: boolean
}

export default function ButtonGroup<T>(props: ButtonGroupProps<T>) {
  return (
    <View
      style={
        props.vertical
          ? styles.buttonGroupContainerVertical
          : styles.buttonGroupContainer
      }
    >
      {props.options.map(option => (
        <TouchableOpacity
          key={option.label}
          style={
            option.value === props.value
              ? styles.buttonGroupOptionSelected
              : styles.buttonGroupOption
          }
          onPress={() => props.setValue(option.value)}
        >
          <Text style={styles.buttonGroupOptionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonGroupContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10
  },
  buttonGroupContainerVertical: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 10
  },
  buttonGroupOption: {
    padding: 15,
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5
  },
  buttonGroupOptionSelected: {
    padding: 15,
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",
    borderColor: "#9b59b6",
    borderWidth: 2,
    borderRadius: 5
  },
  buttonGroupOptionText: {
    fontWeight: "bold"
  }
})
