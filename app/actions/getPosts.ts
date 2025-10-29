"use server"

import { PostWithUser } from "@/types"
import { createClient } from "@/utils/supabase/server"

export async function getPosts(): Promise<PostWithUser[]> {
  const supabase = await createClient()

  const { data, error } = (await supabase
    .from("posts")
    .select("*, user_data:users(name, avatar_url, user_name)")
    .is("reply_to_id", null) // only main posts
    .order("created_at", { ascending: false })) as {
    data: PostWithUser[]
    error: unknown
  }

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data
}
