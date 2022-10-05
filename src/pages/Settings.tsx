import { NativeStackScreenProps } from "@react-navigation/native-stack"
import Button, { ButtonTypes } from "components/lib/inputs/Button"
import Center from "components/lib/layouts/Center"
import Page from "components/lib/layouts/Page"
import Heading from "components/lib/texts/Heading"
import StorageManager from "managers/StorageManager"
import { SettingsStackParamList } from "navigation/AppStack"

export default function Settings({
  route,
  navigation
}: NativeStackScreenProps<SettingsStackParamList, "Settings">) {
  return (
    <Page>
      <Heading>Settings</Heading>
      <br />
      <Center>
        <Button
          onClick={() => {
            const parentNavigator = navigation.getParent()!
            parentNavigator.navigate("HomeStack", {
              screen: "Share",
              params: {
                appId: "com.facebook.orca",
                name: "Messenger",
                creator: "Meta Platforms, Inc.",
                iconUrl:
                  "https://play-lh.googleusercontent.com/ldcQMpP7OaVmglCF6kGas9cY_K0PsJzSSosx2saw9KF1m3RHaEXpH_9mwBWaYnkmctk=w240-h480-rw"
              }
            })
          }}
          value="Share App (Demo)"
          type={ButtonTypes.Inline}
        />
        <br />
        <Button
          onClick={() => StorageManager.remove("@user")}
          value="Logout"
          type={ButtonTypes.Cancel}
        />
      </Center>
    </Page>
  )
}
