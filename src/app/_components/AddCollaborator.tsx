"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { PlusCircleIcon, Settings2Icon } from "lucide-react";

// import { useAuthStore } from "@/store/authStore";
// import { useQuery } from "@tanstack/react-query";
// import { getAllUser } from "@/docApi/docApi";
import { useAllUserStore } from "@/store/authStore";
import { UpdateDocApi } from "@/frontendApis/docApi/docApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDocStore } from "@/store/docStore";
import { showToast } from "@/lib/toast-helperfxn";

// const Alluser = [{
//     name:"Shantnau",
//     email:"Shanu1211chauhan@gmail.com",
//     _id:"23456"
// }]

export const AddCollaborator = () => {
  const { AllUser } = useAllUserStore();
  const { docs, setDocs, currentDoc } = useDocStore();
  const queryClient = useQueryClient();

  const action = "updateCollaborators";
  const addCollaboratorMutation = useMutation({
    mutationFn: async ({
      id,
      collaboratorId,
      action,
    }: {
      id: string;
      collaboratorId: string;
      action: string;
    }) => UpdateDocApi({ collaboratorId: collaboratorId }, action, id),
    onSuccess: (updatedDoc) => {
      setDocs(
        docs
          ? docs.map((doc) => (doc._id === updatedDoc._id ? updatedDoc : doc))
          : [],
      );
      queryClient.invalidateQueries({ queryKey: ["document"] });
      queryClient.invalidateQueries({ queryKey: ["Docs"] });
      queryClient.invalidateQueries({ queryKey: ["Docuser"] });
      showToast("success", "User added successfully");
    },
    onError: () => {
      showToast("error", "Failed to Add");
    },
  });

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="duration-300 hover:text-white hover:bg-[#c7c7c7]">
          <PlusCircleIcon className="size-4 mr-2" /> Add Collaborator
        </MenubarTrigger>
        <MenubarContent className="print:hidden">
          {AllUser && AllUser.length > 1 ? (
            AllUser.filter(
              (user) => !currentDoc?.collaboratorIds?.includes(user._id),
            ).map((u) => (
              <MenubarItem
                key={u._id}
                onClick={() =>
                  addCollaboratorMutation.mutate({
                    id: currentDoc?._id as string,
                    collaboratorId: u._id,
                    action,
                  })
                }
              >
                <Settings2Icon className="size-4 mr-2" />
                {u.email}
              </MenubarItem>
            ))
          ) : (
            <div>No Collaborators</div>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
