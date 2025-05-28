import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from './videoPlayerBlock';
import VideoCard from '../videoCard/videoCard';
import { useState, useEffect } from 'react';
import { apiRequest } from '../../helper/request';

export default function WatchVideoPage() {
    const navigate = useNavigate()
    const { id } = useParams();
    console.log(id)
    const [data, setData] = useState([])
    const [currentVideo, setCurrentVideo] = useState<{ title: string , userName : string }[]>([]);
    useEffect(() => {
        (async () => {
            const res: any = await apiRequest('/getVideos', {
                method: 'GET',
            })
            if (res.status !== 200) {
                alert("error in loadin data")
            }
            setData(res.data)
            const videoDataa = res.data.filter((obj: any) => obj.id === id)
            setCurrentVideo(videoDataa)
            console.log("currentVideo", currentVideo)

        })()

    }, [])
    return (
        <>
            <div className='p-5  bg-[#131313]'>
                <div className='pt-[13vh] text-white m-auto
         '>
                    <VideoPlayer id={id + ".mp4"} />
                    <div className='max-w-[800px] m-auto'>
                        <p className='text-[20px] font-bold truncate'>{currentVideo?.[0]?.title || ''}</p>
                        <div>
                            <div className="flex gap-6 cursor-pointer" onClick={()=>navigate("/account")}>

                                <div className="h-13 w-13 rounded-[50%] bg-blue-400 flex justify-center items-center text-2xl text-white ">
                                    A
                                </div>

                                <div className="flex justify-center flex-col">
                                    <p className="text-[18px] font-bold">{currentVideo?.[0]?.userName || ''}</p>
                                    <p className="text-[18px]">views : 5</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="min-h-[92vh] p-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
                    {
                        data && (
                            data.map((obj: any) => {
                                if (obj?.id !== id) {
                                    return (
                                        <VideoCard data={obj} />
                                    )
                                }
                            })
                        )
                    }
                </div>
            </div>
        </>
    )
}