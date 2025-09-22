import { createProducto, getProductos } from "@/services/productos";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const productos = await getProductos();
        return NextResponse.json(productos);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const nuevoProducto = await createProducto(body);
        return NextResponse.json(nuevoProducto, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}