import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifycode: string,
): Promise<ApiResponse> {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification code',
            react: VerificationEmail({ username, otp: verifycode }), // sending the email component
        });

        return { success: true, message: "Verification Email send sucessfully" }

    } catch (error) {
        console.log("Error in sending verification Email", error)
        return { success: false, message: "Failed to send Email" }
    }
}