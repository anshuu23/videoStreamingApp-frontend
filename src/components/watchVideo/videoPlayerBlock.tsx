import 'videojs-http-source-selector'

import '@silvermine/videojs-quality-selector'
import HlsPlayer from './hlsPlayer'


export default function VideoPlayer( {id } : {id : string}) {
  console.log('idddd' , id)
  const videoLink = `https://final-video-upload.s3.ap-south-1.amazonaws.com/transcoded/${id}/master.m3u8`

  
  return (
    <> 
       <HlsPlayer src={videoLink} />
    </>
  )
}

