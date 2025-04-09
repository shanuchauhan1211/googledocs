import { NextRequest, NextResponse } from "next/server";
import Document from "@/models/Documents";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { title, content, ownerId } = await req.json();
    await connectDB();

    const newDoc = await Document.create({
      title,
      content,
      ownerId,
      collaboratorIds: [ownerId],
    });

    return NextResponse.json(
      { message: "Document Created Successfully", doc: newDoc._id },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create Document" },
      { status: 500 },
    );
  }
}
