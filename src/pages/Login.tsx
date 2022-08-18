import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { AuthStackParamList } from "navigation/AuthStack"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import fetch from "node-fetch"
import StorageManager from "managers/StorageManager"

export default function Login({
  route,
  navigation
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>()

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        keyboardType="email-address"
        placeholder="Email Address"
        onChangeText={setEmail}
      />
      <TextInput
        secureTextEntry={true}
        keyboardType="default"
        placeholder="Password"
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <Button
        title="Login"
        disabled={submitting}
        onPress={() => {
          setSubmitting(true)
          fetch("https://cp3405-api.azurewebsites.net/login", {
            method: "POST",
            body: JSON.stringify({
              email,
              password
            })
          })
            .then(async res => ({ status: res.status, body: await res.json() }))
            .then(({ status, body }) => {
              switch (status) {
                case 200:
                  StorageManager.set("@user", body.data.token)
                  break
                case 400:
                case 403:
                  throw body.data.message
              }
            })
            .catch((err: string) => setError(err))
            .finally(() => setSubmitting(false))
        }}
      />
      <Text>Don't have an account?</Text>
      <Button
        title="Register here"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  error: {
    color: "red"
  }
})
