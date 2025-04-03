import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Documents";


export async function GET(req: Request, { params }: { params: { id: string } } ) {
  try {
    await connectDB();
    const { id } = params;
    const doc = await Document.findById(id);

    if (!doc) {
      return NextResponse.json({ message: "Document Not Available" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document Fetched Successfully", doc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: { id: string } } ) {
  try {
    await connectDB();
    const { id } = params;
    const deletedDoc = await Document.findByIdAndDelete(id);

    if (!deletedDoc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document deleted successfully", doc: deletedDoc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 });
  }
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, action, collaboratorIds, content }: 
      { title?: string; action: "updateTitle" | "updateContent" | "updateCollaborators"; collaboratorIds?: string[]; content?: string } 
      = await req.json();

    await connectDB();
    const { id } = params;
    
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
