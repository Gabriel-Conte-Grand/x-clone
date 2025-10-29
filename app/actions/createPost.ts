"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData, replyToId: string | null) {
  const content = formData.get("content") as string

  if (!content || content.trim() === "") return

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false //only for logged users

  const { data, error } = await supabase.from("posts").insert({
    content,
    user_id: user.id,
    image_url: null,
    reply_to_id: replyToId,
  })

  if (error) {
    console.error("Error Creating Post:", error)
    return false
  }

  revalidatePath("/")
}
