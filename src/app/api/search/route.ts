import { NextRequest, NextResponse } from "next/server";
import Document from "@/models/Documents";
import { connectDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB(); 

    // const query = req.nextUrl.searchParams;
    // const title = query.get("search") || "";

    const { searchParams } = new URL(req.url);
  const title = searchParams.get("search");
  const id = searchParams.get("id");
  
     const filter = title ? { title: { $regex: title, $options: "i" } } : {};
    // const filter = {
    //   ownerId: id, 
    //   ...(title && { title: { $regex: title, $options: "i" } }), 
    // };

    const filterdocs = await Document.find(filter);
const docs = filterdocs.filter((item)=> item.ownerId ===id );
    return NextResponse.json({ docs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
