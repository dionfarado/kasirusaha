"use client"

import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  RefreshCcw,
  Shield,
  Sparkles,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"

export function UserMobile({
  user,
}: {
  user: {
    name: string
    email: string
    avatar?: string
  }
}) {
  const { replace } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user?.avatar || ""} alt={user?.name} />
            <AvatarFallback className="rounded-lg">
              {user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40 rounded-lg" side="bottom" align="end">

            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">T</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                Ganti Pengguna
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Shield />
                Keamanan
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCcw />
                Refresh
              </DropdownMenuItem>
              <DropdownMenuItem>
                Versi: 1001-1720
                
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("token");
                replace("/sign-in")
              }}
              >
              <LogOut />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
    </DropdownMenu>
  )
}