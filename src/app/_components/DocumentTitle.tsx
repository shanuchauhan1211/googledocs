
import {BsCloudCheck} from "react-icons/bs";

export const DocumentTitle=()=>{
    return(
        <div className="flex items-center gap-2">
            <span className="text-md px-1 cursor-pointer truncate">Untited Document </span>
            <BsCloudCheck className="size-4"/>
        </div>
    )
}