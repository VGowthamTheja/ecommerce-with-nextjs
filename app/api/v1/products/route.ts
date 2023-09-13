import prisma from "@/prisma/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    const products = await prisma.products.findMany();

    return NextResponse.json(products);
}