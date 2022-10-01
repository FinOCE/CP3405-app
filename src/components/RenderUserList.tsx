import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ListRenderItemInfo
} from "react-native"

export type UserProps = {
  data: API.Vertex<User, "user">[]
}

const UserInfo = (props: API.Vertex<User, "user">) => (
  <View style={styles.item}>
    <Text style={styles.title}>
      {props.properties.firstName[0].value} {props.properties.lastName[0].value}
    </Text>
  </View>
)

const UserInfoList = (props: UserProps) => {
  const renderItem = ({
    item
  }: ListRenderItemInfo<API.Vertex<User, "user">>) => <UserInfo {...item} />

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={userInfo => userInfo.id}
    />
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

export default UserInfoList
