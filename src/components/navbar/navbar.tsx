import { useNavigate } from 'react-router-dom'
import './navbar.scss'
import SearchBar from './searchBar'
import { useState } from 'react'
function Navbar(props : any ){
    const [isMobile , setIsMobile] = useState(false)
    const navigate = useNavigate()
    return(
        <div className='flex items-center h-[8vh] px-[3%] m-auto justify-between bg-[#1e1d1d] text-white fixed w-full z-10 ' >
            
            <div>
                <h1 className='md:text-[20px] font-semibold text-amber-300 cursor-pointer' onClick={()=>navigate('/')} >CRUX</h1>
            </div>

            <div className=' items-center text-white  gap-10 block md:flex '>

                <div className=''>
                    { props.searchBar &&
                    <SearchBar />
                    }
                </div>

                <div>
                    <a href="/about" className='hover:underline hidden md:block'>About</a>
                </div>

                <div>
                    <button className=' items-center px-5 py-1.5 border-1 rounded-[30px] cursor-pointer  bg-white  font-semibold text-zinc-800 hover:bg-black hover:text-white transition-all duration-700 hidden md:flex' onClick={()=>navigate('/upload')} >Upload</button>
                </div>

                <div className='p-2 px-4 rounded-4xl bg-blue-500 cursor-pointer hidden md:block' onClick={()=>navigate('/dashboard')}>
                    A
                </div>
            </div>

            <div className=' md:hidden'>
                <img src="./images/ham.png" alt="" className='h-5'  />
            </div>
        
        </div>
    )
}

export {Navbar}