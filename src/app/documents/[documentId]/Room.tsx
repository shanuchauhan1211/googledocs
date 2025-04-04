"use client";

import { ReactNode, useEffect } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "../../loading";
import { useParams } from "next/navigation";
import { useCurrentDocStore, useDocStore } from "@/store/docStore";
import { useQuery } from "@tanstack/react-query";
import { getDocUser } from "@/docApi/docApi";

 

export function Room({ children }: { children: ReactNode }) {
  const param = useParams();
const {currentDoc} = useDocStore();
  const {currentDocUser,setCurrentDocUser} = useCurrentDocStore();
 

    const { data: users } = useQuery({
      queryKey: ["Docuser"],
      queryFn: () =>  getDocUser({ collaboratorIds: currentDoc?.collaboratorIds ?? [] }),
      enabled: !!currentDoc, 
    });
 
    useEffect(()=>{
      
      if(users?.Info?.length > 0)
      {
        setCurrentDocUser(users.Info);
      }
    },[users])
  

   console.log(currentDocUser)
  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint="/api/liveblock-auth" 
      resolveUsers={({userIds})=>{return userIds.map((userId)=> users?.Info?.find(({_id}:{_id:string})=>_id ===userId)??undefined)}}
      resolveMentionSuggestions={({text})=>{let filteredUser = users.Info;
        if(text)
        {
          filteredUser= users.Info.filter(({name}:{name:string})=>name.toLowerCase().includes(text.toLowerCase()))
        }
        return filteredUser.map(({_id}:{_id:string})=> _id);
      }}

    >
      <RoomProvider id={param.documentId as string}>
        <ClientSideSuspense fallback={<div><Loader/></div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
