import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { password, token } = reqBody;

        if (!password || !token) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await prisma.users.findUnique({
            where: {
                forgot_password_token: token.toString(),
                forgot_password_expires: {
                    gte: new Date()
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const updatedUser = await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                password: hashedPassword,
                forgot_password_token: null,
                forgot_password_expires: null
            }
        });

        return NextResponse.json({ message: "Password reset successfully", success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}