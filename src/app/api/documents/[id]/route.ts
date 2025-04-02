import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Documents";


export async function GET(req:NextRequest,{params}:{params:{id:String}})
{

try {
    await connectDB();

    const doc = await Document.findById(params.id);
    if(!doc)
    {
        return NextResponse.json({message:" Document is Not Available"},{status:400});
    }

    return NextResponse.json({message:"Docunment Fetch Successfully",doc},{status:200});


} catch (error) {
    return NextResponse.json({message:"Failed to fetch Doc"},{status:500})
}
}



export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const deletedDoc = await Document.findByIdAndDelete(params.id);
  
    if (!deletedDoc) return NextResponse.json({ error: "Document not found" }, { status: 404 });
  
    return NextResponse.json({ message: "Document deleted" ,doc:deletedDoc},{status:200});
  }