'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, XIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useSearch } from '@/hooks/use-search'

export const SearchBar = () => {
const [search,setSearch] =useSearch();
const [value,setValue]=useState("");
const inputRef = useRef<HTMLInputElement>(null);

const OnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
setValue(e.target.value);
}

const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  setSearch(value);
  inputRef.current?.blur();
}

  return (
    <div className="flex items-center justify-center">
    <form onSubmit={onSubmit} className="relative flex max-w-[720px] w-full">
      
      <Input
        onChange={OnChange}
        value={value}
        ref={inputRef}
        placeholder="Search...."
        className="md:text-base duration-300 hover:drop-shadow-lg text-neutral-700 placeholder:text-neutral-400 w-full bg-[#e9ecee] h-[40px] rounded-full border-none focus-visible:ring-0 px-12 pl-16 pr-16" 
      />
      
    
      <Button 
        type="submit" 
        className={ `absolute duration-500 ${value? `transform transition-all     top-1/2 -translate-y-1/2 translate-x-72 [&_svg]:size-5 rounded-full`: `top-1/2 transition-all translate-x-0  -translate-y-1/2 [&_svg]:size-5 rounded-full`}`}
        variant="ghost"
      >
        <SearchIcon />
      </Button>
  
     
      {value && (
        <Button 
          type="button" 
          onClick={() =>{ setValue(""); setSearch('')}} 
          className="absolute left-1 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          variant="ghost"
        >
          <XIcon />
        </Button>
      )}
    </form>
  </div>
  
  )
}
