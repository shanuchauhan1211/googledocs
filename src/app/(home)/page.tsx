
import Link from "next/link"
import Navbar from "./_components/Navbar"
import { Templates } from "./_components/Templates"

const Home = () => {
  return (
    <div className=" min-h-screen  flex flex-col  ">
    <div className="fixed top-0 right-0 left-0 z-20 px-5 h-[64px]">  <Navbar/></div> 
    <div className="mt-[64px]">
    <Templates/>
    </div>
  

    </div>
  )
}

export default Home
