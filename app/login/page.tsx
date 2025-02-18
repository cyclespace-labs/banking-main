"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github, GitlabIcon as GitlabLogo } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Log in to Banking App</h1>
        </div>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-[#24292F] text-white hover:bg-[#24292F]/90"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>

          <Button variant="outline" className="w-full bg-[#6B4FBB] text-white hover:bg-[#6B4FBB]/90" disabled>
            <GitlabLogo className="mr-2 h-4 w-4" />
            Continue with GitLab
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={() => signIn("email", { callbackUrl: "/dashboard" })}>
            Continue with Email
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

