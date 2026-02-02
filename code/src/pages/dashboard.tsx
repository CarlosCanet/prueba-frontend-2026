import Sidebar from "@/components/application/app-navigation/sidebar"
import { Outlet } from "react-router"

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
export default Dashboard