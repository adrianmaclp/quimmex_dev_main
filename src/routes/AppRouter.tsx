import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import ClientesPage from "@/pages/Clientes/Clientes";
import LoginPage from "@/pages/Login/LoginPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";


import { appRoutes } from "./app.routes";


export default function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas con Layout */}
         <Route element={<MainLayout />}>
          {appRoutes}
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}