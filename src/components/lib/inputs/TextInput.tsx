import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput as TextInputBase,
  View
} from "react-native"

export type TextInputProps = {
  value: string | undefined
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>
  type?: TextInputTypes
  placeholder?: string
  label?: string
}

export enum TextInputTypes {
  Email,
  Password,
  Basic
}

export default function TextInput(props: TextInputProps) {
  // Set keyboard type
  let keyboardType: KeyboardTypeOptions
  let isSecure = false

  switch (props.type) {
    case TextInputTypes.Email:
      keyboardType = "email-address"
      break
    case TextInputTypes.Password:
      isSecure = true
    default:
      keyboardType = "default"
  }

  // Render component
  return (
    <View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInputBase
        style={styles.textInput}
        keyboardType={keyboardType}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.setValue}
        secureTextEntry={isSecure}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginTop: 5,
    color: "grey"
  },
  required: {
    color: "#e74c3c"
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 5,
    padding: 15,
    borderColor: "#bdc3c7",
    borderWidth: 2,
    placeholderTextColor: "grey"
  }
})
