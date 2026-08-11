import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    CreditCard,
    FileBarChart,
    Settings,
} from "lucide-react";

export interface MenuItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;

  children?: MenuItem[];

  permission?: string;

  hidden?: boolean;
}

export const menu: MenuItem[] = [

    {
        title: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },

    {
        title: "Inventario",
        path: "/inventario",
        icon: Package,
    },

    {
        title: "Ventas",
        path: "/ventas",
        icon: ShoppingCart,
    },

    {
        title: "Clientes",
        path: "/clientes",
        icon: Users,
    },

    {
        title: "Cobranza",
        path: "/cobranza",
        icon: CreditCard,
    },

    {
        title: "Reportes",
        path: "/reportes",
        icon: FileBarChart,
    },

    {
        title: "Configuración",
        path: "/configuracion",
        icon: Settings,
    },

];