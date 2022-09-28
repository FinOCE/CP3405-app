import { StyleSheet, View } from "react-native"

export type PageProps = {
  children: React.ReactNode
}

/**
 * A base component for pages to be wrapped by
 */
export default function Page(props: PageProps) {
  return <View style={styles.page}>{props.children}</View>
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ecf0f1",
    padding: 15
  }
})
