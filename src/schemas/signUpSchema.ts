import { z } from "zod"

export const usernameValidation = z
    .string()
    .min(2, "username should contain atleast 2 characters")
    .max(10, "username should not contain more than 10 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "username should not contain any special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password should be atleast 6 characters" })
})