import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { AuthStackParamList } from "navigation/AuthStack"
import { useState } from "react"
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import StorageManager from "managers/StorageManager"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"

export default function Register({
  route,
  navigation
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [nickName, setNickName] = useState<string>()
  const [role, setRole] = useState<"Parent" | "Child">("Parent")

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
      <TextInput
        keyboardType="default"
        placeholder="First Name"
        onChangeText={setFirstName}
      />
      <TextInput
        keyboardType="default"
        placeholder="Last Name"
        onChangeText={setLastName}
      />
      <TextInput
        keyboardType="default"
        placeholder="Nickname"
        onChangeText={setNickName}
      />
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity
          onPress={() => setRole("Parent")}
          style={{
            backgroundColor: role === "Parent" ? "#f9c2ff" : undefined,
            padding: 10
          }}
        >
          <Text>I need help with my using my device (Parent)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRole("Child")}
          style={{
            backgroundColor: role === "Child" ? "#f9c2ff" : undefined,
            padding: 10
          }}
        >
          <Text>I want to help someone using their device (Child)</Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <Button
        title="Register"
        disabled={submitting}
        onPress={() => {
          setSubmitting(true)

          new RequestBuilder()
            .setRoute("/register")
            .setMethod(HttpMethod.Post)
            .setBody({ email, password, firstName, lastName, nickName, role })
            .on<API.Token>(HttpStatus.Ok, body => {
              StorageManager.set("@user", body.data.token)
            })
            .on<API.Error>(HttpStatus.BadRequest, body => {
              setError(body.data.message)
            })
            .on<API.Error>(HttpStatus.Conflict, body => {
              setError(body.data.message)
            })
            .submit()
            .finally(() => setSubmitting(false))
        }}
      />
      <Text>Already have an account?</Text>
      <Button
        title="Sign in here"
        onPress={() => navigation.navigate("Login")}
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
