import { Linking } from "react-native"

export default class Launcher {
  public static async openApplication(id: string): Promise<any> {
    console.log(
      `${id} launched through mock of 'react-native-open-application'`
    )
    Linking.openURL(`https://play.google.com/store/apps/details?id=${id}`)
  }
}
