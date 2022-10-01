import React from "react"
import { StyleSheet, View } from "react-native"

export type CenterProps = {
  children: React.ReactNode
  vertical?: boolean
}

export default function Center(props: CenterProps) {
  return <View style={styles.center}>{props.children}</View>
}

const styles = StyleSheet.create({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
})
