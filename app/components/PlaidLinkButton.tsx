"use client"

import { useState } from "react"
import { usePlaidLink } from "react-plaid-link"
import { Button } from "@/components/ui/button"

export function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState(null)

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      // Handle success
      console.log("Plaid Link success:", public_token, metadata)
      // Here you would typically send the public_token to your server
      // to exchange it for an access_token
    },
  })

  const handleClick = async () => {
    const response = await fetch("/api/plaid/create-link-token", { method: "POST" })
    const { link_token } = await response.json()
    setLinkToken(link_token)
  }

  return (
    <Button onClick={handleClick} disabled={!ready}>
      Connect a bank account
    </Button>
  )
}

