import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { users } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();

        const { token } = reqBody;

        const user = await prisma.users.findUnique({
            where: {
                verification_token: token.toString(),
                verification_expires: {
                    gte: new Date()
                }

            }
        });
        console.log(user);
        if (!user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
        }

        const updatedUser = await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                verified: true,
                verification_token: null,
                verification_expires: null
            }
        });

        return NextResponse.json({ message: 'Email verified successfully', success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}