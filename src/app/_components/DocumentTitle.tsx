'use client'
import {BsCloudCheck} from "react-icons/bs";
import { useDocStore } from "@/store/docStore";
export const DocumentTitle=()=>{
const {currentDoc} = useDocStore();
    return(
        <div className="flex items-center gap-2">
            <span className="text-md px-1 cursor-pointer truncate">{currentDoc?.title} </span>
            <BsCloudCheck className="size-4"/>
        </div>
    )
}