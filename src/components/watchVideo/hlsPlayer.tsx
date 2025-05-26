// HlsPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(-1); // -1 = auto

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const qualityLevels = hls.levels.map((level, i) => ({
          label: `${level.height}p`,
          index: i,
        }));
        setLevels([{ label: "Auto", index: -1 }, ...qualityLevels]);
        setCurrentLevel(-1);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        console.log("Switched to level:", data.level);
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
    }
  }, [src]);

  const handleQualityChange = (e) => {
    const levelIndex = parseInt(e.target.value);
    hlsRef.current.currentLevel = levelIndex;
    setCurrentLevel(levelIndex);
  };

  return (
    <div >
      <video ref={videoRef} controls style={{ width: "100%", maxWidth: 800 , margin:"auto" , boxShadow: "0 0 10px 1px rgba(75, 75, 75, 0.8)",borderRadius : "20px" }} />
      {levels.length > 0 && (
        <div style={{ marginTop: "25px" ,  maxWidth: 800 , margin:"auto"}}>
          <label style={{ marginRight: "8px" }}>Quality:</label>
          <select value={currentLevel} onChange={handleQualityChange}>
            {levels.map((level) => (
              <option key={level.index} value={level.index}  style={{ color: "black" }}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default HlsPlayer;
