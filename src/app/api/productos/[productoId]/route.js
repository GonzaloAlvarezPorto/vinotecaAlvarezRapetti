import { deleteProducto, getProductoById, updateProducto } from "@/services/productos";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { productoId } = await params;
        const producto = await getProductoById(productoId);
        if (!producto) {
            return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
        }
        return NextResponse.json(producto);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { productoId } = await params;
        const data = await req.json();
        const productoActualizado = await updateProducto(productoId, data);
        return NextResponse.json(productoActualizado);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { productoId } = await params;
        await deleteProducto(productoId);
        return NextResponse.json({ message: "Producto eliminado" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}