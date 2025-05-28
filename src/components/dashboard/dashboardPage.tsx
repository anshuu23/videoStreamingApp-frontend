import { useEffect, useState } from "react"
import { apiRequest } from "../../helper/request"
import VideoCard from "../videoCard/videoCard"

export default function DashboardPage(){
    const [data , setData] = useState([]) 
        useEffect( ()=>{
            (async()=>{
               const res : any = await apiRequest('/getVideos' , {
                method : 'GET' ,
                }) 
                if(res.status !== 200){
                    alert("error in loadin data")
                }
                setData(res.data)
            })()
            
        },[])
    return(
        <>
        <div className="pt-[10vh] bg-[#2b2b2b] p-5 text-white">

            <div className="flex gap-6">

               <div className="h-30 w-30 rounded-[50%] bg-blue-400 flex justify-center items-center text-5xl text-white ">
                A 
               </div>

               <div className="flex justify-center flex-col">
                <p className="text-3xl font-bold">User Name</p>
                <p className="text-[20px]">User@gmail.com</p>
                <p className="text-[18px]">Videos : 5</p>
                <p className="text-[18px]">Watched : 5</p>
               </div>
            </div>


            <div className=" bg-[#1e1d1db8] m-auto mt-10 p-5 rounded-4xl ">
                <h2 className="text-2xl ">Your Videos:</h2> 
                <p className="text-[grey] mb-5 cursor-pointer">view all {">>"}</p>

                <div className=" pt-0 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between content-center gap-4 ">
                    {
                        data && (
                            data.map((obj)=> <VideoCard data = {obj}/>)
                        )
                    }
                
                </div>             
            </div>


            <div className=" bg-[#1e1d1db8] m-auto mt-10 p-5 rounded-4xl ">
                <h2 className="text-2xl ">Watch History:</h2> 
                <p className="text-[grey] mb-5 cursor-pointer">view all {">>"}</p>

                <div className=" pt-0 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between content-center gap-4 ">
                    {
                        data && (
                            data.map((obj)=> <VideoCard data = {obj}/>)
                        )
                    }
                
                </div>             
            </div>
            </div>
        </>
    )
}