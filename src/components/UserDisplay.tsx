import StorageManager from "managers/StorageManager"
import { useEffect, useState } from "react"
import { View } from "react-native"
import Heading from "components/lib/texts/Heading"
import Text from "./lib/texts/Text"
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
      <Heading>{user?.firstName + " " + user?.lastName}</Heading>
      <Text>{user?.nickName}</Text>
    </View>
  )
}

export default UserDisplay
