import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductosToolbarProps {
    busqueda: string;
    onBusquedaChange: (valor: string) => void;
    onNuevoProducto: () => void;
}

export default function ProductosToolbar({
    busqueda,
    onBusquedaChange,
    onNuevoProducto,
}: ProductosToolbarProps) {
    return (
        <div className="flex flex-col gap-3 px-1 py-2 sm:flex-row sm:items-center sm:justify-between">

            {/* Buscador */}
            <div className="relative w-full sm:max-w-sm">

                <Search
                    className="
                        absolute
                        left-3
                        top-1/2
                        size-4
                        -translate-y-1/2
                        text-[#414655]/50
                    "
                />

                <Input
                    value={busqueda}
                    onChange={(e) => onBusquedaChange(e.target.value)}
                    placeholder="Buscar producto..."
                    className="
                        h-10
                        border-[#e5eaf0]
                        bg-[#f8fafc]
                        pl-9
                        text-[#414655]
                        shadow-none

                        placeholder:text-[#414655]/45

                        hover:border-[#cfe6fd]

                        focus:border-[#2f9af4]/40
                        focus:ring-2
                        focus:ring-[#2f9af4]/10
                        focus-visible:ring-2
                        focus-visible:ring-[#2f9af4]/10
                    "
                />

            </div>

            {/* Botón Nuevo producto */}
            <Button
                onClick={onNuevoProducto}
                className="
                    h-10
                    w-full
                    rounded-md
                    bg-[#2f9af4]
                    px-4
                    font-medium
                    text-white
                    shadow-sm
                    transition-all

                    hover:bg-[#258ee8]
                    hover:shadow-md

                    active:scale-[0.98]

                    sm:w-auto
                "
            >
                <Plus className="size-4" />
                Nuevo producto
            </Button>

        </div>
    );
}