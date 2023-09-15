import { sendMail } from "@/lib/helpers/mailer";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await prisma.users.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        // send email verification email
        await sendMail({ email, emailType: 'RESET', userId: user.id });

        return NextResponse.json({
            message: "Reset password link sent successfully",
            sucess: true,
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}