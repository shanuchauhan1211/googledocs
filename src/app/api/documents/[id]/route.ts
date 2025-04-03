import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Documents";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const doc = await Document.findById(params.id);
        if (!doc) {
            return NextResponse.json({ message: "Document Not Available" }, { status: 400 });
        }

        return NextResponse.json({ message: "Document Fetched Successfully", doc }, { status: 200 });

    } catch (error) {
        //console.error("GET Error:", error);
        return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const deletedDoc = await Document.findByIdAndDelete(params.id);

        if (!deletedDoc) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Document deleted", doc: deletedDoc }, { status: 200 });

    } catch (error) {
        //console.error("DELETE Error:", error);
        return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { title, action, collaboratorIds, content } = await request.json();
        await connectDB();
//console.log(title,action);
        let updatedDoc;

        if (action === "updateTitle") {
            updatedDoc = await Document.findByIdAndUpdate(params.id, { title }, { new: true });
            console.log(updatedDoc);
        } 
        else if (action === "updateContent") {
            updatedDoc = await Document.findByIdAndUpdate(params.id, { content }, { new: true });
        } 
        else if (action === "updateCollaborators") {
            updatedDoc = await Document.findByIdAndUpdate(params.id, { collaboratorIds }, { new: true });
        } 
        else {
            return NextResponse.json({ message: "Invalid action" }, { status: 400 });
        }

        if (!updatedDoc) {
            return NextResponse.json({ message: "Document not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Document Updated Successfully", doc: updatedDoc }, { status: 200 });

    } catch (error) {
       // console.error("PATCH Error:", error);
        return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
}
