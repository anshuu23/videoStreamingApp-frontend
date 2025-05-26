import { useParams } from 'react-router-dom';
import VideoPlayer from './videoPlayerBlock';
import VideoCard from '../videoCard/videoCard';
import { useState, useEffect } from 'react';
import { apiRequest } from '../../helper/request';

export default function WatchVideoPage() {
    const { id } = useParams();
    console.log(id)
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            const res: any = await apiRequest('/getVideos', {
                method: 'GET',
            })
            if (res.status !== 200) {
                alert("error in loadin data")
            }
            setData(res.data)
        })()

    }, [])
    return (
        <>
            <div className='p-5  bg-[#131313]'>
                <div className='pt-[13vh] text-white m-auto
         '>
                    <VideoPlayer id={id+".mp4"} />
                </div>

                <div className="min-h-[92vh] p-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
                    {
                        data && (
                            data.map((obj) => <VideoCard data={obj} />)
                        )
                    }
                </div>
            </div>
        </>
    )
}