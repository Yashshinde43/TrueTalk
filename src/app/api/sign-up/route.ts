// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect"
import { resend } from "@/lib/resend";
import UserModel from "@/model/User"
import bcrypt from "bcryptjs"
import EmailTemplate from "../../../../emails/VerificationEmail";
import { Resend } from "resend";
// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { username, email, password } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true });
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "username is already created"
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); //6 digit code

        if (existingUserByEmail) {

            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exist with this Email"
                }, { status: 400 })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }

        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save();
            // sending verification Email to the new user 
            const resend = new Resend(process.env.RESEND_API_KEY);

            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: email,
                subject: "Verification Code",
                react: EmailTemplate({ username, otp: verifyCode }) as React.ReactElement,
            });
            return Response.json({ success: true, data });


            //     const emailResponse = await sendVerificationEmail(
            //         email,
            //         username,
            //         verifyCode
            //     )

            //     if (!emailResponse.) {
            //         return Response.json({
            //             success: false,
            //             message: "Error in sending email",
            //         }, { status: 500 })
            //     }
            // }

            return Response.json({
                success: true,
                message: "User registered successfully. Please Verify your Email"
            }, { status: 201 })

        }
    } catch (error) {
        console.log("Error Registering User", error);
        return Response.json(
            { success: false, message: "Error Registering User" },
            { status: 500 }
        )
    }
}
