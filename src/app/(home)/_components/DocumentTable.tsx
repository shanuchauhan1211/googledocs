import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { deleteDocument } from "@/docApi/docApi";
import { showToast } from "@/lib/toast-helperfxn";

import { useDocStore } from "@/store/docStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";

import { useRouter } from "next/navigation";

export default function DocumentTable() {

const {docs,setDocs} = useDocStore();
const router =  useRouter();

const queryClient = useQueryClient(); 


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

  return (
    <div className="px-24 py-5">
        <p className=" text-xl  mb-4 ">Your Documents List</p>
        <Table className="" >
      <TableHeader  className="bg-[#F1F3F4] text-[#4b4b4b]">
        <TableRow   >
          <TableHead  className="border hover:border-t-[#9b9b9b] " >Title</TableHead>
          <TableHead  className="border hover:border-t-[#9b9b9b] "  >Created At</TableHead>
          <TableHead  className="border hover:border-t-[#9b9b9b] "  >Updated At</TableHead>
          <TableHead  className="border hover:border-t-[#9b9b9b] "  >Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-[#F1F3F4]">
  {docs?.length! > 0 ? (
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
        <TableCell className="border hover:border-b-[#9b9b9b]">
            <button className="bg-red-600  hover:bg-red-400 p-1 text-white rounded-2xl" disabled={deleteMutation.status==='pending'} onClick={()=>{deleteMutation.mutate(doc?._id)}}> <TrashIcon className="size-4"/></button>
          
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
