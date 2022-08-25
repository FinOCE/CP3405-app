import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { AppStackParamList } from "navigation/AppStack"
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
}: NativeStackScreenProps<AppStackParamList, "Settings">) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 5 }}>
        <Text>Settings</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start"
          }}
        >
          <View style={{ width: "30%" }}>
            <View style={{ width: 100, height: 100, backgroundColor: "red" }} />
          </View>
          <View style={{ width: "30%" }}>
            <View style={{ width: 100, height: 100, backgroundColor: "blue" }}>
              <Button
                title="Home"
                onPress={() => navigation.navigate("Home")}
              />
            </View>
          </View>
          <View style={{ width: "30%" }}>
            <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
              <Button
                title="Settings"
                onPress={() => navigation.navigate("Settings")}
              />
            </View>
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}
