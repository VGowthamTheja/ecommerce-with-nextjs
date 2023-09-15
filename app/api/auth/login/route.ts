import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/prisma/db";


import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await prisma.users.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return NextResponse.json({ error: "Email not found" }, { status: 400 });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        if (!user.verified) {
            return NextResponse.json({ error: "Email not yet verified. Please verify your email and try again!" }, { status: 400 });
        }

        // TODO: Generate JWT token
        const tokenData = {
            id: user.id,
            email: user.email,
            username: `${user.first_name} ${user.last_name}`
        }

        // create a token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        });

        const response = NextResponse.json({
            message: "User logged in successfully",
            sucess: true,
            user
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 // 1 day
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}