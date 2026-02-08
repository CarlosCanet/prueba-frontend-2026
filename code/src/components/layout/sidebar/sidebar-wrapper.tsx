import { CreditCard01, Headphones01 } from "@untitledui/icons";
import { useLocation } from "react-router";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarDiga } from "@/components/application/app-navigation/sidebar-navigation/sidebar-diga";

const navItemsWithDividers: NavItemType[] = [
    {
        label: "Suscripciones",
        href: "/",
        icon: CreditCard01,
    },
    {
        label: "Registro de llamadas",
        href: "/CallLogs",
        icon: Headphones01,
    },
];

function SidebarWrapper() {
    const location = useLocation();
    return <SidebarDiga activeUrl={location.pathname} items={navItemsWithDividers} className="bg-tertiary-300" />;
}
export default SidebarWrapper;
