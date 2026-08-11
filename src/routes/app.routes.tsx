import { Route } from "react-router-dom";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import ClientesPage from "@/pages/Clientes/Clientes";

export const appRoutes = (
  <>
    <Route index element={<DashboardPage />} />
    <Route path="clientes" element={<ClientesPage />} />
  </>
);