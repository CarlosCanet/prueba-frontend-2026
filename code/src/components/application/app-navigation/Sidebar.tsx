import { CreditCard01, Headphones01 } from "@untitledui/icons"
import { NavAccountCard } from "./sidebar-navigation-base"
import LogoSidebar from "/secondary-logo.svg"
import { Link, useNavigate } from "react-router"
import { apiKeys } from "@/utils/data"
import { useState } from "react"

const projects = apiKeys.map((key, index) => ({
  id: String(index),
  name: `${key.substring(0, 3)}**************`,
  email: "",
  avatar: "",
  status: "online" as const,
}))

function Sidebar() {
  const [selectedKey, setSelectedKey] = useState(projects[0].id)
  const navigate = useNavigate()

  const handleSelect = (id: string) => {
    setSelectedKey(id)
    navigate(`/${id}`)
  }

  return (
    <aside className="min-h-screen w-74 flex flex-col px-6 gap-6 py-4 items-center justify-start bg-tertiary-300">
      <img
        src={LogoSidebar}
        alt="Diga Logo"
        className="w-38"
      />
      {/* TODO: Refactor NavAccountCard to have the correct style */}
      <NavAccountCard 
        items={projects} 
        selectedAccountId={selectedKey} 
        onSelect={handleSelect}
        className="w-full bg-white"
      />
      <ul className="flex flex-col gap-4">
        <Link to="/">
        <li className="flex gap-2 hover:bg-quaternary-500 p-2 rounded-md hover:text-accent-color-900">
          <CreditCard01 />
          Suscripción
          </li>
        </Link>
        <Link to="/call-log">
        <li className="flex gap-2 hover:bg-quaternary-500 p-2 rounded-md hover:text-accent-color-900">
          <Headphones01 />
          Registro de llamadas
          </li>
        </Link>
      </ul>
    </aside>
  )
}
export default Sidebar