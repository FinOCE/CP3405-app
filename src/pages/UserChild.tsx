import React, { useEffect, useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { HomeStackParamList } from "navigation/AppStack"
import { Searchbar } from "react-native-paper"

import UserInfoList from "components/RenderUserList"
import UserDisplay from "components/UserDisplay"
import StorageManager from "managers/StorageManager"

import { View, StyleSheet } from "react-native"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"

const UserSearchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState("")

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query)

  return (
    <Searchbar
      placeholder="Email"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  )
}

const Links = () => {
  return (
    <View>
      {
        <UserSearchbar />
        /*User search TEXT LINK AND QR CODE??? */
      }
    </View>
  )
}

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
  HomeStackParamList,
  "User"
>) {
  const [user, setUser] = useState<User>()
  const [users, setUsers] = useState<API.Vertex<User, "user">[]>([])

  useEffect(() => {
    StorageManager.get("@user").then(jwt => {
      const buffer = Buffer.from(jwt!.split(".")[1], "base64")
      const user = JSON.parse(buffer.toString())
      setUser(user)
      console.log(user.userId)
    })
  })

  const datasetusers = async () => {
    new RequestBuilder()
      .setRoute(`/users/${user?.userId}/parents/{parentId?}`)
      .setMethod(HttpMethod.Get)
      .on<undefined>(HttpStatus.Unauthorized, () => {})
      .on<undefined>(HttpStatus.Forbidden, () => {})
      .on<undefined>(HttpStatus.NotFound, () => {})
      .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
        setUsers(res.data)
      })
  }

  const datasetuseremails = async () => {
    new RequestBuilder()
      .setRoute(`/${user?.email}=${???}`)
      .setMethod(HttpMethod.Get)
      .on<undefined>(HttpStatus.Unauthorized, () => {})
      .on<undefined>(HttpStatus.Forbidden, () => {})
      .on<undefined>(HttpStatus.NotFound, () => {})
      .on<API.Vertex<User, "user">[]>(HttpStatus.Ok, res => {
        setUsers(res.data)
      })
  }

  return (
    <View style={styles.container}>
      <View>
        <UserDisplay />
        <UserInfoList data={users} />
        <Links />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
