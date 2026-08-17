import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import type { Producto } from "@/types/producto";

interface ProductosTableProps {
    productos: Producto[];
    onEditar: (producto: Producto) => void;
}

export default function ProductosTable({
    productos,
    onEditar,
}: ProductosTableProps) {

    const columns: ColumnDef<Producto>[] = [
        {
            accessorKey: "codigo",
            header: "Código",
        },
        {
            accessorKey: "nombre",
            header: "Producto",
        },
        {
            accessorKey: "unidad_medida",
            header: "Unidad",
        },
        {
            accessorKey: "precio_compra",
            header: "Precio compra",
            cell: ({ row }) => (
                <span>
                    ${Number(row.original.precio_compra).toFixed(2)}
                </span>
            ),
        },
        {
            accessorKey: "precio_venta",
            header: "Precio venta",
            cell: ({ row }) => (
                <span className="font-medium">
                    ${Number(row.original.precio_venta).toFixed(2)}
                </span>
            ),
        },
        {
            accessorKey: "stock",
            header: "Stock",
            cell: ({ row }) => (
                <span>
                    {row.original.stock}
                </span>
            ),
        },
        {
            accessorKey: "activo",
            header: "Estado",
            cell: ({ row }) => (
                row.original.activo ? (
                    <Badge
                        className="
                            border
                            border-[#cfe6fd]
                            bg-[#e3f1fd]
                            text-[#2f9af4]
                            hover:bg-[#e3f1fd]
                        "
                    >
                        Activo
                    </Badge>
                ) : (
                    <Badge
                        variant="outline"
                        className="text-[#414655]"
                    >
                        Inactivo
                    </Badge>
                )
            ),
        },
        {
            id: "acciones",
            header: "Acciones",
            cell: ({ row }) => (
                <div className="flex justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditar(row.original)}
                        className="
                            h-8
                            w-8
                            text-[#414655]
                            hover:bg-[#e3f1fd]
                            hover:text-[#2f9af4]
                        "
                        title="Editar producto"
                    >
                        <Pencil className="size-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: productos,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full overflow-x-auto">

            <Table className="border-separate border-spacing-0">

                {/* =====================================================
                    ENCABEZADO
                   ===================================================== */}

                <TableHeader>

                    {table.getHeaderGroups().map((headerGroup) => (

                        <TableRow
                            key={headerGroup.id}
                            className="hover:bg-[#2f9af4]"
                        >

                            {headerGroup.headers.map((header) => (

                                <TableHead
                                    key={header.id}
                                    className="
                                        h-11
                                        border-0
                                        bg-[#2f9af4]
                                        px-4
                                        font-semibold
                                        text-white
                                        first:rounded-tl-lg
                                        last:rounded-tr-lg
                                    "
                                >

                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                </TableHead>

                            ))}

                        </TableRow>

                    ))}

                </TableHeader>


                {/* =====================================================
                    CUERPO
                   ===================================================== */}

                <TableBody>

                    {table.getRowModel().rows.length ? (

                        table.getRowModel().rows.map((row, index) => (

                            <TableRow
                                key={row.id}
                                className={`
                                    border-0
                                    text-[#414655]
                                    transition-colors
                                    hover:bg-[#e3f1fd]
                                    ${index % 2 === 0
                                        ? "bg-white"
                                        : "bg-[#f5faff]"
                                    }
                                `}
                            >

                                {row.getVisibleCells().map((cell) => (

                                    <TableCell
                                        key={cell.id}
                                        className="
                                            border-0
                                            px-4
                                            py-3
                                        "
                                    >

                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}

                                    </TableCell>

                                ))}

                            </TableRow>

                        ))

                    ) : (

                        <TableRow>

                            <TableCell
                                colSpan={columns.length}
                                className="
                                    h-24
                                    border-0
                                    text-center
                                    text-[#414655]
                                "
                            >
                                No hay productos.
                            </TableCell>

                        </TableRow>

                    )}

                </TableBody>

            </Table>

        </div>
    );
}