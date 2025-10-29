"use server"

import { PostWithUser } from "@/types"
import { createClient } from "@/utils/supabase/server"

export async function getPostReplies(id: string) {
  const supabase = await createClient()

  const { data: replies, error } = await supabase
    .from("posts")
    .select("*, user_data:users(name, avatar_url, user_name)")
    .eq("reply_to_id", id)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching post replies:", error)
    return { replies: [] }
  }

  return { replies: replies as PostWithUser[] }
}
