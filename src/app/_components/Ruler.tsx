import { useMargin } from '@/store/editorStore';
import React, { useRef, useState } from 'react'
import {FaCaretDown} from'react-icons/fa';
const markers = Array.from({length:83},(_,i)=>i);

const Ruler = () => {
const{setLMargin,setRMargin}= useMargin();
const[leftMargin,setLeftMargin]= useState(56);
const[rightMargin,setRightMargin]= useState(56);
const[isDraggingLeft,setIsDraggingLeft]=useState(false);
const[isDraggingRight,setIsDraggingRight]=useState(false);
const rulerRef = useRef<HTMLDivElement>(null);

const handelLeftMouseDown =()=>{
    setIsDraggingLeft(true);
}

const handelRightMouseDown =()=>{
    setIsDraggingRight(true);
}

const handleMouseMove =(e:React.MouseEvent)=>{
    const docWidth = 816;
    const spaceBetween = 100;
    if((isDraggingLeft || isDraggingRight) && rulerRef.current)
    {
        const container = rulerRef.current.querySelector("#ruler-container");
        if(container)
        {
            const containerRect =  container.getBoundingClientRect();
            const relativeX = e.clientX- containerRect.left;
            const rawPosition = Math.max(0,Math.min(816,relativeX));

            if(isDraggingLeft)
            {
                const maxLeftPosition = docWidth- rightMargin - spaceBetween;
                const newLeftPosition = Math.min(rawPosition,maxLeftPosition);
                setLeftMargin(newLeftPosition);
                setLMargin(newLeftPosition);
            }
            else if(isDraggingRight)
            {
                const maxRightPosition = docWidth- (leftMargin + spaceBetween);
                const newRightPosition = Math.max(816- rawPosition,0);
                const  constrainedRightPosition = Math.min(newRightPosition,maxRightPosition);
                setRightMargin(constrainedRightPosition);
                setRMargin(constrainedRightPosition);
            }
        }
    }
}

const handleMouseUp=()=>{
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
}


const handleLeftDoubleClick =()=>{
    setLeftMargin(56);
}

const handleRightDoubleClick = ()=>{
    setRightMargin(56);
}

  return (
    <div
    ref={rulerRef}
    onMouseUp={handleMouseUp}
    onMouseLeave={()=>{}}
    onMouseMove={handleMouseMove}
    className='h-6 border-b w-[816px] mx-auto border-gray-300 flex items-end   relative  select-none  print:hidden'>
        <div id='ruler-container' className=' w-full h-full  relative '>
            <Marker position={leftMargin} isLeft={true} isDragging={isDraggingLeft} onMouseDown={handelLeftMouseDown} onDoubleClick={handleLeftDoubleClick}/>
            <Marker position={rightMargin} isLeft={false} isDragging={isDraggingRight} onMouseDown={handelRightMouseDown} onDoubleClick={handleRightDoubleClick}/>
            <div className='absolute  inset-x-0 bottom-0 h-full'>
                <div className='relative h-full w-[816px]' >
                    {markers.map((marker)=>{
                        const position = (marker*816)/82;
                        return(
                            <div
                            key={marker}
                            className='absolute  bottom-0'
                            style={{left:`${position}px`}}>

                                {
                                    marker%10===0 &&(
                                        <>
                                        <div className=' absolute  bottom-0 w-[1px] h-2  bg-neutral-500'>
                                            <span className='absolute bottom-2 text-[10px] text-neutral-500 transfrom -translate-x-1/2'>{marker/10 +1}</span>
                                        </div>
                                        </>
                                    )
                                }
                                {
                                    marker%5===0 && marker%10!=0 &&(
                                        <div className='absolute bottom-0 w-[1px] h-1.5 bg-neutral-500'></div>
                                    )
                                }
                                {
                                    marker%5!=0 &&(
                                        <div className='absolute bottom-0 w-[1px] h-1 bg-neutral-500'></div>
                                    )
                                }

                            </div>
                        )



                    })}

                </div>
            </div>
            </div></div>
  )
}

export default Ruler



interface MarkerProps{

    position:number;
    isLeft:boolean;
    isDragging:boolean;
    onMouseDown:()=> void;
    onDoubleClick:()=>void;


}

const Marker =({position,isLeft,isDragging,onMouseDown,onDoubleClick}:MarkerProps)=>{
return(
    <div className=' absolute top-0  w-4  h-full  cursor-ew-resize z-[5] group -ml-2:' style={{[isLeft?"left":"right"]:`${position-7}px`}}
    onMouseDown={onMouseDown}
    onDoubleClick={onDoubleClick}
    >
        <FaCaretDown className='duartion-300 absolute  left-1/2  top-0 h-full  fill-blue-500 hover:fill-blue-800  transform -translate-x-1/2'/> 
        <div className={`absolute  h-[100vh] bg-slate-700/50 w-[1px] left-1/2 top-4  transform -translate-x-1/2 ${isDragging?`block`:`hidden`}`}/>
    </div>
)

}