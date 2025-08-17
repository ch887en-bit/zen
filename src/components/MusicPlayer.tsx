import React, { useState, useRef, useEffect } from 'react';
import { PlayCircleOutlined, PauseCircleOutlined, SoundOutlined } from '@ant-design/icons';
import './MusicPlayer.css';

const MusicPlayer: React.FC = () => {
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  
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

    const handleEnded = () => {
      // 由于启用了循环播放，这里不需要处理结束事件
      // 但我们可以重置进度条显示
      setCurrentTime(0);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
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
        <SoundOutlined />
      </div>
    </div>
  );
};

export default MusicPlayer;
