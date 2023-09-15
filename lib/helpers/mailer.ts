import nodemailer from 'nodemailer';
import { users } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import prisma from '@/prisma/db';

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await prisma.users.update({
                where: {
                    id: userId
                },
                data: {
                    verification_token: hashedToken,
                    verification_expires: new Date(Date.now() + 3600000)
                }
            })
        }

        if (emailType === 'RESET') {
            await prisma.users.update({
                where: {
                    id: userId
                },
                data: {
                    forgot_password_token: hashedToken,
                    forgot_password_expires: new Date(Date.now() + 3600000)
                }
            })
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.CLIENT_URL}/${emailType.toLowerCase()}?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} 
                or copy and paste the link below into your browser: <br />
                ${process.env.CLIENT_URL}/${emailType.toLowerCase()}?token=${hashedToken}
            </p>`
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};