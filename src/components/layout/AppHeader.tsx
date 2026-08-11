import { SidebarTrigger } from "@/components/ui/sidebar";

import { usePageTitle } from "@/hooks/usePageTitle";

export default function AppHeader() {

    const title = usePageTitle();

  return (
    <header className="flex h-16 items-center border-b px-4">

      <SidebarTrigger />

      <h1 className="ml-4 text-xl font-semibold">
        {title}
      </h1>

    </header>
  );
}