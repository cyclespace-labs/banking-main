"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { account } from "@/lib/appwrite"
import type { AppwriteUser } from "@/types/appwrite"

export function AppwriteProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<AppwriteUser | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userData = await account.get()
        setUser(userData)
        if (pathname === "/login" || pathname === "/signup") {
          router.push("/dashboard")
        }
      } catch (error) {
        setUser(null)
        if (pathname !== "/login" && pathname !== "/signup" && pathname !== "/") {
          router.push("/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [router, pathname])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {user && <div>Welcome, {user.name}</div>}
      {children}
    </>
  )
}

