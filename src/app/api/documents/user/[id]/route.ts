import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Documents";


interface ContextParams {
    params: {
      id: string;
    };
  }
  

export async function GET(req:NextRequest,context:ContextParams){

try {
await connectDB();
const {id} =context.params;
const doc = await Document.find({ownerId:id});

if(!doc)
{
    return NextResponse.json({message:'Document Not Found'},{status:404});
}

return NextResponse.json({message:"Fetch Successfully", doc},{status:200});

    
} catch (error) {
    return NextResponse.json({message:`${error}`},{status:500});
}
}