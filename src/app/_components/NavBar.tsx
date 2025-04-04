'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { DocumentTitle } from './DocumentTitle'
import {Menubar,MenubarContent,MenubarItem,MenubarMenu,MenubarSeparator,MenubarSub,MenubarSubContent,MenubarSubTrigger,MenubarTrigger} from "@/components/ui/menubar";
import { FileIcon, FilePenIcon,FileTextIcon, GlobeIcon, PrinterIcon, SaveIcon, Table2Icon, Trash2Icon } from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import { useEditorStore } from '@/store/editorStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Profile } from '../(home)/_components/Profile'
import { AddCollaborator } from './AddCollaborator'

interface RowsAndCols {
  rows: number;
  cols: number;
}





const NavBar = () => {
  const {editor} = useEditorStore();

const initial:RowsAndCols = {
rows:0,
cols:0
}

const[customRowandCol,setCustomRowandCol]= useState({initial});


const onDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename; 
  document.body.appendChild(a); 
  a.click();
  document.body.removeChild(a); 
  URL.revokeObjectURL(url); 
};


const onSaveJSON=()=>{
  if(!editor)return;
  const content = editor.getJSON();
  const blob = new Blob([JSON.stringify(content)],{type:"application/json",});
  onDownload(blob,`document.json`);

}

const onSaveHTML=()=>{
  if(!editor)return;
  const content = editor.getHTML();
  const blob = new Blob([content],{type:"text/html"});
  onDownload(blob,`document.html`);

}


const onSaveText=()=>{
  if(!editor)return;
  const content = editor.getText();
  const blob = new Blob([content],{type:"text/plain"});
  onDownload(blob,`document.txt`);

}


const insertTable =({rows,cols}:{rows:number,cols:number})=>{

  editor?.chain().focus().insertTable({rows,cols, withHeaderRow:false}).run();

}

  return (
    <nav className='px-2 pt-1.5 flex items-center justify-between print:hidden'> 
    <div className='flex items-center gap-2'>
    <Link href={"/"}>
    <Image height={"50"} width={"50"} src="/logo.svg" alt="logo"></Image>
    </Link> 
    <div className='flex flex-col'>
      <DocumentTitle/>
      <div className='flex '>
      <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
  <MenubarMenu>
    <MenubarTrigger className="duration-300 hover:bg-[#c7c7c7]">File</MenubarTrigger>
    <MenubarContent className="print:hidden">
      <MenubarItem>
        <FileIcon className="size-4 mr-2" />
        New Document
      </MenubarItem>
      <MenubarSeparator className="bg-slate-300" />
      <MenubarItem>
        <FilePenIcon className="size-4 mr-2" />
        Rename
      </MenubarItem>
      <MenubarSeparator className="bg-slate-300" />
      <MenubarItem>
        <Trash2Icon className="size-4 mr-2" />
        Remove
      </MenubarItem>
      <MenubarSeparator className="bg-slate-300" />
      <MenubarItem onClick={() => window.print()}>
        <PrinterIcon className="size-4 mr-2" />
        Print
      </MenubarItem>
      <MenubarSeparator className="bg-slate-300" />
      
      <MenubarSub>
        <MenubarSubTrigger>
          <SaveIcon className="size-4 mr-2" />
          Save as
        </MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>
            <FileIcon onClick={onSaveJSON} className="size-4 mr-2" />
            Json
          </MenubarItem>
          <MenubarItem onClick={()=>{window.print()}}>
            <BsFilePdf  className="size-4 mr-2" />
            Pdf
          </MenubarItem>
          <MenubarItem  onClick={onSaveHTML}>
            <GlobeIcon className="size-4 mr-2" />
            HTML
          </MenubarItem>
          <MenubarItem onClick={onSaveText}>
            <FileTextIcon className="size-4 mr-2" />
            Text
          </MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger className="duration-300 hover:bg-[#c7c7c7]">Edit</MenubarTrigger>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger className="duration-300 hover:bg-[#c7c7c7]">Insert</MenubarTrigger>
    <MenubarContent className="print:hidden">
      <MenubarSub>
        <MenubarSubTrigger>
          <Table2Icon className="size-4 mr-2" />
          Table
        </MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>1 X 1</MenubarItem>
          <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>2 X 2</MenubarItem>
          <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>3 X 3</MenubarItem>
          <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>4 X 4</MenubarItem>

          <MenubarSub>
            <MenubarSubTrigger>Custom Table</MenubarSubTrigger>
            <MenubarSubContent>
              <div className="p-2">
                <label className="block mb-1">Rows:</label>
                <Input  value={customRowandCol.initial?.rows || ""} onChange={(e)=>{setCustomRowandCol({
  ...customRowandCol,
  initial: {
    ...customRowandCol.initial,
    rows: Number(e.target.value),
  },
})}} type="number" placeholder="Enter rows" />
                <label className="block mt-2 mb-1">Cols:</label>
                <Input  value={customRowandCol.initial?.cols || ""} onChange={(e)=>{setCustomRowandCol({
  ...customRowandCol,
  initial: {
    ...customRowandCol.initial,
    cols: Number(e.target.value),
  },
})}} type="number" placeholder="Enter cols" />
              <Button
  onClick={() =>{ insertTable({
    rows: customRowandCol.initial.rows,
    cols: customRowandCol.initial.cols
  });
  setCustomRowandCol({...customRowandCol,initial:{...customRowandCol.initial,rows:0,cols:0}})}
  
}
disabled={customRowandCol.initial.rows===0||customRowandCol.initial.cols===0}
  className='mt-3 mb-1'
>
  Apply
</Button>
              </div>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger className="duration-300 hover:bg-[#c7c7c7]">Format</MenubarTrigger>
  </MenubarMenu>
</Menubar>

      </div>
    </div>
    </div>
    <div className='flex gap-3'><AddCollaborator/>  <Profile/></div>
   </nav>
  )
}

export default NavBar