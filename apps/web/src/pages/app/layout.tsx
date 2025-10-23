import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Cookies from "js-cookie";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});

function RouteComponent() {
  // const sidebar = Cookies.get("sidebar_state");
  return (
    <SidebarProvider className="bg-sidebar">
      <AppSidebar />
      <main className="m-2 p-2 bg-background rounded-xl w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
