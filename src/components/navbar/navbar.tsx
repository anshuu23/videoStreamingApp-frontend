import './navbar.scss'
import PlusSign from './plusSign'
import SearchBar from './searchBar'
function Navbar(){
    return(
        <div className='flex items-center h-[8vh] px-[10%] m-auto justify-between bg-black text-white fixed w-full shadow-[0_0_4px_1px_rgba(255,255,255,0.5)]  '  >
            
            <div>
                <h1>crux</h1>
            </div>
            <div className=''>
                <SearchBar />
            </div>

            <div>
                <button className='flex items-center px-2.5 py-1 border-1 rounded-[17px] cursor-pointer shadow-[0_0_4px_1px_rgba(255,255,255,0.5)]' >Upload</button>
            </div>
        
        </div>
    )
}

export {Navbar}