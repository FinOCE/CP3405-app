import { StyleSheet, Text as TextBase } from "react-native"

export type HeadingProps = {
  children: string
  level?: 1 | 2 | 3
}

export default function Heading(props: HeadingProps) {
  switch (props.level ?? 1) {
    case 1:
      return <TextBase style={styles.heading1}>{props.children}</TextBase>
    case 2:
      return <TextBase style={styles.heading2}>{props.children}</TextBase>
    case 3:
      return <TextBase style={styles.heading3}>{props.children}</TextBase>
    default:
      return <>Invalid heading size selected (this should be impossible)</>
  }
}

const styles = StyleSheet.create({
  heading1: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  heading2: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  heading3: {
    marginVertical: 10,
    fontSize: 18
  }
})
