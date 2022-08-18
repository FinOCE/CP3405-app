import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { AppStackParamList } from "navigation/AppStack"
import { SafeAreaView, View, FlatList, StyleSheet, Text, ListRenderItem, ListRenderItemInfo } from 'react-native';

interface Props {
  // any props that come into the component
  id: string,
  title: string,
  description: string,
  usage: number
}

const DATA: Props[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First app',
    description: 'this ia an app',
    usage: 12,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second app',
    description: 'this ia an app',
    usage: 11,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third app',
    description: 'this ia an app',
    usage: 10,
  },
];

const Item = ({ title, description }: Props) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{description}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }: ListRenderItemInfo<Props>) => (
    <Item {...item} />  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA.sort((a, b) => b.usage - a.usage)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 30,
  },
});

export default function Home({
  route,
  navigation
}: NativeStackScreenProps<AppStackParamList, "Home">) {
  return (
    <View style={styles.container}>
      <App></App>
      <Text>Hello world</Text>
      <StatusBar style="auto" />
    </View>
  )
}