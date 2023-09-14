import { getDataFromToken } from "@/lib/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import { users } from "@prisma/client";
import prisma from "@/prisma/db";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getDataFromToken(req);
        const user = await prisma.users.findUnique({
            where: {
                id: (currentUser as users).id
            },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                password: true,
                created_at: true,
                updated_at: true,
                active: true,
                role: true,
                verified: true,
                address: true,
                city: true,
                state: true,
                country: true,
                phone_number: true,
                zip_code: true,
            }
        });

        return NextResponse.json({
            message: "User found",
            user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
