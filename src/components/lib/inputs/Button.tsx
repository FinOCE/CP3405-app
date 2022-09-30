import {
  Button as ButtonBase,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native"

export type ButtonProps = {
  type?: ButtonTypes
  value: string
  onClick: () => void
  disabled?: boolean
}

export enum ButtonTypes {
  Inline
}

/**
 * A component to render some kind of error
 */
export default function Button(props: ButtonProps) {
  // Set button type
  let buttonStyle: StyleProp<ViewStyle>
  let textStyle: StyleProp<TextStyle>

  switch (props.type) {
    case ButtonTypes.Inline:
      buttonStyle = styles.inlineButton
      textStyle = styles.inlineButtonText
      break
    default:
      buttonStyle = styles.baseButton
      textStyle = styles.baseText
  }

  // Render component
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={buttonStyle}
      disabled={props.disabled ?? false}
    >
      <Text style={textStyle}>{props.value}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  baseButton: {
    backgroundColor: "#9b59b6",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  baseText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17
  },
  inlineButton: {},
  inlineButtonText: {
    color: "#9b59b6",
    fontWeight: "bold",
    padding: 5
  }
})
