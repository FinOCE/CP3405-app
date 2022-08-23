import { NavigationContainer } from "@react-navigation/native"
import StorageManager from "managers/StorageManager"
import { useState } from "react"
import { useEffect } from "react"
import AppStack from "./AppStack"
import AuthStack from "./AuthStack"

export default function MainNavigation() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    function setUserFromToken(value: string | undefined) {
      // If undefined is provided, remove user
      if (!value) return setUser(undefined)

      // If token is provided, parse payload and set as user
      const buffer = Buffer.from(value.split(".")[1], "base64")
      setUser(JSON.parse(buffer.toString()))
    }

    // Fetch user from storage
    StorageManager.get("@user").then(userDeserialized => {
      if (userDeserialized !== null) setUserFromToken(userDeserialized)
    })

    // Update state whenever changes are made to user in storage
    StorageManager.getInstance().on("set", (key: string, value: string) => {
      if (key === "@user") setUserFromToken(value)
    })

    StorageManager.getInstance().on("remove", (key: string) => {
      if (key === "@user") setUserFromToken(undefined)
    })
  }, [])

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
