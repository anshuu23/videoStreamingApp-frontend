export default function VideoCard(){
    return(
        <>
            <div className=" text-white grow-1">
                <div className="h-[200px] min-w-[300px] max-w[400px] bg-amber-300 rounded-[20px]">
                    thumbnail
                </div>
                <div className="flex gap-6 p-1">
                    <div>
                        logo
                    </div>
                    <div>
                        <p className="font-bold text-[18px]">title of video </p>
                        <p className="text-gray-300">upload person name</p>
                        <p className="text-gray-300">views</p>
                    </div>
                </div>
            </div>
        </>
    )
}