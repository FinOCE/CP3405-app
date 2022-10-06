import { StyleSheet, Text as TextBase } from "react-native"

export type TextProps = {
  children?: React.ReactNode
  small?: boolean
  bold?: boolean
  italic?: boolean
}

export default function Text(props: TextProps) {
  // Build style
  let style = {}

  if (props.small) style = Object.assign(style, styles.small)
  if (props.bold) style = Object.assign(style, styles.bold)
  if (props.italic) style = Object.assign(style, styles.italic)

  // Render text
  return <TextBase style={style}>{props.children}</TextBase>
}

const styles = StyleSheet.create({
  small: {
    fontSize: 12
  },
  bold: {
    fontWeight: "bold"
  },
  italic: {
    fontStyle: "italic"
  }
})
