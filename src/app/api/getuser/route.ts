import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";


export async function GET(req:NextRequest){

    const { searchParams } = new URL(req.url);
    const collaboratorIds = searchParams.getAll("collaboratorIds[]");
await connectDB();
try {
    

    let Info = await Promise.all(
        collaboratorIds.map(async (id: string) => {
          const userInfo = await User.findById(id, "_id name");
          return userInfo ? { _id: userInfo._id, name: userInfo.name } : null;
        })
      );
      
   
      Info = Info.filter(user => user !== null);
      
return NextResponse.json({message:"Fetch Successfull",Info},{status:200});

} catch (error) {

    return NextResponse.json({message:`${error}`},{status:500});
}



}
