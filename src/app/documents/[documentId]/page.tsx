"use client";
import { use, useEffect } from "react";
import Editor from "@/app/_components/Editor";
import NavBar from "@/app/_components/NavBar";
import ToolBar from "@/app/_components/ToolBar";
import { getDocApi } from "@/docApi/docApi";
import { useQuery } from "@tanstack/react-query";
import { useDocStore } from "@/store/docStore";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const { documentId } = use(params);
  const setCurrentDoc = useDocStore ((state) => state.setCurrentDoc);
  
  const { data: document, isLoading } = useQuery({
    queryKey: ["document", documentId],
    queryFn: () => getDocApi(documentId),
    enabled: !!documentId, 
  });

  useEffect(() => {
    if (document?.doc) {
      setCurrentDoc(document.doc);
    }
  }, [document]);


  return (
    <>
    {
     document &&!isLoading &&
     ( <div className="min-h-screen">
      <div className="flex flex-col px-4 pb-2.5 shadow-md fixed top-0 left-0 right-0 z-10 bg-[white] rounded-xl">
        <NavBar  />
        <ToolBar />
      </div>
      <div className="pt-[116px] print:pt-0">
        <Editor document={document?.doc} />
      </div>
    </div>
     )
    }
    </>
  );
};

export default DocumentIdPage;
