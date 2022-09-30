import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { AuthStackParamList } from "navigation/AuthStack"
import { useState } from "react"
import {
  // Button,
  StyleSheet,
  // Text,
  // TextInput,
  TouchableOpacity,
  View
} from "react-native"
import StorageManager from "managers/StorageManager"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"
import Page from "components/lib/layouts/Page"
import ErrorDialogue from "components/lib/texts/ErrorDialogue"
import TextInput, { TextInputTypes } from "components/lib/inputs/TextInput"
import Heading from "components/lib/texts/Heading"
import Text from "components/lib/texts/Text"
import Center from "components/lib/layouts/Center"
import Button, { ButtonTypes } from "components/lib/inputs/Button"
import ButtonGroup from "components/lib/inputs/ButtonGroup"

export default function Register({
  route,
  navigation
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>()

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [nickName, setNickName] = useState<string>()
  const [role, setRole] = useState<"Parent" | "Child">("Parent")

  return (
    <Page card>
      <Heading>Register</Heading>

      {/* About person */}
      <Heading level={2}>About You</Heading>
      <Text>
        Let's get to know a little bit about you. This will help your family
        find you.
      </Text>
      <br />
      <TextInput
        value={firstName}
        setValue={setFirstName}
        placeholder="Michael"
        label="First name"
      />
      <TextInput
        value={lastName}
        setValue={setLastName}
        placeholder="Contoso"
        label="Last name"
      />
      <TextInput
        value={nickName}
        setValue={setNickName}
        placeholder="Mike"
        label="Nickname"
      />

      {/* Account details */}
      <Heading level={2}>Account Details</Heading>
      <Text>
        These are the details you need to log into your account. Be sure to save
        these into a safe place so don't lose them!
      </Text>
      <br />
      <TextInput
        value={email}
        setValue={setEmail}
        type={TextInputTypes.Email}
        placeholder="michael.contoso@outlook.com"
        label="Email address"
      />
      <TextInput
        value={password}
        setValue={setPassword}
        type={TextInputTypes.Password}
        placeholder="Something super secret!"
        label="Password"
      />

      {/* Parent/Child selector */}
      <br />
      <Text>
        Depending on how you use the app, the experience is changed. Please
        press the option that best matches your situation.
      </Text>
      <br />
      <ButtonGroup
        options={[
          { label: "I need help with my device", value: "Parent" },
          { label: "I want to help someone with their device", value: "Child" }
        ]}
        value={role}
        setValue={setRole}
        vertical
      />

      {/* Register button */}
      <br />
      {error && <ErrorDialogue message={error} />}
      <br />
      <Center>
        <Button
          value="Get Started"
          onClick={() => {
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
      </Center>

      {/* Switch to login */}
      <br />
      <br />
      <Center>
        <Text small>Already have an account?</Text>
        <Button
          value="Sign In"
          onClick={() => navigation.navigate("Login")}
          type={ButtonTypes.Inline}
        />
      </Center>
    </Page>
  )

  // const [submitting, setSubmitting] = useState(false)
  // const [error, setError] = useState<string>()

  // return (
  //   <View style={styles.container}>
  //     <StatusBar style="auto" />
  //     <TextInput
  //       keyboardType="email-address"
  //       placeholder="Email Address"
  //       onChangeText={setEmail}
  //     />
  //     <TextInput
  //       secureTextEntry={true}
  //       keyboardType="default"
  //       placeholder="Password"
  //       onChangeText={setPassword}
  //     />
  //     <TextInput
  //       keyboardType="default"
  //       placeholder="First Name"
  //       onChangeText={setFirstName}
  //     />
  //     <TextInput
  //       keyboardType="default"
  //       placeholder="Last Name"
  //       onChangeText={setLastName}
  //     />
  //     <TextInput
  //       keyboardType="default"
  //       placeholder="Nickname"
  //       onChangeText={setNickName}
  //     />
  //     <View style={{ marginVertical: 10 }}>
  //       <TouchableOpacity
  //         onPress={() => setRole("Parent")}
  //         style={{
  //           backgroundColor: role === "Parent" ? "#f9c2ff" : undefined,
  //           padding: 10
  //         }}
  //       >
  //         I need help with my using my device (Parent)
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={() => setRole("Child")}
  //         style={{
  //           backgroundColor: role === "Child" ? "#f9c2ff" : undefined,
  //           padding: 10
  //         }}
  //       >
  //         I want to help someone using their device (Child)
  //       </TouchableOpacity>
  //     </View>
  //     {error && <Text style={styles.error}>Error: {error}</Text>}
  //     <Button
  //       title="Register"
  //       disabled={submitting}
  //       onPress={() => {
  //         setSubmitting(true)

  //         new RequestBuilder()
  //           .setRoute("/register")
  //           .setMethod(HttpMethod.Post)
  //           .setBody({ email, password, firstName, lastName, nickName, role })
  //           .on<API.Token>(HttpStatus.Ok, body => {
  //             StorageManager.set("@user", body.data.token)
  //           })
  //           .on<API.Error>(HttpStatus.BadRequest, body => {
  //             setError(body.data.message)
  //           })
  //           .on<API.Error>(HttpStatus.Conflict, body => {
  //             setError(body.data.message)
  //           })
  //           .submit()
  //           .finally(() => setSubmitting(false))
  //       }}
  //     />
  //     <Text>Already have an account?</Text>
  //     <Button
  //       title="Sign in here"
  //       onPress={() => navigation.navigate("Login")}
  //     />
  //   </View>
  // )
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
