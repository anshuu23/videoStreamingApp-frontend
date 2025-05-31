import { useEffect, useState } from "react"
import VideoCard from "./videoCard/videoCard"
import { apiRequest } from "../helper/request"
import { useNavigate } from "react-router-dom"


function MainPage(){
    const navigate = useNavigate()
    const [data , setData] = useState([]) 
    const token = localStorage.getItem("token") as string
    useEffect( ()=>{
        
        (async()=>{
           const res : any = await apiRequest('/getVideos' , {
            method : 'GET' ,token 
            }) 
            if(res.status !== 200){
                 localStorage.removeItem("token")
                navigate("/user/login")
            }
            if(res.status === 400){
               
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

export {MainPage}