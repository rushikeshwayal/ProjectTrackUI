import { Bell } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { SidebarNav, defaultNavItems } from "./sidebar-nav"
import { OverviewCards } from "./OverviewCard"
import { TasksProgressChart } from "./TaskProgressChart"
import { ProductivityChart } from "./ProductivityChart"
import { AssignmentsList } from "./AssignmentList"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-gray-100/40 p-6 lg:flex">
        <div className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 rounded-full bg-primary" />
          analyze.
        </div>
        <div className="mt-8 flex-1">
          <SidebarNav items={defaultNavItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                placeholder="Search here..."
                className="w-64"
              />
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="grid gap-6 p-6 lg:grid-cols-2">
          <div className="space-y-6">
            <OverviewCards />
            <TasksProgressChart />
          </div>
          <div className="space-y-6">
            <ProductivityChart />
            <AssignmentsList />
          </div>
        </main>
      </div>
    </div>
  )
}

