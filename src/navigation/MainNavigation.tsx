import { NavigationContainer } from "@react-navigation/native"
import StorageManager from "managers/StorageManager"
import { useState } from "react"
import { useEffect } from "react"
import AppStack from "./AppStack"

export default function MainNavigation() {
  const [user, setUser] = useState<User>() // This will be used with an AuthStack once implemented

  useEffect(() => {
    StorageManager.get("@user").then(userDeserialized => {
      if (userDeserialized !== null) setUser(JSON.parse(userDeserialized))
    })
  }, [])

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
}
