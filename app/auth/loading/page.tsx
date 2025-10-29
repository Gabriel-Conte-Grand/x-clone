"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthLoading() {
  const router = useRouter()

  useEffect(() => {
    // Le das medio segundo para asegurar que la cookie esté persistida
    const t = setTimeout(() => router.replace("/"), 250)
    return () => clearTimeout(t)
  }, [router])

  return (
    <main className="text-center text-white mt-20">
      <p>Finalizing authentication...</p>
    </main>
  )
}
