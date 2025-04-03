import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Documents";



export async function GET(req: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Document ID is required" }, { status: 400 });
    }

    const doc = await Document.findById(id);

    if (!doc) {
      return NextResponse.json({ message: "Document Not Available" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document Fetched Successfully", doc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Document ID is required" }, { status: 400 });
    }

    const deletedDoc = await Document.findByIdAndDelete(id);

    if (!deletedDoc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document deleted successfully", doc: deletedDoc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest,   { params }: { params: Promise<{ id: string }> }) {
  try {
    const { title, action, collaboratorIds, content }: 
      { title?: string; action: "updateTitle" | "updateContent" | "updateCollaborators"; collaboratorIds?: string[]; content?: string } 
      = await req.json();

    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Document ID is required" }, { status: 400 });
    }

    let updatedDoc;

    switch (action) {
      case "updateTitle":
        updatedDoc = await Document.findByIdAndUpdate(id, { title }, { new: true });
        break;
      case "updateContent":
        updatedDoc = await Document.findByIdAndUpdate(id, { content }, { new: true });
        break;
      case "updateCollaborators":
        updatedDoc = await Document.findByIdAndUpdate(id, { collaboratorIds }, { new: true });
        break;
      default:
        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    if (!updatedDoc) {
      return NextResponse.json({ message: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document Updated Successfully", doc: updatedDoc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 });
  }
}
