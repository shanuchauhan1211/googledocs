import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";


export async function GET(_:NextRequest){

try {
    await connectDB();

    const Alluser = await User.find();

    return NextResponse.json({message:" Fetch All User",Alluser},{status:200})

     
} catch (error) {
    return NextResponse.json({message:`${error}`},{status:500})
}


}