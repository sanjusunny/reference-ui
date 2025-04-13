import { ReactNode } from "react"
import {
  BadgeCheck,
  CheckSquare,
  ChevronsUpDown,
  Home,
  ListTodo,
  LogOut,
  Plus,
  Settings,
  User
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"

interface SidebarLinkProps {
  to: string
  icon: ReactNode
  children: ReactNode
  isActive?: boolean
}

function SidebarLink({ to, icon, children, isActive }: SidebarLinkProps) {
  return (
    <SidebarMenuItem>
      <a 
        href={to} 
        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
          isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
        }`}
      >
        {icon}
        <span>{children}</span>
      </a>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  const { isMobile } = useSidebar()
  const { user, signOut } = useAuth()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CheckSquare className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">TaskMaster</span>
                <span className="text-xs text-muted-foreground">v1.0.0</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarLink to="/dashboard" icon={<Home className="size-4" />} isActive>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/todos" icon={<ListTodo className="size-4" />}>
            My Tasks
          </SidebarLink>
          <SidebarLink to="/todos/new" icon={<Plus className="size-4" />}>
            New Task
          </SidebarLink>
          <SidebarLink to="/completed" icon={<BadgeCheck className="size-4" />}>
            Completed
          </SidebarLink>
          <SidebarLink to="/settings" icon={<Settings className="size-4" />}>
            Settings
          </SidebarLink>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt={user?.username || "User"} />
                    <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{user?.username || "User"}</span>
                  <ChevronsUpDown className="ml-auto size-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={user?.username || "User"} />
                      <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.username || "User"}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user?.attributes?.email || "user@example.com"}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
