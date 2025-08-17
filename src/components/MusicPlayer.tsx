import React, { useRef, useEffect } from 'react';
import { SoundOutlined } from '@ant-design/icons';
import './MusicPlayer.css';

const MusicPlayer: React.FC = () => {

  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // 当前音乐（只有一首）
  const currentMusic = {
    src: '/music/music.mp3',
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 设置循环播放
    audio.loop = true;

  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
  }, []);


  return (
    <div className="music-player">
      {/* 音频元素 */}
      <audio
        ref={audioRef}
        src={currentMusic.src}
        preload="metadata"
        loop={true}
      />
      
      {/* 音乐控制按钮 */}
      <div 
        className="music-control-button"
        onClick={() => {
          const audio = audioRef.current;
          if (!audio) return;
          if (audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
        }}
      >
        <SoundOutlined style={{ color: '#fff' }} />
      </div>
    </div>
  );
};

export default MusicPlayer;
