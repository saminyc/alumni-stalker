"use server"

import { createServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function signOut() {
  const supabase = createServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Sign out error:", error)
    return { success: false, error: error.message }
  }

  redirect("/login")
}
