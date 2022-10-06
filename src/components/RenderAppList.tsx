import {
  SafeAreaView,
  Image,
  View,
  FlatList,
  StyleSheet,
  Text,
  ListRenderItemInfo
} from "react-native"

export type AppProps = {
  data: {
    app: API.Vertex<App, "app">
    edge: API.Edge<AppEdge, "hasApp">
  }[]
}

const Item = (props: {
  app: API.Vertex<App, "app">
  edge: API.Edge<AppEdge, "hasApp">
}) => (
  <View style={styles.item}>
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start"
      }}
    >
      <View style={{ width: "30%" }}>
        <Image
          style={styles.logo}
          source={{
            uri: props.app.properties.iconUrl[0].value
          }}
        />
      </View>
      <View style={{ width: "70%" }}>
        <Text style={styles.title}>{props.app.properties.name[0].value}</Text>
        <Text style={styles.title}>{props.edge.properties.message}</Text>
      </View>
    </View>
  </View>
)

const AppList = (props: AppProps) => {
  const renderItem = ({
    item
  }: ListRenderItemInfo<{
    app: API.Vertex<App, "app">
    edge: API.Edge<AppEdge, "hasApp">
  }>) => <Item {...item} />

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data.sort((a, b) =>
          a.app.properties.name[0].value.localeCompare(
            b.app.properties.name[0].value
          )
        )}
        renderItem={renderItem}
        keyExtractor={item => item.app.id}
      />
    </SafeAreaView>
  )
}

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

export default AppList
