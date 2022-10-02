import React, { useEffect, useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { HomeStackParamList, ProfileStackParamList } from "navigation/AppStack"
import { Searchbar } from "react-native-paper"

import UserInfoList from "components/RenderUserList"
import UserDisplay from "components/UserDisplay"
import StorageManager from "managers/StorageManager"

import { Text, View, StyleSheet } from "react-native"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"

/*User search TEXT LINK AND QR CODE??? */

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 30
  },
  logo: {
    width: 100,
    height: 100
  }
})

export default function UserChild({}: NativeStackScreenProps<
  ProfileStackParamList,
  "Profile"
>) {
  const [user, setUser] = useState<User>()
  const [users, setUsers] = useState<API.Vertex<User, "user">[]>([])
  const [email, setSearchQuery] = React.useState("")

  useEffect(() => {
    StorageManager.get("@user").then(jwt => {
      const buffer = Buffer.from(jwt!.split(".")[1], "base64")
      const user = JSON.parse(buffer.toString())
      setUser(user)
      console.log(user.userId)

      new RequestBuilder()
        .setRoute(`/users/${user?.userId}/parents`)
        .setMethod(HttpMethod.Get)
        .on<undefined>(HttpStatus.Unauthorized, () => {})
        .on<undefined>(HttpStatus.Forbidden, () => {})
        .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
          setUsers(res.data)
        })
        .submit()
    })
  }, [])

  const datasetuseremails = async () => {
    new RequestBuilder()
      .setRoute(`/users?email=${email}`)
      .setMethod(HttpMethod.Get)
      .on<undefined>(HttpStatus.Unauthorized, () => {})
      .on<undefined>(HttpStatus.Forbidden, () => {})
      .on<undefined>(HttpStatus.NotFound, () => {})
      .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
        setUsers(res.data)
      })
  }

  const UserSearchbar = () => {
    const onChangeSearch = (query: React.SetStateAction<string>) =>
      setSearchQuery(query)

    return (
      <Searchbar
        placeholder="Email"
        onChangeText={onChangeSearch}
        value={email}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <UserDisplay />
        {users.map(user => (
          <View style={styles.item}>
            <Text style={styles.title}>
              {user.properties.firstName[0].value}{" "}
              {user.properties.lastName[0].value}
            </Text>
          </View>
        ))}
        <UserSearchbar />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
