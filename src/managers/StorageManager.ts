import AsyncStorage from "@react-native-async-storage/async-storage"

export default class StorageManager {
  /**
   * Get a value from storage
   * @param key The key of the value you wish to obtain
   * @returns The `string` if it exists, otherwise `null`
   */
  public static async get(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key)
    } catch (err) {
      return null
    }
  }

  /**
   * Store a value in storage
   * @param key The key to store the value in
   * @param value The value to be stored
   * @returns A `boolean` representing if saving the item was successful
   */
  public static async set(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, value)
      return true
    } catch (err) {
      return false
    }
  }

  /**
   * Remove an item from storage
   * @param key The key of the value to be removed
   * @returns A `boolean` representing if removing the item was successful
   */
  public static async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key)
      return true
    } catch (err) {
      return false
    }
  }

  /**
   * Check if an item exists with the provided key
   * @param key The key to check if it contains an item
   * @returns A `boolean` representing if the item exists
   */
  public static async exists(key: string): Promise<boolean> {
    try {
      await AsyncStorage.getItem(key)
      return key !== null
    } catch (err) {
      return false
    }
  }
}
