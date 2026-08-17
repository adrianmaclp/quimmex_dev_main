import { z } from "zod";

export const productoSchema = z.object({

    codigo: z
        .string()
        .trim()
        .min(1, "El código es obligatorio")
        .max(50, "El código no puede superar los 50 caracteres"),

    nombre: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio")
        .max(150, "El nombre no puede superar los 150 caracteres"),

    descripcion: z
        .string()
        .trim()
        .max(500, "La descripción no puede superar los 500 caracteres"),

    unidad_medida: z
        .string()
        .trim()
        .min(1, "La unidad de medida es obligatoria")
        .max(20, "La unidad de medida no puede superar los 20 caracteres"),

    precio_compra: z
        .number({
            message: "El precio de compra debe ser un número",
        })
        .min(0, "El precio de compra no puede ser negativo"),

    precio_venta: z
        .number({
            message: "El precio de venta debe ser un número",
        })
        .min(0, "El precio de venta no puede ser negativo"),

    stock: z
        .number({
            message: "El stock debe ser un número",
        })
        .min(0, "El stock no puede ser negativo"),

    stock_minimo: z
        .number({
            message: "El stock mínimo debe ser un número",
        })
        .min(0, "El stock mínimo no puede ser negativo"),

    activo: z.boolean(),
});

export type ProductoFormData = z.infer<
    typeof productoSchema
>;