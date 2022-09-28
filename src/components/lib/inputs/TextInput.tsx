import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput as TextInputBase
} from "react-native"

export type TextInputProps = {
  value: string | undefined
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>
  type?: TextInputTypes
  placeholder?: string
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
    <TextInputBase
      style={styles.textInput}
      keyboardType={keyboardType}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.setValue}
      secureTextEntry={isSecure}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 5,
    padding: 15,
    borderColor: "#bdc3c7",
    borderWidth: 2
  }
})
