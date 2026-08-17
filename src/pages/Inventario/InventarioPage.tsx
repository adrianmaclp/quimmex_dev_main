import { useEffect, useState } from "react";
import { obtenerProductos } from "@/services/productos.service";

export default function InventarioPage() {
    const [productos, setProductos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function cargarProductos() {
            try {
                const data = await obtenerProductos();
                setProductos(data);

            } catch (error) {
                console.error(error);
                setError("No fue posible cargar los productos.");

            } finally {
                setCargando(false);
            }
        }

        cargarProductos();
    }, []);

    if (cargando) {return <p>Cargando productos...</p>;}

    if (error) {return <p>{error}</p>;}

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold">
                Productos
            </h1>

            <div className="mt-6 space-y-2">

                {productos.map((producto) => (

                    <div
                        key={producto.id}
                        className="rounded-lg border p-4"
                    >
                        <div className="font-semibold">
                            {producto.nombre}
                        </div>

                        <div>
                            Código: {producto.codigo}
                        </div>

                        <div>
                            Precio: ${producto.precio_venta}
                        </div>

                        <div>
                            Stock: {producto.stock}
                        </div>
                    </div>

                ))}

            </div>

        </div>
    );
}