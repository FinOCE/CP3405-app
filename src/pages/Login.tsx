import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { AuthStackParamList } from "navigation/AuthStack"
import { useState } from "react"
import StorageManager from "managers/StorageManager"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"
import Page from "components/lib/layouts/Page"
import Heading from "components/lib/texts/Heading"
import TextInput, { TextInputTypes } from "components/lib/inputs/TextInput"
import Text from "components/lib/texts/Text"
import ErrorDialogue from "components/lib/texts/ErrorDialogue"
import Center from "components/lib/layouts/Center"
import Button, { ButtonTypes } from "components/lib/inputs/Button"

export default function Login({
  route,
  navigation
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>()

  return (
    <Page card>
      <Heading>Login</Heading>

      {/* Account details */}
      <br />
      <Text>
        Please enter your account details below to login to your account.
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

      {/* Login button */}
      <br />
      {error && <ErrorDialogue message={error} />}
      <br />
      <Center>
        <Button
          value="Login"
          onClick={() => {
            if (!submitting) {
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
                .on<undefined>(HttpStatus.Forbidden, body => {
                  setError(
                    "Could not find a user with given email and password"
                  )
                })
                .submit()
                .finally(() => setSubmitting(false))
            }
          }}
        />
      </Center>

      {/* Switch to register */}
      <br />
      <br />
      <Center>
        <Text small>Don't have an account yet?</Text>
        <Button
          value="Register here"
          onClick={() => navigation.navigate("Register")}
          type={ButtonTypes.Inline}
        />
      </Center>
    </Page>
  )
}
