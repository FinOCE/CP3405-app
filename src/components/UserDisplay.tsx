import StorageManager from "managers/StorageManager"
import { useEffect, useState } from "react"
import { View, Text } from "react-native"

const UserDisplay = () => {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    StorageManager.get("@user").then(jwt => {
      const buffer = Buffer.from(jwt!.split(".")[1], "base64")
      console.log(buffer.toString())
      setUser(JSON.parse(buffer.toString()))
    })
  }, [])
  return (
    <View>
      {/* ADD USER IMAGE?? */}
      <Text>
        {user?.firstName} {user?.lastName}
      </Text>
    </View>
  )
}

export default UserDisplay
