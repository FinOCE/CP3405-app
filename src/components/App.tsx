import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native"

export type AppProps = {
  app: API.Vertex<App, "app">
  edge: API.Edge<AppEdge, "hasApp">
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        const id = props.app.properties.appId[0].value
        /*
          TODO: Find approach to launch by this ID

          It seems like this is only possible if it can work with native code,
          but Expo is messy when it comes to doing that. The link below is a
          demo that may hopefully help with running native code in the Expo
          app, because otherwise the entire project may need to be switched
          over to just React Native...

          https://www.youtube.com/watch?v=id0Im72UN6w
          https://docs.expo.dev/workflow/customizing/
        */
      }}
    >
      <Image
        source={{ uri: props.app.properties.iconUrl[0].value }}
        style={styles.appIcon}
      />
      <Text>{props.app.properties.name[0].value}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  appIcon: {
    width: 100,
    height: 100
  }
})
