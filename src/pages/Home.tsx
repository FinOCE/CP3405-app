import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { AppStackParamList } from "navigation/AppStack"
import { StyleSheet, Text, View } from "react-native"

export default function Home({
  route,
  navigation
}: NativeStackScreenProps<AppStackParamList, "Home">) {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
