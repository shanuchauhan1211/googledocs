'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
//import { Room } from '../documents/[documentId]/Room'
import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import Link from '@tiptap/extension-link'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import Underline from '@tiptap/extension-underline'
import {Color} from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { useEditorStore, useMargin } from '@/store/editorStore'
import {useLiveblocksExtension} from "@liveblocks/react-tiptap"
import Ruler from './Ruler'
import { Threads } from './Threads'


interface EditorProps {
  document?:{title:string,content:string,ownerId:string,collaboratorIds:string[]};
}

const Editor:React.FC<EditorProps> = ({document}) => {
const liveblocks = useLiveblocksExtension();
const {setEditor} = useEditorStore();

const{leftMargin,rightMargin} = useMargin();
    const editor = useEditor({
      immediatelyRender:false,
      onCreate({editor}) {
        setEditor(editor);
      },
      onDestroy() {
        setEditor(null);
      },
      onUpdate({editor}) {
        setEditor(editor);
      },
      onSelectionUpdate({editor}) {
        setEditor(editor);
      },
      onTransaction({editor}) {
        setEditor(editor);
      },
      onFocus({editor}) {
        setEditor(editor);
      },
      onBlur({editor}) {
        setEditor(editor);
      },
      onContentError({editor}) {
        setEditor(editor);
      },
        editorProps:{
            attributes:{
                style:`padding-right:${rightMargin}px; padding-left:${leftMargin}px`,
                class:"focus:outline-none print:border-0 bg-white border border-[#C7C7C7]  flex flex-col  min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            },
        },
        extensions: [liveblocks,StarterKit.configure({history:false}),FontSizeExtension,LineHeightExtension.configure({types:["heading","paragraph"]}),TextAlign.configure({types:["heading","paragraph"]}),Link.configure({openOnClick:false,autolink:true,defaultProtocol:"https"}),Color,Highlight.configure({multicolor:true}),FontFamily,TextStyle,Underline,TaskItem,TaskList,Table,TableCell,TableHeader,TableRow,Image,ImageResize],
        content: document?.content || "<p>Loading...</p>",
      })
  return (
    <>
 <div className=' h-[100%] w-[100%] overflow-x-auto bg-[#e7e7e7] px-4 print:p-0 print:bg-white print:overflow-visible'>
       <Ruler/>
        <div className='min-w-max  flex justify-center w-[816px] py-4  print:py-0 mx-auto  print:w-full print:min-w-0'>
        <EditorContent editor={editor}/>
        <Threads editor={editor}/>
        </div>
    </div>
   
    </>
   
  )
}

export default Editor