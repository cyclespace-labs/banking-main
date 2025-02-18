import { NextResponse } from "next/server"
import { plaidClient } from "@/lib/plaid"
import { getServerSession } from "next-auth/next"

export async function POST() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const createTokenResponse = await plaidClient.linkTokenCreate({
      user: { client_user_id: session.user?.email as string },
      client_name: "Banking App",
      products: ["auth", "transactions"],
      country_codes: ["US"],
      language: "en",
    })

    return NextResponse.json({ link_token: createTokenResponse.data.link_token })
  } catch (error) {
    console.error("Error creating link token:", error)
    return NextResponse.json({ error: "Failed to create link token" }, { status: 500 })
  }
}

