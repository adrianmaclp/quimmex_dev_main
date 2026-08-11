import { Outlet } from "react-router-dom";
import AppHeader from "@/components/layout/AppHeader";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Aquí irá el Header */}
      <AppHeader />

      {/* Aquí irá el Sidebar */}

      <main className="p-6">
        <Outlet />
      </main>

    </div>
  );
}