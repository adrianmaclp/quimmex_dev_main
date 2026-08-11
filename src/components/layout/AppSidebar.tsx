import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  FileBarChart,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Inventario",
    url: "/inventario",
    icon: Package,
  },
  {
    title: "Ventas",
    url: "/ventas",
    icon: ShoppingCart,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
  },
  {
    title: "Cobranza",
    url: "/cobranza",
    icon: CreditCard,
  },
  {
    title: "Reportes",
    url: "/reportes",
    icon: FileBarChart,
  },
  {
    title: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>

      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold">
          Quimmex
        </h2>
      </SidebarHeader>

      <SidebarContent>

        <SidebarMenu>

          {items.map((item) => (
            <SidebarMenuItem key={item.title}>

              <SidebarMenuButton asChild>

                <a href={item.url}>

                  <item.icon />

                  <span>{item.title}</span>

                </a>

              </SidebarMenuButton>

            </SidebarMenuItem>
          ))}

        </SidebarMenu>

      </SidebarContent>

      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        v1.0.0
      </SidebarFooter>

    </Sidebar>
  );
}