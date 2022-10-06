import { StyleSheet, Text as TextBase } from "react-native"

export type TextProps = {
  children: React.ReactNode
  small?: boolean
}

export default function Text(props: TextProps) {
  return (
    <TextBase style={props.small ? styles.small : undefined}>
      {props.children}
    </TextBase>
  )
}

const styles = StyleSheet.create({
  small: {
    fontSize: 12
  }
})
