import { Outlet } from "react-router";
import SidebarWrapper from "./sidebar/sidebar-wrapper";

export default function AppLayout() {
    return (
        <div className="flex min-h-screen w-full bg-neutral-50">
            <SidebarWrapper />
            <main className="flex-1 w-full">
                <Outlet />
            </main>
        </div>
    );
}
