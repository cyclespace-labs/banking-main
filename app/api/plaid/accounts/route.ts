import { NextResponse } from "next/server"
import { plaidClient } from "@/lib/plaid"
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      include: { accounts: true },
    })

    if (!user || !user.accounts[0]?.accessToken) {
      return NextResponse.json({ error: "No linked accounts" }, { status: 404 })
    }

    const accountsResponse = await plaidClient.accountsGet({
      access_token: user.accounts[0].accessToken,
    })

    return NextResponse.json({ accounts: accountsResponse.data.accounts })
  } catch (error) {
    console.error("Error fetching accounts:", error)
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 })
  }
}

