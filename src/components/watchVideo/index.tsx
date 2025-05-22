import { useParams } from 'react-router-dom';
import VideoPlayer from './videoPlayerBlock';
import VideoCard from '../videoCard/videoCard';

export default function WatchVideoPage(){
    const { id } = useParams(); 
    console.log(id)
    return(
        <>
        <div className='p-5  bg-black'>
        <div className='pt-[13vh] bg-black text-white m-auto
         '>
        <VideoPlayer id = {id}  />
        </div>

        <div className="bg-[black] min-h-[92vh] p-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between content-center gap-4 ">
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                </div>
        </div>
        </>
    )
}