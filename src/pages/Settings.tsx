import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { SettingsStackParamList } from "navigation/AppStack"
import { View, StyleSheet, Text, Button } from "react-native"

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
      <Text>Settings</Text>
      <StatusBar style="auto" />
    </View>
  )
}
