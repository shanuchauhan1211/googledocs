'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { SearchBar } from './SearchBar'
import { hydrateAuthState, useAuthStore } from '@/store/authStore'
import { Profile } from './Profile'


const Navbar = () => {

useEffect(()=>{
hydrateAuthState();
},[])

 // const {user} = useAuthStore();


  return (
    <nav className='flex items-center justify-between h-[100%] w-[100%] bg-white'>
        <div className='flex items-center gap-4 shrink-0 pr-4'>
            <Link href={"/"} >
            <Image src={"/logo.svg"} width={36} height={36} alt='logo'></Image>
            </Link>
            <div className='text-lg '><span className=' underline underline-offset-4 text-center'>
               <p className='inline font-bold'>M</p>eow</span><span> <p className='inline font-bold'>D</p>ocs</span> </div>
        </div>
<SearchBar/>
 <Profile/>

    </nav>
  )
}

export default Navbar