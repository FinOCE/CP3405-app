import { useState, useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { HomeStackParamList } from "navigation/AppStack"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"

import AppList from "components/RenderAppList"
import UserInfoList from "components/RenderUserList"
import StorageManager from "managers/StorageManager"

import { View, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

export default function Home({}: NativeStackScreenProps<
  HomeStackParamList,
  "Home"
>) {
  const [user, setUser] = useState<User>()
  const [Apps, setapps] = useState<
    {
      app: API.Vertex<App, "app">
      edge: API.Edge<AppEdge, "hasApp">
    }[]
  >([])
  const [users, setUsers] = useState<API.Vertex<User, "user">[]>([])

  useEffect(() => {
    StorageManager.get("@user").then(jwt => {
      const buffer = Buffer.from(jwt!.split(".")[1], "base64")
      const user = JSON.parse(buffer.toString())
      setUser(user)
      console.log(user.userId)
    })
  })

  const datasetapp = async () => {
    new RequestBuilder()
      .setRoute(`/users/${user?.userId}`)
      .setMethod(HttpMethod.Get)
      .on<undefined>(HttpStatus.Unauthorized, () => {})
      .on<undefined>(HttpStatus.Forbidden, () => {})
      .on<undefined>(HttpStatus.NotFound, () => {})
      .on<
        {
          app: API.Vertex<App, "app">
          edge: API.Edge<AppEdge, "hasApp">
        }[]
      >(HttpStatus.Ok, res => {
        setapps(res.data)
      })
  }

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

  return (
    <View style={styles.container}>
      <View style={{ flex: 5 }}>
        <UserInfoList data={users} />
        <AppList data={Apps} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
