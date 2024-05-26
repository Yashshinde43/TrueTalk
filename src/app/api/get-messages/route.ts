import { User } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "User not authenticated"
        }, { status: 401 })
    }
    const user = session?.user as User
    const userId = new mongoose.Types.ObjectId(user._id)
    try {
        const users = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])

        if (!users || users.length === 0) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        return Response.json({
            messages: users[0].messages
        }, { status: 200 })


    } catch (error) {
        console.log('Unexpected error occured: ', error)
        return Response.json({
            success: false,
            message: "User not authenticated"
        }, { status: 500 })
    }
}