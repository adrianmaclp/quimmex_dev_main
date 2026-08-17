export interface Producto {
    id: string;
    codigo: string;
    nombre: string;
    descripcion: string | null;
    unidad_medida: string;
    precio_compra: number;
    precio_venta: number;
    stock: number;
    stock_minimo: number;
    activo: boolean;
    created_at: string;
    updated_at: string;
}

export interface ProductoFormData {
    codigo: string;
    nombre: string;
    descripcion: string;
    unidad_medida: string;
    precio_compra: number;
    precio_venta: number;
    stock: number;
    stock_minimo: number;
    activo: boolean;
}
