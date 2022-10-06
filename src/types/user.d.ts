type User = {
  userId: string
  firstName: string
  lastName: string
  nickName: string
  dateOfBirth: number
  role: "Parent" | "Child"
}

type UserResponse = {
  user: API.Vertex<User, "user">
}
