import { useEffect, useState } from "react"
import { apiRequest } from "../../helper/request"
import VideoCard from "../videoCard/videoCard"
import { useLocation } from "react-router-dom"

function SearchResultPage(){
    const [data , setData] = useState([]) 
    const location = useLocation();

    useEffect( ()=>{

        const searchParams = new URLSearchParams(location.search);

        const searchValue = searchParams.get('query'); 

        console.log("Query param name:", searchValue);
  
        (async()=>{
           const res : any = await apiRequest("/search/"+searchValue , {
            method : 'GET' ,
            })
            if(res.status !== 200){
                alert("error in loadin data")
            }
            setData(res.data)
        })()
        
    },[])
    return (
        <><div className="bg-[#2b2b2b] min-h-[100vh] p-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between content-center gap-4 pt-[14vh]">
            {
                data && (
                    data.map((obj)=> <VideoCard data = {obj}/>)
                )
            }

        </div>
        </>
    )
}

export {SearchResultPage}