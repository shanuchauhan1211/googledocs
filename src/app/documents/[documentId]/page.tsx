"use client";
import { use, useEffect } from "react";
import Editor from "@/app/_components/Editor";
import NavBar from "@/app/_components/NavBar";
import ToolBar from "@/app/_components/ToolBar";
import { getAllUser, getDocApi } from "@/docApi/docApi";
import { useQuery } from "@tanstack/react-query";
import { useDocStore } from "@/store/docStore";
import { Room } from "./Room";
import { hydrateAuthState, useAllUserStore} from "@/store/authStore";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const { documentId } = use(params);
    const{setAlluser} = useAllUserStore();
  const setCurrentDoc = useDocStore ((state) => state.setCurrentDoc);
  const { data: document, isLoading } = useQuery({
    queryKey: ["document", documentId],
    queryFn: () => getDocApi(documentId),
    enabled: !!documentId, 
  });

  useEffect(() => {
    if (document?.doc) {
      setCurrentDoc(document.doc);
      hydrateAuthState();
    }
  }, [document]);


 const { data: AllUser } = useQuery({
    queryKey: ["Alluser", documentId],
    queryFn: getAllUser,  
    enabled: !!documentId,
  });

  useEffect(()=>{
    if(AllUser)
    {
      setAlluser(AllUser.Alluser);

    }
  },[AllUser,setAlluser])




  return (
    <>
    {
     document &&!isLoading &&
     ( 
      <Room>
     <div className="min-h-screen">
      <div className="flex flex-col px-4 pb-2.5 shadow-md fixed top-0 left-0 right-0 z-10 bg-[white] rounded-xl">
        <NavBar  />
        <ToolBar />
      </div>
      <div className="pt-[116px] print:pt-0">
        
        <Editor document={document?.doc} />
        
        
      </div>
    </div>
    </Room>
     )
    }
    </>
  );
};

export default DocumentIdPage;
