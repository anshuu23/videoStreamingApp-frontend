import { useNavigate } from 'react-router-dom'
import './navbar.scss'
import SearchBar from './searchBar'
function Navbar(props : any ){
    const navigate = useNavigate()
    return(
        <div className='flex items-center h-[8vh] px-[3%] m-auto justify-between bg-[#1e1d1d] text-white fixed w-full z-10 ' >
            
            <div>
                <h1 className='text-[20px] font-semibold text-amber-300 cursor-pointer' onClick={()=>navigate('/')} >CRUX</h1>
            </div>

            <div className='flex items-center text-white  gap-10  '>

                <div className=''>
                    { props.searchBar &&
                    <SearchBar />
                    }
                </div>

                <div>
                    <a href="/about" className='hover:underline'>About</a>
                </div>

                <div>
                    <button className='flex items-center px-5 py-1.5 border-1 rounded-[30px] cursor-pointer  bg-white  font-semibold text-zinc-800 hover:bg-black hover:text-white transition-all duration-700 ' onClick={()=>navigate('/upload')} >Upload</button>
                </div>

                <div className='p-2 px-4 rounded-4xl bg-blue-500 cursor-pointer' onClick={()=>navigate('/dashboard')}>
                    A
                </div>
            </div>
        
        </div>
    )
}

export {Navbar}