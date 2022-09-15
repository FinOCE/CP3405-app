import * as React from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { SettingsStackParamList } from "navigation/AppStack"
import { View, StyleSheet, Text, Button } from "react-native"
import { List } from "react-native-paper"

const MyComponent = () => {
  const [expanded, setExpanded] = React.useState(true)

  const handlePress = () => setExpanded(!expanded)

  return (
    <List.Section title="Settings">
      <List.Accordion title="Display Setting">
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
      <List.Accordion title="App Setting">
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
      <List.Accordion title="User Setting">
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  }
})

export default function Settings({
  route,
  navigation
}: NativeStackScreenProps<SettingsStackParamList, "Settings">) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 5 }}>
        <Text>Settings</Text>
        <MyComponent />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
