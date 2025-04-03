'use client'

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar"

import {  LogOutIcon,  PersonStandingIcon,  Settings2Icon, } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { showToast } from "@/lib/toast-helperfxn"
export const Profile = ()=>{
    const {logout} = useAuthStore();
    const router = useRouter();
    return(
<Menubar>
        <MenubarMenu  >
            <MenubarTrigger className="duration-300 hover:text-white hover:bg-[#c7c7c7]">Profile</MenubarTrigger>
            <MenubarContent className="print:hidden">
              
              <MenubarItem onClick={() => {}}>
                <Settings2Icon className="size-4 mr-2"/>
                Manage Setting
              </MenubarItem>
              <MenubarItem onClick={() => {}}>
                <PersonStandingIcon className="size-4 mr-2"/>
                Detail
              </MenubarItem>
              <MenubarSeparator className="bg-slate-300" />
              
              <MenubarItem onClick={()=>{logout() ; showToast("default","Logged Out Successfully"); router.push("/auth/SignIn")}}>
                <LogOutIcon className="size-4 mr-2"/>
                Log Out
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          </Menubar>
    )
}