import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
    productoSchema,
    type ProductoFormData,
} from "@/schemas/productoSchema";

import type { Producto } from "@/types/producto";

// ============================================================
// ESTILOS
// ============================================================

const inputClassName = `
    h-10
    border-[#e5eaf0]
    bg-[#f8fafc]
    text-[#414655]
    shadow-none

    placeholder:text-[#414655]/45

    hover:border-[#cfe6fd]

    focus:border-[#2f9af4]/40
    focus:ring-2
    focus:ring-[#2f9af4]/10
    focus-visible:ring-2
    focus-visible:ring-[#2f9af4]/10
`;

const selectClassName = `
    h-10
    border-[#e5eaf0]
    bg-[#f8fafc]
    text-[#414655]
    shadow-none

    hover:border-[#cfe6fd]

    focus:border-[#2f9af4]/40
    focus:ring-2
    focus:ring-[#2f9af4]/10
    focus-visible:ring-2
    focus-visible:ring-[#2f9af4]/10
`;


interface ProductoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    /**
     * Producto que se está editando.
     *
     * null significa que estamos creando
     * un producto nuevo.
     */
    producto?: Producto | null;

    /**
     * Función que se ejecutará cuando el formulario
     * sea válido y se presione Guardar.
     */
    onSubmit: (data: ProductoFormData) => Promise<void>;
}

export default function ProductoDialog({
    open,
    onOpenChange,
    producto = null,
    onSubmit,
}: ProductoDialogProps) {

    const esEdicion = producto !== null;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<ProductoFormData>({
        resolver: zodResolver(productoSchema),

        defaultValues: {
            codigo: "",
            nombre: "",
            descripcion: "",
            unidad_medida: "PZA",
            precio_compra: 0,
            precio_venta: 0,
            stock: 0,
            stock_minimo: 0,
            activo: true,
        },
    });

    /**
     * Cuando cambia el producto seleccionado,
     * cargamos sus datos en el formulario.
     *
     * Si no hay producto, limpiamos el formulario
     * para crear uno nuevo.
     */
    useEffect(() => {

        if (producto) {

            reset({
                codigo: producto.codigo,
                nombre: producto.nombre,
                descripcion: producto.descripcion ?? "",
                unidad_medida: producto.unidad_medida,
                precio_compra: producto.precio_compra,
                precio_venta: producto.precio_venta,
                stock: producto.stock,
                stock_minimo: producto.stock_minimo,
                activo: producto.activo,
            });

            return;
        }

        reset({
            codigo: "",
            nombre: "",
            descripcion: "",
            unidad_medida: "PZA",
            precio_compra: 0,
            precio_venta: 0,
            stock: 0,
            stock_minimo: 0,
            activo: true,
        });

    }, [producto, open, reset]);


    /**
     * Envía los datos ya validados por Zod.
     */
    const enviarFormulario = async (
        data: ProductoFormData
    ) => {

        await onSubmit(data);

    };


    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent
                className="
                    max-h-[90vh]
                    overflow-y-auto
                    border-0
                    bg-white
                    shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                    sm:max-w-[650px]
                "
            >

                <DialogHeader>

                    <DialogTitle
                        className="
                            text-xl
                            font-bold
                            text-[#2f9af4]
                        "
                    >
                        {esEdicion
                            ? "Editar producto"
                            : "Nuevo producto"}
                    </DialogTitle>

                    <DialogDescription
                        className="
                            text-sm
                            text-[#414655]/65
                        "
                    >
                        {esEdicion
                            ? "Modifica la información del producto."
                            : "Registra un nuevo producto en el inventario."}
                    </DialogDescription>

                </DialogHeader>


                <form
                    onSubmit={handleSubmit(enviarFormulario)}
                    className="space-y-5"
                >

                    {/* =====================================================
                        INFORMACIÓN GENERAL
                       ===================================================== */}

                    <div className="grid gap-4 sm:grid-cols-2">

                        {/* Código */}
                        <div className="space-y-2">

                            <Label htmlFor="codigo">
                                Código
                            </Label>

                            <Input
                                id="codigo"
                                placeholder="Ej. P001"
                                {...register("codigo")}
                                className={inputClassName}
                            />

                            {errors.codigo && (
                                <p className="text-sm text-red-500">
                                    {errors.codigo.message}
                                </p>
                            )}

                        </div>


                        {/* Nombre */}
                        <div className="space-y-2">

                            <Label htmlFor="nombre">
                                Nombre
                            </Label>

                            <Input
                                id="nombre"
                                placeholder="Nombre del producto"
                                {...register("nombre")}
                                className={inputClassName}
                            />

                            {errors.nombre && (
                                <p className="text-sm text-red-500">
                                    {errors.nombre.message}
                                </p>
                            )}

                        </div>

                    </div>


                    {/* Descripción */}
                    <div className="space-y-2">

                        <Label htmlFor="descripcion">
                            Descripción
                        </Label>

                        <Textarea
                            id="descripcion"
                            placeholder="Descripción del producto"
                            rows={3}
                            {...register("descripcion")}
                            className={inputClassName}
                        />

                        {errors.descripcion && (
                            <p className="text-sm text-red-500">
                                {errors.descripcion.message}
                            </p>
                        )}

                    </div>


                    {/* =====================================================
                        UNIDAD DE MEDIDA
                       ===================================================== */}

                    <div className="space-y-2" >

                        <Label>
                            Unidad de medida
                        </Label>

                        <Select
                            value={watch("unidad_medida")}
                            onValueChange={(value) =>
                                setValue(
                                    "unidad_medida",
                                    value,
                                    {
                                        shouldValidate: true,
                                    }
                                )
                            }
                        >

                            <SelectTrigger className={selectClassName}>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent
                                className="
                                    border-0
                                    ring-0
                                    bg-white
                                    text-[#414655]
                                    shadow-[0_8px_24px_rgba(0,0,0,0.10)]
                                "
                            >
                                <SelectItem
                                    value="PZA"
                                    className="
                                        text-[#414655]
                                        focus:bg-[#e3f1fd]
                                        focus:text-[#2f9af4]
                                    "
                                >
                                    Pieza (PZA)
                                </SelectItem>

                                <SelectItem
                                    value="KG"
                                    className="
                                        text-[#414655]
                                        focus:bg-[#e3f1fd]
                                        focus:text-[#2f9af4]
                                    "
                                >
                                    Kilogramo (KG)
                                </SelectItem>

                                <SelectItem
                                    value="LTS"
                                    className="
                                        text-[#414655]
                                        focus:bg-[#e3f1fd]
                                        focus:text-[#2f9af4]
                                    "
                                >
                                    Litro (LTS)
                                </SelectItem>

                                <SelectItem
                                    value="MTS"
                                    className="
                                        text-[#414655]
                                        focus:bg-[#e3f1fd]
                                        focus:text-[#2f9af4]
                                    "
                                >
                                    Metro (MTS)
                                </SelectItem>

                                <SelectItem
                                    value="TBO"
                                    className="
                                        text-[#414655]
                                        focus:bg-[#e3f1fd]
                                        focus:text-[#2f9af4]
                                    "
                                >
                                    Tarro / Bote (TBO)
                                </SelectItem>


                            </SelectContent>

                        </Select>

                        {errors.unidad_medida && (
                            <p className="text-sm text-red-500">
                                {errors.unidad_medida.message}
                            </p>
                        )}

                    </div>


                    {/* =====================================================
                        PRECIOS
                       ===================================================== */}

                    <div>

                        <h3 className="
                            mb-3
                            border-b
                            border-[#e3f1fd]
                            pb-2
                            text-sm
                            font-semibold
                            text-[#414655]
                        ">
                            Precios
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Precio compra */}
                            <div className="space-y-2">

                                <Label htmlFor="precio_compra">
                                    Precio de compra
                                </Label>

                                <Input
                                    id="precio_compra"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    {...register(
                                        "precio_compra",
                                        {
                                            valueAsNumber: true,
                                        }
                                    )}
                                    className={inputClassName}
                                />

                                {errors.precio_compra && (
                                    <p className="text-sm text-red-500">
                                        {errors.precio_compra.message}
                                    </p>
                                )}

                            </div>


                            {/* Precio venta */}
                            <div className="space-y-2">

                                <Label htmlFor="precio_venta">
                                    Precio de venta
                                </Label>

                                <Input
                                    id="precio_venta"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    {...register(
                                        "precio_venta",
                                        {
                                            valueAsNumber: true,
                                        }
                                    )}
                                    className={inputClassName}
                                />

                                {errors.precio_venta && (
                                    <p className="text-sm text-red-500">
                                        {errors.precio_venta.message}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        INVENTARIO
                       ===================================================== */}

                    <div>

                        <h3 className="
                            mb-3
                            border-b
                            border-[#e3f1fd]
                            pb-2
                            text-sm
                            font-semibold
                            text-[#414655]
                        ">
                            Inventario
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Stock */}
                            <div className="space-y-2">

                                <Label htmlFor="stock">
                                    Stock actual
                                </Label>

                                <Input
                                    id="stock"
                                    type="number"
                                    step="0.001"
                                    min="0"
                                    {...register(
                                        "stock",
                                        {
                                            valueAsNumber: true,
                                        }
                                    )}
                                    className={inputClassName}
                                />

                                {errors.stock && (
                                    <p className="text-sm text-red-500">
                                        {errors.stock.message}
                                    </p>
                                )}

                            </div>


                            {/* Stock mínimo */}
                            <div className="space-y-2">

                                <Label htmlFor="stock_minimo">
                                    Stock mínimo
                                </Label>

                                <Input
                                    id="stock_minimo"
                                    type="number"
                                    step="0.001"
                                    min="0"
                                    {...register(
                                        "stock_minimo",
                                        {
                                            valueAsNumber: true,
                                        }
                                    )}
                                    className={inputClassName}
                                />

                                {errors.stock_minimo && (
                                    <p className="text-sm text-red-500">
                                        {errors.stock_minimo.message}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        ESTADO
                       ===================================================== */}

                    {esEdicion && (

                        <div className="space-y-2">

                            <Label>
                                Estado
                            </Label>

                            <Select
                                value={
                                    watch("activo")
                                        ? "activo"
                                        : "inactivo"
                                }
                                onValueChange={(value) =>
                                    setValue(
                                        "activo",
                                        value === "activo",
                                        {
                                            shouldValidate: true,
                                        }
                                    )
                                }
                            >

                                <SelectTrigger className={selectClassName}>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent
                                    className="
                                        border-0
                                        ring-0
                                        bg-white
                                        text-[#414655]
                                        shadow-[0_8px_24px_rgba(0,0,0,0.10)]
                                    "
                                >

                                    <SelectItem
                                        value="activo"
                                        className="
                                            text-[#414655]
                                            focus:bg-[#e3f1fd]
                                            focus:text-[#2f9af4]
                                        "
                                    >
                                        Activo
                                    </SelectItem>

                                    <SelectItem
                                        value="inactivo"
                                        className="
                                            text-[#414655]
                                            focus:bg-[#e3f1fd]
                                            focus:text-[#2f9af4]
                                        "
                                    >
                                        Inactivo
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                    )}


                    {/* =====================================================
                        BOTONES
                       ===================================================== */}

                    <DialogFooter className="border-0 pt-2">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="
                                bg-[#2f9af4]
                                text-white
                                shadow-sm
                                transition-all
                                hover:bg-[#258ee8]
                                hover:shadow-md
                            "
                        >
                            {isSubmitting
                                ? "Guardando..."
                                : esEdicion
                                    ? "Guardar cambios"
                                    : "Crear producto"}
                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    );
}