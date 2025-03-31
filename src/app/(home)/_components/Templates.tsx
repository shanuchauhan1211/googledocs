'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious

} from"@/components/ui/carousel";
import { cn } from "@/lib/utils";

const templates= [{
    id:"blank",
    label:"BlankDocumnet",
    imageUrl:"/logo.svg"
},
{
    id:"Resume",
    label:"Resume",
    imageUrl:"/resume.jpg"
},
{
    id:"Docs",
    label:"Docs",
    imageUrl:"/doc.jpg"
},
{
    id:"Docs",
    label:"Do",
    imageUrl:"/doc.jpg"
},
{
    id:"Docs",
    label:"Doc",
    imageUrl:"/doc.jpg"
},
{
    id:"Resume",
    label:"Resum",
    imageUrl:"/resume.jpg"
},]

export const Templates = () => {
    const isCreating = false;
  return (
    <div className='bg-[#F1F3F4]'>
        <div className=' max-w-screen-xl mx-auto px-16 py-6  flex flex-col gap-y-4'>
            <h3 className='font-medium '>Create A New Document</h3>
            <Carousel>
                <CarouselContent className="-ml-4">
                    {templates.map((template)=>(
                        <CarouselItem key={template.label} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5  2xl:basis-[14.285714%] pl-4">
                            <div className={cn("aspect-[3/4]  flex flex-col  gap-y-2.5",isCreating && "pointer-events-none opacity-50")} >
                            <button className="size-full hover:border-blue-500  rounded-sm  border  hover:bg-[#82b9c0] transition  flex flex-col items-center  justify-center gap-y-4 bg-white" disabled={isCreating} onClick={()=>{}} style={{backgroundImage:`url(${template.imageUrl})`,backgroundSize:'contain',backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>
                             
                                </button>
                                <p className="text-sm  font-medium truncate">{template.label}</p>
                                </div>

                        </CarouselItem>

                    ))}
                </CarouselContent>
                <CarouselNext/>
                <CarouselPrevious/>
            </Carousel>
        </div>
    </div>
  )
}
