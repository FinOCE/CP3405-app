import StorageManager from "managers/StorageManager"
import { useEffect } from "react"

/**
 * Use the logged in user (if present). This method runs asynchronously so it
 * won't be instantly accessible. That is why it is being handled in the
 * callback.
 *
 * ```ts
 * useUser((user, logout) => {
 *   if (user) {
 *     console.log(`The user is ${user.userId}! Let's log them out`)
 *     logout()
 *   } else {
 *     console.log("Nobody is logged in at the moment")
 *   }
 * })
 * ```
 */
export default function useUser(
  callback: (user: User | null, logout: () => Promise<void>) => void
): void {
  useEffect(() => {
    // Provide function to logout the user
    async function logout() {
      await StorageManager.remove("@user")
    }

    // Fetch user from storage
    StorageManager.get("@user").then(userDeserialized => {
      if (userDeserialized === null) {
        callback(null, logout)
        return
      }

      const buffer = Buffer.from(userDeserialized!.split(".")[1], "base64")
      const user: User = JSON.parse(buffer.toString())
      callback(user, logout)
    })
  }, [])
}
