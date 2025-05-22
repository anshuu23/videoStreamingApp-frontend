import VideoCard from "./videoCard/videoCard"

function MainPage(){
    return (
        <><div className="bg-[black] min-h-[92vh] p-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between content-center gap-4 pt-[14vh]">
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
        </>
    )
}

export {MainPage}