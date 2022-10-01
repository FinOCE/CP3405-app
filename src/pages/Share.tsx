import { Button, StyleSheet, Text, View } from "react-native"

export default function Share() {
  type Item = {
    name: string
  }

  const items: Item[] = [
    {
      name: "Finley"
    },
    {
      name: "Daniel"
    },
    {
      name: "Naoki"
    }
  ]

  return (
    <>
      <Text style={styles.headingStyle}>Contacts</Text>

      <View style={styles.headingPadding}></View>

      <View style={styles.textBox}>
        <input type="text" placeholder="Write a message." />
      </View>

      {items.map(item => (
        <>
          <View style={styles.parentContainer}>
            <View style={styles.containerLeft}>
              <View style={styles.powderblue} />
              <Text style={styles.contactsName}>{item.name}</Text>
            </View>

            <View style={styles.containerRight}>
              <Button title="Send" />
            </View>
          </View>
          <View style={styles.contactsPadding}></View>
        </>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "row"
  },
  containerLeft: {
    flexDirection: "row",
    width: "75%"
  },
  containerRight: {
    width: "25%",
    paddingRight: 10
  },
  headingStyle: {
    fontSize: 24,
    textAlign: "center"
  },
  headingPadding: {
    height: 50
  },
  contactsName: {
    paddingLeft: 10,
    paddingTop: 12.5
  },
  sendButton: {
    fontWeight: "bold",
    paddingRight: 5
  },
  contactsPadding: {
    height: 15
  },
  powderblue: {
    height: 50,
    width: 50,
    backgroundColor: "powderblue",
    marginLeft: 10
  },
  skyblue: {
    height: 50,
    width: 50,
    backgroundColor: "skyblue",
    marginLeft: 10
  },
  steelblue: {
    height: 50,
    width: 50,
    backgroundColor: "steelblue",
    marginLeft: 10
  },
  textBox: {
    margin: 20
  }
})
