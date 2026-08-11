import { useLocation } from "react-router-dom";

import { menu } from "@/routes/menu";

export function usePageTitle() {
  const { pathname } = useLocation();

  const item = menu.find((m) => m.path === pathname);

  return item?.title ?? "Quimmex";
}