import { useRef } from 'react'
import 'videojs-http-source-selector'

import '@silvermine/videojs-quality-selector'
import HlsPlayer from './hlsPlayer'


export default function VideoPlayer( {id}) {
  const playerRef = useRef(null)
  console.log('idddd' , id)
  const videoLink = `https://final-video-upload.s3.ap-south-1.amazonaws.com/transcoded/${id}/master.m3u8`

  const videoPlayerOptions =  {
    controls: true,
    responsive: true,
    fluid: true,
    controlBar: {
      children: [
        "playToggle",
        "volumePanel",
        "currentTimeDisplay",
        "timeDivider",
        "durationDisplay",
        "progressControl",
        "remainingTimeDisplay",
        "fullscreenToggle",
        "playbackRateMenuButton"
      ]
    },
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL"
      }
    ]
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  return (
    <>
      
      {/* <VideoPlayer
      options={videoPlayerOptions}
      onReady={handlePlayerReady}
      /> */}

    {/* <ReactPlayer url={videoLink} height='300px' width='400px' /> */}
       
       <HlsPlayer src={videoLink} />
    </>
  )
}

