import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Documents";

export async function GET(req:NextRequest,{params}:{params:{id:String}}){

try {
await connectDB();

const doc = await Document.find({ownerId:params.id});

if(!doc)
{
    return NextResponse.json({message:'Document Not Found'},{status:404});
}

return NextResponse.json({message:"Fetch Successfully", doc},{status:200});

    
} catch (error) {
    return NextResponse.json({message:"Failed to Fetch"},{status:500});
}
}