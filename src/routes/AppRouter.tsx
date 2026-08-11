import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import LoginPage from "@/pages/Login/LoginPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/login" element={<LoginPage />} />

            <Route element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />

        </Routes>
    </BrowserRouter>
  );
}