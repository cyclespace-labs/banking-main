"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { account } from "@/lib/appwrite"

export function AppwriteProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get()
        if (pathname === "/login" || pathname === "/signup") {
          router.push("/dashboard")
        }
      } catch (error) {
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

  return <>{children}</>
}

