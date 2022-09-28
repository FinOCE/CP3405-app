import { StyleSheet, Text as TextBase } from "react-native"

export type TextProps = {
  children: string
}

export default function Text(props: TextProps) {
  return <TextBase style={styles.text}>{props.children}</TextBase>
}

const styles = StyleSheet.create({
  text: {}
})
