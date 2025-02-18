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

    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const transactionsResponse = await plaidClient.transactionsGet({
      access_token: user.accounts[0].accessToken,
      start_date: thirtyDaysAgo.toISOString().split("T")[0],
      end_date: now.toISOString().split("T")[0],
    })

    return NextResponse.json({ transactions: transactionsResponse.data.transactions })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

