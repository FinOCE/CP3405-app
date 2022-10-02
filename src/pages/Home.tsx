import React, { useEffect, useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { HomeStackParamList } from "navigation/AppStack"
import RequestBuilder, { HttpMethod, HttpStatus } from "builders/RequestBuilder"

import AppList from "components/RenderAppList"
import StorageManager from "managers/StorageManager"

import { Text, Image, View, StyleSheet } from "react-native"

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
  const [apps, setapps] = useState<
    {
      app: API.Vertex<App, "app">
      edge: API.Edge<AppEdge, "hasApp">
    }[]
  >([])

  useEffect(() => {
    StorageManager.get("@user").then(jwt => {
      const buffer = Buffer.from(jwt!.split(".")[1], "base64")
      const user = JSON.parse(buffer.toString())
      setUser(user)
      console.log(user.userId)

      new RequestBuilder()
        .setRoute(`/users/${user?.userId}/apps`)
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
        .submit()
    })
  }, [])

  return (
    <View style={styles.container}>
      <View>
        {apps.map(app => (
          <View style={styles.item}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start"
              }}
            >
              <View style={{ width: "30%" }}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: app.app.properties.iconUrl[0].value
                  }}
                />
              </View>
              <View style={{ width: "70%" }}>
                <Text style={styles.title}>
                  {app.app.properties.name[0].value}
                </Text>
                <Text style={styles.title}>{app.edge.properties.message}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
