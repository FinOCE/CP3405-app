import { StatusBar } from "expo-status-bar"
import { ScrollView, StyleSheet, View } from "react-native"

export type PageProps = {
  children: React.ReactNode
  card?: boolean
}

/**
 * A base component for pages to be wrapped by
 */
export default function Page(props: PageProps) {
  if (props.card)
    return (
      <ScrollView style={styles.cardBackground}>
        <View style={styles.cardPage}>
          <StatusBar style="auto" />
          {props.children}
        </View>
      </ScrollView>
    )
  else
    return (
      <ScrollView style={styles.page}>
        <StatusBar style="auto" />
        {props.children}
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    height: "100%"
  },
  cardPage: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    marginTop: 25,
    marginBottom: 25,
    marginHorizontal: 5,
    borderRadius: 25
  },
  cardBackground: {
    backgroundColor: "#9b59b6",
    height: "100%"
  }
})
