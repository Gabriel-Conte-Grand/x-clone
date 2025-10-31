import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code !== null) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  const redirectUrl = new URL("/auth/loading", request.url)

  return NextResponse.redirect(redirectUrl)
}
