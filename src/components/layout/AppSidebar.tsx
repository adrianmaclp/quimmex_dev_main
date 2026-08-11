import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { menu } from "@/routes/menu";

import { NavLink, useLocation } from "react-router-dom";

export default function AppSidebar() {
  const location = useLocation();

  const isMenuActive = (path: string) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <Sidebar className="border-r border-slate-200 bg-white shadow-sm">

      {/* Logo */}
      <SidebarHeader className="px-6 py-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Quimmex
        </h2>
      </SidebarHeader>

      {/* Menú */}
      <SidebarContent className="px-3">

        <SidebarMenu className="mt-3 space-y-2">

          {menu.map((item) => (
            <SidebarMenuItem key={item.title}>

              <SidebarMenuButton
                asChild
                isActive={isMenuActive(item.path)}
              >
                <NavLink to={item.path}>
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>

            </SidebarMenuItem>
          ))}

        </SidebarMenu>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-slate-200 px-6 py-5 text-xs text-slate-500">
        Quimmex ERP · v1.0.0
      </SidebarFooter>

    </Sidebar>
  );
}