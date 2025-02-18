import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { PlaidLinkButton } from "../components/PlaidLinkButton"
import { AccountsList } from "../components/AccountsList"
import { TransactionsList } from "../components/TransactionsList"

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <PlaidLinkButton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <AccountsList />
        <TransactionsList />
      </div>
    </div>
  )
}

