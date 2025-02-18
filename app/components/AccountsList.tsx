"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AccountsList() {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    // Fetch accounts from your API
    // This is just a placeholder, you'll need to implement the actual API call
    const fetchAccounts = async () => {
      const response = await fetch("/api/plaid/accounts")
      const data = await response.json()
      setAccounts(data.accounts)
    }

    fetchAccounts()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        {accounts.map((account: any) => (
          <div key={account.id} className="mb-2">
            <h3 className="font-semibold">{account.name}</h3>
            <p>Balance: ${account.balance.current}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

