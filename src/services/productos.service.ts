import { supabase } from "@/lib/supabase";

import type { Producto } from "@/types/producto";
import type { ProductoFormData } from "@/schemas/productoSchema";

/**
 * Obtiene todos los productos registrados.
 *
 * Los productos se ordenan por nombre para que
 * la tabla los muestre de manera consistente.
 */
export async function obtenerProductos(): Promise<Producto[]> {

    const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("nombre", { ascending: true });

    if (error) {
        console.error("Error al obtener productos:", error);

        throw error;
    }

    return data ?? [];
}


/**
 * Obtiene un producto específico mediante su ID.
 */
export async function obtenerProducto(
    id: string
): Promise<Producto> {

    const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error al obtener producto:", error);

        throw error;
    }

    return data;
}


/**
 * Crea un nuevo producto.
 *
 * No se envían id, created_at ni updated_at porque
 * esos valores son generados/controlados por PostgreSQL.
 */
export async function crearProducto(
    producto: ProductoFormData
): Promise<Producto> {

    const { data, error } = await supabase
        .from("productos")
        .insert(producto)
        .select()
        .single();

    if (error) {
        console.error("Error al crear producto:", error);

        throw error;
    }

    return data;
}


/**
 * Actualiza un producto existente.
 *
 * updated_at se actualiza automáticamente mediante
 * el trigger creado en PostgreSQL.
 */
export async function actualizarProducto(
    id: string,
    producto: ProductoFormData
): Promise<Producto> {

    const { data, error } = await supabase
        .from("productos")
        .update(producto)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error al actualizar producto:", error);

        throw error;
    }

    return data;
}


/**
 * Desactiva un producto mediante una baja lógica.
 *
 * No eliminamos físicamente el registro porque
 * posteriormente podrá estar relacionado con ventas.
 */
export async function desactivarProducto(
    id: string
): Promise<Producto> {

    const { data, error } = await supabase
        .from("productos")
        .update({
            activo: false,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error al desactivar producto:", error);

        throw error;
    }

    return data;
}


/**
 * Reactiva un producto previamente desactivado.
 */
export async function reactivarProducto(
    id: string
): Promise<Producto> {

    const { data, error } = await supabase
        .from("productos")
        .update({
            activo: true,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error al reactivar producto:", error);

        throw error;
    }

    return data;
}