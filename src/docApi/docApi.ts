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


export const SearchApi = async (search: string) => {
   
    const response = await axios.get(`/api/search?search=${search}`);
 
    return response.data
  };
  