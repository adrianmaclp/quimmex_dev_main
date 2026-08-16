import { Route } from "react-router-dom";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import ClientesPage from "@/pages/Clientes/Clientes";
import VentasPage from "@/pages/Ventas/VentasPage";
import InventarioPage from "@/pages/Inventario/InventarioPage";
import CobranzaPage from "@/pages/Cobranza/CobranzaPage";
import ReportesPage from "@/pages/Reportes/ReportesPage";
import ConfiguracionPage from "@/pages/Configuracion/ConfiguracionPage";

export const appRoutes = (
  <>
    <Route index element={<DashboardPage />} />
    <Route path="clientes" element={<ClientesPage />} />
    <Route path="ventas" element={<VentasPage />} />
    <Route path="inventario" element={<InventarioPage />} />
    <Route path="cobranza" element={<CobranzaPage />} />
    <Route path="reportes" element={<ReportesPage />} />
    <Route path="configuracion" element={<ConfiguracionPage />} />
  </>
);