import Editor from "@/app/_components/Editor";
import ToolBar from "@/app/_components/ToolBar";

interface DocumentIdPageProps{
    params:Promise<{documentId:string}>;
};


const DocumentIdPage = async({params}:DocumentIdPageProps) => {

const {documentId} = await params;
  return (
    <>
    <ToolBar/>
     <Editor/>
    
    </>
   
  )
}

export default DocumentIdPage