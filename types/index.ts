import { Database } from "./database"

export type Post = Database["public"]["Tables"]["posts"]["Row"]

export type PostWithUser = Post & {
  user_data: {
    name: string
    user_name: string
    avatar_url: string
  }
}
