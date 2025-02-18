"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TransactionsList() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    // Fetch transactions from your API
    // This is just a placeholder, you'll need to implement the actual API call
    const fetchTransactions = async () => {
      const response = await fetch("/api/plaid/transactions")
      const data = await response.json()
      setTransactions(data.transactions)
    }

    fetchTransactions()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.map((transaction: any) => (
          <div key={transaction.id} className="mb-2">
            <h3 className="font-semibold">{transaction.name}</h3>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

