import { createClient } from "@/utils/supabase/server"
import { AuthButton } from "./AuthButton-client"

export const AuthButtonServer = async () => {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  return <AuthButton session={data.user} />
}
