import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { AuthStackParamList } from "navigation/AuthStack"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import StorageManager from "managers/StorageManager"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"

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

          new RequestBuilder()
            .setRoute("/login")
            .setMethod(HttpMethod.Post)
            .setBody({ email, password })
            .on<API.Token>(HttpStatus.Ok, body => {
              StorageManager.set("@user", body.data.token)
            })
            .on<API.Error>(HttpStatus.BadRequest, body => {
              setError(body.data.message)
            })
            .on<API.Error>(HttpStatus.Forbidden, body => {
              setError("Could not find a user with given email and password")
            })
            .submit()
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
