import { useNavigate } from "react-router-dom"

export default function VideoCard(Props : any){
    const navigate = useNavigate()
    function CardClicked(){
        navigate(`/video/${Props.data.id}`)
    }
    return(
        <>
            <div className=" text-white grow-1 cursor-pointer" onClick={CardClicked} >
                <div className="h-[200px] min-w-[300px] max-w[400px] bg-amber-300 rounded-[20px] bg-cover"  style={{
                    backgroundImage: `url(https://final-video-upload.s3.ap-south-1.amazonaws.com/thumbnail/${Props.data.id})`,
                }}>
                    
                </div>
                <div className="flex gap-6 p-1">
                    <div>
                        logo
                    </div>
                    <div>
                        <p className="font-bold text-[18px]">{Props.data.title}  </p>
                        <p className="text-gray-300">{Props.data.userName} </p>
                        <p className="text-gray-300">views</p>
                    </div>
                </div>
            </div>
        </>
    )
}