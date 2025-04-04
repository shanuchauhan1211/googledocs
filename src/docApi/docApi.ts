'use client'
import axios from "axios";







export const  createApi = async(data:{title:string,content:string,ownerId:string})=>{
const response = await axios.post("/api/documents",data);
return response.data;
}


export const getDocApi = async (id:string)=>{
    const response = await axios.get(`/api/documents/${id}`);
    return response.data;
}

export const getAllDocuments = async(id:string)=>{
    const response = await axios.get(`api/documents/user/${id}`);
    
    return response.data;
}

export const deleteDocument = async(id:string)=>{
    const response = await axios.delete(`api/documents/${id}`);
   
    return response.data.doc._id;
}


export const SearchApi = async (search: string,data:{id:string}) => {
   
    const response = await axios.get(`/api/search?search=${search}`,{
        params:{search,id:data.id},
    });
 
    return response.data
  };
  
  export const UpdateDocApi = async(data: { title?: string; content?: string; collaboratorId?: string;},action:string, id: string) =>
  {
    const response = await axios.patch(`/api/documents/${id}`,{ ...data, action });
    console.log(response);
    return response.data.doc;
  }


export const getDocUser = async(data:{collaboratorIds:string[]})=>{
    console.log(data.collaboratorIds)
    const response = await axios.get('/api/getuser', { params: {collaboratorIds:data.collaboratorIds} });

return response.data;
}


export const getAllUser = async() =>{
    const response = await axios.get('/api/getAllUser');
    return response.data;
}


//   export const fetchLiveblocksAuth = async (room: string) => {
//     if (!room) throw new Error("Room ID is required for authentication");
  
//     const response = await axios.post(
//       "/api/liveblock-auth",
//       { room },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true, 
//       }
//     );
  
//     return response.data;
//   };
  