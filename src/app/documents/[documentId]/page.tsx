import Editor from "@/app/_components/Editor";
import NavBar from "@/app/_components/NavBar";
import ToolBar from "@/app/_components/ToolBar";

interface DocumentIdPageProps{
    params:Promise<{documentId:string}>;
};


const DocumentIdPage = async({params}:DocumentIdPageProps) => {

const {documentId} = await params;
  return (
    <>
    <div className="min-h-screen">
      <div className="flex flex-col px-4  fixed top-0 left-0 right-0 z-10 bg-[white] rounded-xl">
      <NavBar/>
      <ToolBar/>
      </div>
    <div className="pt-[116px]  print:pt-0">
    <Editor/>
    </div>
    
     </div>
    
    </>
   
  )
}

export default DocumentIdPage