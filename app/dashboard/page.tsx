"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { account } from "@/lib/appwrite"
import { PlaidLinkButton } from "../components/PlaidLinkButton"
import { AccountsList } from "../components/AccountsList"
import { TransactionsList } from "../components/TransactionsList"
import type { AppwriteUser } from "@/types/appwrite"

export default function DashboardPage() {
  const [user, setUser] = useState<AppwriteUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user", error)
        router.push("/login")
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await account.deleteSession("current")
      router.push("/login")
    } catch (error) {
      console.error("Error logging out", error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <Button onClick={handleLogout} className="mt-4 mb-4">
        Log out
      </Button>
      <PlaidLinkButton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <AccountsList />
        <TransactionsList />
      </div>
    </div>
  )
}

