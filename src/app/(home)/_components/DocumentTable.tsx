import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { deleteDocument, SearchApi, UpdateDocApi } from "@/docApi/docApi";
import { showToast } from "@/lib/toast-helperfxn";
import { useSearch } from "@/hooks/use-search";
import { useDocStore } from "@/store/docStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter} from "next/navigation";
import { useEffect, useState } from "react";

export default function DocumentTable() {

const {docs,setDocs} = useDocStore();
const router =  useRouter();
const [search] =useSearch();
const queryClient = useQueryClient(); 
const [renameDialog, setRenameDialog] = useState(false);
const [selectedDoc, setSelectedDoc] = useState("");
const [newTitle, setNewTitle] = useState("");


const { data:documents } = useQuery({
  queryKey: ["Docs", search],
  queryFn: () => SearchApi(search),
  
});

useEffect(()=>{
if(documents?.docs && Array.isArray(documents.docs))
{
  setDocs(documents.docs);
}
},[documents,setDocs])

const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
        return await deleteDocument(id); 
    },
    onSuccess: (deletedId) => {
        setDocs(docs ? docs.filter(doc => doc._id !== deletedId) : []);
        queryClient.invalidateQueries( {queryKey:["Docs"]});  
        showToast("success","deleted")
    },
    onError: (error) => {
        console.error("Failed to delete document:", error);
        showToast("error","Failed to delete document:")
    }
});

const action ="updateTitle";
const renameMutation = useMutation({
  mutationFn: async ({ id, newTitle ,action}:{id:string;newTitle:string;action:string}) => UpdateDocApi({title:newTitle},action,id),
  onSuccess: (updatedDoc) => {
    setDocs(docs?docs.map((doc) => (doc._id === updatedDoc._id ? updatedDoc : doc)):[]);
    queryClient.invalidateQueries({ queryKey: ["Docs"] });
    showToast("success", "Document renamed successfully");
    setRenameDialog(false);
  },
  onError: () => {
    showToast("error", "Failed to rename document");
  },
});





  return (
    <div className="px-24 py-5">
        <p className=" text-xl  mb-4 ">Your Documents List</p>
        <Table className="" >
      <TableHeader  className="bg-[#F1F3F4] text-[#4b4b4b]">
        <TableRow   >
          <TableHead  className="border hover:border-t-[#9b9b9b] " >Title</TableHead>
          <TableHead  className="border hover:border-t-[#9b9b9b] "  >Created At</TableHead>
          <TableHead  className="border hover:border-t-[#9b9b9b] "  >Updated At</TableHead>
          <TableHead  className="border hover:border-t-[#9b9b9b] "  >Delete/Rename</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-[#F1F3F4]">
  {docs && docs.length > 0 ? (
    docs?.map((doc, index) => (
      <TableRow className={`${deleteMutation?.status==='pending'?` opacity-30`:``}`}  key={doc._id || index}>
        <TableCell 
          onClick={() => router.push(`/documents/${doc._id}`)}
          className="border hover:border-b-[#9b9b9b] cursor-pointer"
        >
          {doc.title}
        </TableCell>
        <TableCell className="border hover:border-b-[#9b9b9b]">
          {doc.createdAt ? format(new Date(doc.createdAt), "dd MMM yyyy, hh:mm a") : "N/A"}
        </TableCell>
        <TableCell className="border hover:border-b-[#9b9b9b]">
          {doc.updatedAt ? format(new Date(doc.updatedAt), "dd MMM yyyy, hh:mm a") : "N/A"}
        </TableCell>
        <TableCell className="border flex justify-evenly hover:border-b-[#9b9b9b]">
            <Button variant="destructive" size="sm" disabled={deleteMutation.status==='pending'} onClick={()=>{deleteMutation.mutate(doc?._id)}}> <TrashIcon className="size-4"/></Button>
            <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="sm" onClick={() => { setSelectedDoc(doc._id); setNewTitle(doc.title); setRenameDialog(true); }}>
                        <PencilIcon className="size-4" />
                      </Button>
                    </DialogTrigger>
                    {renameDialog && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Rename Document</DialogTitle>
                        </DialogHeader>
                        <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <DialogFooter>
                          <Button onClick={() => renameMutation.mutate({ id: selectedDoc, newTitle,action })}>Rename</Button>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={3} className="text-center py-4 text-gray-500">
        No Documents Found
      </TableCell>
    </TableRow>
  )}
</TableBody>
    </Table>
    </div>
    
  );
}
