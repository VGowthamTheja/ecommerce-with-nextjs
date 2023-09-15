import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/prisma/db";
import { sendMail } from "@/lib/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password, username } = reqBody;

        if (!email || !password || !username) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await prisma.users.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const [first_name, last_name] = username.split(" ");

        const newUser = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                first_name,
                last_name,
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        // send email verification email
        await sendMail({ email, emailType: 'VERIFY', userId: newUser.id });

        return NextResponse.json({
            message: "User created successfully",
            sucess: true,
            newUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}