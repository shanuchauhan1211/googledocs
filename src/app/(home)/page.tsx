"use client";
import Navbar from "./_components/Navbar";
import { Templates } from "./_components/Templates";
import DocumentTable from "./_components/DocumentTable";
import { useQuery } from "@tanstack/react-query";
import { useDocStore } from "@/store/docStore";
import { getAllDocuments } from "@/frontendApis/docApi/docApi";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuthStore();
  const setDocs = useDocStore((state) => state.setDocs);

  //const { docs } = useDocStore();

  const { data: documents } = useQuery({
    queryKey: ["Docs", user?._id],
    queryFn: () => getAllDocuments(user ? user._id : ""),
    enabled: !!user?._id,
  });

  // const { data: AllUser } = useQuery({
  //   queryKey: ["Alluser", user?._id],
  //   queryFn: getAllUser,
  //   enabled: !!user?._id,
  // });

  // useEffect(()=>{
  //   if(AllUser)
  //   {
  //     setAlluser(AllUser.Alluser);

  //   }
  // },[AllUser,setAlluser])

  useEffect(() => {
    if (documents?.doc && Array.isArray(documents.doc)) {
      setDocs(documents.doc);
    }
  }, [documents, setDocs]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 right-0 left-0 z-20 px-5 h-[64px] bg-white">
        <Navbar />
      </div>
      <div className="mt-[64px]">
        <Templates />
      </div>
      <div className="mt-6">
        <DocumentTable />
      </div>
    </div>
  );
};

export default Home;
