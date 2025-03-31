'use client'

import { cn } from "@/lib/utils";
import {type ColorResult , SketchPicker} from 'react-color'
import {type Level} from '@tiptap/extension-heading'
import {  AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchCheckIcon, SearchIcon, SpellCheck2Icon, UnderlineIcon, Undo2Icon, UploadIcon } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DialogHeader,Dialog,DialogContent, DialogFooter,DialogTitle } from "@/components/ui/dialog";
// import Color from "@tiptap/extension-color";
import { useDisplayToolTipStore } from "@/store/editorStore";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface ToolBarProps{
    onClick?:() => void;
    isActive?:boolean;
    icon:LucideIcon;
    label:string;
}




const LineHeightButton = ()=>{

    const {editor} = useEditorStore();

   const lineHeights = [
    {
        label:"Default",
        value:"normal"
    },
    {
        label:"Single",
        value:"1"
    },
    {
        label:"1.15",
        value:"1.15"
    },
    {
        label:"1.5",
        value:"1.5"
    },  {
        label:"Double",
        value:"2"
    },
    
   ]

return(

<DropdownMenu>
            <DropdownMenuTrigger asChild>
<button className="h-7 min-w-8 shrink-0   flex flex-col text-center  items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1  overflow-hidden text-sm ">
< ListCollapseIcon  className="size-4"/>
    </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 z-10 text-sm border border-[#C7C7C7] flex flex-col  gap-y-1 bg-white ">
{
    lineHeights.map(({label,value})=>(
        <button key={value} onClick={()=>{editor?.chain().focus().setLineHeight(value).run()}} className={cn(
            "flex gap-x-2 px-2 py-1 items-center hover:bg-neutral-200/80 rounded-md",
             editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
        )}>
            <span>{label}</span>
        </button>
    ))
}
            </DropdownMenuContent>
        </DropdownMenu>


)


}






const ListButton = ()=>{

    const {editor} = useEditorStore();

   const lists = [
    {
        label:"Bullet List",
        icon: ListIcon,
        isActive:()=> editor?.isActive("bulletList"),
        onClick:()=> editor?.chain().focus().toggleBulletList().run(),
    },
    {
        label:"Ordered List",
        icon: ListOrderedIcon,
        isActive:()=> editor?.isActive("orderedList"),
        onClick:()=> editor?.chain().focus().toggleOrderedList().run(),
    },
    
   ]

return(

<DropdownMenu>
            <DropdownMenuTrigger asChild>
<button className="h-7 min-w-8 shrink-0   flex flex-col text-center  items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1  overflow-hidden text-sm ">
< ListIcon  className="size-4"/>
    </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 z-10 text-sm border border-[#C7C7C7] flex flex-col  gap-y-1 bg-white ">
{
    lists.map(({label,icon:Icon,onClick,isActive})=>(
        <button key={label} onClick={onClick} className={cn(
            "flex gap-x-2 px-2 py-1 items-center hover:bg-neutral-200/80 rounded-md",
             isActive() && "bg-neutral-200/80"
        )}>
            <Icon />
            <span>{label}</span>
        </button>
    ))
}
            </DropdownMenuContent>
        </DropdownMenu>


)


}



const FontSizeButton = ()=>{

    const {editor} = useEditorStore();
const currentFontSize = editor?.getAttributes("textStyle").fontSize?editor?.getAttributes("textStyle").fontSize.replace("px",""):"16";
const [fontSize,setFontSize]= useState(currentFontSize);
const [inputValue,setInputValue]= useState(fontSize);
const [isEditing,setIsEditing]=useState(false);

const UpdateFontSize = (newSize:string)=>{
    const size =parseInt(newSize);
    if(!isNaN(size)&& size>0)
    {
        editor?.chain().focus().setFontSize(`${size}px`).run();
        setFontSize(newSize);
        setInputValue(newSize);
        setIsEditing(false);
    }
    }

 const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value);
 }   

 const handleInputBlur = ()=>{
    UpdateFontSize(inputValue);
 }
 
 const handleKeyDown= (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key ==="Enter")
    {
        e.preventDefault();
        UpdateFontSize(inputValue);
        editor?.commands.focus();
    }
 }

 const increment = ()=>{
    const newSize = parseInt(fontSize) +1;
    UpdateFontSize(newSize.toString())
 }

 const decrement = ()=>{
    const newSize = parseInt(fontSize) -1;
    if(newSize>0)
    {
    UpdateFontSize(newSize.toString())
 } 
}

return(
<div className="flex items-center gap-x-1">
 <button  onClick={decrement}  className="h-7 flex items-center w-7 justify-center shrink-0 rounded-sm hover:bg-neutral-200/80 " >   <MinusIcon className="size-4"/>       </button>
 {
    isEditing?(<input value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} onBlur={handleInputBlur} onKeyDown={handleKeyDown} className="h-7 text-sm border text-center border-neutral-400 w-10  rounded-sm hover:bg-neutral-200/80" />):(<button onClick={()=>{setIsEditing(true); setFontSize(currentFontSize)}} className="h-7 text-sm border border-neutral-400 w-10  rounded-sm hover:bg-neutral-200/80 " >  {currentFontSize}</button>)
 }
        <button  onClick={increment}  className="h-7 flex items-center w-7 justify-center shrink-0 rounded-sm hover:bg-neutral-200/80 " >   <PlusIcon className="size-4"/>       </button>
</div>

)


}




const AlignButton = ()=>{

    const {editor} = useEditorStore();

   const alignments = [
    {
        label:"Align Center",
        icon:AlignCenterIcon,
        value:"center"
    },
    {
        label:"Align Left",
        icon:AlignLeftIcon,
        value:"left"
    },
    {
        label:"Align Right",
        icon:AlignRightIcon,
        value:"right"
    },
    {
        label:"Align justify",
        icon:AlignJustifyIcon,
        value:"justify"
    },
    
   ]

return(

<DropdownMenu>
            <DropdownMenuTrigger asChild>
<button className="h-7 min-w-8 shrink-0   flex flex-col text-center  items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1  overflow-hidden text-sm ">
< AlignLeftIcon  className="size-4"/>
    </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 z-10 text-sm border border-[#C7C7C7] flex flex-col  gap-y-1 bg-white ">
{
    alignments.map(({label,icon:Icon,value})=>(
        <button key={value} onClick={()=>{editor?.chain().focus().setTextAlign(value).run()}} className={cn(
            "flex gap-x-2 px-2 py-1 items-center hover:bg-neutral-200/80 rounded-md",
             editor?.isActive({textAlign:value}) && "bg-neutral-200/80"
        )}>
            <Icon />
            <span>{label}</span>
        </button>
    ))
}
            </DropdownMenuContent>
        </DropdownMenu>


)


}



const ImageButton=()=>{
    const{tag,setTag} = useDisplayToolTipStore();
    const {editor}= useEditorStore();
const [isModalOpen,setIsModalOpen]= useState(false);
   const [imageUrl,setImageUrl]=useState("");

    const onChange=(src:string)=>{

        editor?.chain().focus().setImage({src}).run();
    };

    const onUpload= ()=>{
const input = document.createElement("input");
input.type='file';
input.accept='image/*';

input.onchange=(e)=>{
    const file =(e.target as HTMLInputElement).files?.[0];
    if(file)
    {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
    }
}
input.click();
    }


const handelSubmitUrl = ()=>{
    if(imageUrl){
        onChange(imageUrl);
        setImageUrl("");
        setIsModalOpen(false);
    }
}


return(
    <>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <div className="relative flex flex-col items-center">
      <button
        onMouseEnter={() => setTag("Image Tool")}
        onMouseLeave={() => setTag("")}
        className="h-7 flex items-center min-w-7 justify-center shrink-0 rounded-sm hover:bg-neutral-200/80 px-1 overflow-hidden text-sm"
      >
        <ImageIcon className="size-4" />
      </button>

     
      <div
    className={`absolute  w-[80px] -bottom-10 z-50 bg-black text-white text-xs px-2 py-1 rounded-md transition-all ease-in duration-300 transform ${
      tag === "Image Tool" ? "-translate-y-2 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-90"
    }`}
  >
    Image Tool
  </div>
    </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent  className="p-1 z-50 flex flex-col  items-center rounded-sm  gap-3 gap-x-2 bg-white ">
<DropdownMenuItem className="flex  hover:bg-[#cacaca] cursor-pointer p-1 justify-center items-center gap-2 bg-white rounded-sm " onClick={onUpload}>
    <UploadIcon className="size-4 "/>
    Upload
</DropdownMenuItem>
<Separator className="w-7"/>
<DropdownMenuItem  className="flex  hover:bg-[#cacaca] cursor-pointer p-1 justify-center items-center gap-2 bg-white rounded-sm " onClick={()=>{setIsModalOpen(true)}}>
    <SearchIcon className="size-4"/>
    Paste Url 
    
</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>


<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
<DialogContent>
    <DialogHeader>
        <DialogTitle>
            Insert Image Url
        </DialogTitle>
    </DialogHeader>
    <Input value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}} onKeyDown={(e)=>{if(e.key==="Enter")
        {
            handelSubmitUrl();
        }
    }}/>

<DialogFooter>
    <Button onClick={handelSubmitUrl}>
        Insert 
    </Button>
</DialogFooter>

</DialogContent>
</Dialog>



</>
)


}



const LinkButton=()=>{
    const {editor}= useEditorStore();
const{tag,setTag}=useDisplayToolTipStore();
    const[link,setLink]=useState(editor?.getAttributes("link").href||"");

    const onChange=(value:string)=>{

        editor?.chain().focus().extendMarkRange("link").setLink({href:value}).run();
        setLink("");
    };

return(
    <DropdownMenu onOpenChange={(open)=>{ if(open){setLink(editor?.getAttributes("link").href||"")}}}>
    <DropdownMenuTrigger asChild>
        <div className="relative  flex flex-col items-center">
<button onMouseEnter={() => setTag("Link Tool")}
        onMouseLeave={() => setTag("")} className="h-7  shrink-0     rounded-sm hover:bg-neutral-200/80 px-1  overflow-hidden text-sm ">
<Link2Icon/>
</button>

<div
    className={`absolute  w-[80px] text-center -bottom-10 z-50 bg-black text-white text-xs px-2 py-1 rounded-md transition-all ease-in duration-300 transform ${
      tag === "Link Tool" ? "-translate-y-2 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-90"
    }`}
  >
    Link Tool
  </div>
  </div>

    </DropdownMenuTrigger>
    <DropdownMenuContent className="p-1 z-50 flex  items-center rounded-sm  gap-x-2 bg-[#cacaca] ">
<Input className="bg-white text-black" value={link} placeholder="https://example.com" onChange={(e)=>{setLink(e.target.value )}}/>
<Button onClick={()=>{onChange(link)}}> Apply </Button>
    </DropdownMenuContent>
</DropdownMenu>

)


}



const HeadingButton=()=>{
    const {editor} =useEditorStore();
    const headings = [
        { label: "Normal Text", value: 0, fontSize:"16px"},
        { label: "Heading 1", value: 1, fontSize:"32px"},
        { label: "Heading 2", value: 2 , fontSize:"24px"},
        { label: "Heading 3", value: 3, fontSize:"20px"},
        { label: "Heading 4", value: 4, fontSize:"18px"},
        
      ];
function getCurrentHeading()

{
    for(let level =1 ;level<=4;level++)
    {
        if (editor?.isActive("heading", { level })) {
            return `Heading ${level}`;
          }
    }
    return "Normal Text";
}

      return(

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
<button className="h-7 w-[100px] shrink-0  border border-[#a7a7a7] flex text-center  items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1  overflow-hidden text-sm ">
<span className="truncate w-[80px]">
    {
       getCurrentHeading()
    }
    </span>
    <ChevronDownIcon className="ml-2 size-4 shink-0"/>
    </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 z-10 flex flex-col w-[180px]  gap-y-1 bg-white ">
{
    headings.map(({label,value,fontSize})=>(
        <button key={value} style={{fontSize}} onClick={()=>{
            if(value === 0)
            {
                editor?.chain().focus().setParagraph().run()
            }
            else{
                editor?.chain().focus().toggleHeading({ level: value as Level }).run()

            }
            }}
             className={cn("flex flex-col items-center gap-x-2  px-3 py-2 rounded-sm  hover:bg-neutral-200", value===0||editor?.isActive("heading",{level:value}) && "bg-neutral-200")}
            >
<span>{label}</span>
<Separator className="mt-2" orientation="horizontal"/>

        </button>
    ))
}
            </DropdownMenuContent>
        </DropdownMenu>

      )


}


const HighlightButton = ()=>{

    const {editor} = useEditorStore();

    const value = editor?.getAttributes("highlight").color || "#000000";

    const onChange = (color:ColorResult) =>
    {
editor?.chain().focus().setHighlight({color:color.hex}).run();
    }

return(

<DropdownMenu>
            <DropdownMenuTrigger asChild>
<button className="h-7 min-w-8 shrink-0   flex flex-col text-center  items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1  overflow-hidden text-sm ">
<HighlighterIcon style={{color:value}} className="size-4"/>
    </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 z-10 flex flex-col  gap-y-1 bg-white ">
<SketchPicker color={value} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>


)


}



const FontButton =()=>{
    const {editor} =useEditorStore();
    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Verdana", value: "Verdana" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Comic Sans MS", value: "Comic Sans MS" },
        { label: "Impact", value: "Impact" },
        { label: "Trebuchet MS", value: "Trebuchet MS" },
      ];
      


    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
<button className="h-7 w-[90px] shrink-0  border border-[#a7a7a7] flex text-center  items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1  overflow-hidden text-sm ">
<span className="truncate w-[80px]">
    {
        editor?.getAttributes("textStyle").fontFamily || "Arial"
    }
    </span>
    <ChevronDownIcon className="ml-2 size-4 shink-0"/>
    </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 z-10 flex flex-col  gap-y-1 bg-white ">
{
    fonts.map(({label,value})=>(
        <button key={value} onClick={()=>{editor?.chain().focus().setFontFamily(value).run()}} className={cn("flex flex-col items-center gap-x-2  px-2  py-1  rounded-sm  hover:bg-neutral-200",editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200")} style={{fontFamily:value}}>
<span className="text-sm">{label}</span>
<Separator className="mt-2" orientation="horizontal"/>

        </button>
    ))
}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



const ToolBarButton = ({onClick,isActive,icon:Icon,label}:ToolBarProps)=>{
    return(
        <TooltipProvider  delayDuration={300} skipDelayDuration={0}>
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={onClick}
                    className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md",
                        isActive ? "bg-neutral-300 text-[#686868] font-semibold" : "hover:bg-neutral-100"
                    )}
                >
                    <Icon className="size-4" />
                </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
                {label}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}


const TextColorButton = ()=>{

    const {editor} = useEditorStore();

    const value = editor?.getAttributes("textStyle").color || "#000000";

    const onChange = (color:ColorResult) =>
    {
editor?.chain().focus().setColor(color.hex).run();
    }

return(

<DropdownMenu>
            <DropdownMenuTrigger asChild>
<button className="h-7 min-w-8 shrink-0   flex flex-col text-center  items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1  overflow-hidden text-sm ">
<span className="text-sm">
    A
    </span>
   <div className="h-1 w-full " style={{backgroundColor:value}}/>
    </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 z-10 flex flex-col  gap-y-1 bg-white ">
<SketchPicker color={value} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>


)


}




const ToolBar = () => {
   
const {editor} = useEditorStore();

const sections:{
    label: string;
    icon:LucideIcon;
    onClick:()=>void;
    isActive?:boolean;
}[][]=[
    [
        {
            label:"Undo",
            icon:Undo2Icon,
            onClick:()=> editor?.chain().focus().undo().run(),
        },
        {
            label:"Redo",
            icon:Redo2Icon,
            onClick:()=> editor?.chain().focus().redo().run(),
        },
        {
            label:"Print",
            icon:PrinterIcon,
            onClick:()=> window.print(),
        },
        {
            label:"SpellCheck",
            icon:SpellCheck2Icon,
            onClick:()=> { const current = editor?.view.dom.getAttribute("spellcheck"); editor?.view.dom.setAttribute("spellcheck",current === "false"? "true":"false")},
            
        },
    ],
    [
        {
            label:"Bold",
            icon:BoldIcon,
            onClick:()=> editor?.chain().focus().toggleBold().run(),
            isActive: editor?.isActive("bold"),
            
        },
        {
            label:"Italic",
            icon:ItalicIcon,
            onClick:()=> editor?.chain().focus().toggleItalic().run(),
            isActive: editor?.isActive("italic"),
            
        },
        {
            label:"Underline",
            icon:UnderlineIcon,
            onClick:()=> editor?.chain().focus().toggleUnderline().run(),
            isActive: editor?.isActive("underline"),
            
        },
    ],
    [
        {
            label:"Comments",
            icon: MessageSquarePlusIcon,
            onClick:()=> console.log("Cooments"),
            isActive: false,
            
        },
        {
            label:"Todo",
            icon:ListTodoIcon,
            onClick:()=> editor?.chain().focus().toggleTaskList().run(),
            isActive: editor?.isActive("taskList"),
            
        },
        {
            label:"Remove Formatting",
            icon:RemoveFormattingIcon,
            onClick:()=> editor?.chain().focus().unsetAllMarks().run(),
            
            
        },
    
    ]
];

  return (
    <div className="duration-300 bg-[#e7e7e7]  hover:bg-[#c7c7c7] print:hidden flex items-center min-h-[50px] px-2 py-1 rounded-3xl gap-1">

{
    sections[0]?.map((item)=>{
        return(
            
           
            <ToolBarButton key={item?.label} {...item}/>
            
           
           
        )
    })
}
<Separator orientation="vertical" className="bg-[#bbbbbb] h-7"/>
{
    sections[1]?.map((item)=>{
        return(
            <ToolBarButton key={item.label}  {...item}/>
        )
    })
}

<Separator orientation="vertical" className="bg-[#bbbbbb] h-7"/>
{
    sections[2]?.map((item)=>{
        return(
            <ToolBarButton key={item.label}  {...item}/>
        )
    })
}
<Separator orientation="vertical" className="bg-[#bbbbbb] h-7"/>
<FontButton/>
<Separator orientation="vertical" className="bg-[#bbbbbb] h-7"/>
<HeadingButton/>
<Separator orientation="vertical" className="bg-[#bbbbbb] h-7"/>
<TextColorButton/>
<HighlightButton/>
<LinkButton/>
<ImageButton/>
<Separator orientation="vertical" className="bg-[#bbbbbb] h-7"/>
<AlignButton/>
<ListButton/>
<FontSizeButton/>
<LineHeightButton/>
    </div>
  )
}

export default ToolBar