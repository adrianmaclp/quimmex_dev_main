import { useEffect, useState } from "react";

import ProductosToolbar from "@/components/productos/ProductosToolbar";
import ProductosTable from "@/components/productos/ProductosTable";
import ProductoDialog from "@/components/productos/ProductoDialog";

import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
} from "@/services/productos.service";

import type { Producto } from "@/types/producto";
import type { ProductoFormData } from "@/schemas/productoSchema";

import { Toaster, toast } from "sonner";


export default function InventarioPage() {

    // ============================================================
    // ESTADO
    // ============================================================

    const [productos, setProductos] = useState<Producto[]>([]);

    const [busqueda, setBusqueda] = useState("");

    const [cargando, setCargando] = useState(true);

    /**
     * Controla la apertura/cierre del diálogo.
     */
    const [dialogAbierto, setDialogAbierto] = useState(false);

    /**
     * Producto seleccionado para edición.
     *
     * null = estamos creando un producto nuevo.
     */
    const [productoSeleccionado, setProductoSeleccionado] =
        useState<Producto | null>(null);


    // ============================================================
    // CARGAR PRODUCTOS
    // ============================================================

    useEffect(() => {

        cargarProductos();

    }, []);


    async function cargarProductos() {

        try {

            setCargando(true);

            const data = await obtenerProductos();

            setProductos(data);

        } catch (error) {

            console.error(
                "Error al cargar productos:",
                error
            );

            toast.error(
                "No fue posible cargar los productos."
            );

        } finally {

            setCargando(false);

        }

    }


    // ============================================================
    // NUEVO PRODUCTO
    // ============================================================

    function abrirNuevoProducto() {

        /**
         * Al poner el producto seleccionado en null,
         * ProductoDialog sabe que debe mostrar el formulario
         * de creación.
         */
        setProductoSeleccionado(null);

        setDialogAbierto(true);

    }


    // ============================================================
    // EDITAR PRODUCTO
    // ============================================================

    function abrirEditarProducto(
        producto: Producto
    ) {

        setProductoSeleccionado(producto);

        setDialogAbierto(true);

    }


    // ============================================================
    // GUARDAR PRODUCTO
    // ============================================================

    async function guardarProducto(
        data: ProductoFormData
    ) {

        try {

            // ----------------------------------------------------
            // NUEVO
            // ----------------------------------------------------

            if (!productoSeleccionado) {

                const nuevoProducto =
                    await crearProducto(data);

                setProductos((actuales) => [
                    nuevoProducto,
                    ...actuales,
                ]);

                toast.success(
                    "Producto creado correctamente."
                );

            }

            // ----------------------------------------------------
            // EDICIÓN
            // ----------------------------------------------------

            else {

                const productoActualizado =
                    await actualizarProducto(
                        productoSeleccionado.id,
                        data
                    );

                setProductos((actuales) =>
                    actuales.map((producto) =>
                        producto.id === productoActualizado.id
                            ? productoActualizado
                            : producto
                    )
                );

                toast.success(
                    "Producto actualizado correctamente."
                );

            }

            // ----------------------------------------------------
            // CERRAR DIÁLOGO
            // ----------------------------------------------------

            setDialogAbierto(false);

            setProductoSeleccionado(null);

        } catch (error) {

            console.error(
                "Error al guardar producto:",
                error
            );

            toast.error(
                "No fue posible guardar el producto."
            );

        }

    }


    // ============================================================
    // FILTRAR PRODUCTOS
    // ============================================================

    const productosFiltrados = productos.filter(
        (producto) => {

            const texto =
                busqueda
                    .toLowerCase()
                    .trim();

            if (!texto) {
                return true;
            }

            return (
                producto.codigo
                    .toLowerCase()
                    .includes(texto) ||

                producto.nombre
                    .toLowerCase()
                    .includes(texto) ||

                producto.descripcion
                    ?.toLowerCase()
                    .includes(texto)
            );

        }
    );


    // ============================================================
    // RENDER
    // ============================================================

    return (
        <div className="flex h-full flex-col gap-5 p-4 md:p-6">

            {/* =====================================================
                ENCABEZADO
               ===================================================== */}

            <div>

                <h1 className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-[#414655]
                    md:text-3xl
                ">
                    Inventario
                </h1>

                <p className="
                    mt-1
                    text-sm
                    text-[#414655]/60
                ">
                    Administra los productos de tu inventario.
                </p>

            </div>


            {/* =====================================================
                TOOLBAR
               ===================================================== */}

            <ProductosToolbar
                busqueda={busqueda}
                onBusquedaChange={setBusqueda}
                onNuevoProducto={abrirNuevoProducto}
            />


            {/* =====================================================
                TABLA
               ===================================================== */}

            <div className="
                min-h-0
                flex-1
                overflow-auto
            ">

                {cargando ? (

                    <div className="
                        flex
                        h-40
                        items-center
                        justify-center
                        text-sm
                        text-[#414655]/60
                    ">
                        Cargando productos...
                    </div>

                ) : (

                    <ProductosTable
                        productos={productosFiltrados}
                        onEditar={abrirEditarProducto}
                    />

                )}

            </div>


            {/* =====================================================
                DIALOG
               ===================================================== */}

            <ProductoDialog
                open={dialogAbierto}
                onOpenChange={setDialogAbierto}
                producto={productoSeleccionado}
                onSubmit={guardarProducto}
            />


            {/* =====================================================
                NOTIFICACIONES
               ===================================================== */}

            <Toaster
                position="top-right"
                richColors
            />

        </div>
    );
}