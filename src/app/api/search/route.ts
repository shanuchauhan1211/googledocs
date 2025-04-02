import { NextRequest, NextResponse } from "next/server";
import Document from "@/models/Documents";
import { connectDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB(); 

    const query = req.nextUrl.searchParams;
    const title = query.get("search") || "";
   
    const filter = title ? { title: { $regex: title, $options: "i" } } : {};

    const docs = await Document.find(filter);

    return NextResponse.json({ docs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
